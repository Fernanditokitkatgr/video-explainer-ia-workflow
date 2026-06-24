# scratch-yt — Subida automática a YouTube

Sube los MP4 del pipeline a YouTube vía la **YouTube Data API v3** con OAuth de usuario.

## Setup (ya hecho, solo referencia)

- **Proyecto GCP**: `yt-automations-500421` (cuenta `nandiyosan.ai@gmail.com`)
- **API habilitada**: YouTube Data API v3
- **Pantalla de consentimiento OAuth**: modo *Testing*, app "YT Auto", scope `youtube.upload`, con `nandiyosan.ai@gmail.com` como usuario de prueba.
- **Credenciales**: OAuth Client tipo *App de escritorio* → `client_secret.json` (gitignored).

## Ficheros

| Fichero | Qué es | En git |
|---|---|---|
| `upload_youtube.py` | Script de subida (OAuth + upload resumible) | ✅ |
| `client_secret.json` | Credencial OAuth del proyecto | ❌ gitignored |
| `token.json` | Refresh token de usuario (se crea solo) | ❌ gitignored |
| `.venv/` | Entorno Python con las libs de Google | ❌ gitignored |

## Uso

```bash
cd scratch-yt
./.venv/bin/python upload_youtube.py ../remotion/output/video-final.mp4 \
  --title "Título del vídeo" \
  --description "Descripción..." \
  --tags longevidad,stickman,habitos \
  --privacy private          # private | unlisted | public
```

- `--privacy private` (por defecto) sube el vídeo oculto para revisarlo antes de publicar.
- `--category` por defecto `27` (Educación).
- La primera ejecución abre el navegador para autorizar; las siguientes reutilizan `token.json`.

## Notas

- **Token de prueba caduca a los 7 días** (limitación del modo Testing). Si falla con `invalid_grant`, borra `token.json` y vuelve a ejecutar para re-autorizar.
- **La miniatura NO se sube por API** en esta versión. Súbela manualmente en YouTube Studio (o se añade `thumbnails.set()` al script).
- Recrear el entorno: `python3 -m venv .venv && ./.venv/bin/pip install google-api-python-client google-auth-oauthlib google-auth-httplib2`
