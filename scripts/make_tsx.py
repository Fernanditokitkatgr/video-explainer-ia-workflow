# -*- coding: utf-8 -*-
"""Genera el .tsx de Remotion desde frames.json + sfx.json + videos.json y ajusta Root.tsx.

Desde 28-oct-2026 (feedback del dueño: "tiene que ser mucho más dinámico") las imágenes YA NO son
estáticas:
  - movimiento continuo suave en cada imagen (Ken Burns), rotando zoom-in / paneo dcha /
    zoom-out / paneo izq (escala máx. 1,06: no corta el dibujo de forma visible),
  - transición rápida (0,3 s) en cada cambio, rotando: punch-in (entra con zoom 1,10→1),
    slide (entra deslizando sobre la anterior, alternando lado) y bounce (muelle 0,88→1),
  - énfasis: las frases con giro ("pero", "sin embargo", "lo raro", "¡no!") llevan un temblor
    corto tras un punch-in; las preguntas y las cifras, un pop (latido de escala).
Fondo blanco. Rendimiento: como mucho 2 <Img> a la vez (solo durante un slide).
Música: solo se cablea si sfx.json la trae con volume > 0 (ahora 0: sin música).

Uso: python scripts/make_tsx.py <slug>
"""
import json, sys, math, subprocess, os, re

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]

vids = json.load(open(os.path.join(BASE, "videos.json"), encoding="utf-8"))
cfg = vids[slug]
frames = json.load(open(os.path.join(BASE, cfg["manifest_dir"], "frames.json"), encoding="utf-8"))["frames"]
sfx = json.load(open(os.path.join(BASE, cfg["manifest_dir"], "sfx.json"), encoding="utf-8"))

audio = os.path.join(BASE, "remotion", "public", cfg["audio_static"])
dur = float(subprocess.check_output([
    "ffprobe", "-v", "error", "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1", audio]).decode().strip())

rate = cfg["playback_rate"]; fps = cfg["fps"]
total = int(math.ceil(dur * fps / rate)) + 30

TWIST = re.compile(r"\bpero\b|\bsin embargo\b|\blo raro\b|¡\s*no\s*!|\ben realidad\b|\bal contrario\b", re.I)


def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ")


def emphasis(text: str) -> str:
    if TWIST.search(text):
        return "shake"
    if "?" in text or re.search(r"\d", text):
        return "pop"
    return ""


flines = []
for f in frames:
    txt = esc(f["text"])[:110]
    fx = emphasis(f.get("text", ""))
    extra = f", fx: '{fx}'" if fx else ""
    flines.append("  { file: '%s', startSec: %s%s },  // %s" % (f["file"], f["startSec"], extra, txt))

slines = []
for s in sfx["sfx"]:
    slines.append("  { file: '%s', startSec: %s, volume: %s, duration: %s }," % (
        s["file"], s["startSec"], s.get("volume", 0.1), s.get("duration", 1.5)))

music = sfx.get("music") or {}
use_music = bool(music) and float(music.get("volume", 0) or 0) > 0
music_consts = (f"""const MUSIC_FILE = '{music["file"]}';
const MUSIC_CLIP_SECONDS = {int(music["duration"])};
const MUSIC_VOLUME = {music.get("volume", 0.1)};
""" if use_music else "// Sin música de fondo (sfx.json music.volume = 0).\n")
music_jsx = (f"""      <Loop durationInFrames={{Math.round(MUSIC_CLIP_SECONDS * fps)}}>
        <Audio src={{staticFile(`{slug}-sfx/${{MUSIC_FILE}}`)}} volume={{MUSIC_VOLUME}} />
      </Loop>
""" if use_music else "")

