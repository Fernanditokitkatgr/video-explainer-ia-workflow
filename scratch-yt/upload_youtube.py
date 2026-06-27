#!/usr/bin/env python3
"""Sube un vídeo a YouTube usando OAuth de usuario (modo Testing).

Primer uso: abre el navegador una vez para autorizar con nandiyosan.ai@gmail.com.
Guarda el refresh token en token.json para no repetir el login.

Uso:
    python upload_youtube.py VIDEO.mp4 \
        --title "Mi título" \
        --description "Mi descripción" \
        --tags longevidad,stickman,habitos \
        --privacy private

privacy: private | unlisted | public   (por defecto: private, para probar sin publicar)
"""
import argparse
import os
import sys

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
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


def upload(args):
    if not os.path.exists(args.video):
        sys.exit(f"No existe el vídeo: {args.video}")
    youtube = get_service()
    body = {
        "snippet": {
            "title": args.title,
            "description": args.description,
            "tags": args.tags.split(",") if args.tags else [],
            "categoryId": args.category,
        },
        "status": {
            "privacyStatus": args.privacy,
            "selfDeclaredMadeForKids": False,
        },
    }
    media = MediaFileUpload(args.video, chunksize=-1, resumable=True)
    req = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

    print(f"Subiendo {args.video} ...")
    resp = None
    while resp is None:
        status, resp = req.next_chunk()
        if status:
            print(f"  {int(status.progress() * 100)}%")
    vid = resp["id"]
    print(f"\n✅ Subido: https://youtu.be/{vid}  (privacy={args.privacy})")


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("video", help="ruta al .mp4")
    p.add_argument("--title", required=True)
    p.add_argument("--description", default="")
    p.add_argument("--tags", default="", help="separados por comas")
    p.add_argument("--category", default="27", help="27=Educación")
    p.add_argument("--privacy", default="private", choices=["private", "unlisted", "public"])
    upload(p.parse_args())
