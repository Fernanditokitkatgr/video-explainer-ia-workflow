#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""sfx.json automático para los LARGOS, sin gastar créditos (solo efectos ya generados).

Dos modos:

  denso (POR DEFECTO desde 28-oct-2026, feedback del dueño: "faltan muchísimos más efectos de
  sonido, tiene que ser mucho más dinámico"): ~14 efectos por minuto de vídeo final (5 min ≈ 70):
    - soplo (whoosh) suave en la mayoría de cambios de imagen, rotando 5 variantes,
    - pop en cifras y nombres propios, golpe en giros ("pero", "sin embargo", "lo raro"…),
    - caja registradora/monedas cuando se dice dinero (€, $, euros, dólares, millones),
    - ding en años y fechas, subida (riser) que TERMINA justo en preguntas/revelaciones
      ("¿adivinas…?", "volvamos a la pregunta", "veredicto"…),
    - los fijos del formato lista: arranque, "Número X" (stings), "¿Adivinas?", "Volvamos",
      suscripción.
    Los tiempos salen de las PALABRAS de whisper del audio largo (caché `words.json` en el
    manifest_dir; whisper_timestamps.cached_words), no del inicio del segmento. Sin palabras
    (--no-words o sin faster-whisper) se estima la posición dentro del segmento por caracteres.
    Volumen: cada archivo se normaliza por su sonoridad media (ffmpeg volumedetect) a un objetivo
    por tipo y se limita a 0.03-0.13: la voz manda siempre (~20 dB por encima de los efectos).

  --minimal: la capa mínima de antes (arranque, ¿adivinas?, Número X, raros, volvamos, suscríbete).

Copia los .mp3 de la biblioteca (remotion/public/*-sfx/) a remotion/public/<slug>-sfx/ y escribe
channel/.../sfx.json. Música de fondo a volumen 0 (decisión del usuario, 27-oct-2026).

Uso:
    python scripts/auto_sfx.py <slug>                 # denso
    python scripts/auto_sfx.py <slug> --per-min 18    # más denso
    python scripts/auto_sfx.py <slug> --minimal       # solo la capa mínima
"""
import argparse
import bisect
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import unicodedata
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "scripts"))

NUMBER_STINGS = ["count_1.mp3", "count_2.mp3", "count_3.mp3", "count_4.mp3", "count_5.mp3",
                 "count_6.mp3", "chapter_sting_1.mp3", "chapter_sting_2.mp3", "chapter_sting_3.mp3",
                 "chapter_sting_final.mp3"]
RULES = [  # (regex sobre el texto del segmento, efecto, solo la primera vez)  — capa mínima
    (r"adivinas|a divinas", "mystery_sting.mp3", True),
    (r"empiezan los raros|empiezan las raras|llegamos a l[oa]s? (último|última|más)", "tense_transition.mp3", True),
    (r"volvamos", "dramatic_hit.mp3", True),
    (r"suscr[ií]bete|si te gusta entender", "subscribe_chime.mp3", True),
]

# --- modo denso -------------------------------------------------------------------------------
# Bancos de la biblioteca (elegidos por duración ≤2 s y sonoridad media razonable, oct-2026).
POOLS = {
    "whoosh": ["soft_whoosh.mp3", "whoosh_expand.mp3", "swipe_whoosh.mp3", "speed_whoosh.mp3",
               "time_whoosh.mp3"],
    "pop": ["bubble_pop.mp3", "sign_pop.mp3", "tool_pop.mp3", "multiply_pop.mp3"],
    "hit": ["impact_thud.mp3", "drum_hit.mp3", "shock_hit.mp3", "impact_beat.mp3", "dramatic_hit.mp3"],
    "cash": ["cash_register_1.mp3", "money_chime.mp3", "coin_clink.mp3", "cash_chime.mp3", "coins.mp3"],
    "ding": ["soft_ping.mp3", "good_ding.mp3", "ding.mp3", "found_ding.mp3", "alert_ding.mp3"],
    "riser": ["rising_whoosh.mp3", "tension_up.mp3", "transition_swell.mp3", "rising_tension.mp3"],
}
# sonoridad media objetivo (dBFS) por tipo; voz del canal ≈ -21 dB de media
TARGET_DB = {"whoosh": -41, "pop": -40, "hit": -38, "cash": -39, "ding": -40, "riser": -40,
             "sting": -38, "intro": -38, "subscribe": -38}
VOL_MIN, VOL_MAX = 0.03, 0.13
# hueco mínimo entre dos efectos del MISMO tipo (s de audio) — que no parezca spam
TYPE_GAP = {"whoosh": 2.2, "pop": 5.0, "hit": 8.0, "cash": 5.0, "ding": 6.0, "riser": 18.0}
# los soplos deben ser al menos esta fracción del total (si no, el vídeo suena a "pops" sueltos)
WHOOSH_SHARE = 0.4
ANY_GAP = 0.5            # dos efectos cualesquiera no arrancan a menos de esto
PRIORITY = {"intro": 0, "sting": 0, "subscribe": 0, "riser": 1, "hit": 2, "cash": 3, "ding": 4,
            "pop": 5, "whoosh": 6}

TWIST = r"\bpero\b|\bsin embargo\b|\baqui viene lo raro\b|\blo raro\b|\ben realidad\b|\bal contrario\b|\bni de lejos\b"
MONEY = r"€|\$|\beuros?\b|\bdolares?\b|\bmillones\b|\bmillon\b|\bbillones\b"
MONTHS = r"\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)\b"
REVEAL = (r"\badivinas\b|\ba divinas\b|\bvolvamos a la pregunta\b|\bvolvamos\b|\bla respuesta\b|"
          r"\by el ganador\b|\bsabes que\b|\blo peor\b|\bveredicto\b|\bvere dicto\b|\bbere dicto\b")


def strip_accents(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def norm_token(w: str) -> str:
    """minúsculas, sin tildes, conserva dígitos, % € $ (para detectar cifras/dinero)."""
    return re.sub(r"[^\w%€$]", "", strip_accents(w.lower()))


def library() -> dict:
    """nombre → ruta. Orden determinista (carpetas ordenadas) para que el mismo nombre dé siempre el mismo archivo."""
    lib = {}
    for p in sorted(glob.glob(str(REPO / "remotion" / "public" / "*-sfx" / "*.mp3"))):
        lib.setdefault(os.path.basename(p), p)
    return lib


def probe(path: str) -> tuple[float, float]:
    """(duración s, sonoridad media dB)."""
    d = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                       capture_output=True, text=True).stdout.strip()
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "volumedetect", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    m = re.search(r"mean_volume: (-?[\d.]+)", r)
    return float(d or 1.2), float(m.group(1)) if m else -20.0


def load_words(cfg: dict, mdir: Path, use_words: bool) -> list[dict] | None:
    if not use_words:
        return None
    try:
        from whisper_timestamps import cached_words
        audio = REPO / "remotion" / "public" / cfg["audio_static"]
        return cached_words(audio, mdir / "words.json")
    except Exception as e:  # sin faster-whisper, audio ausente…
        print(f"  (sin palabras de whisper: {e}; uso posición estimada dentro del segmento)")
        return None


def tokens_from_words(words: list[dict]) -> list[dict]:
    out = []
    for i, w in enumerate(words):
        raw = w["word"]
        prev = words[i - 1]["word"] if i else "."
        out.append({"raw": raw, "n": norm_token(raw), "t": w["start"],
                    "sentence_start": bool(re.search(r"[.?!…:]$", prev)) or i == 0
                    or w.get("seg") != words[i - 1].get("seg")})
    return out


def tokens_from_frames(frames: list[dict], audio_end: float) -> list[dict]:
    """Sin palabras: reparte cada segmento por caracteres entre su inicio y el siguiente."""
    out = []
    for i, f in enumerate(frames):
        t0 = f["startSec"]
        t1 = frames[i + 1]["startSec"] if i + 1 < len(frames) else audio_end
        text = f.get("text", "")
        pos = 0
        for j, raw in enumerate(text.split()):
            idx = text.find(raw, pos)
            pos = idx + len(raw)
            prev = text.split()[j - 1] if j else "."
            out.append({"raw": raw, "n": norm_token(raw), "t": t0 + (t1 - t0) * 0.9 * idx / max(len(text), 1),
                        "sentence_start": j == 0 or bool(re.search(r"[.?!…:]$", prev))})
    return out


def find_phrases(tokens: list[dict], rx: str) -> list[tuple[float, str]]:
    """Busca regex sobre el texto normalizado de las palabras y devuelve (tiempo de la palabra, match)."""
    text, offs = "", []
    for tk in tokens:
        offs.append(len(text))
        text += tk["n"] + " "
    res = []
    for m in re.finditer(rx, text):
        k = bisect.bisect_right(offs, m.start()) - 1
        res.append((tokens[k]["t"], m.group(0)))
    return res


def dense_plan(frames: list[dict], tokens: list[dict], audio_end: float, rate: float,
               per_min: float, durations: dict) -> list[dict]:
    cands = []  # {t, kind, why, file?}

    def add(t, kind, why, file=None):
        cands.append({"t": max(0.0, t), "kind": kind, "why": why, "file": file})

    add(0.4, "intro", "arranque", "intro_tense.mp3")
    # capa fija del formato
    n = 0
    for f in frames:
        t = f["text"].lower()
        if re.match(r"\s*(n[úu]mero|nivel)\b", t) and n < len(NUMBER_STINGS):
            add(f["startSec"], "sting", f["text"][:30], NUMBER_STINGS[n])
            n += 1
    for t, m in find_phrases(tokens, r"\bsuscribete\b|\bsi te gusta entender\b")[:1]:
        add(t, "subscribe", m, "subscribe_chime.mp3")
    for t, m in find_phrases(tokens, r"\badivinas\b|\ba divinas\b")[:1]:
        add(t, "sting", m, "mystery_sting.mp3")
    # revelaciones: la subida TERMINA en la palabra
    for t, m in find_phrases(tokens, REVEAL):
        add(t, "riser", m)
    for t, m in find_phrases(tokens, TWIST):
        add(t, "hit", m)
    for t, m in find_phrases(tokens, MONEY):
        add(t, "cash", m)
    for tk in tokens:
        if tk["sentence_start"] and re.fullmatch(r"¡?\s*no\s*[.!]+", tk["raw"].lower()):
            add(tk["t"], "hit", tk["raw"])   # "¡No!" / "No." suelto = giro
            continue
        if re.fullmatch(r"(1[89]|20|21)\d\d", tk["n"]):
            add(tk["t"], "ding", tk["raw"])
        elif re.search(r"\d", tk["n"]):
            add(tk["t"], "pop", tk["raw"])
        elif (not tk["sentence_start"] and len(tk["n"]) > 2 and tk["raw"].lstrip("¿¡\"'(«")[:1].isupper()):
            add(tk["t"], "pop", tk["raw"])  # nombre propio a media frase
    for t, m in find_phrases(tokens, MONTHS):
        add(t, "ding", m)

    # aceptar por prioridad respetando huecos
    accepted: list[dict] = []
    last_by_kind: dict[str, list[float]] = {}

    def free(t0, kind, gap_any=ANY_GAP):
        if any(abs(a["t0"] - t0) < gap_any for a in accepted):
            return False
        g = TYPE_GAP.get(kind)
        return not g or all(abs(x - t0) >= g for x in last_by_kind.get(kind, []))

    for c in sorted(cands, key=lambda c: (PRIORITY[c["kind"]], c["t"])):
        t0 = c["t"]
        if c["kind"] == "riser":
            t0 = c["t"] - 1.1          # que la subida culmine en la palabra
            if t0 < 0.5 or any(c["t"] - 1.2 < a["t0"] < c["t"] for a in accepted if a["kind"] != "sting"):
                continue
        elif c["kind"] in ("pop", "ding", "cash", "hit"):
            t0 = c["t"] - 0.03
        if c["kind"] in ("intro", "sting", "subscribe") or free(t0, c["kind"]):
            accepted.append(dict(c, t0=t0))
            last_by_kind.setdefault(c["kind"], []).append(t0)

    # presupuesto: los acentos semánticos no pasan del (1 - WHOOSH_SHARE) del objetivo; si sobran,
    # se aclaran los de menos prioridad (pop, luego ding…) quitando el más pegado a otro de su tipo
    target = int(round(per_min * audio_end / rate / 60))
    budget = int(target * (1 - WHOOSH_SHARE))
    fixed = ("intro", "sting", "subscribe")
    for kind in ("pop", "ding", "cash", "hit", "riser"):
        while sum(a["kind"] not in fixed for a in accepted) > budget:
            same = sorted((a for a in accepted if a["kind"] == kind), key=lambda a: a["t0"])
            if len(same) < 2:
                break
            gaps = [min(same[i]["t0"] - same[i - 1]["t0"] if i else 1e9,
                        same[i + 1]["t0"] - same[i]["t0"] if i + 1 < len(same) else 1e9)
                    for i in range(len(same))]
            accepted.remove(same[gaps.index(min(gaps))])
    changes = [f["startSec"] for f in frames[1:]]
    wh = []
    for t in changes:
        t0 = t - 0.12                  # el pico del soplo cae en el corte
        if free(t0, "whoosh", gap_any=0.7) and all(abs(t0 - w["t0"]) >= TYPE_GAP["whoosh"] for w in wh):
            wh.append({"t": t, "t0": t0, "kind": "whoosh", "why": "cambio de imagen", "file": None})
    need = max(0, target - len(accepted))
    if len(wh) > need:                 # repartidos por todo el vídeo, no solo al principio
        wh = [wh[int(k * len(wh) / need)] for k in range(need)] if need else []
    accepted += wh

    # rotación de variantes en orden temporal
    rot: dict[str, int] = {}
    accepted.sort(key=lambda a: a["t0"])
    for a in accepted:
        if not a["file"]:
            pool = [p for p in POOLS[a["kind"]] if p in durations]
            if not pool:
                a["file"] = None
                continue
            i = rot.get(a["kind"], 0)
            a["file"] = pool[i % len(pool)]
            rot[a["kind"]] = i + 1
    return [a for a in accepted if a["file"]]


def minimal_plan(frames: list[dict]) -> list[dict]:
    plan = [{"t0": 0.4, "file": "intro_tense.mp3", "kind": "intro"}]
    used, n = set(), 0
    for f in frames:
        t = f["text"].lower()
        if re.match(r"\s*(n[úu]mero|nivel)\b", t) and n < len(NUMBER_STINGS):
            plan.append({"t0": f["startSec"], "file": NUMBER_STINGS[n], "kind": "sting"})
            n += 1
            continue
        for rx, sfx, once in RULES:
            if re.search(rx, t) and not (once and sfx in used):
                plan.append({"t0": f["startSec"], "file": sfx, "kind": "sting"})
                used.add(sfx)
                break
    return plan


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("--minimal", action="store_true", help="solo la capa mínima del formato lista")
    ap.add_argument("--per-min", type=float, default=14.0, help="efectos por minuto de vídeo final (denso)")
    ap.add_argument("--no-words", action="store_true", help="no usar whisper por palabra")
    args = ap.parse_args()

    slug = args.slug
    cfg = json.loads((REPO / "videos.json").read_text(encoding="utf-8"))[slug]
    mdir = REPO / cfg["manifest_dir"]
    frames = json.loads((mdir / "frames.json").read_text(encoding="utf-8"))["frames"]
    rate = cfg.get("playback_rate", 1.0)
    audio = REPO / "remotion" / "public" / cfg["audio_static"]
    audio_end = probe(str(audio))[0] if audio.exists() else frames[-1]["startSec"] + 5
    lib = library()

    if args.minimal:
        plan = minimal_plan(frames)
        info = {}
    else:
        names = {n for pool in POOLS.values() for n in pool} | set(NUMBER_STINGS) | {
            "intro_tense.mp3", "mystery_sting.mp3", "subscribe_chime.mp3"}
        info = {n: probe(lib[n]) for n in names if n in lib}
        words = load_words(cfg, mdir, not args.no_words)
        tokens = tokens_from_words(words) if words else tokens_from_frames(frames, audio_end)
        plan = dense_plan(frames, tokens, audio_end, rate, args.per_min, info)

    dst = REPO / "remotion" / "public" / f"{slug}-sfx"
    dst.mkdir(exist_ok=True)
    sfx, counts = [], {}
    for a in plan:
        name = a["file"]
        if name not in lib:
            print(f"  falta en la biblioteca: {name} (se omite)")
            continue
        if not (dst / name).exists() or not os.path.samefile(lib[name], dst / name):
            shutil.copy(lib[name], dst / name)
        if args.minimal:
            vol, dur = 0.13, 1.2
        else:
            dur, mean_db = info.get(name) or probe(lib[name])
            target = TARGET_DB.get(a["kind"], -40)
            vol = min(VOL_MAX, max(VOL_MIN, 10 ** ((target - mean_db) / 20)))
        counts[a["kind"]] = counts.get(a["kind"], 0) + 1
        sfx.append({"file": name, "startSec": round(a["t0"], 2), "duration": round(dur, 2),
                    "volume": round(vol, 3), "kind": a["kind"],
                    "prompt": f"reused from channel SFX library (auto_sfx.py{' --minimal' if args.minimal else ''})"
                              + (f" — {a.get('why')}" if a.get("why") else "")})
    music = "musica-canal.mp3"
    if music in lib and not (dst / music).exists():
        shutil.copy(lib[music], dst / music)
    # Música de fondo QUITADA (oct-2026: a nadie le gustaba). volume 0 = no suena; cambiar aquí si vuelve.
    out = {"sfx": sfx, "music": {"file": music, "duration": 30, "volume": 0.0,
                                 "prompt": "reused channel background music loop"}}
    (mdir / "sfx.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    mins = audio_end / rate / 60
    print(f"{slug}: {len(sfx)} efectos en {mins:.1f} min de vídeo ({len(sfx) / max(mins, 0.1):.1f}/min) "
          f"— {', '.join(f'{k} {v}' for k, v in sorted(counts.items()))}")


if __name__ == "__main__":
    main()
