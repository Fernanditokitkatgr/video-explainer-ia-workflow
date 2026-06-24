# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A production pipeline for YouTube-style explainer videos built with synthetic voice + AI-generated images, assembled in code with Remotion. The repo documents and tooling the workflow; it is not a runtime service. The reference deliverable is `InteresCompuesto` (a 2.5-min compound-interest explainer) — the one composition that actually builds.

Full step-by-step process: [VIDEO_EXPLAINER_WORKFLOW.md](./VIDEO_EXPLAINER_WORKFLOW.md). Conversational replies follow the user's language (Spanish); docs stay in their existing language.

## Pipeline

```
Script → ElevenLabs V3 (voice) → [human review] → Whisper (timestamps)
       → Higgsfield (1 image/sentence) → [human review] → Remotion (assemble) → [human review] → MP4
```

- **Script**: very short sentences (1 sentence = 1 image = 1 visual beat), ~63-70 sentences for 2.5 min. Emotion tags in brackets `[tono cercano]` for ElevenLabs V3.
- **Whisper**: `scripts/whisper_timestamps.py` produces the per-sentence start times.
- **Higgsfield**: stickman style, files named by timestamp `m_ss.jpg` (e.g. `0_00.jpg`, `1_30.jpg`).
- **Remotion**: a composition reads a `FRAMES` array mapping `{ file, startSec }` and shows the last image whose `startSec <= currentSec`.

## Commands

Whisper timestamp extraction (repo root):
```bash
pip install faster-whisper           # default engine; or: pip install openai-whisper
python scripts/whisper_timestamps.py audio.mp3 --format remotion   # prints FRAMES array
python scripts/whisper_timestamps.py audio.mp3 --format json --output timestamps.json
python scripts/whisper_timestamps.py audio.mp3 --engine whisper     # use openai-whisper instead
```
`--format remotion` emits a `FRAMES = [...]` block ready to paste into a composition. Spanish (`language="es"`) and `base` model are hardcoded in the script.

Remotion (from `remotion/`):
```bash
npm install
npm run dev      # remotion studio at localhost:3000
npm run render   # renders InteresCompuesto → output/video-final.mp4
```
Render is ~7-10 min for a 2.5-min 1920×1080 video. There are no tests, no lint config, and no `tsconfig.json` checked in.

## Adding a new video

1. Put images in `remotion/public/<video-name>/` (named by timestamp) and audio at `remotion/public/<video-name>.mp3`. **`remotion/public/` is empty in the repo** — assets are gitignored (`*.mp3`, `*.mp4`, `hf_*.png/jpg`), so a fresh clone has no media and the studio will 404 on `staticFile()` lookups until you add them.
2. Create `remotion/src/<VideoName>.tsx` modeled on [InteresCompuesto.tsx](remotion/src/InteresCompuesto.tsx): a `FRAMES` array + the active-index lookup loop.
3. Register a `<Composition>` in [Root.tsx](remotion/src/Root.tsx) with `durationInFrames`, `fps={30}`, dimensions.
4. Point `npm run render` (in [remotion/package.json](remotion/package.json)) at the new composition id, or render by id directly.

## Critical gotchas

- **Root.tsx is aspirational, not buildable as-is.** It imports `./index.css` and 7 components (`TikTokEditor`, `VoldemortVideo`, `UntangleVideo`, `AuthoritativeBrandVideo`, `PilotoUGCVideo`, `CreavsBlueprintRender`, `SubtitleMatiRender`) that **do not exist on disk** — only `InteresCompuesto.tsx`, `Root.tsx`, `index.ts` are present. The studio/render will fail to compile until those imports are removed or the files are created. When working here, first reconcile Root.tsx with what's actually in `src/`.
- **Use Whisper SEGMENT timestamps, not word timestamps.** Word-level matching gives false positives (`"no"` inside `"años"`). The script returns segments for this reason.
- **A missing image desyncs everything after it.** Because the lookup just advances through `FRAMES` by time, one absent file shifts every later frame by +1. Verify the full image set before assembling.
- **Playback rate must be applied in two places.** `InteresCompuesto` runs at 1.1×: `playbackRate={1.1}` on `<Audio>` AND `currentSec = (frame / fps) * 1.1` in the frame lookup. Also factor it into `durationInFrames` (`seconds * 30 / 1.1`). Changing one without the other desyncs audio from images.

## Cost / capacity reference

~€6/video (Higgsfield ~€5.60 dominates). Monthly ceiling ~21 videos (Higgsfield 3000 credits ÷ 140) / ~15 (ElevenLabs chars). See README and the linked Notion for details.
