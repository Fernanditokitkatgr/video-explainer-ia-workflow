#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sube y programa los Shorts generados por scripts/make_shorts.py.

Agenda propia (shorts_queue.json), independiente de la de vídeos largos:
  - 2 huecos al día: 13:00 y 21:00 (Europe/Madrid).
  - Un Short NUNCA sale antes de que su vídeo largo esté publicado (+1 h), para que el
    enlace "vídeo completo" de la descripción funcione desde el minuto uno.
  - Si YouTube devuelve quotaExceeded (cada subida cuesta ~1.600 unidades de 10.000/día),
    para limpio: lo pendiente se sube con `--pending` al día siguiente.

Uso:
    python publish_shorts.py --video <slug>        # sube los Shorts pendientes de ese vídeo
    python publish_shorts.py --pending             # sube todo lo pendiente de todos los vídeos
    python publish_shorts.py --list                # agenda de Shorts
    python publish_shorts.py --video <slug> --dry-run
"""
import argparse
import json
import re
import sys
from datetime import datetime, timedelta, time as dtime
from pathlib import Path

# La consola de Windows es cp1252: sin esto, un emoji en la salida de upload_youtube.py
# tumba el proceso padre A MITAD de la subida y el ID no se registra.
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from zoneinfo import ZoneInfo

from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

from upload_youtube import get_service

HERE = Path(__file__).parent
REPO_ROOT = HERE.parent
TZ = ZoneInfo("Europe/Madrid")
UTC = ZoneInfo("UTC")
SLOT_HOURS = (13, 21)
SQ_PATH = HERE / "shorts_queue.json"
BASE_HASHTAGS = "#shorts #inteligenciaartificial #tecnologia"


def load_json(p, default):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default


def save_json(p, data):
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def iso(dt):
    return dt.astimezone(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")


def next_slot(taken, not_before):
    day = not_before.astimezone(TZ).date()
    while True:
        for h in SLOT_HOURS:
            cand = datetime.combine(day, dtime(hour=h), tzinfo=TZ)
            if cand >= not_before and iso(cand) not in taken:
                return cand
        day += timedelta(days=1)


def seo_tags(manifest_dir):
    seo = (manifest_dir / "seo.md").read_text(encoding="utf-8")
    m = re.search(r"## Tags\s*\n```\n(.*?)\n```", seo, re.S)
    return [t.strip() for t in m.group(1).split(",")][:15] if m else []


def upload_one(yt, mp4, title, description, tags, publish_at):
    body = {
        "snippet": {"title": title[:100], "description": description, "tags": tags, "categoryId": "28",
                    "defaultLanguage": "es", "defaultAudioLanguage": "es"},
        "status": {"privacyStatus": "private", "publishAt": publish_at, "selfDeclaredMadeForKids": False},
    }
    req = yt.videos().insert(part="snippet,status", body=body,
                             media_body=MediaFileUpload(str(mp4), chunksize=-1, resumable=True))
    resp = None
    while resp is None:
        _, resp = req.next_chunk()
    return resp["id"]


def publish(slugs, dry):
    vids = load_json(REPO_ROOT / "videos.json", {})
    sq = load_json(SQ_PATH, {"shorts": []})
    taken = {e["publish_at"] for e in sq["shorts"]}
    now = datetime.now(TZ) + timedelta(hours=1)
    yt = None if dry else get_service()
    for slug in slugs:
        cfg = vids[slug]
        mdir = REPO_ROOT / cfg["manifest_dir"]
        man_path = mdir / "shorts" / "shorts.json"
        man = load_json(man_path, {"shorts": []})
        pend = [s for s in man["shorts"] if not s.get("youtube_id")]
        pub = cfg.get("published", {})
        long_id = pub.get("youtube_id")
        if not long_id:
            print(f"{slug}: el video largo aun no esta subido, sus Shorts esperan.")
            continue
        not_before = now
        if pub.get("publish_at"):
            long_dt = datetime.fromisoformat(pub["publish_at"].replace("Z", "+00:00"))
            not_before = max(now, long_dt + timedelta(hours=1))
        tags = seo_tags(mdir)
        for s in pend:
            slot = next_slot(taken, not_before)
            desc = (f"{s['titulo']}\n\nVídeo completo: https://youtu.be/{long_id}\n\n"
                    f"Suscríbete para más tecnología e IA explicada fácil.\n\n{BASE_HASHTAGS}")
            print(f"{slug}/{s['file']} -> {iso(slot)}  {s['titulo']}")
            if dry:
                taken.add(iso(slot))
                continue
            try:
                vid = upload_one(yt, mdir / "shorts" / s["file"], s["titulo"], desc, tags, iso(slot))
            except HttpError as e:
                if "quotaExceeded" in str(e) or "uploadLimitExceeded" in str(e):
                    # quotaExceeded = cuota de la API (10.000 puntos); uploadLimitExceeded = límite de
                    # subidas diarias del CANAL (no se arregla con cuota, sino verificando el canal).
                    reason = "uploadLimitExceeded (límite de subidas del canal)" if "uploadLimitExceeded" in str(e) \
                        else "quotaExceeded (cuota de la API)"
                    print(f"CUOTA diaria de YouTube agotada [{reason}]: lo pendiente queda para mañana (--pending).")
                    return
                raise
            s["youtube_id"], s["publish_at"] = vid, iso(slot)
            taken.add(iso(slot))
            sq["shorts"].append({"video": slug, "file": s["file"], "youtube_id": vid,
                                 "publish_at": iso(slot), "long_id": long_id})
            save_json(man_path, man)
            save_json(SQ_PATH, sq)
            print(f"   OK https://youtube.com/shorts/{vid}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--video")
    p.add_argument("--pending", action="store_true")
    p.add_argument("--list", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    a = p.parse_args()
    if a.list:
        for e in sorted(load_json(SQ_PATH, {"shorts": []})["shorts"], key=lambda e: e["publish_at"]):
            print(f"{e['publish_at']}  {e['video']}/{e['file']}  {e['youtube_id']}")
        return
    if a.pending:
        vids = load_json(REPO_ROOT / "videos.json", {})
        slugs = [s for s in vids if (REPO_ROOT / vids[s]["manifest_dir"] / "shorts" / "shorts.json").exists()]
        slugs.sort(key=lambda s: vids[s].get("published", {}).get("publish_at") or "9999")
        publish(slugs, a.dry_run)
    elif a.video:
        publish([a.video], a.dry_run)
    else:
        sys.exit("Usa --video <slug>, --pending o --list")


if __name__ == "__main__":
    main()
