#!/usr/bin/env python3
"""Gate DETERMINISTA sobre las escenas de un video (frames.json) que corre
ANTES de generar ninguna imagen. Responde de forma objetiva a las partes
comprobables de las 7 preguntas de la Style Bible
(channel/<canal>/style-bible.json):

  1. Respeta el estilo seleccionado?      -> banned_style_break_words()
  4. Repite demasiado una composicion?     -> composition histogram + runs
  5. Objetos con texto sin contenido dicho?-> check_text_bearing_objects()
  6. Prompt con suficiente informacion?    -> check_prompt_length()
  7. Riesgo de cambio de estilo involuntario? -> banned_style_break_words()

Las preguntas 2 y 3 (coherencia visual real con imagenes anteriores, y si la
imagen representa bien la frase) NO se pueden verificar sin mirar las
imagenes generadas -- eso sigue siendo revision del agente/humano tras
generar, igual que preflight.py no puede juzgar expresividad de voz.

Uso:
    python scripts/scene_diversity_check.py --video hacker-espana-vs-eeuu
    python scripts/scene_diversity_check.py --video hacker-espana-vs-eeuu --json
"""
import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

# Palabras/patrones que rompen el estilo Ecomonos-plano-blanco (ver style-bible.json
# -> elementos_que_deben_evitarse). Si aparecen en un prompt sin querer, es una fuga
# de estilo (photoreal/3D/ropa por defecto/gradiente...).
STYLE_BREAK_WORDS = [
    r"\bphotorealistic\b", r"\b3d render\b", r"\bgradient\b", r"\bwatercolor\b",
    r"\banime\b", r"\bpixel art\b", r"\bglossy\b", r"\bglow\b", r"\bblur(ry)?\b",
    r"\bshirt\b", r"\bt-shirt\b", r"\bpants\b", r"\bjeans\b", r"\bclothes\b",
]

# Patrones de composicion que clasifican cada escena en un "tipo de plano".
# El orden importa: se evalua de arriba a abajo y se usa el primer match.
COMPOSITION_PATTERNS = [
    ("split_screen", r"split[- ]screen|two panels|dos paneles"),
    ("two_characters", r"\bm2\b|second (identical )?monkey|twin|gemelo|side by side.*monkey|two monkeys|los dos monos"),
    ("extreme_close_up", r"extreme close-?up"),
    ("close_up", r"\bclose-?up\b"),
    ("over_the_shoulder", r"over-the-shoulder|sobre el hombro"),
    ("wide_shot", r"\bwide (shot|comedy shot)\b"),
    ("medium_shot", r"\bmedium shot\b"),
    ("profile", r"\bside profile\b|\bprofile\b"),
    ("object_only", r"no characters|sin personajes|no monkey"),
]

# Objetos que "deberian" llevar informacion visible. Si aparecen sin una cifra,
# palabra citada entre comillas, o la palabra blank/empty/nothing/vacio/vacía
# cerca, el modelo puede improvisar texto roto o dejarlos inconsistentes.
TEXT_BEARING_OBJECTS = [
    r"\bdocument\b", r"\bdocumento\b", r"\bplaque\b", r"\bplaqueta\b",
    r"\bsignpost\b", r"\bsign\b", r"\bcartel\b", r"\bscreen\b", r"\bpantalla\b",
    r"\breport\b", r"\binforme\b", r"\bfolder\b", r"\bcarpeta\b",
]
BLANK_OK_WORDS = ["blank", "empty", "nothing", "vacio", "vacía", "vacio de", "no text", "no legible"]
HAS_NUMBER_OR_QUOTE = re.compile(r"\d|'[^']+'|\"[^\"]+\"")

# El motivo calendario/hoja arrancada solo tiene sentido si la frase real habla
# de dias/meses transcurridos -- fuera de eso, alucina la palabra "DIAS" (ver
# memoria: gotcha-numeral-medallon-vs-calendario).
CALENDAR_WORDS = re.compile(r"calendar|torn (paper|calendar)|calendario|hoja arrancada")
DAYS_MONTHS_WORDS = re.compile(r"\bd[ií]a\b|\bd[ií]as\b|\bmes\b|\bmeses\b|\bd[ií]a\(s\)\b", re.IGNORECASE)


