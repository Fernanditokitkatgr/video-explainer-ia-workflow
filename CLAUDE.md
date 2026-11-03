# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## FORMA DE TRABAJAR ACTUAL (desde 3-nov-2026): MOTOR DE ANIMACIÓN

> **Aprobado por el dueño el 3-nov-2026. Es el método POR DEFECTO para TODOS los vídeos nuevos de
> Tecnomono, largos y Shorts.** El método antiguo (imágenes generadas con Gemini/Higgsfield +
> Ken Burns con `make_tsx.py`, `frames.json`, `make_shorts.py`) queda **HEREDADO**: sirve para
> mantener o entender los vídeos antiguos, no para hacer vídeos nuevos. Las secciones de más abajo
> marcadas **HEREDADO** son de ese método; lo que diga esta sección manda sobre ellas.

### Qué es

- Todo se **dibuja por código** (SVG/CSS) en `remotion/src/motor/`: personajes (el mono stick
  cutre y sus amigos), escenas gráficas, fondo de rayos con cortinilla de color y efectos de sonido.
  **Cero imágenes generadas.** El aspecto "cutre" sale de tres trucos: el trazo hierve cada 4
  fotogramas, el relleno se pinta algo fuera de la línea y todo se mueve como una marioneta (rebote,
  respiración, saltito por palabra, pop con aplastamiento).
- **Un vídeo = guion + voz + `plano.json`.** Ningún vídeo nuevo necesita programar: la composición
  genérica `MotorPlano` lee el plano resuelto (`remotion/public-motor/<slug>/plano.json`), y de él
  saca la duración, el tamaño (16:9 o 9:16), las escenas, el reparto y los SFX.
- Piezas del código:

| Archivo | Qué hace |
|---|---|
| `remotion/src/motor/index.ts` · `Root.tsx` | Entrada PROPIA del motor (no toca `remotion/src/Root.tsx`, que reescribe `make_tsx.py`). Registra `MotorPlano` y `HojaPersonajes` |
| `MotorPlano.tsx` | Composición genérica: fondo de rayos + cortinilla al cambiar de color → escenas → reparto → sonido (voz + SFX de cada escena, entradas y bocadillos). Temblor de cámara en `sello`, `lista` y `golpes` |
| `Mono.tsx` | Biblioteca de personajes: 7 tipos, 16 poses, 8 caras, 11 objetos; boca sincronizada con la voz por sílabas |
| `Reparto.tsx` | Mueve a los personajes en el tiempo: entradas, salidas, desplazamientos dando saltitos, cambios de pose y cara, bocadillos (`dice`) |
| `Escenas.tsx` | Biblioteca de 15 escenas; cada una se parametriza solo con datos y trae sus propios SFX. Zonas 16:9 y zonas verticales (9:16) |
| `Iconos.tsx` | Iconos de garabato (para `iconos`, `flujo`, `comparativa`, `relleno`…) y el símbolo ₿ |
| `piezas.tsx` | `Caja` (caja de rotulador), `Grande` (texto gigante con contorno), `Rafaga` (confeti), `Flecha` |
| `tiempo.tsx` | Contexto con las palabras de la locución: apertura de boca y saltito por palabra |
| `base.ts` | Paleta, nombres de color en español, fuente Montserrat ExtraBold, curvas de movimiento, trazos temblorosos |
| `HojaPersonajes.tsx` | Hoja de 13 s con todo el reparto moviéndose (catálogo y prueba visual) |
| `scripts/motor_plano.py` | Resuelve el plano contra los tiempos de palabra, lo valida, mide el ritmo y renderiza (+ loudnorm) |
| `scripts/preflight.py` → `check_plano` | El gate para los vídeos con `"estilo": "motor"` |

### Pipeline paso a paso (largo, 16:9)

```
guion v3 → voz eleven_v4 → whisper (words.json) → plano.json → motor_plano.py (validar + stills)
  → render con loudnorm → miniatura (still + thumbnail_text.py) → capítulos → preflight
  → pending_long.txt → daily_publish.py
```

1. **Tema** de `channel/tecno/topic_backlog.md` y **guion v3** en `channel/tecno/videos/<slug>/script.md`
   (reglas de "Guion natural" más abajo: lista anunciada, "Número X." plano, 5.000-5.600 caracteres,
   8-10 etiquetas v4, cifras con letras).
2. **Entrada en `videos.json`** con `"estilo": "motor"` (copia la de `por-que-bitcoin-sube-y-baja`):
   `"composition": "MotorPlano"`, `manifest_dir`, `script`, `audio_static`, `"playback_rate": 1.0`,
   `"plano": "<manifest_dir>/plano.json"`. El motor va a velocidad natural (1.0): no se acelera la voz.
3. **Voz**: `python scripts/generate_voice.py --video <slug> --model eleven_v4` → `remotion/public/<audio_static>`.
4. **Whisper → `words.json`**: lo hace `motor_plano.py` la primera vez que se corre (whisper por
   palabra alineado con el TEXTO del guion, así las cifras salen como en el guion). Caché en
   `<manifest_dir>/words.json`; se rehace si cambia la voz. OJO: `motor_plano.py` lee `plano.json`
   antes de todo, así que necesita que exista (basta un primer borrador para sacar los tiempos).
   **Negaciones**: `python scripts/motor_plano.py <slug> --negaciones` (`check_negations.py` con
   `words.json`; el motor no tiene `frames.json`). Solo corre si el plano resuelve sin errores.
5. **Escribir `<manifest_dir>/plano.json`** (formato abajo). Un tramo por frase o idea; algo nuevo cada 2-3 s.
6. **Resolver y validar**: `python scripts/motor_plano.py <slug>`. Si hay errores (ancla que no
   aparece, pose o escena desconocida, efecto inexistente) **no escribe nada**. Imprime avisos, el
   ritmo ("un evento cada X s, hueco máx. Y s") y los huecos > 3 s. Revisar fotogramas:
   `--stills 3,10,25 --dir <carpeta>` (consejo: stills al 72 % de cada tramo en hojas de 3x3 para cazar solapes).
7. **Render**: `python scripts/motor_plano.py <slug> --render` → `remotion/output/<slug>.mp4`, ya con
   **loudnorm** (-14 LUFS, pico -1,5 dB). Unos 10 min para 5,5 min de vídeo en 1080p (concurrency 4).
8. **Miniatura**: un fotograma del propio vídeo + texto por código.
   `python scripts/motor_plano.py <slug> --still <segundo> --out <manifest_dir>/thumbnail.png`, pasarlo
   a `thumbnail.jpg` (p. ej. `ffmpeg -i thumbnail.png thumbnail.jpg`) y
   `python scripts/thumbnail_text.py --video <slug>` (lee `## Miniatura` de `seo.md` → `thumbnail_final.jpg`).
   Alternativa sin convertir: `thumbnail_text.py --in thumbnail.png --out thumbnail_final.jpg --text "A|B" --highlight B --pos left`.
9. **Capítulos**: `python scripts/motor_plano.py <slug> --capitulos` escribe `## Capítulos` de `seo.md`
   con los tiempos reales, a partir de los tramos que llevan `"capitulo"`.
