#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Subida diaria de lo pendiente (la lanza el Programador de tareas a las 09:35, ya renovada la cuota).

1) Vídeos largos de pending_long.txt (un slug por línea, en orden = orden de publicación), máximo
   MAX_LONG por ejecución para que los Shorts también avancen.
2) Shorts pendientes de todos los vídeos (publish_shorts.py --pending).

Robusto ante la cuota de YouTube, que es el cuello de botella real:
- Si se agota a mitad, PARA y conserva en pending_long.txt lo que falta (el .bat anterior borraba
  la lista entera aunque hubiera fallado).
- Si un vídeo ya tiene hueco reservado sin subir (video_id null, por un fallo anterior), sube
  directamente a ESE hueco en vez de intentar reservar otro, que publish_from_recipe rechaza.
- Si faltan los Shorts del vídeo, los corta antes.

Uso:
    python daily_publish.py [--dry-run]
"""
import argparse
import argparse as _ap
import json
import subprocess
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
REPO_ROOT = HERE.parent
PENDING = HERE / "pending_long.txt"
QUEUE = HERE / "publish_queue.json"
MAX_LONG = 2
QUOTA_MARKERS = ("quota", "uploadlimitexceeded", "exceeded the number of videos", "cuota")


def is_quota(text: str) -> bool:
    t = text.lower()
    return any(m in t for m in QUOTA_MARKERS)


def entry(slug: str) -> dict | None:
    q = json.loads(QUEUE.read_text(encoding="utf-8"))["queue"]
    hits = [e for e in q if e["video"] == slug and e.get("status") in ("scheduled", "published")]
    return hits[-1] if hits else None


def run(cmd: list[str]) -> tuple[int, str]:
    r = subprocess.run(cmd, cwd=HERE, capture_output=True, text=True, encoding="utf-8", errors="replace")
    return r.returncode, (r.stdout or "") + (r.stderr or "")


def upload_into_reserved(slug: str, publish_at: str) -> str:
    import publish_from_recipe as pfr
    import upload_youtube as uy
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    mdir = REPO_ROOT / vids[slug]["manifest_dir"]
    seo = pfr.parse_seo(mdir / "seo.md")
    thumb = mdir / "thumbnail_final.jpg"
    args = _ap.Namespace(video=str(REPO_ROOT / "remotion" / "output" / f"{slug}.mp4"), title=seo["title"],
                         description=seo["description"], tags=seo["tags"],
                         thumbnail=str(thumb if thumb.exists() else mdir / "thumbnail.jpg"),
                         category="27", privacy="private", publish_at=publish_at)
    vid = uy.upload(args)
    pfr.sync_bookkeeping(slug, vid, publish_at, mdir)
    return vid


def upload_long(slug: str, dry: bool) -> str:
    """'done' | 'uploaded' | 'quota' | 'error'."""
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    mdir = REPO_ROOT / vids[slug]["manifest_dir"]
    if not (REPO_ROOT / "remotion" / "output" / f"{slug}.mp4").exists():
        print(f"  ✗ {slug}: no está renderizado, se salta (queda pendiente)")
        return "error"
    e = entry(slug)
    if e and e.get("video_id"):
        print(f"  = {slug}: ya subido ({e['video_id']})")
        return "done"
    if dry:
        print(f"  (dry-run) subiría {slug}" + (f" al hueco ya reservado {e['scheduled_at_utc']}" if e else ""))
        return "uploaded"
    if not (mdir / "shorts" / "shorts.json").exists():
        run([sys.executable, str(REPO_ROOT / "scripts" / "make_shorts.py"), slug])
    try:
        if e:
            vid = upload_into_reserved(slug, e["scheduled_at_utc"])
            print(f"  ✓ {slug}: subido al hueco reservado ({vid})")
        else:
            code, out = run([sys.executable, "publish_from_recipe.py", "--video", slug])
            print(out[-600:])
            if code != 0:
                return "quota" if is_quota(out) else "error"
            print(f"  ✓ {slug}: subido")
        return "uploaded"
    except Exception as ex:  # noqa: BLE001
        msg = str(ex)
        print(f"  ✗ {slug}: {msg[:200]}")
        return "quota" if is_quota(msg) else "error"


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--dry-run", action="store_true")
    a = p.parse_args()
    pending = [s.strip() for s in PENDING.read_text(encoding="utf-8").splitlines() if s.strip()] if PENDING.exists() else []
    keep, uploaded_now, stop = [], 0, False
    for slug in pending:
        if stop or uploaded_now >= MAX_LONG:
            keep.append(slug)
            continue
        res = upload_long(slug, a.dry_run)
        if res == "uploaded":
            uploaded_now += 1
        elif res == "done":
            pass
        else:
            keep.append(slug)
            stop = res == "quota"
    if not a.dry_run:
        if keep:
            PENDING.write_text("\n".join(keep) + "\n", encoding="utf-8")
        elif PENDING.exists():
            PENDING.unlink()
    print(f"Largos: {uploaded_now} subidos, {len(keep)} pendientes {keep}")
    if stop:
        print("Cuota agotada: los Shorts esperan a mañana.")
        return
    if a.dry_run:
        print("(dry-run) después subiría publish_shorts.py --pending")
        return
    code, out = run([sys.executable, "publish_shorts.py", "--pending"])
    print(out[-1500:])


if __name__ == "__main__":
    main()
