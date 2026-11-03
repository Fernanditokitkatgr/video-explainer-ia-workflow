#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""GUION → PLANO → RENDER con el motor de animación (remotion/src/motor). Sin imágenes generadas.

Un vídeo nuevo NO necesita programar escenas: se escribe su PLANO (channel/<canal>/videos/<slug>/plano.json)
y este script lo resuelve contra los tiempos de palabra de la locución y lo renderiza.

    python scripts/motor_plano.py <slug>                    # resuelve y valida el plano (no renderiza)
    python scripts/motor_plano.py <slug> --render           # + render 1920x1080 + loudnorm → remotion/output/<slug>.mp4
    python scripts/motor_plano.py <slug> --still 4.5 --out x.png   # fotograma suelto (miniaturas, revisión)
    python scripts/motor_plano.py <slug> --stills 3,10,25 --dir carpeta  # varios fotogramas de un solo empaquetado
    python scripts/motor_plano.py <slug> --capitulos        # escribe "## Capítulos" de seo.md con los tiempos reales
    python scripts/motor_plano.py --hoja                    # hoja de personajes → channel/tecno/pruebas/motor/personajes.mp4
    python scripts/motor_plano.py <slug> --voz otra.mp3     # usa otra locución (sus palabras van a words_<nombre>.json)
    python scripts/motor_plano.py <slug> --negaciones       # check_negations.py con words.json (no necesita frames.json)

RELLENO AUTOMÁTICO: si un tramo deja el centro vacío más de 1,2 s esperando a su ancla, se le pone
una escena "relleno" desde el inicio del tramo (icono relacionado en una nube, o puntitos) hasta que
llega el contenido. Se elige el icono de la propia escena que espera o, si no tiene, por palabras clave
de lo que se dice. Un tramo lo desactiva con "relleno": false o lo fija con "relleno": {"icono": "..."}.
El validador avisa también si una escena pasa más de 1,5 s enseñando solo su título.
Dos renders del mismo slug a la vez no se dejan (bloqueo en remotion/out/<slug>.render.lock).

FORMATO DEL PLANO (fuente, escrito a mano o por un agente):

    {
      "reparto": {"mono": {"tipo": "protagonista", "narrador": true}, "rico": {"tipo": "rico"}},
      "tramos": [
        {"en": "Viernes, diez de octubre",           ← primeras palabras de la frase donde empieza el tramo
         "color": "amarillo",                        ← color del fondo de rayos (cortinilla al cambiar)
         "capitulo": "Viernes 10 de octubre",        ← opcional: abre capítulo de YouTube aquí
         "escenas": [{"tipo": "cifra", "desde": 0, "hasta": 121000, "prefijo": "$", "al": "@ciento"}],
         "personajes": {"mono": {"x": 0.2, "pose": "señalar", "cara": "sorpresa",
                                 "cambios": [{"al": "@baja", "pose": "miedo", "cara": "miedo"}],
                                 "dice": [{"texto": "¡¿Qué?!", "al": "@tarde"}]}},
         "sfx": [["boom", "@baja", 1.0]], "golpes": ["@baja"]}
      ]
    }

