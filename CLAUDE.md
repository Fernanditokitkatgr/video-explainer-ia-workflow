# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A production pipeline for YouTube-style explainer videos built with synthetic voice + AI-generated images, assembled in code with Remotion. The repo documents and tooling the workflow; it is not a runtime service.

Full step-by-step process: [VIDEO_EXPLAINER_WORKFLOW.md](./VIDEO_EXPLAINER_WORKFLOW.md). Conversational replies follow the user's language (Spanish); docs stay in their existing language.

## Repo structure

```
SETUP.md            ← arranque + uso del orquestador (LÉELO PRIMERO)
.env.example        ← plantilla de claves (copiar a .env, que es local/gitignored)
videos.json         ← registro de vídeos (composición, naming, playback, rutas)
remotion/           ← Remotion compositions (video assembly + render)
scripts/
  config.py             ← config compartida: lee .env, única fuente de verdad
  orchestrate.py        ← encadena el pipeline + guarda estado (handoff)
  generate_voice.py     ← ElevenLabs (lee de config)
  generate_images.py    ← Higgsfield (lee la receta de frames.json)
  whisper_timestamps.py ← timestamps de audio (--language/--model/--naming)
  validate_assets.py    ← verifica que existen audio + todas las imágenes
agentic-channel-analytics/  ← separate vertical: channel DNA, audits, script generation
  reference/        ← Ecomonos benchmark, formula framework, audit rubric
  channels/         ← per-channel profiles (ecomonos.md, stick-to-the-plan.md, …)
  AUTOMATION-RUNBOOK.md
channel/<canal>/videos/<video>/  ← RECETA por vídeo (va a git):
  script.md · frames.json (timings + prompts) · state.json (progreso) · notes.md
scratch-yt/         ← YouTube Data API upload scripts (Python venv inside)
```

> Las skills de proyecto (`/channel-formula`, `/channel-audit`, `/script-forge`,
> `/thumbnail-creator`) viven en `.claude/skills/`, que está **gitignored**: NO se
> sincronizan entre colaboradores y pueden no existir en un clon nuevo. Trátalas
> como opcionales/locales.

## Pipeline

```
Script → ElevenLabs V3 (voice) → [human review] → Whisper (timestamps)
       → Higgsfield (1 image/segment) → [human review] → Remotion (assemble) → [human review] → MP4
       → thumbnail-creator (PASO 6) → publish
```

