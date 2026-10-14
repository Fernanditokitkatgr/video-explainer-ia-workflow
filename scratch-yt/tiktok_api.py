#!/usr/bin/env python3
"""Publica los Shorts (versión TikTok) en TikTok con la Content Posting API oficial.

Requisitos (una vez): app en developers.tiktok.com con Login Kit (plataforma Desktop, redirect
http://localhost:3455/callback/) + Content Posting API con Direct Post, scope `video.publish`.
En .env: TIKTOK_CLIENT_KEY y TIKTOK_CLIENT_SECRET.

OJO, límites reales de la API (documentación oficial, oct-2026):
- Mientras la app no pase la auditoría de TikTok, TODO lo publicado queda en privado
  (SELF_ONLY). Tras la auditoría, pon TIKTOK_PRIVACY=PUBLIC_TO_EVERYONE en .env.
- La API no programa publicaciones a una hora: publica al momento. Por eso `next` sube UN
  Short pendiente por ejecución, y se lanza desde el Programador de tareas de Windows.
- El login de escritorio exige PKCE con el SHA256 en HEX (no base64url como dice el RFC).

Uso:
    python tiktok_api.py auth                         # login una vez (abre el navegador)
    python tiktok_api.py next                         # publica el siguiente Short que toca
    python tiktok_api.py post --video <slug> --short short_1.mp4
"""
import argparse
import hashlib
import http.server
import json
import os
import secrets
import sys
import time
import urllib.parse
import webbrowser
from datetime import datetime, timezone
from pathlib import Path

import requests

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parent
sys.path.insert(0, str(REPO_ROOT / "scripts"))
import config  # noqa: E402  (carga .env)

CLIENT_KEY = os.environ.get("TIKTOK_CLIENT_KEY", "")
CLIENT_SECRET = os.environ.get("TIKTOK_CLIENT_SECRET", "")
PRIVACY = os.environ.get("TIKTOK_PRIVACY", "SELF_ONLY")
REDIRECT_PORT = 3455
REDIRECT_URI = f"http://localhost:{REDIRECT_PORT}/callback/"
TOKEN_PATH = HERE / "tiktok.token.json"
API = "https://open.tiktokapis.com/v2"
SHORTS_QUEUE = HERE / "shorts_queue.json"


def require_keys() -> None:
    if not CLIENT_KEY or not CLIENT_SECRET:
        sys.exit("Faltan TIKTOK_CLIENT_KEY / TIKTOK_CLIENT_SECRET en .env")


def save_token(tok: dict) -> None:
    tok["obtained_at"] = int(time.time())
    TOKEN_PATH.write_text(json.dumps(tok, indent=2), encoding="utf-8")


def token_request(data: dict) -> dict:
    r = requests.post(f"{API}/oauth/token/", data={"client_key": CLIENT_KEY, "client_secret": CLIENT_SECRET, **data},
                      headers={"Content-Type": "application/x-www-form-urlencoded"}, timeout=30)
    tok = r.json()
    if "access_token" not in tok:
        sys.exit(f"TikTok rechazó el token: {tok}")
    return tok


