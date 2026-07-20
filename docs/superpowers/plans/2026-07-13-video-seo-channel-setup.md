# Video SEO + Channel Setup Agents Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/video-seo` (replaces `/youtube-publisher`) and `/channel-setup` (new), two
skills that generate + apply real YouTube SEO and channel branding via the YouTube Data
API v3, replacing the current text-only recommendations.

**Architecture:** A shared Python module `scratch-yt/youtube_channel.py` wraps the
YouTube Data API v3 (search, channel branding, banner, sections, playlists) reusing the
existing OAuth credentials. `/video-seo` calls it to gate uploads on channel-setup
completeness and to run the Hot Dog demand check before deciding a title strategy.
`/channel-setup` calls it to read/diff/apply channel branding. `channel-audit` is trimmed
to drop the packaging surface it no longer owns.

**Tech Stack:** Python 3.9 (`scratch-yt/.venv`), `google-api-python-client`,
`google-auth-oauthlib` (already installed), stdlib `unittest`/`unittest.mock` for tests
(no new dependency).

## Global Constraints

- Reuse `scratch-yt/client_secret.json` + `scratch-yt/token.json` — scope is already
  `https://www.googleapis.com/auth/youtube` (full access), no re-authorization needed.
- Never write to the real channel/video without explicit HITL confirmation of a shown
  diff — this is enforced at the SKILL.md level, not in the Python module.
- `search_videos` costs 100 quota units/call; channel read calls (`channels.list`,
  `channelSections.list`, `playlists.list`) cost 1 unit; write calls (`channels.update`,
  `channelBanners.insert`, `channelSections.insert/update`, `playlists.insert/update`)
  cost 50 units. Default daily quota is 10,000 units.
- All committed code/config lives in git (this repo is not gitignored at the top level);
  `scratch-yt/client_secret.json` and `token.json` stay gitignored as they already are.
- Conversational replies follow the user's language (Spanish); SKILL.md/docs are English
  per this repo's existing convention (see `youtube-publisher/SKILL.md`,
  `channel-audit/SKILL.md`).

---

### Task 1: `youtube_channel.py` — auth + read-only functions

**Files:**
- Create: `scratch-yt/youtube_channel.py`
- Test: `scratch-yt/test_youtube_channel.py`

**Interfaces:**
- Produces: `get_service()`, `hot_dog_ratio(views, subscribers) -> float`,
  `search_videos(youtube, query, max_results=10) -> list[dict]` (each dict has
  `video_id`, `title`, `channel_id`, `views`, `subscribers`, `ratio`),
  `get_channel_branding(youtube, channel_id="mine") -> dict`,
  `list_sections(youtube) -> list[dict]`, `list_playlists(youtube) -> list[dict]`,
  `check_status(youtube) -> dict` (`{"ok": bool, "missing": list[str]}`).

- [ ] **Step 1: Write the module**