ANCLAS: cualquier texto que empiece por "@" se convierte en segundos: "@baja" (primera "baja" desde el
inicio del tramo), "@seis mil" (secuencia), "@baja#2" (la segunda), "@baja+0.3" / "@baja-0.2" (desfase),
"@inicio", "@fin", "@+1.5" (segundos desde el inicio del tramo). Una escena dura todo su tramo salvo
"aparece"/"desaparece" (anclas) o "tramos": N (se queda N tramos más). Un personaje que sigue en el tramo
siguiente NO vuelve a entrar: solo cambia de pose/cara/sitio (se desplaza dando saltitos).
x en fracción del ancho (0-1) o píxeles; y por defecto en el suelo (0,93 del alto); escala por defecto 0,9.
"""
import argparse
import json
import math
import re
import shutil
import subprocess
import sys
import unicodedata
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "scripts"))
REMOTION = REPO / "remotion"
PUB = REMOTION / "public-motor"  # carpeta pública MÍNIMA: el bundler la copia a %TEMP% en cada render
LIB_SFX = REPO / "assets" / "sfx" / "motor"

# nombre del efecto en el motor → archivo de la biblioteca del repo (se busca en public-pruebas,
# remotion/public/*-sfx y assets/sfx/shorts; se copia una vez a assets/sfx/motor/)
SFX_MAP = {
    "whoosh": "ch_whoosh", "whoosh_suave": "ch_whoosh_soft", "swoosh": "swoosh", "pop": "pop", "pop2": "bubble_pop",
    "boing": "comedic_boing", "ding": "chime", "ding2": "good_ding", "exito": "success_chime", "caja": "cash_register",
    "monedas": "coins", "moneda": "coin_clink", "golpe": "ch_hit", "golpe_seco": "impact_thud", "boom": "boom",
    "boom_hondo": "deep_boom", "sello": "stamp", "mazo": "gavel", "subida": "ch_riser", "tension": "rising_tension",
    "tick": "tick", "reloj": "clock_tick", "teclas": "typing", "notif": "notify", "alerta": "warning_beep",
    "glitch": "digital_glitch", "apagon": "power_down", "zap": "electric_zap", "gente": "crowd",
    "rasgueo": "record_scratch", "rotulador": "marker_scribble", "pasos": "steps", "click": "click", "pagina": "page",
    "puerta": "door_slam", "cristal": "glass_crack", "pregunta": "question_sting", "giro": "twist_sting",
    "revelacion": "reveal_sting", "triunfo": "triumphant_chime", "caida": "speed_whoosh", "engranaje": "gear_whirring",
    "agua": "water_drop", "cadena": "chain",
}
SFX_TARGET_LUFS = -32.6  # mismo criterio que el Short de prueba: cada efecto igualado por sonoridad

ESCENAS = {"lista", "flujo", "comparativa", "cifra", "grafica", "chat", "por_dentro", "mapa", "sello", "pantalla",
           "dinero", "pregunta", "texto", "iconos", "relleno"}

# ───────────────────────── relleno automático ─────────────────────────
RELLENO_MAX = 1.2   # s de centro vacío que se toleran al empezar un tramo
TITULO_MAX = 1.5    # s que una escena puede pasar enseñando solo su título (aviso)
# palabra (sin tildes, por prefijo) → icono de Iconos.tsx; el primero que suene en el hueco gana
PALABRAS_ICONO = [
    ("bitcoin", "bitcoin"), ("cripto", "bitcoin"), ("dolar", "dolar"), ("euro", "dolar"), ("dinero", "dolar"),
    ("pag", "dolar"), ("cobr", "dolar"), ("gana", "dolar"), ("factur", "dolar"), ("ingres", "dolar"), ("precio", "dolar"),
    ("banco", "banco"), ("hacienda", "balanza"), ("impuest", "balanza"), ("ley", "mazo"), ("multa", "mazo"),
    ("tribunal", "mazo"), ("juicio", "mazo"), ("delito", "mazo"), ("carcel", "mazo"), ("cnmc", "mazo"),
    ("movil", "movil"), ("iphone", "movil"), ("samsung", "movil"), ("galaxy", "movil"), ("tablet", "movil"),
    ("app", "movil"), ("bateri", "bateria"), ("carga", "bateria"), ("calor", "termometro"), ("quema", "fuego"),
    ("grados", "termometro"), ("chip", "chip"), ("procesador", "chip"), ("memoria", "caja"), ("trastero", "caja"),
    ("actualiz", "reloj_arena"), ("lento", "tortuga"), ("frena", "tortuga"), ("youtube", "play"), ("video", "play"),
    ("short", "play"), ("anuncio", "megafono"), ("marca", "megafono"), ("twitch", "micro"), ("directo", "micro"),
    ("camiseta", "camiseta"), ("chocolate", "chocolate"), ("record", "trofeo"), ("evento", "ticket"),
    ("entrada", "ticket"), ("estadio", "ticket"), ("andorra", "avion"), ("muda", "avion"), ("casa", "casa"),
    ("españa", "mundo"), ("espana", "mundo"), ("mundo", "mundo"), ("pais", "mundo"), ("europa", "mundo"),
    ("francia", "mundo"), ("italia", "mundo"), ("corea", "mundo"), ("google", "ojo"), ("busca", "ojo"),
    ("secret", "candado"), ("trampa", "candado"), ("idea", "bombilla"), ("año", "calendario"), ("anos", "calendario"),
    ("mes", "calendario"), ("dias", "calendario"), ("hora", "reloj_arena"), ("fan", "hucha"), ("propina", "hucha"),
    ("suscri", "hucha"), ("sube", "grafico_sube"), ("crece", "grafico_sube"), ("baja", "grafico_baja"),
    ("cae", "grafico_baja"), ("examen", "examen"), ("puerta", "puerta"), ("mochila", "mochila"),
]
_T = lambda d, k, dflt: d[k] if isinstance(d.get(k), (int, float)) else dflt


def _iconos_de(o) -> list[str]:
    out = []
    if isinstance(o, dict):
        for k, v in o.items():
            if k == "icono" and isinstance(v, str):
                out.append(v)
            else:
                out += _iconos_de(v)
    elif isinstance(o, list):
        for v in o:
            out += _iconos_de(v)
    return out


def tiempos_escena(tipo: str, d: dict, t0: float) -> tuple[float, float]:
    """(primer momento en que se ve ALGO, primer momento en que se ve su CONTENIDO, no solo el título)
    con los mismos valores por defecto que Escenas.tsx."""
    tit = bool(d.get("titulo"))
    if tipo == "texto":
        ps = d.get("palabras") or []
        c = min([_T(x, "al", t0 + 0.1 + i * 0.25) for i, x in enumerate(ps)] or [t0])
        return c, c
    if tipo == "cifra":
        ta = _T(d, "al", t0 + 0.1)
        c = max(t0, ta - 0.3) if d.get("desde", 0) != d.get("hasta", 0) else t0
        return (t0 if d.get("antes") else c), c
    if tipo == "iconos":
        its = d.get("items") or []
        c = min([_T(x, "al", t0 + 0.15 + i * 0.4) for i, x in enumerate(its)] or [t0])
        return (t0 if tit else c), c
    if tipo == "pregunta":
        c = _T(d, "al", t0 + 0.05)
        return c, c
    if tipo == "sello":
        c = _T(d, "al", t0 + 0.2) - 0.05
        return c, c
    if tipo == "comparativa":
        c = _T(d.get("a") or {}, "al", t0 + 0.1)
        return (t0 if tit else c), c
    if tipo == "flujo":
        ns = d.get("nodos") or []
        c = min([_T(x, "al", t0 + 0.2 + i * 0.7) for i, x in enumerate(ns)] or [t0])
        return (t0 if tit else c), c
    if tipo == "chat":
        ms = d.get("mensajes") or []
        c = min([_T(x, "al", t0 + 0.2 + i * 0.8) for i, x in enumerate(ms)] or [t0])
        return c, c
    if tipo == "dinero":
        c = _T(d, "al", t0)
        return c, c
    # lista, grafica, pantalla, mapa, por_dentro, relleno: se ven desde el principio
    return t0, t0


def icono_para(words: list[dict], a: float, b: float) -> str | None:
    for w in words:
        if w["start"] < a - 0.05:
            continue
        if w["start"] > b + 0.6:
            break
        n = norm(w["text"])
        for pref, ic in PALABRAS_ICONO:
            if n.startswith(norm(pref)) and len(n) >= len(norm(pref)):
                return ic
    return None


def rellenar(tramos_src: list[dict], tramos: list[dict], words: list[dict], R) -> int:
    """Pone una escena "relleno" al principio de los tramos cuyo centro se queda vacío > RELLENO_MAX s y
    avisa de las escenas que pasan > TITULO_MAX s solo con el título. Devuelve cuántos rellenos puso."""
    todas = [(e, tiempos_escena(e["tipo"], e["d"], e["t0"])) for tr in tramos for e in tr["escenas"]]
    for e, (vis, cont) in todas:
        if e["tipo"] in ("iconos", "flujo", "comparativa") and e["d"].get("titulo") and cont - e["t0"] > TITULO_MAX:
            R.avisos.append(f"escena {e['tipo']} en {e['t0']:.1f}s: {cont - e['t0']:.1f} s solo con el título «{e['d']['titulo']}»")
    n = 0
    for k, (tr_src, tr) in enumerate(zip(tramos_src, tramos)):
        cfg = tr_src.get("relleno")
        if cfg is False:
            continue
        t0, t1 = tr["t0"], tr["t1"]
        primero = t1
        espera = None  # la escena que se está esperando
        for e, (vis, cont) in todas:
            if e["t1"] <= t0 + 0.05 or e["t0"] >= t1 or e["tipo"] == "relleno":
                continue
            v = max(t0, vis)
            if v < primero:
                primero, espera = v, e
        hueco = primero - t0
        if hueco <= RELLENO_MAX and not isinstance(cfg, dict):
            continue
        d = dict(cfg) if isinstance(cfg, dict) else {}
        if "icono" not in d and "texto" not in d:
            ics = _iconos_de(espera["d"]) if espera else []
            ic = ics[0] if ics else icono_para(words, t0, primero)
            if ic:
                d["icono"] = ic
        if espera:
            for kk in ("zona", "caja"):
                if kk in espera["d"] and kk not in d:
                    d[kk] = espera["d"][kk]
        tr["escenas"].insert(0, {"tipo": "relleno", "d": d, "t0": t0, "t1": round(min(t1, primero + 0.12), 3)})
        n += 1
    return n

TIPOS = {"protagonista", "ciberdelincuente", "rico", "ia", "abuelo", "currito", "nino",
         # v3 (nov-2026)
         "mona", "cientifica", "policia", "medico", "alien", "perro", "gato", "influencer", "profe", "cocinero",
         "astronauta"}
OBJETOS = {"ninguno", "bolsa", "bitcoin", "movil", "baston", "puntero", "billete", "lupa", "pizza", "megafono", "puro",
           "bolso", "probeta", "sarten", "aro_luz", "paquete"}
POSES = {"de_pie", "señalar", "señalar_arriba", "brazos_arriba", "pensar", "encogerse", "correr", "caminar",
         "sentado", "brazos_cruzados", "saludar", "jarras", "miedo", "presentar", "celebrar", "empujar"}
CARAS = {"normal", "sorpresa", "risa", "miedo", "enfado", "guiño", "triste", "chulo"}


def norm(w: str) -> str:
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)


def ffprobe_dur(p: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                         capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


def lufs(p: Path) -> float:
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(p), "-af", "ebur128", "-f", "null", "-"],
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    m = re.findall(r"I:\s+(-?[\d.]+) LUFS", r.stderr)
    return float(m[-1]) if m else -30.0


# ───────────────────────── carpeta pública mínima ─────────────────────────
def preparar_sfx() -> dict:
    LIB_SFX.mkdir(parents=True, exist_ok=True)
    fuentes = [REMOTION / "public-pruebas" / "pruebas-chatgpt" / "sfx", REPO / "assets" / "sfx" / "shorts",
               *sorted((REMOTION / "public").glob("*-sfx"))]
    for name, base in SFX_MAP.items():
        dst = LIB_SFX / f"{name}.mp3"
        if dst.exists():
            continue
        src = next((d / f"{base}.mp3" for d in fuentes if (d / f"{base}.mp3").exists()), None)
        if not src:
            print(f"  ⚠ no encuentro el efecto {base}.mp3 para '{name}'")
            continue
        shutil.copy2(src, dst)
    gpath = LIB_SFX / "sfx_gain.json"
    gains = json.loads(gpath.read_text(encoding="utf-8")) if gpath.exists() else {}
    for f in sorted(LIB_SFX.glob("*.mp3")):
        if f.stem not in gains:
            lu = lufs(f)
            gains[f.stem] = round(min(1.0, 10 ** ((SFX_TARGET_LUFS - lu) / 20)), 3)
    gpath.write_text(json.dumps(gains, ensure_ascii=False, indent=1), encoding="utf-8")
    return gains


def preparar_publico(slug: str | None, voz: Path | None) -> dict:
    (PUB / "fonts").mkdir(parents=True, exist_ok=True)
    font = PUB / "fonts" / "Montserrat-ExtraBold.ttf"
    if not font.exists():
        shutil.copy2(REPO / "assets" / "fonts" / "Montserrat-ExtraBold.ttf", font)
    gains = preparar_sfx()
    (PUB / "sfx").mkdir(exist_ok=True)
    for f in LIB_SFX.glob("*.mp3"):
        d = PUB / "sfx" / f.name
        if not d.exists() or d.stat().st_size != f.stat().st_size:
            shutil.copy2(f, d)
    if slug and voz:
        (PUB / slug).mkdir(exist_ok=True)
        d = PUB / slug / "voz.mp3"
        if not d.exists() or d.stat().st_mtime < voz.stat().st_mtime or d.stat().st_size != voz.stat().st_size:
            shutil.copy2(voz, d)
    return gains


# ───────────────────────── palabras ─────────────────────────
def palabras(slug: str, cfg: dict, voz: Path | None = None) -> list[dict]:
    """Tiempos de whisper alineados con el TEXTO del guion (cifras en letras, sin errores de oído).
    Con otra voz (--voz), la caché va aparte (words_<nombre>.json) para no pisar la de la voz oficial."""
    from whisper_timestamps import cached_words
    from make_shorts import align_words, script_words
    mdir = REPO / cfg["manifest_dir"]
    oficial = REMOTION / "public" / cfg["audio_static"]
    audio = voz or oficial
    cache = mdir / "words.json" if audio.resolve() == oficial.resolve() else mdir / f"words_{audio.stem}.json"
    ww = cached_words(audio, cache)
    sw = script_words(REPO / cfg["script"])
    times = align_words(sw, ww)
    return [{"text": w, "start": round(a, 3), "end": round(b, 3)} for w, (a, b) in zip(sw, times)]


# ───────────────────────── resolución del plano ─────────────────────────
class Resolver:
    def __init__(self, words: list[dict]):
        self.words = words
        self.n = [norm(w["text"]) for w in words]
        self.errores: list[str] = []
        self.avisos: list[str] = []

    def buscar(self, frase: str, desde: int, nth: int = 1) -> int | None:
        toks = [norm(x) for x in frase.split() if norm(x)]
        if not toks:
            return None
        seen = 0
        for i in range(desde, len(self.n) - len(toks) + 1):
            if self.n[i:i + len(toks)] == toks:
                seen += 1
                if seen == nth:
                    return i
        return None

    def ancla(self, s: str, base: int, t0: float, t1: float, ctx: str) -> float:
        body = s[1:].strip()
        if body == "inicio":
            return t0
        if body == "fin":
            return t1
        m = re.fullmatch(r"([+-]\d+(?:\.\d+)?)", body)
        if m:
            return round(t0 + float(m.group(1)), 3)
        m = re.fullmatch(r"(.+?)(?:#(\d+))?\s*([+-]\d+(?:\.\d+)?)?", body)
        frase, nth, off = m.group(1), int(m.group(2) or 1), float(m.group(3) or 0)
        i = self.buscar(frase, base, nth)
        if i is None:
            self.errores.append(f"{ctx}: no encuentro «{frase}»{'#' + str(nth) if nth > 1 else ''} desde la palabra {base}")
            return t0
        t = self.words[i]["start"] + off
        if t > t1 + 0.4:
            self.avisos.append(f"{ctx}: «{frase}» cae en {t:.2f}s, fuera de su tramo ({t0:.2f}-{t1:.2f})")
        return round(t, 3)

    def todo(self, obj, base: int, t0: float, t1: float, ctx: str):
        if isinstance(obj, str) and obj.startswith("@"):
            return self.ancla(obj, base, t0, t1, ctx)
        if isinstance(obj, list):
            return [self.todo(x, base, t0, t1, ctx) for x in obj]
        if isinstance(obj, dict):
            return {k: self.todo(v, base, t0, t1, ctx) for k, v in obj.items()}
        return obj


def resolver_plano(slug: str, cfg: dict, src: dict, words: list[dict], dur_audio: float, gains: dict) -> tuple[dict, Resolver]:
    W, H = (1080, 1920) if src.get("formato") == "9:16" else (1920, 1080)
    R = Resolver(words)
    tramos_src = src["tramos"]
    # 1) inicio de cada tramo
    bases, starts = [], []
    pos = 0
    for k, tr in enumerate(tramos_src):
        if k == 0 and not tr.get("en"):
            bases.append(0)
            starts.append(0.0)
            continue
        i = R.buscar(tr["en"], pos)
        if i is None:
            R.errores.append(f"tramo {k}: no encuentro el inicio «{tr['en']}» después de la palabra {pos}")
            i = pos
        bases.append(i)
        starts.append(0.0 if k == 0 else max(0.0, words[i]["start"] - 0.08))
        pos = i + 1
    for k in range(1, len(starts)):
        if starts[k] <= starts[k - 1]:
            R.errores.append(f"tramo {k} («{tramos_src[k].get('en')}») empieza antes que el anterior")
    dur = round(max(dur_audio, words[-1]["end"]) + float(src.get("cola", 1.2)), 3)
    ends = starts[1:] + [dur]

    # 2) escenas y sfx
    tramos = []
    for k, tr in enumerate(tramos_src):
        t0, t1, base = starts[k], ends[k], bases[k]
        ctx = f"tramo {k} («{tr.get('en', '')[:28]}»)"
        escenas = []
        for e in tr.get("escenas", []) + ([tr["escena"]] if tr.get("escena") else []):
            e = dict(e)
            tipo = e.pop("tipo", None)
            if tipo not in ESCENAS:
                R.errores.append(f"{ctx}: escena desconocida «{tipo}» (válidas: {sorted(ESCENAS)})")
                continue
            e_t1 = ends[min(len(ends) - 1, k + int(e.pop("tramos", 0)))]
            d = R.todo(e, base, t0, e_t1, ctx)
            et0 = d.pop("aparece", t0)
            et1 = d.pop("desaparece", e_t1)
            escenas.append({"tipo": tipo, "d": d, "t0": et0, "t1": et1})
        sfx = R.todo(tr.get("sfx", []), base, t0, t1, ctx)
        for s in sfx:
            if s[0] not in gains:
                R.errores.append(f"{ctx}: efecto desconocido «{s[0]}»")
        tramos.append({"t0": t0, "t1": t1, "color": tr.get("color"), "escenas": escenas, "sfx": sfx,
                       "golpes": R.todo(tr.get("golpes", []), base, t0, t1, ctx)})

    n_rell = rellenar(tramos_src, tramos, words, R)
    if n_rell:
        R.avisos.append(f"relleno automático en {n_rell} tramos (centro vacío > {RELLENO_MAX} s al empezar)")

    # 3) reparto: apariciones continuas y claves
    reparto_src = src.get("reparto", {})
    reparto = {pid: {"tipo": p.get("tipo", "protagonista"), "apariciones": []} for pid, p in reparto_src.items()}
    for pid, p in reparto_src.items():
        if p.get("tipo", "protagonista") not in TIPOS:
            R.errores.append(f"reparto {pid}: tipo desconocido «{p.get('tipo')}»")
    estado: dict[str, dict] = {}
    for k, tr in enumerate(tramos_src):
        t0, t1, base = starts[k], ends[k], bases[k]
        ctx = f"tramo {k} («{tr.get('en', '')[:28]}»)"
        presentes = tr.get("personajes", {})
        for pid, spec in presentes.items():
            if pid not in reparto:
                R.errores.append(f"{ctx}: personaje «{pid}» no está en el reparto")
                continue
            spec = R.todo(spec, base, t0, t1, ctx)
            prev = estado.get(pid)
            nuevo = prev is None or prev["k"] != k - 1 or spec.get("entrada") is not None
            st = dict(prev["st"]) if prev else {"x": 0.5, "y": 0.93, "escala": 0.9, "pose": "de_pie", "cara": "normal",
                                                 "mira": "der", "habla": bool(reparto_src[pid].get("narrador"))}
            for f in ("x", "y", "escala", "pose", "cara", "mira", "objeto", "habla"):
                if f in spec:
                    st[f] = spec[f]
            px = lambda v, L: round(v * L if isinstance(v, (int, float)) and v <= 1.5 else v, 1)
            clave = {"t": spec.get("entra", t0) if nuevo else t0, "x": px(st["x"], W), "y": px(st["y"], H),
                     **{f: st[f] for f in ("escala", "pose", "cara", "mira", "habla") if f in st}}
            if "objeto" in st:
                clave["objeto"] = st["objeto"]
            if spec.get("salta"):
                clave["salta"] = True
            for f in ("pose",):
                if st[f] not in POSES:
                    R.errores.append(f"{ctx}: {pid} pose desconocida «{st[f]}»")
            if st["cara"] not in CARAS:
                R.errores.append(f"{ctx}: {pid} cara desconocida «{st['cara']}»")
            if nuevo:
                if prev and prev["k"] == k - 1:  # entrada forzada: cierra la anterior
                    reparto[pid]["apariciones"][-1]["t1"] = t0
                ap = {"t0": clave["t"], "t1": t1, "entrada": spec.get("entrada", "salto"), "salida": spec.get("salida", "salto"),
                      "claves": [clave], "dice": []}
                reparto[pid]["apariciones"].append(ap)
            else:
                ap = reparto[pid]["apariciones"][-1]
                ap["t1"] = t1
                if "salida" in spec:
                    ap["salida"] = spec["salida"]
                # solo añade clave si cambia algo (evita claves inútiles)
                last = ap["claves"][-1]
                if any(clave.get(f) != last.get(f) for f in ("x", "y", "escala", "pose", "cara", "mira", "objeto", "habla")) or clave.get("salta"):
                    ap["claves"].append(clave)
            for c in spec.get("cambios", []):
                t = c.get("al", t0)
                for f in ("x", "y", "escala", "pose", "cara", "mira", "objeto", "habla"):
                    if f in c:
                        st[f] = c[f]
                ck = {"t": t, "x": px(st["x"], W), "y": px(st["y"], H), **{f: st[f] for f in ("escala", "pose", "cara", "mira", "habla")}}
                if "objeto" in st:
                    ck["objeto"] = st["objeto"]
                if c.get("salta"):
                    ck["salta"] = True
                if c.get("pose", "de_pie") not in POSES or c.get("cara", "normal") not in CARAS:
                    R.errores.append(f"{ctx}: {pid} cambio con pose/cara desconocida {c}")
                ap["claves"].append(ck)
            for dch in spec.get("dice", []):
                ap["dice"].append({"texto": dch["texto"], "al": dch.get("al", t0), **({"hasta": dch["hasta"]} if "hasta" in dch else {}),
                                   **({"color": dch["color"]} if "color" in dch else {})})
            if "sale" in spec:
                ap["t1"] = spec["sale"]
            estado[pid] = {"k": k, "st": st}
    for p in reparto.values():
        for ap in p["apariciones"]:
            ap["claves"].sort(key=lambda c: c["t"])
            if ap["t1"] >= dur - 0.01:
                ap["salida"] = "nada"

    plano = {"slug": slug, "fps": 30, "ancho": W, "alto": H, "duracion": dur, "voz": f"{slug}/voz.mp3",
             "palabras": words, "tramos": tramos, "reparto": reparto, "sfx_gain": gains}
    if src.get("rayos"):
        plano["rayos"] = src["rayos"]
    return plano, R


def ritmo(plano: dict) -> tuple[float, float, list]:
    """¿Pasa algo nuevo cada 2-3 s? Junta todos los momentos con evento visual y mide los huecos."""
    ev = []
    for tr in plano["tramos"]:
        ev.append(tr["t0"])
        for e in tr["escenas"]:
            ev.append(e["t0"])
            def walk(o):
                if isinstance(o, dict):
                    for kk, v in o.items():
                        if kk in ("al", "respuesta_al", "titulo_al", "apodo_al", "vs_al", "ganador_al", "tachar_al", "etiqueta_al", "texto_al") and isinstance(v, (int, float)):
                            ev.append(v)
                        else:
                            walk(v)
                elif isinstance(o, list):
                    for v in o:
                        walk(v)
            walk(e["d"])
        ev.extend(tr.get("golpes", []))
    for p in plano["reparto"].values():
        for ap in p["apariciones"]:
            ev.append(ap["t0"])
            ev.extend(c["t"] for c in ap["claves"])
            ev.extend(d["al"] for d in ap.get("dice", []))
    ev = sorted(x for x in ev if 0 <= x <= plano["duracion"])
    gaps = [(b - a, a) for a, b in zip(ev, ev[1:])]
    big = sorted([g for g in gaps if g[0] > 3.0], reverse=True)
    mean = plano["duracion"] / max(1, len(ev))
    return mean, (max(gaps)[0] if gaps else 0), big


# ───────────────────────── bloqueo: un solo render por slug ─────────────────────────
def _pid_vivo(pid: int) -> bool:
    if pid <= 0:
        return False
    if sys.platform == "win32":
        r = subprocess.run(["tasklist", "/FI", f"PID eq {pid}", "/NH", "/FO", "CSV"], capture_output=True, text=True)
        return f'"{pid}"' in r.stdout
    try:
        import os
        os.kill(pid, 0)
        return True
    except OSError:
        return False


class Bloqueo:
    """remotion/out/<nombre>.render.lock con el PID: si otro render del mismo slug sigue vivo, se niega.
    Un candado de un proceso muerto (render cortado) se recoge solo."""

    def __init__(self, nombre: str):
        self.path = REMOTION / "out" / f"{nombre}.render.lock"

    def __enter__(self):
        import os
        self.path.parent.mkdir(parents=True, exist_ok=True)
        for _ in range(2):
            try:
                fd = os.open(str(self.path), os.O_CREAT | os.O_EXCL | os.O_WRONLY)
                os.write(fd, str(os.getpid()).encode())
                os.close(fd)
                return self
            except FileExistsError:
                try:
                    pid = int(self.path.read_text().strip() or 0)
                except (OSError, ValueError):
                    pid = 0
                if _pid_vivo(pid):
                    sys.exit(f"Ya hay un render de «{self.path.stem.replace('.render', '')}» en marcha (PID {pid}). "
                             f"Espera a que acabe o, si no existe, borra {self.path}.")
                self.path.unlink(missing_ok=True)  # candado huérfano
        sys.exit(f"No puedo crear el bloqueo {self.path}")

    def __exit__(self, *exc):
        self.path.unlink(missing_ok=True)
        return False


def negaciones(slug: str, cfg: dict, voz: Path) -> int:
    """check_negations.py con las palabras de whisper de words.json (el motor no tiene frames.json)."""
    mdir = REPO / cfg["manifest_dir"]
    oficial = REMOTION / "public" / cfg["audio_static"]
    cache = mdir / "words.json" if voz.resolve() == oficial.resolve() else mdir / f"words_{voz.stem}.json"
    cmd = [sys.executable, str(REPO / "scripts" / "check_negations.py"), slug, "--palabras", str(cache), "--audio", str(voz)]
    print("  " + " ".join(cmd))
    return subprocess.run(cmd, cwd=REPO).returncode


# ───────────────────────── render ─────────────────────────
def npx() -> str:
    return "npx.cmd" if sys.platform == "win32" else "npx"


def loudnorm(raw: Path, final: Path) -> None:
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(raw), "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S).group(0))
    af = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:"
          f"measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000")
    final.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-c:v", "copy", "-af", af, "-c:a", "aac", "-b:a", "192k",
                    "-movflags", "+faststart", str(final)], check=True)
    print(f"  loudnorm → {final} ({lufs(final):.1f} LUFS)")


def render(comp: str, out: Path, props: dict | None, extra: list[str] | None = None) -> None:
    cmd = [npx(), "remotion", "render", "src/motor/index.ts", comp, str(out), "--public-dir=public-motor", "--codec=h264",
           "--crf=20", "--concurrency=4", "--timeout=180000", "--log=error"]
    if props is not None:
        pf = REMOTION / "out" / f"props_{props['slug']}.json"
        pf.parent.mkdir(exist_ok=True)
        pf.write_text(json.dumps(props), encoding="utf-8")
        cmd.append(f"--props={pf}")
    cmd += extra or []
    print("  " + " ".join(cmd))
    subprocess.run(cmd, cwd=REMOTION, check=True)


def stills(slug: str, segundos: list[float], carpeta: Path) -> None:
    carpeta.mkdir(parents=True, exist_ok=True)
    js = REPO / "remotion" / "out" / "motor_stills.cjs"
    js.write_text(r"""
