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
