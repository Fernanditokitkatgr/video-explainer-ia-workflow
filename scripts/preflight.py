#!/usr/bin/env python3
"""Gate DETERMINISTA del pipeline: falla en rojo antes de renderizar o publicar.

Nació de una tanda de bugs que llegaron a YouTube (jul-2026): voz plana por un
override silencioso, imágenes desincronizadas por rellenar escenas a lo bruto,
barras negras por aspect ratio, y música de fondo olvidada aunque CLAUDE.md la
marca como OBLIGATORIA. Todos eran comprobables por máquina. Este script los
comprueba, y su exit code != 0 corta el pipeline.

NO usa LLM a propósito: un revisor-LLM puede decir "se ve bien"; esto no puede.
Lo subjetivo (¿la imagen pega con SU frase?) va en la capa de agentes, aparte.

Uso:
    python scripts/preflight.py --video <slug>                  # etapa pre-render
    python scripts/preflight.py --video <slug> --stage publish  # + comprueba el MP4
    python scripts/preflight.py --all                           # todos los del registro
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

import config

try:
    from PIL import Image
except ImportError:
    Image = None


class Report:
    """Acumula resultados. Un solo FAIL hace que el pipeline se pare."""

    def __init__(self, video: str):
        self.video = video
        self.rows: list[tuple[str, str, str]] = []  # (nivel, check, detalle)

    def ok(self, check: str, detail: str = "") -> None:
        self.rows.append(("PASS", check, detail))

    def warn(self, check: str, detail: str) -> None:
        self.rows.append(("WARN", check, detail))

    def fail(self, check: str, detail: str) -> None:
        self.rows.append(("FAIL", check, detail))

    @property
    def failed(self) -> bool:
        return any(level == "FAIL" for level, _, _ in self.rows)

    def print(self) -> None:
        icon = {"PASS": "OK  ", "WARN": "WARN", "FAIL": "FAIL"}
        print(f"\n=== preflight: {self.video} ===")
        for level, check, detail in self.rows:
            line = f"  [{icon[level]}] {check}"
            if detail:
                line += f" — {detail}"
            print(line)
        n_fail = sum(1 for lvl, _, _ in self.rows if lvl == "FAIL")
        n_warn = sum(1 for lvl, _, _ in self.rows if lvl == "WARN")
        veredicto = "FAIL" if n_fail else ("PASS con avisos" if n_warn else "PASS")
        print(f"  → {veredicto} ({n_fail} fallos, {n_warn} avisos)")


def _ffprobe_duration(path: Path) -> float | None:
    try:
        out = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
            capture_output=True, text=True, check=True,
        )
        return float(out.stdout.strip())
    except (subprocess.CalledProcessError, FileNotFoundError, ValueError):
        return None


# ── checks ─────────────────────────────────────────────────────────
def check_recipe(cfg: dict, rep: Report) -> list[dict]:
    """frames.json íntegro: 1 escena por segmento REAL, sin huecos ni duplicados."""
    manifest = config.REPO_ROOT / cfg["manifest_dir"] / "frames.json"
    if not manifest.exists():
        rep.fail("receta existe", f"falta {manifest.name}")
        return []
    data = json.loads(manifest.read_text(encoding="utf-8"))
    frames = data.get("frames", [])
    if not frames:
        rep.fail("receta con frames", "frames.json vacío")
        return []
    rep.ok("receta con frames", f"{len(frames)} frames")

    if not data.get("style_base"):
        rep.fail("style_base definido", "sin style_base: usaría el estilo global equivocado")
    else:
        rep.ok("style_base definido")

    sin_escena = [f["file"] for f in frames if not f.get("scene")]
    if sin_escena:
        rep.fail("toda frase tiene escena", f"{len(sin_escena)} sin 'scene' (ej. {sin_escena[0]})")
    else:
        rep.ok("toda frase tiene escena")

    sin_texto = [f["file"] for f in frames if not f.get("text")]
    if sin_texto:
        rep.fail("toda frase tiene texto", f"{len(sin_texto)} sin 'text'")
    else:
        rep.ok("toda frase tiene texto")

    # Colisión de nombres: dos segmentos distintos con el mismo M_SS.jpg pisan
    # la misma imagen y descuadran el vídeo entero (gotcha conocido del repo).
    files = [f["file"] for f in frames]
    dupes = {n for n in files if files.count(n) > 1}
    if dupes:
        rep.fail("nombres de imagen únicos", f"colisiones: {sorted(dupes)[:5]}")
    else:
        rep.ok("nombres de imagen únicos")

    desordenados = [i for i in range(len(frames) - 1)
                    if frames[i + 1]["startSec"] < frames[i]["startSec"]]
    if desordenados:
        rep.fail("timestamps crecientes", f"{len(desordenados)} fuera de orden")
    else:
        rep.ok("timestamps crecientes")

    # EL bug de la desincronía: rellenar escenas repitiendo la anterior para
    # cuadrar el conteo. Se detecta como escenas idénticas consecutivas.
    repes = sum(1 for i in range(len(frames) - 1)
                if frames[i].get("scene") == frames[i + 1].get("scene"))
    if repes > max(2, len(frames) * 0.03):
        rep.fail("escenas escritas 1:1 (sin relleno)",
                 f"{repes} escenas idénticas consecutivas: huele a padding, "
                 f"escribe una escena por frase real")
    elif repes:
        rep.warn("escenas escritas 1:1 (sin relleno)", f"{repes} repeticiones consecutivas")
    else:
        rep.ok("escenas escritas 1:1 (sin relleno)")

    return frames


def check_voice(cfg: dict, rep: Report) -> float | None:
    """El audio existe y se generó con los ajustes del .env, no con un override."""
    audio = config.PUBLIC_DIR / cfg["audio_static"]
    if not audio.exists():
        rep.fail("audio generado", f"falta {audio.name}")
        return None
    dur = _ffprobe_duration(audio)
    rep.ok("audio generado", f"{dur:.1f}s" if dur else "duración desconocida")

    # generate_voice.py deja un sidecar con los ajustes REALES usados.
    sidecar = audio.with_suffix(".voice.json")
    if not sidecar.exists():
        rep.warn("ajustes de voz registrados",
                 "sin .voice.json: regenera la voz para poder auditar la entonación")
        return dur

    usados = json.loads(sidecar.read_text(encoding="utf-8"))
    esperado = {"stability": config.ELEVENLABS_STABILITY, "style": config.ELEVENLABS_STYLE}
    desvios = [f"{k}: usado {usados.get(k)} vs .env {v}"
               for k, v in esperado.items() if usados.get(k) != v]
    if desvios:
        rep.fail("voz con los ajustes del .env",
                 "; ".join(desvios) + " → entonación plana, regenera SIN overrides")
    else:
        rep.ok("voz con los ajustes del .env",
               f"stability={usados['stability']} style={usados['style']}")
    return dur


def check_images(cfg: dict, frames: list[dict], rep: Report) -> None:
    """Todas presentes, con el aspect ratio del vídeo, y visualmente variadas."""
    out_dir = config.PUBLIC_DIR / cfg["images_subpath"]
    faltan = [f["file"] for f in frames if not (out_dir / f["file"]).exists()]
    if faltan:
        rep.fail("todas las imágenes existen",
                 f"faltan {len(faltan)} (una que falte descuadra TODO lo posterior): {faltan[:3]}")
        return
    rep.ok("todas las imágenes existen", f"{len(frames)}/{len(frames)}")

    if Image is None:
        rep.warn("aspect ratio de imágenes", "Pillow no instalado, no puedo comprobarlo")
        return

    # Barras negras: si la imagen no tiene el AR de la composición y el .tsx
    # usa objectFit 'contain', el render sale con bandas.
    ar_video = cfg["width"] / cfg["height"]
    malos, brillos = [], []
    for f in frames:
        with Image.open(out_dir / f["file"]) as im:
            if abs(im.width / im.height - ar_video) > 0.02:
                malos.append(f"{f['file']} {im.width}x{im.height}")
            g = im.convert("L").resize((32, 32))
            brillos.append(sum(g.getdata()) / (32 * 32))

    tsx = (config.REPO_ROOT / cfg["tsx"]).read_text(encoding="utf-8")
    usa_contain = "objectFit: 'contain'" in tsx
    if malos and usa_contain:
        rep.fail("sin barras negras",
                 f"{len(malos)} imágenes con AR != {ar_video:.2f} y objectFit 'contain' "
                 f"(usa 'cover'): {malos[:2]}")
    elif malos:
        rep.ok("sin barras negras", f"{len(malos)} con otro AR, pero objectFit 'cover' recorta")
    else:
        rep.ok("sin barras negras")

    # Proxy objetivo de "todas las imágenes son iguales": si el brillo medio
    # apenas varía, la tanda es monótona (el caso del navy oscuro uniforme).
    if brillos:
        media = sum(brillos) / len(brillos)
        var = (sum((b - media) ** 2 for b in brillos) / len(brillos)) ** 0.5
        if var < 12:
            rep.fail("variedad visual",
                     f"desviación de brillo {var:.1f} (<12): tanda monótona, "
                     f"varía fondos, planos y props")
        elif var < 20:
            rep.warn("variedad visual", f"desviación de brillo {var:.1f}, algo repetitiva")
        else:
            rep.ok("variedad visual", f"desviación de brillo {var:.1f}")


def check_audio_layer(cfg: dict, rep: Report) -> None:
    """SFX y MÚSICA de fondo: paso obligatorio, no opcional (CLAUDE.md)."""
    manifest = config.REPO_ROOT / cfg["manifest_dir"] / "sfx.json"
    if not manifest.exists():
        rep.fail("receta de SFX existe", "falta sfx.json — capa de audio obligatoria")
        return
    data = json.loads(manifest.read_text(encoding="utf-8"))

    sfx = data.get("sfx", [])
    if not sfx:
        rep.fail("SFX definidos", "lista vacía")
    else:
        rep.ok("SFX definidos", f"{len(sfx)} efectos")

    sfx_dir = config.PUBLIC_DIR / f"{cfg['name']}-sfx"
    faltan = [s["file"] for s in sfx if not (sfx_dir / s["file"]).exists()]
    if faltan:
        rep.fail("clips de SFX generados", f"faltan {len(faltan)}: {faltan[:3]}")
    elif sfx:
        rep.ok("clips de SFX generados")

    # El fallo que se repitió: music a null y el vídeo sale sin música.
    music = data.get("music")
    if not music:
        rep.fail("música de fondo definida",
                 "music es null — CLAUDE.md la marca OBLIGATORIA en todo vídeo")
    else:
        dur = music.get("duration", 0)
        if dur > 30:
            rep.fail("música <= 30s", f"{dur}s: la API de ElevenLabs corta en 30s")
        elif dur < 28:
            rep.warn("música <= 30s",
                     f"{dur}s: un loop corto se nota al reiniciar, usa 30s")
        else:
            rep.ok("música <= 30s", f"{dur}s")
        if not (sfx_dir / music["file"]).exists():
            rep.fail("clip de música generado", f"falta {music['file']}")
        else:
            rep.ok("clip de música generado")
        if "<Loop" not in (config.REPO_ROOT / cfg["tsx"]).read_text(encoding="utf-8"):
            rep.fail("música cableada en el .tsx", "no hay <Loop>: definida pero no suena")
        else:
            rep.ok("música cableada en el .tsx")


def check_tsx(cfg: dict, frames: list[dict], audio_dur: float | None, rep: Report) -> None:
    """El .tsx refleja la receta y aplica PLAYBACK_RATE donde toca."""
    tsx_path = config.REPO_ROOT / cfg["tsx"]
    if not tsx_path.exists():
        rep.fail("composición existe", f"falta {cfg['tsx']}")
        return
    tsx = tsx_path.read_text(encoding="utf-8")

    # Solo dentro de los marcadores: el array SFX tiene la misma forma
    # ({file, startSec}) y contarlo también inflaba el total.
    bloque = re.search(r"FRAMES:START.*?===\n(.*?)// === FRAMES:END", tsx, re.S)
    n_tsx = len(re.findall(r"file: '[^']+', startSec:", bloque.group(1) if bloque else ""))
    if not bloque:
        rep.fail("marcadores FRAMES presentes", "sin // === FRAMES:START/END === no se puede inyectar")
    if n_tsx != len(frames):
        rep.fail("FRAMES inyectados al día",
                 f"{n_tsx} en el .tsx vs {len(frames)} en frames.json — corre 'inject'")
    else:
        rep.ok("FRAMES inyectados al día", f"{n_tsx} entradas")

    rate = cfg.get("playback_rate", 1.0)
    if rate != 1.0:
        # Con rate != 1 hay que dividir en el lookup Y en los Sequence de SFX,
        # o la imagen/el sonido van desfasados sin que el render falle.
        if f"* PLAYBACK_RATE" not in tsx and "PLAYBACK_RATE;" not in tsx:
            rep.warn("PLAYBACK_RATE en el lookup", "revisa el cálculo de currentSec")
        else:
            rep.ok("PLAYBACK_RATE en el lookup")
        if "<Sequence" in tsx and "/ PLAYBACK_RATE" not in tsx:
            rep.fail("PLAYBACK_RATE en los SFX",
                     "los <Sequence> no dividen por PLAYBACK_RATE: SFX desincronizados")
        elif "<Sequence" in tsx:
            rep.ok("PLAYBACK_RATE en los SFX")

    if audio_dur:
        root = (config.REPO_ROOT / "remotion/src/Root.tsx").read_text(encoding="utf-8")
        m = re.search(rf'id="{cfg["composition"]}".*?durationInFrames=\{{(\d+)\}}', root, re.S)
        if not m:
            rep.warn("duración registrada", f"no encuentro {cfg['composition']} en Root.tsx")
        else:
            declarada = int(m.group(1))
            esperada = audio_dur / rate * cfg["fps"]
            if declarada < esperada - cfg["fps"]:
                rep.fail("duración cubre el audio",
                         f"{declarada} frames < {esperada:.0f}: el vídeo cortaría el audio")
            else:
                rep.ok("duración cubre el audio", f"{declarada} frames")


def check_cta(cfg: dict, rep: Report) -> None:
    """El cierre no puede promocionar un vídeo YA publicado (pasó con Lazarus)."""
    if not cfg.get("script"):
        return
    script_path = config.REPO_ROOT / cfg["script"]
    if not script_path.exists():
        rep.fail("guion existe", f"falta {cfg['script']}")
        return
    # Solo la NARRACIÓN: las "## Notas de producción" del final mencionan
    # nombres de vídeos y disparaban un falso positivo.
    lineas = []
    for ln in script_path.read_text(encoding="utf-8").splitlines():
        s = ln.strip()
        if s.startswith("##"):
            break
        if s and not s.startswith(("#", "**", ">", "-", "---")):
            lineas.append(s)
    cola = " ".join(lineas).lower()[-900:]  # el CTA vive al final

    publicados = {
        nombre for nombre, v in config.load_videos().items()
        if v.get("published") and nombre != cfg["name"]
    }
    citados = [n for n in publicados
               if n.replace("-", " ") in cola or n.split("-")[0] in cola.split()]
    if citados:
        rep.warn("CTA apunta a algo por venir",
                 f"el cierre parece citar vídeos ya publicados: {citados} — "
                 f"revisa que no prometa como 'próximo' algo que ya salió")
    else:
        rep.ok("CTA apunta a algo por venir")


def check_render(cfg: dict, audio_dur: float | None, rep: Report) -> None:
    """Etapa publish: el MP4 existe, dura lo que debe y no tiene bandas."""
    out_dir = config.REMOTION_DIR / "output"
    candidatos = sorted(out_dir.glob(f"{cfg['name']}*.mp4"),
                        key=lambda p: p.stat().st_mtime, reverse=True)
    if not candidatos:
        rep.fail("render existe", f"falta output/{cfg['name']}.mp4")
        return
    mp4 = candidatos[0]  # el más reciente es el que se publica
    rep.ok("render existe", f"{mp4.name} ({mp4.stat().st_size // 1024 // 1024} MB)")
    if len(candidatos) > 1:
        viejos = [p.name for p in candidatos[1:]]
        rep.warn("un solo render por vídeo",
                 f"hay renders antiguos que se pueden subir por error: {viejos}")

    dur = _ffprobe_duration(mp4)
    if dur and audio_dur:
        esperada = audio_dur / cfg.get("playback_rate", 1.0)
        if abs(dur - esperada) > 2.0:
            rep.fail("duración del render",
                     f"{mp4.name} dura {dur:.1f}s vs {esperada:.1f}s esperados "
                     f"— render desactualizado respecto al audio")
        else:
            rep.ok("duración del render", f"{dur:.1f}s")

    # Barras negras: con objectFit 'cover' la imagen SIEMPRE cubre el lienzo,
    # así que son geométricamente imposibles y no hace falta mirar píxeles
    # (mirarlos daba falsos positivos: un fondo oscuro y plano del propio dibujo
    # es idéntico a una banda). Solo se inspeccionan si 'contain' las permite.
    if Image is None:
        return
    if "objectFit: 'contain'" not in (config.REPO_ROOT / cfg["tsx"]).read_text(encoding="utf-8"):
        rep.ok("render sin bandas negras", "objectFit 'cover': imposibles por geometría")
        return
    frame_png = out_dir / f".preflight_{cfg['name']}.png"
    try:
        subprocess.run(["ffmpeg", "-y", "-ss", str(min(30, (dur or 60) / 3)), "-i", str(mp4),
                        "-frames:v", "1", "-update", "1", str(frame_png)],
                       capture_output=True, check=True)
        with Image.open(frame_png) as im:
            g = im.convert("L")
            w, h = g.size
            interior = [g.getpixel((x, y))
                        for x in range(w // 4, 3 * w // 4, max(1, w // 20))
                        for y in range(h // 4, 3 * h // 4, max(1, h // 20))]
            def franja(px) -> bool:
                # Banda real = casi negra Y plana. Un plano nocturno es oscuro
                # pero nunca uniforme, así que la planitud es lo que discrimina.
                return max(px) < 24 and (max(px) - min(px)) < 6
            arriba = franja([g.getpixel((x, 2)) for x in range(0, w, max(1, w // 60))])
            abajo = franja([g.getpixel((x, h - 3)) for x in range(0, w, max(1, w // 60))])
            izq = franja([g.getpixel((2, y)) for y in range(0, h, max(1, h // 40))])
            der = franja([g.getpixel((w - 3, y)) for y in range(0, h, max(1, h // 40))])

        if max(interior) < 60:
            # Frame entero oscuro: no se puede distinguir arte de banda. Lo dice
            # en vez de fingir un veredicto; el check estático de AR es el fiable.
            rep.warn("render sin bandas negras",
                     "frame demasiado oscuro para discriminar arte de banda; "
                     "fíate del check de aspect ratio")
        elif (arriba and abajo) or (izq and der):
            eje = "arriba/abajo" if (arriba and abajo) else "izquierda/derecha"
            rep.fail("render sin bandas negras", f"bandas planas detectadas {eje} en el MP4")
        else:
            rep.ok("render sin bandas negras")
    except (subprocess.CalledProcessError, FileNotFoundError, OSError) as e:
        rep.warn("render sin bandas negras", f"no pude extraer un frame: {type(e).__name__}")
    finally:
        frame_png.unlink(missing_ok=True)


def run(video: str, stage: str) -> Report:
    cfg = config.get_video(video)
    rep = Report(video)
    frames = check_recipe(cfg, rep)
    audio_dur = check_voice(cfg, rep)
    if frames:
        check_images(cfg, frames, rep)
    check_audio_layer(cfg, rep)
    if frames:
        check_tsx(cfg, frames, audio_dur, rep)
    check_cta(cfg, rep)
    if stage == "publish":
        check_render(cfg, audio_dur, rep)
    return rep


def main() -> None:
    p = argparse.ArgumentParser(description="Gate determinista antes de renderizar/publicar")
    p.add_argument("--video", help="slug en videos.json")
    p.add_argument("--all", action="store_true", help="todos los vídeos del registro")
    p.add_argument("--stage", choices=["render", "publish"], default="render",
                   help="publish añade las comprobaciones del MP4 final")
    args = p.parse_args()

    if not args.video and not args.all:
        sys.exit("Indica --video <slug> o --all")

    videos = list(config.load_videos()) if args.all else [args.video]
    fallo = False
    for v in videos:
        rep = run(v, args.stage)
        rep.print()
        fallo = fallo or rep.failed

    if fallo:
        sys.exit("\nPreflight FALLÓ. No renderices ni publiques hasta arreglarlo.")
    print("\nPreflight OK.")


if __name__ == "__main__":
    main()