```python
#!/usr/bin/env python3
"""Shared YouTube Data API v3 helpers for /video-seo and /channel-setup.

Read functions take an already-authenticated `youtube` service object (from
get_service()) so they can be unit tested with a mock in place of a real API call.

CLI usage (read-only commands, safe to run anytime):
    ./.venv/bin/python youtube_channel.py status
    ./.venv/bin/python youtube_channel.py search "highest paying trades jobs"
    ./.venv/bin/python youtube_channel.py branding
    ./.venv/bin/python youtube_channel.py sections
    ./.venv/bin/python youtube_channel.py playlists
"""
import argparse
import json
import os

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/youtube"]
HERE = os.path.dirname(os.path.abspath(__file__))
CLIENT_SECRET = os.path.join(HERE, "client_secret.json")
TOKEN = os.path.join(HERE, "token.json")


def get_service():
    creds = None
    if os.path.exists(TOKEN):
        creds = Credentials.from_authorized_user_file(TOKEN, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN, "w") as f:
            f.write(creds.to_json())
    return build("youtube", "v3", credentials=creds)


def hot_dog_ratio(views, subscribers):
    """View/subscriber ratio used by the Hot Dog demand-validation method.
    Returns 0.0 when subscribers is 0 to avoid a ZeroDivisionError."""
    if subscribers <= 0:
        return 0.0
    return views / subscribers


def search_videos(youtube, query, max_results=10):
    """Search YouTube for `query`, return per-result view/subscriber/ratio data.
    Costs 100 quota units (search.list) + 1 (videos.list) + 1 (channels.list)."""
    search_resp = (
        youtube.search()
        .list(part="snippet", q=query, type="video", maxResults=max_results)
        .execute()
    )
    items = search_resp.get("items", [])
    video_ids = [item["id"]["videoId"] for item in items]
    channel_ids = list({item["snippet"]["channelId"] for item in items})
    if not video_ids:
        return []

    videos_resp = (
        youtube.videos().list(part="statistics", id=",".join(video_ids)).execute()
    )
    views_by_id = {
        v["id"]: int(v["statistics"].get("viewCount", 0))
        for v in videos_resp.get("items", [])
    }

    channels_resp = (
        youtube.channels().list(part="statistics", id=",".join(channel_ids)).execute()
    )
    subs_by_channel = {
        c["id"]: int(c["statistics"].get("subscriberCount", 0))
        for c in channels_resp.get("items", [])
    }

    results = []
    for item in items:
        vid = item["id"]["videoId"]
        cid = item["snippet"]["channelId"]
        views = views_by_id.get(vid, 0)
        subs = subs_by_channel.get(cid, 0)
        results.append(
            {
                "video_id": vid,
                "title": item["snippet"]["title"],
                "channel_id": cid,
                "views": views,
                "subscribers": subs,
                "ratio": hot_dog_ratio(views, subs),
            }
        )
    return results


def get_channel_branding(youtube, channel_id="mine"):
    """Read channel branding settings. Costs 1 quota unit (channels.list)."""
    kwargs = {"part": "brandingSettings,contentDetails"}
    if channel_id == "mine":
        kwargs["mine"] = True
    else:
        kwargs["id"] = channel_id
    resp = youtube.channels().list(**kwargs).execute()
    items = resp.get("items", [])
    if not items:
        raise RuntimeError("No channel found for the authenticated account")
    return items[0]


def list_sections(youtube):
    """List the channel's homepage sections. Costs 1 quota unit."""
    resp = youtube.channelSections().list(part="snippet,contentDetails", mine=True).execute()
    return resp.get("items", [])


def list_playlists(youtube):
    """List the channel's playlists. Costs 1 quota unit."""
    resp = (
        youtube.playlists()
        .list(part="snippet,contentDetails", mine=True, maxResults=50)
        .execute()
    )
    return resp.get("items", [])


def check_status(youtube):
    """Cheap gate check (~3 quota units total). Returns
    {"ok": bool, "missing": [str, ...]}."""
    branding = get_channel_branding(youtube)
    snippet = branding.get("brandingSettings", {}).get("channel", {})
    image = branding.get("brandingSettings", {}).get("image", {})
    sections = list_sections(youtube)

    missing = []
    if not snippet.get("description", "").strip():
        missing.append("about/description")
    if not snippet.get("keywords", "").strip():
        missing.append("channel keywords")
    if not snippet.get("unsubscribedTrailer", "").strip():
        missing.append("trailer for non-subscribers")
    if not sections:
        missing.append("channel sections")
    if not image.get("bannerExternalUrl", "").strip():
        missing.append("banner")

    return {"ok": not missing, "missing": missing}


def _cli():
    p = argparse.ArgumentParser(description="YouTube channel branding + search helpers")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("status")
    sp_search = sub.add_parser("search")
    sp_search.add_argument("query")
    sp_search.add_argument("--max-results", type=int, default=10)
    sub.add_parser("branding")
    sub.add_parser("sections")
    sub.add_parser("playlists")

    args = p.parse_args()
    youtube = get_service()

    if args.cmd == "status":
        print(json.dumps(check_status(youtube), indent=2, ensure_ascii=False))
    elif args.cmd == "search":
        print(
            json.dumps(
                search_videos(youtube, args.query, args.max_results),
                indent=2,
                ensure_ascii=False,
            )
        )
    elif args.cmd == "branding":
        print(json.dumps(get_channel_branding(youtube), indent=2, ensure_ascii=False))
    elif args.cmd == "sections":
        print(json.dumps(list_sections(youtube), indent=2, ensure_ascii=False))
    elif args.cmd == "playlists":
        print(json.dumps(list_playlists(youtube), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    _cli()
```

