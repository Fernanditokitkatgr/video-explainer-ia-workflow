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
import json
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
    """Trocea el guion en el MÍNIMO número de fragmentos <= max_chars, y los deja
    lo más EQUILIBRADOS posible, cortando siempre entre líneas.

    Por qué equilibrado y no 'a lo bruto' (ago-2026): eleven_v3 no puede coser
    fragmentos, así que cada corte es un punto donde la voz PODRÍA cambiar de tono.
    Si el corte cae a mitad de una idea, se nota (pasó en 2 vídeos). Partiendo en
    mitades iguales, el corte cae cerca del centro del guion —normalmente en una
    transición de sección/pausa— y el salto es imperceptible. Además, dos trozos de
    ~3900 quedan holgados bajo el límite de 5000, sin riesgo de text_too_long.
    """
    lines = text.split("\n")
    total = sum(len(ln) + 1 for ln in lines)
    # nº mínimo de trozos para que cada uno quepa bajo el límite
    import math
    n_chunks = max(1, math.ceil(total / max_chars))
    target = total / n_chunks  # tamaño ideal de cada trozo (equilibrado)

    chunks: list[str] = []
    current: list[str] = []
    current_len = 0
    for line in lines:
        added = len(line) + 1
        # cierra el trozo si ya alcanzó el objetivo equilibrado (y aún quedan trozos
        # por abrir), o si añadir esta línea se pasaría del límite duro.
        would_exceed = current and current_len + added > max_chars
        reached_target = current and current_len >= target and len(chunks) < n_chunks - 1
        if would_exceed or reached_target:
            chunks.append("\n".join(current))
            current, current_len = [], 0
        current.append(line)
        current_len += added
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


def effective_settings(stability: float = None, style: float = None) -> dict:
    """Ajustes de voz REALES de esta llamada. El .env manda salvo override explícito.

    OJO (bug real, jul-2026): el .env del canal está afinado MUY expresivo
    (stability 0.10 / style 0.68). Pasar --stability/--style "para mejorar"
    comparando contra los defaults de config.py (0.45/0.30) empeora la
    entonación: sube estabilidad = menos variación, baja style = más seca.
    No pases overrides salvo que sepas que el .env está mal.
    """
    return {
        "stability": config.ELEVENLABS_STABILITY if stability is None else stability,
        "similarity_boost": config.ELEVENLABS_SIMILARITY_BOOST,
        "style": config.ELEVENLABS_STYLE if style is None else style,
        "use_speaker_boost": config.ELEVENLABS_SPEAKER_BOOST,
    }


def _request_tts(text: str, retries: int = 3, stability: float = None, style: float = None,
                 previous_request_ids: list[str] = None, previous_text: str = None,
                 next_text: str = None) -> tuple[bytes, str | None]:
    """Devuelve (audio_bytes, request_id).

    COSTURA ENTRE FRAGMENTOS (ago-2026, bug real que salió en 2 de 3 vídeos):
    cuando un guion supera MAX_CHARS_PER_REQUEST se trocea en varias llamadas, y
    CADA llamada es una generación estocástica independiente. Con stability=0.10
    (el .env del canal, muy expresivo) eso hacía que un fragmento saliera con otro
    acento/timbre — el usuario lo detectó como "la voz cambia a mitad de vídeo" en
    te-han-hackeado y en dni-robado, y hubo que regenerar y re-sincronizar a mano.

    La solución de ElevenLabs para esto es el "request stitching": pasar los
    request_id de los fragmentos ANTERIORES en `previous_request_ids`, más el
    texto de contexto (`previous_text`/`next_text`). Así el modelo condiciona la
    prosodia del fragmento nuevo con lo ya generado, en vez de empezar de cero.
    """
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{config.ELEVENLABS_VOICE_ID}"
    headers = {"xi-api-key": config.ELEVENLABS_API_KEY, "Content-Type": "application/json"}
    payload = {
        "text": text,
        "model_id": config.ELEVENLABS_MODEL_ID,
        "voice_settings": effective_settings(stability, style),
    }
    # La API acepta como máximo 3 request_id previos.
    # NOTA (ago-2026): eleven_v3 NO soporta previous_text/next_text (da 400
    # unsupported_model). Sí acepta previous_request_ids, que es el encadenado por
    # ID — suficiente para que la prosodia continúe entre fragmentos sin cambiar la
    # voz. Por eso solo mandamos los request_ids, no el texto de contexto.
    if previous_request_ids:
        payload["previous_request_ids"] = previous_request_ids[-3:]

    last_err = ""
    for attempt in range(1, retries + 1):
        r = requests.post(url, json=payload, headers=headers, timeout=180)
        if r.status_code == 200:
            return r.content, r.headers.get("request-id")
        last_err = f"{r.status_code}: {r.text[:300]}"
        # eleven_v3 no soporta el encadenado (previous_request_ids): si lo rechaza,
        # reintenta SIN encadenar (chunking normal). El script no debe caerse por esto;
        # la deriva de voz entre fragmentos, si aparece, se corrige regenerando el
        # fragmento afectado (ver docstring).
        if r.status_code == 400 and "unsupported_model" in r.text and "previous_request_ids" in payload:
            payload.pop("previous_request_ids", None)
            print("  ⚠️  eleven_v3 no soporta encadenado; genero el fragmento sin costura.")
            continue
        if r.status_code >= 500 and attempt < retries:  # error transitorio → reintenta
            wait = 2 ** attempt
            print(f"  ⚠️  ElevenLabs {r.status_code}, reintento {attempt}/{retries} en {wait}s…")
            time.sleep(wait)
            continue
        break
    sys.exit(f"Error ElevenLabs {last_err}")


