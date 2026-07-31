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
> `/thumbnail-creator`, `/video-seo`, `/channel-setup`) viven en `.claude/skills/`, que
> está **gitignored**: NO se
> sincronizan entre colaboradores y pueden no existir en un clon nuevo. Trátalas
> como opcionales/locales.

## Pipeline

```
Script → ElevenLabs V3 (voice) → [human review] → Whisper (timestamps)
       → 1 imagen/segmento → [human review] → SFX + música (OBLIGATORIO)
       → preflight.py (GATE: si falla, NO se renderiza) → Remotion → MP4
       → thumbnail-creator (OBLIGATORIO) → video-seo/channel-setup (OBLIGATORIO) → publish
```

### Reglas de producción no negociables

- **UN vídeo al día, nunca en tanda.** Si se piden 3 vídeos, son 3 días distintos (uno por día),
  no 3 subidas seguidas. Se publicaron 3 de golpe una vez y hubo que corregirlo a posteriori.
- **Duración objetivo: 6-7 minutos de vídeo final.** Con `playback_rate` 1.1 eso son ~430-460 s
  de audio bruto, que salen de **~7.800-8.300 caracteres de narración** (medido: 7.795 chars →
  461 s). Guiones de ~4.000 chars dan 3,5 min: demasiado corto, no vale.
- **`scripts/preflight.py` es un gate, no un consejo.** Corre dentro de `orchestrate.py` antes de
  `render` y `step_render` lo vuelve a invocar por si alguien salta el paso con `--steps`.
  Comprueba lo objetivable (música presente, 1 escena por frase sin relleno, ajustes de voz
  coincidentes con `.env`, aspect ratio, FRAMES inyectados, duración, CTA). Si falla, se para.
- **Lo que el gate NO puede juzgar** (y por tanto sigue necesitando persona o agente): si una
  imagen concreta pega con SU frase, si el estilo tiene variedad real, y **la expresividad de la
  voz** — Claude no puede oír el audio, así que ese punto lo valida siempre una persona.

### Las dos capas de control de calidad

| Capa | Herramienta | Qué caza |
|---|---|---|
| 1 · determinista | `scripts/preflight.py` | música ausente, escenas rellenadas, ajustes de voz que no cuadran con el `.env`, aspect ratio, FRAMES desincronizados, duración, CTA a un vídeo ya publicado, tanda monótona (varianza de brillo) |
| 2 · agentes con visión | `scripts/qc_visual_prep.py` + agentes en paralelo | imagen que no ilustra su frase, texto en inglés (`AI` en vez de `IA`), faltas de ortografía, marcas inventadas, fondo oscuro indebido, colores de personaje cambiados, deformidades del dibujo |

**La capa 2 no es opcional.** `preflight.py` dio PASS a una tanda en la que **3 de cada 6**
imágenes eran inservibles: una ilustraba dinero en lugar del rótulo "Capítulo 2", otra rotulaba
`CHICO LISTO AI` en inglés, y otra escribía `LA RESPESTA` y citaba ChatGPT cuando la narración
hablaba de Bing. Ninguno de esos fallos es detectable sin mirar el dibujo, y ninguno lo detecta
un script. Flujo: `qc_visual_prep.py --lotes N` → los agentes revisan sus lotes → recoger los
fallos en un JSON → `qc_visual_prep.py --aplicar fallos.json` (borra las malas) →
`generate_images_gemini.py` (regenera solo las que faltan) → **volver a pasar el QC sobre esas**.

**Gotcha del generador**: en escenas abstractas (rótulos de capítulo, conceptos sin objeto
concreto) el modelo rellena con gráficos de negocio, monedas y flechas de crecimiento que nadie
pidió. La única cosa que lo evita de forma fiable es una restricción explícita y agresiva en el
prompt: *"ONLY a giant numeral 'N' on white and NOTHING ELSE WHATSOEVER. No monkey, no coins,
no arrows, no charts, no icons, no extra words."*

