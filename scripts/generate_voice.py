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
import subprocess
import sys
import tempfile
import time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Install requests: pip install -r requirements.txt")

import config

# ElevenLabs devuelve 400 text_too_long por encima de 5000 chars por request.
MAX_CHARS_PER_REQUEST = 4800


def chunk_text(text: str, max_chars: int = MAX_CHARS_PER_REQUEST) -> list[str]:
    """Trocea el guion en fragmentos <= max_chars, cortando solo entre líneas
    (nunca a mitad de frase) para no partir un beat narrativo entre requests."""
    lines = text.split("\n")
    chunks: list[str] = []
    current: list[str] = []
    current_len = 0
    for line in lines:
        added_len = len(line) + 1
        if current and current_len + added_len > max_chars:
            chunks.append("\n".join(current))
            current, current_len = [], 0
        current.append(line)
        current_len += added_len
    if current:
        chunks.append("\n".join(current))
    return chunks


def read_script(path: Path) -> str:
    """Lee el guion. Si es .md, descarta cabeceras/front-matter y deja solo la narración.
    Se detiene en cualquier '## ' (ej. '## Notas de producción'): son metadatos de
    producción, nunca narración, y no deben leerse en voz alta."""
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() != ".md":
        return text.strip()
    lines = text.splitlines()
    if "---" in lines:  # salta todo hasta el primer separador '---'
        lines = lines[lines.index("---") + 1:]
    narration = []
    for ln in lines:
        s = ln.strip()
        if not s:
            continue
        if s.startswith("##"):
            break
        if s.startswith(("#", "**", ">", "-")):
            continue
        narration.append(s)
    return "\n".join(narration)


def _request_tts(text: str, retries: int = 3, stability: float = None, style: float = None) -> bytes:
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{config.ELEVENLABS_VOICE_ID}"
    headers = {"xi-api-key": config.ELEVENLABS_API_KEY, "Content-Type": "application/json"}
    payload = {
        "text": text,
        "model_id": config.ELEVENLABS_MODEL_ID,
        "voice_settings": {
            "stability": config.ELEVENLABS_STABILITY if stability is None else stability,
            "similarity_boost": config.ELEVENLABS_SIMILARITY_BOOST,
            "style": config.ELEVENLABS_STYLE if style is None else style,
            "use_speaker_boost": config.ELEVENLABS_SPEAKER_BOOST,
        },
    }
    last_err = ""
    for attempt in range(1, retries + 1):
        r = requests.post(url, json=payload, headers=headers, timeout=180)
        if r.status_code == 200:
            return r.content
        last_err = f"{r.status_code}: {r.text[:300]}"
        if r.status_code >= 500 and attempt < retries:  # error transitorio → reintenta
            wait = 2 ** attempt
            print(f"  ⚠️  ElevenLabs {r.status_code}, reintento {attempt}/{retries} en {wait}s…")
            time.sleep(wait)
            continue
        break
    sys.exit(f"Error ElevenLabs {last_err}")


def _concat_mp3s(parts: list[Path], out_path: Path) -> None:
    """Concatena varios .mp3 con ffmpeg (concat demuxer, sin recodificar)."""
    with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False, encoding="utf-8") as f:
        for p in parts:
            f.write(f"file '{p.as_posix()}'\n")
        list_path = Path(f.name)
    try:
        subprocess.run(
            ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_path),
             "-c", "copy", str(out_path)],
            check=True, capture_output=True, text=True,
        )
    except FileNotFoundError:
        sys.exit("ffmpeg no está en el PATH. Necesario para unir los fragmentos de audio.")
    except subprocess.CalledProcessError as e:
        sys.exit(f"ffmpeg falló uniendo audio: {e.stderr[-500:]}")
    finally:
        list_path.unlink(missing_ok=True)


def generate(script_path: Path, out_path: Path, retries: int = 3,
             stability: float = None, style: float = None) -> None:
    config.require("ELEVENLABS_API_KEY")
    text = read_script(script_path)
    if not text:
        sys.exit(f"El guion {script_path} está vacío tras limpiar cabeceras.")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    chunks = chunk_text(text)

    if len(chunks) == 1:
        print(f"Enviando {len(text)} chars a ElevenLabs ({config.ELEVENLABS_MODEL_ID}, "
              f"voz {config.ELEVENLABS_VOICE_ID})…")
        out_path.write_bytes(_request_tts(text, retries, stability, style))
        print(f"✅ Audio guardado en {out_path} ({out_path.stat().st_size // 1024} KB)")
        return

    print(f"Guion de {len(text)} chars supera el límite de {MAX_CHARS_PER_REQUEST}/request. "
          f"Troceando en {len(chunks)} fragmentos…")
    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)
        part_paths = []
        for i, chunk in enumerate(chunks, start=1):
            print(f"  [{i}/{len(chunks)}] {len(chunk)} chars…")
            part_path = tmp_dir / f"part_{i:02d}.mp3"
            part_path.write_bytes(_request_tts(chunk, retries, stability, style))
            part_paths.append(part_path)
        print("Uniendo fragmentos con ffmpeg…")
        _concat_mp3s(part_paths, out_path)
    print(f"✅ Audio guardado en {out_path} ({out_path.stat().st_size // 1024} KB)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera voz con ElevenLabs")
    parser.add_argument("script", nargs="?", help="Ruta al guion (.txt o .md)")
    parser.add_argument("--video", help="Nombre de vídeo en videos.json (resuelve guion y salida)")
    parser.add_argument("--out", help="Ruta del .mp3 de salida")
    parser.add_argument("--stability", type=float, default=None,
                         help="Sobreescribe ELEVENLABS_STABILITY solo para esta llamada (más bajo = más expresivo)")
    parser.add_argument("--style", type=float, default=None,
                         help="Sobreescribe ELEVENLABS_STYLE solo para esta llamada (más alto = más expresivo)")
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
    generate(script_path, out_path, stability=args.stability, style=args.style)


if __name__ == "__main__":
    main()
