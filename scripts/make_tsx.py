# -*- coding: utf-8 -*-
"""Genera el .tsx de Remotion desde frames.json + sfx.json + videos.json.
Uso: python make_tsx.py <slug>"""
import json, sys, math, subprocess, os

BASE = r"C:\Users\ferna\Desktop\Untangle\Claude\Youtube videos\video-explainer-ia-workflow"
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

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ")

flines = []
for f in frames:
    txt = esc(f["text"])[:110]
    flines.append("  { file: '%s', startSec: %s },  // %s" % (f["file"], f["startSec"], txt))

slines = []
for s in sfx["sfx"]:
    slines.append("  { file: '%s', startSec: %s, volume: %s }," % (s["file"], s["startSec"], s.get("volume", 0.15)))

comp = cfg["composition"]
tsx = f"""import React from 'react';
import {{ AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig }} from 'remotion';

// {slug} - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: {{ file: string; startSec: number; labels?: string[] }}[] = [
{chr(10).join(flines)}
];

// === FRAMES:END ===

const SFX: {{ file: string; startSec: number; volume?: number }}[] = [
{chr(10).join(slines)}
];

const MUSIC_FILE = '{sfx["music"]["file"]}';
const MUSIC_CLIP_SECONDS = {int(sfx["music"]["duration"])};
const MUSIC_VOLUME = {sfx["music"].get("volume", 0.3)};

export const {comp}: React.FC = () => {{
  const frame = useCurrentFrame();
  const {{ fps }} = useVideoConfig();
  const PLAYBACK_RATE = {rate};
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) {{ if (FRAMES[i].startSec <= currentSec) {{ activeIndex = i; }} else {{ break; }} }}
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{{{ backgroundColor: '{cfg["background"]}' }}}}>
      <Audio src={{staticFile('{cfg["audio_static"]}')}} playbackRate={{PLAYBACK_RATE}} />
      <Loop durationInFrames={{Math.round(MUSIC_CLIP_SECONDS * fps)}}>
        <Audio src={{staticFile(`{slug}-sfx/${{MUSIC_FILE}}`)}} volume={{MUSIC_VOLUME}} />
      </Loop>
      {{SFX.map((sfx, i) => (
        <Sequence key={{i}} from={{Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}}>
          <Audio src={{staticFile(`{slug}-sfx/${{sfx.file}}`)}} volume={{sfx.volume ?? 0.15}} playbackRate={{PLAYBACK_RATE}} />
        </Sequence>
      ))}}
      {{activeFrame && (
        <Img src={{staticFile(`{slug}/${{activeFrame.file}}`)}} style={{{{ width: '100%', height: '100%', objectFit: 'cover' }}}} />
      )}}
    </AbsoluteFill>
  );
}};
"""
out = os.path.join(BASE, cfg["tsx"])
open(out, "w", encoding="utf-8").write(tsx)
print(f"OK {cfg['tsx']} | {len(frames)} frames | {len(sfx['sfx'])} sfx | audio {dur:.1f}s -> durationInFrames {total}")
print(f"REGISTRAR EN Root.tsx: id={comp} durationInFrames={total} fps={fps} {cfg['width']}x{cfg['height']}")
