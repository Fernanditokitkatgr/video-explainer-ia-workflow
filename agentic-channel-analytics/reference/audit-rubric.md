# Audit Rubric — P0/P1/P2

Used by `channel-audit`. Two surfaces are scored: **the YouTube page (packaging &
architecture)** and **the content (script formula)**. Findings are classified by
impact, not by how easy they are to fix.

## Severity

- **P0 — bleeding views.** Directly suppresses CTR, retention, or sessions. Fix first.
- **P1 — leaving growth on the table.** Real upside, not actively bleeding.
- **P2 — polish.** Marginal gains, brand consistency, nice-to-have.

---

## Surface A — YouTube page (packaging & architecture)

| Check | P0 if… |
|---|---|
| **Title = contrarian claim** (L4) | Titles are neutral topic labels, not assertions |
| **Thumbnail clarity** | Text unreadable at mobile size, >4 words, or no focal subject |
| **Title/thumbnail non-redundant** | Thumbnail repeats the title verbatim (wastes a slot) |
| **First line of description** | No hook in first 1–2 lines (above "show more") |
| **Chained-CTA pin / end screen** (L8) | No end screen pointing to a specific next video |
| **Playlists as binge funnels** | No playlists, or playlists not curated for sessions |
| **Channel trailer + sections** | No trailer / unorganized channel home |
| **Consistent visual identity** | Thumbnails not recognizable as one brand |
| **Tags / topic consistency** | Wildly inconsistent topics fragmenting the audience |

## Surface B — Content (apply the 10 levers from formula-framework.md)

Score each lever 0–3 against the reference. Flag:
- Any **L1/L2/L3/L8 scoring ≤1** → **P0** (lexicon, voice, hook, loop are core).
- Any **L4/L5/L6 scoring ≤1** → **P1**.
- Any **L7/L9/L10 scoring ≤1** → **P2** (unless the channel does long-form, then L7 = P1).
- **Production constraint:** sentences too long for 1-sentence-1-image → **P1** (breaks
  the pipeline downstream).

---

## Output format (what channel-audit must produce)

```
# Channel Audit — <channel> vs Ecomonos reference
Date: <date>  ·  Videos sampled: <n>  ·  Lever score: <x>/30

## Verdict (3 lines max)
<the single biggest lever holding the channel back, in plain language>

## P0 — fix first
- [Surface] <finding> → <concrete fix> (ref: <lever/check>)

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
```

Findings must be **concrete and channel-specific** — quote the actual title/sentence
and give the rewrite, never generic advice ("improve your hooks" is banned).