- **Script**: very short sentences (1 sentence = 1 image = 1 visual beat), ~63-70 sentences for 2.5 min. Emotion tags in brackets `[tono cercano]` for ElevenLabs V3.
- **Whisper**: `scripts/whisper_timestamps.py` produces per-segment start times. Output files named `seg_NN.png` (e.g. `seg_00.png`, `seg_01.png`).
- **Remotion**: a composition reads a `FRAMES` array mapping `{ file, startSec }` and shows the last image whose `startSec <= currentSec`.
- **SFX + música de fondo** (opcional, capa extra sobre voz + imágenes): ver sección [Audio: SFX y música de fondo](#audio-sfx-y-música-de-fondo) más abajo. No forma parte todavía de `orchestrate.py` (se corre a mano entre `images` y `render`).

### Escribir el guion (storytelling)

- **Con una sola voz narradora y sin subtítulos, NUNCA escribas diálogo con atribución** ("dice X", "responde Y", "pregunta Z"). Con un único narrador no hay forma de que el oyente distinga personajes por la voz — ese patrón confunde en vez de aclarar. Cuenta el mismo hecho/chiste en narración directa de tercera persona (ej. en vez de `¿Con qué barco? —Buen punto.`, escribe `Pero en el puerto solo había canoas, muy lejos de lo necesario`).
- **Hook**: promete el pago final desde la primera frase (ej. "ni la comida de tu nevera, ni el idioma que hablas serían iguales") y resuélvelo literalmente al cierre, con eco del lenguaje de apertura — cierra el bucle narrativo en vez de solo añadir una CTA suelta.
- **Causalidad antes que lista de hechos**: cada sección debe explicar el *por qué* antes de enumerar datos (ej. explicar por qué un escenario es "poco probable" con una prueba concreta, no solo declararlo).
- Emotion tags `[tono ...]` siguen sirviendo para variar la ENTONACIÓN de un mismo narrador (no para fingir personajes distintos).

## Setup (cada colaborador, una vez)

```bash
pip install -r requirements.txt      # requests, python-dotenv, faster-whisper
cp .env.example .env                 # luego rellena ELEVENLABS_API_KEY + HIGGSFIELD_API_KEY
cd remotion && npm install && cd ..
```
El `.env` es **local** (gitignored). Las keys se comparten por canal seguro, NUNCA en git.
Detalle completo en [SETUP.md](./SETUP.md).

## Commands

Orquestador (repo root) — encadena el pipeline y guarda el progreso en `state.json`:
```bash
python scripts/orchestrate.py --video sueno-stick --status     # ¿dónde se quedó?
python scripts/orchestrate.py --video sueno-stick              # completo (con gates HITL)
python scripts/orchestrate.py --video sueno-stick --steps voice,whisper,inject
python scripts/orchestrate.py --video sueno-stick --yes        # sin pausas HITL
```
Pasos: `voice → whisper → inject → images → validate → render`.

Scripts sueltos:
```bash
python scripts/whisper_timestamps.py audio.mp3 --format remotion   # array FRAMES
python scripts/whisper_timestamps.py audio.mp3 --language en --naming seg --ext png
python scripts/validate_assets.py --all                            # valida assets antes de render
```
Idioma, modelo y voz salen del `.env` (config.py); se pueden sobreescribir por CLI.

Remotion (from `remotion/`):
```bash
npm install
npm run dev      # remotion studio at localhost:3000
npm run render   # renders InteresCompuesto → output/video-final.mp4
# render a specific composition:
npx remotion render SuenoStick output/sueno-stick.mp4
```
Render is ~7-10 min for a 2.5-min 1920×1080 video. There are no tests, no lint config, and no `tsconfig.json` checked in.

## Remotion compositions

Three compositions are registered in [Root.tsx](remotion/src/Root.tsx) and present on disk
(Root.tsx está limpio — solo importa estas tres; cualquier nota antigua sobre "7 imports
muertos que rompen la compilación" está **desactualizada**):

| id | file | playback rate | naming | notes |
|---|---|---|---|---|
| `InteresCompuesto` | `InteresCompuesto.tsx` | 1.1× | `0_04.jpg` | rate applied in both `<Audio>` and frame lookup |
| `SuenoStick` | `SuenoStick.tsx` | 1.0× | `seg_NN.png` | "Qué le pasa a tu cuerpo cuando duermes mal" |
| `AyunoIntermitente` | `AyunoIntermitente.tsx` | 1.0× | `M_SS.jpg` | "Ayuno intermitente" — pendiente de imágenes |

Cada `FRAMES` array está entre marcadores `// === FRAMES:START/END ===`; el orquestador
los inyecta automáticamente desde `frames.json` (no editar a mano esa zona).

Image assets live in `remotion/public/<video-name>/` and audio at `remotion/public/<video-name>.mp3`. These are gitignored (`*.mp3`, `*.mp4`, `*.png/jpg`) so a fresh clone has no media; the studio will 404 until you add them. La **receta** (timings + prompts) sí va en git en `frames.json`, así que el medio se regenera/recupera desde las cuentas compartidas (ver SETUP.md).

## Imágenes: el texto que aparezca SIEMPRE en español

El texto en las viñetas (carteles, mapas, rótulos, bocadillos) es bienvenido y útil cuando
ayuda a explicar la escena — **el problema nunca fue el texto en sí, es que `nano_banana_pro`/
`nano_banana_2` (Higgsfield) lo escribe en INGLÉS por su cuenta**, incluso si el prompt pide
español explícitamente. Pedir "escribe esto en español" a secas no es fiable.

- El `style_base` de `frames.json` debe decir, en sustancia: **"cualquier texto, cartel, letrero
  o bocadillo que aparezca en la imagen debe estar en español perfecto. Nunca en inglés. Si no
  estás seguro de poder renderizarlo bien en español, usa solo símbolos/iconos en su lugar."**
  — es decir: texto SÍ, siempre que sea español; solo se evita cuando no se puede garantizar el idioma.
- Para cada escena que necesite texto (nombre de ley, cartel de "SUSCRÍBETE", topónimo, el nombre
  de un imperio/personaje), escríbelo tú mismo en el prompt de esa escena en concreto, en
  mayúsculas y tal cual quieres que salga — cuanto más explícito el prompt, más fiable el resultado.
- Verifica con `Read` (puede abrir imágenes) una muestra de las imágenes generadas antes de dar
  por buena una tanda. Ojo con la sobrecorrección: forzar "sin texto" en escenas que sí lo pedían
  puede perder detalles de personaje/tema importantes (ej. perder que un personaje debía ser
  azteca/inca por quedarse con una figura genérica sin su etiqueta). Revisar con quien pidió el
  vídeo antes de cerrar la tanda.

## Audio: SFX y música de fondo

ElevenLabs tiene un endpoint de **Sound Generation** separado del de voz — misma
`ELEVENLABS_API_KEY`, otro producto (`POST /v1/sound-generation`, body `{text, duration_seconds}`).
Higgsfield NO sirve para esto: `generate_audio` solo hace voz; los modelos de música/SFX
(`sonilo_music`, `mirelo_text_to_audio`) están bloqueados para su pipeline interno de juegos.

- Script: `scripts/generate_sfx.py --video <nombre>`. Lee `channel/<canal>/videos/<video>/sfx.json`:
  - `sfx`: lista de `{file, prompt, startSec, duration, volume}` — efectos puntuales.
  - `music` (opcional): un único clip `{file, prompt, duration, volume}` para loop de fondo.
  - Reanudable (salta los `.mp3` que ya existen). Guarda en `remotion/public/<video>-sfx/`.
- **Límite duro de la API: `duration_seconds` máximo 30s** (probado: 22 y 30 devuelven 200, 60
  devuelve 400). Para música de fondo continua, genera UN clip corto (~20-22s) y haz que
  Remotion lo repita con `<Loop>`, no intentes generar la duración completa del vídeo de una vez.
- **Muchos efectos > pocos genéricos, pero cada uno debe encajar con SU frase concreta.**
  Revisa el texto real de cada segmento (whisper) y elige el sonido para ESE momento — reusar el
  mismo efecto en sitios que no vienen a cuento es el error #1 que los usuarios detectan al oír
  el vídeo. Sí puedes reutilizar el mismo archivo de sonido en varios momentos si el tipo de
  evento se repite (ej. `whoosh_transition.mp3` en cada cambio de escenario), pero revisa que el
  hueco entre dos usos del mismo archivo no sea demasiado corto (parece spam).
- Volumen bajo siempre: música de fondo ~0.08-0.12, SFX de ambiente ~0.09-0.14, acentos puntuales
  (pop cómico, campanita) ~0.15-0.22. Todo por debajo de la voz del narrador.
- En el `.tsx`, cablea el `SFX` array con `<Sequence from={frame}><Audio .../></Sequence>` y la
  música con `<Loop durationInFrames={duracionDelClipEnFrames}><Audio .../></Loop>` — **NO** le
  pases a `Loop` la duración total del vídeo (`durationInFrames` de `useVideoConfig()`): `Loop`
  interpreta ese número como la longitud de UNA iteración, así que si le pasas la duración total
  del vídeo solo suena una vez (la duración real del clip) y luego se queda en silencio el resto.
  Pásale la duración real del clip (`Math.round(MUSIC_CLIP_SECONDS * fps)`) y Loop repite solo
  hasta rellenar el resto automáticamente.

## Adding a new video

1. Añade la entrada en [videos.json](./videos.json) (composición, naming, playback, rutas).
2. `channel/<canal>/videos/<video>/script.md` con el guion (1 frase por línea).
3. Crea `remotion/src/<VideoName>.tsx` modelado en [SuenoStick.tsx](remotion/src/SuenoStick.tsx), con los marcadores `// === FRAMES:START/END ===`, y regístralo en [Root.tsx](remotion/src/Root.tsx).
4. `frames.json` con los prompts de escena (campo `scene`) por imagen.
5. `python scripts/orchestrate.py --video <video>` y deja que el orquestador haga el resto.

## Critical gotchas

- **Use Whisper SEGMENT timestamps, not word timestamps.** Word-level matching gives false positives (`"no"` inside `"años"`). The script returns segments for this reason.
- **A missing image desyncs everything after it.** Because the lookup advances through `FRAMES` by time, one absent file shifts every later frame by +1. Verify the full image set before assembling.
- **Playback rate must be applied in two places (1.1× videos only).** `InteresCompuesto` runs at 1.1×: `playbackRate={1.1}` on `<Audio>` AND `currentSec = (frame / fps) * 1.1` in the frame lookup. Also factor it into `durationInFrames` (`seconds * 30 / 1.1`). Changing one without the other desyncs audio from images. `SuenoStick` uses 1.0× — no multiplier needed.
- **Si además hay una capa de SFX posicionada por `<Sequence from={frame}>`, ese `frame` TAMBIÉN hay que dividirlo por `PLAYBACK_RATE`** (`Math.round((startSecOriginal / PLAYBACK_RATE) * fps)`), igual que el lookup de `FRAMES`. Si no, los SFX quedan desincronizados en cuanto el rate no es 1.0 — no falla de forma visible al renderizar, solo suena tarde/pronto.
- **Al regenerar imágenes para un guion reescrito, usa un prefijo de versión en los nombres de archivo** (ej. `v3_0_15.jpg`) en vez de dejar que el naming por timestamp (`M_SS.jpg`) reutilice nombres de una tanda anterior. Dos guiones distintos pueden producir el mismo `M_SS.jpg` para contenido totalmente distinto — como `generate_images.py`/la generación manual hacen skip-if-exists, sin prefijo se reusaría en silencio la imagen VIEJA equivocada. No borres las imágenes antiguas para "limpiar": son coste ya pagado y el auto-mode bloquea el borrado masivo por buen motivo.

## Agentic channel analytics vertical

A separate toolkit in `agentic-channel-analytics/` that produces scripts and audits channels. Its output (pipeline-ready scripts) feeds the Remotion pipeline above. The gold-standard benchmark is **@ecomonos** (profile in `channels/ecomonos.md`; formula in `reference/`).

Project skills (invoke with `/skill-name` after restarting Claude Code):

| Skill | When to use |
|---|---|
| `/channel-formula` | Extract a YouTube channel's viral DNA into a `channels/<slug>.md` profile |
| `/channel-audit` | Agentic audit of channel page + content vs Ecomonos benchmark, returns P0/P1/P2 fixes |
| `/script-forge` | Generate a pipeline-ready script in a channel's voice (reads `channels/<slug>.md`) |
| `/thumbnail-creator` | Generate thumbnail variants via Higgsfield, score against rubric, HITL selection (PASO 6) |

Skills require a restart to register after first creation. If `/skill-name` isn't available yet, open `.claude/skills/<name>/SKILL.md` and follow it manually. **Ojo:** `.claude/` está gitignored, así que estas skills NO se sincronizan por git — pueden no existir en un clon nuevo.

YouTube data input: YouTube blocks scraping behind a consent wall — skills work with pasted data (channel URL, video titles + views, transcripts, optional Studio retention/CTR exports).

## Cost / capacity reference

Imágenes (lo que domina el coste). Verificado vía preflight `get_cost` en Higgsfield (jun 2026):
`nano_banana_pro` = **2 créditos/imagen a 1K y a 2K**, 4 a 4K (el "2K ilimitado" depende del plan;
en el plan `ultimate` probado NO aplicaba). Para ~62 imágenes → ~124 créditos.

Alternativas por API directa para esas 62 imágenes (si faltan créditos):
- Gemini 3 Pro Image (= nano banana pro), 2K: ~$8.3 · Gemini 2.5 Flash Image: ~$2.4 (más barato, modelo más ligero)
- OpenAI `gpt-image-1` alta: ~$15.5 · `gpt-image-1-mini`: ~$3.2

Recomendación: para nano_banana_pro, **recargar Higgsfield (~$4-5) sale más barato y no requiere tocar código** (el pipeline ya habla con Higgsfield). Ver README para el desglose por vídeo.
