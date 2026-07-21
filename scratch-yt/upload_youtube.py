#!/usr/bin/env python3
"""Sube un vídeo a YouTube usando OAuth de usuario (modo Testing).

Primer uso: abre el navegador una vez para autorizar con nandiyosan.ai@gmail.com.
Guarda el refresh token en token.json para no repetir el login.

Uso:
    python upload_youtube.py VIDEO.mp4 \
        --title "Mi título" \
        --description "Mi descripción" \
        --tags longevidad,stickman,habitos \
        --thumbnail thumbnail.png \
        --privacy private

privacy: private | unlisted | public   (por defecto: private, para probar sin publicar)

Publicación programada (--publish-at):
    python upload_youtube.py VIDEO.mp4 --title "..." --publish-at 2026-07-22T17:00:00Z

--publish-at acepta un ISO 8601 en UTC. YouTube exige que el vídeo esté en privacyStatus
"private" para poder fijar publishAt (no se puede combinar con --privacy unlisted/public,
ni fijar publishAt sobre un vídeo ya público) — por eso --publish-at fuerza privacy=private
automáticamente y avisa si el usuario pasó otro --privacy explícito. YouTube cambia el vídeo
a público él solo a esa hora exacta: no hace falta ningún proceso corriendo en ese momento,
solo que el upload (con el token OAuth válido) se haya hecho de antemano.
"""
import argparse
import os
import sys
from datetime import datetime, timezone

# Windows console a veces usa cp1252 por defecto y no puede imprimir los emojis de abajo
# (crashea DESPUÉS de que la subida ya haya terminado con éxito) — forzamos UTF-8.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",  # requerido por captions.insert
]
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

    privacy = args.privacy
    if args.publish_at:
        try:
            publish_dt = datetime.fromisoformat(args.publish_at.replace("Z", "+00:00"))
        except ValueError:
            sys.exit(f"--publish-at inválido (usa ISO 8601, ej. 2026-07-22T17:00:00Z): {args.publish_at}")
        if publish_dt <= datetime.now(timezone.utc):
            sys.exit(f"--publish-at debe ser una fecha futura: {args.publish_at}")
        # YouTube exige privacyStatus=private para poder fijar publishAt.
        if args.privacy != "private":
            print(f"⚠️  --publish-at fuerza privacy=private (ignorando --privacy {args.privacy}).")
        privacy = "private"

    youtube = get_service()
    status = {
        "privacyStatus": privacy,
        "selfDeclaredMadeForKids": False,
    }
    if args.publish_at:
        status["publishAt"] = args.publish_at
    body = {
        "snippet": {
            "title": args.title,
            "description": args.description,
            "tags": args.tags.split(",") if args.tags else [],
            "categoryId": args.category,
        },
        "status": status,
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
    if args.publish_at:
        print(f"\n✅ Subido: https://youtu.be/{vid}  (privado, se publicará solo el {args.publish_at})")
    else:
        print(f"\n✅ Subido: https://youtu.be/{vid}  (privacy={privacy})")

    if args.thumbnail:
        set_thumbnail(youtube, vid, args.thumbnail)

    return vid


def set_thumbnail(youtube, video_id, thumbnail_path):
    if not os.path.exists(thumbnail_path):
        print(f"⚠️  Thumbnail no encontrado: {thumbnail_path} — omitiendo.")
        return
    ext = os.path.splitext(thumbnail_path)[1].lower()
    mime = "image/png" if ext == ".png" else "image/jpeg"
    media = MediaFileUpload(thumbnail_path, mimetype=mime)
    youtube.thumbnails().set(videoId=video_id, media_body=media).execute()
    print(f"🖼️  Thumbnail subido: {thumbnail_path}")


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("video", help="ruta al .mp4")
    p.add_argument("--title", required=True)
    p.add_argument("--description", default="")
    p.add_argument("--tags", default="", help="separados por comas")
    p.add_argument("--thumbnail", default="", help="ruta a PNG/JPG (1280×720 mínimo)")
    p.add_argument("--category", default="27", help="27=Educación")
    p.add_argument("--privacy", default="private", choices=["private", "unlisted", "public"])
    p.add_argument("--publish-at", default="", help="ISO 8601 UTC (ej. 2026-07-22T17:00:00Z) — sube privado y YouTube lo publica solo a esa hora")
    upload(p.parse_args())