10. **Gate**: `python scripts/preflight.py --video <slug> --stage publish` (`check_plano`: plano
    resuelto con la voz actual, tramos en orden, sin escenas repetidas seguidas, cubre el audio, SFX
    presentes, sin música, hueco máximo ≤ 5 s (> 3,5 s avisa), composición del motor; más voz, CTA y MP4).
11. **`<manifest_dir>/shorts/shorts.json` con `"shorts": []`** (ver reglas): los Shorts del motor van aparte.
12. **Publicar**: añadir el slug a `scratch-yt/pending_long.txt`; `daily_publish.py` (tarea
    "Tecnomono YouTube 0935") lo sube en orden, privado y programado.

### Shorts con el motor (9:16)

- **Cada Short es su PROPIA entrada en `videos.json`**, no un recorte del largo. Slug `short-<tema>`
  y carpeta `channel/tecno/videos/short-<tema>/` con `script.md`, `plano.json` y `seo.md` (más
  `words.json`, que sale solo). Entrada mínima:
  `{"manifest_dir": …, "script": …, "audio_static": "short-<tema>.mp3", "fps": 30, "width": 1080, "height": 1920, "background": "#ffffff", "estilo": "motor", "formato": "9:16"}`.
- El plano lleva `"formato": "9:16"` (→ 1080x1920) y suele llevar `"cola": 0.9`. En vertical los
  gráficos van en la mitad de arriba (y 200-1050), los personajes abajo con escala 0,95 y los
  bocadillos caen en y≈1030-1130.
- Guion propio: la primera frase ES el título. **~190 palabras con eleven_v4 ≈ 58,5 s** (+0,9 s de
  cola: por debajo de 60 s).
- Mismo flujo: voz → `motor_plano.py <slug>` → `--render` → `preflight.py --video <slug>`.
- **Subida**: `python scratch-yt/upload_youtube.py remotion/output/<slug>.mp4 --title "…" --description "…" --tags "a,b,c" --thumbnail … --publish-at 2026-11-05T16:00:00Z`
  (sube privado y YouTube lo publica solo a esa hora). Apuntar fecha e ID en el `seo.md` del Short.
  `make_shorts.py` y `publish_shorts.py` NO se usan con el motor (necesitan imágenes de `frames.json`).
- Ejemplos reales: `short-asi-te-roba-un-hacker-la-contrasena` y `short-por-que-la-ia-se-inventa-cosas`.

### Formato del plano (`plano.json`)

```json
{
  "formato": "16:9",                       // o "9:16" para Shorts
  "cola": 1.2,                             // s de cola tras la última palabra (por defecto 1,2)
  "rayos": {"x": 960, "y": 620},           // opcional: centro de los rayos del fondo
  "reparto": {"mono": {"tipo": "protagonista", "narrador": true}, "rico": {"tipo": "rico"}},
  "tramos": [
    {"en": "Viernes, diez de octubre",     // primeras palabras de la frase donde empieza (el 1º puede ir vacío)
     "color": "amarillo",                  // color del fondo de rayos (cortinilla + whoosh al cambiar)
     "capitulo": "Viernes 10 de octubre",  // opcional: abre capítulo de YouTube
     "escenas": [{"tipo": "cifra", "desde": 0, "hasta": 121000, "prefijo": "$", "al": "@ciento"}],
     "personajes": {"mono": {"x": 0.2, "pose": "señalar", "cara": "sorpresa",
                             "cambios": [{"al": "@baja", "pose": "miedo", "cara": "miedo"}],
                             "dice": [{"texto": "¡¿Qué?!", "al": "@tarde", "hasta": "@fin"}]}},
     "sfx": [["boom", "@baja", 1.0]],      // [efecto, ancla, volumen relativo]
     "golpes": ["@baja"],                  // temblor de cámara
     "relleno": false}                     // opcional: quita (o {"icono": "..."} fija) el relleno automático
  ]
}
```

(El JSON real no admite comentarios: son solo para leerlo aquí.)

**Anclas** — cualquier texto que empiece por `@` se convierte en segundos: `"@baja"` (primera "baja"
desde el inicio del tramo), `"@seis mil"` (secuencia de palabras), `"@baja#2"` (la segunda),
`"@baja+0.3"` / `"@baja-0.2"` (desfase), `"@inicio"`, `"@fin"` (inicio/fin del tramo), `"@+1.5"`
(segundos desde el inicio del tramo). Ojo: `@fin` es especial; para la palabra "fin" usa `"@fin de"`.

**Duración de una escena**: todo su tramo, salvo `"aparece"` / `"desaparece"` (anclas) o `"tramos": N`
(se queda N tramos más; cuidado con solapes). Campos comunes a todas: `zona` (`centro`, `arriba`,
`izq`, `der`, `abajo`), `caja` (`{x, y, w}` para recolocar), `color` (nombre o hex), `"sfx": false` (sin sus efectos).

**Escenas** (`tipo` → datos clave; los `…_al` son anclas):

| tipo | Qué es | Datos clave |
|---|---|---|
| `lista` | Rótulo "Número X": estrella con número, título, apodo, tira de progreso | `n`, `total`, `titulo`, `apodo`, `titulo_al`, `apodo_al` |
| `flujo` | Nodos con icono unidos por flechas que se dibujan | `nodos: [{texto, icono, al}]`, `forma: linea\|ciclo`, `titulo`, `cierra_al` |
| `comparativa` | A contra B con VS; ganador ✓, perdedor tachado | `a`/`b: {titulo, valor, icono, color, al}`, `vs_al`, `ganador: a\|b`, `ganador_al` |
| `cifra` | Cifra gigante que cuenta de `desde` a `hasta` | `desde`, `hasta`, `prefijo`, `sufijo`, `decimales`, `al`, `dur`, `flecha: sube\|baja`, `etiqueta`, `etiqueta_al`, `tam`, `log`, `antes` |
| `grafica` | Línea (o barras) que se dibuja punto a punto con cabeza | `puntos: [{v, al, …}]`, `forma: barras`, `cabeza: btc\|punto\|euro\|dolar`, `marcas: [{i, texto, al}]`, `ymin`, `ymax`, `prefijo`, `sufijo`, `ancho`, `alto`, `al`, `hasta_al` |
| `chat` | Bocadillos de chat o tarjeta de tuit con corazones | `mensajes: [{texto, lado, al}]`, `estilo: tuit`, `autor`, `usuario`, `likes` |
| `por_dentro` | Lupa que hace zoom a un mecanismo de engranajes | `piezas: [{texto, al}]`, `icono`, `titulo` |
| `mapa` | Globo que gira, chinchetas con nombre, apagón | `pines: [{nombre, x, y, al}]`, `apagon: {continente, al}`, `rota`, `radio`, `titulo` |
| `sello` | Sello que se estampa (VERDAD, ESTAFA…) con temblor | `texto`, `al`, `color`, `tam`, `rot` |
| `pantalla` | Móvil u ordenador con app | `dispositivo: movil\|ordenador`, `app` (p. ej. `alerta`), `titulo`, `lineas: [{texto, al, tam, color}]`, `precio: {desde, hasta, al}` |
| `dinero` | Monedas y billetes | `modo: lluvia\|sube\|escapa\|explota`, `monedas` (₿ por defecto; `"dolar"` si no es cripto), `billetes`, `cantidad`, `texto`, `texto_al`, `al`, `hasta` |
| `pregunta` | Pregunta gancho con interrogaciones; respuesta en su palabra | `pregunta`, `al`, `respuesta`, `respuesta_al` |
| `texto` | Tipografía cinética: palabras que saltan en su momento | `palabras: [{texto, al, caja, color}]`, `tam`, `por_fila` |
| `iconos` | Fila de iconos con etiqueta; se pueden tachar | `items: [{icono, texto, al, tachar_al}]`, `titulo`, `tam` |
| `relleno` | Lo mete SOLO `motor_plano.py`: icono en una nube mientras el tramo espera su ancla | (`icono`, `texto`) |

