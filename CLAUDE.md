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
  whisper_timestamps.py ← timestamps de audio (--language/--model/--naming); nombres de frame únicos
  check_negations.py    ← OBLIGATORIO tras la voz: ¿se comió ElevenLabs algún no/sin/nunca?
                          Contrasta cada descuadre con whisper large-v3 (el pequeño oye "uno" por "no").
                          Si falla: cambiar la frase a una negación fuerte ("nunca", "ninguna") y regenerar.
  competitor_scan.py    ← vídeos de la competencia que se dispararon (multiplicador sobre su mediana)
  validate_assets.py    ← verifica que existen audio + todas las imágenes
  scene_context.py      ← memoria visual AL ESCRIBIR escenas (evita repetir composición)
  scene_diversity_check.py ← GATE de coherencia/variedad ANTES de generar imágenes
channel/<canal>/style-bible.json ← STYLE BIBLE: fuente de verdad del estilo visual
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
       → escribir escenas 1:1 → scene_diversity_check.py (GATE de coherencia/variedad)
       → generate_images_gemini.py (SIEMPRE con imagen de referencia adjunta) → [human review]
       → SFX + música (OBLIGATORIO)
       → preflight.py (GATE: si falla, NO se renderiza) → Remotion → MP4
       → thumbnail-creator (OBLIGATORIO) → video-seo/channel-setup (OBLIGATORIO) → publish
       → thumbnail_text.py (texto por código) → make_shorts.py → publish_shorts.py (OBLIGATORIO, sep-2026)
```

**Antes del guion (desde sep-2026): elegir el TEMA de `channel/tecno/topic_backlog.md`.**
Datos reales del canal: los explicativos buscables ("Así funciona la IA", 1.009 vistas) son lo
único que funciona; las noticias de seguridad IA dieron 0-15 vistas. Mezcla semanal: 4 evergreen
buscables + 2 empleo/sueldo + 1 noticia (solo si es enorme). Cada vídeo debe entenderse SOLO,
sin "en el vídeo anterior…" (el espectador llega desde búsqueda).

```
Por vídeo, al publicar:
  seo.md  ## Título (≤60 chars, keyword primero) · ## Miniatura (texto/resaltar/posicion) · ## Shorts
  python scripts/thumbnail_text.py --video <slug>          # → thumbnail_final.jpg
  python scratch-yt/publish_from_recipe.py --video <slug>  # usa thumbnail_final.jpg y sincroniza cola/videos.json/state.json
  python scripts/make_shorts.py <slug>                     # → shorts/short_N.mp4 (1080x1920, ≤59 s)
  python scratch-yt/publish_shorts.py --video <slug>       # 13:00 y 21:00 Madrid, nunca antes que el largo
  python scratch-yt/publish_shorts.py --pending            # cada día: lo que quedó por cuota
  python scripts/tiktok_pack.py <slug>                     # versión TikTok + texto SEO → tiktok_inbox/
  python scratch-yt/tiktok_api.py next                     # sube a TikTok el siguiente Short que toca
  python scratch-yt/sync_descriptions.py                   # lleva a YouTube los capítulos de seo.md
  scratch-yt/pending_long.txt + daily_publish.py           # tarea "Tecnomono YouTube 0935": sube hasta 2 largos
                                                           # (en orden) y luego Shorts pendientes; si la cuota se
                                                           # agota PARA y conserva lo que falta. Para encolar un
                                                           # vídeo: renderizarlo, pasar preflight y añadir su slug.
```
`## Capítulos` de seo.md se rellena con los tiempos REALES (frames.json `startSec / playback_rate`)
en cuanto hay audio: con un TODO, el vídeo sale sin capítulos (antes de oct-2026 ninguno los tenía).

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

## Estilo visual: la STYLE BIBLE — `channel/tecno/style-bible.json`

**Fuente de verdad única y estructurada del estilo.** Sustituye a los campos sueltos de
`style.json` (que queda solo como log histórico de decisiones y de estilos rechazados).
Todo script que construya `frames.json` o genere imágenes DEBE leerla, nunca copiar sus
valores a mano.

