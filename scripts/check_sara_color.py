#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Detecta imágenes en las que Sara sale con la cara color melocotón (deriva típica de Gemini).

Sara tiene la cara del mismo marrón chocolate que el cuerpo y solo el hocico tostado. Gemini a
veces la dibuja con toda la cara melocotón/beige, como un mono infantil de otro estilo. En la
revisión del vídeo del chantaje salieron 14 de 103. Este script mide qué parte de la imagen es
de ese tono melocotón claro y avisa de las que pasan del umbral, para regenerarlas antes de la
revisión visual. No sustituye a la revisión: solo la abarata.

Uso:
    python scripts/check_sara_color.py <slug> [--umbral 1.5] [--borrar]
"""
import argparse
import json
import sys
from pathlib import Path

from PIL import Image

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent


def peach_share(path: Path) -> float:
    im = Image.open(path).convert("RGB").resize((320, 180))
    px = list(im.getdata())
    # melocotón claro: muy rojo, verde medio-alto, azul medio; el hocico de Sara es más oscuro
    hits = sum(1 for r, g, b in px if r > 225 and 180 <= g <= 218 and 130 <= b <= 190 and r - b > 45)
    return 100 * hits / len(px)


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("slug")
    p.add_argument("--umbral", type=float, default=1.5)
    p.add_argument("--borrar", action="store_true")
    a = p.parse_args()
    vids = json.loads((REPO / "videos.json").read_text(encoding="utf-8"))
    cfg = vids[a.slug]
    frames = json.loads((REPO / cfg["manifest_dir"] / "frames.json").read_text(encoding="utf-8"))["frames"]
    idir = REPO / "remotion" / "public" / cfg["images_subpath"]
    flagged = []
    for i, f in enumerate(frames):
        q = idir / f["file"]
        if f["ref"] != "mono" or not q.exists():
            continue
        s = peach_share(q)
        if s >= a.umbral:
            flagged.append((i, f["file"], s))
    for i, n, s in flagged:
        print(f"  {i:>3} {n}  {s:.1f}% melocotón")
    print(f"{len(flagged)} sospechosas de {sum(1 for f in frames if f['ref'] == 'mono')} con Sara")
    if a.borrar:
        for _, n, _ in flagged:
            (idir / n).unlink()
        print("borradas para regenerar")


if __name__ == "__main__":
    main()