**Relleno automático**: si un tramo deja el centro vacío más de 1,2 s esperando a su ancla, se le
pone un `relleno` (icono de la escena que espera o, si no tiene, por palabras clave de lo que se
dice). También avisa si una escena pasa más de 1,5 s enseñando solo su título.

**Iconos** (`Iconos.tsx`): bitcoin, dolar, pizza, cohete, ascensor, oveja, megafono, coche, banco,
grifo, tienda, rayo, enchufe, pico, ballena, robot, reloj_arena, candado, calendario, dedo,
grafico_sube, grafico_baja, alerta, mundo, movil, hucha, fuego, libro, bombilla, cadena, balanza,
gota, ola, escudo, llave, anzuelo, sobre, dado, mazo, examen, pinocho, gpu, calavera, play, bateria
(color `vacia`), termometro, camiseta, chocolate, micro, trofeo, ojo, tortuga, caja, mochila, puerta,
avion, casa, chip, ticket.

**Colores** por nombre: amarillo, azul, verde, rojo, rosa, naranja, morado, gris, blanco, negro, oro (o un hex).

### Personajes (API del reparto)

- **Tipos** (`reparto.<id>.tipo`): `protagonista` (el mono), `ciberdelincuente` (capucha y antifaz),
  `rico` (traje y puro; lleva `bolsa` por defecto), `ia` (cabeza de robot), `abuelo` (gafas y
  `baston` por defecto), `currito` (camiseta), `nino` (camiseta, más pequeño). `"narrador": true` =
  habla (boca con la voz) por defecto.
- **Poses**: `de_pie`, `señalar`, `señalar_arriba`, `brazos_arriba`, `pensar`, `encogerse`, `correr`,
  `caminar`, `sentado`, `brazos_cruzados`, `saludar`, `jarras`, `miedo`, `presentar`, `celebrar`, `empujar`.
- **Caras**: `normal`, `sorpresa`, `risa`, `miedo`, `enfado`, `guiño`, `triste`, `chulo`.
- **Objetos** (en la mano): `ninguno`, `bolsa`, `bitcoin`, `movil`, `baston`, `puntero`, `billete`, `lupa`, `pizza`, `megafono`, `puro`.
- **Por tramo** (`personajes.<id>`): `x` (fracción del ancho 0-1 o píxeles), `y` (por defecto el suelo,
  0,93 del alto; son los PIES), `escala` (0,9 por defecto), `pose`, `cara`, `mira` (`der`/`izq`),
  `objeto`, `habla`, `salta`, `entra` (ancla de entrada), `sale` (ancla de salida), `entrada`
  (`salto` por defecto, `cae`, `izq`, `der`, `pop`, `nada`), `salida` (`salto`, `izq`, `der`, `pop`,
  `nada`), `cambios: [{al, pose, cara, x, mira, objeto, salta…}]`, `dice: [{texto, al, hasta, color}]` (bocadillo).
- Un personaje que sigue en el tramo siguiente **no vuelve a entrar**: solo cambia de pose/cara/sitio
  (se desplaza dando saltitos; si va lejos, corre). Para que salga, **no lo nombres** en el tramo
  (con solo `{"salida": …}` sigue en pantalla todo ese tramo). Las entradas suenan solas (boing,
  pasos), igual que salidas (swoosh), saltos (boing) y bocadillos (pop2).
- Catálogo visual: `python scripts/motor_plano.py --hoja` → `channel/tecno/pruebas/motor/personajes.mp4`.

### SFX del motor

44 efectos en `assets/sfx/motor/` (copiados una vez de la biblioteca del repo; cada uno igualado
por sonoridad a -32,6 LUFS con su ganancia en `assets/sfx/motor/sfx_gain.json`). Cada escena trae
los suyos; en un tramo se añaden más con `"sfx": [["nombre", "@ancla", volumen]]`:

`agua, alerta, apagon, boing, boom, boom_hondo, cadena, caida, caja, click, cristal, ding, ding2,
engranaje, exito, gente, giro, glitch, golpe, golpe_seco, mazo, moneda, monedas, notif, pagina,
pasos, pop, pop2, pregunta, puerta, rasgueo, reloj, revelacion, rotulador, sello, subida, swoosh,
teclas, tension, tick, triunfo, whoosh, whoosh_suave, zap`.

### Reglas aprendidas (obligatorias)

- **SIN subtítulos.** El texto va en los gráficos (cifras, palabras de `texto`, bocadillos, sellos).
- **Algo nuevo en pantalla cada 2-3 s** (escena, cambio de pose, palabra, bocadillo, golpe). El
  validador lo mide; preflight falla con huecos > 5 s.
- **El mono SIEMPRE en movimiento**: cambios de pose y cara con la frase, saltos, desplazamientos. Nunca un muñeco quieto.
- **Los personajes se turnan**: varios por vídeo (en bitcoin salen 7), que entren y salgan según la
  historia; no todos a la vez ni siempre el mismo al lado del mono.
- **Carpeta pública mínima** (`remotion/public-motor`, ~20 MB: fuente, SFX y `voz.mp3` + `plano.json`
  + `words.json` por vídeo). El render usa `--public-dir=public-motor` porque el bundler copia la
  carpeta pública a `%TEMP%` en CADA render y `remotion/public` pesa ~7 GB: con ella se llena el disco.
  `motor_plano.py` la prepara solo; no metas ahí imágenes ni nada más.
- **No lances dos renders del mismo slug a la vez** (comparten el `_raw.mp4`). `motor_plano.py` lo
  impide con `remotion/out/<slug>.render.lock` (si el proceso murió, el candado se recoge solo). No
  lances renders con `&` desde la herramienta Bash: siguen vivos y chocan con el siguiente.
- **`shorts/shorts.json` vacío en los largos del motor** (`{"shorts": [], "nota": "…"}`): así
  `daily_publish.py` no lanza `make_shorts.py`, que necesita imágenes y Google.
- **`"estilo": "motor"` en `videos.json`**: es lo que hace que `preflight.py` use `check_plano` en vez
  de los chequeos de imágenes/`frames.json`/`sfx.json`.
