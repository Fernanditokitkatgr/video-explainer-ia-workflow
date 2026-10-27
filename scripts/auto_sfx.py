#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""sfx.json automático para vídeos en formato lista ("Número uno… Número diez"), sin gastar créditos.

Coloca efectos ya generados de la biblioteca del canal (remotion/public/*-sfx/) en los puntos fijos
del formato: arranque del gancho, la pregunta "¿Adivinas…?", cada "Número X", "Y ahora empiezan
los raros", la vuelta a la pregunta del principio y la suscripción. Copia los .mp3 a
remotion/public/<slug>-sfx/ y escribe channel/.../sfx.json. Los acentos temáticos (sirenas,
cajas registradoras…) se pueden añadir después a mano; esto garantiza la capa mínima obligatoria.

Uso:
    python scripts/auto_sfx.py <slug>
"""
import glob
import json
import os
import re
import shutil
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
NUMBER_STINGS = ["count_1.mp3", "count_2.mp3", "count_3.mp3", "count_4.mp3", "count_5.mp3",
                 "count_6.mp3", "chapter_sting_1.mp3", "chapter_sting_2.mp3", "chapter_sting_3.mp3",
                 "chapter_sting_final.mp3"]
RULES = [  # (regex sobre el texto del segmento, efecto, solo la primera vez)
    (r"adivinas|a divinas", "mystery_sting.mp3", True),
    (r"empiezan los raros|empiezan las raras|llegamos a l[oa]s? (último|última|más)", "tense_transition.mp3", True),
    (r"volvamos", "dramatic_hit.mp3", True),
    (r"suscr[ií]bete|si te gusta entender", "subscribe_chime.mp3", True),
]


def main() -> None:
    slug = sys.argv[1]
    cfg = json.loads((REPO / "videos.json").read_text(encoding="utf-8"))[slug]
    mdir = REPO / cfg["manifest_dir"]
    frames = json.loads((mdir / "frames.json").read_text(encoding="utf-8"))["frames"]
    lib = {}
    for p in glob.glob(str(REPO / "remotion" / "public" / "*-sfx" / "*.mp3")):
        lib.setdefault(os.path.basename(p), p)
    plan = [(0.4, "intro_tense.mp3")]
    used, n = set(), 0
    for f in frames:
        t = f["text"].lower()
        if re.match(r"\s*(n[úu]mero|nivel)\b", t) and n < len(NUMBER_STINGS):
            plan.append((f["startSec"], NUMBER_STINGS[n]))
            n += 1
            continue
        for rx, sfx, once in RULES:
            if re.search(rx, t) and not (once and sfx in used):
                plan.append((f["startSec"], sfx))
                used.add(sfx)
                break
    dst = REPO / "remotion" / "public" / f"{slug}-sfx"
    dst.mkdir(exist_ok=True)
    sfx = []
    for t, name in plan:
        if name not in lib:
            print(f"  falta en la biblioteca: {name} (se omite)")
            continue
        shutil.copy(lib[name], dst / name)
        sfx.append({"file": name, "startSec": round(t, 2), "duration": 1.2, "volume": 0.13,
                    "prompt": "reused from channel SFX library (auto_sfx.py)"})
    shutil.copy(lib["musica-canal.mp3"], dst / "musica-canal.mp3")
    # Música de fondo QUITADA (oct-2026: a nadie le gustaba). volume 0 = no suena; cambiar aquí si vuelve.
    out = {"sfx": sfx, "music": {"file": "musica-canal.mp3", "duration": 30, "volume": 0.0,
                                 "prompt": "reused channel background music loop"}}
    (mdir / "sfx.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{slug}: {len(sfx)} efectos ({n} números)")


if __name__ == "__main__":
    main()
