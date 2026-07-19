#!/usr/bin/env python3
"""Genera los frames whiteboard de un vídeo con Gemini vía Vertex AI (Google Cloud).

Motor por defecto desde jul-2026 — sustituye a Higgsfield para gastar el crédito de
Google Cloud en vez de dinero de Higgsfield.

IMPORTANTE: usa Vertex AI (no la Gemini Developer API / AI Studio) porque el crédito de
bienvenida de Google Cloud NO se puede gastar en AI Studio (política de Google desde
marzo 2026) — solo en productos "normales" de Cloud como Vertex AI. Por eso la auth es
por ADC (Application Default Credentials), no por API key:
    gcloud auth application-default login
    gcloud auth application-default set-quota-project <PROJECT_ID>
    gcloud auth login  (cuenta activa de CLI)
    gcloud config set project <PROJECT_ID>
    gcloud services enable aiplatform.googleapis.com --project=<PROJECT_ID>
(todo esto ya hecho una vez para project-579f4a95-abb7-4062-9b4 — no hace falta repetirlo
salvo que caduque el token o cambiéis de máquina).

Lee la RECETA de imágenes desde el manifest del vídeo:
    <manifest_dir>/frames.json  →  { "style_base": "...", "frames": [ { "file", "scene" }, ... ] }
Reanudable: salta las imágenes que ya existen.

Uso:
    python scripts/generate_images_gemini.py --video red-neuronal-retropropagacion --model flash
    python scripts/generate_images_gemini.py --video red-neuronal-retropropagacion --model pro --test 5
"""
import argparse
import json
import re
import sys
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    sys.exit("Falta google-genai. Instala con: pip install google-genai")

import config

# Modelos NO disponibles todavía en Vertex AI para este proyecto (probado jul-2026, dan 404):
# gemini-3-pro-image-preview, gemini-3-pro-image. Solo "flash" confirmado funcionando.
VERTEX_PROJECT = "project-579f4a95-abb7-4062-9b4"
VERTEX_LOCATION = "us-central1"


def load_frames(cfg: dict) -> tuple[str, list[dict]]:
    manifest = config.REPO_ROOT / cfg["manifest_dir"] / "frames.json"
    if not manifest.exists():
        sys.exit(f"No existe la receta de imágenes: {manifest}")
    data = json.loads(manifest.read_text(encoding="utf-8"))
    style_base = data.get("style_base", "")
    # Gotcha (jul-2026): un "16:9" literal en el texto del prompt hace que el modelo lo
    # DIBUJE como texto en la imagen — el aspect ratio va por parámetro aparte, no en el texto.
    style_base = re.sub(r"\b16:9\b\.?", "", style_base).strip()
    frames = data.get("frames", [])
    missing_scene = [f["file"] for f in frames if not f.get("scene")]
    if missing_scene:
        sys.exit(f"Faltan prompts de escena (campo 'scene') para: "
                 f"{', '.join(missing_scene[:5])}{'…' if len(missing_scene) > 5 else ''}")
    return style_base, frames


def generate_frame(client, model: str, prompt: str, out_path: Path, retries: int = 3) -> bool:
    if out_path.exists():
        print(f"  SKIP {out_path.name} (ya existe)")
        return True

    last_err = ""
    for attempt in range(1, retries + 1):
        try:
            resp = client.models.generate_content(
                model=model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=types.ImageConfig(aspect_ratio=config.GEMINI_ASPECT_RATIO),
                ),
            )
            img_part = next(p for p in resp.candidates[0].content.parts if p.inline_data)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_bytes(img_part.inline_data.data)
            print(f"  OK {out_path.name} ({len(img_part.inline_data.data) // 1024} KB)")
            return True
        except StopIteration:
            last_err = "respuesta sin imagen"
            break
        except Exception as e:
            last_err = f"{type(e).__name__}: {str(e)[:200]}"
            if attempt < retries:
                print(f"  ⚠️  {last_err}, reintento {attempt}/{retries}…")
                continue
            break
    print(f"  ERROR {out_path.name}: {last_err}")
    return False


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera imágenes whiteboard con Gemini vía Vertex AI")
    parser.add_argument("--video", required=True, help="Nombre de vídeo en videos.json")
    parser.add_argument("--model", choices=["pro", "flash"], default="flash",
                         help="pro = gemini-3-pro-image (aún 404 en Vertex, jul-2026), flash = gemini-2.5-flash-image (funciona)")
    parser.add_argument("--start", type=int, default=0, help="Empieza en este índice (reanudar)")
    parser.add_argument("--test", type=int, help="Solo genera las primeras N imágenes (comparar calidad)")
    args = parser.parse_args()

    model = config.GEMINI_IMAGE_MODEL_PRO if args.model == "pro" else config.GEMINI_IMAGE_MODEL_FLASH
    client = genai.Client(vertexai=True, project=VERTEX_PROJECT, location=VERTEX_LOCATION)

    cfg = config.get_video(args.video)
    style_base, frames = load_frames(cfg)
    out_dir = config.PUBLIC_DIR / cfg["images_subpath"]
    out_dir.mkdir(parents=True, exist_ok=True)

    end = args.start + args.test if args.test else len(frames)
    subset = frames[args.start:end]
    total = len(subset)
    print(f"Modelo: {model} (Vertex AI, proyecto {VERTEX_PROJECT}) — {total} imágenes")

    for i, fr in enumerate(subset, start=1):
        print(f"[{i}/{total}] {fr['file']}")
        prompt = f"{style_base} {fr['scene']}"
        generate_frame(client, model, prompt, out_dir / fr["file"])

    have = sum(1 for fr in frames if (out_dir / fr["file"]).exists())
    print(f"\nHecho. {have}/{len(frames)} imágenes en {out_dir}/")


if __name__ == "__main__":
    main()