- Gotchas del plano: los bocadillos `dice` duran TODA la aparición si no llevan `"hasta"` (usa
  `"hasta": "@fin"`); el `objeto` se arrastra entre apariciones (pon `"objeto": "ninguno"` al reentrar);
  `pantalla` con `ordenador` pisa a los personajes de los lados (usa `movil`); barras de `grafica`
  con `"ancho": 1000`; cifras de millones con `tam` ≤ 150; con el mono en x 0,5, sube el texto
  (`caja` y 250); `tipo` es el tipo de escena, por eso las barras se piden con `"forma": "barras"`.

### Costes

- **Google: 0 €.** El motor no genera ninguna imagen (la facturación de Google está cerrada; imágenes
  y Veo, bloqueados). **Solo se paga ElevenLabs** (la voz). Remotion: 0 €.
- El **tope duro de 250 €** de `scripts/gasto.py` sigue vigente para cualquier generación de imágenes
  que se haga en el futuro, y sigue sin poder subirse sin que el dueño lo pida por escrito.

### Preferencias del dueño

- **Le encanta la marioneta moviéndose**: es lo que hay que potenciar en cada vídeo.
- **Quiere más personajes y formatos variados**: ampliar el reparto (`Mono.tsx`) y las escenas
  (`Escenas.tsx`) es bienvenido, siempre de forma aditiva (no romper los planos que ya existen).
  Al añadir un tipo, pose, cara, escena o icono, añadirlo también a las listas de validación
  (`TIPOS`/`POSES`/`CARAS` en `Mono.tsx`, `ESCENAS` en `motor_plano.py`) y a esta sección.

### Reglas que SIGUEN vigentes

- Tope de gasto de **250 €** (ver arriba).
- **Voz SIEMPRE con eleven_v4** (`--model eleven_v4`).
- **Sin música de fondo** (solo efectos puntuales).
- **Guion natural** (reglas v3 de "Guion natural" más abajo): voz de persona real, lista clara.
- **Ni un día sin subir**, pero **un vídeo al día, nunca en tanda**.
- Responder siempre en **español**.

### Vídeos hechos con el motor (referencia)

Largos: `por-que-bitcoin-sube-y-baja`, `cuanto-gana-de-verdad-un-youtuber-en-espana`,
`por-que-tu-movil-va-mas-lento-con-los-anos`. Shorts: `short-asi-te-roba-un-hacker-la-contrasena`,
`short-por-que-la-ia-se-inventa-cosas`. Sus `plano.json` son los mejores ejemplos para copiar.

---

## What this is

A production pipeline for YouTube-style explainer videos built with synthetic voice, assembled in code with Remotion. **Desde el 3-nov-2026 los vídeos se animan por código con el motor (sección de arriba); el método de imágenes generadas por IA + Ken Burns que describe gran parte de este documento es HEREDADO.** The repo documents and tooling the workflow; it is not a runtime service.

Full step-by-step process (HEREDADO, método de imágenes): [VIDEO_EXPLAINER_WORKFLOW.md](./VIDEO_EXPLAINER_WORKFLOW.md). El proceso actual es la sección del MOTOR de arriba. Conversational replies follow the user's language (Spanish); docs stay in their existing language.

## Repo structure

```
SETUP.md            ← arranque + uso del orquestador (LÉELO PRIMERO)
.env.example        ← plantilla de claves (copiar a .env, que es local/gitignored)
videos.json         ← registro de vídeos (composición, naming, playback, rutas)
remotion/           ← Remotion compositions (video assembly + render)
  src/motor/            ← MOTOR de animación por código (método actual; entrada propia src/motor/index.ts)
  public-motor/         ← carpeta pública MÍNIMA del motor (fuente, sfx/, <slug>/voz.mp3 + plano.json + words.json)
assets/sfx/motor/   ← 44 SFX del motor + sfx_gain.json
scripts/
  config.py             ← config compartida: lee .env, única fuente de verdad
  motor_plano.py        ← MOTOR: plano.json → validar → stills/capítulos → render + loudnorm (método actual)
  orchestrate.py        ← encadena el pipeline + guarda estado (handoff) — HEREDADO (método de imágenes)
  generate_voice.py     ← ElevenLabs (lee de config)
  generate_images.py    ← Higgsfield (lee la receta de frames.json)
  whisper_timestamps.py ← timestamps de audio (--language/--model/--naming); nombres de frame únicos
  check_sara_color.py   ← tras generar: marca imágenes con Sara con la cara color melocotón (deriva de
                          Gemini; 14/103 en el vídeo del chantaje). Da falsos positivos con manos y
                          arena: sirve para mirar esas a ojo, NO para borrar a ciegas.
                          Si tras regenerar UNA vez sigue melocotón: `--recolorear <claves>` (pasa la
                          cara al tostado de Sara conservando sombras; 6/6 bien en Minecraft). Mejor
                          que regenerar en bucle: los primeros planos alegres recaen casi siempre.
  fix_letterbox.py      ← quita las bandas negras que Gemini mete a veces (recorta 16:9 y reescala)
  auto_sfx.py           ← sfx.json DENSO (~14/min: soplos, pops, golpes, cajas, dings, risers) con
                          efectos YA generados (0 créditos), tiempos por palabra; --minimal = capa mínima
  split_segments.py     ← re-trocea los segmentos del largo a ≤2,5 s (más imágenes, por palabra)
  make_tsx.py           ← genera el .tsx (Ken Burns + transiciones + énfasis + SFX) y ajusta Root.tsx
  fill_seo_times.py     ← capítulos reales ("Número X") y desde/hasta de Shorts en seo.md
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
  script.md · plano.json (motor) · words.json · seo.md · shorts/shorts.json (vacío en el motor)
  HEREDADO: frames.json (timings + prompts) · state.json (progreso) · notes.md
scratch-yt/         ← YouTube Data API upload scripts (Python venv inside)
```

> Las skills de proyecto (`/channel-formula`, `/channel-audit`, `/script-forge`,
> `/thumbnail-creator`, `/video-seo`, `/channel-setup`) viven en `.claude/skills/`, que
> está **gitignored**: NO se
> sincronizan entre colaboradores y pueden no existir en un clon nuevo. Trátalas
> como opcionales/locales.

## Pipeline HEREDADO (imágenes generadas + Ken Burns)

> **HEREDADO desde el 3-nov-2026.** Para vídeos nuevos usa el pipeline del MOTOR (arriba). Lo de
> elegir tema, `seo.md`, `thumbnail_text.py`, `pending_long.txt` + `daily_publish.py` y las reglas de
> guion siguen valiendo; la generación de imágenes, `make_tsx.py`, la música y `make_shorts.py` no.

