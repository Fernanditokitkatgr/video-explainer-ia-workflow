#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera las imágenes de APOYO de un vídeo del motor (escena "imagen" del plano). Nov-2026.

El mono, los personajes y los gráficos siguen hechos por código. Las imágenes solo van en momentos clave
(fondos, lugares u objetos que el código no dibuja bien) y se piden en el plano:

    {"tipo": "imagen", "archivo": "router.jpg", "prompt": "un router viejo con una pegatina…",
     "al": "@pegatina", "pie": "LA CLAVE DE FÁBRICA", "modo": "marco" | "fondo", "aspecto": "16:9" | "1:1" | "9:16"}

    python scripts/motor_imagenes.py <slug>            # genera las que falten en <manifest_dir>/img_motor/
    python scripts/motor_imagenes.py <slug> --dry-run  # solo lista y cuenta (no gasta)

Reglas (decisión del usuario, nov-2026):
- Cada imagen pasa por scripts/gasto.py (gasto.comprobar antes y gasto.apuntar después, dentro de
  generate_images_gemini.generate_frame). Tope duro de 250 €.
- Modelo del vídeo en videos.json ("image_model": "lite" o "flash"); nunca "pro" desde aquí.
- Como mucho 15 imágenes por largo y 5 por Short: si el plano pide más, se para sin gastar.
- Estilo coherente con el motor: rotulador sobre papel blanco, paleta del canal, SIN texto y SIN personas
  (los personajes los pone el motor encima).
"""
import argparse
import json
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "scripts"))

ESTILO = ("Hand-drawn whiteboard marker illustration, thick wobbly black ink outlines, flat bright colors "
          "(warm yellow, sky blue, fresh green, tomato red, pink, orange) on clean white paper, simple doodle style, "
          "slightly imperfect lines, no shading gradients, no photorealism. Full-bleed: the drawing fills the whole frame edge to edge, no paper sheet, no table, no photo of a drawing. Absolutely NO text, NO letters, NO numbers, "
          "NO logos, NO brand names, NO people, NO faces, NO hands. Scene: ")
MAX = {"largo": 15, "short": 5}


def escenas_imagen(plano: dict) -> list[dict]:
    out = []
    for tr in plano.get("tramos", []):
        for e in tr.get("escenas", []) + ([tr["escena"]] if tr.get("escena") else []):
            if e.get("tipo") == "imagen":
                out.append(e)
            if e.get("tipo") == "mundo":  # cada estación del mundo continuo es una imagen a toda altura
                out += [dict(es, modo="fondo", aspecto="16:9") for es in e.get("estaciones", []) if es.get("archivo")]
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description="Imágenes de apoyo (Gemini) para la escena 'imagen' del motor")
    ap.add_argument("slug")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    import config
    cfg = config.get_video(a.slug)
    mdir = REPO / cfg["manifest_dir"]
    plano = json.loads((mdir / "plano.json").read_text(encoding="utf-8"))
    imgs = escenas_imagen(plano)
    vertical = plano.get("formato") == "9:16"
    tope = MAX["short" if vertical else "largo"]
    if len({e["archivo"] for e in imgs}) > tope:
        sys.exit(f"✗ El plano pide {len(imgs)} imágenes y el tope es {tope} ({'Short' if vertical else 'largo'}). Quita alguna.")
    out_dir = mdir / "img_motor"
    falta = [e for e in imgs if not (out_dir / e["archivo"]).exists()]
    print(f"{a.slug}: {len(imgs)} imágenes en el plano, {len(falta)} por generar → {out_dir}")
    for e in falta:
        print(f"  · {e['archivo']}: {e.get('prompt', '')[:90]}")
    if a.dry_run or not falta:
        return
    from google import genai
    import generate_images_gemini as gig
    if cfg.get("image_model") == "pro":
        sys.exit("✗ Este script no usa el modelo pro (decisión del usuario): pon image_model lite o flash.")
    model, location = gig.pick_model(cfg, fallback="lite")
    client = genai.Client(vertexai=True, project=config.GEMINI_VERTEX_PROJECT, location=location)
    ok = 0
    for e in falta:
        if not e.get("prompt"):
            print(f"  ✗ {e['archivo']}: sin prompt")
            continue
        asp = e.get("aspecto") or ("9:16" if (vertical and e.get("modo") == "fondo") else "16:9")
        if gig.generate_frame(client, model, ESTILO + e["prompt"], out_dir / e["archivo"], ref_part=None, aspect_ratio=asp):
            ok += 1
    print(f"Hecho: {ok}/{len(falta)} imágenes nuevas.")
    import gasto
    print(gasto.resumen())


if __name__ == "__main__":
    main()
