#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Corta Shorts verticales (1080x1920, <=59 s) a partir del vídeo largo ya renderizado.

Diseño: fondo oscuro de marca, el vídeo 16:9 centrado, GANCHO grande arriba (fijo todo
el Short) y subtítulos quemados abajo en bloques de 3-4 palabras. Los subtítulos usan el
texto del GUION (script.md) alineado con los tiempos de Whisper, así no salen errores de
transcripción ("Opinaya" en vez de "OpenAI"). Los últimos 3 s muestran el CTA al vídeo
completo.

Qué cortar se define en seo.md, sección "## Shorts" (una línea por Short):
    - titulo: <título del Short, <=60 chars> | gancho: <TEXTO ARRIBA> | desde: 0_00 | hasta: 0_51
  `desde`/`hasta` son claves de frame (nombre del .jpg sin extensión) de frames.json.
  `hasta` es opcional: si falta, se corta en el último frame que quepa en 58 s.

Uso:
    python scripts/make_shorts.py <slug>
Salida: <manifest_dir>/shorts/short_N.mp4 + <manifest_dir>/shorts/shorts.json
"""
import difflib
import json
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
MAX_DUR = 58.5
FONT = Path(r"C:\Windows\Fonts\impact.ttf")
BG = "0x0B1220"


def norm(w: str) -> str:
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9ñ]", "", w)


def script_words(script_md: Path) -> list[str]:
    body = script_md.read_text(encoding="utf-8").split("---", 1)[1]
    body = re.sub(r"\[[^\]]*\]", " ", body)
    return [w for w in body.split() if norm(w)]


def align_captions(frames: list[dict], swords: list[str]) -> list[list[str]]:
    """Para cada segmento de Whisper, las palabras del GUION que le corresponden."""
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
    # rellenar huecos (delete) con el último índice conocido
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


def ass_time(t: float) -> str:
    t = max(0.0, t)
    h, m = int(t // 3600), int(t % 3600 // 60)
    return f"{h}:{m:02d}:{t % 60:05.2f}"


def ass_escape(s: str) -> str:
    return s.replace("\\", "").replace("{", "(").replace("}", ")")


def parse_specs(seo_md: Path) -> list[dict]:
    text = seo_md.read_text(encoding="utf-8")
    sec = re.search(r"## Shorts\s*\n(.*?)(?=\n## |\Z)", text, re.S)
    if not sec:
        sys.exit("seo.md no tiene sección '## Shorts'")
    specs = []
    for line in sec.group(1).splitlines():
        if not line.strip().startswith("-"):
            continue
        d = {}
        for part in line.strip()[1:].split("|"):
            if ":" in part:
                k, v = part.split(":", 1)
                d[k.strip().lower()] = v.strip()
        if "titulo" in d and "desde" in d:
            specs.append(d)
    return specs


def build_ass(path: Path, gancho: str, caps: list[tuple[float, float, str]], dur: float,
              reveal: str = "", reveal_t0: float | None = None, parte: str = "") -> None:
    hook_lines = [l.strip().upper() for l in gancho.split("/") if l.strip()]
    hook = r"\N".join(ass_escape(l) for l in hook_lines)
    cta_start = dur - 3.0
    lines = [
        "[Script Info]", "ScriptType: v4.00+", "PlayResX: 1080", "PlayResY: 1920", "WrapStyle: 0", "",
        "[V4+ Styles]",
        "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, "
        "Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, "
        "Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
        # colores ASS en &HAABBGGRR
        "Style: Hook,Impact,104,&H0000D4FF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,1,0,1,7,3,8,50,50,330,1",
        "Style: Cap,Impact,92,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,1,0,1,7,3,2,60,60,520,1",
        "Style: Cta,Impact,86,&H0000D4FF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,1,0,1,7,3,5,60,60,0,1",
        # Reveal: el remate (la cifra/respuesta) aparece con un pop SOLO cuando se dice en el
        # audio, nunca desde el segundo 0 — ver "gancho vs remate" en CLAUDE.md.
        "Style: Reveal,Impact,110,&H0000D4FF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,1,0,1,8,4,8,50,50,330,1",
        # Parte: insignia pequeña arriba a la izquierda para series de 2+ Shorts del mismo vídeo.
        "Style: Parte,Impact,52,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,1,0,1,5,3,7,40,40,40,1",
        "", "[Events]",
        "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    ]
    if reveal:
        # El gancho fijo se corta justo cuando entra el remate, para que no convivan
        # (el remate ocupa la misma zona arriba y la pisaría).
        hook_end = min(cta_start, reveal_t0 if reveal_t0 is not None else cta_start)
        lines.append(f"Dialogue: 0,{ass_time(0)},{ass_time(hook_end)},Hook,,0,0,0,,{hook}")
        reveal_lines = [l.strip().upper() for l in reveal.split("/") if l.strip()]
        reveal_txt = r"\N".join(ass_escape(l) for l in reveal_lines)
        rt0 = reveal_t0 if reveal_t0 is not None else max(0.0, cta_start - 2.5)
        lines.append(f"Dialogue: 0,{ass_time(rt0)},{ass_time(cta_start)},Reveal,,0,0,0,,"
                     f"{{\\fad(180,0)}}{reveal_txt}")
    else:
        lines.append(f"Dialogue: 0,{ass_time(0)},{ass_time(cta_start)},Hook,,0,0,0,,{hook}")
    if parte:
        lines.append(f"Dialogue: 0,{ass_time(0)},{ass_time(dur)},Parte,,0,0,0,,PARTE {ass_escape(parte.upper())}")
    for a, b, t in caps:
        if b - a > 0.05 and a < cta_start:
            lines.append(f"Dialogue: 0,{ass_time(a)},{ass_time(min(b, cta_start))},Cap,,0,0,0,,{ass_escape(t.upper())}")
    lines.append(f"Dialogue: 1,{ass_time(cta_start)},{ass_time(dur)},Cta,,0,0,0,,VÍDEO COMPLETO\\NEN EL CANAL")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8-sig")


def norm_digits(s: str) -> str:
    return re.sub(r"[^0-9]", "", s)


def find_reveal_start(reveal: str, caps: list[tuple[float, float, str]]) -> float | None:
    """Momento en el que el REMATE se dice de verdad en el audio.

    Los subtítulos salen del GUION (ver `script_words`), y el guion suele escribir las cifras
    con letras para que ElevenLabs las lea bien ("setenta y un mil", no "71.000"). Por eso
    buscar las cifras del remate tal cual casi nunca encuentra nada: primero se prueba por si
    el guion SÍ usa dígitos (años, por ejemplo), y si no, se cae a las palabras sin cifras del
    remate ("EUROS", "AL", "AÑO"), que sirven de ancla aunque el número se diga con letras.
    None si no se encuentra nada (el caller cae entonces a un margen fijo antes del CTA)."""
    digits = norm_digits(reveal)
    if digits:
        for a, b, t in caps:
            if digits in norm_digits(t):
                return a
    toks = {norm(w) for w in re.split(r"[/\s]+", reveal) if norm(w)}
    if not toks:
        return None
    anchors = {w for w in toks if not w.isdigit()}
    for want in (anchors, toks) if anchors and anchors != toks else (toks,):
        if not want:
            continue
        for a, b, t in caps:
            ctoks = {norm(w) for w in t.split()}
            if want <= ctoks:
                return a
    return None


def chunk_caption(words: list[str], t0: float, t1: float, per: int = 3) -> list[tuple[float, float, str]]:
    groups = [words[i:i + per] for i in range(0, len(words), per)] or [[]]
    total = sum(len(" ".join(g)) for g in groups) or 1
    out, t = [], t0
    for g in groups:
        d = (t1 - t0) * len(" ".join(g)) / total
        out.append((t, t + d, " ".join(g)))
        t += d
    return out


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    slug = sys.argv[1]
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    cfg = vids[slug]
    mdir = REPO_ROOT / cfg["manifest_dir"]
    rate = cfg.get("playback_rate", 1.0)
    frames = json.loads((mdir / "frames.json").read_text(encoding="utf-8"))["frames"]
    mp4 = REPO_ROOT / "remotion" / "output" / f"{slug}.mp4"
    if not mp4.exists():
        sys.exit(f"No existe el render {mp4}")
    vdur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                          "-of", "default=nw=1:nk=1", str(mp4)]).decode().strip())
    caps_words = align_captions(frames, script_words(mdir / "script.md"))
    starts = [f["startSec"] / rate for f in frames]
    ends = starts[1:] + [vdur]
    key_idx = {f["file"].rsplit(".", 1)[0]: i for i, f in enumerate(frames)}

    outdir = mdir / "shorts"
    outdir.mkdir(exist_ok=True)
    manifest_path = outdir / "shorts.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {"shorts": []}
    done = {s["file"]: s for s in manifest["shorts"]}

    for n, spec in enumerate(parse_specs(mdir / "seo.md"), 1):
        i0 = key_idx[spec["desde"]]
        if spec.get("hasta"):
            i1 = key_idx[spec["hasta"]]
        else:
            i1 = i0
            while i1 + 1 < len(frames) and ends[i1 + 1] - starts[i0] <= MAX_DUR - 3.0:
                i1 += 1
        t0, t1 = starts[i0], ends[i1]
        body = min(t1 - t0, MAX_DUR - 3.0)
        dur = body + 3.0  # 3 s de CTA con la última imagen congelada
        caps = []
        for i in range(i0, i1 + 1):
            a, b = starts[i] - t0, min(ends[i], t0 + body) - t0
            caps += chunk_caption(caps_words[i], a, b)

        gancho = spec.get("gancho", spec["titulo"])
        reveal = spec.get("reveal", "")
        parte = spec.get("parte", "")
        if not reveal and re.search(r"\d", gancho):
            print(f"  ⚠️  short_{n}: el gancho lleva una cifra (\"{gancho}\") y se ve desde el "
                  f"segundo 0 — probablemente revela la respuesta antes de tiempo. Si es el "
                  f"remate, muévelo a un campo `reveal:` en seo.md para que aparezca solo "
                  f"cuando se dice en el audio.")
        reveal_t0 = None
        if reveal:
            reveal_t0 = find_reveal_start(reveal, caps)
            if reveal_t0 is None:
                print(f"  ⚠️  short_{n}: no encontré \"{reveal}\" en los subtítulos de este tramo; "
                      f"el remate aparece con un margen fijo antes del CTA en vez de sincronizado.")

        fname = f"short_{n}.mp4"
        with tempfile.TemporaryDirectory() as td:
            tdp = Path(td)
            shutil.copy(FONT, tdp / FONT.name)
            build_ass(tdp / "s.ass", gancho, caps, dur, reveal=reveal, reveal_t0=reveal_t0, parte=parte)
            fc = (f"color=c={BG}:s=1080x1920:r=30:d={dur:.2f}[bg];"
                  f"[0:v]scale=1240:-2,crop=1080:ih,tpad=stop_mode=clone:stop_duration=3[fg];"
                  f"[bg][fg]overlay=0:(H-h)/2-40:shortest=1,ass=s.ass:fontsdir=.[v];"
                  f"[0:a]apad=pad_dur=3,afade=t=out:st={dur - 1.2:.2f}:d=1.2[a]")
            cmd = ["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{t0:.2f}", "-t", f"{body:.2f}", "-i", str(mp4),
                   "-filter_complex", fc, "-map", "[v]", "-map", "[a]", "-t", f"{dur:.2f}",
                   "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
                   "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", str(outdir / fname)]
            r = subprocess.run(cmd, cwd=td, capture_output=True, text=True)
            if r.returncode != 0:
                sys.exit(f"ffmpeg falló en {fname}:\n{r.stderr[-2000:]}")
        prev = done.get(fname, {})
        done[fname] = {"file": fname, "titulo": spec["titulo"], "gancho": gancho, "reveal": reveal,
                       "parte": parte, "desde": spec["desde"], "t0": round(t0, 2), "dur": round(dur, 2),
                       "youtube_id": prev.get("youtube_id"), "publish_at": prev.get("publish_at")}
        print(f"OK {fname}  {t0:.1f}s → +{dur:.1f}s  «{spec['titulo']}»")

    manifest["shorts"] = sorted(done.values(), key=lambda s: s["file"])
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
