#!/usr/bin/env python3
"""Generador de subtítulos a partir de frames.json.

frames.json ya trae, por cada bloque, el `startSec` real (segundo en el audio
original, antes de aplicar PLAYBACK_RATE) y el `text` transcrito por whisper.
Este script solo convierte esos datos a un formato de subtítulo: no vuelve a
transcribir nada.

El tiempo de cada bloque en el VÍDEO renderizado es `startSec / PLAYBACK_RATE`
(el vídeo se reproduce a PLAYBACK_RATE veces más rápido que el audio original -
ver `videos.json` para el valor de cada vídeo, y el mismo criterio usado para
los capítulos de YouTube en los `seo.md`).

El `text` de frames.json es la transcripción de whisper, no el guion: puede
traer errores de oído (nombres propios, palabras pegadas). Corrígelos en el
diccionario FIXES según aparezcan — no edites frames.json, ese fichero es el
que sincroniza imágenes y no debe tocarse por esto.

Uso:
    python scripts/generate_subs.py steve-jobs --format srt
    python scripts/generate_subs.py steve-jobs --format txt
    python scripts/generate_subs.py como-funciona-la-ia --format srt --output otro/path.srt
"""
import argparse
import re
import sys

import config

MIN_DUR = 1.2
TAIL = 3.0

# Errores de transcripción de whisper detectados en producción — añade aquí
# los que vayan apareciendo en vídeos nuevos.
FIXES = [
    (r"Steve Jobsano", "Steve Jobs sano"),
    (r"\bBosniak\b", "Wozniak"),
    (r"Una cordes magia", "Una red neuronal no es magia"),
    (r"dosamente posible", "dudosamente posible"),
    (r"semi -supervisado", "semi-supervisado"),
    (r"Key Nearest Neighbors", "k-nearest neighbors"),
    (r"\bclassifica\b", "clasifica"),
    (r"No imagía, no hay conciencia", "No hay magia, no hay conciencia"),
    (r"descenso degradiente", "descenso de gradiente"),
    (r"(\d+) \.000", r"\1.000"),
    (r"\bagradiente\b", "gradiente"),
    (r"\bes cupe resultados\b", "escupe resultados"),
    (r"0 ,(\d)", r"0,\1"),
    (r"teoría heavyana", "teoría hebbiana"),
    (r"retro -propagación", "retropropagación"),
    (r"\bRevolves todos tus datos\b", "Revuelves todos tus datos"),
    (r"un borracho tan valeándose", "un borracho tambaleándose"),
    (r"\bexiste emenist\b", "existe MNIST"),
    (r"\bproyecto real deía\b", "proyecto real de IA"),
]


def clean(text: str) -> str:
    for pattern, repl in FIXES:
        text = re.sub(pattern, repl, text)
    return text.strip()


def fmt_srt_time(t: float) -> str:
    t = max(t, 0)
    total_ms = int(round(t * 1000))
    h, rem = divmod(total_ms, 3600_000)
    m, rem = divmod(rem, 60_000)
    s, ms = divmod(rem, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def build_srt(frames: list[dict], rate: float) -> str:
    starts = [f["startSec"] / rate for f in frames]
    blocks = []
    for i, f in enumerate(frames):
        start = starts[i]
        end = starts[i + 1] if i + 1 < len(frames) else start + TAIL
        if end - start < MIN_DUR:
            end = start + MIN_DUR
        blocks.append(f"{i + 1}\n{fmt_srt_time(start)} --> {fmt_srt_time(end)}\n{clean(f['text'])}\n")
    return "\n".join(blocks)


def build_txt(frames: list[dict]) -> str:
    return "\n".join(clean(f["text"]) for f in frames)


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera subtítulos (.srt) o guion plano (.txt) desde frames.json")
    parser.add_argument("video", help="Nombre del vídeo tal como aparece en videos.json (p.ej. steve-jobs)")
    parser.add_argument("--format", choices=["srt", "txt"], default="srt")
    parser.add_argument("--output", help="Ruta de salida (por defecto: subs.srt o subs.txt junto a frames.json)")
    args = parser.parse_args()

    cfg = config.get_video(args.video)
    manifest_dir = config.REPO_ROOT / cfg["manifest_dir"]
    frames_path = manifest_dir / "frames.json"
    if not frames_path.exists():
        sys.exit(f"No existe {frames_path}")

    import json
    frames = json.loads(frames_path.read_text(encoding="utf-8"))["frames"]
    rate = cfg.get("playback_rate", 1.0)

    output = build_srt(frames, rate) if args.format == "srt" else build_txt(frames)
    out_path = manifest_dir / (args.output or f"subs.{args.format}")
    out_path.write_text(output, encoding="utf-8")
    print(f"OK: {out_path} ({len(frames)} bloques)")


if __name__ == "__main__":
    main()