- **Script**: very short sentences (1 sentence = 1 image = 1 visual beat), ~63-70 sentences for 2.5 min. Emotion tags in brackets `[tono cercano]` for ElevenLabs V3.
- **Whisper**: `scripts/whisper_timestamps.py` produces per-segment start times. Output files named `seg_NN.png` (e.g. `seg_00.png`, `seg_01.png`).
- **Remotion**: a composition reads a `FRAMES` array mapping `{ file, startSec }` and shows the last image whose `startSec <= currentSec`.
- **SFX + música de fondo — paso OBLIGATORIO, no opcional.** Ningún vídeo se da por terminado sin esta capa (ver sección [Audio: SFX y música de fondo](#audio-sfx-y-música-de-fondo) más abajo). No forma parte todavía de `orchestrate.py` (se corre a mano entre `images` y `render`), así que no se salta solo porque el orquestador no lo automatice — añádelo siempre antes del render final, igual que la miniatura y el SEO.

### Escribir el guion (storytelling)

- **Con una sola voz narradora y sin subtítulos, NUNCA escribas diálogo con atribución** ("dice X", "responde Y", "pregunta Z"). Con un único narrador no hay forma de que el oyente distinga personajes por la voz — ese patrón confunde en vez de aclarar. Cuenta el mismo hecho/chiste en narración directa de tercera persona (ej. en vez de `¿Con qué barco? —Buen punto.`, escribe `Pero en el puerto solo había canoas, muy lejos de lo necesario`).
- **Hook**: promete el pago final desde la primera frase (ej. "ni la comida de tu nevera, ni el idioma que hablas serían iguales") y resuélvelo literalmente al cierre, con eco del lenguaje de apertura — cierra el bucle narrativo en vez de solo añadir una CTA suelta.
- **Causalidad antes que lista de hechos**: cada sección debe explicar el *por qué* antes de enumerar datos (ej. explicar por qué un escenario es "poco probable" con una prueba concreta, no solo declararlo).
- **Cohesión con conectores que nombran el sujeto**: dentro de una sección NUNCA encadenes datos sueltos tipo ficha ("Dificultad: alta. Sueldo: X."). Usa conectores que renombren el trabajo/sujeto y creen ritmo pregunta→respuesta (ej. "¿Y cómo de difícil es ser *data engineer*? Media, y se aprende sin carrera"). Cada frase le da la mano a la anterior; el bloque debe leerse como algo CONTADO, no como una lista.
- **Estructura fija y repetida entre ítems** (vídeos tipo ranking/lista): define una plantilla de datos por ítem (ej. qué hace → qué necesitas → dificultad → proyecto → sueldo) y respétala en TODOS los ítems, en el mismo orden. El público aprende el patrón y se relaja = retención. Varía las PALABRAS, nunca el orden.
- **Hilo conductor**: escoge una metáfora única que enhebre todo el vídeo (ej. "montamos una IA pieza a pieza: conciencia, comida, ojos, cuerpo, cerebro, jefe") y referénciala en cada transición entre secciones, para que no sea una sucesión de bloques inconexos.
- **Frases muy cortas = un beat visual por frase**: apunta a ~1 imagen cada 3-5 s para que no se sienta estático; frases cortas también hacen que Whisper trocee limpio (1 frase = 1 imagen).
- **Algo accionable por ítem cuando el tema lo permita**: un mini-proyecto que el espectador pueda hacer "este finde" dispara comentarios y guardados (señal fuerte para el algoritmo).
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

## Estilo visual del canal tecno — `channel/tecno/style.json`

**Fuente de verdad única del estilo.** Los scripts que construyen `frames.json` deben leer
`style_base` y `characters` de ahí, NUNCA copiarlo a mano (así no deriva entre vídeos).

Reescrito jul-2026 porque el estilo anterior fue rechazado por repetitivo: navy oscuro
uniforme en todos los planos, mono diminuto en escenas vacías, todo bañado en glow verde,
y el modelo confundía qué mono era cuál. El estilo actual:

- **Fondo BLANCO por defecto.** Solo se usa fondo oscuro cuando la escena lo pide de verdad
  (noche, luces de policía, habitación a oscuras). No por defecto, nunca "porque es hacking".
- **Mono tosco estilo Ecomonos**: contorno negro gordo, colores planos, **ojos enormes**
  redondos y blancos, cara muy exagerada. Sin desenfoque, sin gradientes, sin render 3D.
- **El mono grande en cuadro** (40-60%), no perdido en un plano general.
- **Etiquetas escritas a mano en español con flechas** señalando cosas de la escena
  (`SUELDO LEGAL →`, `¡AY, NO! ¡LA POLICÍA!`). Es firma del canal, no decoración opcional.
- **Props en colores saturados** (amarillo, naranja, rojo, verde) que resalten sobre el blanco.
- **Variedad de plano obligatoria** — ver la lista `framing_variety` del propio `style.json`.

**Hacker bueno vs hacker malo** (`characters` en `style.json`): la diferenciación es
**deliberadamente redundante** — color + capucha arriba/abajo + placa sí/no — porque cuando la
única señal era el color, el modelo se equivocaba. Bueno = sudadera azul cielo, capucha ABAJO,
placa colgando. Malo = sudadera negra, capucha ARRIBA, sin placa. Si salen los dos en la misma
escena, describe SIEMPRE las tres señales de cada uno.

`preflight.py` mide la monotonía de una tanda con la desviación del brillo medio entre imágenes
(<12 = FAIL). Es un proxy tosco pero objetivo de "todas las imágenes son iguales".

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

## Miniatura (thumbnail) — paso obligatorio, no opcional

Todo vídeo lleva su miniatura antes de considerarse terminado, aunque la skill `/thumbnail-creator`
no exista en tu clon (vive en `.claude/skills/`, gitignored). Si no está disponible, generarla
a mano con Higgsfield directamente (`mcp__higgsfield__generate_image`, `nano_banana_pro`,
`aspect_ratio: 16:9`), usando el mismo `style_base`/estilo visual del vídeo para que se reconozca
como parte del canal (ver `agentic-channel-analytics/reference/audit-rubric.md`, check
"Thumbnail clarity"):

- **Máximo ~4 palabras de texto**, en español, en mayúsculas simples, con contorno grueso para
  que se lea a tamaño de móvil.
- **Un único sujeto focal** con expresión clara (sorpresa, shock, determinación) — no una escena
  compleja con muchos personajes pequeños.
- El texto es una **afirmación o pregunta con gancho** (contrarian claim, lever L4), no una
  etiqueta neutra del tema. Ej. para "qué pasaría si Colón no descubre América": `¿SIN AMÉRICA?`,
  no `Colón y América`.
- **Que no sea redundante con el título del vídeo** (si el título ya dice la pregunta completa,
  la miniatura debería aportar la imagen/emoción, no repetir las mismas palabras).
- Genera 2-3 variantes y que la persona que pidió el vídeo elija (HITL) antes de guardarla como
  definitiva — no asumas cuál prefiere.

## SEO / metadata de YouTube — paso obligatorio tras CADA vídeo

Ningún vídeo se considera terminado sin su paquete de metadata (título, descripción, tags,
capítulos), aunque la skill `/video-seo` no exista en tu clon. Si no está disponible,
generarlo a mano siguiendo este proceso — no lo omitas ni lo dejes "para luego". `/video-seo`
también exige que `/channel-setup` se haya corrido antes (gate de packaging del canal) — si
haces esto a mano, revisa igualmente que el canal tenga about/keywords/trailer/secciones/banner
configurados.

1. **Busca antes de titular.** Con `WebSearch`, comprueba qué vídeos ya existen sobre el mismo
   tema/premisa (ej. buscar la frase que piensas usar en el título entre comillas). Si ya hay
   vídeos con un título casi idéntico — es habitual en temas populares —, NO lo copies: mismo
   espacio de búsqueda, título diferenciado. Cita las fuentes que encuentres.
2. **Título**: keyword principal al principio, una sola tesis contraintuitiva (lever L4 de
   `agentic-channel-analytics/reference/formula-framework.md` — afirmación, no etiqueta neutra
   del tema), y da 2-3 variantes (YouTube permite A/B test nativo de título).
3. **Descripción**: 300-500 palabras. Las primeras 2-3 líneas son las que se ven "above the
   fold" antes de "mostrar más" — ahí va la promesa del vídeo, no relleno. Cuerpo con variaciones
   semánticas de la keyword (no repetir la misma frase muchas veces). Cierra con disclaimer si el
   contenido es especulativo/YMYL (lever L10, aterrizaje creíble) y una CTA.
4. **Capítulos**: calcula los timestamps REALES desde `frames.json` (los `startSec` ya están en
   el timeline original; si la composición usa `PLAYBACK_RATE`, divide cada uno entre ese valor
   para obtener el segundo real en el vídeo renderizado). Mínimo 3 capítulos, ≥10s cada uno,
   empezando en 0:00 — no timestamps aproximados a ojo.
5. **Tags**: 15-20, mezcla de keyword principal + variaciones semánticas + términos de la
   entidad/época/tema concretos (nombres propios, fechas, lugares) — no repitas la misma keyword
   con sinónimos triviales.
6. **Hashtags**: máximo 3 en la descripción (los que se muestran sobre el título).
7. Guarda el paquete final en `channel/<canal>/videos/<video>/seo.md` (mismo patrón que
   `script.md`/`notes.md`) para que quede versionado y no se pierda entre sesiones.

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

- **Whisper SEGMENT timestamps solo sirven si el guion garantiza pausas claras entre frases** (frases cortas, ver "1 frase = 1 imagen" arriba). Si no — frases largas, con comas, ElevenLabs v3 hablando fluido —, whisper fusiona 2-3 frases en un solo segmento y eso desincroniza imagen/diálogo en todo el vídeo aunque el render sea técnicamente correcto. Si no estás seguro de que el guion produce 1 segmento por frase, usa `python scripts/whisper_timestamps.py audio.mp3 --resegment-gap 0.35 --format frames`: ignora el agrupamiento de whisper y recorta por huecos de silencio reales a nivel de palabra. Word-level puro (sin este resegment) sigue dando falsos positivos (`"no"` dentro de `"años"`), por eso no es el default.
- **Antes de dar por buena una tanda de imágenes, abre una muestra real con `Read`.** El campo `scene` de `frames.json` es una descripción que TÚ escribiste al pedir la imagen, no una prueba de qué salió generado — puede quedar obsoleta tras un remapeo, o directamente no coincidir (se ha colado alguna imagen de otro proyecto). No des por bueno un match solo por el texto guardado.
- **Al remapear imágenes ya generadas a nuevos timestamps (ej. tras resincronizar), no uses "vecino más cercano" por proporción de índice sin verificar después.** Desplaza el contenido varias posiciones sin que se note hasta que alguien lo mira con atención. Mapea por contenido verificado cuando puedas.
- **NUNCA cuadres el número de escenas repartiéndolas proporcionalmente ni repitiendo la última para rellenar.** Si whisper devuelve N segmentos, hay que escribir N escenas leyendo el texto REAL de cada segmento. Distribuir "a ojo" 193 escenas sobre 203 frames produjo un vídeo entero donde la imagen no correspondía a lo que se estaba diciendo (y era imposible de detectar mirando solo el `frames.json`, porque cada entrada parecía razonable por separado). Rellenar duplicando la escena anterior tiene el mismo efecto y además hace la tanda repetitiva. `preflight.py` falla si detecta escenas idénticas consecutivas por encima del 3%.
- **A missing image desyncs everything after it.** Because the lookup advances through `FRAMES` by time, one absent file shifts every later frame by +1. Verify the full image set before assembling.
- **Playback rate must be applied in two places (1.1× videos only).** `InteresCompuesto` runs at 1.1×: `playbackRate={1.1}` on `<Audio>` AND `currentSec = (frame / fps) * 1.1` in the frame lookup. Also factor it into `durationInFrames` (`seconds * 30 / 1.1`). Changing one without the other desyncs audio from images. `SuenoStick` uses 1.0× — no multiplier needed.
- **Si además hay una capa de SFX posicionada por `<Sequence from={frame}>`, ese `frame` TAMBIÉN hay que dividirlo por `PLAYBACK_RATE`** (`Math.round((startSecOriginal / PLAYBACK_RATE) * fps)`), igual que el lookup de `FRAMES`. Si no, los SFX quedan desincronizados en cuanto el rate no es 1.0 — no falla de forma visible al renderizar, solo suena tarde/pronto.
- **La música de fondo (ElevenLabs Sound Generation) tiene un tope de 30s por clip.** Un loop más corto (ej. 22s) hace un corte audible cada vez que reinicia — en un vídeo de varios minutos son muchos cortes ("entrecortada"). Genera siempre `MUSIC_CLIP_SECONDS` al máximo permitido (30). No elimina el corte del todo (haría falta crossfade), solo reduce cuántas veces se nota.
- **Al regenerar imágenes para un guion reescrito, usa un prefijo de versión en los nombres de archivo** (ej. `v3_0_15.jpg`) en vez de dejar que el naming por timestamp (`M_SS.jpg`) reutilice nombres de una tanda anterior. Dos guiones distintos pueden producir el mismo `M_SS.jpg` para contenido totalmente distinto — como `generate_images.py`/la generación manual hacen skip-if-exists, sin prefijo se reusaría en silencio la imagen VIEJA equivocada. No borres las imágenes antiguas para "limpiar": son coste ya pagado y el auto-mode bloquea el borrado masivo por buen motivo.
- **Los subagentes en background pueden fallar silenciosamente** (límite de gasto de la org u otro corte) y devolver un resumen de texto que describe una tarea que NUNCA se ejecutó ("he lanzado un agente para...", "ya he generado X"). Verifica siempre con `ls`/existencia real de ficheros antes de confiar en el resumen de un agente, sobre todo en tandas grandes de generación de imágenes/audio.
- **`whisper_timestamps.py --resegment-gap` puede alucinar un segmento final falso** sobre el silencio/respiración al final del audio (texto sin sentido, ej. "La acuendación de lo próximo de prosifar..."). No corresponde a ninguna frase real del guion — compara el número de segmentos reales contra las frases del guion y descarta cualquier cola que no encaje antes de generar su imagen.
- **El naming por timestamp (`M_SS.jpg`) puede colisionar entre dos segmentos distintos** que redondean al mismo minuto:segundo (ej. 134.16s y 134.96s → ambos `2_14.jpg`). Compruébalo tras CADA resincronización (`grep -oP "file: '[^']+'" *.tsx | sort | uniq -d`), no solo la primera vez — renombra el segundo con un sufijo (`2_14_b.jpg`) antes de generar imágenes.
- **`nano_banana_pro`/`nano_banana_2` puede ignorar un prompt de escena específico y rellenar el hueco con un diagrama de negocio genérico** (cajas "IDEA/PROCESS/RESULT", ciclos PDCA, gráficos de crecimiento) cuando la escena pedida es muy abstracta/conceptual (ej. "columna de círculos numerados"). Si ves esto en la verificación visual, no lo aceptes: repite el prompt añadiendo una restricción explícita tipo "ONLY this and nothing more: ... no other icons, no diagrams, no business graphics of any kind" — casi siempre lo arregla.
- **NO pases `--stability`/`--style` a `generate_voice.py` "para mejorar la entonación": el `.env` ya está afinado y el override la EMPEORA.** El `.env` del canal está en `ELEVENLABS_STABILITY=0.10` / `ELEVENLABS_STYLE=0.68` (muy expresivo). Los defaults de `config.py` (0.45/0.30) son mucho más conservadores, así que comparando contra ELLOS parece que pasar 0.30/0.55 "sube" la expresividad — y en realidad la baja: sube la estabilidad (menos variación) y baja el style. Así salieron 4 vídeos con voz plana antes de detectarlo. **Comprueba siempre `grep ELEVENLABS .env` antes de asumir la configuración de voz; el `.env` es la fuente de verdad, no los defaults del código ni este documento.** `generate_voice.py` ahora imprime los ajustes efectivos y deja un sidecar `<audio>.voice.json` que `preflight.py` compara contra el `.env` para que una regresión así no vuelva a pasar en silencio.
- Las etiquetas de emoción inline (`[tono curioso]`, `[excited]`, `[ominous]`…) siguen ayudando en los puntos de énfasis, pero por sí solas no compensan unos `voice_settings` mal puestos.
- **La miniatura debe conectar con el título elegido, no ser un gancho genérico desconectado del tema** (ej. si el título es "red neuronal por dentro", el texto de la miniatura debería mencionar "red neuronal", no una pregunta suelta tipo "¿cómo ve esto tu cerebro?" que no se relaciona). Sigue siendo válido no repetir el título palabra por palabra (ver sección Miniatura), pero el concepto central sí debe coincidir.
- **Los créditos de Higgsfield se pueden agotar a mitad de una tanda grande de imágenes.** El `frames.json` con los prompts ya escritos es la fuente de verdad para retomar: no se pierde nada, solo hay que recargar créditos (o conectar otro workspace) y continuar generando las que falten por nombre de archivo.
- **`gemini-3-pro-image-preview` puede agotar su cuota de proyecto A MEDIA TANDA, fallando con 404 en las 4 regiones a la vez** (`global`, `us-central1`, `us-east5`, `europe-west4`) — no confundir con el gotcha de región de más arriba (ese daba 404 solo en regiones concretas con el proyecto teniendo acceso real). Si el 404 aparece de golpe tras N llamadas exitosas y persiste en TODAS las regiones probadas, es cuota agotada, no un problema de acceso — no tiene sentido seguir reintentando esa misma tanda. Salida pragmática: completar las imágenes restantes con `--model flash` (skip-if-exists conserva las ya generadas en Pro) y **dejarlo explícito en el informe de revisión** (`/video-reviewer`), nunca mezclar motores de imagen en silencio sin que quien decide publicar lo sepa.
- **`captions.insert` (subir subtítulos vía API) da 403 `insufficientPermissions` con el scope `youtube` que ya basta para `videos.insert`/`thumbnails.set`.** Hace falta añadir también `https://www.googleapis.com/auth/youtube.force-ssl` a `SCOPES` en `upload_youtube.py` y volver a autenticar (borrar `token.json` si ya existía con el scope antiguo) — si no, la subida de vídeo+miniatura funciona pero los subtítulos fallan silenciosamente al final del pipeline.
- **Cada canal/colaborador necesita su propio proyecto de Google Cloud + cliente OAuth para YouTube**, incluso reutilizando el mismo repo — la app OAuth vive en modo Testing con una lista fija de "usuarios de prueba"; no se puede compartir `client_secret.json` entre cuentas de Google distintas sin añadir cada cuenta a esa lista, y aun así es más limpio que cada canal tenga su propio proyecto aislado. Ver `scratch-yt/GUIA-COLABORADOR-YOUTUBE.md` para el proceso paso a paso.
- **`upload_youtube.py` crasheaba DESPUÉS de subir el vídeo con éxito** por un `UnicodeEncodeError` al imprimir emojis (✅) en una consola Windows con codepage `cp1252` — el vídeo sí se subía, solo fallaba el print de confirmación, lo que puede hacer parecer un fallo total cuando no lo es. Verificar siempre con `youtube.search().list(forMine=True, order='date')` antes de asumir que un traceback significa que la subida no ocurrió. Arreglado con `sys.stdout.reconfigure(encoding="utf-8")` al inicio del script.

## Agentic channel analytics vertical

A separate toolkit in `agentic-channel-analytics/` that produces scripts and audits channels. Its output (pipeline-ready scripts) feeds the Remotion pipeline above. The gold-standard benchmark is **@ecomonos** (profile in `channels/ecomonos.md`; formula in `reference/`).

Project skills (invoke with `/skill-name` after restarting Claude Code):

| Skill | When to use |
|---|---|
| `/channel-formula` | Extract a YouTube channel's viral DNA into a `channels/<slug>.md` profile |
| `/channel-audit` | Agentic audit of channel content formula vs Ecomonos benchmark, returns P0/P1/P2 fixes |
| `/script-forge` | Generate a pipeline-ready script in a channel's voice (reads `channels/<slug>.md`) |
| `/thumbnail-creator` | Generate thumbnail variants via Higgsfield, score against rubric, HITL selection (PASO 6) |
| `/video-seo <slug>` | Hybrid search/narrative title (Moneyball + Hot Dog method), description+chapters, tags, gated on channel setup, HITL review, upload MP4 + thumbnail via YouTube Data API v3, publish |
| `/channel-setup` | Sets up or audits channel packaging (about, keywords, trailer, sections, playlists, banner) via YouTube Data API v3 |

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