- [ ] **Step 2: Write the failing tests**

```python
# scratch-yt/test_youtube_channel.py
import unittest
from unittest.mock import MagicMock

from youtube_channel import check_status, hot_dog_ratio, search_videos


class TestHotDogRatio(unittest.TestCase):
    def test_normal_ratio(self):
        self.assertEqual(hot_dog_ratio(1_800_000, 46_000), 1_800_000 / 46_000)

    def test_zero_subscribers_returns_zero(self):
        self.assertEqual(hot_dog_ratio(1000, 0), 0.0)


class TestSearchVideos(unittest.TestCase):
    def test_maps_views_and_subscribers_to_ratio(self):
        youtube = MagicMock()
        youtube.search.return_value.list.return_value.execute.return_value = {
            "items": [
                {
                    "id": {"videoId": "vid1"},
                    "snippet": {"title": "Highest Paying Trades Jobs", "channelId": "ch1"},
                }
            ]
        }
        youtube.videos.return_value.list.return_value.execute.return_value = {
            "items": [{"id": "vid1", "statistics": {"viewCount": "1800000"}}]
        }
        youtube.channels.return_value.list.return_value.execute.return_value = {
            "items": [{"id": "ch1", "statistics": {"subscriberCount": "46000"}}]
        }

        results = search_videos(youtube, "highest paying trades jobs")

        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["views"], 1_800_000)
        self.assertEqual(results[0]["subscribers"], 46_000)
        self.assertAlmostEqual(results[0]["ratio"], 1_800_000 / 46_000)

    def test_no_results_returns_empty_list(self):
        youtube = MagicMock()
        youtube.search.return_value.list.return_value.execute.return_value = {"items": []}

        self.assertEqual(search_videos(youtube, "nonexistent query xyz"), [])


class TestCheckStatus(unittest.TestCase):
    def _mock_youtube(self, snippet, image, sections):
        youtube = MagicMock()
        youtube.channels.return_value.list.return_value.execute.return_value = {
            "items": [
                {
                    "id": "UC123",
                    "brandingSettings": {"channel": snippet, "image": image},
                }
            ]
        }
        youtube.channelSections.return_value.list.return_value.execute.return_value = {
            "items": sections
        }
        return youtube

    def test_fully_configured_channel_is_ok(self):
        youtube = self._mock_youtube(
            snippet={
                "description": "Longevidad sin excusas.",
                "keywords": "longevidad salud habitos",
                "unsubscribedTrailer": "trailerVideoId",
            },
            image={"bannerExternalUrl": "https://example.com/banner.png"},
            sections=[{"id": "s1"}],
        )

        result = check_status(youtube)

        self.assertEqual(result, {"ok": True, "missing": []})

    def test_empty_channel_reports_all_missing(self):
        youtube = self._mock_youtube(snippet={}, image={}, sections=[])

        result = check_status(youtube)

        self.assertFalse(result["ok"])
        self.assertEqual(
            set(result["missing"]),
            {
                "about/description",
                "channel keywords",
                "trailer for non-subscribers",
                "channel sections",
                "banner",
            },
        )


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 3: Run tests to verify they pass**

Run: `cd scratch-yt && ./.venv/bin/python -m unittest test_youtube_channel -v`
Expected: `OK` with 5 tests passed (the module already contains the implementation from
Step 1, so this confirms behavior rather than TDD red/green — that's fine here since the
functions are pure/deterministic wrappers, not behavior under active design).

- [ ] **Step 4: Manual smoke test against the real channel (read-only, safe)**

```bash
cd scratch-yt
./.venv/bin/python youtube_channel.py status
```

Expected: prints a JSON object with `"ok"` and `"missing"` keys reflecting the real
channel's current branding state (first run should show several items missing — that's
correct, it's fixed in Task 4/`/channel-setup`).

- [ ] **Step 5: Commit**

```bash
git add scratch-yt/youtube_channel.py scratch-yt/test_youtube_channel.py
git commit -m "feat(youtube): add read-only channel branding + search API helpers"
```

---

### Task 2: `youtube_channel.py` — write functions (branding, banner, sections, playlists)

**Files:**
- Modify: `scratch-yt/youtube_channel.py`
- Modify: `scratch-yt/test_youtube_channel.py`

**Interfaces:**
- Consumes: `get_channel_branding(youtube)` from Task 1.
- Produces: `update_channel_branding(youtube, about=None, keywords=None,
  trailer_video_id=None) -> dict`, `upload_banner(youtube, image_path) -> str` (banner
  URL), `upsert_playlist(youtube, title, description="", playlist_id=None) -> dict`,
  `upsert_section(youtube, style, section_type, title=None, playlist_ids=None,
  section_id=None) -> dict`.

- [ ] **Step 1: Add the write functions to `youtube_channel.py`**

Add these functions (after `check_status`, before `_cli`):

```python
from googleapiclient.http import MediaFileUpload


