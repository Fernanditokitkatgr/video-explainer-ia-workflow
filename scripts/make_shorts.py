#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Shorts verticales (1080x1920) de un vídeo largo. Dos modos, definidos en seo.md "## Shorts".

Por qué cambió (27-oct-2026, ver channel/tecno/shorts_playbook.md): la gente no entendía
nuestros Shorts. Eran recortes del largo sin contexto ("Número dos, el grupo de…"), el título
no se decía nunca y el texto amarillo fijo de arriba (`gancho`) daba el contexto por hecho.
En los 17 Shorts ganadores analizados: la primera frase ES el título, arriba solo va el NOMBRE
del tema (o el título mientras se dice), subtítulos de 1-2 palabras y nadie cierra con
"vídeo completo en el canal".

1) MODO GUION (por defecto en los vídeos nuevos): cada Short tiene su PROPIO mini-guion de
   30-45 s. Un bloque `### Short N` por Short dentro de "## Shorts":

       ### Short 1
       tipo: guion
       titulo: Este robot de casa cuesta 20.000 dólares (y no va solo)
       tema: ROBOT NEO
       reveal: UN/EMPLEADO
       cierre: seco
       L1: [curious] Este robot de casa cuesta veinte mil dólares. Y a veces no va solo. | img: nueva: <escena vertical>
       L2: Se llama NEO. Lo vende la empresa One X. Y dobla tu ropa. | img: 4_27
       B1: Promete entregarlo en Estados Unidos en dos mil veintiséis. | rotulo: 20.000 $
       P: Un empleado. Viendo tu casa. | img: 4_50
       F: El robot de casa ya existe. Lo que le falta es aprender solo. | img: 4_55

   - Cabecera: `titulo` (≤60, se dice en L1), `tema` (1-4 palabras, ≤22 caracteres, el nombre
     del sujeto; se ve arriba todo el Short), `reveal` (opcional, LÍNEA1/LÍNEA2, aparece cuando
     se dice), `cierre: seco|bucle`, `parte` (opcional), `claves` (opcional, palabras que salen
     solas y en verde en los subtítulos, separadas por comas).
   - Frases: `<ETIQUETA>: texto | img: <clave> | rotulo: <≤3 palabras>`. Etiquetas libres en
     mayúscula (L1, L2, B1-B3, P, F). La PRIMERA frase es el título dicho en voz alta.
     `img:` = clave de frames.json del largo (nombre del .jpg sin extensión) o
     `nueva: <escena>` = imagen VERTICAL nueva (máx. 2 por Short, ~0,04 € cada una, siempre
     por generate_images_gemini.generate_frame → tope de 250 € de scripts/gasto.py). Sin
     `img:`, la frase sigue con la imagen de la anterior. Etiquetas de voz v4 ([curious]…) OK.
   - Flujo: voz con ElevenLabs v4 (generate_voice.py --model eleven_v4) → whisper por palabra →
     cada frase cambia de imagen cuando empieza a decirse → ffmpeg (zoom lento) + subtítulos.
     La voz, los tiempos y las imágenes nuevas se guardan en <manifest_dir>/shorts_src/ y se
     reutilizan (YouTube y TikTok no pagan la voz dos veces; solo se regenera si cambia el texto).

2) MODO RECORTE (vídeos antiguos, sigue funcionando): una línea por Short,
       - titulo: ... | tema: CICADA 3301 | reveal: ... | desde: 0_00 | hasta: 0_51
   `desde`/`hasta` = claves de frames.json; sin `hasta` corta ≤50 s. Si trae `gancho` y no
   `tema`, el gancho se enseña como título los 2,5 primeros segundos (ya no fijo) y avisa.

Pantalla (los dos modos): fondo BLANCO (nuestras imágenes son de fondo blanco: el borde
desaparece) con la imagen como viñeta grande arriba, `tema` arriba del todo, `titulo` grande
solo mientras se dice, subtítulos karaoke de 2 palabras a ~62 % de la altura, `rotulo` por
golpe y `reveal` con pop. SIN cierre congelado de 3 s. Sin música de fondo.

Validación (avisa; con --estricto aborta): primera frase que no se parece al título o que
empieza por "Número", "Pero", "Y", "La siguiente", "Su" o un pronombre; `tema` vago o que no
comparte palabra con el título; duración fuera de 20-50 s; ritmo fuera de 2,8-3,9 palabras/s.

Uso:
    python scripts/make_shorts.py <slug>               # YouTube (shorts/)
    python scripts/make_shorts.py <slug> --tiktok      # TikTok (shorts_tiktok/), "SÍGUEME" los 2 últimos s
    python scripts/make_shorts.py <slug> --dry-run     # solo valida y enseña el plan y el gasto (no gasta nada)
    opciones: --solo N (solo el Short N) · --estricto · --sin-nuevas (no genera imágenes nuevas:
              usa la imagen del largo de la frase siguiente)
