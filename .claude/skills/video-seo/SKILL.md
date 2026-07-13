---
name: video-seo
description: >
  Generates YouTube-optimized metadata (title, description, tags, chapters) for a
  finished video using a hybrid search/narrative title strategy, gates the upload on
  channel branding being complete, then uploads via the YouTube Data API v3. Use when the
  user wants to publish a video from the pipeline — either a specific slug
  (/video-seo sueno-stick) or the most recently completed video. Do NOT use for channel-level
  setup (use /channel-setup) or content-formula audits (use channel-audit).
---

# video-seo

Replaces `/youtube-publisher`. Same publish flow, plus a channel-setup gate and a
search-demand check that decides between a keyword-front title and a narrative title per
video (see `agentic-channel-analytics/reference/seo-framework.md` for the full method).

## Phase 0 — Locate the video

Determine the video slug from the args or conversation context. Then read:

- `videos.json` → composition id, audio path, image folder
- `channel/<canal>/videos/<slug>/script.md` → full script
- `channel/<canal>/videos/<slug>/timestamps.json` → per-segment timings + text
- `channel/<canal>/videos/<slug>/notes.md` → topic, production decisions
- `agentic-channel-analytics/channels/<slug>.md` → channel DNA/voice
- `remotion/output/<slug>.mp4` → rendered video (confirm it exists)
- `remotion/output/<slug>-thumbnail.png` OR `remotion/output/<slug>_thumbnail.png`

If the MP4 doesn't exist, STOP and tell the user to render first.

## Phase 0.5 — Channel setup gate

```bash
cd scratch-yt && ./.venv/bin/python youtube_channel.py status
```

- If the command errors (expired token, permission error): **STOP**. The gate fails
  closed — never upload in a degraded state. Tell the user to re-authenticate.
- If `"ok": false`: **STOP**. Print the `missing` list verbatim and tell the user to run
  `/channel-setup` first. Do not proceed to Phase 1.
- If `"ok": true`: continue.

## Phase 1 — Hot Dog demand check

Derive 1-3 candidate search phrases from the video's topic (the core question/claim a
viewer searching for this topic would type). For each:

```bash
./.venv/bin/python youtube_channel.py search "<candidate phrase>"
```

- If the command errors, times out, or returns an empty list: log
  `"SEO fallback: sin datos de demanda"` and skip to the narrative title (Phase 2, no
  proven demand branch). Never block the upload on this check.
- Otherwise, check each result's `ratio` field: a result with `ratio >= 5` AND
  `subscribers < 100000` is a demand signal for that phrase.

## Phase 2 — Title decision (hybrid)

- **Demand proven** (at least one candidate phrase cleared the Hot Dog bar): lead the
  title with that phrase verbatim, append a short curiosity hook. Target 50-70 characters
  total.
- **No proven demand**: use the existing narrative approach — contrarian-thesis title
  (lever L4, `agentic-channel-analytics/reference/formula-framework.md`), conversational
  channel voice, 50-70 characters. This is unchanged from `youtube-publisher`'s prior
  behavior.
- Either branch: do NOT keyword-stuff. One phrase, placed with intent, beats several
  crammed in. Include the core topic word once, naturally.

## Phase 3 — Description + tags

### Description
Structure (in this exact order):

```
[Hook paragraph — 2-3 sentences expanding the title's promise. Written for the viewer,
not for crawlers. If a keyword phrase was used (Phase 2), it appears naturally 2-4 times
across the description — never stuffed.]

[Empty line]

[Chapter block — derived from timestamps.json, grouped thematically into 5-8 chapters]
0:00 [Chapter title]
X:XX [Chapter title]
...

[Empty line]

⚠️ Divulgación: Este contenido es educativo, no consejo médico. Consulta siempre a un profesional de salud.

[Empty line]

📌 Stick to the Plan — longevidad sin excusas.
Nuevo vídeo cada semana.

[Empty line]

#longevidad #habits #salud
```

