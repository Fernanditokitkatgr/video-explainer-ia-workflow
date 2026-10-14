#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Cola ÚNICA de generación de imágenes: varios vídeos en orden, reanudable.

Gemini da ~1 imagen/min, así que 3-4 vídeos son horas. Encadenar un proceso de espera por vídeo
no funciona (cada comando en segundo plano muere a las 2 h, y el siguiente de la cola se
quedaba sin turno o, peor, arrancaba a la vez y se pisaban). Aquí hay UN proceso: recorre los
vídeos en orden, repite pasadas hasta completar cada uno y salta los ya completos. Si lo matan,
se relanza el mismo comando y sigue donde estaba.

Uso:
    python scripts/image_queue.py <slug1> <slug2> ...
"""
import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
MAX_PASSES = 30


def counts(slug: str) -> tuple[int, int]:
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    mdir = REPO_ROOT / vids[slug]["manifest_dir"]
    frames = json.loads((mdir / "frames.json").read_text(encoding="utf-8"))["frames"]
    need = {f["file"] for f in frames}
    have = {p.name for p in (REPO_ROOT / "remotion" / "public" / vids[slug]["images_subpath"]).glob("*")}
    return len(need & have), len(need)


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for slug in sys.argv[1:]:
        done, total = counts(slug)
        print(f"== {slug}: {done}/{total}", flush=True)
        for n in range(1, MAX_PASSES + 1):
            if done >= total:
                break
            subprocess.run([sys.executable, str(REPO_ROOT / "scripts" / "generate_images_gemini.py"),
                            "--video", slug], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            done, total = counts(slug)
            print(f"   pasada {n}: {done}/{total}", flush=True)
        print(f"== {slug}: {'COMPLETO' if done >= total else 'INCOMPLETO'} ({done}/{total})", flush=True)


if __name__ == "__main__":
    main()
