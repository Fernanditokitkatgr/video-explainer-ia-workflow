---
name: channel-audit
description: >
  Agentic audit of a YouTube channel's content formula (script/writing levers) against
  the Ecomonos gold-standard reference. Use when the user says "audit my channel",
  "audita mi canal", "how does my channel compare", "what's holding my channel back", or
  pastes transcripts and wants prioritized P0/P1/P2 fixes on the writing/formula side.
  Multi-channel. Do NOT use for channel packaging (titles, thumbnails, about, sections,
  playlists, banner) — use /channel-setup for that. Do NOT use to merely profile a
  channel (use channel-formula) or to write scripts (use script-forge).
---

# channel-audit

Audit a channel's content formula against the reference and return prioritized, concrete
fixes. Channel packaging/SEO (titles, thumbnails, about, sections, playlists, banner) is
handled separately by `/channel-setup` — this skill covers writing/content only.

## Preflight
1. Confirm **which channel** and grab its profile: if `channels/<slug>.md` exists, read
   it; otherwise run `channel-formula` first (or build a quick profile inline).
2. Gather inputs (work with what's pasted): 2-4 transcripts of representative videos.
   **Ask for YouTube Studio retention data** if the user wants P0 severity tied to real
   numbers — otherwise audit on structure alone and say so.
3. Load `reference/audit-rubric.md` and `reference/formula-framework.md`.

## Process (agentic — fan out)
Spawn parallel agents, one per surface, then synthesize. Use `general-purpose`/`Explore`
agents so main context stays clean:
- **Agent A — Content formula:** score the 10 levers from the transcripts with quoted
  evidence; flag the 1-sentence-1-image production constraint.
- **Agent B — Benchmark gap:** for each lever, state the concrete delta vs Ecomonos and
  the single highest-leverage move to close it.

Each agent returns findings with **severity + the exact rewrite**, never generic advice.

## Output (follow audit-rubric.md format exactly)
- Header (channel, date, videos sampled, lever score /30).
- 3-line verdict: the single biggest lever holding the channel back.
- P0 / P1 / P2 lists — each finding quotes the actual sentence and gives the fix.
- Lever scorecard table.
- 3 quick wins for this week.

## Guardrails
- **Concrete or it doesn't ship.** "Improve your hooks" is banned — rewrite the actual
  hook. Quote the real sentence; give the replacement.
- If retention data is missing, classify severity by structure and **state the
  assumption** ("P0 on structure; confirm against Studio retention").
- Don't recommend imitating Ecomonos's lexicon — recommend the channel build its OWN
  coherent lexicon (L1 is about having a moat, not copying theirs).
- Read-only; this skill writes only the audit report (offer to save it under
  `channels/<slug>-audit-<date>.md`).
- For packaging/SEO findings (titles, thumbnails, sections, playlists, banner), point the
  user to `/channel-setup` instead of auditing them here.
