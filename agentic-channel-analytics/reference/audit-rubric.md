# Audit Rubric — P0/P1/P2

Used by `channel-audit`. Scores the content/script formula only. Channel packaging
(titles, thumbnails, about, sections, playlists, banner) is audited separately by
`/channel-setup`. Findings are classified by impact, not by how easy they are to fix.

## Severity

- **P0 — bleeding views.** Directly suppresses CTR, retention, or sessions. Fix first.
- **P1 — leaving growth on the table.** Real upside, not actively bleeding.
- **P2 — polish.** Marginal gains, brand consistency, nice-to-have.

---

## Content formula (apply the 10 levers from formula-framework.md)

Score each lever 0-3 against the reference. Flag:
- Any **L1/L2/L3/L8 scoring ≤1** → **P0** (lexicon, voice, hook, loop are core).
- Any **L4/L5/L6 scoring ≤1** → **P1**.
- Any **L7/L9/L10 scoring ≤1** → **P2** (unless the channel does long-form, then L7 = P1).
- **Production constraint:** sentences too long for 1-sentence-1-image → **P1** (breaks
  the pipeline downstream).

---

## Output format (what channel-audit must produce)

\`\`\`
# Channel Audit — <channel> vs Ecomonos reference
Date: <date>  ·  Videos sampled: <n>  ·  Lever score: <x>/30

## Verdict (3 lines max)
<the single biggest lever holding the channel back, in plain language>

## P0 — fix first
- <finding> → <concrete fix> (ref: <lever>)

## P1 — growth on the table
- ...

## P2 — polish
- ...

## Lever scorecard
| Lever | Score | Note |
| L1 Lexicon | x/3 | ... |
...

## Quick wins (this week)
1. ...  2. ...  3. ...
\`\`\`

Findings must be **concrete and channel-specific** — quote the actual sentence and give
the rewrite, never generic advice ("improve your hooks" is banned).