def classify_composition(scene: str) -> str:
    low = scene.lower()
    for label, pattern in COMPOSITION_PATTERNS:
        if re.search(pattern, low):
            return label
    return "other"


def check_style_break_words(frames: list[dict]) -> list[dict]:
    issues = []
    for i, fr in enumerate(frames):
        low = fr["scene"].lower()
        hits = [w for w in STYLE_BREAK_WORDS if re.search(w, low)]
        if hits:
            issues.append({"index": i, "file": fr["file"], "hits": hits})
    return issues


def check_text_bearing_objects(frames: list[dict]) -> list[dict]:
    issues = []
    for i, fr in enumerate(frames):
        low = fr["scene"].lower()
        mentioned = [pat.strip("\\b") for pat in TEXT_BEARING_OBJECTS if re.search(pat, low)]
        if not mentioned:
            continue
        has_content = bool(HAS_NUMBER_OR_QUOTE.search(fr["scene"]))
        has_blank_ok = any(b in low for b in BLANK_OK_WORDS)
        if not has_content and not has_blank_ok:
            issues.append({"index": i, "file": fr["file"], "objects": mentioned})
    return issues


def check_calendar_misuse(frames: list[dict]) -> list[dict]:
    issues = []
    for i, fr in enumerate(frames):
        if CALENDAR_WORDS.search(fr["scene"]):
            text = fr.get("text", "")
            if not DAYS_MONTHS_WORDS.search(text):
                issues.append({"index": i, "file": fr["file"], "text": text[:60]})
    return issues


def check_prompt_length(frames: list[dict], min_chars: int = 40) -> list[dict]:
    return [
        {"index": i, "file": fr["file"], "len": len(fr["scene"])}
        for i, fr in enumerate(frames)
        if len(fr["scene"]) < min_chars
    ]


def composition_report(frames: list[dict], twin_cap_pct: float = 15.0, max_run: int = 2):
    labels = [classify_composition(fr["scene"]) for fr in frames]
    hist = Counter(labels)
    total = len(labels)

    # rachas: cuantas veces se repite el MISMO tipo de plano en escenas consecutivas
    runs = []
    current_label, current_len = None, 0
    for lbl in labels:
        if lbl == current_label:
            current_len += 1
        else:
            if current_label is not None:
                runs.append((current_label, current_len))
            current_label, current_len = lbl, 1
    if current_label is not None:
        runs.append((current_label, current_len))
    long_runs = [(lbl, n) for lbl, n in runs if n > max_run]

    over_cap = [
        (lbl, count, round(100 * count / total, 1))
        for lbl, count in hist.items()
        if total and (100 * count / total) > twin_cap_pct and lbl in ("two_characters", "split_screen")
    ]

    return {
        "total_scenes": total,
        "histogram": dict(hist),
        "histogram_pct": {k: round(100 * v / total, 1) for k, v in hist.items()} if total else {},
        "long_runs_over_threshold": [{"tipo": lbl, "racha": n} for lbl, n in long_runs],
        "twin_or_split_over_cap": [
            {"tipo": lbl, "veces": c, "pct": p} for lbl, c, p in over_cap
        ],
    }


def run_check(video: str, max_run: int = 2, twin_cap_pct: float = 15.0) -> dict:
    manifest_dir = REPO_ROOT / "channel" / "tecno" / "videos" / video
    frames_path = manifest_dir / "frames.json"
    if not frames_path.exists():
        sys.exit(f"No existe {frames_path}")
    data = json.loads(frames_path.read_text(encoding="utf-8"))
    frames = data["frames"]

    comp = composition_report(frames, twin_cap_pct=twin_cap_pct, max_run=max_run)
    style_break = check_style_break_words(frames)
    text_objects = check_text_bearing_objects(frames)
    calendar_misuse = check_calendar_misuse(frames)
    short_prompts = check_prompt_length(frames)

    fallos = 0
    fallos += len(style_break)
    fallos += len(comp["long_runs_over_threshold"])
    fallos += len(comp["twin_or_split_over_cap"])

    return {
        "video": video,
        "composicion": comp,
        "fuga_de_estilo": style_break,
        "objetos_con_texto_sin_contenido": text_objects,
        "mal_uso_calendario": calendar_misuse,
        "prompts_demasiado_cortos": short_prompts,
        "fallos": fallos,
        "avisos": len(text_objects) + len(calendar_misuse) + len(short_prompts),
    }


