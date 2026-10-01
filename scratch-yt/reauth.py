# -*- coding: utf-8 -*-
"""Renueva token.json de YouTube. Imprime la URL de consentimiento y espera al callback.

El refresh token caduca cada 7 dias mientras la app OAuth siga en modo "Testing"
en Google Cloud Console. Para que deje de caducar: Pantalla de consentimiento OAuth
-> cambiar estado de publicacion de "Testing" a "En produccion".
"""
import os
import sys

from google_auth_oauthlib.flow import InstalledAppFlow

sys.stdout.reconfigure(encoding="utf-8", line_buffering=True)

HERE = os.path.dirname(os.path.abspath(__file__))
SCOPES = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/yt-analytics.readonly",  # CTR/retención para optimizar
]

flow = InstalledAppFlow.from_client_secrets_file(
    os.path.join(HERE, "client_secret.json"), SCOPES
)
flow.redirect_uri = "http://localhost:8765/"
auth_url, _ = flow.authorization_url(prompt="consent", access_type="offline")

print("ABRE ESTA URL EN EL NAVEGADOR:", flush=True)
print(auth_url, flush=True)
print("Esperando el consentimiento...", flush=True)

flow.run_local_server(port=8765, open_browser=True, authorization_prompt_message="")
with open(os.path.join(HERE, "token.json"), "w", encoding="utf-8") as fh:
    fh.write(flow.credentials.to_json())
print("REAUTH_OK", flush=True)