def update_channel_branding(youtube, about=None, keywords=None, trailer_video_id=None):
    """Update channel branding fields. Only fields passed (not None) are changed.
    Costs 50 quota units (channels.update) — channels.update replaces the whole
    brandingSettings.channel object, so current values are read first and merged."""
    current = get_channel_branding(youtube)
    channel_snippet = dict(current.get("brandingSettings", {}).get("channel", {}))

    if about is not None:
        channel_snippet["description"] = about
    if keywords is not None:
        channel_snippet["keywords"] = keywords
    if trailer_video_id is not None:
        channel_snippet["unsubscribedTrailer"] = trailer_video_id

    body = {"id": current["id"], "brandingSettings": {"channel": channel_snippet}}
    return youtube.channels().update(part="brandingSettings", body=body).execute()


def upload_banner(youtube, image_path):
    """Upload + set a channel banner. Costs 50 quota units (channelBanners.insert).
    Google recommends 2048x1152px, max 6MB, safe area 1546x423px centered."""
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Banner image not found: {image_path}")
    ext = os.path.splitext(image_path)[1].lower()
    mime = "image/png" if ext == ".png" else "image/jpeg"
    media = MediaFileUpload(image_path, mimetype=mime)
    resp = youtube.channelBanners().insert(media_body=media).execute()
    banner_url = resp["url"]

    current = get_channel_branding(youtube)
    body = {"id": current["id"], "brandingSettings": {"image": {"bannerExternalUrl": banner_url}}}
    youtube.channels().update(part="brandingSettings", body=body).execute()
    return banner_url


def upsert_playlist(youtube, title, description="", playlist_id=None):
    """Create a playlist, or update an existing one if playlist_id is given.
    Costs 50 quota units (playlists.insert or playlists.update)."""
    body = {"snippet": {"title": title, "description": description}}
    if playlist_id:
        body["id"] = playlist_id
        return youtube.playlists().update(part="snippet", body=body).execute()
    return youtube.playlists().insert(part="snippet", body=body).execute()


