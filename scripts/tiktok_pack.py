#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Prepara los Shorts de un vídeo para TikTok: versión con cierre propio + texto con SEO de TikTok.

TikTok funciona como buscador: la palabra clave va en la PRIMERA línea del texto (no un título
de intriga), y van pocos hashtags concretos (3-5). Los subtítulos quemados ya ayudan, porque
TikTok también lee el texto en pantalla.

Corta los Shorts con `make_shorts.py <slug> --tiktok` (si faltan) y deja en tiktok_inbox/ cada
vídeo junto a su .txt, con el nombre prefijado por la fecha sugerida (la del Short de YouTube),
listo para subir a mano o programar desde TikTok Studio. publish_tiktok.py usa el mismo texto.

Uso:
    python scripts/tiktok_pack.py <slug> [<slug> ...]
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO_ROOT = Path(__file__).resolve().parent.parent
INBOX = REPO_ROOT / "tiktok_inbox"
SHORTS_QUEUE = REPO_ROOT / "scratch-yt" / "shorts_queue.json"
BASE_TAGS = ["#aprendeentiktok", "#tecnologia"]
MAX_TAGS = 5


def video_hashtags(seo_md: Path) -> list[str]:
    text = seo_md.read_text(encoding="utf-8")
    desc = re.search(r"## Descripción\s*\n```\n(.*?)\n```", text, re.S)
    return re.findall(r"#\w+", desc.group(1)) if desc else []


def caption(titulo: str, tags: list[str]) -> str:
    seen, picked = set(), []
    for t in tags + BASE_TAGS:
        if t.lower() not in seen:
            seen.add(t.lower())
            picked.append(t)
    return f"{titulo}\nExplicado fácil, sin tecnicismos.\n{' '.join(picked[:MAX_TAGS])}"


def youtube_dates(slug: str) -> dict[str, str]:
    if not SHORTS_QUEUE.exists():
        return {}
    items = json.loads(SHORTS_QUEUE.read_text(encoding="utf-8")).get("shorts", [])
    return {Path(e["file"]).name: (e.get("publish_at") or "")[:10]
            for e in items if e.get("video") == slug and e.get("file")}


def pack(slug: str) -> None:
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    mdir = REPO_ROOT / vids[slug]["manifest_dir"]
    tdir = mdir / "shorts_tiktok"
    if not (tdir / "shorts.json").exists():
        subprocess.run([sys.executable, str(REPO_ROOT / "scripts" / "make_shorts.py"), slug, "--tiktok"],
                       check=True)
    shorts = json.loads((tdir / "shorts.json").read_text(encoding="utf-8"))["shorts"]
    tags = video_hashtags(mdir / "seo.md")
    dates = youtube_dates(slug)
    INBOX.mkdir(exist_ok=True)
    for s in shorts:
        text = caption(s["titulo"], tags)
        (tdir / s["file"].replace(".mp4", ".txt")).write_text(text, encoding="utf-8")
        stem = f"{dates.get(s['file']) or 'sin-fecha'}_{slug}_{s['file'][:-4]}"
        shutil.copy(tdir / s["file"], INBOX / f"{stem}.mp4")
        (INBOX / f"{stem}.txt").write_text(text, encoding="utf-8")
        print(f"OK {stem}")


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for slug in sys.argv[1:]:
        pack(slug)
    print(f"\nListo en {INBOX}")


if __name__ == "__main__":
    main()
