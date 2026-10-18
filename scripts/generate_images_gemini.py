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

COHERENCIA (ago-2026): antes de generar corre scripts/scene_diversity_check.py como gate
(igual que preflight.py, no es opcional — se puede saltar con --skip-diversity-check pero
hay que decir por qué). Además, SIEMPRE adjunta como imagen de entrada la referencia
canónica del personaje (channel/tecno/style-bible.json → personaje_protagonista.
imagen_referencia_canonica) en cada llamada de generación — describir el diseño solo en
texto deriva con el tiempo (ver memoria: "Fix deriva de personaje en Vertex"). Usa --no-ref
solo si de verdad no quieres anclar el personaje (p.ej. escenas sin ningún personaje).

Uso:
    python scripts/generate_images_gemini.py --video red-neuronal-retropropagacion --model flash
    python scripts/generate_images_gemini.py --video red-neuronal-retropropagacion --model pro --test 5
"""
import argparse
import json
import re
import sys
import time
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    sys.exit("Falta google-genai. Instala con: pip install google-genai")

import config

# Gotcha (jul-2026): gemini-3-pro-image-preview SOLO responde con location="global" en
# Vertex — con cualquier región concreta (us-central1, us-east5, europe-west4) da 404
# "not found or your project does not have access", que parece un error de acceso pero
# es en realidad un problema de región. gemini-2.5-flash-image sí funciona en regional.


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


def _load_part(ref_path: Path):
    if not ref_path or not ref_path.exists():
        return None
    mime = "image/png" if ref_path.suffix.lower() == ".png" else "image/jpeg"
    return types.Part.from_bytes(data=ref_path.read_bytes(), mime_type=mime)


def load_reference_parts(override_rel: str | None = None):
    """Devuelve un dict {clave: Part} con las referencias canonicas del canal.

    Si el vídeo trae `ref_image` en videos.json (estilo alternativo, p. ej. el mono stick
    cutre de oct-2026), esa imagen sustituye a la de Sara para 'mono' y 'none'.
    'mono' = protagonista (Sara), 'sombra' = hacker-sombra atacante. Cada escena de
    frames.json elige cual adjuntar con su campo 'ref' (mono|sombra|none). Anclar el
    diseno con imagen es obligatorio: describirlo solo en texto deriva con el tiempo."""
    bible_path = config.REPO_ROOT / "channel" / "tecno" / "style-bible.json"
    parts = {}
    if not bible_path.exists():
        return parts
    bible = json.loads(bible_path.read_text(encoding="utf-8"))
    # Cada personaje usa SU PROPIA referencia canónica única — la consistencia viene de
    # "una sola referencia por personaje + prompt simple", NO de reusar la misma imagen
    # para todos. Bug real (ago-2026): usar la referencia del mono para 'sombra' hacía
    # que el atacante derivara (ojos rojos, boca con dientes, capucha azul) porque nunca
    # se le mostraba al modelo cómo es realmente el hacker-sombra.
    mono_rel = override_rel or bible.get("personaje_protagonista", {}).get("imagen_referencia_canonica")
    mono_ref = _load_part(config.REPO_ROOT / mono_rel) if mono_rel else None
    sombra_ref = _load_part(config.REPO_ROOT / "channel" / "tecno" / "references" / "hacker_sombra.png")
    if mono_ref is not None:
        parts["mono"] = [mono_ref]
        parts["none"] = [mono_ref]
    if sombra_ref is not None:
        parts["sombra"] = [sombra_ref]
    return parts


def generate_frame(client, model: str, prompt: str, out_path: Path, ref_part=None, retries: int = 5) -> bool:
    if out_path.exists():
        print(f"  SKIP {out_path.name} (ya existe)")
        return True

    # ref_part puede ser una lista de imágenes de referencia (o None)
    contents = ([*ref_part, prompt] if ref_part else prompt)
    last_err = ""
    for attempt in range(1, retries + 1):
        try:
            resp = client.models.generate_content(
                model=model,
                contents=contents,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=types.ImageConfig(aspect_ratio=config.GEMINI_ASPECT_RATIO),
                ),
            )
            # Cuando el modelo BLOQUEA un prompt devuelve candidates con content.parts
            # a None, y el `next(...)` reventaba con un 'NoneType is not iterable' que
            # no dice nada y encima se reintentaba 5 veces en balde. Aquí se saca el
            # motivo real (finish_reason / safety) y se corta sin reintentar, porque
            # repetir el mismo prompt bloqueado nunca lo desbloquea.
            cand = (resp.candidates or [None])[0]
            partes = getattr(getattr(cand, "content", None), "parts", None)
            if not partes:
                motivo = getattr(cand, "finish_reason", None) or "desconocido"
                bloqueo = getattr(getattr(resp, "prompt_feedback", None), "block_reason", None)
                last_err = (f"prompt RECHAZADO por el modelo (finish_reason={motivo}"
                            f"{f', block_reason={bloqueo}' if bloqueo else ''}) "
                            f"— reescribe la escena, reintentar no sirve")
                break
            img_part = next(p for p in partes if p.inline_data)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_bytes(img_part.inline_data.data)
            print(f"  OK {out_path.name} ({len(img_part.inline_data.data) // 1024} KB)")
            return True
        except StopIteration:
            last_err = "respuesta sin ninguna parte de imagen"
            break
        except Exception as e:
            last_err = f"{type(e).__name__}: {str(e)[:200]}"
            # Gotcha (jul-2026): 429 RESOURCE_EXHAUSTED (cuota de peticiones/minuto de
            # Vertex AI) aparece a partir de la imagen ~40 en una tanda rápida seguida.
            # Backoff mucho más largo para 429 que para otros errores transitorios.
            is_429 = "429" in last_err or "RESOURCE_EXHAUSTED" in last_err
            if attempt < retries:
                wait = 15 * attempt if is_429 else 2 ** attempt
                print(f"  ⚠️  {last_err}, reintento {attempt}/{retries} en {wait}s…")
                time.sleep(wait)
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
    parser.add_argument("--no-ref", action="store_true", help="No adjuntar la imagen de referencia canónica (por defecto SÍ se adjunta)")
    parser.add_argument("--skip-diversity-check", action="store_true", help="Salta el gate de scene_diversity_check.py (documenta por qué si lo usas)")
    args = parser.parse_args()

    if not args.skip_diversity_check:
        from scene_diversity_check import run_check, print_report
        rep = run_check(args.video)
        if rep["fallos"]:
            print_report(rep)
            sys.exit(
                "\nscene_diversity_check FALLÓ — reescribe las escenas señaladas antes de generar, "
                "o vuelve a llamar con --skip-diversity-check si de verdad quieres seguir así."
            )

    if args.model == "pro":
        model = config.GEMINI_IMAGE_MODEL_PRO
        location = config.GEMINI_VERTEX_LOCATION_PRO
    else:
        model = config.GEMINI_IMAGE_MODEL_FLASH
        location = config.GEMINI_VERTEX_LOCATION
    client = genai.Client(vertexai=True, project=config.GEMINI_VERTEX_PROJECT, location=location)

    cfg = config.get_video(args.video)
    style_base, frames = load_frames(cfg)
    out_dir = config.PUBLIC_DIR / cfg["images_subpath"]
    out_dir.mkdir(parents=True, exist_ok=True)

    ref_parts = {} if args.no_ref else load_reference_parts(cfg.get("ref_image"))
    print(f"Referencias de personaje: {'NO adjuntas (--no-ref)' if args.no_ref else (', '.join(sorted(ref_parts)) or 'ninguna encontrada')}")

    end = args.start + args.test if args.test else len(frames)
    subset = frames[args.start:end]
    total = len(subset)
    print(f"Modelo: {model} (Vertex AI, proyecto {config.GEMINI_VERTEX_PROJECT}, location={location}) — {total} imágenes")

    for i, fr in enumerate(subset, start=1):
        print(f"[{i}/{total}] {fr['file']}")
        prompt = f"{style_base} {fr['scene']}"
        # Cada escena elige su referencia con el campo 'ref' (mono|sombra|none). Si no
        # lo trae (frames antiguos), cae a 'mono' para no perder el anclaje del personaje.
        ref_key = fr.get("ref", "mono")
        ref_part = ref_parts.get(ref_key)
        generate_frame(client, model, prompt, out_dir / fr["file"], ref_part=ref_part)
        time.sleep(1.5)  # ritmo para no disparar la cuota de peticiones/minuto de Vertex AI

    have = sum(1 for fr in frames if (out_dir / fr["file"]).exists())
    print(f"\nHecho. {have}/{len(frames)} imágenes en {out_dir}/")


if __name__ == "__main__":
    main()
