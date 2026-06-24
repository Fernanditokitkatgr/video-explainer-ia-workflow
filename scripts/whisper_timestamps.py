"""
Whisper Timestamp Extractor
Extrae el segundo exacto de cada segmento de audio para sincronizar con imágenes en Remotion.

Uso:
    python whisper_timestamps.py audio.mp3
    python whisper_timestamps.py audio.mp3 --format remotion
    python whisper_timestamps.py audio.mp3 --output timestamps.json

Instalación:
    pip install openai-whisper
    # o faster-whisper (más rápido):
    pip install faster-whisper
"""

import sys
import json
import argparse


def extract_timestamps_whisper(audio_path: str) -> list[dict]:
    """Usa openai-whisper para extraer timestamps."""
    import whisper

    print(f"Cargando modelo Whisper...")
    model = whisper.load_model("base")

    print(f"Transcribiendo: {audio_path}")
    result = model.transcribe(
        audio_path,
        word_timestamps=True,
        language="es"
    )

    segments = []
    for seg in result["segments"]:
        segments.append({
            "id": seg["id"],
            "start": round(seg["start"], 2),
            "end": round(seg["end"], 2),
            "text": seg["text"].strip()
        })

    return segments


def extract_timestamps_faster(audio_path: str) -> list[dict]:
    """Usa faster-whisper (más rápido, recomendado)."""
    from faster_whisper import WhisperModel

    print("Cargando modelo faster-whisper (base)...")
    model = WhisperModel("base", device="cpu", compute_type="int8")

    print(f"Transcribiendo: {audio_path}")
    segments_iter, info = model.transcribe(audio_path, language="es", word_timestamps=True)

    segments = []
    for i, seg in enumerate(segments_iter):
        segments.append({
            "id": i,
            "start": round(seg.start, 2),
            "end": round(seg.end, 2),
            "text": seg.text.strip()
        })

    return segments


def format_for_remotion(segments: list[dict]) -> str:
    """Genera el array FRAMES listo para pegar en InteresCompuesto.tsx."""
    lines = ["const FRAMES = ["]
    for seg in segments:
        m = int(seg["start"]) // 60
        s = seg["start"] % 60
        filename = f"{m}_{int(s):02d}.jpg"
        lines.append(f"  {{ file: '{filename}', startSec: {seg['start']} }},  // \"{seg['text']}\"")
    lines.append("];")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Extrae timestamps de audio con Whisper")
    parser.add_argument("audio", help="Ruta al archivo de audio (.mp3, .wav, etc.)")
    parser.add_argument("--format", choices=["json", "remotion", "plain"], default="plain",
                        help="Formato de salida (default: plain)")
    parser.add_argument("--output", help="Archivo de salida (opcional, por defecto imprime en consola)")
    parser.add_argument("--engine", choices=["whisper", "faster"], default="faster",
                        help="Motor de transcripción (default: faster-whisper)")
    args = parser.parse_args()

    # Extraer segmentos
    try:
        if args.engine == "faster":
            segments = extract_timestamps_faster(args.audio)
        else:
            segments = extract_timestamps_whisper(args.audio)
    except ImportError as e:
        print(f"Error: {e}")
        print("Instala con: pip install faster-whisper  (o: pip install openai-whisper)")
        sys.exit(1)

    # Formatear output
    if args.format == "json":
        output = json.dumps(segments, ensure_ascii=False, indent=2)
    elif args.format == "remotion":
        output = format_for_remotion(segments)
    else:
        # Plain: tabla legible
        lines = [f"{'ID':>3}  {'START':>8}  {'END':>8}  TEXT"]
        lines.append("-" * 60)
        for seg in segments:
            lines.append(f"{seg['id']:>3}  {seg['start']:>8.2f}s  {seg['end']:>8.2f}s  {seg['text']}")
        output = "\n".join(lines)

    # Output
    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(output)
        print(f"✓ Guardado en: {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
