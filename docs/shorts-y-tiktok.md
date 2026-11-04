# Shorts y TikTok

## Shorts con el motor (método actual)

Cada Short es un **vídeo propio**, no un recorte del largo:

- Slug `short-<tema>`, carpeta `channel/tecno/videos/short-<tema>/` con `script.md`, `plano.json` y
  `seo.md` (`words.json` sale solo) y **su propia entrada en `videos.json`**:
  ```json
  "short-<tema>": {"manifest_dir": "channel/tecno/videos/short-<tema>",
                   "script": "channel/tecno/videos/short-<tema>/script.md",
                   "audio_static": "short-<tema>.mp3", "fps": 30, "width": 1080, "height": 1920,
                   "background": "#ffffff", "estilo": "motor", "formato": "9:16"}
  ```
- El plano lleva `"formato": "9:16"` y normalmente `"cola": 0.9`. En vertical, los gráficos van en la
  mitad de arriba (y 200-1050), los personajes abajo con escala 0,95 y los bocadillos en y≈1030-1130.
- **Guion:** la primera frase ES el título dicho en voz alta. **~190 palabras con eleven_v4 ≈ 58,5 s**
  (+0,9 s de cola, por debajo de 60 s). Tono llano, sin "..." ni etiquetas de relleno.
- **Qué temas:** pregunta de curiosidad ("¿Qué pasaría si…?", "¿Qué pasa cuando…?"). Nada de sueldos ni
  profesiones (retienen poco y nadie en la competencia lo consigue). Detalle en
  `channel/tecno/shorts_playbook.md` y `channel/tecno/viral_playbook.md`.
- **Mismo flujo que un largo:** voz → `motor_plano.py <slug>` → `--render` → `preflight.py --video <slug>`.
- **Subida manual** con `upload_youtube.py … --category 28 --publish-at <UTC>` (ver
  [publicacion.md](./publicacion.md)). Apunta el ID y la fecha en su `seo.md`.
- Los **largos del motor** llevan `shorts/shorts.json` con `"shorts": []`: así `daily_publish.py` no
  intenta recortarlos con `make_shorts.py`, que necesita imágenes.

Ejemplos: `short-asi-te-roba-un-hacker-la-contrasena`, `short-por-que-la-ia-se-inventa-cosas`.

## TikTok

- Herramientas: `scripts/tiktok_pack.py <slug>` (versión TikTok + texto en `tiktok_inbox/`) y
  `scratch-yt/tiktok_api.py` (Content Posting API oficial: `auth`, `next`, `post`).
- **SEO de TikTok ≠ YouTube:** TikTok se usa como buscador. Primera línea del texto = la keyword (el
  título del Short), luego una frase y 3-5 hashtags concretos (`#aprendeentiktok #tecnologia` + los del
  vídeo). Cierre "SÍGUEME PARA MÁS" en vez de mandar al canal de YouTube.
- **Límites reales de la API:** sin la auditoría de TikTok, todo sale **privado** (`TIKTOK_PRIVACY=SELF_ONLY`);
  la API **no programa horas** (publica al momento), por eso `next` sube un Short por ejecución desde
  las tareas "Tecnomono TikTok 1330" y "2130"; el login de escritorio exige PKCE con SHA256 en hex.
  Registro en `scratch-yt/tiktok_cron.log`.
- `tiktok_inbox/` (local, no va a git) guarda cada Short con su `.txt` para subirlo a mano desde TikTok Studio.

### Estado a 3-nov-2026 (pendiente)

- Las tareas de TikTok **fallan cada día** con `Faltan TIKTOK_CLIENT_KEY / TIKTOK_CLIENT_SECRET en .env`:
  hay que crear la app en developers.tiktok.com, poner las dos claves en `.env` y hacer
  `python scratch-yt/tiktok_api.py auth` una vez.
- `tiktok_api.py next` y `tiktok_pack.py` buscan los Shorts en `<manifest_dir>/shorts_tiktok/shorts.json`,
  que solo crea `make_shorts.py --tiktok` (método heredado). **Los Shorts del motor todavía no entran en la
  automatización de TikTok**: hoy se suben a mano desde `remotion/output/short-<tema>.mp4`.

## Shorts del método heredado

`make_shorts.py` (recortes del largo o guion propio con imágenes de `frames.json`), `publish_shorts.py`
(huecos 13:00 y 21:00 de Madrid, cola en `scratch-yt/shorts_queue.json`) y los subtítulos karaoke siguen
en el repo para los vídeos antiguos. Todas sus reglas están en
[heredado/reglas-metodo-imagenes.md](./heredado/reglas-metodo-imagenes.md).
