# scratch-yt — Subida automática a YouTube

Sube los MP4 del pipeline a YouTube vía la **YouTube Data API v3** con OAuth de usuario.
Usa la skill `/video-seo <slug>` para el flujo completo (metadata generada + HITL + upload). Requiere que `/channel-setup` se haya corrido antes (gate de packaging del canal).

## Setup (ya hecho, solo referencia)

- **Proyecto GCP**: `yt-automations-500421` (cuenta `nandiyosan.ai@gmail.com`)
- **API habilitada**: YouTube Data API v3
- **Pantalla de consentimiento OAuth**: modo *Testing*, app "YT Auto", scope `youtube` (full), con `nandiyosan.ai@gmail.com` como usuario de prueba.
- **Credenciales**: OAuth Client tipo *App de escritorio* → `client_secret.json` (gitignored).

## Ficheros

| Fichero | Qué es | En git |
|---|---|---|
| `upload_youtube.py` | Script de subida + thumbnail (OAuth + upload resumible + `--publish-at`) | ✅ |
| `publish_queue.py` | Cola de publicación diaria (siguiente hueco libre 19:00 Europe/Madrid) | ✅ |
| `publish_from_recipe.py` | Parsea `seo.md` del vídeo y publica ya programado, sin copiar/pegar nada a mano | ✅ |
| `publish_queue.json` | Estado de la cola (qué vídeo va a qué día) — se crea solo | ❌ gitignored |
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
  --thumbnail ../remotion/output/video-thumbnail.png \
  --privacy private          # private | unlisted | public
```

- `--privacy private` (por defecto) sube el vídeo oculto para revisarlo antes de publicar.
- `--thumbnail` (opcional) — sube la miniatura automáticamente vía `thumbnails.set()` tras el upload.
- `--category` por defecto `27` (Educación).
- **La primera ejecución abre el navegador para autorizar** — debe correr en terminal/foreground, no en background. Las siguientes reutilizan `token.json`.

## Notas

- **Token de prueba caduca a los 7 días** (limitación del modo Testing). Si falla con `invalid_grant`, borra `token.json` y vuelve a ejecutar para re-autorizar.
- **Scope `youtube` (full)** — necesario para upload + delete + thumbnail. El scope antiguo `youtube.upload` solo permitía subir; si ves 403 en operaciones de gestión, asegúrate de que `SCOPES` en el script sea `youtube` y borra `token.json` para re-autenticar.
- Recrear el entorno: `python3 -m venv .venv && ./.venv/bin/pip install google-api-python-client google-auth-oauthlib google-auth-httplib2`

## Publicación automática con cola diaria (1 vídeo/día a las 19:00)

Flujo pensado para no tener que decidir manualmente cuándo pasar cada vídeo a público, pero
sin quitar el único punto de control humano que de verdad importa: confirmar que el vídeo
está bien ANTES de que sea público.

```
render → /video-reviewer (QC automático: imágenes vs guion, audio/SFX, render)
       → PASS → tú confirmas "sí, publícalo" (el único HITL)
       → publish_from_recipe.py --video <slug> --thumbnail <ruta-elegida>
           1. parsea seo.md (título recomendado + descripción con capítulos + tags)
           2. reserva el siguiente hueco libre en publish_queue.py (19:00 Europe/Madrid,
              nunca dos vídeos el mismo día)
           3. sube el vídeo privado con `publishAt` = ese hueco
       → YouTube publica el vídeo él solo a esa hora exacta
```

**Por qué no hay ningún proceso corriendo a las 19:00**: la YouTube Data API deja subir un
vídeo como `privacyStatus: private` con un campo `publishAt` (ISO 8601), y YouTube lo cambia
a público automáticamente en su lado a esa hora — no depende de que tu máquina, esta sesión,
ni ningún cron estén activos en ese momento. Solo hace falta que el UPLOAD (con token OAuth
válido) se haya hecho de antemano. Verificado contra la
[documentación oficial de `videos.insert`](https://developers.google.com/youtube/v3/docs/videos/insert).

**Requisito real, no automatizable desde aquí**: si `token.json` caducó (7 días, modo
Testing) hace falta reautenticar con login de navegador en foreground — eso lo tienes que
hacer tú, ningún agente puede completarlo sin interacción humana.

```bash
cd scratch-yt
./.venv/bin/python publish_from_recipe.py \
  --video como-funcionan-los-llm \
  --thumbnail ../channel/tecno/videos/como-funcionan-los-llm/thumbnail-variants/variante_a_cerebro_stickfigure.jpg
# añade --dry-run para ver título/descripción/tags parseados sin subir nada
```

Comandos sueltos de la cola (por si hay que auditar/corregir a mano):

```bash
python publish_queue.py list                          # ver qué vídeo va a qué día
python publish_queue.py next                           # próximo hueco libre, sin reservarlo
python publish_queue.py mark-published --video <slug> --video-id <id>   # normalmente lo hace publish_from_recipe.py solo
```