def print_report(rep: dict) -> None:
    print(f"=== scene_diversity_check: {rep['video']} ===")
    comp = rep["composicion"]
    print(f"\nTotal escenas: {comp['total_scenes']}")
    print("Distribucion de planos:")
    for lbl, pct in sorted(comp["histogram_pct"].items(), key=lambda kv: -kv[1]):
        n = comp["histogram"][lbl]
        print(f"  {lbl:20s} {n:4d}  ({pct}%)")

    if comp["long_runs_over_threshold"]:
        print("\n[FALLO] Rachas del mismo plano por encima del limite:")
        for r in comp["long_runs_over_threshold"]:
            print(f"  - {r['tipo']}: {r['racha']} escenas seguidas")
    else:
        print("\n[OK] Sin rachas de plano repetido por encima del limite")

    if comp["twin_or_split_over_cap"]:
        print("\n[FALLO] 'dos monos'/split-screen por encima del limite recomendado:")
        for r in comp["twin_or_split_over_cap"]:
            print(f"  - {r['tipo']}: {r['veces']} veces ({r['pct']}% del video)")
    else:
        print("\n[OK] 'dos monos'/split-screen dentro del limite")

    if rep["fuga_de_estilo"]:
        print(f"\n[FALLO] {len(rep['fuga_de_estilo'])} escenas con palabras que rompen el estilo:")
        for it in rep["fuga_de_estilo"][:10]:
            print(f"  - [{it['index']}] {it['file']}: {it['hits']}")
    else:
        print("\n[OK] Sin palabras que rompan el estilo")

    if rep["objetos_con_texto_sin_contenido"]:
        print(f"\n[AVISO] {len(rep['objetos_con_texto_sin_contenido'])} escenas con objeto de texto sin contenido especificado:")
        for it in rep["objetos_con_texto_sin_contenido"][:10]:
            print(f"  - [{it['index']}] {it['file']}: {it['objects']}")

    if rep["mal_uso_calendario"]:
        print(f"\n[AVISO] {len(rep['mal_uso_calendario'])} escenas con motivo calendario fuera de contexto de dias/meses:")
        for it in rep["mal_uso_calendario"][:10]:
            print(f"  - [{it['index']}] {it['file']}: \"{it['text']}\"")

    if rep["prompts_demasiado_cortos"]:
        print(f"\n[AVISO] {len(rep['prompts_demasiado_cortos'])} escenas con prompt muy corto (<40 chars, riesgo de ambiguedad):")
        for it in rep["prompts_demasiado_cortos"][:10]:
            print(f"  - [{it['index']}] {it['file']}: {it['len']} chars")

    print(f"\n=> {rep['fallos']} fallos, {rep['avisos']} avisos")
    if rep["fallos"]:
        print("scene_diversity_check FALLO. Reescribe las escenas senaladas antes de generar imagenes.")
    else:
        print("scene_diversity_check OK. Recuerda: esto NO sustituye la revision visual de una muestra tras generar.")


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--video", required=True)
    p.add_argument("--max-run", type=int, default=2, help="Maximo de escenas consecutivas con el mismo tipo de plano")
    p.add_argument("--twin-cap-pct", type=float, default=15.0, help="Maximo %% del video con 'dos monos'/split-screen")
    p.add_argument("--json", action="store_true", help="Salida en JSON en vez de texto")
    args = p.parse_args()

    rep = run_check(args.video, max_run=args.max_run, twin_cap_pct=args.twin_cap_pct)
    if args.json:
        print(json.dumps(rep, ensure_ascii=False, indent=2))
    else:
        print_report(rep)
    sys.exit(1 if rep["fallos"] else 0)


if __name__ == "__main__":
    main()
