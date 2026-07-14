# SEO Framework — Search-Driven Titling + Channel Packaging

Reference for `/video-seo` and `/channel-setup`. Two axes of discovery exist on YouTube —
**search** (someone types a query) and **browse/suggested** (the algorithm pushes a video
to a passive viewer). This doc covers the search axis; the browse/suggested axis
(contrarian-thesis titles, retention, similes) is covered by
`formula-framework.md` and stays owned by `channel-audit`/`channel-formula`.

## The Moneyball method (title strategy)

A title has two jobs: get found (search) and get clicked (browse/suggested). Most
creators only optimize for the second. The fix: put the searchable keyword at the very
front of the title (guarantees search matches — "getting on base"), then a curiosity hook
at the end (the shot at going viral via browse — "the home run swing").

**Decision rule (per video, hybrid — see below for how demand is measured):**
- **Search demand proven** for a candidate phrase → lead the title with that phrase
  verbatim, append a short hook. Example: `"Highest Paying Trades Jobs Nobody Talks About"`.
- **No proven search demand** → fall back to the existing narrative approach: a
  contrarian-thesis title (lever L4 in `formula-framework.md`), unchanged from today.

Never keyword-stuff — one phrase, placed early, beats five keywords crammed in.

## The Hot Dog method (search-demand validation)

Before committing to a keyword-front title, validate that people are actually searching
for it:

1. Take 1-3 candidate phrases derived from the video's topic.
2. Run `youtube_channel.search_videos(youtube, phrase)` for each — costs 100 quota units
   per call (YouTube Data API v3 `search.list`).
3. For each result, compute the ratio `views / subscribers` (via `hot_dog_ratio`).
4. **A ratio ≥ 5:1 from a channel with < 100,000 subscribers is a demand signal**: the
   video's own audience didn't drive those views — search/suggested did, and the content
   quality didn't need to be exceptional to earn them, which points to the *topic* being
   the driver, not the creator.
5. If at least one candidate phrase clears that bar, use it as the keyword-front title
   lead. If none do, or the API call fails/returns nothing (quota exhausted, no results),
   fall back to the narrative title — never block video publishing on this check.

## Description + tags

- Description keeps its existing hook-paragraph + chapters + CTA structure (see
  `video-seo/SKILL.md`). New: naturally include the winning keyword phrase 2-4 times
  across the description — never stuffed, always readable as prose.
- Tags: 8-12, mixing the primary keyword + close variants (singular/plural, common
  misspellings/phrasing) + broad niche terms. Tags have minimal ranking impact per
  YouTube's own documentation — treat them as categorization, not a primary lever.

## Channel packaging checklist (owned by `/channel-setup`)

Absorbed from `channel-audit`'s former packaging surface — these are the channel-level
elements with a real API execution path, checked by `youtube_channel.check_status()`:

| Element | API field | Why it matters |
|---|---|---|
| About/description | `brandingSettings.channel.description` | First-touch context for both viewers and YouTube's topical classification |
| Channel keywords | `brandingSettings.channel.keywords` | Feeds channel-level topical relevance in search |
| Trailer for non-subscribers | `brandingSettings.channel.unsubscribedTrailer` | First video a cold visitor sees — the channel's own "hook" |
| Channel sections | `channelSections` | Organizes the channel home into curated rows (binge funnels) |
| Playlists | `playlists` | Session-length driver; also feeds sections |
| Banner | `channelBanners` / `brandingSettings.image.bannerExternalUrl` | Visual identity / brand recognition at a glance |

Items with **no API execution path** (thumbnail clarity, end-screen/card setup, visual
identity consistency across thumbnails) are NOT covered here — they remain
`channel-audit` findings (text recommendations only, no automation).
