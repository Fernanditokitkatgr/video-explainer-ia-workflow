#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Prueba de estilo NAIVE (no es producción): prepara datos, saca fotogramas y monta el MP4.

    python channel/tecno/pruebas/naive/hacer_naive.py palabras   # whisper alineado con guion.md
    python channel/tecno/pruebas/naive/hacer_naive.py texturas   # papel, diente y vetas (numpy, 0 €)
    python channel/tecno/pruebas/naive/hacer_naive.py stills 0,3.5,12 [carpeta]
    python channel/tecno/pruebas/naive/hacer_naive.py render [--concurrency 3]

La composición va a 10 fps (animación "en treses"): cada dibujo cuesta UN fotograma de render. Después
ffmpeg lo sube a 30 fps duplicando y mezcla voz + SFX con tiempos exactos (Remotion los cuantizaría a 0,1 s).
"""
import argparse
import json
import re
import subprocess
import sys
import time
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(REPO / "scripts"))
REMOTION = REPO / "remotion"
PUB = REMOTION / "public-pruebas" / "naive"
AQUI = Path(__file__).resolve().parent
ENTRY = "src/pruebas/naive_index.ts"
NPX = "npx.cmd" if sys.platform == "win32" else "npx"
PAPEL = (243, 239, 228)  # blanco roto
SFX_DIR = REPO / "assets" / "sfx" / "motor"


def palabras() -> None:
    from make_shorts import align_words, script_words
    from whisper_timestamps import cached_words
    voz = PUB / "voz.mp3"
    ww = cached_words(voz, PUB / "whisper_cache.json")
    sw = script_words(AQUI / "guion.md")
    times = align_words(sw, ww)
    out = [{"text": w, "start": round(a, 3), "end": round(b, 3)} for w, (a, b) in zip(sw, times)]
    (PUB / "words.json").write_text(json.dumps(out, ensure_ascii=False, indent=0), encoding="utf-8")
    print(" ".join(f"{w['text']}@{w['start']:.2f}" for w in out))


def texturas() -> None:
    """Tres capas estáticas: el coste en cada fotograma es pintar una imagen, no calcular ruido."""
    import numpy as np
    from PIL import Image, ImageFilter
    rng = np.random.default_rng(346)
    W, H = 1300, 2200

    def ruido(esc: float, ex: float = 1.0, ey: float = 1.0) -> "np.ndarray":
        w, h = max(2, int(W / esc / ex)), max(2, int(H / esc / ey))
        a = rng.random((h, w), dtype=np.float32)
        im = Image.fromarray((a * 255).astype("uint8")).resize((W, H), Image.BICUBIC)
        return np.asarray(im, dtype=np.float32) / 255

    def norm(a):
        return (a - a.min()) / (a.max() - a.min())

    def guarda(alpha, nombre):
        rgba = np.zeros((H, W, 4), dtype=np.uint8)
        rgba[..., 0], rgba[..., 1], rgba[..., 2] = PAPEL
        rgba[..., 3] = (np.clip(alpha, 0, 1) * 255).astype("uint8")
        Image.fromarray(rgba).save(PUB / nombre, optimize=True)
        print(nombre, f"{(PUB / nombre).stat().st_size // 1024} KB, cobertura {alpha.mean():.2f}")

    # DIENTE: el papel asoma por la cera. Grano fino + manchas medias que lo concentran por zonas.
    grano = norm(ruido(3.4) * 0.62 + ruido(1.6) * 0.38)
    zonas = norm(ruido(150) * 0.55 + ruido(38) * 0.45)
    alpha = np.clip((grano + zonas * 0.42 - 0.885) * 9, 0, 1)
    guarda(alpha, "diente.png")

    # VETAS: rayas largas de la barra de cera. Se ponen ENTRE color y línea: solo comen color.
    v = norm(ruido(4, 1, 7) * 0.5 + ruido(9, 1, 16) * 0.3 + ruido(2.5) * 0.2)
    calvas = norm(ruido(170) * 0.7 + ruido(60) * 0.3)
    alpha = np.clip((v + calvas * 0.42 - 0.92) * 7, 0, 1)
    img = Image.fromarray((alpha * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(0.6))
    guarda(np.asarray(img, dtype=np.float32) / 255, "vetas.png")

    # PAPEL: blanco roto con motas y fibras apenas visibles.
    base = np.ones((1920, 1080, 3), dtype=np.float32) * np.array(PAPEL, dtype=np.float32)
    n = (ruido(4)[:1920, :1080] - 0.5) * 7 + (ruido(160)[:1920, :1080] - 0.5) * 9
    papel = np.clip(base + n[..., None], 0, 255).astype("uint8")
    Image.fromarray(papel).save(PUB / "papel.jpg", quality=88)
    print("papel.jpg", f"{(PUB / 'papel.jpg').stat().st_size // 1024} KB")


def stills(segs: list[float], carpeta: Path) -> None:
    carpeta.mkdir(parents=True, exist_ok=True)
    (REMOTION / "out").mkdir(exist_ok=True)
    bundle = REMOTION / "out" / "naive_bundle"
    subprocess.run([NPX, "remotion", "bundle", ENTRY, "--public-dir=public-pruebas", f"--out-dir={bundle}", "--log=error"],
                   cwd=REMOTION, check=True)
    for s in segs:
        f = round(s * 10)
        subprocess.run([NPX, "remotion", "still", str(bundle), "NaiveMono", str(carpeta / f"t{s:05.2f}.png"), f"--frame={f}",
                        "--log=error"], cwd=REMOTION, check=True)
    print("stills en", carpeta)


def borrador(conc: int, escala: float) -> None:
    """Secuencia entera a escala reducida y SIN audio: mide el coste y sirve para revisar."""
    salida = REMOTION / "out" / "naive_borrador.mp4"
    t0 = time.time()
    subprocess.run([NPX, "remotion", "render", ENTRY, "NaiveMono", str(salida), "--public-dir=public-pruebas", "--codec=h264", "--crf=20",
                    f"--concurrency={conc}", f"--scale={escala}", "--timeout=180000", "--log=error", "--muted"], cwd=REMOTION, check=True)
    print(f"borrador: {time.time() - t0:.0f} s con concurrencia {conc} y escala {escala}")


def eventos_sfx() -> list[tuple[str, float, float]]:
    return [tuple(x) for x in json.loads((PUB / "sfx.json").read_text(encoding="utf-8"))]


def render(conc: int) -> None:
    (REMOTION / "out").mkdir(exist_ok=True)
    raw = REMOTION / "out" / "naive_10fps.mp4"
    final = AQUI / "prueba_naive.mp4"
    t0 = time.time()
    subprocess.run([NPX, "remotion", "render", ENTRY, "NaiveMono", str(raw), "--public-dir=public-pruebas", "--codec=h264",
                    "--crf=12", f"--concurrency={conc}", "--timeout=180000", "--log=error", "--muted"], cwd=REMOTION, check=True)
    t1 = time.time()
    gains = json.loads((SFX_DIR / "sfx_gain.json").read_text(encoding="utf-8"))
    evs = eventos_sfx()
    inputs = ["-i", str(raw), "-i", str(PUB / "voz.mp3")]
    fc = ["[1:a]aresample=48000,volume=1.0[voz]"]
    labels = ["[voz]"]
    usados: dict[str, int] = {}
    for i, (name, t, vol) in enumerate(evs):
        inputs += ["-i", str(SFX_DIR / f"{name}.mp3")]
        ms = int(t * 1000)
        g = gains.get(name, 0.25) * vol  # misma cuenta que MotorPlano (gain * volumen relativo)
        fc.append(f"[{i + 2}:a]aresample=48000,adelay={ms}|{ms},volume={g:.3f}[s{i}]")
        labels.append(f"[s{i}]")
        usados[name] = usados.get(name, 0) + 1
    fc.append("".join(labels) + f"amix=inputs={len(labels)}:duration=first:normalize=0,alimiter=limit=0.9[mix]")
    dur = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(raw)],
                                    capture_output=True, text=True, check=True).stdout)["format"]["duration"]
    # primera pasada: medir sonoridad
    tmp = REMOTION / "out" / "naive_mix.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(fc), "-map", "[mix]", "-t", dur, str(tmp)],
                   check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(tmp), "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S).group(0))
    af = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:"
          f"measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-i", str(tmp), "-map", "0:v", "-map", "1:a",
                    "-vf", "fps=30", "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p",
                    "-af", af, "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(final)], check=True)
    t2 = time.time()
    tmp.unlink(missing_ok=True)
    raw.unlink(missing_ok=True)
    print(f"render Remotion {t1 - t0:.0f} s · montaje ffmpeg {t2 - t1:.0f} s · {final} ({final.stat().st_size / 1e6:.1f} MB)")
    print("SFX:", usados)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("accion", choices=["palabras", "texturas", "stills", "render", "borrador"])
    ap.add_argument("resto", nargs="*")
    ap.add_argument("--concurrency", type=int, default=2)
    a = ap.parse_args()
    if a.accion == "palabras":
        palabras()
    elif a.accion == "texturas":
        texturas()
    elif a.accion == "stills":
        segs = [float(x) for x in a.resto[0].split(",")]
        stills(segs, Path(a.resto[1]).resolve() if len(a.resto) > 1 else REMOTION / "out" / "naive_stills")
    elif a.accion == "borrador":
        borrador(a.concurrency, float(a.resto[0]) if a.resto else 0.5)
    else:
        render(a.concurrency)


if __name__ == "__main__":
    main()
