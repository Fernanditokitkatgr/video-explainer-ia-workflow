# YouTube SEO + Channel Setup Agent — Design

## Purpose

Replace `youtube-publisher` and the packaging half (Agent A) of `channel-audit` with two
skills that combine real search-driven SEO with actual YouTube Data API execution —
instead of only generating text for manual application in YouTube Studio.

The narrative/content-formula half of `channel-audit` (10 Ecomonos levers, scored via
`channel-formula`) is out of scope and stays untouched.

## Motivation

Current `youtube-publisher` generates titles/descriptions optimized for narrative hook
(Ecomonos DNA: contrarian thesis) but has no mechanism to detect when a topic has proven
YouTube-search demand, where a keyword-front title (Moneyball method) would out-perform a
pure narrative hook. Channel-level packaging (about, keywords, sections, playlists,
banner, trailer) is currently only auditable as text recommendations with no execution
path.

## Scope

Two skills, sharing one API module:

1. **`/video-seo <slug>`** — per-video SEO + publish. Replaces `youtube-publisher`.
2. **`/channel-setup`** — channel-level setup (new channel) and audit (existing channel).
   Absorbs `channel-audit`'s Agent A (packaging) duties, adds real API execution.

Shared module: `scratch-yt/youtube_channel.py`.

## Architecture

```
scratch-yt/
  youtube_channel.py      ← new: shared YouTube Data API v3 helpers
  upload_youtube.py        ← existing, reused for video upload step

.claude/skills/
  video-seo/SKILL.md        ← replaces youtube-publisher
  channel-setup/SKILL.md    ← new

agentic-channel-analytics/reference/
  seo-framework.md           ← new: Moneyball method + Hot Dog validation rules + tag rules
```

Auth: reuses existing OAuth credentials (`scratch-yt/client_secret.json`,
`scratch-yt/token.json`). Scope is already `https://www.googleapis.com/auth/youtube`
(full access) — no re-authorization needed.

### `youtube_channel.py` — functions

| Function | API call | Quota cost | Notes |
|---|---|---|---|
| `search_videos(query, max_results)` | `search.list` | 100 units | Returns title, views, channel subs for Hot Dog ratio calc |
| `get_channel_branding()` | `channels.list(part=brandingSettings,contentDetails)` | 1 unit | Reads about, keywords, trailer, banner presence |
| `update_channel_branding(about, keywords, trailer_video_id)` | `channels.update` | 50 units | |
| `upload_banner(image_path)` | `channelBanners.insert` | 50 units | |
| `list_sections()` / `upsert_section(...)` | `channelSections.list/insert/update` | 50 units | |
| `list_playlists()` / `upsert_playlist(...)` | `playlists.list/insert/update` | 50 units | |
| `check_status()` | wraps `get_channel_branding()` + `list_sections()` | 2 units | Cheap gate check, see below |

Default daily quota (10,000 units) comfortably covers this usage (~100 free searches/day,
channel-setup runs are infrequent).

## `/video-seo <slug>` flow

1. **Phase 0 — Locate video.** Same as current `youtube-publisher`: read `videos.json`,
   script, timestamps, notes, channel profile, confirm rendered MP4 exists.
2. **Phase 0.5 — Channel setup gate.** Call `youtube_channel.check_status()`. Checklist:
   about non-empty, keywords present, trailer configured, ≥1 channel section, banner
   uploaded. If anything is missing: **STOP**, print exactly what's missing, suggest
   running `/channel-setup`. Do not proceed to upload.
   - If the API call itself fails (expired token, permission error): gate fails **closed**
     (blocks upload), asks the user to re-authenticate. Never uploads in a degraded mode.
3. **Phase 1 — Hot Dog demand check.** Derive 1-3 candidate search phrases from the video
   topic. Call `search_videos()` for each. Compute views/subscriber ratio for results from
   channels <100k subs. If a phrase has ratio ≥5:1 → proven search demand.
   - If `search_videos` errors, returns empty, or quota is exhausted: do not block. Fall
     back to narrative-only title generation and log `"SEO fallback: sin datos de
     demanda"`.
4. **Phase 2 — Title decision (hybrid, per-video).**
   - Demand proven → keyword-front title (Moneyball): searched phrase at the very start +
     narrative hook appended at the end.
   - No proven demand → current narrative approach (Ecomonos contrarian thesis), unchanged
     from today's `youtube-publisher` logic.
5. **Phase 3 — Description + tags.** Existing description structure (hook paragraph +
   chapters + CTAs) unchanged, but must naturally include the identified keyword(s) 2-4
   times (no stuffing). New: generate a tag list (primary keyword + variants + broad niche
   tags).
6. **Phase 4 — HITL review.** Present title/description/tags/thumbnail for approval,
   unchanged from today's gate.
7. **Phase 5 — Upload.** Via `upload_youtube.py` (now passing tags too) + set thumbnail,
   unchanged from today.

## `/channel-setup` flow

Two modes, auto-detected by calling `check_status()` first:

- **Setup mode** (channel missing elements): generate proposed about/keywords/trailer
  choice/sections/playlists text, and if no banner exists, offer to generate one via the
  Higgsfield MCP already available in this environment. Present full proposal, get HITL
  approval, then apply via `youtube_channel.py` calls.
- **Audit mode** (channel already has branding applied): read current state via
  `get_channel_branding()` + `list_sections()` + `list_playlists()`, compare against the
  best-practice checklist (absorbed from `channel-audit` Agent A + `seo-framework.md`),
  show a diff of current vs. proposed, get HITL approval per changed field, apply.

In both modes: **never write to the channel without explicit HITL confirmation** of the
diff being applied.

## `agentic-channel-analytics/reference/seo-framework.md` (new reference doc)

Documents:
- The Moneyball method (keyword-front title + narrative hook) and when to use it vs. the
  existing Ecomonos contrarian-thesis approach — the hybrid decision rule from Phase 2
  above.
- The Hot Dog method (≥5:1 view/subscriber ratio on <100k-subscriber channels as a search-demand
  signal), including the quota-cost caveat.
- Tag generation rules (primary keyword + variants + broad niche tags, no stuffing).
- Channel-level packaging best practices absorbed from `channel-audit` Agent A (about,
  keywords, sections, playlists, trailer, banner).

## Removed / superseded

- `.claude/skills/youtube-publisher/` → replaced by `.claude/skills/video-seo/`.
- `channel-audit`'s Agent A (packaging) responsibilities move into `channel-setup`
  (audit mode). `channel-audit`'s Agent B (content-formula/10 levers) is untouched and
  stays in `channel-audit`/`channel-formula`.

## Testing / verification plan

1. Exercise `youtube_channel.py` read-only functions first (`search_videos`,
   `get_channel_branding`, `check_status`) against the real channel before wiring any
   write (`update`/`insert`) call.
2. Before any real branding/section/playlist write, show a diff (current vs. proposed)
   and require explicit HITL confirmation — no silent writes, ever.
3. Final verification: run `/channel-setup` in audit mode against the real channel once
   and confirm the checklist reaches all-green; then run `/video-seo` on a test video and
   confirm the gate passes without blocking.
