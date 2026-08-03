#!/usr/bin/env python3
"""Supervisor de producción: lleva uno o varios vídeos de guion a MP4 sin vigilancia.

POR QUÉ EXISTE
Las tandas largas (2-3 h de imágenes, ~25 min de render) se morían a mitad una y otra
vez. La causa no era ningún script: los lanzaba desde la sesión del asistente, y cuando
el proceso de Claude Code se recicla se lleva por delante todo lo que colgaba de él —
por eso el log aparecía vacío, ni daba tiempo a volcarlo. Producir 20 vídeos así es
inviable: cada tanda necesitaría que alguien la relanzara a mano.

Este supervisor se lanza aparte (ver produce.bat) y sobrevive a todo eso. Además:
- Cada etapa es IDEMPOTENTE: si ya está hecha, la salta. Relanzarlo nunca duplica trabajo
  ni gasta créditos de más.
- Reintenta las etapas que fallan, con espera creciente. Las imágenes son reanudables,
  así que un reintento continúa donde se quedó en vez de empezar de cero.
- Escribe el progreso a fichero según ocurre (sin búfer), para poder mirar cómo va.

Uso:
    python scripts/produce.py --videos hackear-la-ia te-han-hackeado-y-no-lo-sabes
    python scripts/produce.py --videos todos-los-pendientes --hasta render
    python scripts/produce.py --videos X --estado        # solo dice qué falta
"""
import argparse
import json
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

import config

SCRIPTS = Path(__file__).resolve().parent
ETAPAS = ["voice", "whisper", "images", "sfx", "preflight", "render"]


def log(msg: str, fichero: Path | None = None) -> None:
    linea = f"[{datetime.now():%H:%M:%S}] {msg}"
    print(linea, flush=True)
    if fichero:
        with fichero.open("a", encoding="utf-8") as f:
            f.write(linea + "\n")


def _mp4(cfg: dict) -> Path:
    return config.REMOTION_DIR / "output" / f"{cfg['name']}.mp4"


def hecho(cfg: dict, etapa: str) -> bool:
    """¿Está ya esa etapa? Lo decide el estado real en disco, no un flag: así un
    proceso muerto a mitad no engaña al supervisor."""
    md = config.REPO_ROOT / cfg["manifest_dir"]
    if etapa == "voice":
        return (config.PUBLIC_DIR / cfg["audio_static"]).exists()
    if etapa == "whisper":
        fj = md / "frames.json"
        return fj.exists() and bool(json.loads(fj.read_text(encoding="utf-8")).get("frames"))
    if etapa == "images":
        fj = md / "frames.json"
        if not fj.exists():
            return False
        frames = json.loads(fj.read_text(encoding="utf-8")).get("frames", [])
        d = config.PUBLIC_DIR / cfg["images_subpath"]
        return bool(frames) and all((d / f["file"]).exists() for f in frames)
    if etapa == "sfx":
        sj = md / "sfx.json"
        if not sj.exists():
            return False
        r = json.loads(sj.read_text(encoding="utf-8"))
        items = list(r.get("sfx", [])) + ([r["music"]] if r.get("music") else [])
        d = config.PUBLIC_DIR / f"{cfg['name']}-sfx"
        return bool(items) and all((d / s["file"]).exists() for s in items)
    if etapa == "preflight":
        return False  # barato y es un gate: se corre siempre
    if etapa == "render":
        mp4 = _mp4(cfg)
        if not mp4.exists():
            return False
        # Un render viejo que no incluye las imágenes nuevas no vale.
        audio = config.PUBLIC_DIR / cfg["audio_static"]
        return mp4.stat().st_mtime > audio.stat().st_mtime
    return False


def comando(cfg: dict, etapa: str) -> list[str]:
    n = cfg["name"]
    py = [sys.executable, "-u"]
    if etapa == "voice":
        return py + [str(SCRIPTS / "generate_voice.py"), "--video", n]
    if etapa == "whisper":
        return py + [str(SCRIPTS / "orchestrate.py"), "--video", n, "--steps", "whisper,inject", "--yes"]
    if etapa == "images":
        return py + [str(SCRIPTS / "generate_images_gemini.py"), "--video", n, "--model", "flash"]
    if etapa == "sfx":
        return py + [str(SCRIPTS / "generate_sfx.py"), "--video", n]
    if etapa == "preflight":
        return py + [str(SCRIPTS / "preflight.py"), "--video", n]
    if etapa == "render":
        return ["npx", "remotion", "render", cfg["composition"], f"output/{n}.mp4"]
    raise ValueError(etapa)


def ejecuta(cfg: dict, etapa: str, reintentos: int, log_file: Path) -> bool:
    cwd = config.REMOTION_DIR if etapa == "render" else config.REPO_ROOT
    for intento in range(1, reintentos + 1):
        log(f"  {etapa}: intento {intento}/{reintentos}", log_file)
        r = subprocess.run(comando(cfg, etapa), cwd=cwd)
        if r.returncode == 0:
            return True
        # Las imágenes son reanudables: reintentar continúa donde murió.
        if hecho(cfg, etapa):
            log(f"  {etapa}: exit {r.returncode} pero el resultado está completo", log_file)
            return True
        if intento < reintentos:
            espera = min(60 * intento, 300)
            log(f"  {etapa}: exit {r.returncode}, reintento en {espera}s", log_file)
            time.sleep(espera)
    return False


def produce(video: str, hasta: str, reintentos: int, solo_estado: bool) -> bool:
    cfg = config.get_video(video)
    log_file = config.REPO_ROOT / cfg["manifest_dir"] / ".produce.log"
    etapas = ETAPAS[: ETAPAS.index(hasta) + 1]

    log(f"=== {video} ===", log_file)
    if solo_estado:
        for e in etapas:
            log(f"  {'HECHO ' if hecho(cfg, e) else 'FALTA '} {e}", log_file)
        return True

    for e in etapas:
        if e != "preflight" and hecho(cfg, e):
            log(f"  {e}: ya está, se salta", log_file)
            continue
        if not ejecuta(cfg, e, reintentos, log_file):
            log(f"  {e}: FALLA definitivamente. {video} queda a medias.", log_file)
            return False
    log(f"  {video}: COMPLETO -> {_mp4(cfg).name}", log_file)
    return True


def main() -> None:
    p = argparse.ArgumentParser(description="Produce vídeos enteros sin vigilancia")
    p.add_argument("--videos", nargs="+", required=True, help="slugs de videos.json")
    p.add_argument("--hasta", choices=ETAPAS, default="render", help="última etapa a ejecutar")
    p.add_argument("--reintentos", type=int, default=5)
    p.add_argument("--estado", action="store_true", help="solo informa de qué falta")
    args = p.parse_args()

    ok, fallidos = [], []
    for v in args.videos:
        (ok if produce(v, args.hasta, args.reintentos, args.estado) else fallidos).append(v)

    print(f"\nCompletados: {len(ok)} · Fallidos: {len(fallidos)}", flush=True)
    if fallidos:
        print("Fallidos:", ", ".join(fallidos), flush=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
