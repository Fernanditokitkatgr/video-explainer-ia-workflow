#!/usr/bin/env python3
"""Whisper Timestamp Extractor.

Extrae el segundo exacto de cada SEGMENTO de audio para sincronizar imágenes en
Remotion. Usa segmentos (no palabras) a propósito: el match por palabra da falsos
positivos ("no" dentro de "años").

Idioma / modelo / motor salen del .env (config.py) y se pueden sobreescribir por CLI.

Uso:
    python scripts/whisper_timestamps.py audio.mp3                       # tabla legible
    python scripts/whisper_timestamps.py audio.mp3 --format remotion     # array FRAMES
    python scripts/whisper_timestamps.py audio.mp3 --format frames --output f.json
    python scripts/whisper_timestamps.py audio.mp3 --language en --naming seg --ext png

Instalación:  pip install -r requirements.txt   (faster-whisper) | pip install openai-whisper
"""
import sys
import json
import argparse

import config


def extract_timestamps_whisper(audio_path: str, model_name: str, language: str) -> list[dict]:
    import whisper
    print(f"Cargando openai-whisper ({model_name})…")
    model = whisper.load_model(model_name)
    print(f"Transcribiendo: {audio_path}")
    result = model.transcribe(audio_path, word_timestamps=True, language=language)
    return [
        {"id": seg["id"], "start": round(seg["start"], 2),
         "end": round(seg["end"], 2), "text": seg["text"].strip()}
        for seg in result["segments"]
    ]


def extract_timestamps_faster(audio_path: str, model_name: str, language: str) -> list[dict]:
    from faster_whisper import WhisperModel
    print(f"Cargando faster-whisper ({model_name})…")
    model = WhisperModel(model_name, device="cpu", compute_type="int8")
    print(f"Transcribiendo: {audio_path}")
    segments_iter, _info = model.transcribe(audio_path, language=language, word_timestamps=True)
    return [
        {"id": i, "start": round(seg.start, 2),
         "end": round(seg.end, 2), "text": seg.text.strip()}
        for i, seg in enumerate(segments_iter)
    ]


def to_frames(segments: list[dict], naming: str, ext: str) -> list[dict]:
    """Receta lista para Remotion: {file, startSec, text} por segmento."""
    return [
        {"file": config.frame_filename(naming, ext, seg["id"], seg["start"]),
         "startSec": seg["start"], "text": seg["text"]}
        for seg in segments
    ]


def format_for_remotion(frames: list[dict]) -> str:
    lines = ["const FRAMES: { file: string; startSec: number }[] = ["]
    for f in frames:
        lines.append(f"  {{ file: '{f['file']}', startSec: {f['startSec']} }},  // \"{f['text']}\"")
    lines.append("];")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Extrae timestamps de audio con Whisper")
    parser.add_argument("audio", help="Ruta al audio (.mp3, .wav, …)")
    parser.add_argument("--format", choices=["json", "remotion", "frames", "plain"],
                        default="plain", help="json=segmentos · frames=receta {file,startSec,text} · remotion=array TS")
    parser.add_argument("--output", help="Fichero de salida (por defecto: stdout)")
    parser.add_argument("--engine", choices=["whisper", "faster"], default=config.WHISPER_ENGINE)
    parser.add_argument("--model", default=config.WHISPER_MODEL)
    parser.add_argument("--language", default=config.WHISPER_LANGUAGE)
    parser.add_argument("--naming", choices=["timestamp", "seg"], default="timestamp")
    parser.add_argument("--ext", default="jpg")
    args = parser.parse_args()

    try:
        extract = extract_timestamps_faster if args.engine == "faster" else extract_timestamps_whisper
        segments = extract(args.audio, args.model, args.language)
    except ImportError as e:
        print(f"Error: {e}")
        sys.exit("Instala con: pip install -r requirements.txt  (o: pip install openai-whisper)")

    if args.format == "json":
        output = json.dumps(segments, ensure_ascii=False, indent=2)
    elif args.format in ("frames", "remotion"):
        frames = to_frames(segments, args.naming, args.ext)
        output = (json.dumps(frames, ensure_ascii=False, indent=2)
                  if args.format == "frames" else format_for_remotion(frames))
    else:
        rows = [f"{'ID':>3}  {'START':>8}  {'END':>8}  TEXT", "-" * 60]
        rows += [f"{s['id']:>3}  {s['start']:>8.2f}s  {s['end']:>8.2f}s  {s['text']}" for s in segments]
        output = "\n".join(rows)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(output)
        print(f"✓ Guardado en: {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