def upsert_section(youtube, style, section_type, title=None, playlist_ids=None, section_id=None):
    """Create or update a channel homepage section.
    style: "horizontalRow" | "verticalList"
    section_type: e.g. "singlePlaylist", "multiplePlaylists", "recentUploads"
    Costs 50 quota units (channelSections.insert or channelSections.update)."""
    snippet = {"type": section_type, "style": style}
    if title:
        snippet["title"] = title
    body = {"snippet": snippet}
    if playlist_ids:
        body["contentDetails"] = {"playlists": playlist_ids}
    if section_id:
        body["id"] = section_id
        return youtube.channelSections().update(part="snippet,contentDetails", body=body).execute()
    return youtube.channelSections().insert(part="snippet,contentDetails", body=body).execute()
```

- [ ] **Step 2: Add write subcommands to `_cli()`**

Replace the `_cli()` function body with this version (adds four subcommands and their
dispatch branches; read-only subcommands from Task 1 are unchanged):

```python
def _cli():
    p = argparse.ArgumentParser(description="YouTube channel branding + search helpers")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("status")
    sp_search = sub.add_parser("search")
    sp_search.add_argument("query")
    sp_search.add_argument("--max-results", type=int, default=10)
    sub.add_parser("branding")
    sub.add_parser("sections")
    sub.add_parser("playlists")

    sp_update = sub.add_parser("update-branding")
    sp_update.add_argument("--about")
    sp_update.add_argument("--keywords")
    sp_update.add_argument("--trailer-video-id")

    sp_banner = sub.add_parser("upload-banner")
    sp_banner.add_argument("image_path")

    sp_playlist = sub.add_parser("upsert-playlist")
    sp_playlist.add_argument("title")
    sp_playlist.add_argument("--description", default="")
    sp_playlist.add_argument("--playlist-id")

    sp_section = sub.add_parser("upsert-section")
    sp_section.add_argument("style", choices=["horizontalRow", "verticalList"])
    sp_section.add_argument("section_type")
    sp_section.add_argument("--title")
    sp_section.add_argument("--playlist-ids", help="comma-separated playlist IDs")
    sp_section.add_argument("--section-id")

    args = p.parse_args()
    youtube = get_service()

    if args.cmd == "status":
        print(json.dumps(check_status(youtube), indent=2, ensure_ascii=False))
    elif args.cmd == "search":
        print(json.dumps(search_videos(youtube, args.query, args.max_results), indent=2, ensure_ascii=False))
    elif args.cmd == "branding":
        print(json.dumps(get_channel_branding(youtube), indent=2, ensure_ascii=False))
    elif args.cmd == "sections":
        print(json.dumps(list_sections(youtube), indent=2, ensure_ascii=False))
    elif args.cmd == "playlists":
        print(json.dumps(list_playlists(youtube), indent=2, ensure_ascii=False))
    elif args.cmd == "update-branding":
        result = update_channel_branding(
            youtube, about=args.about, keywords=args.keywords, trailer_video_id=args.trailer_video_id
        )
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif args.cmd == "upload-banner":
        print(json.dumps({"banner_url": upload_banner(youtube, args.image_path)}, indent=2))
    elif args.cmd == "upsert-playlist":
        result = upsert_playlist(youtube, args.title, args.description, args.playlist_id)
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif args.cmd == "upsert-section":
        playlist_ids = args.playlist_ids.split(",") if args.playlist_ids else None
        result = upsert_section(
            youtube, args.style, args.section_type, args.title, playlist_ids, args.section_id
        )
        print(json.dumps(result, indent=2, ensure_ascii=False))
```

- [ ] **Step 3: Write the failing tests**

Append to `scratch-yt/test_youtube_channel.py`:

```python
from youtube_channel import update_channel_branding, upsert_playlist, upsert_section


class TestUpdateChannelBranding(unittest.TestCase):
    def test_merges_new_fields_without_clobbering_existing(self):
        youtube = MagicMock()
        youtube.channels.return_value.list.return_value.execute.return_value = {
            "items": [
                {
                    "id": "UC123",
                    "brandingSettings": {
                        "channel": {"description": "old about", "keywords": "old kw"}
                    },
                }
            ]
        }
        youtube.channels.return_value.update.return_value.execute.return_value = {"id": "UC123"}

        update_channel_branding(youtube, about="new about")

        call_kwargs = youtube.channels.return_value.update.call_args.kwargs
        sent_channel = call_kwargs["body"]["brandingSettings"]["channel"]
        self.assertEqual(sent_channel["description"], "new about")
        self.assertEqual(sent_channel["keywords"], "old kw")


