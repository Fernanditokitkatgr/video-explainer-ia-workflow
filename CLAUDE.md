# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A production pipeline for YouTube-style explainer videos built with synthetic voice + AI-generated images, assembled in code with Remotion. The repo documents and tooling the workflow; it is not a runtime service.

Full step-by-step process: [VIDEO_EXPLAINER_WORKFLOW.md](./VIDEO_EXPLAINER_WORKFLOW.md). Conversational replies follow the user's language (Spanish); docs stay in their existing language.

## Repo structure

```
remotion/           ← Remotion compositions (video assembly + render)
scripts/            ← whisper_timestamps.py
agentic-channel-analytics/  ← separate vertical: channel DNA, audits, script generation
  reference/        ← Ecomonos benchmark, formula framework, audit rubric
  channels/         ← per-channel profiles (ecomonos.md, stick-to-the-plan.md, …)
  AUTOMATION-RUNBOOK.md
scratch-yt/         ← YouTube Data API upload scripts (Python venv inside)
.claude/skills/     ← project skills: channel-formula, channel-audit, script-forge, thumbnail-creator
```

## Pipeline

```
Script → ElevenLabs V3 (voice) → [human review] → Whisper (timestamps)
       → Higgsfield (1 image/segment) → [human review] → Remotion (assemble) → [human review] → MP4
       → thumbnail-creator (PASO 6) → publish
```

- **Script**: very short sentences (1 sentence = 1 image = 1 visual beat), ~63-70 sentences for 2.5 min. Emotion tags in brackets `[tono cercano]` for ElevenLabs V3.
- **Whisper**: `scripts/whisper_timestamps.py` produces per-segment start times. Output files named `seg_NN.png` (e.g. `seg_00.png`, `seg_01.png`).
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
# render a specific composition:
npx remotion render SuenoStick output/sueno-stick.mp4
```
Render is ~7-10 min for a 2.5-min 1920×1080 video. There are no tests, no lint config, and no `tsconfig.json` checked in.

## Remotion compositions

Two compositions are registered in [Root.tsx](remotion/src/Root.tsx) and present on disk:

| id | file | playback rate | notes |
|---|---|---|---|
| `InteresCompuesto` | `InteresCompuesto.tsx` | 1.1× | rate applied in both `<Audio>` and frame lookup |
| `SuenoStick` | `SuenoStick.tsx` | 1.0× (normal) | "Qué le pasa a tu cuerpo cuando duermes mal" |

Image assets live in `remotion/public/<video-name>/` and audio at `remotion/public/<video-name>.mp3`. These are gitignored (`*.mp3`, `*.mp4`, `hf_*.png/jpg`) so a fresh clone has no media; the studio will 404 until you add them.

## Adding a new video

1. Put images in `remotion/public/<video-name>/` (named `seg_00.png`, `seg_01.png`, …) and audio at `remotion/public/<video-name>.mp3`.
2. Create `remotion/src/<VideoName>.tsx` modeled on [SuenoStick.tsx](remotion/src/SuenoStick.tsx): a `FRAMES` array + the active-index lookup loop.
3. Register a `<Composition>` in [Root.tsx](remotion/src/Root.tsx) with `durationInFrames`, `fps={30}`, dimensions.
4. Render with `npx remotion render <CompositionId> output/<name>.mp4` from inside `remotion/`.

## Critical gotchas

- **Use Whisper SEGMENT timestamps, not word timestamps.** Word-level matching gives false positives (`"no"` inside `"años"`). The script returns segments for this reason.
- **A missing image desyncs everything after it.** Because the lookup advances through `FRAMES` by time, one absent file shifts every later frame by +1. Verify the full image set before assembling.
- **Playback rate must be applied in two places (1.1× videos only).** `InteresCompuesto` runs at 1.1×: `playbackRate={1.1}` on `<Audio>` AND `currentSec = (frame / fps) * 1.1` in the frame lookup. Also factor it into `durationInFrames` (`seconds * 30 / 1.1`). Changing one without the other desyncs audio from images. `SuenoStick` uses 1.0× — no multiplier needed.

## Agentic channel analytics vertical

A separate toolkit in `agentic-channel-analytics/` that produces scripts and audits channels. Its output (pipeline-ready scripts) feeds the Remotion pipeline above. The gold-standard benchmark is **@ecomonos** (profile in `channels/ecomonos.md`; formula in `reference/`).

Project skills (invoke with `/skill-name` after restarting Claude Code):

| Skill | When to use |
|---|---|
| `/channel-formula` | Extract a YouTube channel's viral DNA into a `channels/<slug>.md` profile |
| `/channel-audit` | Agentic audit of channel page + content vs Ecomonos benchmark, returns P0/P1/P2 fixes |
| `/script-forge` | Generate a pipeline-ready script in a channel's voice (reads `channels/<slug>.md`) |
| `/thumbnail-creator` | Generate thumbnail variants via Higgsfield, score against rubric, HITL selection (PASO 6) |

Skills require a restart to register after first creation. If `/skill-name` isn't available yet, open `.claude/skills/<name>/SKILL.md` and follow it manually.

YouTube data input: YouTube blocks scraping behind a consent wall — skills work with pasted data (channel URL, video titles + views, transcripts, optional Studio retention/CTR exports).

## Cost / capacity reference

~€6/video (Higgsfield ~€5.60 dominates). Monthly ceiling ~21 videos (Higgsfield 3000 credits ÷ 140) / ~15 (ElevenLabs chars). See README for the breakdown.
