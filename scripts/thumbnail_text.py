#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Pone el texto gancho sobre una miniatura ya generada, con PIL (nunca con la IA de imagen:
Gemini inventa letras, aquí el texto sale exacto siempre).

Uso:
    python scripts/thumbnail_text.py --in thumbnail.jpg --out thumbnail_final.jpg \
        --text "NO ES|UN TRUCO" --highlight "TRUCO" --pos left

  --text      líneas separadas por "|" (2-4 palabras en total es lo ideal)
  --highlight palabras que van en amarillo (el resto en blanco), separadas por coma
  --pos       left | right | top  (lado libre de la imagen: normalmente el opuesto a Sara)
  --video     alternativa: lee todo de la sección "## Miniatura" del seo.md del vídeo
"""
import argparse
import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parent.parent
FONT_CANDIDATES = [r"C:\Windows\Fonts\impact.ttf", r"C:\Windows\Fonts\ariblk.ttf"]
YELLOW = (255, 212, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for f in FONT_CANDIDATES:
        if Path(f).exists():
            return ImageFont.truetype(f, size)
    sys.exit("No se encontró Impact ni Arial Black en C:\\Windows\\Fonts")


def seo_thumbnail_spec(video: str) -> dict:
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    mdir = REPO_ROOT / vids[video]["manifest_dir"]
    text = (mdir / "seo.md").read_text(encoding="utf-8")
    sec = re.search(r"## Miniatura\s*\n(.*?)(?=\n## |\Z)", text, re.S)
    if not sec:
        sys.exit("seo.md no tiene sección '## Miniatura' (texto: / resaltar: / posicion:)")
    body = sec.group(1)
    get = lambda k: (re.search(rf"^{k}:\s*(.+)$", body, re.M | re.I) or [None, ""])[1].strip()
    return {
        "in": str(mdir / "thumbnail.jpg"),
        "out": str(mdir / "thumbnail_final.jpg"),
        "text": get("texto"),
        "highlight": get("resaltar"),
        "pos": get("posicion") or "left",
    }


def render(src: str, dst: str, text: str, highlight: str, pos: str) -> None:
    im = Image.open(src).convert("RGB")
    if im.width < 1280:
        im = im.resize((1280, round(1280 * im.height / im.width)), Image.LANCZOS)
    W, H = im.size
    lines = [l.strip().upper() for l in text.split("|") if l.strip()]
    # separa por comas y espacios: "15.000 MILLONES" resalta las dos palabras
    hl = {w.strip(".,!?¿¡«»\"'").upper() for w in highlight.replace(",", " ").split() if w.strip()}

    if pos == "top":
        box_w, box_h, x0, y0 = int(W * 0.92), int(H * 0.40), int(W * 0.04), int(H * 0.04)
    else:
        box_w, box_h = int(W * 0.52), int(H * 0.86)
        x0 = int(W * 0.035) if pos == "left" else W - box_w - int(W * 0.035)
        y0 = int(H * 0.07)

    # tamaño máximo que cabe en ancho y alto
    size = int(H * 0.30)
    while size > 30:
        font = load_font(size)
        widths = [font.getbbox(l)[2] for l in lines]
        line_h = int(size * 1.02)
        if max(widths) <= box_w and line_h * len(lines) <= box_h:
            break
        size -= 4
    stroke = max(6, size // 11)

    d = ImageDraw.Draw(im)
    y = y0
    for line in lines:
        words = line.split(" ")
        total = font.getbbox(line)[2]
        x = x0 if pos != "right" else x0 + box_w - total
        if pos == "top":
            x = (W - total) // 2
        for i, w in enumerate(words):
            token = w + (" " if i < len(words) - 1 else "")
            color = YELLOW if w.strip(".,!?¿¡«»\"'") in hl else WHITE
            # sombra dura para que despegue del fondo blanco
            d.text((x + stroke // 2 + 4, y + stroke // 2 + 6), token, font=font, fill=BLACK,
                   stroke_width=stroke, stroke_fill=BLACK)
            d.text((x, y), token, font=font, fill=color, stroke_width=stroke, stroke_fill=BLACK)
            x += font.getbbox(token)[2] if i < len(words) - 1 else 0
        y += int(size * 1.02)
    im.save(dst, quality=92)
    print(f"OK {dst}  ({W}x{H}, fuente {size}px)")


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--video")
    p.add_argument("--in", dest="src")
    p.add_argument("--out")
    p.add_argument("--text")
    p.add_argument("--highlight", default="")
    p.add_argument("--pos", default="left", choices=["left", "right", "top"])
    a = p.parse_args()
    if a.video:
        s = seo_thumbnail_spec(a.video)
        render(s["in"], s["out"], s["text"], s["highlight"], s["pos"])
    else:
        if not (a.src and a.out and a.text):
            sys.exit("Usa --video <slug> o bien --in/--out/--text")
        render(a.src, a.out, a.text, a.highlight, a.pos)


if __name__ == "__main__":
    main()