```
Script → ElevenLabs V3 (voice) → [human review] → Whisper (timestamps)
       → escribir escenas 1:1 → scene_diversity_check.py (GATE de coherencia/variedad)
       → generate_images_gemini.py (SIEMPRE con imagen de referencia adjunta) → [human review]
       → SFX (la música ya NO: sin música desde 27-oct-2026)
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
- **Duración objetivo: 5-7 minutos de vídeo final.** La cifra vigente de guion es la de "Guion
  natural" (v3): **5.000-5.600 caracteres de narración** (≈5-6 min; el motor va a 1.0, el largo del
  youtuber salió en 308 s). La regla antigua de 7.800-8.300 caracteres a 1.1 queda HEREDADA.
- **`scripts/preflight.py` es un gate, no un consejo.** Corre dentro de `orchestrate.py` antes de
  `render` y `step_render` lo vuelve a invocar por si alguien salta el paso con `--steps`.
  Con `"estilo": "motor"` corre `check_plano` (ver sección del MOTOR). En el método heredado
  comprueba lo objetivable (música a 0 por decisión del dueño, 1 escena por frase sin relleno, ajustes de voz
  coincidentes con `.env`, aspect ratio, FRAMES inyectados, duración, CTA). Si falla, se para.
- **Lo que el gate NO puede juzgar** (y por tanto sigue necesitando persona o agente): si una
  imagen concreta pega con SU frase, si el estilo tiene variedad real, y **la expresividad de la
  voz** — Claude no puede oír el audio, así que ese punto lo valida siempre una persona.

### Las dos capas de control de calidad (HEREDADO: imágenes generadas)

> En el motor no hay imágenes que revisar con visión: la capa 2 es revisar stills
> (`motor_plano.py <slug> --stills …`) buscando solapes y textos cortados.


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
- **(HEREDADO) SFX — paso obligatorio; la música de fondo YA NO (sin música desde 27-oct-2026; en el motor cada escena trae sus SFX).** Ningún vídeo del método heredado se da por terminado sin esta capa (ver sección [Audio: SFX y música de fondo](#audio-sfx-y-música-de-fondo) más abajo). No forma parte todavía de `orchestrate.py` (se corre a mano entre `images` y `render`), así que no se salta solo porque el orquestador no lo automatice — añádelo siempre antes del render final, igual que la miniatura y el SEO.

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

Motor (método actual, ver sección del MOTOR):
```bash
python scripts/motor_plano.py <slug>                 # resuelve y valida el plano
python scripts/motor_plano.py <slug> --render        # render + loudnorm → remotion/output/<slug>.mp4
python scripts/motor_plano.py <slug> --stills 3,10,25 --dir <carpeta>
python scripts/motor_plano.py <slug> --still 4.5 --out x.png
python scripts/motor_plano.py <slug> --capitulos     # capítulos reales en seo.md
python scripts/motor_plano.py <slug> --negaciones    # check_negations.py con words.json
python scripts/motor_plano.py <slug> --voz otra.mp3  # otra locución (words_<nombre>.json)
python scripts/motor_plano.py --hoja                 # hoja de personajes
```

Orquestador (HEREDADO, método de imágenes; repo root) — encadena el pipeline y guarda el progreso en `state.json`:
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

## Remotion compositions (HEREDADO)

> Los vídeos del motor usan una sola composición genérica, `MotorPlano`, registrada en
> `remotion/src/motor/Root.tsx` (no en `remotion/src/Root.tsx`).


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

## Estilo visual: la STYLE BIBLE — `channel/tecno/style-bible.json` (HEREDADO: imágenes generadas)

> En el motor el estilo está en el código (`base.ts`, `Mono.tsx`). La Style Bible sigue siendo la
> referencia de identidad (mono stick cutre, paleta) pero sus reglas de prompts no aplican.


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

## `scene_diversity_check.py` — el gate ANTES de generar imágenes (HEREDADO)

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

## `scene_context.py` — memoria visual MIENTRAS se escriben las escenas (HEREDADO)

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

## Imágenes: el texto que aparezca SIEMPRE en español (HEREDADO; en el motor el texto lo escribe el plano, siempre en español)

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

> **Con el motor** la imagen base es un fotograma del propio vídeo (`motor_plano.py <slug> --still <s>`)
> y el texto se pone con `thumbnail_text.py`. Generarla con Higgsfield/Gemini es HEREDADO (Google
> está bloqueado). Las reglas de texto (2-4 palabras, gancho, conectar con el título) siguen vigentes.

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
4. **Capítulos**: con el motor, `motor_plano.py <slug> --capitulos` (tramos con `"capitulo"`). En el
   método heredado, calcula los timestamps REALES desde `frames.json` (los `startSec` ya están en
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

## Shorts — HEREDADO (recortes y guion propio con imágenes del largo, sep-oct 2026)

> **Desde el 3-nov-2026 los Shorts se hacen con el MOTOR** (sección de arriba): cada Short es su
> propia entrada en `videos.json`, 9:16, **sin subtítulos**, subido con `upload_youtube.py --publish-at`.
> `make_shorts.py`/`publish_shorts.py` quedan para los vídeos antiguos; en los largos del motor
> `shorts/shorts.json` va vacío. Lo que sigue (primera frase = título, 30-60 s, curiosidad) vale
> como criterio editorial; la mecánica de imágenes, subtítulos karaoke y recortes es HEREDADA.

Los Shorts son la vía de descubrimiento para un canal pequeño. **2 por largo en YouTube**
(`MAX_SHORTS_PER_LONG`). Se definen en `seo.md`, sección `## Shorts`.

### Shorts con guion propio (`tipo: guion`) — formato POR DEFECTO desde 27-oct-2026

Por qué: la gente no entendía los Shorts (recortes sin contexto que empezaban con "Número dos…",
título que nunca se decía, `gancho` amarillo fijo que daba el contexto por hecho). En los 17
Shorts ganadores analizados la primera frase ES el título, arriba solo va el NOMBRE del tema y
nadie cierra con "vídeo completo". Detalle y evidencia: `channel/tecno/shorts_playbook.md`.

```
## Shorts

### Short 1
tipo: guion
titulo: Este robot de casa cuesta 20.000 dólares (y no va solo)
tema: ROBOT NEO
reveal: UN/EMPLEADO
cierre: seco
L1: [curious] Este robot de casa cuesta veinte mil dólares. Y a veces no va solo. | img: nueva: <escena vertical>
L2: [serious] Se llama NEO. Lo vende la empresa One X. Y dobla tu ropa. | img: 4_27
B1: [serious] Promete entregarlo en Estados Unidos en dos mil veintiséis. | rotulo: 20.000 $
P: [emphatic] Un empleado. Viendo tu casa. | img: 4_50
F: [serious] El robot de casa ya existe. Lo que le falta es aprender solo. | img: 4_55
```

- Un bloque `### Short N` por Short. Cabecera: `titulo` (≤60, es L1), `tema` (1-4 palabras,
  ≤22 caracteres, nombre del sujeto; ya no se enseña: sirve para validar y para los verdes), `reveal`
  (opcional, LÍNEA1/LÍNEA2, sale cuando se dice; se busca desde la frase `P`), `cierre: seco|bucle`,
  `parte` y `claves` (palabras que salen solas y en verde en los subtítulos) opcionales.
- Frases `ETIQUETA: texto | img: … | rotulo: …` (plantilla del playbook §2.2: L1 título dicho,
  L2 subida de apuesta, B1-B3 golpes con dato, P remate, F cierre seco o bucle). 30-45 s,
  100-150 palabras. Etiquetas de voz v4 permitidas. Sin `img:` sigue la imagen anterior.
