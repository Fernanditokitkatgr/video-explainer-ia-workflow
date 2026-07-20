---
name: channel-setup
description: >
  Sets up or audits a YouTube channel's packaging — about/description, channel keywords,
  trailer for non-subscribers, homepage sections, playlists, and banner — applying changes
  directly via the YouTube Data API v3. Use when the user says "set up the channel",
  "configura el canal", "audit my channel setup", "revisa el packaging del canal", when
  launching or rebranding a channel, or periodically to check channel branding is
  complete. Do NOT use for per-video titles/descriptions/tags (use /video-seo) or for
  content-formula scoring (use channel-audit).
---

# channel-setup

Reads the real channel branding state via the YouTube Data API v3, compares it against
the packaging checklist in `agentic-channel-analytics/reference/seo-framework.md`, and
applies approved changes. Two modes, auto-detected.

## Preflight

Run the status check:

```bash
cd scratch-yt && ./.venv/bin/python youtube_channel.py status
```

- `"ok": true` → **audit mode**.
- `"ok": false` with a `missing` list → **setup mode**.

## Setup mode (missing elements)

For each item in `missing`, draft the proposed value:

- **About/description**: 2-4 sentences — what the channel is, who it's for, upload
  cadence. Pull voice/niche from `agentic-channel-analytics/channels/<slug>.md`.
- **Channel keywords**: 5-10 comma-separated terms — niche + brand + core topics.
- **Trailer**: pick the channel's best-performing or most representative existing video
  (ask the user if unsure — this is a judgment call, not something to guess).
- **Channel sections**: propose 2-4, e.g. one `singlePlaylist`/`multiplePlaylists`
  featuring the channel's main playlists, one `recentUploads`.
- **Playlists**: propose playlist titles that group existing videos thematically (ask the
  user which videos belong where if the grouping isn't obvious from titles/notes).
- **Banner**: if the channel has no banner image asset yet, offer to generate one via the
  Higgsfield MCP (`mcp__higgsfield__generate_image`) matching the channel's visual
  identity (stickman universe, brand colors) — 2048x1152px. If an asset already exists
  locally, use that instead of generating a new one.

Present the full proposal (every field, verbatim text) and wait for explicit HITL
approval. Accept edits inline. **Never call an apply command before approval.**

Once approved, apply via the CLI (one call per field/section/playlist):

```bash
./.venv/bin/python youtube_channel.py update-branding \
  --about "<about text>" --keywords "<comma,separated,keywords>" \
  --trailer-video-id "<video id>"

./.venv/bin/python youtube_channel.py upload-banner "<path/to/banner.png>"

./.venv/bin/python youtube_channel.py upsert-playlist "<title>" --description "<description>"

./.venv/bin/python youtube_channel.py upsert-section horizontalRow multiplePlaylists \
  --title "<section title>" --playlist-ids "<PL1,PL2>"
```

After applying, re-run `status` and confirm `"ok": true`.

## Audit mode (already configured)

Read current state:

```bash
./.venv/bin/python youtube_channel.py branding
./.venv/bin/python youtube_channel.py sections
./.venv/bin/python youtube_channel.py playlists
```

Compare each field against the checklist in `seo-framework.md` (is the about text still
accurate? do keywords match the current content focus? are sections/playlists still
organized around the channel's actual output?). Show a **diff** (current → proposed) per
changed field, get HITL approval per field, then apply using the same CLI commands as
setup mode (pass `--playlist-id`/`--section-id` from the current listing to update in
place rather than creating duplicates).

## Guardrails

- **Never write without a shown diff + explicit approval.** Read commands are safe to run
  anytime; every `update-branding`/`upload-banner`/`upsert-playlist`/`upsert-section` call
  requires prior HITL confirmation of the exact value being sent.
- If `status`/`branding`/`sections`/`playlists` fail (expired token, permission error):
  stop and tell the user to re-authenticate (delete `scratch-yt/token.json` and re-run
  any command to trigger the OAuth browser flow) — do not guess at channel state.
- This is the gate `/video-seo` checks before every upload — keep the channel's branding
  current, not just correct at launch.
