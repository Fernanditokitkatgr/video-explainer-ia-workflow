#!/usr/bin/env python3
"""Configuración compartida del pipeline — ÚNICA fuente de verdad.

Lee variables de entorno desde el .env de la raíz del repo. Las claves NUNCA
se commitean: viven solo en tu .env local (copia .env.example → .env y rellénalo).
El resto del pipeline (generate_voice, generate_images, whisper_timestamps,
validate_assets, orchestrate) importa de aquí en vez de hardcodear valores.
"""
import json
import os
import sys
from pathlib import Path

# La consola de Windows usa cp1252 por defecto y peta con ✓/emoji. Forzamos UTF-8.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass

try:
    from dotenv import load_dotenv
except ImportError:
    raise SystemExit("Falta python-dotenv. Instala con: pip install -r requirements.txt")

REPO_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(REPO_ROOT / ".env")


def _bool(value, default: bool) -> bool:
    if value is None or value == "":
        return default
    return str(value).strip().lower() in ("1", "true", "yes", "on", "si", "sí")


def _float(name: str, default: float) -> float:
    raw = os.environ.get(name)
    return float(raw) if raw not in (None, "") else default


# ── ElevenLabs (voz) ───────────────────────────────────────────────
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")
ELEVENLABS_VOICE_ID = os.environ.get("ELEVENLABS_VOICE_ID", "ZSWlW01JDqJRQML1cHGs")  # Triline YouTube
ELEVENLABS_MODEL_ID = os.environ.get("ELEVENLABS_MODEL_ID", "eleven_v3")
ELEVENLABS_STABILITY = _float("ELEVENLABS_STABILITY", 0.45)
ELEVENLABS_SIMILARITY_BOOST = _float("ELEVENLABS_SIMILARITY_BOOST", 0.80)
ELEVENLABS_STYLE = _float("ELEVENLABS_STYLE", 0.30)
ELEVENLABS_SPEAKER_BOOST = _bool(os.environ.get("ELEVENLABS_SPEAKER_BOOST"), True)

# ── Higgsfield (imágenes) ──────────────────────────────────────────
HIGGSFIELD_API_KEY = os.environ.get("HIGGSFIELD_API_KEY", "")
HIGGSFIELD_MCP_URL = os.environ.get("HIGGSFIELD_MCP_URL", "https://mcp.higgsfield.ai/mcp")
HIGGSFIELD_MODEL = os.environ.get("HIGGSFIELD_MODEL", "nano_banana_pro")
HIGGSFIELD_ASPECT_RATIO = os.environ.get("HIGGSFIELD_ASPECT_RATIO", "16:9")
HIGGSFIELD_STYLE_BASE = os.environ.get(
    "HIGGSFIELD_STYLE_BASE",
    "Simple stickman drawing on white paper, hand-drawn thick black marker lines, "
    "muscular stickman character with long hair, headband, red glasses. "
    "Red glasses are the ONLY color accent. Pure white background. Minimal, clean. ",
)

# ── Gemini vía Vertex AI (imágenes) — motor por defecto desde jul-2026 ────
# Auth por ADC (gcloud auth application-default login), no por API key — ver .env.example.
GEMINI_VERTEX_PROJECT = os.environ.get("GEMINI_VERTEX_PROJECT", "")
GEMINI_VERTEX_LOCATION = os.environ.get("GEMINI_VERTEX_LOCATION", "us-central1")
# gemini-3-pro-image-preview solo se sirve en location="global" en Vertex (probado jul-2026;
# da 404 en us-central1/us-east5/europe-west4). gemini-2.5-flash-image sí funciona en regional.
GEMINI_VERTEX_LOCATION_PRO = os.environ.get("GEMINI_VERTEX_LOCATION_PRO", "global")
GEMINI_IMAGE_MODEL_PRO = os.environ.get("GEMINI_IMAGE_MODEL_PRO", "gemini-3-pro-image-preview")
GEMINI_IMAGE_MODEL_FLASH = os.environ.get("GEMINI_IMAGE_MODEL_FLASH", "gemini-2.5-flash-image")
GEMINI_ASPECT_RATIO = os.environ.get("GEMINI_ASPECT_RATIO", "16:9")

# ── Whisper (timestamps) ───────────────────────────────────────────
WHISPER_ENGINE = os.environ.get("WHISPER_ENGINE", "faster")
WHISPER_MODEL = os.environ.get("WHISPER_MODEL", "base")
WHISPER_LANGUAGE = os.environ.get("WHISPER_LANGUAGE", "es")

# ── Rutas ──────────────────────────────────────────────────────────
REMOTION_DIR = REPO_ROOT / "remotion"
PUBLIC_DIR = REMOTION_DIR / "public"
VIDEOS_REGISTRY = REPO_ROOT / "videos.json"


def load_videos() -> dict:
    if not VIDEOS_REGISTRY.exists():
        raise SystemExit(f"No existe {VIDEOS_REGISTRY}. ¿Lo borraste?")
    return json.loads(VIDEOS_REGISTRY.read_text(encoding="utf-8"))


def get_video(name: str) -> dict:
    """Devuelve la config de un vídeo del registro, con su nombre incrustado."""
    videos = load_videos()
    if name not in videos:
        raise SystemExit(
            f"Vídeo '{name}' no está en videos.json. Disponibles: {', '.join(videos)}"
        )
    cfg = dict(videos[name])
    cfg["name"] = name
    return cfg


def frame_filename(naming: str, ext: str, seg_id: int, start_sec: float) -> str:
    """Nombre de imagen para un segmento. 'seg' → seg_00.png ; 'timestamp' → 0_04.jpg."""
    if naming == "seg":
        return f"seg_{seg_id:02d}.{ext}"
    minutes = int(start_sec) // 60
    seconds = int(start_sec) % 60
    return f"{minutes}_{seconds:02d}.{ext}"


def require(*keys: str) -> None:
    """Aborta con mensaje claro si falta alguna variable de entorno crítica."""
    missing = [k for k in keys if not os.environ.get(k)]
    if missing:
        raise SystemExit(
            "Faltan variables en tu .env: " + ", ".join(missing) +
            "\nCopia .env.example → .env y rellénalas (ver SETUP)."
        )