**Chapter rules (verified from YouTube Help Center):**
- Minimum 3 chapters, each at least 10 seconds long.
- First chapter MUST start at 0:00.
- Format: `M:SS Title` or `MM:SS Title` (no brackets, no dashes).
- Derive from `timestamps.json`: group consecutive segments by thematic beat, aim for
  5-8 chapters for a 2.5-min video, using the `startSec` of the first segment in each
  group.

### Tags
- 8-12 tags max: primary keyword (if any from Phase 2) + close variants + broad niche
  tags + channel brand terms. No stuffing, no irrelevant viral tags. Tags have minimal
  algorithmic ranking impact (YouTube Help Center) — treat as categorization only.

### Hashtags
- 3-5 hashtags at the end of the description, consistent across videos (brand + niche).

## Phase 4 — HITL review

Present the full metadata block:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📺 METADATA PARA YOUTUBE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTRATEGIA DE TÍTULO: [keyword-front (demanda probada: "<phrase>", ratio X:1) | narrativo]

TÍTULO (X chars):
[título]

DESCRIPCIÓN:
[descripción completa]

TAGS:
[tag1, tag2, ...]

PRIVACIDAD: private (revisar en Studio antes de publicar)
THUMBNAIL: [ruta si existe / "no encontrada — subir manual"]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Apruebas o ajustas algo antes de subir?
```

Wait for explicit approval. Accept edits inline.

## Phase 5 — Upload

Once approved:

```bash
cd scratch-yt
./.venv/bin/python upload_youtube.py \
  ../remotion/output/<slug>.mp4 \
  --title "<título>" \
  --description "<descripción>" \
  --tags "<tags separados por coma>" \
  --thumbnail "../remotion/output/<thumbnail-path>" \
  --privacy private
```

Always upload as `private` first. Tell the user to review in YouTube Studio (auto-captions,
chapters rendered correctly, thumbnail on mobile) before switching to public.

## Phase 6 — Post-upload checklist

- [ ] Chapters appear correctly in the progress bar
- [ ] Auto-generated captions are accurate (edit if needed — captions boost SEO)
- [ ] Thumbnail renders well on mobile (small size)
- [ ] End screen / cards set up (link to next video or playlist)
- [ ] Publish time: Thu-Sat 18:00-20:00 local audience time (highest Browse traffic)
- [ ] Switch privacy to `public` when ready

## Phase 7 — Short (always, after main video is public)

```bash
ffmpeg -i "<final-mp4-path>" \
  -vf "crop=ih*9/16:ih:(iw-ih*9/16)/2:0" \
  -c:a copy remotion/output/<slug>-short.mp4 -y
```

Upload with a modified title (`título + #shorts`), short description (no chapters), same
thumbnail. YouTube auto-classifies as Short when it detects 9:16 format under 3 minutes.
Upload private → user reviews → publish.

## Research basis (verified 2025-2026)

| Factor | What actually moves the needle |
|---|---|
| CTR | Platform avg 2-10%; Search placements get 8-15%. CTR is the primary distribution signal. |
| Quality CTR | Algorithm co-weights post-click retention — a high CTR with low retention gets suppressed. Title must match content. |
| Tags | Minimal ranking impact (YouTube's own docs). Don't over-optimize. |
| Title + Description | Primary text ranking factors. Write for humans; algorithm reads both. |
| Chapters | Expand keyword surface area + appear as Google Key Moments. Use them always. |
| Thumbnail | Upload 1280x720 minimum via API. Up to 3840x2160 for 4K displays. |
| Search demand | A ≥5:1 view/subscriber ratio on a <100k-subscriber channel signals topic-driven (not creator-driven) demand — see Hot Dog method in `seo-framework.md`. |
| Refuted | Any specific % uplift claim (keyword in first 5 words = +20%, faces = +45% CTR, etc.) — no primary source confirms these. |
```
