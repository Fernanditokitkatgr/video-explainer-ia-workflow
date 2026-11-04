# Mapa de scripts

Estado a 3-nov-2026, comprobado buscando quién llama a quién. **Ningún script se ha movido de sitio**
(salvo `generate_remotion_tsx.py`, archivado): muchos se importan entre sí por nombre y las tareas
programadas llaman a rutas fijas.

Leyenda: **MOTOR** = se usa en la forma de trabajar actual · **COMÚN** = sirve para los dos métodos ·
**HEREDADO** = solo para vídeos de imágenes · **PROGRAMADO** = lo lanza una tarea de Windows (no mover).

## `scripts/`

| Script | Estado | Para qué |
|---|---|---|
| `motor_plano.py` | MOTOR | Resuelve `plano.json` contra `words.json`, valida, saca fotogramas y capítulos, y renderiza con loudnorm |
| `preflight.py` | COMÚN | Gate antes de render/publicar (`check_plano` si `"estilo": "motor"`) |
| `generate_voice.py` | COMÚN | Voz con ElevenLabs (`--model eleven_v4`); deja un `<audio>.voice.json` que compara `preflight.py` |
| `whisper_timestamps.py` | COMÚN | Tiempos por palabra/segmento; `motor_plano.py` usa su caché de palabras |
| `check_negations.py` | COMÚN | ¿Se comió la voz un no/sin/nunca? (`motor_plano.py --negaciones`) |
| `thumbnail_text.py` | COMÚN | Texto de la miniatura por código, desde `## Miniatura` de `seo.md` |
| `config.py` | COMÚN | Lee `.env` y `videos.json`: única fuente de configuración |
| `gasto.py` | COMÚN · PROGRAMADO (vía `aviso_gasto.ps1`) | Gasto de imágenes y tope de 250 € |
| `aviso_gasto.ps1` | PROGRAMADO | Ventana diaria con el gasto ("Tecnomono aviso gasto") |
| `competitor_scan.py` | COMÚN | Vídeos de la competencia que se dispararon → `channel/tecno/competitor_report.md` |
| `fill_seo_times.py` | HEREDADO | Capítulos y desde/hasta de Shorts desde `frames.json` (el motor usa `--capitulos`) |
| `tiktok_pack.py` | HEREDADO (por ahora) | Versión TikTok de los Shorts de `make_shorts.py` + texto → `tiktok_inbox/` |
| `orchestrate.py` | HEREDADO | Orquestador del método de imágenes (`state.json`) |
| `produce.py` | HEREDADO | Supervisor en ventana aparte (lo lanza `produce.bat` de la raíz) |
| `make_tsx.py` | HEREDADO | Genera el `.tsx` de un vídeo de imágenes y ajusta `remotion/src/Root.tsx` |
| `make_shorts.py` | HEREDADO | Shorts recortados o con guion propio a partir de imágenes del largo |
| `generate_images_gemini.py` | HEREDADO | Imágenes con Gemini/Vertex AI (Google bloqueado) |
| `generate_images.py` | HEREDADO | Imágenes con Higgsfield |
| `image_queue.py` | HEREDADO | Cola de generación de imágenes para varios vídeos |
| `generate_thumbnail.py`, `grid_thumbnail.py` | HEREDADO | Miniaturas con Gemini (sueltas o en cuadrícula) |
| `scene_diversity_check.py`, `scene_context.py` | HEREDADO | Variedad de composición de las escenas de imagen |
| `qc_visual_prep.py` | HEREDADO | Lotes para la revisión visual de imágenes con agentes |
| `check_sara_color.py`, `fix_letterbox.py`, `convert_to_stick.py` | HEREDADO | Arreglos de imágenes generadas |
| `split_segments.py`, `set_speed.py`, `auto_sfx.py` | HEREDADO | Troceo, velocidad y SFX del método de imágenes |
| `generate_sfx.py` | HEREDADO | SFX con ElevenLabs Sound Generation (el motor usa `assets/sfx/motor/`) |
| `generate_subs.py`, `validate_assets.py` | HEREDADO | Subtítulos y validación de imágenes desde `frames.json` |

## `scratch-yt/` (publicación)

| Script | Estado | Para qué |
|---|---|---|
| `daily_publish.py` + `daily_publish.bat` | PROGRAMADO | Sube los largos de `pending_long.txt` y los Shorts pendientes ("Tecnomono YouTube 0935") |
| `tiktok_api.py` + `tiktok_next.bat` | PROGRAMADO | Sube a TikTok el siguiente Short ("Tecnomono TikTok 1330/2130") |
| `publish_from_recipe.py` | COMÚN | Sube un largo con la metadata de `seo.md`, programado |
| `publish_queue.py` | COMÚN | Cola diaria (un largo al día, 19:00 de Madrid) |
| `upload_youtube.py` | COMÚN | Subida base (vídeo, miniatura, `--publish-at`) |
| `reauth.py` | COMÚN | Renueva `token.json` de YouTube |
| `sync_descriptions.py` | COMÚN | Lleva a YouTube los capítulos de `seo.md` |
| `youtube_channel.py` + `test_youtube_channel.py` | COMÚN | Ayudas de la API para las skills `/video-seo` y `/channel-setup`, con sus tests |
| `publish_shorts.py` | HEREDADO | Programa los Shorts de `make_shorts.py` (13:00 y 21:00) |

## Archivado

- `archivo/scripts/generate_remotion_tsx.py`: generador de `.tsx` anterior a `make_tsx.py`. No lo llamaba nada.

## Comprobaciones rápidas

```bash
python -m py_compile scripts/*.py scratch-yt/*.py          # sintaxis de todos los scripts
cd remotion && npm run typecheck:motor                      # tipos del motor
```

(`remotion/` no tiene `tsconfig.json`: Remotion compila con su propio bundler y no lo necesita; por eso
las opciones de `tsc` van en el script `typecheck:motor` de `remotion/package.json`.)
