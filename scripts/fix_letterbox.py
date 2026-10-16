#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Quita las bandas negras (letterbox) que Gemini mete a veces en una imagen.

Detecta filas/columnas casi negras en los bordes, recorta el contenido a 16:9 desde el centro y lo
reescala al tamaño original. Regenerar no suele servir: Gemini repite las bandas en la misma escena.

Uso:
    python scripts/fix_letterbox.py <slug> <clave> [<clave> ...]
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent


def edge_run(means: np.ndarray) -> tuple[int, int]:
    """Primer y último índice cuyo brillo medio supera el negro de una banda."""
    keep = np.where(means > 14)[0]
    return int(keep[0]), int(keep[-1]) + 1


def fix(path: Path) -> str:
    im = Image.open(path).convert("RGB")
    a = np.asarray(im).astype(float)
    W, H = im.size
    top, bot = edge_run(a.mean(axis=(1, 2)))
    left, right = edge_run(a.mean(axis=(0, 2)))
    if top < 4 and H - bot < 4 and left < 4 and W - right < 4:
        return "sin bandas"
    h, w = bot - top, right - left
    if w / h > 16 / 9:
        w = int(h * 16 / 9)
    else:
        h = int(w * 9 / 16)
    cx, cy = (left + right) // 2, (top + bot) // 2
    box = (cx - w // 2, cy - h // 2, cx - w // 2 + w, cy - h // 2 + h)
    im.crop(box).resize((W, H), Image.LANCZOS).save(path, quality=95)
    return f"recortada {box}"


def main() -> None:
    slug, keys = sys.argv[1], sys.argv[2:]
    cfg = json.loads((REPO / "videos.json").read_text(encoding="utf-8"))[slug]
    idir = REPO / "remotion" / "public" / cfg["images_subpath"]
    for k in keys:
        print(k, fix(idir / f"{k}.{cfg.get('ext', 'jpg')}"))


if __name__ == "__main__":
    main()