class TestUpsertPlaylist(unittest.TestCase):
    def test_insert_when_no_playlist_id(self):
        youtube = MagicMock()

        upsert_playlist(youtube, "Sueño y longevidad")

        youtube.playlists.return_value.insert.assert_called_once()
        youtube.playlists.return_value.update.assert_not_called()

    def test_update_when_playlist_id_given(self):
        youtube = MagicMock()

        upsert_playlist(youtube, "Sueño y longevidad", playlist_id="PL123")

        youtube.playlists.return_value.update.assert_called_once()
        sent_body = youtube.playlists.return_value.update.call_args.kwargs["body"]
        self.assertEqual(sent_body["id"], "PL123")


class TestUpsertSection(unittest.TestCase):
    def test_insert_includes_playlist_ids(self):
        youtube = MagicMock()

        upsert_section(youtube, "horizontalRow", "multiplePlaylists", title="Empieza aquí", playlist_ids=["PL1", "PL2"])

        youtube.channelSections.return_value.insert.assert_called_once()
        sent_body = youtube.channelSections.return_value.insert.call_args.kwargs["body"]
        self.assertEqual(sent_body["contentDetails"]["playlists"], ["PL1", "PL2"])
        self.assertEqual(sent_body["snippet"]["title"], "Empieza aquí")
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scratch-yt && ./.venv/bin/python -m unittest test_youtube_channel -v`
Expected: `OK`, all tests pass (8 total across both task's test classes).

- [ ] **Step 5: Commit**

```bash
git add scratch-yt/youtube_channel.py scratch-yt/test_youtube_channel.py
git commit -m "feat(youtube): add channel branding write functions (banner, sections, playlists)"
```

---

### Task 3: `seo-framework.md` reference doc

**Files:**
- Create: `agentic-channel-analytics/reference/seo-framework.md`

**Interfaces:**
- Consumes: nothing (pure reference doc).
- Produces: referenced by `video-seo/SKILL.md` and `channel-setup/SKILL.md` (Task 4/5).

- [ ] **Step 1: Write the reference doc**

```markdown
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
```

- [ ] **Step 2: Verify no dangling references**

Run: `grep -rn "seo-framework" "/Users/dsanchez/Desktop/Dani Sánchez/Fernan/video-explainer-ia-workflow" --include=*.md`
Expected: only this new file matches (Task 4/5 will add the real references next).

- [ ] **Step 3: Commit**

```bash
git add agentic-channel-analytics/reference/seo-framework.md
git commit -m "docs: add SEO framework reference (Moneyball + Hot Dog methods)"
```

---

### Task 4: `/channel-setup` skill

**Files:**
- Create: `.claude/skills/channel-setup/SKILL.md`

**Interfaces:**
- Consumes: `youtube_channel.py` CLI commands from Tasks 1-2 (`status`, `branding`,
  `sections`, `playlists`, `update-branding`, `upload-banner`, `upsert-playlist`,
  `upsert-section`); `seo-framework.md` checklist from Task 3.

- [ ] **Step 1: Write the skill**

```markdown
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
```

- [ ] **Step 2: Verify cross-references resolve**

Run: `grep -n "seo-framework.md\|update-branding\|upload-banner\|upsert-playlist\|upsert-section" .claude/skills/channel-setup/SKILL.md`
Expected: all commands referenced match function/CLI names defined in
`scratch-yt/youtube_channel.py` from Tasks 1-2 (no typos/renamed commands).

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/channel-setup/SKILL.md
git commit -m "feat(skills): add /channel-setup skill for channel branding setup + audit"
```

---

### Task 5: `/video-seo` skill (replaces `/youtube-publisher`)