def cmd_auth(_args) -> None:
    require_keys()
    verifier = secrets.token_urlsafe(64)[:96]
    state = secrets.token_urlsafe(16)
    params = {
        "client_key": CLIENT_KEY, "response_type": "code", "scope": "user.info.basic,video.publish",
        "redirect_uri": REDIRECT_URI, "state": state,
        "code_challenge": hashlib.sha256(verifier.encode()).hexdigest(), "code_challenge_method": "S256",
    }
    got = {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            got.update({k: v[0] for k, v in q.items()})
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write("TikTok conectado. Ya puedes cerrar esta pestaña.".encode())

        def log_message(self, *_):
            pass

    url = "https://www.tiktok.com/v2/auth/authorize/?" + urllib.parse.urlencode(params)
    print(f"Abre este enlace si no se abre solo:\n{url}")
    webbrowser.open(url)
    with http.server.HTTPServer(("localhost", REDIRECT_PORT), Handler) as srv:
        while "code" not in got and "error" not in got:
            srv.handle_request()
    if got.get("state") != state or "code" not in got:
        sys.exit(f"Login cancelado o inválido: {got}")
    save_token(token_request({"code": got["code"], "grant_type": "authorization_code",
                              "redirect_uri": REDIRECT_URI, "code_verifier": verifier}))
    print(f"TIKTOK_AUTH_OK — token guardado en {TOKEN_PATH.name}")


def access_token() -> str:
    require_keys()
    if not TOKEN_PATH.exists():
        sys.exit("No hay sesión de TikTok: ejecuta primero `python tiktok_api.py auth`")
    tok = json.loads(TOKEN_PATH.read_text(encoding="utf-8"))
    if time.time() > tok["obtained_at"] + tok.get("expires_in", 86400) - 300:
        fresh = token_request({"grant_type": "refresh_token", "refresh_token": tok["refresh_token"]})
        save_token(fresh)
        tok = fresh
    return tok["access_token"]


def api_post(path: str, token: str, body: dict) -> dict:
    r = requests.post(f"{API}{path}", json=body, timeout=60,
                      headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json; charset=UTF-8"})
    data = r.json()
    if data.get("error", {}).get("code") not in (None, "ok"):
        sys.exit(f"TikTok {path} falló: {data['error']}")
    return data.get("data", {})


def publish(slug: str, short_file: str) -> str:
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    tdir = REPO_ROOT / vids[slug]["manifest_dir"] / "shorts_tiktok"
    mp4, txt = tdir / short_file, tdir / short_file.replace(".mp4", ".txt")
    if not mp4.exists() or not txt.exists():
        sys.exit(f"Falta {mp4.name} o su .txt: ejecuta `python scripts/tiktok_pack.py {slug}`")
    token = access_token()

    creator = api_post("/post/publish/creator_info/query/", token, {})
    if PRIVACY not in creator.get("privacy_level_options", []):
        sys.exit(f"Privacidad {PRIVACY} no permitida ahora: {creator.get('privacy_level_options')} "
                 f"(si la app no está auditada, solo vale SELF_ONLY)")

    size = mp4.stat().st_size
    init = api_post("/post/publish/video/init/", token, {
        "post_info": {
            "title": txt.read_text(encoding="utf-8"),
            "privacy_level": PRIVACY,
            "disable_duet": False, "disable_stitch": False, "disable_comment": False,
            "video_cover_timestamp_ms": 1000,
            # Voz e imágenes salen de IA: se etiqueta, como pide TikTok para contenido generado.
            "is_aigc": True,
        },
        "source_info": {"source": "FILE_UPLOAD", "video_size": size, "chunk_size": size, "total_chunk_count": 1},
    })
    r = requests.put(init["upload_url"], data=mp4.read_bytes(), timeout=300, headers={
        "Content-Type": "video/mp4", "Content-Length": str(size), "Content-Range": f"bytes 0-{size - 1}/{size}"})
    if r.status_code not in (200, 201):
        sys.exit(f"Subida a TikTok falló ({r.status_code}): {r.text[:300]}")

    pid = init["publish_id"]
    for _ in range(30):
        st = api_post("/post/publish/status/fetch/", token, {"publish_id": pid})
        status = st.get("status")
        if status in ("PUBLISH_COMPLETE", "FAILED"):
            break
        time.sleep(10)
    if status == "FAILED":
        sys.exit(f"TikTok rechazó la publicación: {st.get('fail_reason')}")

    manifest_path = tdir / "shorts.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    for s in manifest["shorts"]:
        if s["file"] == short_file:
            s["tiktok_publish_id"] = pid
            s["tiktok_posted_at"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
            s["tiktok_privacy"] = PRIVACY
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OK TikTok {slug}/{short_file} ({status}, {PRIVACY}) publish_id={pid}")
    return pid


def next_due() -> tuple[str, str] | None:
    """Qué Short toca subir a TikTok: el mismo que ya salió hoy en YouTube (espejo, en orden de
    hora); si hoy no queda ninguno, el más antiguo que aún no está en TikTok (fondo de armario).
    Nunca uno cuya hora de YouTube no ha llegado."""
    yt = json.loads(SHORTS_QUEUE.read_text(encoding="utf-8")).get("shorts", []) if SHORTS_QUEUE.exists() else []
    when = {(e["video"], e["file"]): e.get("publish_at") or "" for e in yt if e.get("file")}
    vids = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    due = []
    for slug, cfg in vids.items():
        mp = REPO_ROOT / cfg.get("manifest_dir", "") / "shorts_tiktok" / "shorts.json"
        if not mp.exists():
            continue
        for s in json.loads(mp.read_text(encoding="utf-8"))["shorts"]:
            at = when.get((slug, s["file"]))
            if at and at <= now and not s.get("tiktok_publish_id"):
                due.append((at, slug, s["file"]))
    if not due:
        return None
    today = [d for d in due if d[0][:10] == now[:10]]
    return min(today or due)[1:]


def main() -> None:
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("auth")
    sub.add_parser("next")
    post = sub.add_parser("post")
    post.add_argument("--video", required=True)
    post.add_argument("--short", required=True)
    args = p.parse_args()
    if args.cmd == "auth":
        cmd_auth(args)
    elif args.cmd == "post":
        publish(args.video, args.short)
    else:
        nxt = next_due()
        if not nxt:
            print("Nada pendiente para TikTok hoy.")
            return
        publish(*nxt)


if __name__ == "__main__":
    main()
