# Agentic Channel Analytics

A separate vertical inside this repo. It has **nothing to do with the video generation
pipeline at runtime** — but it shares a boundary with it: the scripts it produces feed
the Remotion pipeline (short sentence = 1 image = 1 visual beat).

## What it is

A replicable, multi-channel toolkit (Claude Code skills + agents) that:

1. **Distills the viral DNA** of an explainer YouTube channel into a reusable profile.
2. **Audits a channel's YouTube page + content** against a gold-standard reference.
3. **Generates new scripts** in a channel's own voice, ready for the Remotion pipeline.

The gold-standard reference is **Los Ecomonos** (`@ecomonos`) — a Spanish economics
explainer channel whose formula is reverse-engineered in [reference/](reference/).
Ecomonos is the benchmark; your channel and any other are the auditable subjects.

## How it fits the repo

```
video-explainer-ia-workflow/
  remotion/  scripts/  VIDEO_EXPLAINER_WORKFLOW.md   ← generation pipeline (existing)
  agentic-channel-analytics/                          ← this vertical
  .claude/skills/                                     ← shared project skills
```

`script-forge` output is designed to drop straight into the generation pipeline:
one short sentence per line so Whisper segmentation and the `FRAMES` lookup line up.

## Layout

```
agentic-channel-analytics/
  README.md                  ← this file
  reference/
    ecomonos-viral-dna.md    ← the benchmark: 5-script teardown + glossary
    formula-framework.md     ← the 10 channel-agnostic levers
    audit-rubric.md          ← P0/P1/P2 scoring rubric (page + content)
  channels/
    _TEMPLATE.md             ← per-channel profile template
    ecomonos.md              ← the filled reference profile
    <your-channel>.md        ← created when you audit your channel
```

## Skills

| Skill | What it does | Invoke |
|---|---|---|
| `channel-formula` | Extracts a channel's DNA into a `channels/<slug>.md` profile | `/channel-formula` |
| `channel-audit`   | Agentic audit of a channel's page + content vs the reference | `/channel-audit` |
| `script-forge`    | Generates a new script in the channel's voice, pipeline-ready | `/script-forge` |

> ⚠️ Project skills load at session start. After first creation, restart Claude Code
> (close and reopen the project) for `/channel-formula`, `/channel-audit`, and
> `/script-forge` to register. Until then, open the SKILL.md and follow it manually.

## Data input

YouTube blocks scraping behind a consent wall, so the skills work with **what you paste**:
- Channel URL (best-effort `WebFetch`).
- Video titles + view counts (YouTube Studio export or copy/paste).
- Transcripts / scripts of top videos.
- Optional: retention curves, CTR, impressions from YouTube Studio.

The more you paste, the sharper the audit.
