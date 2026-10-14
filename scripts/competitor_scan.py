#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Escáner de competencia: qué vídeos les han funcionado MUCHO mejor de lo normal.

Para cada canal de channel/<canal>/competitors.json coge sus últimos 50 vídeos y calcula el
"multiplicador": vistas del vídeo / mediana de vistas del canal (largos y Shorts por separado).
Un x5 es un tema o un formato que su propia audiencia ha disparado: lo que hay que copiar (el
tema y la forma de contarlo, no el vídeo). Comparar vistas brutas entre canales no sirve, porque
un canal de 2 M siempre gana a uno de 20 k; el multiplicador sí es comparable.

Se ignoran los vídeos con menos de 7 días (aún no han tenido tiempo de crecer). Coste en cuota
de la API: unas 3 unidades por canal (usa playlistItems, no search.list, que cuesta 100).

Uso:
    python scripts/competitor_scan.py [--canal tecno] [--top 25]
Salida: channel/<canal>/competitor_report.md
"""
import argparse
import json
import re
import statistics
import sys
from datetime import datetime, timezone
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT / "scratch-yt"))
import upload_youtube as uy  # noqa: E402

SHORT_MAX_S = 180  # YouTube admite Shorts de hasta 3 min desde oct-2024
MIN_AGE_DAYS = 7


def iso_seconds(d: str) -> int:
    m = re.match(r"P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", d)
    days, h, mi, s = (int(x or 0) for x in m.groups())
    return days * 86400 + h * 3600 + mi * 60 + s


def scan_channel(yt, handle: str) -> tuple[dict, list[dict]]:
    res = yt.channels().list(part="snippet,statistics,contentDetails", forHandle=handle).execute()
    if not res.get("items"):
        print(f"  ?? {handle}: no existe ese handle")
        return {}, []
    ch = res["items"][0]
    uploads = ch["contentDetails"]["relatedPlaylists"]["uploads"]
    items = yt.playlistItems().list(part="contentDetails", playlistId=uploads, maxResults=50).execute()
    ids = [i["contentDetails"]["videoId"] for i in items.get("items", [])]
    if not ids:
        return ch, []
    vids = yt.videos().list(part="snippet,statistics,contentDetails", id=",".join(ids)).execute()["items"]
    now = datetime.now(timezone.utc)
    out = []
    for v in vids:
        pub = datetime.fromisoformat(v["snippet"]["publishedAt"].replace("Z", "+00:00"))
        age = (now - pub).days
        secs = iso_seconds(v["contentDetails"]["duration"])
        out.append({
            "channel": ch["snippet"]["title"], "handle": handle, "id": v["id"],
            "title": v["snippet"]["title"], "views": int(v["statistics"].get("viewCount", 0)),
            "likes": int(v["statistics"].get("likeCount", 0)),
            "comments": int(v["statistics"].get("commentCount", 0)),
            "secs": secs, "kind": "short" if secs <= SHORT_MAX_S else "largo",
            "age": age, "date": pub.date().isoformat(),
        })
    for kind in ("largo", "short"):
        pool = [x for x in out if x["kind"] == kind and x["age"] >= MIN_AGE_DAYS]
        med = statistics.median([x["views"] for x in pool]) if len(pool) >= 3 else None
        for x in pool:
            x["mult"] = round(x["views"] / med, 1) if med else None
            x["median"] = med
    return ch, out


def fmt_dur(s: int) -> str:
    return f"{s // 60}:{s % 60:02d}"


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--canal", default="tecno")
    p.add_argument("--top", type=int, default=25)
    a = p.parse_args()
    cdir = REPO_ROOT / "channel" / a.canal
    comps = json.loads((cdir / "competitors.json").read_text(encoding="utf-8"))["competitors"]
    yt = uy.get_service()

    rows, chans = [], []
    for c in comps:
        print(f"· {c['handle']}")
        ch, vids = scan_channel(yt, c["handle"])
        if not ch:
            continue
        st = ch["statistics"]
        longs = [v for v in vids if v["kind"] == "largo"]
        shorts = [v for v in vids if v["kind"] == "short"]
        chans.append({
            "name": ch["snippet"]["title"], "handle": c["handle"], "lang": c.get("lang", ""),
            "subs": int(st.get("subscriberCount", 0)), "n_long": len(longs), "n_short": len(shorts),
            "med_long_dur": fmt_dur(int(statistics.median([v["secs"] for v in longs]))) if longs else "-",
            "span_days": max((v["age"] for v in vids), default=0),
        })
        rows += [v for v in vids if v.get("mult")]

    lines = [f"# Escáner de competencia — {datetime.now().date().isoformat()}", "",
             "Multiplicador = vistas / mediana del propio canal (largos y Shorts por separado, "
             f"solo vídeos de más de {MIN_AGE_DAYS} días). Copiar el TEMA y la FORMA, no el vídeo.", "",
             "## Canales", "", "| Canal | Idioma | Subs | Largos/Shorts (últimos 50) | Duración media largo | Días que cubren |",
             "|---|---|---|---|---|---|"]
    for c in sorted(chans, key=lambda c: -c["subs"]):
        lines.append(f"| {c['name']} ({c['handle']}) | {c['lang']} | {c['subs']:,} | {c['n_long']}/{c['n_short']} "
                     f"| {c['med_long_dur']} | {c['span_days']} |")
    for kind, label in (("largo", "Vídeos largos"), ("short", "Shorts")):
        top = sorted([r for r in rows if r["kind"] == kind], key=lambda r: -r["mult"])[:a.top]
        lines += ["", f"## {label} que más se dispararon (top {a.top})", "",
                  "| x | Vistas | Canal | Título | Dur. | Fecha |", "|---|---|---|---|---|---|"]
        for r in top:
            t = r["title"].replace("|", "/")
            lines.append(f"| x{r['mult']} | {r['views']:,} | {r['channel']} | [{t}](https://youtu.be/{r['id']}) "
                         f"| {fmt_dur(r['secs'])} | {r['date']} |")
    out = cdir / "competitor_report.md"
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"\nInforme: {out}")


if __name__ == "__main__":
    main()
