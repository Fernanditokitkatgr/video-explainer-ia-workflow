#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Miniatura de CUADRÍCULA (plantilla "TODOS los X"): N personajes en rejilla con su etiqueta.

Es la miniatura que usó Tecnotipos en sus vídeos x19 (ver channel/tecno/viral_playbook.md).
Gemini no alinea bien una rejilla entera, así que cada casilla se genera por separado
(generate_thumbnail.py, sin Sara) y aquí se monta con etiquetas exactas en Montserrat.

seo.md, sección "## Miniatura":
    plantilla: A
    etiquetas: FANCY BEAR|COZY BEAR|...
    cols: 5
y en la sección "## Miniatura" o en un archivo grid_prompts.json (lista con un prompt por casilla).

Uso:
    python scripts/grid_thumbnail.py <slug>          # genera las casillas que falten y monta
"""
import json
import re
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
FONT = REPO / "assets" / "fonts" / "Montserrat-ExtraBold.ttf"
W, H = 1280, 720
STYLE = ("flat cartoon illustration style, thick black ink outlines, simple flat colors, no gradients, "
         "no 3D shading, one single character centered on a plain white background, filling most of the "
         "square. No text, no letters, no numbers, no logos, no flags anywhere.")


def main() -> None:
    slug = sys.argv[1]
    vids = json.loads((REPO / "videos.json").read_text(encoding="utf-8"))
    mdir = REPO / vids[slug]["manifest_dir"]
    seo = (mdir / "seo.md").read_text(encoding="utf-8")
    labels = re.search(r"etiquetas:\s*(.+)", seo).group(1).split("|")
    cols = int((re.search(r"cols:\s*(\d+)", seo) or re.search(r"(5)", "5")).group(1))
    prompts = json.loads((mdir / "grid_prompts.json").read_text(encoding="utf-8"))
    assert len(prompts) == len(labels), "un prompt por etiqueta"
    tdir = mdir / "grid_tiles"
    tdir.mkdir(exist_ok=True)
    for i, p in enumerate(prompts):
        out = tdir / f"tile_{i:02d}.jpg"
        if out.exists():
            continue
        subprocess.run([sys.executable, str(REPO / "scripts" / "generate_thumbnail.py"), "--video", slug,
                        "--ref", "none", "--out", str(out), "--prompt", f"{p}. {STYLE}"], check=True)

    rows = (len(labels) + cols - 1) // cols
    pad, lab_h = 14, 46
    cw = (W - pad * (cols + 1)) // cols
    ch = (H - pad * (rows + 1)) // rows
    sheet = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(sheet)
    for i, lab in enumerate(labels):
        r, c = divmod(i, cols)
        x, y = pad + c * (cw + pad), pad + r * (ch + pad)
        tile = Image.open(tdir / f"tile_{i:02d}.jpg").convert("RGB")
        side = min(tile.size)
        tile = tile.crop(((tile.width - side) // 2, (tile.height - side) // 2,
                          (tile.width + side) // 2, (tile.height + side) // 2))
        img_h = ch - lab_h
        tile = tile.resize((min(cw, img_h), min(cw, img_h)))
        sheet.paste(tile, (x + (cw - tile.width) // 2, y))
        d.rounded_rectangle([x, y + img_h, x + cw, y + ch], radius=8, fill="black")
        size = 30
        while size > 12:
            f = ImageFont.truetype(str(FONT), size)
            if d.textlength(lab, font=f) <= cw - 12:
                break
            size -= 1
        tw = d.textlength(lab, font=f)
        d.text((x + (cw - tw) / 2, y + img_h + (lab_h - size) / 2 - 3), lab, font=f, fill="#FFD400")
        d.rectangle([x, y, x + cw, y + ch], outline="black", width=3)
    out = mdir / "thumbnail_final.jpg"
    sheet.save(out, quality=92)
    print(f"OK {out}")


if __name__ == "__main__":
    main()