Salida: <manifest_dir>/shorts/ (o shorts_tiktok/) short_N.mp4 + shorts.json
"""
import difflib
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

# Windows console a veces usa cp1252 por defecto y no puede imprimir flechas/acentos
# (crashea DESPUÉS de cortar el short con éxito, dejando el resto de la cola sin procesar).
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO_ROOT = Path(__file__).resolve().parent.parent
FONT = REPO_ROOT / "assets" / "fonts" / "Montserrat-ExtraBold.ttf"
FONT_NAME = "Montserrat ExtraBold"  # tiene que ser el family name REAL del .ttf (name id 1/16)
BG = "white"  # antes 0x0B1220 (azul marino): las franjas delataban el recorte (playbook §1.3.8)
W, H, FPS = 1080, 1920, 30
PANEL_W, PANEL_H, PANEL_Y = 1458, 814, 300  # viñeta: imagen 16:9 a ~1,35x del ancho, recortada a 1080
MAX_DUR = 50.0            # modo recorte sin `hasta`
DUR_MIN, DUR_MAX = 20.0, 50.0
WPS_MIN, WPS_MAX = 2.8, 3.9
WPS_EST = 3.4             # ritmo real a 1,25x, para estimar en --dry-run
MAX_NUEVAS = 2
VOICE_MODEL = "eleven_v4"  # decisión del usuario 27-oct-2026: voz SIEMPRE v4
TITLE_MAX_S = 4.5
CTA_TIKTOK = "SÍGUEME PARA\\NMÁS COMO ESTE"

# Colores ASS en &HAABBGGRR.
GOLD, WHITE, BLACK, GREEN = "&H0000D4FF", "&H00FFFFFF", "&H00000000", "&H005EC522"

STOP = {"el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "y", "a", "al", "en",
        "con", "por", "para", "que", "se", "su", "sus", "es", "no", "lo", "le", "te", "tu", "mi",
        "o", "e", "ya", "mas", "muy", "como", "cuando", "este", "esta", "ese", "esa"}
# Arranques que solo se entienden dentro del largo (playbook §1.4 y §4.3).
BAD_START_1 = {"numero", "pero", "y", "su", "sus", "ahi", "aqui", "alli", "entonces", "esto", "eso",
               "aquello", "ella", "ellos", "ellas", "lo", "le", "les", "nosotros", "ademas", "tambien"}
BAD_START_2 = {("la", "siguiente"), ("el", "siguiente"), ("la", "primera"), ("el", "primero"),
               ("la", "segunda"), ("el", "segundo")}
VAGUE = {"lo", "la", "le", "les", "esto", "eso", "dentro", "aqui", "ahi", "ellos", "ellas", "el",
         "ella", "asi", "que", "quien", "como", "cuanto", "cuantos", "por", "porque", "ya", "no", "si"}


# ───────────────────────── utilidades de texto ─────────────────────────

def norm(w: str) -> str:
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9ñ]", "", w)


def strip_tags(s: str) -> str:
    """Quita las etiquetas de voz de ElevenLabs ([curious], [tense]…)."""
    return re.sub(r"\s+", " ", re.sub(r"\[[^\]]*\]", " ", s)).strip()


def toks(s: str) -> list[str]:
    return [t for t in (norm(w) for w in re.split(r"[\s/]+", strip_tags(s))) if t]


def script_words(script_md: Path) -> list[str]:
    body = script_md.read_text(encoding="utf-8").split("---", 1)[1]
    body = re.sub(r"\[[^\]]*\]", " ", body)
    return [w for w in body.split() if norm(w)]


def ass_time(t: float) -> str:
    t = max(0.0, t)
    h, m = int(t // 3600), int(t % 3600 // 60)
    return f"{h}:{m:02d}:{t % 60:05.2f}"


def ass_escape(s: str) -> str:
    return s.replace("\\", "").replace("{", "(").replace("}", ")")


def slash_lines(s: str) -> str:
    return r"\N".join(ass_escape(l.strip().upper()) for l in s.split("/") if l.strip())


def sha(s: str | bytes) -> str:
    return hashlib.sha1(s.encode("utf-8") if isinstance(s, str) else s).hexdigest()


def ffprobe_dur(p: Path) -> float:
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                          "-of", "default=nw=1:nk=1", str(p)]).decode().strip())


# ───────────────────────── seo.md ─────────────────────────

LINE_RE = re.compile(r"^([A-Z]{1,2}\d{0,2})\s*:\s*(.+)$")
FIELD_RE = re.compile(r"^-?\s*([a-záéíóúñ_]+)\s*:\s*(.*)$")


def parse_specs(seo_md: Path) -> list[dict]:
    """Specs en orden de aparición. Modo recorte: líneas `- titulo: … | desde: …`.
    Modo guion: bloques `### Short N` con campos `clave: valor` y frases `L1: texto | img: …`."""
    text = seo_md.read_text(encoding="utf-8")
    sec = re.search(r"## Shorts\s*\n(.*?)(?=\n## |\Z)", text, re.S)
    if not sec:
        sys.exit("seo.md no tiene sección '## Shorts'")
    specs, cur = [], None
    for raw in sec.group(1).splitlines():
        line = raw.strip()
        if line.startswith("###"):
            cur = {"tipo": "guion", "lineas": [], "_hdr": line.lstrip("#").strip()}
            specs.append(cur)
            continue
        if line.startswith("-") and "desde:" in line and "titulo:" in line:
            cur = None  # una línea de modo recorte cierra cualquier bloque abierto
            d = {"tipo": "recorte"}
            for part in line[1:].split("|"):
                if ":" in part:
                    k, v = part.split(":", 1)
                    d[k.strip().lower()] = v.strip()
            specs.append(d)
            continue
        if cur is None or not line:
            continue
        m = LINE_RE.match(line)
        if m:
            parts = [p.strip() for p in m.group(2).split("|")]
            ln = {"label": m.group(1), "text": parts[0]}
            for p in parts[1:]:
                if ":" in p:
                    k, v = p.split(":", 1)
                    ln[k.strip().lower()] = v.strip()
            cur["lineas"].append(ln)
            continue
        f = FIELD_RE.match(line)
        if f:
            k, v = f.group(1).lower(), f.group(2).strip()
            if k == "tipo" and v.lower() != "guion":
                sys.exit(f"seo.md, bloque «{cur['_hdr']}»: `tipo: {v}` no existe en bloques ### "
                         f"(solo `guion`; el modo recorte es una línea `- titulo: … | desde: …`)")
            cur[k] = v.lower() if k == "tipo" else v
    return specs


# ───────────────────────── validación ─────────────────────────

def first_line_warnings(first: str, titulo: str) -> list[str]:
    out = []
    plain = strip_tags(first).lstrip("¿¡\"'«— ")
    ft, tt = toks(plain), toks(re.sub(r"[()]", " ", titulo))
    if not ft:
        return ["la primera frase está vacía"]
    ratio = difflib.SequenceMatcher(None, ft, tt, autojunk=False).ratio()
    first_sentence = toks(re.split(r"(?<=[.?!])\s", plain, maxsplit=1)[0])
    ratio = max(ratio, difflib.SequenceMatcher(None, first_sentence, tt, autojunk=False).ratio())
    content = [t for t in tt if t not in STOP and len(t) >= 4]
    covered = sum(1 for t in content if t in set(ft)) / max(1, len(content))
    if ratio < 0.6 and covered < 0.6:
        out.append(f"la primera frase no se parece al título (similitud {ratio:.2f}, "
                   f"palabras del título que salen {covered:.0%}). L1 = el título dicho en voz alta.")
    if ft[0] in BAD_START_1 or tuple(ft[:2]) in BAD_START_2:
        out.append(f"la primera frase empieza por «{plain.split()[0]}»: solo se entiende dentro del "
                   f"largo. Empieza nombrando el sujeto.")
    return out


def tema_warnings(tema: str, titulo: str) -> list[str]:
    if not tema:
        return ["falta `tema:` (1-4 palabras con el nombre del sujeto, p. ej. ROBOT NEO)"]
    out = []
    words = tema.split()
    if len(words) > 4 or len(tema) > 22:
        out.append(f"`tema` demasiado largo ({len(words)} palabras, {len(tema)} caracteres; máx. 4 y 22)")
    if "?" in tema or "¿" in tema:
        out.append("`tema` no es una pregunta: es el NOMBRE del tema (estilo «OWEN HART - WWE»)")
    tt = toks(tema)
    if tt and all(t in VAGUE or t in STOP for t in tt):
        out.append(f"`tema` «{tema}» solo lleva pronombres/adverbios: no dice de qué va")
    if not {t for t in tt if len(t) >= 3} & set(toks(titulo)):
        out.append(f"`tema` «{tema}» no comparte ninguna palabra con el título")
    return out


def titulo_warnings(titulo: str) -> list[str]:
    out = []
    if len(titulo) > 60:
        out.append(f"título de {len(titulo)} caracteres (máx. 60; en móvil se corta a ~50)")
    tt = toks(titulo)
    if tt and all(t in VAGUE or t in STOP for t in tt):
        out.append("el título solo lleva pronombres/adverbios")
    return out


def duration_warnings(dur: float, nwords: int, estimada: bool = False) -> list[str]:
    out, pre = [], "≈" if estimada else ""
    if not DUR_MIN <= dur <= DUR_MAX:
        out.append(f"dura {pre}{dur:.1f} s (objetivo {DUR_MIN:.0f}-{DUR_MAX:.0f} s; ideal 30-45)")
    if not estimada and dur > 0:
        wps = nwords / dur
        if not WPS_MIN <= wps <= WPS_MAX:
            out.append(f"ritmo de {wps:.2f} palabras/s (objetivo {WPS_MIN}-{WPS_MAX})")
    return out


# ───────────────────────── subtítulos ─────────────────────────

def align_captions(frames: list[dict], swords: list[str]) -> list[list[str]]:
    """Modo recorte: para cada segmento de Whisper, las palabras del GUION que le corresponden."""
    wtoks, seg_of = [], []
    for i, f in enumerate(frames):
        for w in f["text"].split():
            if norm(w):
                wtoks.append(norm(w))
                seg_of.append(i)
    stoks = [norm(w) for w in swords]
    w2s = [None] * len(wtoks)
    sm = difflib.SequenceMatcher(None, wtoks, stoks, autojunk=False)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag in ("equal", "replace"):
            for k in range(i1, i2):
                w2s[k] = j1 + (k - i1) * (j2 - j1) // max(1, i2 - i1)
    last = 0
    for k in range(len(w2s)):
        if w2s[k] is None:
            w2s[k] = last
        last = w2s[k]
    first_tok = {}
    for k, s in enumerate(seg_of):
        first_tok.setdefault(s, k)
    bounds = [w2s[first_tok[i]] if i in first_tok else None for i in range(len(frames))]
    for i in range(len(bounds)):
        if bounds[i] is None:
            bounds[i] = bounds[i - 1] if i else 0
    bounds.append(len(swords))
    out = []
    for i in range(len(frames)):
        a, b = bounds[i], max(bounds[i], bounds[i + 1])
        out.append(swords[a:b] or frames[i]["text"].split())
    return out


def align_words(script: list[str], whisper: list[dict]) -> list[tuple[float, float]]:
    """Modo guion: (inicio, fin) de cada palabra del GUION a partir de las palabras de whisper.
    Los subtítulos usan el texto del guion (sin errores tipo "Wannex"), con los tiempos reales.
    Las cifras (guion "veinte mil" frente a whisper "20.000") caen en bloques `replace` y se
    reparten por longitud; las que whisper no oyó se interpolan entre sus vecinas."""
    wt = [norm(w["word"]) for w in whisper]
    st = [norm(w) for w in script]
    times: list[tuple[float, float] | None] = [None] * len(script)
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, wt, st, autojunk=False).get_opcodes():
        if tag == "equal":
            for k in range(j2 - j1):
                w = whisper[i1 + k]
                times[j1 + k] = (w["start"], w["end"])
        elif tag == "replace":
            a, b = whisper[i1]["start"], whisper[i2 - 1]["end"]
            lens = [max(1, len(st[j])) for j in range(j1, j2)]
            tot, acc = sum(lens), 0
            for k, j in enumerate(range(j1, j2)):
                t0 = a + (b - a) * acc / tot
                acc += lens[k]
                times[j] = (t0, a + (b - a) * acc / tot)
    # huecos (`insert`): interpolar entre la palabra anterior y la siguiente con tiempo
    n = len(times)
    i = 0
    while i < n:
        if times[i] is not None:
            i += 1
            continue
        j = i
        while j < n and times[j] is None:
            j += 1
        a = times[i - 1][1] if i else 0.0
        b = times[j][0] if j < n else (whisper[-1]["end"] if whisper else a + 0.3 * (j - i))
        step = max(0.05, (b - a) / (j - i))
        for k in range(i, j):
            times[k] = (a + step * (k - i), a + step * (k - i + 1))
        i = j
    return times  # type: ignore[return-value]


def karaoke_tags(words: list[str], dur: float, durs: list[float] | None = None) -> str:
    """Texto ASS karaoke: cada palabra lleva `\\k<centisegundos>` y libass la pasa de blanco
    (SecondaryColour, "aún no dicha") a dorado (PrimaryColour, "ya dicha") cuando le toca.
    Con `durs` (tiempos reales de whisper) el paso es exacto; sin ellos, proporcional a la
    longitud de cada palabra."""
    words = [w for w in words if w]
    if not words:
        return ""
    if durs is None:
        wtotal = sum(len(w) for w in words) or 1
        durs = [dur * len(w) / wtotal for w in words]
    return " ".join(f"{{\\k{max(1, round(100 * d))}}}{ass_escape(w.upper())}" for w, d in zip(words, durs))


def chunk_caption(words: list[str], t0: float, t1: float,
                  per: int = 2) -> list[tuple[float, float, str, str]]:
    """Modo recorte: (inicio, fin, TEXTO_PLANO, TEXTO_KARAOKE) por grupo de `per` palabras,
    con el tiempo repartido por longitud (no hay tiempos por palabra del tramo del largo)."""
    groups = [words[i:i + per] for i in range(0, len(words), per)] or [[]]
    total = sum(len(" ".join(g)) for g in groups) or 1
    out, t = [], t0
    for g in groups:
        d = (t1 - t0) * len(" ".join(g)) / total
        out.append((t, t + d, " ".join(g), karaoke_tags(g, d)))
        t += d
    return out


def word_captions(words: list[str], times: list[tuple[float, float]], tema_keys: set[str],
                  claves: set[str] = frozenset(), per: int = 2) -> list[tuple[float, float, str, str]]:
    """Modo guion: bloques de `per` palabras con tiempos reales. No cruzan un punto final, y las
    palabras clave van SOLAS y en verde (lo que hacen CdeCiencia y Homosapiens con el sujeto y la
    cifra): las del `tema` cuando el guion las escribe con mayúscula (nombre propio: "NEO",
    "TikTok"; "robot" en minúscula no), las `claves:` siempre, y las cifras en dígitos."""
    def is_key(w: str) -> bool:
        nw = norm(w)
        cap = w.lstrip("¿¡\"'«(")[:1].isupper()
        return bool(re.search(r"\d", w)) or nw in claves or (nw in tema_keys and cap)

    groups: list[list[int]] = []
    cur: list[int] = []
    for i, w in enumerate(words):
        if is_key(w):
            if cur:
                groups.append(cur)
            groups.append([i])
            cur = []
            continue
        cur.append(i)
        if len(cur) >= per or re.search(r"[.?!…:]$", w):
            groups.append(cur)
            cur = []
    if cur:
        groups.append(cur)
    out = []
    for gi, g in enumerate(groups):
        a = times[g[0]][0]
        last_end = times[g[-1]][1]
        nxt = times[groups[gi + 1][0]][0] if gi + 1 < len(groups) else last_end + 0.3
        b = nxt if nxt - last_end < 0.6 else last_end + 0.25
        ws = [words[i] for i in g]
        plain = " ".join(ws)
        if len(g) == 1 and is_key(ws[0]):
            text = f"{{\\1c{GREEN}&\\2c{GREEN}&}}{ass_escape(ws[0].upper())}"
        else:
            starts = [times[i][0] for i in g] + [b]
            text = karaoke_tags(ws, b - a, [starts[k + 1] - starts[k] for k in range(len(g))])
        out.append((a, b, plain, text))
    return out


def norm_digits(s: str) -> str:
    return re.sub(r"[^0-9]", "", s)


def find_reveal_start(reveal: str, caps: list[tuple[float, float, str, str]]) -> float | None:
    """Momento en el que el REMATE se dice de verdad en el audio.

    Los subtítulos salen del GUION, y el guion suele escribir las cifras con letras para que
    ElevenLabs las lea bien ("setenta y un mil", no "71.000"). Por eso primero se prueba por si
    el guion SÍ usa dígitos, y si no, se cae a las palabras sin cifras del remate ("EUROS",
    "AL", "AÑO"), que sirven de ancla aunque el número se diga con letras. None si no aparece."""
    digits = norm_digits(reveal)
    if digits:
        for a, b, t, _k in caps:
            if digits in norm_digits(t):
                return a
    tk = {norm(w) for w in re.split(r"[/\s]+", reveal) if norm(w)}
    if not tk:
        return None
    anchors = {w for w in tk if not w.isdigit()}
    for want in (anchors, tk) if anchors and anchors != tk else (tk,):
        if not want:
            continue
        # Un remate de varias palabras queda partido entre bloques seguidos (de 2 palabras desde
        # oct-2026): se busca en cada bloque junto con los 3 siguientes, y entra con el primero.
        for i, (a, _b, t, _k) in enumerate(caps):
            here = {norm(w) for w in t.split()}
            win = set(here)
            for c in caps[i + 1:i + 4]:
                win |= {norm(w) for w in c[2].split()}
            if want & here and want <= win:
                return a
    return None


# ───────────────────────── .ass ─────────────────────────

def ass_header() -> list[str]:
    st = ("Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, "
          "Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, "
          "Shadow, Alignment, MarginL, MarginR, MarginV, Encoding")
    return [
        "[Script Info]", "ScriptType: v4.00+", f"PlayResX: {W}", f"PlayResY: {H}", "WrapStyle: 0", "",
        "[V4+ Styles]", st,
        # Tema: etiqueta del sujeto arriba del todo, todo el Short (sustituye al `gancho` fijo).
        # BorderStyle 3 = caja opaca (dorada) con texto negro, estilo "OWEN HART - WWE".
        f"Style: Tema,{FONT_NAME},58,{BLACK},{BLACK},{GOLD},{GOLD},0,0,0,0,100,100,2,0,3,16,0,8,60,60,60,1",
        # Titulo: grande, negro con contorno blanco (se lee sobre el blanco y sobre el dibujo),
        # SOLO mientras se dice (0 → fin de L1, o 2,5 s en modo recorte). Tamaño por \fs.
        f"Style: Titulo,{FONT_NAME},84,&H00101010,&H00101010,{WHITE},{BLACK},0,0,0,0,100,100,0,0,1,8,0,8,50,50,170,1",
        # Cap: karaoke (dorado = ya dicho, blanco = por decir), contorno negro, ~62 % de la altura.
        f"Style: Cap,{FONT_NAME},110,{GOLD},{WHITE},{BLACK},{BLACK},0,0,0,0,100,100,1,0,1,7,3,2,50,50,680,1",
        # Rotulo: cambia en cada golpe ("20.000 $", "SCROLL INFINITO"), verde, bajo los subtítulos.
        f"Style: Rotulo,{FONT_NAME},92,{GREEN},{GREEN},{BLACK},{BLACK},0,0,0,0,100,100,1,0,1,6,2,2,50,50,500,1",
        # Reveal: el remate aparece con un pop SOLO cuando se dice (ver "gancho vs remate").
        f"Style: Reveal,{FONT_NAME},110,{GOLD},{WHITE},{BLACK},{BLACK},0,0,0,0,100,100,1,0,1,8,4,8,50,50,170,1",
        f"Style: Parte,{FONT_NAME},44,{WHITE},{WHITE},{BLACK},{BLACK},0,0,0,0,100,100,1,0,1,5,0,7,30,30,150,1",
        f"Style: Cta,{FONT_NAME},86,{GOLD},{WHITE},{BLACK},{BLACK},0,0,0,0,100,100,1,0,1,7,3,5,60,60,0,1",
        "", "[Events]",
        "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    ]


def title_fs(titulo: str) -> int:
    """Que el título quepa en 2 líneas: ~0,56·fs px por carácter, 2 líneas de ~960 px."""
    return max(56, min(90, int(1900 / (0.56 * max(1, len(titulo))))))


def build_ass(path: Path, dur: float, caps: list[tuple[float, float, str, str]], *, tema: str = "",
              titulo_txt: str = "", titulo_end: float = 2.5, reveal: str = "",
              reveal_t0: float | None = None, parte: str = "",
              rotulos: list[tuple[float, float, str]] = (), cta: str = "") -> None:
    ev = []

    def add(layer, a, b, style, text):
        if text and b - a > 0.05:
            ev.append(f"Dialogue: {layer},{ass_time(a)},{ass_time(min(b, dur))},{style},,0,0,0,,{text}")

    if tema:
        add(2, 0, dur, "Tema", ass_escape(tema.upper()))
    if titulo_txt:
        end = min(titulo_end, reveal_t0) if reveal_t0 is not None else titulo_end
        add(1, 0, end, "Titulo", f"{{\\fs{title_fs(titulo_txt)}\\fad(0,150)}}{ass_escape(titulo_txt)}")
    if reveal:
        rt0 = reveal_t0 if reveal_t0 is not None else max(0.0, dur - 2.5)
        add(1, rt0, dur, "Reveal", f"{{\\fad(180,0)\\t(0,180,\\fscx115\\fscy115)\\t(180,320,\\fscx100\\fscy100)}}"
                                   f"{slash_lines(reveal)}")
    if parte:
        add(2, 0, dur, "Parte", f"PARTE {ass_escape(parte.upper())}")
    for a, b, txt in rotulos:
        add(1, a, b, "Rotulo", f"{{\\fad(120,0)}}{ass_escape(txt.upper())}")
    for a, b, _plain, ktext in caps:
        add(0, a, b, "Cap", ktext)
    if cta:
        add(3, max(0.0, dur - 2.0), dur, "Cta", cta)
    path.write_text("\n".join(ass_header() + ev) + "\n", encoding="utf-8-sig")


# ───────────────────────── modo guion ─────────────────────────

def is_nueva(img: str) -> bool:
    return bool(re.match(r"^nuev[ao]\s*:", img or "", re.I))


def nueva_prompt(img: str) -> str:
    return re.sub(r"^nuev[ao]\s*:\s*", "", img, flags=re.I).strip()


def vertical_prompt(frames_data: dict, prompt: str) -> str:
    """Prompt de la imagen vertical: la escena del seo.md + la descripción del personaje, la regla
    de no inventar texto y el bloque STYLE que ya usan las escenas del largo (así basta con
    escribir la escena en seo.md). Ni "16:9" ni "9:16" en el texto: el modelo los dibuja
    (gotcha jul-2026); la proporción va por parámetro."""
    scenes = [f.get("scene", "") for f in frames_data.get("frames", [])]

    def first(pat):
        for s in scenes:
            m = re.search(pat, s, re.S)
            if m:
                return m.group(0).strip()
        return ""

    parts = [frames_data.get("style_base", "")]
    if "main character" not in prompt.lower():
        parts.append(first(r"The main character is .*?reference image\."))
    parts.append("Tall vertical portrait composition, the scene fills the whole frame from top to "
                 "bottom, the subject large and centered, readable at a glance on a phone: " + prompt)
    if "no invented text" not in prompt.lower():
        parts.append(first(r"No invented text.*?anywhere in the frame\."))
    if "STYLE" not in prompt:
        parts.append(first(r"STYLE \(applies to the whole image\):.*$"))
    txt = " ".join(p for p in parts if p)
    return re.sub(r"\b(16:9|9:16)\b\.?", "", txt).strip()


def plan_guion(spec: dict, n: int, cfg: dict, mdir: Path, frames_data: dict, sin_nuevas: bool):
    """Valida el bloque y resuelve la imagen de cada frase. Devuelve (plan, warnings, errores)."""
    warns, errs = [], []
    lineas = spec.get("lineas", [])
    titulo = spec.get("titulo", "").strip()
    if not titulo:
        errs.append("falta `titulo:`")
    if not lineas:
        errs.append("no tiene frases (L1: …, L2: …)")
        return None, warns, errs
    if spec.get("gancho"):
        warns.append("`gancho` se ignora en modo guion (ya no hay texto fijo arriba): usa `tema`")
    warns += titulo_warnings(titulo)
    warns += first_line_warnings(lineas[0]["text"], titulo)
    warns += tema_warnings(spec.get("tema", ""), titulo)
    if spec.get("cierre", "seco") not in ("seco", "bucle"):
        warns.append(f"`cierre: {spec['cierre']}` no existe (seco|bucle); uso seco")
    last = re.sub(r"\[[^\]]*\]", "", lineas[-1]["text"]).lower()
    if "vídeo completo" in last or "video completo" in last:
        warns.append("la última frase manda al vídeo completo: 0/17 ganadores lo hacen (playbook §2.7)")

    img_dir = REPO_ROOT / "remotion" / "public" / cfg["images_subpath"]
    ext = cfg.get("ext", "jpg")
    keys = {f["file"].rsplit(".", 1)[0] for f in frames_data.get("frames", [])}
    nuevas = [ln for ln in lineas if is_nueva(ln.get("img", ""))]
    if len(nuevas) > MAX_NUEVAS:
        errs.append(f"{len(nuevas)} imágenes nuevas (máx. {MAX_NUEVAS} por Short)")
    plan, prev = [], None
    for i, ln in enumerate(lineas):
        img = ln.get("img", "").strip()
        item = {"label": ln["label"], "text": ln["text"], "rotulo": ln.get("rotulo", "")}
        if is_nueva(img):
            prompt = nueva_prompt(img)
            if sin_nuevas:
                nxt = next((l.get("img") for l in lineas[i + 1:] if l.get("img") and not is_nueva(l["img"])), None)
                img = nxt or prev
                if not img:
                    errs.append(f"{ln['label']}: --sin-nuevas y no hay imagen del largo para sustituirla")
                    continue
                warns.append(f"{ln['label']}: --sin-nuevas → uso {img} en vez de la imagen vertical nueva")
            else:
                item.update(kind="nueva", prompt=prompt,
                            path=mdir / "shorts_src" / f"short_{n}_nueva_{sha(prompt)[:8]}.jpg")
        if not item.get("kind"):
            if not img:
                img = prev
            if not img:
                errs.append(f"{ln['label']}: la primera frase necesita `img:`")
                continue
            if img not in keys:
                errs.append(f"{ln['label']}: `img: {img}` no es una clave de frames.json")
            item.update(kind="largo", key=img, path=img_dir / f"{img}.{ext}")
        prev = item.get("key", prev) if item["kind"] == "largo" else prev
        item["img_id"] = item.get("key") or str(item["path"])
        plan.append(item)
    nwords = sum(len(strip_tags(ln["text"]).split()) for ln in lineas)
    warns += duration_warnings(nwords / WPS_EST, nwords, estimada=True)
    return plan, warns, errs


def ensure_voice(n: int, lineas: list[dict], src: Path, dry: bool) -> Path | None:
    """Voz del Short con ElevenLabs v4, cacheada por el texto: si no cambia, no se paga otra vez."""
    text = "\n".join(ln["text"] for ln in lineas)
    mp3, meta = src / f"short_{n}.mp3", src / f"short_{n}.src.json"
    h = sha(text + "|" + VOICE_MODEL)
    if mp3.exists() and meta.exists() and json.loads(meta.read_text(encoding="utf-8")).get("hash") == h:
        print(f"  voz: reutilizo {mp3.relative_to(REPO_ROOT)}")
        return mp3
    if dry:
        print(f"  voz: se generaría con ElevenLabs {VOICE_MODEL} ({len(strip_tags(text))} caracteres)")
        return None
    src.mkdir(parents=True, exist_ok=True)
    txt = src / f"short_{n}.txt"
    txt.write_text(text + "\n", encoding="utf-8")
    r = subprocess.run([sys.executable, str(REPO_ROOT / "scripts" / "generate_voice.py"), str(txt),
                        "--out", str(mp3), "--model", VOICE_MODEL])
    if r.returncode != 0 or not mp3.exists():
        sys.exit(f"short_{n}: falló la voz de ElevenLabs")
    meta.write_text(json.dumps({"hash": h, "model": VOICE_MODEL}, indent=2) + "\n", encoding="utf-8")
    return mp3


def ensure_words(mp3: Path) -> list[dict]:
    """Palabras de whisper del audio del Short, cacheadas por el contenido del mp3."""
    cache = mp3.with_suffix(".words.json")
    h = sha(mp3.read_bytes())
    if cache.exists():
        d = json.loads(cache.read_text(encoding="utf-8"))
        if d.get("audio_sha") == h:
            return d["words"]
    from whisper_timestamps import extract_words
    words = extract_words(str(mp3))
    cache.write_text(json.dumps({"audio_sha": h, "words": words}, ensure_ascii=False, indent=1),
                     encoding="utf-8")
    return words


def ensure_nuevas(plan: list[dict], cfg: dict, frames_data: dict) -> None:
    """Imágenes verticales nuevas SIEMPRE por generate_frame (gasto.comprobar → tope de 250 €)."""
    todo = [it for it in plan if it["kind"] == "nueva" and not it["path"].exists()]
    if not todo:
        return
    import config
    import gasto
    from generate_images_gemini import generate_frame, load_reference_parts, pick_model
    from google import genai
    model, location = pick_model(cfg)
    print(f"  imágenes nuevas: {len(todo)} × ~{gasto.PRECIO_EUR[gasto._tipo(model)]:.2f} € ({model}). "
          f"{gasto.resumen()}")
    client = genai.Client(vertexai=True, project=config.GEMINI_VERTEX_PROJECT, location=location)
    ref = load_reference_parts(cfg.get("ref_image")).get("mono")
    for it in todo:
        ok = generate_frame(client, model, vertical_prompt(frames_data, it["prompt"]), it["path"],
                            ref_part=ref, aspect_ratio="9:16")
        if not ok:
            sys.exit(f"No se pudo generar {it['path'].name}")
    print(f"  {gasto.resumen()}")


def render_guion(spec: dict, n: int, plan: list[dict], cfg: dict, mp3: Path, words_w: list[dict],
                 out: Path, tiktok: bool) -> dict:
    rate = cfg.get("playback_rate", 1.0)
    lineas = spec["lineas"]
    swords, line_of = [], []
    for li, ln in enumerate(lineas):
        for w in strip_tags(ln["text"]).split():
            if norm(w):
                swords.append(w)
                line_of.append(li)
    times = [(a / rate, b / rate) for a, b in align_words(swords, words_w)]
    line_start = []
    for li in range(len(lineas)):
        idx = line_of.index(li) if li in line_of else None
        line_start.append(0.0 if li == 0 else (times[idx][0] if idx is not None else line_start[-1]))
    cierre = spec.get("cierre", "seco")
    tail, fade = (0.12, 0.15) if cierre == "bucle" else (0.6, 0.35)
    dur = min(times[-1][1] + tail, ffprobe_dur(mp3) / rate + tail)

    tema = spec.get("tema", "")
    tema_keys = {t for t in toks(tema) if len(t) >= 2}
    claves = {t for k in spec.get("claves", "").split(",") for t in toks(k)}
    caps = word_captions(swords, times, tema_keys, claves)
    reveal = spec.get("reveal", "")
    reveal_t0 = None
    warns = duration_warnings(dur, len(swords))
    if reveal:
        p_idx = next((i for i, ln in enumerate(lineas) if ln["label"] == "P"), None)
        p_t = line_start[p_idx] - 0.05 if p_idx is not None else 0.0
        reveal_t0 = find_reveal_start(reveal, [c for c in caps if c[0] >= p_t]) \
            or find_reveal_start(reveal, caps)
        if reveal_t0 is None:
            warns.append(f"no encontré «{reveal}» en lo que se dice: el remate sale 2,5 s antes del final")
    titulo_end = min(TITLE_MAX_S, line_start[1] if len(lineas) > 1 else 3.0)
    ends = line_start[1:] + [dur]
    rotulos = [(line_start[i], ends[i], ln["rotulo"]) for i, ln in enumerate(lineas) if ln.get("rotulo")]

    # Segmentos de imagen: la imagen cambia cuando empieza la frase; frases seguidas con la
    # misma imagen se funden en un solo plano (el zoom no salta).
    segs: list[dict] = []
    for i, it in enumerate(plan):
        if segs and segs[-1]["img_id"] == it["img_id"]:
            segs[-1]["t1"] = ends[i]
        else:
            segs.append({"img_id": it["img_id"], "path": it["path"], "kind": it["kind"],
                         "t0": line_start[i], "t1": ends[i]})
    segs[0]["t0"], segs[-1]["t1"] = 0.0, dur
    bounds = [round(s["t0"] * FPS) for s in segs] + [round(dur * FPS)]

    with tempfile.TemporaryDirectory() as td:
        tdp = Path(td)
        shutil.copy(FONT, tdp / FONT.name)
        build_ass(tdp / "s.ass", dur, caps, tema=tema, titulo_txt=spec["titulo"], titulo_end=titulo_end,
                  reveal=reveal, reveal_t0=reveal_t0, parte=spec.get("parte", ""), rotulos=rotulos,
                  cta=CTA_TIKTOK if tiktok else "")
        inputs, fc = [], []
        for k, s in enumerate(segs):
            nf = max(1, bounds[k + 1] - bounds[k])
            inputs += ["-loop", "1", "-framerate", str(FPS), "-t", f"{nf / FPS + 0.2:.3f}", "-i", str(s["path"])]
            # zoom lento del 4 %, alternando acercar/alejar para que cada corte se note vivo
            z = f"1+0.04*on/{nf}" if k % 2 == 0 else f"1.04-0.04*on/{nf}"
            zp = f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:fps={FPS}"
            if s["kind"] == "nueva":  # vertical a pantalla completa (es la "miniatura" del feed)
                chain = f"scale={2 * W}:{2 * H},{zp}:s={W}x{H}"
            else:                     # viñeta grande del largo sobre blanco
                chain = (f"scale={2 * PANEL_W}:{2 * PANEL_H},{zp}:s={PANEL_W}x{PANEL_H},"
                         f"crop={W}:{PANEL_H},pad={W}:{H}:0:{PANEL_Y}:color={BG}")
            fc.append(f"[{k}:v]{chain},trim=end_frame={nf},setsar=1,format=yuv420p[v{k}]")
        na = len(segs)
        inputs += ["-i", str(mp3)]
        fc.append("".join(f"[v{k}]" for k in range(na)) + f"concat=n={na}:v=1:a=0[vc]")
        fc.append("[vc]ass=s.ass:fontsdir=.[v]")
        tempo = f"atempo={rate}," if abs(rate - 1.0) > 1e-3 else ""
        fc.append(f"[{na}:a]{tempo}apad,atrim=0:{dur:.3f},afade=t=out:st={dur - fade:.3f}:d={fade}[a]")
        cmd = ["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", ";".join(fc),
               "-map", "[v]", "-map", "[a]", "-t", f"{dur:.3f}", "-r", str(FPS),
               "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
               "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", str(out)]
        r = subprocess.run(cmd, cwd=td, capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit(f"ffmpeg falló en {out.name}:\n{r.stderr[-2000:]}")
    return {"dur": dur, "warns": warns, "nwords": len(swords),
            "primera_frase": strip_tags(lineas[0]["text"])}


# ───────────────────────── modo recorte ─────────────────────────

def render_recorte(spec: dict, n: int, ctx: dict, out: Path, tiktok: bool, dry: bool) -> dict | None:
    frames, starts, ends, key_idx = ctx["frames"], ctx["starts"], ctx["ends"], ctx["key_idx"]
    if spec["desde"] not in key_idx or (spec.get("hasta") and spec["hasta"] not in key_idx):
        print(f"  ⚠️  short_{n}: `desde`/`hasta` no son claves de frames.json "
              f"({spec.get('desde')}/{spec.get('hasta')}); lo salto")
        return None
    i0 = key_idx[spec["desde"]]
    if spec.get("hasta"):
        i1 = key_idx[spec["hasta"]]
    else:
        i1 = i0
        while i1 + 1 < len(frames) and ends[i1 + 1] - starts[i0] <= MAX_DUR:
            i1 += 1
    t0, t1 = starts[i0], ends[i1]
    dur = t1 - t0
    caps = []
    for i in range(i0, i1 + 1):
        caps += chunk_caption(ctx["caps_words"][i], starts[i] - t0, min(ends[i], t0 + dur) - t0)

    titulo = spec["titulo"]
    tema = spec.get("tema", "")
    gancho = spec.get("gancho", "")
    reveal = spec.get("reveal", "")
    warns = titulo_warnings(titulo) + first_line_warnings(" ".join(ctx["caps_words"][i0]), titulo)
    if tema:
        warns += tema_warnings(tema, titulo)
        titulo_txt = titulo
    else:
        warns.append("sin `tema`: el `gancho` se enseña como título 2,5 s (ya no fijo). Añade `tema:`")
        titulo_txt = gancho.replace("/", " ") if gancho else titulo
    warns += duration_warnings(dur, sum(len(c[2].split()) for c in caps))
    if not reveal and re.search(r"\d", gancho or ""):
        warns.append(f"el gancho lleva una cifra («{gancho}»): si es el remate, muévelo a `reveal:`")
    reveal_t0 = None
    if reveal:
        reveal_t0 = find_reveal_start(reveal, caps)
        if reveal_t0 is None:
            warns.append(f"no encontré «{reveal}» en los subtítulos del tramo; sale 2,5 s antes del final")
    res = {"dur": dur, "t0": t0, "warns": warns, "primera_frase": " ".join(ctx["caps_words"][i0]),
           "gancho": gancho or titulo}
    if dry:
        return res
    fade = 0.2 if spec.get("cierre") == "bucle" else 0.4
    with tempfile.TemporaryDirectory() as td:
        tdp = Path(td)
        shutil.copy(FONT, tdp / FONT.name)
        build_ass(tdp / "s.ass", dur, caps, tema=tema, titulo_txt=titulo_txt, titulo_end=2.5,
                  reveal=reveal, reveal_t0=reveal_t0, parte=spec.get("parte", ""),
                  cta=CTA_TIKTOK if tiktok else "")
        fc = (f"[0:v]scale={PANEL_W}:-2,crop={W}:ih,pad={W}:{H}:0:{PANEL_Y}:color={BG},setsar=1,"
              f"ass=s.ass:fontsdir=.[v];"
              f"[0:a]afade=t=out:st={max(0.0, dur - fade):.2f}:d={fade}[a]")
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{t0:.2f}", "-t", f"{dur:.2f}", "-i", str(ctx["mp4"]),
               "-filter_complex", fc, "-map", "[v]", "-map", "[a]", "-t", f"{dur:.2f}",
               "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
               "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", str(out)]
        r = subprocess.run(cmd, cwd=td, capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit(f"ffmpeg falló en {out.name}:\n{r.stderr[-2000:]}")
    return res


def recorte_ctx(slug: str, cfg: dict, mdir: Path, frames: list[dict], need_mp4: bool) -> dict:
    rate = cfg.get("playback_rate", 1.0)
    mp4 = REPO_ROOT / "remotion" / "output" / f"{slug}.mp4"
    if need_mp4 and not mp4.exists():
        sys.exit(f"No existe el render {mp4} (lo necesita el modo recorte)")
    starts = [f["startSec"] / rate for f in frames]
    vdur = ffprobe_dur(mp4) if mp4.exists() else starts[-1] + 5.0
    return {"mp4": mp4, "frames": frames, "starts": starts, "ends": starts[1:] + [vdur],
            "key_idx": {f["file"].rsplit(".", 1)[0]: i for i, f in enumerate(frames)},
            "caps_words": align_captions(frames, script_words(mdir / "script.md"))}


# ───────────────────────── main ─────────────────────────

def print_warns(n: int, warns: list[str]) -> None:
    for w in warns:
        print(f"  ⚠️  short_{n}: {w}")


def main() -> None:
    args = sys.argv[1:]
    if not args or args[0].startswith("-"):
        sys.exit(__doc__)
    slug = args[0]
    tiktok, dry = "--tiktok" in args, "--dry-run" in args
    estricto, sin_nuevas = "--estricto" in args, "--sin-nuevas" in args
    solo = int(args[args.index("--solo") + 1]) if "--solo" in args else None
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    cfg = vids[slug]
    mdir = REPO_ROOT / cfg["manifest_dir"]
    frames_data = json.loads((mdir / "frames.json").read_text(encoding="utf-8"))
    frames = frames_data["frames"]
    specs = parse_specs(mdir / "seo.md")
    if not specs:
        sys.exit("La sección '## Shorts' no tiene ningún Short (ni bloques ### ni líneas con desde:)")
    ctx = None
    if any(s["tipo"] == "recorte" for s in specs):
        ctx = recorte_ctx(slug, cfg, mdir, frames, need_mp4=not dry)

    outdir = mdir / ("shorts_tiktok" if tiktok else "shorts")
    manifest_path = outdir / "shorts.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {"shorts": []}
    done = {s["file"]: s for s in manifest["shorts"]}
    if not dry:
        outdir.mkdir(exist_ok=True)
    total_nuevas = 0

    for n, spec in enumerate(specs, 1):
        if solo is not None and n != solo:
            continue
        fname = f"short_{n}.mp4"
        print(f"── short_{n} [{spec['tipo']}] «{spec.get('titulo', '')}»")
        if spec["tipo"] == "guion":
            plan, warns, errs = plan_guion(spec, n, cfg, mdir, frames_data, sin_nuevas)
            print_warns(n, warns)
            for e in errs:
                print(f"  ✗ short_{n}: {e}")
            if plan:
                for it in plan:
                    where = (f"img {it['key']}" if it["kind"] == "largo" else "img NUEVA vertical")
                    ok = "✓" if it["path"].exists() else ("(se generará)" if it["kind"] == "nueva" else "✗ FALTA")
                    rot = f"  [rótulo: {it['rotulo']}]" if it["rotulo"] else ""
                    print(f"    {it['label']:<3} {where:<20} {ok:<14} {strip_tags(it['text'])[:70]}{rot}")
                missing = [it for it in plan if it["kind"] == "largo" and not it["path"].exists()]
                nuevas = [it for it in plan if it["kind"] == "nueva" and not it["path"].exists()]
                total_nuevas += len(nuevas)
                nw = sum(len(strip_tags(it["text"]).split()) for it in plan)
                print(f"    ≈ {nw} palabras → ≈ {nw / WPS_EST:.0f} s a {WPS_EST} palabras/s (ideal 30-45 s)")
                if missing:
                    faltan = sorted({it["key"] for it in missing})
                    errs.append(f"faltan {len(faltan)} imágenes del largo en "
                                f"remotion/public/{cfg['images_subpath']}/: {', '.join(faltan)}")
                    print(f"  ✗ short_{n}: {errs[-1]}")
            if dry:
                if plan:
                    ensure_voice(n, spec["lineas"], mdir / "shorts_src", dry=True)
                continue
            if errs or (estricto and warns):
                sys.exit(f"short_{n}: corrige lo anterior antes de gastar voz/imágenes"
                         + (" (--estricto)" if estricto and not errs else ""))
            ensure_nuevas(plan, cfg, frames_data)
            mp3 = ensure_voice(n, spec["lineas"], mdir / "shorts_src", dry=False)
            words_w = ensure_words(mp3)
            res = render_guion(spec, n, plan, cfg, mp3, words_w, outdir / fname, tiktok)
            print_warns(n, res["warns"])
            if estricto and res["warns"]:
                print(f"  ✗ --estricto: short_{n} queda renderizado pero NO entra en shorts.json")
                continue
            fresh = {"file": fname, "tipo": "guion", "titulo": spec["titulo"], "tema": spec.get("tema", ""),
                     "gancho": spec.get("tema", ""), "reveal": spec.get("reveal", ""),
                     "parte": spec.get("parte", ""), "cierre": spec.get("cierre", "seco"),
                     "primera_frase": res["primera_frase"], "desde": "", "t0": 0.0, "dur": round(res["dur"], 2)}
        else:
            res = render_recorte(spec, n, ctx, outdir / fname, tiktok, dry)
            if res is None:
                continue
            print_warns(n, res["warns"])
            print(f"    {spec['desde']} → {spec.get('hasta') or 'auto'}  {res['t0']:.1f}s +{res['dur']:.1f}s  "
                  f"primera frase: «{res['primera_frase'][:70]}»")
            if dry:
                continue
            if estricto and res["warns"]:
                print(f"  ✗ --estricto: short_{n} queda renderizado pero NO entra en shorts.json")
                continue
            fresh = {"file": fname, "tipo": "recorte", "titulo": spec["titulo"], "tema": spec.get("tema", ""),
                     "gancho": res["gancho"], "reveal": spec.get("reveal", ""), "parte": spec.get("parte", ""),
                     "cierre": spec.get("cierre", "seco"), "primera_frase": res["primera_frase"],
                     "desde": spec["desde"], "t0": round(res["t0"], 2), "dur": round(res["dur"], 2)}
        # Conserva TODO lo que ya había (youtube_id, publish_at, tiktok_*…): publish_shorts.py y
        # tiktok_api.py escriben ahí y no se puede perder al volver a cortar.
        done[fname] = {**done.get(fname, {}), **fresh}
        for k in ("youtube_id", "publish_at", "tiktok_publish_id", "tiktok_posted_at"):
            done[fname].setdefault(k, None)
        print(f"OK {fname}  {res['dur']:.1f}s  «{spec['titulo']}»")

    if dry:
        if total_nuevas:
            print(f"\n(dry-run) imágenes verticales nuevas a generar: {total_nuevas} (~{0.04 * total_nuevas:.2f} €; "
                  f"modelo según image_model={cfg.get('image_model', 'flash')})")
        print("(dry-run) no se ha generado ni escrito nada.")
        return
    manifest["shorts"] = sorted(done.values(), key=lambda s: s["file"])
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