const path = require('path');
const {createRequire} = require('module');
const root = path.resolve(__dirname, '..');
const req = createRequire(path.join(root, 'package.json'));
const {bundle} = req('@remotion/bundler');
const {selectComposition, renderStill} = req('@remotion/renderer');
(async () => {
  const [comp, slug, out, ...secs] = process.argv.slice(2);
  const serveUrl = await bundle({entryPoint: path.join(root, 'src/motor/index.ts'), publicDir: path.join(root, 'public-motor')});
  const composition = await selectComposition({serveUrl, id: comp, inputProps: {slug, plano: null}});
  for (const s of secs) {
    const f = Math.round(Number(s) * composition.fps);
    await renderStill({composition, serveUrl, frame: f, output: path.join(out, `t${s}.png`), inputProps: composition.props});
    console.log('ok', s);
  }
})().catch((e) => { console.error(e); process.exit(1); });
""", encoding="utf-8")
    comp = "HojaPersonajes" if slug == "hoja" else "MotorPlano"
    subprocess.run(["node", str(js), comp, slug, str(carpeta), *[str(s) for s in segundos]], cwd=REMOTION, check=True)


def capitulos(slug: str, cfg: dict, src: dict, plano: dict) -> None:
    lines = []
    for tr_src, tr in zip(src["tramos"], plano["tramos"]):
        if tr_src.get("capitulo"):
            s = 0 if not lines else int(tr["t0"])
            lines.append(f"{s // 60}:{s % 60:02d} {tr_src['capitulo']}")
    seo = REPO / cfg["manifest_dir"] / "seo.md"
    text = seo.read_text(encoding="utf-8")
    new = "## Capítulos\n\n" + "\n".join(lines) + "\n"
    text = re.sub(r"## Capítulos\s*\n.*?(?=\n## )", new, text, count=1, flags=re.S)
    seo.write_text(text, encoding="utf-8")
    print("  capítulos en seo.md:\n    " + "\n    ".join(lines))


def main() -> None:
    ap = argparse.ArgumentParser(description="Plano → render con el motor de animación")
    ap.add_argument("slug", nargs="?")
    ap.add_argument("--render", action="store_true")
    ap.add_argument("--still", type=float)
    ap.add_argument("--stills")
    ap.add_argument("--dir")
    ap.add_argument("--out")
    ap.add_argument("--capitulos", action="store_true")
    ap.add_argument("--hoja", action="store_true", help="renderiza la hoja de personajes")
    ap.add_argument("--voz", help="otra locución (.mp3) en vez de la de videos.json")
    ap.add_argument("--negaciones", action="store_true", help="comprueba con check_negations.py que la voz no se comió ningún no/sin/nunca")
    a = ap.parse_args()

    if a.hoja:
        with Bloqueo("hoja"):
            preparar_publico(None, None)
            raw = REMOTION / "out" / "hoja_personajes_raw.mp4"
            render("HojaPersonajes", raw, None)
            final = Path(a.out) if a.out else REPO / "channel" / "tecno" / "pruebas" / "motor" / "personajes.mp4"
            loudnorm(raw, final)
            raw.unlink(missing_ok=True)
        return
    if not a.slug:
        sys.exit("Indica el slug del vídeo (o --hoja)")
    import config
    cfg = config.get_video(a.slug)
    mdir = REPO / cfg["manifest_dir"]
    src = json.loads((mdir / "plano.json").read_text(encoding="utf-8"))
    voz = Path(a.voz).resolve() if a.voz else REMOTION / "public" / cfg["audio_static"]
    if not voz.exists():
        sys.exit(f"No existe la voz {voz}")
    gains = preparar_publico(a.slug, voz)
    words = palabras(a.slug, cfg, voz)
    plano, R = resolver_plano(a.slug, cfg, src, words, ffprobe_dur(voz), gains)
    for w in R.avisos:
        print(f"  ⚠ {w}")
    if R.errores:
        for e in R.errores:
            print(f"  ✗ {e}")
        sys.exit(f"El plano tiene {len(R.errores)} errores: no se escribe ni se renderiza.")
    (PUB / a.slug).mkdir(parents=True, exist_ok=True)
    (PUB / a.slug / "plano.json").write_text(json.dumps(plano, ensure_ascii=False), encoding="utf-8")
    (PUB / a.slug / "words.json").write_text(json.dumps(words, ensure_ascii=False, indent=0), encoding="utf-8")
    mean, mx, big = ritmo(plano)
    nper = sum(len(p["apariciones"]) for p in plano["reparto"].values())
    print(f"Plano OK: {len(plano['tramos'])} tramos, {sum(len(t['escenas']) for t in plano['tramos'])} escenas, "
          f"{nper} apariciones de personajes, {plano['duracion']:.1f} s. Ritmo: un evento cada {mean:.2f} s de media, hueco máx. {mx:.1f} s.")
    for g, t in big[:8]:
        print(f"  ⚠ hueco de {g:.1f} s sin nada nuevo en {int(t // 60)}:{t % 60:04.1f}")
    if a.capitulos:
        capitulos(a.slug, cfg, src, plano)
    if a.still is not None or a.stills:
        secs = [a.still] if a.still is not None else [float(x) for x in a.stills.split(",")]
        carpeta = Path(a.dir) if a.dir else (Path(a.out).parent if a.out else REMOTION / "out" / f"stills_{a.slug}")
        stills(a.slug, secs, carpeta)
        if a.out and a.still is not None:
            shutil.move(str(carpeta / f"t{a.still}.png"), a.out)
            print(f"  still → {a.out}")
    if a.negaciones:
        if negaciones(a.slug, cfg, voz):
            print("  ✗ check_negations: hay alguna negación perdida (regenera la voz)")
    if a.render:
        with Bloqueo(a.slug):
            raw = REMOTION / "out" / f"{a.slug}_raw.mp4"
            render("MotorPlano", raw, {"slug": a.slug, "plano": None})
            loudnorm(raw, REMOTION / "output" / f"{a.slug}.mp4")
            raw.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
