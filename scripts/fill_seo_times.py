#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Rellena en seo.md los tiempos REALES de capítulos y los desde/hasta de los Shorts (formato lista).

- Capítulos: toma los rótulos provisionales de "## Capítulos" (las líneas "m:ss Rótulo") y les pone
  los tiempos reales: 0:00, cada "Número X" del audio y la vuelta a la pregunta ("volvamos").
  Tiempo = startSec / playback_rate. Si el número de rótulos no cuadra, avisa y no toca nada.
- Shorts: lee las notas `- Short N: desde "frase" hasta "frase"` y busca el segmento de
  frames.json más parecido a cada frase (difflib), sustituyendo `desde: TODO | hasta: TODO`.

Uso:
    python scripts/fill_seo_times.py <slug> ["texto de la vuelta a la pregunta"]
"""
import difflib
import json
import re
import sys
import unicodedata
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
NUM_WORDS = {"uno": "1", "dos": "2", "tres": "3", "cuatro": "4", "cinco": "5", "seis": "6",
             "siete": "7", "ocho": "8", "nueve": "9", "diez": "10"}


def norm(s: str) -> str:
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return " ".join(NUM_WORDS.get(w, w) for w in s.split())


def best(frames, phrase, from_end=False):
    target = norm(phrase)
    if from_end:
        target = " ".join(target.split()[-6:])
    else:
        target = " ".join(target.split()[:6])
    scores = [difflib.SequenceMatcher(None, target, norm(f["text"])).ratio() for f in frames]
    i = max(range(len(frames)), key=scores.__getitem__)
    return i, scores[i]


def main() -> None:
    slug = sys.argv[1]
    cfg = json.loads((REPO / "videos.json").read_text(encoding="utf-8"))[slug]
    rate = cfg.get("playback_rate", 1.0)
    mdir = REPO / cfg["manifest_dir"]
    frames = json.loads((mdir / "frames.json").read_text(encoding="utf-8"))["frames"]
    seo_p = mdir / "seo.md"
    seo = seo_p.read_text(encoding="utf-8")

    m = re.search(r"## Capítulos\n(.*?)(?=\n## )", seo, flags=re.S)
    labels = re.findall(r"^-?\s*(?:\d+:\d\d|\?:\?\?|TODO)\s+(.+)$", m.group(1), flags=re.M) if m else []
    starts = [0.0] + [f["startSec"] for f in frames if re.match(r"\s*(n[úu]mero|nivel)\b", f["text"].lower())]
    # Último capítulo: la vuelta a la pregunta. Por defecto "volvamos"; si el guion la formula de
    # otra manera, pasar el texto como segundo argumento (p. ej. "frase del exjefe").
    key = sys.argv[2].lower() if len(sys.argv) > 2 else "volvamos"
    back = [f["startSec"] for f in frames if key in f["text"].lower()]
    starts += back[:1]
    if labels and len(labels) == len(starts):
        def mmss(t):
            s = int(t / rate)
            return f"{s // 60}:{s % 60:02d}"
        cap = "## Capítulos\n\n" + "\n".join(f"{mmss(t)} {l}" for t, l in zip(starts, labels)) + "\n"
        seo = seo[:m.start()] + cap + seo[m.end():]
        print(cap)
    else:
        print(f"AVISO capítulos: {len(labels)} rótulos frente a {len(starts)} cortes; no se tocan.")

    for n, d, h in re.findall(r"Short (\d+):\s*desde\s*[\"“](.+?)[\"”]\s*hasta\s*[\"“](.+?)[\"”]", seo):
        i0, s0 = best(frames, d)
        i1, s1 = best(frames, h, from_end=True)
        if i1 < i0:
            print(f"AVISO Short {n}: el final queda antes que el inicio; revisar a mano.")
            continue
        a, b = frames[i0]["file"].rsplit(".", 1)[0], frames[i1]["file"].rsplit(".", 1)[0]
        dur = ((frames[i1 + 1]["startSec"] if i1 + 1 < len(frames) else frames[i1]["startSec"] + 3)
               - frames[i0]["startSec"]) / rate
        seo = seo.replace("desde: TODO | hasta: TODO", f"desde: {a} | hasta: {b}", 1)
        print(f"Short {n}: {a} → {b}  (~{dur:.0f} s, parecido {s0:.2f}/{s1:.2f})")
    seo_p.write_text(seo, encoding="utf-8")


if __name__ == "__main__":
    main()