- `img: <clave>` = imagen del largo (`frames.json`). `img: nueva: <escena>` = imagen VERTICAL nueva
  (máx. 2 por Short; `vertical_prompt()` le añade el personaje, la regla de no texto y el STYLE
  de las escenas del largo). Se genera SOLO por `generate_frame` (tope de 250 € de `gasto.py`) con
  el modelo de `image_model` del vídeo (`lite` = el barato). Va en la franja central, como las demás.
- Flujo de `make_shorts.py`: voz `generate_voice.py --model eleven_v4` → `shorts_src/short_N.mp3`
  → whisper por palabra (`whisper_timestamps.extract_words`) → cada frase cambia de imagen
  cuando empieza a decirse → ffmpeg (zoom lento del 4 %, a `playback_rate`). Voz, tiempos e
  imágenes nuevas quedan cacheados en `<manifest_dir>/shorts_src/`: TikTok y los re-cortes no
  vuelven a pagar voz (solo se regenera si cambia el texto del guion). Sin música de fondo.
- Pantalla (también en modo recorte; rehecha el 28 y 29-oct-2026 con el feedback del dueño):
  fondo BLANCO entero y **ningún texto arriba** (ni título, ni `tema`, ni caja de `reveal`). La
  imagen va recortada AL DIBUJO (`image_fit`: nunca corta tinta; escenas de borde a borde pierden
  ≤20 % de ancho), algo baja y pegada a los subtítulos; la `nueva` vertical va igual. Movimiento:
  zoom lento ±4 % con paneo, y en cada cambio de imagen una entrada de 0,25 s que alterna empujón
  de zoom / deslizar / rebote (`segment_chain`). Subtítulos virales de 1-2 palabras (~y 1480):
  blancos con contorno negro grueso, cada palabra con pop y amarilla mientras se dice; cifras y
  nombres solos en verde; el `reveal` y los `rotulo` que se DICEN se destacan en los subtítulos
  (amarillo, +22 %, pop fuerte); un `rotulo` que no se dice avisa y no sale. Últimos 250 px libres.
  **Sin cierre congelado de 3 s**; en `--tiktok` el "SÍGUEME" va encima de los 2 últimos s.
- Efectos de sonido (modo guion; SIN música): `assets/sfx/shorts/` (copiados de
  `remotion/public/*-sfx/`): whoosh en cada cambio de imagen, pop en cifras/nombres/rótulos, caja
  registradora cuando se dice dinero, subida + golpe en el remate. Cada uno se iguala a la voz por
  LUFS integrados (`SFX` = dB respecto a la voz, de -12 a -18), porque los archivos vienen a
  niveles muy distintos (pop -50 LUFS, golpe -4). Medido 29-oct: efectos ≈ -14 dB vs voz; la
  mezcla queda en ≈ -21,7 LUFS. En modo recorte no se añaden (el audio del largo ya los trae).
  OJO tamaños ASS: libass mide `s` como usWinAscent+usWinDescent (Montserrat 1,562 em), así
  que `s170` ≈ 109 px de em; medir con `ass_text_w()`, no con el número del estilo.
- Validación (avisa; `--estricto` aborta): L1 que no se parece al título o que empieza por
  "Número", "Pero", "Y", "Su", "La siguiente" o un pronombre (Esto, Eso, Lo…; "Este robot…" sí
  vale); `tema` largo, con interrogación, vago o sin ninguna palabra del título; duración fuera
  de 20-50 s; ritmo fuera de 2,8-3,9 palabras/s; >2 imágenes nuevas o claves inexistentes = error.

```
python scripts/make_shorts.py <slug> --dry-run          # valida, plan de imágenes, caracteres de voz y gasto; no gasta
python scripts/make_shorts.py <slug> [--solo N]         # YouTube → shorts/
python scripts/make_shorts.py <slug> --tiktok           # TikTok → shorts_tiktok/ (reusa la voz)
    --estricto (aborta con avisos) · --sin-nuevas (no genera imágenes: usa la del largo de la frase siguiente)
```

`shorts.json` mantiene los campos de siempre (`file`, `titulo`, `youtube_id`, `publish_at`,
`tiktok_*`, que se conservan al re-cortar) y añade `tipo`, `tema`, `cierre` y `primera_frase`
para cruzar con resultados. `publish_shorts.py` y `tiktok_pack.py` funcionan igual. Tras subir
cada Short, poner a mano el **vídeo relacionado** en Studio (la API no deja; el script lo recuerda).

### Modo recorte (vídeos antiguos; solo si el tramo empieza nombrando el sujeto)

```
## Shorts
- titulo: ¿Cuánto cobra un AI Engineer en España? | tema: AI ENGINEER | reveal: 71.000 €/AL AÑO | desde: 4_16
```

- `desde`/`hasta` = clave de frame de `frames.json` (sin `.jpg`); sin `hasta` corta ≤50 s.
- Si trae `gancho` y no `tema` (seo.md antiguos), el gancho sale como título 2,5 s y avisa.
- Subtítulos del GUION alineado con los tiempos de Whisper (sin errores tipo "Opinaya").

### Estilo de los subtítulos y la fuente (oct-2026) — HEREDADO: el motor va SIN subtítulos

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

> 27-oct-2026: el `gancho` fijo YA NO se usa (lo sustituyen `tema` + `titulo` mientras se dice). La
> regla de `reveal` sigue igual: el remate nunca se ve antes de decirse.

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

- **Motor: `playback_rate` 1.0** (voz a velocidad natural; es lo que llevan los cinco vídeos del motor).
- (HEREDADO) `playback_rate` por defecto **1.1** en los vídeos de imágenes. El dueño lo bajó de 1.25 a 1.1 el
  **28-oct-2026** ("un pelín más lento"). Historial: 1.2 → 1.25 (Whisper entendía igual a 1.2-1.35,
  97,7-98,4% de palabras) → 1.1. Que se entienda no significa que guste: manda el oído del dueño.
- Datos propios: los largos de 4-4,5 min retienen 48-50% y los de 6-7 min 26-35%. Objetivo de
  5-7 min de vídeo final (a 1.1 salen ~10-15 % más largos que a 1.25 con el mismo guion: ~7.800
  caracteres ≈ 7 min; recortar guion si se pasa).
