#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""¿Se ha comido ElevenLabs alguna negación? Compara el guion con el audio ya generado.

ElevenLabs a veces se traga un "no"/"sin" corto y le da la vuelta a la frase. Whisper
pequeño también se equivoca al oírlos ("no" -> "uno"), así que un descuadre de recuento NO
basta para regenerar la voz: este script localiza cada diferencia en una negación y la
contrasta con un modelo grande (large-v3) sobre ese tramo de audio. Solo lo que el modelo
grande confirma como ausente es un fallo real.

Uso:
    python scripts/check_negations.py <slug> [--modelo large-v3]
Código de salida: 0 = todo bien, 1 = negación realmente perdida (regenerar la voz).
"""
import argparse
import difflib
import json
import re
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO_ROOT = Path(__file__).resolve().parent.parent
NEGS = {"no", "sin", "nunca", "ningun", "ninguna", "ninguno", "nadie", "ni", "tampoco", "jamas", "nada"}


def norm(w: str) -> str:
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9ñ]", "", w)


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("slug")
    p.add_argument("--modelo", default="large-v3")
    a = p.parse_args()
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    cfg = vids[a.slug]
    mdir = REPO_ROOT / cfg["manifest_dir"]
    # whisper_raw.json se borra al cerrar el vídeo; frames.json guarda la misma transcripción.
    raw = mdir / "whisper_raw.json"
    data = json.loads((raw if raw.exists() else mdir / "frames.json").read_text(encoding="utf-8"))
    frames = data["frames"] if isinstance(data, dict) else data
    body = re.sub(r"\[[^\]]*\]", " ", (mdir / "script.md").read_text(encoding="utf-8").split("---", 1)[1])
    sw = [(w, norm(w)) for w in body.split() if norm(w)]
    ww = [(w, norm(w), s["startSec"]) for s in frames for w in s["text"].split() if norm(w)]

    sm = difflib.SequenceMatcher(None, [x[1] for x in ww], [x[1] for x in sw], autojunk=False)
    sospechosas = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        if {x[1] for x in sw[j1:j2]} & NEGS:
            t = ww[min(i1, len(ww) - 1)][2]
            ctx = " ".join(x[0] for x in sw[max(0, j1 - 5):j2 + 5])
            # Solo la negación y sus vecinas: una ventana más ancha se sale del clip de 8 s y da
            # falsos avisos; basta con que la negación aparezca pegada a las palabras de al lado.
            core = " ".join(x[0] for x in sw[max(0, j1 - 2):j2 + 2])
            sospechosas.append((t, ctx, core))
    if not sospechosas:
        print("OK: todas las negaciones del guion están en el audio.")
        return

    from faster_whisper import WhisperModel
    audio = REPO_ROOT / "remotion" / "public" / cfg["audio_static"]
    model = WhisperModel(a.modelo, device="cpu", compute_type="int8")
    perdidas = 0
    for t, ctx, core in sospechosas:
        with tempfile.TemporaryDirectory() as td:
            wav = Path(td) / "c.wav"
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{max(0, t - 1.5):.2f}", "-t", "8",
                            "-i", str(audio), "-ac", "1", "-ar", "16000", str(wav)], check=True)
            segs, _ = model.transcribe(str(wav), language="es")
            heard = " ".join(s.text.strip() for s in segs)
        # La frase del guion con su negación debe aparecer (casi) tal cual en lo que oye el modelo grande.
        cw = [norm(w) for w in core.split()]
        hw = [norm(w) for w in heard.split()]
        # Vale si la negación aparece en un tramo coincidente de al menos 2 palabras (pegada a una
        # vecina). Una errata en OTRA palabra ("fíes" -> "cíes") no es una negación perdida.
        blocks = difflib.SequenceMatcher(None, cw, hw, autojunk=False).get_matching_blocks()
        ok = any(b.size >= 2 and any(cw[k] in NEGS for k in range(b.a, b.a + b.size)) for b in blocks)
        print(f"{'OK  ' if ok else 'PERDIDA'} @{t:.0f}s  guion: «{ctx}»\n        {a.modelo} oye: «{heard[:160]}»")
        perdidas += 0 if ok else 1
    sys.exit(1 if perdidas else 0)


if __name__ == "__main__":
    main()
