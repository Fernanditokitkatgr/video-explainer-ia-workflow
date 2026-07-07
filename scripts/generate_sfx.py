#!/usr/bin/env python3
"""Genera efectos de sonido/ambiente puntuales con ElevenLabs (Sound Generation API).

No confundir con generate_voice.py (text-to-speech). Este usa el endpoint de
sound-generation — la misma ELEVENLABS_API_KEY, otro producto. Higgsfield NO
puede generar SFX/música sueltos (solo voz), así que este es el camino.

Lee la RECETA desde <manifest_dir>/sfx.json:
    { "video": "...", "sfx": [ {"file", "prompt", "startSec", "duration", "volume"}, ... ] }
Guarda cada clip en remotion/public/<video>-sfx/<file>. Reanudable: salta los que ya existen.

Uso:
    python scripts/generate_sfx.py --video colon-america
"""
import argparse
import json
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Install requests: pip install -r requirements.txt")

import config

SOUND_URL = "https://api.elevenlabs.io/v1/sound-generation"


def load_recipe(cfg: dict) -> dict:
    manifest = config.REPO_ROOT / cfg["manifest_dir"] / "sfx.json"
    if not manifest.exists():
        sys.exit(f"No existe la receta de SFX: {manifest}")
    return json.loads(manifest.read_text(encoding="utf-8"))


def generate_clip(prompt: str, duration: float, out_path: Path, retries: int = 3) -> bool:
    if out_path.exists():
        print(f"  SKIP {out_path.name} (ya existe)")
        return True

    headers = {"xi-api-key": config.ELEVENLABS_API_KEY, "Content-Type": "application/json"}
    payload = {"text": prompt, "duration_seconds": duration}

    last_err = ""
    for attempt in range(1, retries + 1):
        r = requests.post(SOUND_URL, json=payload, headers=headers, timeout=90)
        if r.status_code == 200:
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_bytes(r.content)
            print(f"  OK {out_path.name} ({len(r.content) // 1024} KB)")
            return True
        last_err = f"{r.status_code}: {r.text[:200]}"
        if r.status_code >= 500 and attempt < retries:
            wait = 2 ** attempt
            print(f"  ⚠️  ElevenLabs {r.status_code}, reintento {attempt}/{retries} en {wait}s…")
            time.sleep(wait)
            continue
        break
    print(f"  ERROR {out_path.name}: {last_err}")
    return False


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera SFX/ambiente con ElevenLabs Sound Generation")
    parser.add_argument("--video", required=True, help="Nombre de vídeo en videos.json")
    args = parser.parse_args()

    config.require("ELEVENLABS_API_KEY")
    cfg = config.get_video(args.video)
    recipe = load_recipe(cfg)
    sfx = recipe.get("sfx", [])
    music = recipe.get("music")  # clip único, pensado para loop de fondo (máx 30s por límite de la API)
    out_dir = config.PUBLIC_DIR / f"{cfg['name']}-sfx"

    items = list(sfx) + ([music] if music else [])
    ok = 0
    for i, s in enumerate(items, start=1):
        print(f"[{i}/{len(items)}] {s['file']}")
        if generate_clip(s["prompt"], s.get("duration", 5), out_dir / s["file"]):
            ok += 1

    print(f"\nHecho. {ok}/{len(items)} clips en {out_dir}/")


if __name__ == "__main__":
    main()
