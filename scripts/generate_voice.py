#!/usr/bin/env python3
"""Genera la voz de un vídeo con ElevenLabs (voz/modelo/ajustes desde .env via config.py).

Uso:
    # Por nombre de vídeo (resuelve guion y salida desde videos.json):
    python scripts/generate_voice.py --video sueno-stick

    # O manual:
    python scripts/generate_voice.py scripts-out/ayuno-intermitente.es.txt \
        --out remotion/public/ayuno-intermitente.mp3
"""
import argparse
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Install requests: pip install -r requirements.txt")

import config


def read_script(path: Path) -> str:
    """Lee el guion. Si es .md, descarta cabeceras/front-matter y deja solo la narración."""
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() != ".md":
        return text.strip()
    lines = text.splitlines()
    if "---" in lines:  # salta todo hasta el primer separador '---'
        lines = lines[lines.index("---") + 1:]
    narration = [
        ln.strip() for ln in lines
        if ln.strip() and not ln.strip().startswith(("#", "**", ">"))
    ]
    return "\n".join(narration)


def generate(script_path: Path, out_path: Path, retries: int = 3) -> None:
    config.require("ELEVENLABS_API_KEY")
    text = read_script(script_path)
    if not text:
        sys.exit(f"El guion {script_path} está vacío tras limpiar cabeceras.")

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{config.ELEVENLABS_VOICE_ID}"
    headers = {"xi-api-key": config.ELEVENLABS_API_KEY, "Content-Type": "application/json"}
    payload = {
        "text": text,
        "model_id": config.ELEVENLABS_MODEL_ID,
        "voice_settings": {
            "stability": config.ELEVENLABS_STABILITY,
            "similarity_boost": config.ELEVENLABS_SIMILARITY_BOOST,
            "style": config.ELEVENLABS_STYLE,
            "use_speaker_boost": config.ELEVENLABS_SPEAKER_BOOST,
        },
    }

    print(f"Enviando {len(text)} chars a ElevenLabs ({config.ELEVENLABS_MODEL_ID}, "
          f"voz {config.ELEVENLABS_VOICE_ID})…")

    last_err = ""
    for attempt in range(1, retries + 1):
        r = requests.post(url, json=payload, headers=headers, timeout=180)
        if r.status_code == 200:
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_bytes(r.content)
            print(f"✅ Audio guardado en {out_path} ({len(r.content) // 1024} KB)")
            return
        last_err = f"{r.status_code}: {r.text[:300]}"
        if r.status_code >= 500 and attempt < retries:  # error transitorio → reintenta
            wait = 2 ** attempt
            print(f"  ⚠️  ElevenLabs {r.status_code}, reintento {attempt}/{retries} en {wait}s…")
            time.sleep(wait)
            continue
        break
    sys.exit(f"Error ElevenLabs {last_err}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera voz con ElevenLabs")
    parser.add_argument("script", nargs="?", help="Ruta al guion (.txt o .md)")
    parser.add_argument("--video", help="Nombre de vídeo en videos.json (resuelve guion y salida)")
    parser.add_argument("--out", help="Ruta del .mp3 de salida")
    args = parser.parse_args()

    if args.video:
        cfg = config.get_video(args.video)
        if not cfg.get("script"):
            sys.exit(f"El vídeo '{args.video}' no tiene 'script' en videos.json.")
        script_path = config.REPO_ROOT / cfg["script"]
        out_path = config.PUBLIC_DIR / cfg["audio_static"]
    else:
        if not args.script:
            sys.exit("Indica un guion posicional o usa --video.")
        script_path = Path(args.script)
        out_path = Path(args.out) if args.out else config.PUBLIC_DIR / (script_path.stem + ".mp3")

    if not script_path.exists():
        sys.exit(f"No existe el guion: {script_path}")
    generate(script_path, out_path)


if __name__ == "__main__":
    main()