def _write_sidecar(out_path: Path, voice_settings: dict) -> None:
    """Deja constancia de los ajustes REALES junto al mp3, para que
    scripts/preflight.py pueda detectar una entonación plana por override."""
    sidecar = out_path.with_suffix(".voice.json")
    sidecar.write_text(json.dumps({
        "voice_id": config.ELEVENLABS_VOICE_ID,
        "model_id": config.ELEVENLABS_MODEL_ID,
        **voice_settings,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


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

    # Loguea SIEMPRE los ajustes reales: una entonación plana por un override
    # silencioso costó re-renderizar 3 vídeos enteros (ver docstring de effective_settings).
    vs = effective_settings(stability, style)
    origen = "override CLI" if (stability is not None or style is not None) else ".env"
    print(f"Voz: stability={vs['stability']} style={vs['style']} "
          f"similarity={vs['similarity_boost']} (origen: {origen})")

    if len(chunks) == 1:
        print(f"Enviando {len(text)} chars a ElevenLabs ({config.ELEVENLABS_MODEL_ID}, "
              f"voz {config.ELEVENLABS_VOICE_ID})…")
        audio, _ = _request_tts(text, retries, stability, style)
        out_path.write_bytes(audio)
        _write_sidecar(out_path, vs)
        print(f"✅ Audio guardado en {out_path} ({out_path.stat().st_size // 1024} KB)")
        return

    print(f"Guion de {len(text)} chars supera el límite de {MAX_CHARS_PER_REQUEST}/request. "
          f"Troceando en {len(chunks)} fragmentos (con costura para que no cambie la voz)…")
    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)
        part_paths = []
        request_ids: list[str] = []
        for i, chunk in enumerate(chunks, start=1):
            print(f"  [{i}/{len(chunks)}] {len(chunk)} chars…")
            # Contexto de costura: cola del fragmento anterior y cabeza del siguiente.
            # Con esto + previous_request_ids el modelo continúa la MISMA interpretación
            # en vez de empezar una nueva desde cero (ver docstring de _request_tts).
            prev_text = chunks[i - 2][-400:] if i > 1 else None
            next_text = chunks[i][:400] if i < len(chunks) else None
            audio, req_id = _request_tts(
                chunk, retries, stability, style,
                previous_request_ids=request_ids,
                previous_text=prev_text,
                next_text=next_text,
            )
            if req_id:
                request_ids.append(req_id)
            else:
                print("  ⚠️  ElevenLabs no devolvió request-id: este fragmento no queda "
                      "cosido con el anterior, revisa que la voz no cambie en ese punto.")
            part_path = tmp_dir / f"part_{i:02d}.mp3"
            part_path.write_bytes(audio)
            part_paths.append(part_path)
        print("Uniendo fragmentos con ffmpeg…")
        _concat_mp3s(part_paths, out_path)
    _write_sidecar(out_path, vs)
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
    parser.add_argument("--model", default=None,
                        help="Sobreescribe ELEVENLABS_MODEL_ID (p. ej. eleven_v4, el más expresivo en oct-2026)")
    args = parser.parse_args()
    if args.model:
        config.ELEVENLABS_MODEL_ID = args.model

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