**Files:**
- Create: `.claude/skills/video-seo/SKILL.md`
- Delete: `.claude/skills/youtube-publisher/SKILL.md` (and the now-empty
  `.claude/skills/youtube-publisher/` directory)

**Interfaces:**
- Consumes: `youtube_channel.py status` (Task 1), `youtube_channel.py search` (Task 1),
  `seo-framework.md` (Task 3), `scratch-yt/upload_youtube.py` (existing, unchanged).

- [ ] **Step 1: Write the skill**

```markdown
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

- [ ] **Step 2: Delete the old skill**

```bash
git rm .claude/skills/youtube-publisher/SKILL.md
rmdir .claude/skills/youtube-publisher
```

- [ ] **Step 3: Verify cross-references resolve**

Run: `grep -n "youtube_channel.py\|seo-framework.md" .claude/skills/video-seo/SKILL.md`
Expected: all CLI commands referenced (`status`, `search`) match function/CLI names
defined in `scratch-yt/youtube_channel.py`; `seo-framework.md` path matches Task 3's file.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/video-seo/SKILL.md
git commit -m "feat(skills): add /video-seo skill, replaces /youtube-publisher"
```

---

### Task 6: Trim `channel-audit` to drop the packaging surface

**Files:**
- Modify: `.claude/skills/channel-audit/SKILL.md`
- Modify: `agentic-channel-analytics/reference/audit-rubric.md`

**Interfaces:**
- Consumes: nothing new.
- Produces: `channel-audit` now scores content-formula only; packaging findings are
  redirected to `/channel-setup`.

- [ ] **Step 1: Rewrite `channel-audit/SKILL.md`**

```markdown
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
```

- [ ] **Step 2: Rewrite `audit-rubric.md`**

```markdown
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

```
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
```

Findings must be **concrete and channel-specific** — quote the actual sentence and give
the rewrite, never generic advice ("improve your hooks" is banned).
```

- [ ] **Step 3: Verify no stale references remain**

Run: `grep -n "Surface A\|Surface B\|thumbnails\|playlists\|end screen\|channel trailer" .claude/skills/channel-audit/SKILL.md agentic-channel-analytics/reference/audit-rubric.md`
Expected: no matches (all packaging-surface language removed).

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/channel-audit/SKILL.md agentic-channel-analytics/reference/audit-rubric.md
git commit -m "refactor(channel-audit): drop packaging surface, now content-formula only"
```

---

### Task 7: Update project `CLAUDE.md` references

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the skills-are-gitignored note (around line 34-35)**

Find:
```
> Las skills de proyecto (`/channel-formula`, `/channel-audit`, `/script-forge`,
> `/thumbnail-creator`) viven en `.claude/skills/`, que está **gitignored**: NO se
```

Replace with:
```
> Las skills de proyecto (`/channel-formula`, `/channel-audit`, `/script-forge`,
> `/thumbnail-creator`, `/video-seo`, `/channel-setup`) viven en `.claude/skills/`, que
> está **gitignored**: NO se
```

- [ ] **Step 2: Update the pipeline diagram publish reference (around line 44)**

Find:
```
       → thumbnail-creator (PASO 6) → publish
```

Replace with:
```
       → thumbnail-creator (PASO 6) → video-seo/channel-setup → publish
```

- [ ] **Step 3: Update the manual-fallback SEO section (around line 156-160)**

Find:
```
## SEO / metadata de YouTube — paso obligatorio tras CADA vídeo

Ningún vídeo se considera terminado sin su paquete de metadata (título, descripción, tags,
capítulos), aunque la skill `/youtube-publisher` no exista en tu clon. Si no está disponible,
generarlo a mano siguiendo este proceso — no lo omitas ni lo dejes "para luego":
```

Replace with:
```
## SEO / metadata de YouTube — paso obligatorio tras CADA vídeo

