#!/usr/bin/env python3
"""Valida que TODOS los assets de un vídeo existen ANTES de renderizar.

Recuerda el gotcha del proyecto: una sola imagen que falta descuadra todos los
frames posteriores. Esto lo caza antes de gastar 10 min en un render roto.

Lee la lista de imágenes directamente del array FRAMES de la composición .tsx
(la fuente de verdad de lo que el render va a pedir) y comprueba fichero a fichero.

Uso:
    python scripts/validate_assets.py --video sueno-stick
    python scripts/validate_assets.py --all
Salida 0 = todo OK · 1 = falta algo.
"""
import argparse
import re
import sys

import config

FILE_RE = re.compile(r"file:\s*'([^']+)'")
FRAMES_BLOCK_RE = re.compile(r"// === FRAMES:START.*?===\n(.*?)// === FRAMES:END ===", re.DOTALL)


def frames_in_tsx(tsx_path) -> list[str]:
    text = tsx_path.read_text(encoding="utf-8")
    # Solo dentro de FRAMES:START/END — otros arrays (p.ej. SFX) también usan 'file:'
    # pero apuntan a remotion/public/<video>-sfx/, no a images_subpath.
    block = FRAMES_BLOCK_RE.search(text)
    scope = block.group(1) if block else text
    return FILE_RE.findall(scope)


def validate(name: str) -> bool:
    cfg = config.get_video(name)
    tsx_path = config.REPO_ROOT / cfg["tsx"]
    if not tsx_path.exists():
        print(f"❌ {name}: no existe la composición {cfg['tsx']}")
        return False

    files = frames_in_tsx(tsx_path)
    if not files:
        print(f"⚠️  {name}: no encontré FRAMES en {cfg['tsx']} (¿array vacío?)")

    img_dir = config.PUBLIC_DIR / cfg["images_subpath"]
    audio = config.PUBLIC_DIR / cfg["audio_static"]

    problems = []
    if not audio.exists():
        problems.append(f"audio ausente: {audio.relative_to(config.REPO_ROOT)}")
    missing = [f for f in files if not (img_dir / f).exists()]
    for m in missing:
        problems.append(f"imagen ausente: {cfg['images_subpath']}/{m}")

    if problems:
        print(f"❌ {name}: {len(problems)} problema(s)")
        for p in problems[:40]:
            print(f"   · {p}")
        if len(problems) > 40:
            print(f"   … y {len(problems) - 40} más")
        return False

    print(f"✅ {name}: audio OK + {len(files)} imágenes presentes en {img_dir.relative_to(config.REPO_ROOT)}/")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description="Valida assets antes de renderizar")
    parser.add_argument("--video", help="Nombre de vídeo en videos.json")
    parser.add_argument("--all", action="store_true", help="Valida todos los vídeos")
    args = parser.parse_args()

    if args.all:
        names = list(config.load_videos())
    elif args.video:
        names = [args.video]
    else:
        sys.exit("Indica --video <nombre> o --all")

    ok = all(validate(n) for n in names)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
