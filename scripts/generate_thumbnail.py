#!/usr/bin/env python3
"""Genera UNA miniatura suelta con Gemini Pro (Vertex AI), reusando la misma
infraestructura que `generate_images_gemini.py`: mismo modelo, misma imagen de
referencia canonica del personaje, mismo estilo.

Existe porque la miniatura es un paso OBLIGATORIO de cada video (ver CLAUDE.md) y
antes se hacia con un script de usar y tirar en el scratchpad, que se pierde entre
sesiones. La generacion de imagenes de produccion SIEMPRE va por Google Cloud/Vertex,
nunca por Higgsfield.

Uso:
    python scripts/generate_thumbnail.py --video <slug> --prompt "..." [--ref mono|sombra|none]

    # ruta de salida explicita en vez de la del video:
    python scripts/generate_thumbnail.py --out ruta/thumbnail.jpg --prompt "..."
"""
import argparse
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import config  # noqa: E402
from generate_images_gemini import generate_frame, load_reference_parts  # noqa: E402
from google import genai  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8")

p = argparse.ArgumentParser()
p.add_argument("--video", help="slug tal como aparece en videos.json")
p.add_argument("--out", help="ruta de salida (por defecto <manifest_dir>/thumbnail.jpg)")
p.add_argument("--prompt", required=True)
p.add_argument("--ref", default="mono", choices=["mono", "sombra", "none"])
args = p.parse_args()

if args.out:
    out_path = Path(args.out)
elif args.video:
    vids = json.load(open(config.REPO_ROOT / "videos.json", encoding="utf-8"))
    out_path = config.REPO_ROOT / vids[args.video]["manifest_dir"] / "thumbnail.jpg"
else:
    p.error("hace falta --video o --out")

out_path.parent.mkdir(parents=True, exist_ok=True)
if out_path.exists():
    out_path.unlink()

client = genai.Client(
    vertexai=True,
    project=config.GEMINI_VERTEX_PROJECT,
    location=config.GEMINI_VERTEX_LOCATION_PRO,
)
# Vídeos con "image_model": "lite" en videos.json: miniatura también con el modelo barato y con su
# propia referencia de personaje (ref_image). El resto sigue con Pro (más caro, ~0,13 €/imagen).
_cfg = json.load(open(config.REPO_ROOT / "videos.json", encoding="utf-8")).get(args.video or "", {})
_model = "gemini-3.1-flash-lite-image" if _cfg.get("image_model") == "lite" else config.GEMINI_IMAGE_MODEL_PRO
refs = load_reference_parts(_cfg.get("ref_image"))
ok = generate_frame(
    client, _model, args.prompt, out_path,
    ref_part=refs.get(args.ref),
)
print("OK" if ok else "FAILED", out_path)
sys.exit(0 if ok else 1)
