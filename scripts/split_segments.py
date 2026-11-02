#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Re-trocea los segmentos de whisper del LARGO para que ninguna imagen dure más de ~2,5 s.

Por qué (28-oct-2026, feedback del dueño): "faltan imágenes, se queda muchas veces en un
fotograma". Whisper agrupa varias frases en un segmento (en 2035 hubo uno de 17 s con una sola
imagen). Este script usa los tiempos POR PALABRA del audio largo (whisper, con caché) y parte cada
segmento en límites de palabra hasta que ninguno pase de --max segundos, prefiriendo cortar en
puntuación y en pausas, sin dejar trozos de menos de --min segundos ni terminar en "de"/"la"/"y".

Escribe (en el manifest_dir del vídeo):
  whisper_raw.json  y  raw_frames.json   → [{file, startSec, text}]
  frames.json (esqueleto)                → {video, frames: [{file, startSec, text, scene: null}]}
Los nombres siguen el naming del vídeo (timestamp M_SS.jpg) con la misma regla de nombres únicos
que whisper_timestamps.to_frames. Duplica las imágenes de un vídeo (≈0,04 € cada una con `lite`):
las escenas hay que escribirlas DESPUÉS (1 por segmento, leyendo SU texto) y generar con
generate_images_gemini.py (gasto.py vigila el tope de 250 €). Este script NO genera nada.

Seguridad:
  - Si frames.json ya tiene escenas escritas, se niega salvo --force (y entonces guarda copia
    frames_presplit.json): las escenas viejas ya no cuadran con los segmentos nuevos.
  - Si algún nombre nuevo coincide con una imagen que YA existe en remotion/public/<vídeo>/,
    se niega salvo --prefix vN_ (recomendado) o --allow-existing: el generador hace skip-if-exists
    y reutilizaría en silencio una imagen de otra frase.

Uso:
    python scripts/split_segments.py <slug> [--max 2.5] [--min 0.8] [--prefix v2_] [--dry-run]