- Cambiar la velocidad de un vídeo ya montado (NO subido): `python scripts/set_speed.py <slug> 1.1`
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
- **Shorts de 30-45 s con guion propio que dicen el título en la primera frase** (ver "Shorts con
  guion propio"). 3 de 17 virales sí hacen bucle (QuantumFracture, MinuteEarth): `cierre: bucle`.
- **El `gancho` (texto fijo arriba del Short) se entiende SOLO, sin haber visto el vídeo** (queja del
  usuario, 18-oct-2026): nombra el tema y no usa pronombres ni analogías internas. Mal: "¿CHEFS O
  PINCHES?", "¿QUIÉN LA INVENTÓ?", "¿CÓMO LO PILLARON?". Bien: "¿POR QUÉ LA IA NECESITA GPU?",
  "¿QUIÉN INVENTÓ LA DARK WEB?". Se ve sin sonido: es lo que decide si alguien se queda.
- **Largos de 5-7 min** (decisión del usuario, 16-oct-2026: prefiere corto a 13 min; se compensa
  con más visionados, no con más duración).
- (HEREDADO para los Shorts recortados; con el motor los Shorts son vídeos propios y los largos llevan `shorts.json` vacío) **Solo 2 Shorts por largo en YouTube** (`MAX_SHORTS_PER_LONG` en `scratch-yt/publish_shorts.py`):
  cada subida gasta el límite del canal (`uploadLimitExceeded`) y los Shorts no suman horas. Los 4
  siguen yendo a TikTok. En `seo.md` de los vídeos nuevos, escribir solo 2.

### Voz y música (27-oct-2026, decisión del usuario)

- **Voz SIEMPRE con Eleven v4**: `python scripts/generate_voice.py --video <slug> --model eleven_v4`
  (el `.env` sigue en eleven_v3 y el agente no puede editarlo). v4 respeta las etiquetas
  [curious]/[tense]… sin leerlas en voz alta (comprobado con whisper).
- **SIN música de fondo**: a la audiencia no le gusta. `auto_sfx.py` la deja a volumen 0. Los efectos
  puntuales (moneda, soplo…) SÍ se quedan. No volver a ponerla hasta que el usuario elija música.

### Guion natural (28-oct-2026, queja del usuario: "suena robótico")

Cuéntalo **como si se lo contaras a un amigo**. Los rótulos fijos de plantilla suenan a ficha leída.
- **PROHIBIDOS los rótulos de sección**: "Lo que puede fallar.", "Veredicto.", "Su estilo.", "Cómo pillarla.",
  "Lo que nadie te cuenta.", "Cómo arreglarlo.", "Cómo desengancharte.", "Qué significa para ti.". El
  CONTENIDO de cada uno se queda (la pega, el veredicto, el consejo, la frase de remate); lo que se va es la
  etiqueta. La plantilla por ítem sigue en el MISMO orden, pero contada.
  - Mal: `Lo que puede fallar. Italia la prohibió por ley.` → Bien: `El problema es que en Italia ya la han prohibido por ley.`
  - Mal: `Veredicto. Ya existe.` → Bien: `Allí ya existe. En Europa, lo prometen.`
  - Mal: `Cómo arreglarlo. Apaga la reproducción automática.` → Bien: `Así que apágala.` / `Mi consejo: …` / `¿El remedio? …`
  - Mal: `Su estilo. Te paga en puntos.` → Bien: `Twitch te paga en puntos. Y tú le pagas en horas.`
- **ESTRUCTURA NUMERADA Y CLARA (29-oct-2026, v3)**. La v2 "se siente de IA": el dueño quiere voz de
  persona real PERO con la lista clara de antes (la v1 y `todos-los-tipos-de-malware-explicados`,
  `todos-los-grupos-hacker-de-los-gobiernos`: "los guiones antes los hacías muy bien"). Ejemplo suyo:
  "Estas son las cosas que veremos en 2035. Número uno…".
  - Tras el gancho, **anuncia la lista en llano**: `Estas son las diez cosas que verás ese día. Te las cuento de
    una en una, de la mañana a la noche.`
  - **Cada ítem abre SIEMPRE igual: `[emphatic] Número uno. <nombre>, <apodo>.`** (en un reloj:
    `Número uno. Las siete de la mañana: te despiertas.`). Plano, sin variar: NADA de "Vamos con la tres",
    "La siete es…", "Empezamos por la número uno". La repetición aquí es la estructura, no un defecto.
  - Después, **3-5 frases normales**: qué es o qué pasa → el caso o dato real → por qué te importa / la pega /
    el consejo → remate (opcional, a menudo pegado a la frase anterior en la misma línea).
  - Las transiciones de bloque ("Y ahora vienen las raras.", "Y la última, la más sorprendente.") se quedan.
- **Anti-señales de IA (PROHIBIDO o como mucho UNA vez por guion)**: "¿Y sabes qué?/¿Y sabes cómo?", "Moraleja:",
  "Eso sí:", "Ojo:", "Y ojo, que…", "Un detalle:", "Y aquí viene lo raro…" con "...", chistes forzados en cada
  ítem, una etiqueta distinta en cada línea, "..." en cada frase, preguntas retóricas cada dos líneas, "¡…!".
  Lo natural: "El problema es que…", "Pero…", "Lo raro es que…", "Así que…", "O sea, …", una opinión en
  primera persona de vez en cuando ("A mí lo que me inquieta es…").
- **Sigue valiendo todo lo demás**: frases cortas (1 frase = 1 imagen), cifras con letras y CERO dígitos,
  negaciones con verbo, siglas separadas para el TTS (C N M C, E T F), sin diálogo con atribución, misma
  estructura gancho (escena → pregunta → ítems → respuesta al final). No se añaden hechos nuevos al reescribir.
- **Etiquetas v4 moderadas: 8-10 distintas por guion, no 18**. Base: [calm] [serious] [curious] [tense]
  [surprised] [thoughtful] [amused] [warm] + [emphatic] solo en "Número X." + [friendly] en el CTA. Una por
  línea. "..." casi nunca (0-2 por guion): las comas y los puntos ya marcan la pausa.
- **Longitud a 1,1 de velocidad: 5.000-5.600 caracteres de narración sin etiquetas** (≈5-6 min). Medido
  igual que `generate_voice.read_script` (tras el `---`, sin `[etiquetas]`).
- **Shorts**: mismo tono llano; L1 = el título dicho en voz alta ("Este robot de casa cuesta veinte mil dólares.
  Y a veces no va solo."), 30-40 s, sin `rotulo:`, sin "..." ni [whispers]/[mischievously] de relleno.
- Reescritos así el 28-oct-2026 (con `script_v1.md` / `seo_v1.md` de copia): `asi-sera-un-dia-normal-en-2035`,
  `cada-red-social-y-como-te-engancha`, `por-que-tu-movil-va-mas-lento-con-los-anos`,
  `por-que-bitcoin-sube-y-baja`, `cuanto-gana-de-verdad-un-youtuber-en-espana`. Sus Shorts tienen `img: TODO`
  hasta re-mapear al nuevo `frames.json` (el `--dry-run` da error a propósito mientras haya TODO).
- **v3 el 29-oct-2026** (copias `script_v2.md` / `seo_v2.md`): los mismos cinco, con "Número X." plano, lista
  anunciada, 10 etiquetas distintas, 0 "...", 5.470-5.600 caracteres. Al cambiar el texto, la voz, el troceo
  y las imágenes del largo se regeneran (las `img:` de los Shorts apuntan a claves del `frames.json` v2).

### Largos DINÁMICOS (28-oct-2026, feedback del dueño sobre 2035) — HEREDADO

> El feedback (más SFX, más dinamismo, más color, algo nuevo cada pocos segundos) sigue vigente y
> es justo lo que hace el motor; las herramientas de abajo son del método de imágenes.

"Faltan muchísimos más efectos de sonido, tiene que ser mucho más dinámico; faltan imágenes, se
queda muchas veces en un fotograma; un pelín más lento; el mono es perfecto pero un poquito más de
color y más currado". Cuatro piezas genéricas, para TODOS los vídeos nuevos:

```
python scripts/split_segments.py <slug> --dry-run         # plan: cuántos segmentos, duración máx.
python scripts/split_segments.py <slug> --prefix v2_      # segmentos ≤2,5 s → frames.json esqueleto
python scripts/convert_to_stick.py <slug>                 # STYLE v2 (más color) en cada escena
python scripts/auto_sfx.py <slug>                         # SFX densos (--minimal = solo la capa fija)
python scripts/make_tsx.py <slug>                         # .tsx con movimiento + Root.tsx
```

- **Más imágenes** (`split_segments.py`): parte los segmentos de whisper por PALABRA (caché
  `words.json` en el manifest_dir, se invalida sola al re-vocear; la primera vez whisper `base`
  tarda ~9 min en CPU para 6 min de audio, luego es instantáneo) para que ninguna imagen pase de
  `--max 2.5` s de audio; corta en puntuación/pausas, nunca deja trozos < `--min 0.8` s ni termina en
  "de/la/y". Escribe `whisper_raw.json`, `raw_frames.json` y `frames.json` (scene=null). Duplica las
  imágenes (~0,04 € cada una con `lite`). Se niega si `frames.json` ya tiene escenas (`--force`,
  guarda `frames_presplit.json`) o si algún nombre ya existe como imagen (usa `--prefix vN_`). Se
  corre ANTES de escribir escenas; luego 1 escena por segmento leyendo SU texto, como siempre.
- **Movimiento** (`make_tsx.py`): Ken Burns continuo en cada imagen (zoom-in / paneo / zoom-out /
  paneo, escala ≤1,06), transición de 0,3 s en cada cambio (punch-in / slide / bounce, rotando),
  temblor tras las frases con giro ("pero", "sin embargo", "¡no!") y pop en preguntas y cifras.
  Fondo blanco. Máx. 2 `<Img>` a la vez. `make_tsx.py` actualiza también `durationInFrames` en Root.tsx.
- **SFX densos** (`auto_sfx.py`, modo por defecto): ~14 efectos por minuto de vídeo final
  (`--per-min`). Soplo en la mayoría de cambios de imagen (5 variantes), pop en cifras y nombres
  propios, golpe en giros, caja/monedas al decir dinero, ding en años/meses, riser que culmina en
  "¿adivinas…?"/"volvamos"/"veredicto", stings de "Número X". Solo archivos de la biblioteca
  (`remotion/public/*-sfx/`), nada de ElevenLabs. Volumen normalizado por sonoridad de cada archivo
  y limitado a 0,03-0,13 (la voz queda ~20 dB por encima). Música a 0.
- **Más color** (`convert_to_stick.py`, STYLE v2): mismo mono stick, pero paredes/suelo/cielo de
  color plano, objetos con colores alegres y fondos sencillos algo más currados; sigue siendo
  garabato sin sombras. Re-pasar el script sube a v2 las escenas convertidas con el v1. OJO: el
  bloque STYLE no puede llevar dígitos ni "blank"/"empty"/"no text" (desactivaría el chequeo 5 de
  `scene_diversity_check.py` en todas las escenas). Cambio de diseño ⇒ 2-3 muestras y OK del dueño
  antes de la tanda completa (regla de la Style Bible).

### GASTO DE IMÁGENES: tope duro de 250 € (oct-2026) — NO NEGOCIABLE

- Una cuenta anterior agotó el crédito gratis sin aviso y Google cobró ~100 € en la tarjeta.
  Cada imagen cuesta dinero: Flash ~0,04 €, Pro ~0,13 € (miniaturas). Un vídeo de imágenes ≈ 7-8 €
  (HEREDADO). Con el motor el gasto en Google es 0 €; el tope sigue vigente para cualquier imagen futura.
- `scripts/gasto.py`: cada imagen se apunta en `gasto_imagenes.jsonl`; al llegar a **250 €** el
  generador se para solo (`generate_frame` llama a `gasto.comprobar`). NUNCA subir el tope sin que
  el usuario lo pida por escrito.
- **Decirle al usuario el gasto en cada conversación** (`python scripts/gasto.py`). Además hay un
  aviso diario a las 10:00 (tarea "Tecnomono aviso gasto") y un presupuesto en Google con correos.
- Nada de pruebas de estilo ni regeneraciones masivas sin preguntar antes y decir lo que costará.

### Diagnóstico 16-oct-2026 (por qué no crecemos) y giro de temas

- Datos: 52 largos con **mediana de 31 vistas**; retención 30-50% (buena). El problema es el
  ALCANCE (temas), no el diseño ni la animación. El 89% de las vistas son Shorts, que no dan horas.
- Tieso Explica (@soytieso, misma liga: monigote estático): 36 vídeos, 1M de vistas, mediana 948.
  7 aciertos hacen el 95%: curiosidad masiva (terremotos 435k, déjà vu 138k, huracanes 103k) o
  España (fuerzas especiales 113k, policía 78k). Cuando uno pega, saca la SERIE (3 de policía seguidos).
- Por tanto: temas que entiende cualquiera ("Cada estafa que te pueden hacer en España", "Cada unidad
  que caza hackers en España") en formato "Cada X / Todos los X", con ángulo tecnología/ciber y
  España; noticias de IA y oficios tech, fuera. Si un vídeo supera 10x la mediana, la siguiente
  tanda son 2-3 más del mismo tema.

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

## Audio: SFX y música de fondo (HEREDADO; sin música desde 27-oct-2026; SFX del motor en `assets/sfx/motor/`)

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

## Adding a new video (HEREDADO)

> Vídeo nuevo = pipeline del MOTOR (arriba): entrada en `videos.json` con `"estilo": "motor"`,
> `script.md`, voz, `plano.json` y `motor_plano.py`. Sin `.tsx` ni `frames.json`.

1. Añade la entrada en [videos.json](./videos.json) (composición, naming, playback, rutas).
2. `channel/<canal>/videos/<video>/script.md` con el guion (1 frase por línea).
3. Crea `remotion/src/<VideoName>.tsx` modelado en [SuenoStick.tsx](remotion/src/SuenoStick.tsx), con los marcadores `// === FRAMES:START/END ===`, y regístralo en [Root.tsx](remotion/src/Root.tsx).
4. `frames.json` con los prompts de escena (campo `scene`) por imagen.
5. `python scripts/orchestrate.py --video <video>` y deja que el orquestador haga el resto.

## Critical gotchas

> Las de OAuth, `upload_youtube.py`, voz y miniatura siguen vigentes. Las de imágenes, `frames.json`,
> segmentos de whisper, naming `M_SS.jpg`, Higgsfield/Gemini y música son del método HEREDADO.

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

## Cost / capacity reference (HEREDADO: imágenes generadas; con el motor Google = 0 €, solo ElevenLabs)

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
