# scratch-yt: publicación en YouTube y TikTok

Scripts que suben los vídeos con la **YouTube Data API v3** (OAuth de usuario) y la Content Posting
API de TikTok. El flujo completo, las tareas programadas y los problemas conocidos están en
[docs/publicacion.md](../docs/publicacion.md) y [docs/shorts-y-tiktok.md](../docs/shorts-y-tiktok.md).

> **No muevas ni renombres nada de esta carpeta.** Las tareas de Windows lanzan `daily_publish.bat` y
> `tiktok_next.bat` por su ruta, y los scripts se importan entre sí por nombre.

## Ficheros

| Fichero | Qué es | En git |
|---|---|---|
| `daily_publish.py` / `.bat` | Subida diaria: largos de `pending_long.txt` y Shorts pendientes (tarea "Tecnomono YouTube 0935") | ✅ |
| `publish_from_recipe.py` | Sube un largo con la metadata de su `seo.md`, programado en la cola | ✅ |
| `publish_queue.py` | Cola diaria: un largo al día a las 19:00 de Madrid | ✅ |
| `upload_youtube.py` | Subida base: vídeo, miniatura, `--publish-at` | ✅ |
| `publish_shorts.py` | Programa los Shorts del método heredado (`make_shorts.py`) a las 13:00 y 21:00 | ✅ |
| `sync_descriptions.py` | Lleva a YouTube los capítulos de `seo.md` de vídeos ya subidos | ✅ |
| `reauth.py` | Renueva `token.json` (abre el navegador) | ✅ |
| `youtube_channel.py`, `test_youtube_channel.py` | Ayudas de la API para `/video-seo` y `/channel-setup`, con sus tests | ✅ |
| `tiktok_api.py` / `tiktok_next.bat` | Subida a TikTok (tareas "Tecnomono TikTok 1330/2130") | ✅ |
| `shorts_queue.json` | Agenda de los Shorts del método heredado | ✅ |
| `GUIA-COLABORADOR-YOUTUBE.md` | Cómo crear el proyecto de Google Cloud y el cliente OAuth propio de cada canal | ✅ |
| `pending_long.txt` | Slugs pendientes de subir, uno por línea y en orden | ❌ local |
| `publish_queue.json` | Estado de la cola (qué vídeo va a qué día) | ❌ local |
| `daily_publish.log`, `tiktok_cron.log` | Registros de las tareas programadas | ❌ local |
| `client_secret.json`, `token.json`, `tiktok.token.json` | Credenciales | ❌ secreto |
| `.venv/` | Entorno antiguo con las librerías de Google (las tareas usan `C:\Python313\python.exe`) | ❌ local |

## Uso rápido (desde la raíz del repo)

```bash
python scratch-yt/daily_publish.py --dry-run                       # qué subiría hoy
python scratch-yt/publish_from_recipe.py --video <slug> --dry-run  # metadata que saldría de seo.md
python scratch-yt/publish_queue.py list                            # calendario reservado
python scratch-yt/upload_youtube.py remotion/output/<slug>.mp4 --title "…" --publish-at 2026-11-05T16:00:00Z
python scratch-yt/reauth.py                                        # si sale invalid_grant
```

## Notas

- **Proyecto de Google Cloud** del canal: `yt-automations-500421` (cuenta `nandiyosan.ai@gmail.com`),
  YouTube Data API v3, pantalla de consentimiento en modo *Testing* y cliente OAuth de escritorio.
- En modo *Testing* el token **caduca cada 7 días**. La primera autorización tiene que hacerse en una
  terminal a la vista (abre el navegador), no en segundo plano.
- `publishAt` exige subir en `private`; YouTube publica solo a esa hora, sin ningún proceso encendido.
- Scope `youtube` completo para subir, borrar y poner miniaturas; los subtítulos necesitan además
  `youtube.force-ssl`.