"""
import argparse
import json
import re
import shutil
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

sys.path.insert(0, str(Path(__file__).resolve().parent))
import config  # noqa: E402
from whisper_timestamps import cached_words, to_frames  # noqa: E402

REPO = Path(__file__).resolve().parent.parent
# palabras con las que un trozo NO debería terminar (artículos, preposiciones, conjunciones)
WEAK_END = {"de", "del", "la", "el", "los", "las", "un", "una", "unos", "unas", "y", "e", "o", "u",
            "que", "a", "al", "en", "con", "por", "para", "su", "sus", "mi", "tu", "se", "lo", "le",
            "les", "ni", "si", "como", "muy", "más", "mas", "sin", "sobre", "entre", "hasta", "desde",
            "cada", "este", "esta", "ese", "esa", "no", "ya", "pero", "porque", "cuando"}


def _norm(w: str) -> str:
    return re.sub(r"[^\wáéíóúüñ]", "", w.lower())


def split_group(ws: list[dict], max_s: float, min_s: float) -> list[list[dict]]:
    """Parte recursivamente una lista de palabras hasta que cada trozo dure <= max_s."""
    dur = ws[-1]["end"] - ws[0]["start"]
    if dur <= max_s or len(ws) < 2:
        return [ws]
    best, best_k = None, None
    for k in range(1, len(ws)):
        left, right = ws[:k], ws[k:]
        ld = left[-1]["end"] - left[0]["start"]
        rd = right[-1]["end"] - right[0]["start"]
        if ld < min_s or rd < min_s:
            continue
        w = left[-1]["word"]
        score = 0.0
        if re.search(r"[.?!…]$", w):
            score += 3.0
        elif re.search(r"[,;:]$", w):
            score += 2.0
        gap = right[0]["start"] - left[-1]["end"]
        score += min(gap, 0.6) * 6.0                       # pausa real = buen corte
        score -= abs(ld - rd) / dur * 1.5                  # equilibrio
        if _norm(w) in WEAK_END:
            score -= 2.5
        if re.match(r"^[¿¡]", right[0]["word"]):
            score += 1.5                                   # empieza pregunta/exclamación
        if best is None or score > best:
            best, best_k = score, k
    if best_k is None:                                     # imposible sin trozos < min_s
        return [ws]
    return split_group(ws[:best_k], max_s, min_s) + split_group(ws[best_k:], max_s, min_s)


def build_segments(words: list[dict], max_s: float, min_s: float) -> list[dict]:
    by_seg: dict[int, list[dict]] = {}
    for w in words:
        if w["word"]:
            by_seg.setdefault(w.get("seg", 0), []).append(w)
    out = []
    for _, ws in sorted(by_seg.items()):
        for g in split_group(ws, max_s, min_s):
            out.append({"id": len(out), "start": round(g[0]["start"], 2), "end": round(g[-1]["end"], 2),
                        "text": " ".join(w["word"] for w in g).strip()})
    if out:
        out[0]["start"] = 0.0                              # la primera imagen desde el frame 0
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description="Re-trocea los segmentos del largo a <= --max s")
    ap.add_argument("slug")
    ap.add_argument("--max", type=float, default=2.5, help="duración máxima por imagen (s de audio)")
    ap.add_argument("--min", type=float, default=0.8, help="no crear trozos más cortos que esto")
    ap.add_argument("--prefix", default="", help="prefijo de versión para los nombres (ej. v2_)")
    ap.add_argument("--force", action="store_true", help="sobrescribe un frames.json con escenas")
    ap.add_argument("--allow-existing", action="store_true",
                    help="permite nombres que ya existen como imagen (¡reutilizaría la imagen vieja!)")
    ap.add_argument("--dry-run", action="store_true", help="solo informa, no escribe nada")
    args = ap.parse_args()

    cfg = json.loads((REPO / "videos.json").read_text(encoding="utf-8"))[args.slug]
    mdir = REPO / cfg["manifest_dir"]
    audio = REPO / "remotion" / "public" / cfg["audio_static"]
    words = cached_words(audio, mdir / "words.json")
    segs = build_segments(words, args.max, args.min)
    frames = to_frames(segs, cfg.get("naming", "timestamp"), cfg.get("ext", "jpg"))
    for f in frames:
        f["file"] = args.prefix + f["file"]

    durs = [b["startSec"] - a["startSec"] for a, b in zip(frames, frames[1:])]
    old_n = 0
    fj = mdir / "frames.json"
    old = json.loads(fj.read_text(encoding="utf-8")) if fj.exists() else {}
    old_n = len(old.get("frames", []))
    print(f"{args.slug}: {len(frames)} segmentos (antes {old_n}); "
          f"duración media {sum(durs) / max(len(durs), 1):.2f}s, máx {max(durs or [0]):.2f}s")
    print(f"  imágenes nuevas a generar ≈ {len(frames)} (~{len(frames) * 0.04:.2f} € con lite)")
    long_ = [(f["file"], round(d, 2)) for f, d in zip(frames, durs) if d > args.max + 0.6]
    if long_:
        print(f"  {len(long_)} siguen > {args.max + 0.6:.1f}s (palabra larga o pausa): {long_[:6]}")

    img_dir = REPO / "remotion" / "public" / cfg.get("images_subpath", args.slug)
    clash = [f["file"] for f in frames if (img_dir / f["file"]).exists()]
    errors = []
    if clash and not args.allow_existing:
        errors.append(f"{len(clash)} nombres ya existen como imagen en {img_dir.name}/ (ej. {clash[:4]}). "
                      f"Usa --prefix v2_ (recomendado) o --allow-existing.")
    if any(f.get("scene") for f in old.get("frames", [])) and not args.force:
        errors.append("frames.json ya tiene escenas escritas: --force para sobrescribir "
                      "(guarda frames_presplit.json).")
    if args.dry_run:
        for f in frames[:12]:
            print(f"   {f['file']:>12} {f['startSec']:7.2f}  {f['text']}")
        for e in errors:
            print("  AVISO (sin dry-run abortaría):", e)
        print("  (dry-run: no se ha escrito nada)")
        return
    if errors:
        sys.exit("  " + " | ".join(errors))

    if fj.exists():
        shutil.copy(fj, mdir / "frames_presplit.json")
    raw = [{"file": f["file"], "startSec": f["startSec"], "text": f["text"]} for f in frames]
    for name in ("whisper_raw.json", "raw_frames.json"):
        (mdir / name).write_text(json.dumps(raw, ensure_ascii=False, indent=2), encoding="utf-8")
    skel = {"video": args.slug}
    for k in ("style_base", "estilo"):
        if k in old:
            skel[k] = old[k]
    skel["frames"] = [dict(r, scene=None) for r in raw]
    fj.write_text(json.dumps(skel, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"  OK: whisper_raw.json, raw_frames.json y frames.json (esqueleto, scene=null) en {mdir.name}/")
    print("  Siguiente: escribir 1 escena por segmento (su texto real) → scene_diversity_check → "
          "generate_images_gemini.py → auto_sfx.py → make_tsx.py")


if __name__ == "__main__":
    main()