Ningún vídeo se considera terminado sin su paquete de metadata (título, descripción, tags,
capítulos), aunque la skill `/video-seo` no exista en tu clon. Si no está disponible,
generarlo a mano siguiendo este proceso — no lo omitas ni lo dejes "para luego". `/video-seo`
también exige que `/channel-setup` se haya corrido antes (gate de packaging del canal) — si
haces esto a mano, revisa igualmente que el canal tenga about/keywords/trailer/secciones/banner
configurados.
```

- [ ] **Step 4: Update the skills reference table (around line 242-246)**

Find:
```
| `/channel-formula` | Extract a YouTube channel's viral DNA into a `channels/<slug>.md` profile |
| `/channel-audit` | Agentic audit of channel page + content vs Ecomonos benchmark, returns P0/P1/P2 fixes |
| `/script-forge` | Generate a pipeline-ready script in a channel's voice (reads `channels/<slug>.md`) |
| `/thumbnail-creator` | Generate thumbnail variants via Higgsfield, score against rubric, HITL selection (PASO 6) |
| `/youtube-publisher <slug>` | Generate optimized metadata (title, description+chapters, tags), HITL review, upload MP4 + thumbnail via YouTube Data API v3, publish |
```

Replace with:
```
| `/channel-formula` | Extract a YouTube channel's viral DNA into a `channels/<slug>.md` profile |
| `/channel-audit` | Agentic audit of channel content formula vs Ecomonos benchmark, returns P0/P1/P2 fixes |
| `/script-forge` | Generate a pipeline-ready script in a channel's voice (reads `channels/<slug>.md`) |
| `/thumbnail-creator` | Generate thumbnail variants via Higgsfield, score against rubric, HITL selection (PASO 6) |
| `/video-seo <slug>` | Hybrid search/narrative title (Moneyball + Hot Dog method), description+chapters, tags, gated on channel setup, HITL review, upload MP4 + thumbnail via YouTube Data API v3, publish |
| `/channel-setup` | Sets up or audits channel packaging (about, keywords, trailer, sections, playlists, banner) via YouTube Data API v3 |
```

- [ ] **Step 5: Verify no stale references remain**

Run: `grep -n "youtube-publisher" CLAUDE.md`
Expected: no matches.

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md skill references for video-seo + channel-setup"
```

---

### Task 8: Add a skills summary to the root `README.md`

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a new section after "Flujo completo" (after line 73/before line 75's cost link)**

Insert this section right after the `📋 Guía detallada:` line and before the `📊 Costes...`
line:

```markdown
## Skills del proyecto (SEO + canal)

Dos skills automatizan el packaging y SEO de YouTube vía la YouTube Data API v3 (sin
pasos manuales en YouTube Studio):

- **`/video-seo <slug>`** — genera el título (híbrido: keyword de búsqueda al frente si
  hay demanda probada — método Hot Dog —, o gancho narrativo si no la hay), descripción
  con capítulos, tags y hashtags para un vídeo del pipeline. Antes de subir, comprueba
  automáticamente que el canal tiene su packaging configurado (`/channel-setup`); si
  falta algo, bloquea la subida y avisa. Sube el vídeo (privado) + miniatura vía API.
- **`/channel-setup`** — configura o audita el packaging del canal: descripción/about,
  keywords, tráiler para no-suscriptores, secciones de la home, playlists y banner. Todo
  vía API, con confirmación humana antes de escribir cualquier cambio real en el canal.

Ambas comparten `scratch-yt/youtube_channel.py` (helpers de la API) y reutilizan las
credenciales OAuth ya configuradas para la subida de vídeos.

> Estas skills viven en `.claude/skills/` (gitignored) — ver `CLAUDE.md` para el listado
> completo y el proceso manual de respaldo si no están disponibles en tu clon.

```

- [ ] **Step 2: Verify the section renders correctly**

Run: `grep -n "^## " README.md`
Expected: the new `## Skills del proyecto (SEO + canal)` heading appears between
`## Flujo completo` and `## Coste por vídeo`.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: document video-seo + channel-setup skills in README"
```