comp = cfg["composition"]
tsx = f"""import React from 'react';
import {{ AbsoluteFill, Audio, Easing, Img, Loop, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig }} from 'remotion';

// {slug} - canal tecno. Generado por scripts/make_tsx.py (movimiento + transiciones + SFX densos).
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: {{ file: string; startSec: number; labels?: string[]; fx?: string }}[] = [
{chr(10).join(flines)}
];

// === FRAMES:END ===

const SFX: {{ file: string; startSec: number; volume?: number; duration?: number }}[] = [
{chr(10).join(slines)}
];

{music_consts}
const PLAYBACK_RATE = {rate};
const TRANS_SEC = 0.3;          // duración de la transición de entrada
const KB = 0.06;                // amplitud del Ken Burns (escala 1 -> 1.06)
const MOTIONS = ['zoomIn', 'panRight', 'zoomOut', 'panLeft'] as const;
const TRANSITIONS = ['punch', 'slide', 'bounce'] as const;
const easeOut = Easing.out(Easing.cubic);

const kenBurns = (i: number, p: number) => {{
  const kind = MOTIONS[i % MOTIONS.length];
  if (kind === 'zoomIn') return {{ s: 1 + KB * p, x: 0 }};
  if (kind === 'zoomOut') return {{ s: 1 + KB * (1 - p), x: 0 }};
  const span = 1.6; // % del ancho; a escala 1.06 sobran 3 % por lado
  return {{ s: 1 + KB, x: kind === 'panRight' ? -span + 2 * span * p : span - 2 * span * p }};
}};

export const {comp}: React.FC = () => {{
  const frame = useCurrentFrame();
  const {{ fps }} = useVideoConfig();
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) {{ if (FRAMES[i].startSec <= currentSec) {{ activeIndex = i; }} else {{ break; }} }}
  const active = FRAMES[activeIndex];
  const toFrame = (sec: number) => Math.round((sec / PLAYBACK_RATE) * fps);
  const startF = toFrame(active.startSec);
  const endF = activeIndex + 1 < FRAMES.length ? toFrame(FRAMES[activeIndex + 1].startSec) : {total};
  const e = frame - startF;                       // frames desde que entró la imagen
  const lenF = Math.max(1, endF - startF);
  const transF = Math.max(1, Math.round(TRANS_SEC * fps));
  const t = Math.min(1, e / transF);

  // movimiento continuo
  const kb = kenBurns(activeIndex, Math.min(1, e / lenF));
  let scale = kb.s;
  let x = kb.x;      // %
  let y = 0;         // %
  let rot = 0;       // grados

  // transición de entrada (la primera imagen entra sin transición)
  const trans = active.fx === 'shake' ? 'punch' : TRANSITIONS[activeIndex % TRANSITIONS.length];
  const slideDir = activeIndex % 2 === 0 ? 1 : -1;
  let showPrev = false;
  if (activeIndex > 0 && e < transF + 1) {{
    if (trans === 'punch') {{
      scale *= interpolate(t, [0, 1], [1.1, 1], {{ easing: easeOut }});
    }} else if (trans === 'slide') {{
      x += (1 - easeOut(t)) * 100 * slideDir;
      showPrev = t < 1;
    }} else {{
      const sp = spring({{ frame: e, fps, config: {{ damping: 10, stiffness: 170, mass: 0.6 }}, durationInFrames: transF + 6 }});
      scale *= 0.88 + 0.12 * sp;
    }}
  }}

  // énfasis
  const shakeF = Math.round(0.45 * fps);
  if (active.fx === 'shake' && e >= transF && e < transF + shakeF) {{
    const k = (e - transF) / shakeF;
    const w = Math.sin(((e - transF) / fps) * 2 * Math.PI * 9) * (1 - k);
    x += 0.5 * w;
    rot += 0.5 * w;
  }}
  if (active.fx === 'pop') {{
    const popF = Math.round(0.28 * fps);
    const pe = e - transF;
    if (pe >= 0 && pe < popF) scale *= 1 + 0.035 * Math.sin(Math.PI * (pe / popF));
  }}

  const imgStyle: React.CSSProperties = {{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }};
  let prevEl: React.ReactNode = null;
  if (showPrev) {{
    const prevIndex = activeIndex - 1;
    const prev = FRAMES[prevIndex];
    const pkb = kenBurns(prevIndex, 1);
    const px = pkb.x - easeOut(t) * 25 * slideDir;
    prevEl = (
      <Img src={{staticFile(`{slug}/${{prev.file}}`)}}
        style={{{{ ...imgStyle, transform: `translate(${{px}}%, 0%) scale(${{pkb.s}})` }}}} />
    );
  }}

  return (
    <AbsoluteFill style={{{{ backgroundColor: '{cfg["background"]}', overflow: 'hidden' }}}}>
      <Audio src={{staticFile('{cfg["audio_static"]}')}} playbackRate={{PLAYBACK_RATE}} />
{music_jsx}      {{SFX.map((sfx, i) => (
        <Sequence key={{i}} from={{toFrame(sfx.startSec)}} durationInFrames={{Math.ceil(((sfx.duration ?? 2) / PLAYBACK_RATE) * fps) + 3}}>
          <Audio src={{staticFile(`{slug}-sfx/${{sfx.file}}`)}} volume={{sfx.volume ?? 0.1}} playbackRate={{PLAYBACK_RATE}} />
        </Sequence>
      ))}}
      {{prevEl}}
      <Img src={{staticFile(`{slug}/${{active.file}}`)}}
        style={{{{ ...imgStyle, transform: `translate(${{x}}%, ${{y}}%) rotate(${{rot}}deg) scale(${{scale}})` }}}} />
    </AbsoluteFill>
  );
}};
"""
out = os.path.join(BASE, cfg["tsx"])
# Guardia (3-nov-2026): los vídeos del motor apuntan su "tsx" a remotion/src/motor/MotorPlano.tsx, que es
# la composición COMPARTIDA de todos los vídeos del motor. Sobrescribirla rompe todos los renders del motor.
if cfg.get("estilo") == "motor" or os.path.normpath(cfg["tsx"]).replace("\\", "/").startswith("remotion/src/motor/"):
    sys.exit(f"✗ {slug} es un vídeo del motor (tsx = {cfg['tsx']}): make_tsx.py no lo toca. "
             f"Usa: python scripts/motor_plano.py {slug} --render")
open(out, "w", encoding="utf-8").write(tsx)
n_fx = sum(1 for f in frames if emphasis(f.get("text", "")))
print(f"OK {cfg['tsx']} | {len(frames)} frames ({n_fx} con énfasis) | {len(sfx['sfx'])} sfx | "
      f"audio {dur:.1f}s -> durationInFrames {total}")

# Root.tsx: actualizar durationInFrames si la composición ya está registrada
root = os.path.join(BASE, "remotion", "src", "Root.tsx")
txt = open(root, encoding="utf-8").read()
txt2, n = re.subn(rf'(id="{comp}"\s*component=\{{[^}}]+\}}\s*durationInFrames=\{{)\d+', rf"\g<1>{total}", txt)
if n == 1:
    if txt2 != txt:
        open(root, "w", encoding="utf-8").write(txt2)
    print(f"Root.tsx: {comp} durationInFrames={total}")
else:
    print(f"REGISTRAR EN Root.tsx: id={comp} durationInFrames={total} fps={fps} {cfg['width']}x{cfg['height']}")