Creada ago-2026 tras detectar los tres problemas que más molestaban al usuario:
**mezcla de estilos dentro de un mismo vídeo**, **deriva del personaje entre escenas** y
**repetición constante de la misma composición** (sobre todo "dos monitos uno al lado del
otro con pequeñas variaciones").

La Style Bible fija, en secciones separadas: `identidad_visual`, `personaje_protagonista`
(con su **imagen de referencia canónica**), `personajes_secundarios`, `paleta`,
`tipo_de_ilustracion`, `nivel_de_detalle`, `reglas_de_composicion`, `elementos_permitidos`,
`elementos_que_deben_evitarse`, `referencias_existentes` y `reglas_de_consistencia_entre_escenas`.

### El objetivo es COHERENCIA DE ESTILO + VARIEDAD DE COMPOSICIÓN

`mismo estilo ≠ misma imagen repetida`. La identidad visual se mantiene estable (personaje,
paleta, trazo, acabado) mientras varía deliberadamente: número de personajes, posición,
acción, expresión, objetos, escenario, perspectiva, distancia de cámara, composición y
metáfora visual.

Reglas duras que salieron de errores reales, todas en `reglas_de_composicion`:

- **`regla_anti_gemelos`** — PROHIBIDO usar "dos monos idénticos uno al lado del otro" como
  recurso por defecto para comparativas. Alternativas a rotar: un solo mono reaccionando a un
  objeto/icono que representa la otra opción, plano dividido puntual, el mono señalando una
  balanza/gráfico, o metáfora visual sin duplicar el personaje.
- **`regla_no_repetir_consecutivo`** — nunca el mismo tipo de plano+composición en 2 escenas
  seguidas; si dos frases del guion son parecidas, cambiar al menos ángulo de cámara u objeto.
- **`distribucion_recomendada_por_cada_20_escenas`** — ningún tipo de plano por encima del
  ~20% del vídeo; máx. 1 split-screen y máx. 2 escenas con dos personajes por cada 20.

### Anclaje del personaje: imagen de referencia OBLIGATORIA

Describir el diseño del personaje **solo en texto no basta: deriva**. Salió un mono con
camiseta azul y otra cara en la cola de un vídeo justo por esto. `generate_images_gemini.py`
adjunta ahora **siempre** la imagen de `personaje_protagonista.imagen_referencia_canonica`
como input multimodal (`types.Part.from_bytes`) en cada llamada. Se puede desactivar con
`--no-ref`, pero solo tiene sentido en escenas sin ningún personaje.

**Antes de generar la tanda completa de un vídeo con CUALQUIER cambio de diseño respecto al
último vídeo aprobado: generar 2-3 muestras con el guion real y pedir confirmación al
usuario.** Un cambio de diseño aplicado a 141 imágenes sin validar se rechazó entero.

`preflight.py` mide además la monotonía de una tanda ya generada con la desviación del brillo
medio entre imágenes (<12 = FAIL). Es un proxy tosco pero objetivo de "todas las imágenes son
iguales", y actúa después; el gate de abajo actúa antes.

## `scene_diversity_check.py` — el gate ANTES de generar imágenes

```bash
python scripts/scene_diversity_check.py --video <video>          # informe legible
python scripts/scene_diversity_check.py --video <video> --json   # para pipelines
```

Corre automáticamente dentro de `generate_images_gemini.py`; si falla, **no se genera nada**
(se puede saltar con `--skip-diversity-check`, pero hay que decir por qué). Responde de forma
objetiva a las partes comprobables del checklist de validación de prompts:

| # | Pregunta | Cómo se comprueba |
|---|---|---|
| 1 | ¿Respeta el estilo seleccionado? | busca palabras que rompen el estilo (`photorealistic`, `3d render`, `gradient`, `shirt`, `glow`…) |
| 4 | ¿Repite demasiado una composición? | clasifica cada escena en un tipo de plano, mide histograma + rachas consecutivas + tope de "dos monos"/split-screen |
| 5 | ¿Objetos con texto sin contenido? | detecta `document`/`plaque`/`screen`/`sign`… sin cifra, sin texto entrecomillado y sin declararse `blank` |
| 6 | ¿Prompt con info suficiente? | marca prompts < 40 chars (riesgo de que el modelo improvise) |
| 7 | ¿Riesgo de cambio de estilo involuntario? | mismo chequeo que el 1 |
| — | ¿Motivo calendario fuera de contexto? | el motivo calendario/hoja arrancada solo vale si la frase habla de días/meses; si no, alucina la palabra "DIAS" |

**Lo que este gate NO puede juzgar** (preguntas 2 y 3 del checklist: coherencia visual real
con las imágenes anteriores, y si la imagen ilustra bien SU frase): eso sigue siendo revisión
con visión —agente o persona— sobre las imágenes ya generadas, igual que `preflight.py` no
puede juzgar la expresividad de la voz. Ver "Las dos capas de control de calidad" arriba.

## `scene_context.py` — memoria visual MIENTRAS se escriben las escenas

El gate de arriba corre cuando las escenas ya están escritas: dice *"te has repetido"*, pero
no evita repetirse. `scene_context.py` es la pieza que actúa **antes**, al escribir la escena
N sabiendo qué se usó en 1..N-1 — el contexto que faltaba cuando cada prompt se escribía de
forma totalmente independiente.

```python
from scene_context import SceneContext
ctx = SceneContext(total_scenes=len(segmentos))   # lee la Style Bible del canal
for texto in segmentos:
    sug = ctx.suggest()      # {'evitar': [...], 'sugerencias': [...], 'racha_actual': N}
    prompt = escribir_escena(texto, sug)
    ctx.record(prompt)       # clasifica y apunta la composición usada
print(ctx.summary())
```

`suggest()` devuelve qué composiciones tocan y cuáles evitar, aplicando: nunca el plano de la
escena anterior, nunca un tipo ya pasado de cupo (`two_characters` >10%, `split_screen` >2%,
resto >20%), y prioriza los tipos menos usados hasta ahora. Cuando lo que hay que evitar es
"dos monos", devuelve además el texto de la `regla_anti_gemelos` como recordatorio.

Usa **la misma función de clasificación** que `scene_diversity_check.py`, así que lo que se
sugiere al escribir y lo que se valida antes de generar hablan exactamente el mismo idioma.

Como CLI audita un vídeo ya escrito y enseña **dónde** empezó a repetirse:

```bash
python scripts/scene_context.py --video hacker-espana-vs-eeuu
```

**Hacker bueno vs hacker malo** (`personajes_secundarios` en la Style Bible): la diferenciación
es **deliberadamente redundante** — color + capucha arriba/abajo + placa sí/no — porque cuando
la única señal era el color, el modelo se equivocaba. Bueno = sudadera azul cielo, capucha
ABAJO, placa colgando. Malo = sudadera negra, capucha ARRIBA, sin placa. Si salen los dos en
la misma escena, describe SIEMPRE las tres señales de cada uno.

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
- **El TEXTO se pone por código, nunca con la IA de imagen** (Gemini inventa letras):
  genera la imagen SIN texto dejando un lado libre (Sara al lado contrario) y luego
  `python scripts/thumbnail_text.py --video <slug>`, que lee de `seo.md`:
  ```
  ## Miniatura
  texto: SE INVENTÓ|UNA PERSONA      ← "|" = salto de línea, 2-4 palabras
  resaltar: PERSONA                  ← en amarillo; el resto en blanco con contorno negro
  posicion: left                     ← left | right | top (lado libre)
  ```
  Sale `thumbnail_final.jpg`, que es la que usa `publish_from_recipe.py` por defecto.
  Una cifra concreta ("80.000 €", "3.700 IAs") rinde más que un adjetivo. Fondo de color > blanco.

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
8. **Título ≤60 caracteres** (en móvil se corta a los ~50): palabra buscada primero ("Qué hace
   un…", "Así funciona…", "Cuánto cobra…") + giro entre paréntesis. Nada de títulos-frase de 90+.
   `publish_from_recipe.py` usa la línea marcada `← recomendado` (o la primera numerada).

## Shorts — paso obligatorio tras CADA vídeo largo (desde sep-2026)

Los Shorts son la vía de descubrimiento para un canal pequeño: cada vídeo largo da **2-4
Shorts** (ver "variedad" más abajo). Se definen en `seo.md`:

```
## Shorts
- titulo: Un AI Engineer casi nunca entrena una IA | gancho: ¿ENTRENA IAs?/NO. | desde: 0_14 | hasta: 0_53
- titulo: ¿Cuánto cobra un AI Engineer en España? | gancho: ¿CUÁNTO COBRA/UN AI ENGINEER? | reveal: 71.000 €/AL AÑO | desde: 4_16
```

- `desde`/`hasta` = clave de frame de `frames.json` (sin `.jpg`); sin `hasta` corta ≤55 s + 3 s de CTA.
- Qué cortar: (1) el GANCHO de los primeros segundos si funciona solo; (2) el bloque más
  jugoso: el **sueldo** en vídeos de empleo, el **giro** en historias. Empieza en frase completa.
- `make_shorts.py`: vertical 1080x1920, subtítulos quemados abajo en bloques de 3 palabras
  (texto del GUION alineado con los tiempos de Whisper → sin errores de transcripción tipo
  "Opinaya"), cierre "VÍDEO COMPLETO EN EL CANAL".

### Estilo de los subtítulos y la fuente (oct-2026)

Fijado tras revisar qué formatos de Short funcionan de verdad (no a ojo):

- **Fuente: Montserrat ExtraBold** (`assets/fonts/Montserrat-ExtraBold.ttf`, instanciada con
  `fonttools.varLib.instancer --update-name-table` desde la variable de Google Fonts, licencia
  OFL — así el repo no depende de que esté instalada en el sistema de cada colaborador). Antes
  se usaba Impact, una fuente de meme/cartel, no de subtítulo: Montserrat es, con diferencia,
  la familia más usada en subtítulos de Shorts/Reels/TikTok (~61% de una muestra de 2 M de
  vídeos analizados por Kapwing), y las fuentes sans-serif bold superan a las decorativas en
  legibilidad móvil. El `.ttf` tiene que traer el family name real en las tablas `name` 1/16
  (`Montserrat ExtraBold`) o libass no la encuentra por `fontsdir`.
- **Subtítulos en estilo KARAOKE, palabra a palabra**: la palabra ya dicha se pone en dorado
  de marca (mismo color que el gancho/remate) y las que faltan por decir en blanco, con
  `\k<centisegundos>` por palabra (ver `karaoke_tags()` en `make_shorts.py`) — no un bloque de
  texto estático. Los subtítulos palabra a palabra retienen más que un bloque fijo: el
  movimiento mantiene la atención y marca el ritmo de lectura solo, sobre todo en contenido
  educativo/explicativo como este canal. Ir frase a frase en bloques de 3-4 palabras (no
  palabra suelta en pantalla) mantiene el contexto legible sin que parpadee demasiado.
  Sources: [OpusClip — Caption & Subtitle Best Practices 2026](https://www.opus.pro/blog/youtube-shorts-caption-subtitle-best-practices),
  [Kapwing — Best Fonts for Subtitles](https://www.kapwing.com/resources/font-for-subtitles/),
  [Rendercut — What Is Karaoke Caption Style](https://rendercut.io/what-is-karaoke-caption-style).

### `gancho` (intriga) vs `reveal` (remate) — regla dura, detectada en QC oct-2026

**El `gancho` es fijo y se ve DESDE EL SEGUNDO 0 durante todo el Short. Por eso NUNCA puede
contener la respuesta, la cifra o el remate** — solo la pregunta o la promesa que engancha
("¿CUÁNTO COBRA UN AI ENGINEER?", no "71.000 €/AL AÑO"). Si el gancho enseña la respuesta
de golpe, el espectador ya no tiene motivo para seguir viendo y el scroll cae en los primeros
segundos.

Cuando el Short SÍ tiene un remate (una cifra, un "sí"/"no", un giro) que se dice en algún
punto del audio, ese texto va en un campo `reveal:` aparte, en el mismo formato `LÍNEA1/LÍNEA2`:

```
- titulo: ... | gancho: ¿CUÁNTO COBRA/UN AI ENGINEER? | reveal: 71.000 €/AL AÑO | desde: 4_16
```

`make_shorts.py` busca automáticamente el momento exacto en que el remate se dice de verdad
en el audio (primero por si el guion usa dígitos, si no por las palabras del remate sin
cifras — "EUROS", "AL", "AÑO" — porque el guion suele escribir los números con letras para
que ElevenLabs los lea bien, "setenta y un mil" en vez de "71.000") y hace aparecer el
`reveal` justo ahí, con un pop, sustituyendo al `gancho` solo desde ese instante. Si no
encuentra el momento, avisa por consola y usa un margen fijo (2,5 s antes del CTA) — revisa
el aviso, normalmente significa que `reveal:` no coincide con ninguna palabra del guion en
ese tramo.

Si generas un `gancho` con una cifra y no hay `reveal:`, el script avisa por consola: revisa
si esa cifra es el remate y, si lo es, muévela a `reveal:`.

### `parte` — Shorts que son una serie (vídeo partido en varios cortes)

Si dos o más Shorts del mismo vídeo son continuación directa unos de otros (el mismo hilo
cortado en trozos, no clips independientes), añade `parte: 1/2`, `parte: 2/2`, etc. Se ve
como una insignia pequeña arriba a la izquierda durante todo el Short, para que quien ve la
"parte 1" sepa que hay más y la "parte 2" se entienda sin haber visto la 1.

```
- titulo: ... (parte 1) | gancho: ... | parte: 1/2 | desde: ... | hasta: ...
- titulo: ... (parte 2) | gancho: ... | parte: 2/2 | desde: ... | hasta: ...
```

No abuses de esto: solo cuando de verdad es la misma historia partida. Para momentos
independientes del mismo vídeo (ver siguiente punto), no lleva `parte`.

### Variedad: más allá de partir el vídeo en dos trozos seguidos

No te limites a cortar "el principio" y "el final" como únicos dos Shorts. Al escribir
`seo.md`, repasa el guion entero buscando **2-4 momentos que funcionen solos**: una cifra
sorprendente, una frase con gancho propio, un giro, una comparación llamativa — repartidos
por el vídeo, no solo al principio y al final. Cada uno es un Short independiente (sin
`parte`), con su propio `gancho` de intriga y, si aplica, su propio `reveal`. Esto da más
variedad de miniaturas/ganchos en el feed de Shorts y más puertas de entrada al vídeo largo
que una simple partición en dos.

- `publish_shorts.py`: agenda propia (`scratch-yt/shorts_queue.json`), huecos 13:00 y 21:00
  Madrid, nunca antes de que salga el largo (+1 h) para que el enlace de la descripción funcione.
  Si salta `quotaExceeded`, para limpio: `--pending` al día siguiente sube lo que falte.

### Velocidad y duración (oct-2026)

- `playback_rate` por defecto **1.25** en los vídeos nuevos (antes 1.2). Medido con Whisper: la
  voz se entiende igual a 1.2-1.35 (97,7-98,4% de palabras), así que se puede subir más.
- Datos propios: los largos de 4-4,5 min retienen 48-50% y los de 6-7 min 26-35%. Objetivo de
  4-5 min de vídeo final (~5.300-5.800 caracteres de narración a 1.25).
- Cambiar la velocidad de un vídeo ya montado (NO subido): `python scripts/set_speed.py <slug> 1.25`
  recalcula capítulos, regenera el .tsx (`scripts/make_tsx.py`), ajusta Root.tsx y borra los Shorts.

### Reglas de viralidad (oct-2026) — detalle y ejemplos en `channel/tecno/viral_playbook.md`

- **El tema manda más que el formato.** "TODOS los X explicados" solo se dispara con personajes
  (hackers, mafias, ciberataques: x6-x19); las listas de hardware del mismo canal se hunden (x0,2-x1).
- **Abre con la escena, no la anuncies.** Nada de "prepárate", "hoy vas a entender" ni
  presentaciones en las 3 primeras líneas. Antes del segundo 15, una escalada ("¿esto es lo peor? No.").
- **Un dato con nombre propio cada 20-30 s y un giro cada ~60 s.**
- **Título con una palabra de tensión** (está en el 41% del top de la competencia frente al 11%
  de los peores). Los números y las MAYÚSCULAS no marcan diferencia.
- **Miniatura: o cuadrícula de 8-10 personajes con etiqueta, o un único elemento con 2-3 palabras.**
  El texto completa el título y NUNCA da la respuesta (mal: "¿EXISTE? NO."). Rotar la emoción de
  Sara y meterla dentro de la escena, no siempre señalando con cara de susto.
- Miniatura de cuadrícula: `seo.md` con `plantilla: A`, `etiquetas: A|B|...` y `cols: 5`, más
  `grid_prompts.json` (un prompt por personaje) → `python scripts/grid_thumbnail.py <slug>`
  (cada casilla se genera aparte para que las etiquetas cuadren; Gemini no alinea una rejilla).
- **Shorts de 30-45 s que dicen el título en la primera frase.** Ninguno de los virales hace bucle.
- **Largos de 4:30-5:30.**

### Qué Shorts y qué títulos (oct-2026): copiado de lo que se disparó en la competencia

Fuente: `scripts/competitor_scan.py` (20 canales, `channel/tecno/competitor_report.md`;
repítelo cada 2-3 semanas con `python scripts/competitor_scan.py`) y nuestros datos de Analytics.
- **Shorts = pregunta de curiosidad** en el `titulo` ("¿Qué pasaría si…?", "¿Qué pasa cuando…?",
  "¿Sabías que…?"), de 30-60 s. En español es lo que más se dispara (CdeCiencia x13-x17,
  Homosapiens x21-x29). Nuestros mejores Shorts son historias raras de IA.
- **Nada de sueldos/profesiones como tema de Short**: retienen 27% y ningún canal tiene éxitos así.
- **Vídeo largo = "TODOS los X explicados en 5 minutos"** (Tecnotipos, 1,8 K subs: x19) o
  **comportamiento raro de la IA contado en 5 min con mascota** (Siliconversations: x17), o
  "cómo funciona X de la IA" (lo que más horas nos da por búsqueda). Duración 5-8 min.
- **Título de largo con misterio/inquietud** ("Lo preocupante viene ahora"), miniatura de 2-4
  palabras y un solo elemento central; para listas, cuadrícula de iconos.
- Cada Short lleva "Vídeo completo: enlace" en la descripción (`publish_shorts.py`). La API de
  YouTube NO permite fijar el "vídeo relacionado" de un Short (comprobado en la referencia de
  `videos`): solo se puede a mano en Studio.

### TikTok (desde oct-2026): los mismos Shorts, con cierre y texto propios

- `make_shorts.py <slug> --tiktok` corta la misma pieza en `shorts_tiktok/`, cambiando solo el
  cierre: "SÍGUEME PARA MÁS COMO ESTE" en vez de "VÍDEO COMPLETO EN EL CANAL" (mandar fuera de
  TikTok suele restar alcance). `scripts/tiktok_pack.py <slug>` lo hace y además escribe el texto.
- SEO de TikTok ≠ YouTube: TikTok se usa como buscador, así que la **primera línea** del texto es
  la keyword (el `titulo` del Short), luego una frase y 3-5 hashtags concretos (los del vídeo +
  `#aprendeentiktok #tecnologia`). Los subtítulos quemados ayudan: TikTok lee el texto en pantalla.
- `scratch-yt/tiktok_api.py` usa la Content Posting API oficial. Límites reales: sin auditoría de
  TikTok, todo sale **privado** (`TIKTOK_PRIVACY=SELF_ONLY`); la API **no programa horas** (publica
  al momento), por eso `next` sube un Short por ejecución y se lanza con el Programador de tareas;
  el login de escritorio exige PKCE con SHA256 en **hex** (no base64url). Se etiqueta `is_aigc`.
- Automático 2 al día: tareas de Windows "Tecnomono TikTok 1330" y "2130" (30 min tras cada
  Short de YouTube, 13:00/21:00) lanzan `scratch-yt/tiktok_next.bat` → `tiktok_api.py next`, que
  sube el Short que salió hoy en YouTube y, si no queda ninguno, uno antiguo. Registro en
  `scratch-yt/tiktok_cron.log`. Requiere el PC encendido a esa hora.
- Mientras no haya auditoría: `tiktok_inbox/` tiene cada Short con su .txt, nombrado por la fecha
  de su Short de YouTube, para subirlo a mano o programarlo desde TikTok Studio.

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

- **OAuth de YouTube caduca cada 7 días** mientras la app siga en modo "Testing" en Google Cloud
  (`invalid_grant: Token has been expired or revoked`). Renovar con `python scratch-yt/reauth.py`
  (abre el navegador). Solución definitiva: publicar la app OAuth en producción.
- **Palabras vetadas por `scene_diversity_check.py`**: `glossy`, `glow` (incluso negadas: "no
  glossy" también falla). Tienden a producir el estilo pulido/3D que rompe el estilo plano.

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

**Regla no negociable (ago-2026): la generación de imágenes de PRODUCCIÓN (la tanda completa
de un vídeo) SIEMPRE se paga con el crédito de Google Cloud vía `scripts/generate_images_gemini.py`
(Vertex AI), nunca con crédito/dinero de Higgsfield.** El MCP de Higgsfield (`mcp__higgsfield__*`)
se usa EXCLUSIVAMENTE para probar/decidir un estilo visual nuevo con un puñado de imágenes de
muestra (como se hizo en ago-2026 para elegir el estilo de `te-han-hackeado-y-no-lo-sabes`,
ver `channel/tecno/style.json` → `estilo_ganador_ago2026`) — una vez decidido el estilo, TODA
la tanda real de un vídeo se genera con Gemini/Vertex, no con Higgsfield. Motivo: Google Cloud
tiene crédito de bienvenida ya asignado a este proyecto que solo se puede gastar en productos
"normales" de Cloud (Vertex AI), no en Higgsfield ni en AI Studio — usar Higgsfield para producción
completa desperdicia ese crédito y gasta dinero real en Higgsfield en su lugar.

Imágenes (lo que domina el coste). Verificado vía preflight `get_cost` en Higgsfield (jun 2026):
`nano_banana_pro` = **2 créditos/imagen a 1K y a 2K**, 4 a 4K (el "2K ilimitado" depende del plan;
en el plan `ultimate` probado NO aplicaba). Para ~62 imágenes → ~124 créditos. Esta cifra es
solo referencia de coste para las pruebas de estilo puntuales, no para decidir el motor de producción.

Alternativas por API directa para esas 62 imágenes:
- Gemini 3 Pro Image (= nano banana pro), 2K: ~$8.3 · Gemini 2.5 Flash Image: ~$2.4 (más barato, modelo más ligero) — **este es el camino de producción real, pagado con crédito de Google Cloud**
- OpenAI `gpt-image-1` alta: ~$15.5 · `gpt-image-1-mini`: ~$3.2 (no usado en este pipeline)

**Gotcha (ago-2026): al pasar un `style_base` de Gemini/Vertex, nunca incluyas un ejemplo
concreto con cifras/palabras literales** (ej. "un cartel con el número '258' y la palabra
'DIAS'") **para ilustrar el estilo** — el modelo lo trata como contenido fijo a dibujar y lo
repite en TODAS las escenas de la tanda, ignorando lo que pida cada `scene` individual. Describe
la REGLA en abstracto ("cuando la escena lo pida, dibuja una cifra grande relacionada con ESA
escena, nunca reutilices cifras de otras escenas") y deja que cada prompt de escena aporte su
propio número/palabra si lo necesita.
