#!/usr/bin/env python3
"""Orquestador del pipeline de vídeo — encadena los pasos y guarda el estado.

Pasos:  voice → whisper → inject → images → validate → render

· El ESTADO se guarda en <manifest_dir>/state.json y SÍ va a git: si dejas un
  vídeo a medias, tu compañero hace `git pull`, lanza `--status` y ve dónde quedó.
· Los FRAMES se inyectan en el .tsx entre los marcadores // === FRAMES:START/END ===.
· Gates HITL (revisión humana) entre pasos críticos salvo que pases --yes.

Uso:
    python scripts/orchestrate.py --video sueno-stick --status
    python scripts/orchestrate.py --video sueno-stick --steps voice,whisper,inject
    python scripts/orchestrate.py --video sueno-stick           # pipeline completo
    python scripts/orchestrate.py --video sueno-stick --yes     # sin pausas HITL
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

import config

SCRIPTS = Path(__file__).resolve().parent
ALL_STEPS = ["voice", "whisper", "inject", "images", "validate", "render"]
HITL = {  # mensaje de revisión humana ANTES de continuar tras el paso clave
    "voice": "Escucha el audio entero. ¿Suena natural? Corrige el guion y regenera si hace falta.",
    "images": "Verifica que están TODAS las imágenes. Una que falte descuadra el resto.",
    "validate": "Abre el studio (npm run dev) y comprueba la sincronía antes de renderizar.",
}
FRAMES_RE = re.compile(r"(// === FRAMES:START.*?===\n)(.*?)(\s*// === FRAMES:END ===)", re.DOTALL)


# ── estado ─────────────────────────────────────────────────────────
def state_path(cfg: dict) -> Path:
    return config.REPO_ROOT / cfg["manifest_dir"] / "state.json"


def load_state(cfg: dict) -> dict:
    p = state_path(cfg)
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return {"video": cfg["name"], "steps": {s: "pending" for s in ALL_STEPS}}


def save_state(cfg: dict, state: dict) -> None:
    p = state_path(cfg)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def frames_json_path(cfg: dict) -> Path:
    return config.REPO_ROOT / cfg["manifest_dir"] / "frames.json"


def run(cmd: list[str]) -> None:
    print(f"$ {' '.join(cmd)}")
    res = subprocess.run(cmd, cwd=config.REPO_ROOT)
    if res.returncode != 0:
        sys.exit(f"Paso falló (exit {res.returncode}): {' '.join(cmd)}")


# ── pasos ──────────────────────────────────────────────────────────
def step_voice(cfg: dict) -> None:
    run([sys.executable, str(SCRIPTS / "generate_voice.py"), "--video", cfg["name"]])


def step_whisper(cfg: dict) -> None:
    """Transcribe el audio y fusiona el timing con las escenas existentes en frames.json."""
    audio = config.PUBLIC_DIR / cfg["audio_static"]
    if not audio.exists():
        sys.exit(f"No existe el audio {audio}. Corre el paso 'voice' primero.")
    tmp = config.REPO_ROOT / cfg["manifest_dir"] / ".frames.timing.json"
    tmp.parent.mkdir(parents=True, exist_ok=True)
    run([sys.executable, str(SCRIPTS / "whisper_timestamps.py"), str(audio),
         "--format", "frames", "--naming", cfg["naming"], "--ext", cfg["ext"],
         "--output", str(tmp)])

    timing = json.loads(tmp.read_text(encoding="utf-8"))
    tmp.unlink(missing_ok=True)

    fj = frames_json_path(cfg)
    old = []
    if fj.exists():
        old = json.loads(fj.read_text(encoding="utf-8")).get("frames", [])
    for i, fr in enumerate(timing):  # conserva el prompt de escena por posición
        fr["scene"] = old[i].get("scene") if i < len(old) else None
    fj.write_text(json.dumps({"video": cfg["name"], "frames": timing},
                             ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"✓ Receta actualizada: {fj.relative_to(config.REPO_ROOT)} ({len(timing)} frames)")


def step_inject(cfg: dict) -> None:
    """Inyecta el array FRAMES (file+startSec) de frames.json en el .tsx."""
    fj = frames_json_path(cfg)
    if not fj.exists():
        sys.exit(f"No existe {fj}. Corre 'whisper' primero.")
    frames = json.loads(fj.read_text(encoding="utf-8")).get("frames", [])

    lines = ["const FRAMES: { file: string; startSec: number }[] = ["]
    for fr in frames:
        comment = f"  // \"{fr['text']}\"" if fr.get("text") else ""
        lines.append(f"  {{ file: '{fr['file']}', startSec: {fr['startSec']} }},{comment}")
    lines.append("];")
    block = "\n".join(lines) + "\n"

    tsx = config.REPO_ROOT / cfg["tsx"]
    text = tsx.read_text(encoding="utf-8")
    if not FRAMES_RE.search(text):
        sys.exit(f"No encontré marcadores // === FRAMES:START/END === en {cfg['tsx']}.")
    new = FRAMES_RE.sub(lambda m: m.group(1) + block + m.group(3), text)
    tsx.write_text(new, encoding="utf-8")
    print(f"✓ FRAMES inyectados en {cfg['tsx']} ({len(frames)} entradas)")


def step_images(cfg: dict) -> None:
    run([sys.executable, str(SCRIPTS / "generate_images.py"), "--video", cfg["name"]])


def step_validate(cfg: dict) -> None:
    run([sys.executable, str(SCRIPTS / "validate_assets.py"), "--video", cfg["name"]])


def step_render(cfg: dict) -> None:
    out = f"output/{cfg['name']}.mp4"
    run(["npx", "remotion", "render", cfg["composition"], out])
    print(f"✓ Render en remotion/{out}")


STEP_FN = {
    "voice": step_voice, "whisper": step_whisper, "inject": step_inject,
    "images": step_images, "validate": step_validate, "render": step_render,
}


def main() -> None:
    parser = argparse.ArgumentParser(description="Orquesta el pipeline de un vídeo")
    parser.add_argument("--video", required=True, help="Nombre de vídeo en videos.json")
    parser.add_argument("--steps", default=",".join(ALL_STEPS),
                        help=f"Pasos a ejecutar, en orden. Por defecto: {','.join(ALL_STEPS)}")
    parser.add_argument("--status", action="store_true", help="Solo muestra el estado y sale")
    parser.add_argument("--yes", action="store_true", help="Sin pausas HITL (no recomendado)")
    args = parser.parse_args()

    cfg = config.get_video(args.video)
    state = load_state(cfg)

    if args.status:
        print(f"Estado de '{cfg['name']}':")
        for s in ALL_STEPS:
            print(f"  {state['steps'].get(s, 'pending'):>8}  {s}")
        return

    steps = [s.strip() for s in args.steps.split(",") if s.strip()]
    bad = [s for s in steps if s not in STEP_FN]
    if bad:
        sys.exit(f"Pasos desconocidos: {', '.join(bad)}. Válidos: {', '.join(ALL_STEPS)}")

    for s in steps:
        print(f"\n=== {s.upper()} ===")
        STEP_FN[s](cfg)
        state["steps"][s] = "done"
        save_state(cfg, state)
        if s in HITL and not args.yes and s != steps[-1]:
            print(f"\n🛑 HITL — {HITL[s]}")
            input("   Pulsa Enter para continuar (Ctrl+C para parar)… ")

    print(f"\n✅ Listo. Pasos ejecutados: {', '.join(steps)}")


if __name__ == "__main__":
    main()
