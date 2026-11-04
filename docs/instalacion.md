# Instalación y primer arranque

Lo que necesita una persona nueva (o un ordenador nuevo) para producir vídeos de Tecnomono con el
**motor de animación**. El método antiguo de imágenes tiene su propia guía en
[heredado/orquestador.md](./heredado/orquestador.md).

## 1. Programas

| Programa | Versión probada | Para qué |
|---|---|---|
| Python | 3.13 (`C:\Python313\python.exe`, el que usan las tareas programadas) | Todos los scripts |
| Node.js | 20 | Remotion (render del motor) |
| ffmpeg | 8.x, en el `PATH` | Loudnorm del render, miniaturas, conversiones |
| Git | — | Versionar la receta de cada vídeo |
| Google Cloud CLI (`gcloud`) | — | Solo para el método heredado de imágenes |

## 2. Dependencias

```bash
pip install -r requirements.txt          # voz, whisper, miniaturas y subida a YouTube
cd remotion && npm install && cd ..      # Remotion 4 + React 19
```

`faster-whisper` descarga su modelo la primera vez que se usa (unos minutos).

## 3. Claves: el archivo `.env`

```bash
cp .env.example .env
```

- **Obligatorio para el motor:** `ELEVENLABS_API_KEY` (y la voz del canal en `ELEVENLABS_VOICE_ID`).
- **TikTok** (opcional): `TIKTOK_CLIENT_KEY` y `TIKTOK_CLIENT_SECRET`; ver [shorts-y-tiktok.md](./shorts-y-tiktok.md).
- Higgsfield y Gemini solo hacen falta para el método heredado.

El `.env` es **local** y está en `.gitignore`. Las claves se pasan por un canal seguro, nunca por
chat ni en un commit. Antes de tocar los ajustes de voz, mira los del `.env` real
(`ELEVENLABS_STABILITY` / `ELEVENLABS_STYLE`): ese archivo manda, no los valores por defecto del código.

## 4. YouTube (una vez por canal y por ordenador)

1. `scratch-yt/client_secret.json`: cliente OAuth de tipo *Escritorio* del proyecto de Google Cloud
   del canal (está en `.gitignore`). Paso a paso en
   [scratch-yt/GUIA-COLABORADOR-YOUTUBE.md](../scratch-yt/GUIA-COLABORADOR-YOUTUBE.md).
2. `python scratch-yt/reauth.py`: abre el navegador, entras con la cuenta dueña del canal y se crea
   `scratch-yt/token.json`. Mientras la app OAuth siga en modo *Testing*, **caduca cada 7 días**.

Más detalle de la publicación en [publicacion.md](./publicacion.md).

## 5. Comprobar que todo funciona

```bash
python scripts/motor_plano.py --hoja                      # renderiza la hoja de personajes del motor
python scripts/motor_plano.py por-que-bitcoin-sube-y-baja  # resuelve y valida un plano real (no renderiza)
python scripts/gasto.py                                    # resumen del gasto de imágenes (debe dar 0 € hoy)
```

Si los tres funcionan, ya puedes seguir [checklist-produccion.md](./checklist-produccion.md).

## 6. Qué va a git y qué no

- **Receta (va a git):** `videos.json`, `scripts/`, `remotion/src/`, y por vídeo
  `channel/tecno/videos/<slug>/` con `script.md`, `plano.json`, `words.json` y `seo.md`.
- **Resultado (no va a git):** `.mp3`, `.mp4`, `.png`, `.jpg`, `remotion/public/` (unos 7 GB del
  método antiguo), `remotion/output/`. Se regenera a partir de la receta.
- **Secretos (nunca a git):** `.env`, `scratch-yt/client_secret.json`, `scratch-yt/token.json`,
  el token de TikTok y `tiktok_inbox/`.
