#!/usr/bin/env python3
"""
Generate voice for a Stick to the Plan video using ElevenLabs V3.
Usage:
    python scripts/generate_voice.py scripts-out/ayuno-intermitente.es.txt \
        --out remotion/public/ayuno-intermitente.mp3
"""
import argparse
import os
import sys
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Install requests: pip install requests")

from dotenv import load_dotenv

load_dotenv()

VOICE_ID = "ZSWlW01JDqJRQML1cHGs"  # Triline YouTube
MODEL_ID = "eleven_v3"
API_KEY = os.environ.get("ELEVENLABS_API_KEY")


def generate(script_path: str, out_path: str) -> None:
    if not API_KEY:
        sys.exit("ELEVENLABS_API_KEY not set in .env")

    text = Path(script_path).read_text(encoding="utf-8")

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    headers = {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
    }
    payload = {
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.45,
            "similarity_boost": 0.80,
            "style": 0.30,
            "use_speaker_boost": True,
        },
    }

    print(f"Sending {len(text)} chars to ElevenLabs V3 (voice: Triline YouTube)…")
    r = requests.post(url, json=payload, headers=headers, timeout=120)

    if r.status_code != 200:
        sys.exit(f"ElevenLabs error {r.status_code}: {r.text}")

    Path(out_path).parent.mkdir(parents=True, exist_ok=True)
    Path(out_path).write_bytes(r.content)
    print(f"✅ Audio saved to {out_path} ({len(r.content) // 1024} KB)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("script", help="Path to .txt script file")
    parser.add_argument("--out", default="remotion/public/ayuno-intermitente.mp3")
    args = parser.parse_args()
    generate(args.script, args.out)
