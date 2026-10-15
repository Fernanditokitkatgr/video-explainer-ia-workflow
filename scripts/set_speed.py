#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Cambia la velocidad de un vídeo (playback_rate) y deja todo coherente para re-renderizar.

La velocidad afecta a más cosas que el render: los capítulos de seo.md se calcularon como
startSec / velocidad, y la duración de la composición en Root.tsx también. Este script:
  1) cambia playback_rate en videos.json,
  2) recalcula cada capítulo de seo.md con su frame real (frames.json) y la nueva velocidad,
  3) regenera el .tsx (scripts/make_tsx.py) y actualiza durationInFrames en Root.tsx,
  4) borra los Shorts ya cortados (YouTube y TikTok) para que se vuelvan a cortar.
No renderiza ni sube nada. NO usar con vídeos ya subidos (YouTube no permite cambiar el archivo).

Uso:
    python scripts/set_speed.py <slug> <velocidad>      # p. ej. 1.25
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent


def mmss(s: float) -> str:
    s = int(s)
    return f"{s // 60}:{s % 60:02d}"


def main() -> None:
    slug, rate = sys.argv[1], float(sys.argv[2])
    vp = REPO / "videos.json"
    vids = json.loads(vp.read_text(encoding="utf-8"))
    cfg = vids[slug]
    old = cfg.get("playback_rate", 1.0)
    mdir = REPO / cfg["manifest_dir"]
    if (mdir / "state.json").exists() and cfg.get("published", {}).get("youtube_id"):
        sys.exit(f"{slug} ya está subido a YouTube: cambiar la velocidad no sirve de nada.")

    frames = json.loads((mdir / "frames.json").read_text(encoding="utf-8"))["frames"]
    seo_p = mdir / "seo.md"
    seo = seo_p.read_text(encoding="utf-8")
    sec = re.search(r"(## Capítulos\s*\n)(.*?)(?=\n## )", seo, re.S)
    if sec:
        out = []
        for line in sec.group(2).splitlines():
            m = re.match(r"^(\d{1,2}):(\d{2})\s+(.*)$", line.strip())
            if not m:
                out.append(line)
                continue
            t_old = int(m.group(1)) * 60 + int(m.group(2))
            # el frame en el que empezaba este capítulo con la velocidad antigua
            f = min(frames, key=lambda fr: (abs(fr["startSec"] / old - t_old), fr["startSec"]))
            out.append(f"{mmss(f['startSec'] / rate) if t_old else '0:00'} {m.group(3)}")
        seo = seo[:sec.start(2)] + "\n".join(out) + seo[sec.end(2):]
        seo_p.write_text(seo, encoding="utf-8")

    cfg["playback_rate"] = rate
    vp.write_text(json.dumps(vids, ensure_ascii=False, indent=2), encoding="utf-8")

    res = subprocess.run([sys.executable, str(REPO / "scripts" / "make_tsx.py"), slug],
                         capture_output=True, text=True, encoding="utf-8")
    print(res.stdout.strip())
    dur = int(re.search(r"durationInFrames (\d+)", res.stdout).group(1))
    root = REPO / "remotion" / "src" / "Root.tsx"
    txt = root.read_text(encoding="utf-8")
    txt, n = re.subn(rf'(id="{cfg["composition"]}"\s*component=\{{[^}}]+\}}\s*durationInFrames=\{{)\d+',
                     rf"\g<1>{dur}", txt)
    if n != 1:
        sys.exit(f"No encontré la composición {cfg['composition']} en Root.tsx")
    root.write_text(txt, encoding="utf-8")

    for d in ("shorts", "shorts_tiktok"):
        if (mdir / d).exists():
            shutil.rmtree(mdir / d)
    print(f"OK {slug}: velocidad {old} -> {rate}, capítulos recalculados, Root.tsx = {dur} frames, Shorts borrados")


if __name__ == "__main__":
    main()
