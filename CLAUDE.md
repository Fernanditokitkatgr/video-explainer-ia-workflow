# CLAUDE.md

Guía para Claude Code (y para cualquier persona) que trabaje en este repositorio: la fábrica de vídeos
del canal **Tecnomono**. Responde siempre en **español** (castellano de España).

## Cómo está organizado este archivo

1. **Forma de trabajar actual: el motor de animación** (manda sobre todo lo demás).
2. **Reglas editoriales vigentes**: producción, temas, guion, voz.
3. **Miniatura y SEO.**
4. **Publicación, TikTok y gasto.**
5. **Estructura del repo, instalación y comandos.**
6. **Gotchas vigentes.**
7. **Agentic channel analytics y skills.**
8. **Método HEREDADO** (imágenes generadas): solo un resumen; el detalle está en
   [docs/heredado/reglas-metodo-imagenes.md](docs/heredado/reglas-metodo-imagenes.md).

Guías para personas, por tema: [docs/README.md](docs/README.md). Si una guía de `docs/` contradice a
este archivo, manda este archivo y hay que corregir la guía.

**No muevas ni renombres** nada que usen las tareas programadas de Windows (`scratch-yt/daily_publish.bat`,
`scratch-yt/tiktok_next.bat`, `scripts/aviso_gasto.ps1` y lo que llaman), ni los scripts que se importan
entre sí por nombre, ni `videos.json`, `gasto_imagenes.jsonl` o los `state.json`. Lo obsoleto se mueve a
`archivo/` con su explicación en `archivo/README.md`; no se borra.

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
   (reglas de "Guion natural" en "Reglas editoriales vigentes": lista anunciada, "Número X." plano, 5.000-5.600 caracteres,
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
| `pueblo` | Mundo PERSISTENTE que crece (`EscenasMundo.tsx`, se registra desde `index.ts`): colina con casas, máquinas, naves de servidores, refrigeración, nuclear, central, molinos y postes; cables con luz, apagón, calor, zoom, medidor. Para encadenarlo entre tramos, repítelo con `continua: true` (los elementos sin `al` ya están). Ejemplo: `por-que-la-ia-gasta-tanta-energia` | `elementos: [{id, tipo, x, escala, al, quita_al, texto, texto_al, calor_al}]`, `cables: [{de, a, al}]`, `apagon_al`, `vuelve_al`, `zoom: {desde, hasta, al}`, `medidor: {texto, desde, hasta, al, hasta_al}`, `cartel`, `continua`; usar `caja: {y: 250, w: 1100}` para que no choque con los personajes |
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
- **Carpeta pública mínima** (`remotion/public-motor`, unas decenas de MB: fuente, SFX y `voz.mp3` + `plano.json`
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
- Plantilla para empezar: `channel/tecno/_plantilla_motor/` (ver su `LEEME.md`); checklist en `docs/checklist-produccion.md`.

### Vídeos hechos con el motor (referencia)

Largos: `por-que-bitcoin-sube-y-baja`, `cuanto-gana-de-verdad-un-youtuber-en-espana`,
`por-que-tu-movil-va-mas-lento-con-los-anos`. Shorts: `short-asi-te-roba-un-hacker-la-contrasena`,
`short-por-que-la-ia-se-inventa-cosas`. Sus `plano.json` son los mejores ejemplos para copiar.

---

## Guiones y revisión (desde 6-nov-2026)

- **Temas:** solo lo que el dueño clicaría: cosas cotidianas de tecnología, profesiones y roles, el día a día de cada profesión, tier lists, errores más cometidos, tops y utilidad. Nada de conceptos abstractos de ciberseguridad.
- **Guion:** ninguno pasa a voz sin superar el filtro de [channel/tecno/GUIONES_HOOKS.md](channel/tecno/GUIONES_HOOKS.md). Formatos en [channel/tecno/FORMATOS.md](channel/tecno/FORMATOS.md).
- **Shorts:** solo del motor. Los del formato antiguo se retiraron de la cola y quedan privados en YouTube.
- **Revisión:** tras cada vídeo, `python scripts/revision.py`. Enlaza los MP4 de `channel/tecno/pruebas/` en `channel/tecno/REVISION/` y regenera `REVISION.html` con el calendario real de YouTube. El plan y lo descartado van en `channel/tecno/REVISION/notas.json`.
- **Diseños:** las pruebas de diseño se quedan en `channel/tecno/pruebas/` hasta que el dueño decida.

## Reglas editoriales vigentes

Valen para el motor y salieron de datos reales del canal y de la competencia.

### Producción

- **UN vídeo al día, nunca en tanda.** Si se piden 3 vídeos, son 3 días distintos. Se publicaron 3 de
  golpe una vez y hubo que corregirlo. **Ni un día sin subir.**
- **Duración objetivo: 5-7 minutos de vídeo final** (decisión del dueño, 16-oct-2026: prefiere corto a
  13 min; se compensa con más visionados, no con más duración). Guion de **5.000-5.600 caracteres de
  narración** (≈5-6 min con el motor a velocidad 1,0; el largo del youtuber salió en 308 s). Datos
  propios: los largos de 4-4,5 min retienen 48-50 % y los de 6-7 min, 26-35 %.
- **Velocidad: `playback_rate` 1.0** en el motor (voz natural). No se acelera la voz.
- **`scripts/preflight.py` es un gate, no un consejo.** Con `"estilo": "motor"` corre `check_plano`. Si
  falla, no se publica.
- **Lo que el gate NO puede juzgar** sigue necesitando persona o agente: si la escena pega con SU frase,
  si hay variedad real y **la expresividad de la voz** (Claude no puede oír el audio: eso lo valida
  siempre una persona).

### Elegir el tema

- **El tema sale de `channel/tecno/topic_backlog.md`.** Los explicativos buscables ("Así funciona la IA",
  1.009 vistas) funcionan; las noticias de seguridad IA dieron 0-15 vistas. Cada vídeo debe entenderse
  SOLO, sin "en el vídeo anterior…" (el espectador llega desde búsqueda).

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
- Si un Short tiene un largo relacionado, lleva "Vídeo completo: enlace" en la descripción (en los
  heredados lo ponía `publish_shorts.py`; en los del motor, a mano en `--description`). La API de
  YouTube NO permite fijar el "vídeo relacionado" de un Short (comprobado en la referencia de
  `videos`): solo se puede a mano en Studio.

### Reglas de viralidad (oct-2026) — detalle y ejemplos en `channel/tecno/viral_playbook.md`

- **El tema manda más que el formato.** "TODOS los X explicados" solo se dispara con personajes
  (hackers, mafias, ciberataques: x6-x19); las listas de hardware del mismo canal se hunden (x0,2-x1).
- **Abre con la escena, no la anuncies.** Nada de "prepárate", "hoy vas a entender" ni
  presentaciones en las 3 primeras líneas. Antes del segundo 15, una escalada ("¿esto es lo peor? No.").
- **Un dato con nombre propio cada 20-30 s y un giro cada ~60 s.**
- **Título con una palabra de tensión** (está en el 41% del top de la competencia frente al 11%
  de los peores). Los números y las MAYÚSCULAS no marcan diferencia.
- **Miniatura: o cuadrícula de 8-10 personajes con etiqueta, o un único elemento con 2-3 palabras.**
  El texto completa el título y NUNCA da la respuesta (mal: "¿EXISTE? NO."). Rotar la emoción del
  protagonista y meterlo dentro de la escena, no siempre señalando con cara de susto.
- **Shorts que dicen el título en la primera frase** (ver "Shorts con el motor"). Si llevan texto fijo
  arriba, se entiende SOLO, sin haber visto el vídeo: nombra el tema, sin pronombres ni analogías
  internas (mal: "¿QUIÉN LA INVENTÓ?"; bien: "¿QUIÉN INVENTÓ LA DARK WEB?"). Se ve sin sonido.
- **Cada subida gasta el límite del canal** (`uploadLimitExceeded`) y los Shorts no suman horas de
  visualización: no inundar el canal de Shorts.

### Voz y música (27-oct-2026, decisión del usuario)

- **Voz SIEMPRE con Eleven v4**: `python scripts/generate_voice.py --video <slug> --model eleven_v4`
  (el `.env` sigue en eleven_v3 y el agente no puede editarlo). v4 respeta las etiquetas
  [curious]/[tense]… sin leerlas en voz alta (comprobado con whisper).
- **SIN música de fondo**: a la audiencia no le gusta. Los efectos puntuales SÍ se quedan
  (en el motor cada escena trae los suyos). No volver a ponerla hasta que el usuario elija música.


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
- **Sigue valiendo todo lo demás**: frases cortas (una idea por frase = un tramo del plano), cifras con letras y CERO dígitos,
  negaciones con verbo, siglas separadas para el TTS (C N M C, E T F), sin diálogo con atribución, misma
  estructura gancho (escena → pregunta → ítems → respuesta al final). No se añaden hechos nuevos al reescribir.
- **Etiquetas v4 moderadas: 8-10 distintas por guion, no 18**. Base: [calm] [serious] [curious] [tense]
  [surprised] [thoughtful] [amused] [warm] + [emphatic] solo en "Número X." + [friendly] en el CTA. Una por
  línea. "..." casi nunca (0-2 por guion): las comas y los puntos ya marcan la pausa.
- **Longitud: 5.000-5.600 caracteres de narración sin etiquetas** (≈5-6 min). Medido
  igual que `generate_voice.read_script` (tras el `---`, sin `[etiquetas]`).
- **Shorts**: mismo tono llano; L1 = el título dicho en voz alta ("Este robot de casa cuesta veinte mil dólares.
  Y a veces no va solo."), ~190 palabras (≈58 s con el motor), sin "..." ni [whispers]/[mischievously] de relleno.
- Reescritos así el 28-oct-2026 (con `script_v1.md` / `seo_v1.md` de copia): `asi-sera-un-dia-normal-en-2035`,
  `cada-red-social-y-como-te-engancha`, `por-que-tu-movil-va-mas-lento-con-los-anos`,
  `por-que-bitcoin-sube-y-baja`, `cuanto-gana-de-verdad-un-youtuber-en-espana`. Sus Shorts tienen `img: TODO`
  hasta re-mapear al nuevo `frames.json` (método heredado).
- **v3 el 29-oct-2026** (copias `script_v2.md` / `seo_v2.md`): los mismos cinco, con "Número X." plano, lista
  anunciada, 10 etiquetas distintas, 0 "...", 5.470-5.600 caracteres. Tres de ellos (bitcoin, youtuber y móvil)
  se rehicieron después con el motor.

### Storytelling

- **Con una sola voz narradora y sin subtítulos, NUNCA escribas diálogo con atribución** ("dice X", "responde Y", "pregunta Z"). Con un único narrador no hay forma de que el oyente distinga personajes por la voz — ese patrón confunde en vez de aclarar. Cuenta el mismo hecho/chiste en narración directa de tercera persona (ej. en vez de `¿Con qué barco? —Buen punto.`, escribe `Pero en el puerto solo había canoas, muy lejos de lo necesario`).
- **Hook**: promete el pago final desde la primera frase (ej. "ni la comida de tu nevera, ni el idioma que hablas serían iguales") y resuélvelo literalmente al cierre, con eco del lenguaje de apertura — cierra el bucle narrativo en vez de solo añadir una CTA suelta.
- **Causalidad antes que lista de hechos**: cada sección debe explicar el *por qué* antes de enumerar datos (ej. explicar por qué un escenario es "poco probable" con una prueba concreta, no solo declararlo).
- **Cohesión con conectores que nombran el sujeto**: dentro de una sección NUNCA encadenes datos sueltos tipo ficha ("Dificultad: alta. Sueldo: X."). Usa conectores que renombren el trabajo/sujeto y creen ritmo pregunta→respuesta (ej. "¿Y cómo de difícil es ser *data engineer*? Media, y se aprende sin carrera"). Cada frase le da la mano a la anterior; el bloque debe leerse como algo CONTADO, no como una lista.
- **Estructura fija y repetida entre ítems** (vídeos tipo ranking/lista): define una plantilla de datos por ítem (ej. qué hace → qué necesitas → dificultad → proyecto → sueldo) y respétala en TODOS los ítems, en el mismo orden. El público aprende el patrón y se relaja = retención. Varía las PALABRAS, nunca el orden.
- **Hilo conductor**: escoge una metáfora única que enhebre todo el vídeo (ej. "montamos una IA pieza a pieza: conciencia, comida, ojos, cuerpo, cerebro, jefe") y referénciala en cada transición entre secciones, para que no sea una sucesión de bloques inconexos.
- **Frases muy cortas = un golpe visual por frase**: en el motor, algo nuevo en pantalla cada 2-3 s.
- **Algo accionable por ítem cuando el tema lo permita**: un mini-proyecto que el espectador pueda hacer "este finde" dispara comentarios y guardados (señal fuerte para el algoritmo).
- Emotion tags `[tono ...]` siguen sirviendo para variar la ENTONACIÓN de un mismo narrador (no para fingir personajes distintos).

---

## Miniatura — paso obligatorio

- **Con el motor la imagen base es un fotograma del propio vídeo**:
  `python scripts/motor_plano.py <slug> --still <segundo> --out <manifest_dir>/thumbnail.png`, pasarlo a
  `thumbnail.jpg` (`ffmpeg -i thumbnail.png thumbnail.jpg`) y `python scripts/thumbnail_text.py --video <slug>`,
  que lee de `seo.md`:
  ```
  ## Miniatura
  texto: SE INVENTÓ|UNA PERSONA      ← "|" = salto de línea, 2-4 palabras
  resaltar: PERSONA                  ← en amarillo; el resto en blanco con contorno negro
  posicion: left                     ← left | right | top (lado libre)
  ```
  Sale `thumbnail_final.jpg`, la que usa `publish_from_recipe.py` por defecto.
- **El TEXTO siempre por código**, nunca con una IA de imagen (inventa letras).
- **Máximo ~4 palabras**, en español y mayúsculas, que se lean a tamaño de móvil. Una cifra concreta
  ("80.000 €", "3.700 IAs") rinde más que un adjetivo. Fondo de color > blanco.
- **Un único sujeto focal** con expresión clara, no una escena con muchos personajes pequeños.
- El texto es una **afirmación o pregunta con gancho** que **completa** el título sin repetirlo y sin dar
  la respuesta, pero **conecta con su concepto central** (si el título habla de "red neuronal", la
  miniatura también).
- Elegir el fotograma con quien pidió el vídeo si hay dudas (2-3 candidatos).
- Generar la base con Gemini/Higgsfield o en cuadrícula (`grid_thumbnail.py`) es HEREDADO.

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
   método heredado, `fill_seo_times.py` desde `frames.json`. Mínimo 3 capítulos, ≥10s cada uno,
   empezando en 0:00 — no timestamps aproximados a ojo.
5. **Tags**: 15-20, mezcla de keyword principal + variaciones semánticas + términos de la
   entidad/época/tema concretos (nombres propios, fechas, lugares) — no repitas la misma keyword
   con sinónimos triviales.
6. **Hashtags**: máximo 3 en la descripción (los que se muestran sobre el título).
7. Guarda el paquete final en `channel/<canal>/videos/<video>/seo.md` (mismo patrón que
   `script.md`) para que quede versionado y no se pierda entre sesiones.
8. **Título ≤60 caracteres** (en móvil se corta a los ~50): palabra buscada primero ("Qué hace
   un…", "Así funciona…", "Cuánto cobra…") + giro entre paréntesis. Nada de títulos-frase de 90+.
   `publish_from_recipe.py` usa la línea marcada `← recomendado` (o la primera numerada).

---

## Publicación (detalle: [docs/publicacion.md](docs/publicacion.md))

- **Largos:** con el vídeo renderizado, `thumbnail_final.jpg`, `seo.md` completo y `preflight.py --stage publish`
  en verde, se añade el slug a `scratch-yt/pending_long.txt` (uno por línea, en orden). La tarea
  **"Tecnomono YouTube 0935"** (`daily_publish.bat` → `daily_publish.py`; diaria desde las 08:35 y cada 2 h)
  sube hasta 2 largos por ejecución con `publish_from_recipe.py` (hueco diario a las **19:00 de Madrid** de
  `publish_queue.py`, privado con `publishAt`) y luego los Shorts heredados pendientes. Si la cuota se
  agota, PARA y conserva lo que falta.
- **Shorts del motor:** a mano con
  `python scratch-yt/upload_youtube.py remotion/output/<slug>.mp4 --title "…" --description "…" --tags "a,b,c" --thumbnail … --category 28 --publish-at <ISO UTC>`.
  Apuntar fecha e ID en su `seo.md`.
- `python scratch-yt/sync_descriptions.py` lleva a YouTube los capítulos de `seo.md` de vídeos ya subidos.
- Tras subir un Short, el **vídeo relacionado** se pone a mano en Studio (la API no lo permite).

## TikTok (detalle: [docs/shorts-y-tiktok.md](docs/shorts-y-tiktok.md))

- SEO de TikTok ≠ YouTube: TikTok se usa como buscador, así que la **primera línea** del texto es la
  keyword (el título del Short), luego una frase y 3-5 hashtags concretos (los del vídeo +
  `#aprendeentiktok #tecnologia`). Cierre "SÍGUEME PARA MÁS COMO ESTE" en vez de mandar a YouTube.
- `scratch-yt/tiktok_api.py` usa la Content Posting API oficial. Sin auditoría de TikTok todo sale
  **privado** (`TIKTOK_PRIVACY=SELF_ONLY`); la API **no programa horas** (publica al momento), por eso
  `next` sube un Short por ejecución desde las tareas "Tecnomono TikTok 1330" y "2130"
  (`scratch-yt/tiktok_next.bat`, registro en `scratch-yt/tiktok_cron.log`; requiere el PC encendido). El
  login de escritorio exige PKCE con SHA256 en **hex**. Se etiqueta `is_aigc`.
- **Pendiente (3-nov-2026):** las tareas fallan cada día porque faltan `TIKTOK_CLIENT_KEY` y
  `TIKTOK_CLIENT_SECRET` en `.env`, y `tiktok_api.py`/`tiktok_pack.py` solo encuentran Shorts en
  `shorts_tiktok/` (los de `make_shorts.py --tiktok`, heredado): los Shorts del motor aún no entran en
  la automatización de TikTok.

---

## GASTO DE IMÁGENES: tope duro de 250 € (oct-2026) — NO NEGOCIABLE

Detalle: [docs/gasto-y-costes.md](docs/gasto-y-costes.md).

- Una cuenta anterior agotó el crédito gratis sin aviso y Google cobró ~100 € en la tarjeta.
  Cada imagen cuesta dinero: Flash ~0,04 €, Pro ~0,13 € (miniaturas). Un vídeo de imágenes ≈ 7-8 €
  (HEREDADO). Con el motor el gasto en Google es 0 €; el tope sigue vigente para cualquier imagen futura.
- `scripts/gasto.py`: cada imagen se apunta en `gasto_imagenes.jsonl`; al llegar a **250 €** el
  generador se para solo (`generate_frame` llama a `gasto.comprobar`). NUNCA subir el tope sin que
  el usuario lo pida por escrito.
- **Decirle al usuario el gasto en cada conversación** (`python scripts/gasto.py`). Además hay un
  aviso diario a las 10:00 (tarea "Tecnomono aviso gasto") y un presupuesto en Google con correos.
- Nada de pruebas de estilo ni regeneraciones masivas sin preguntar antes y decir lo que costará.

---

## Estructura del repo

```
README.md · CLAUDE.md · videos.json · gasto_imagenes.jsonl · requirements.txt · .env.example · produce.bat (heredado)
docs/                    ← guías por tema (docs/README.md); docs/heredado/ = método de imágenes
channel/tecno/           ← playbooks (viral_playbook.md, shorts_playbook.md, script-formats.md), topic_backlog.md,
                           competitor_report.md, style-bible.json (heredado), references/, assets/
  _plantilla_motor/      ← plantilla de vídeo nuevo (script.md, plano.json comentado, seo.md, shorts/)
  videos/<slug>/         ← RECETA por vídeo (va a git): script.md · plano.json · words.json · seo.md ·
                           shorts/shorts.json (vacío en los largos del motor). HEREDADO: frames.json · sfx.json · state.json
  pruebas/motor/         ← hoja de personajes y pruebas del motor
remotion/
  src/motor/             ← MOTOR (entrada propia src/motor/index.ts)
  src/*.tsx + Root.tsx   ← HEREDADO: 85 composiciones, una por vídeo de imágenes (make_tsx.py reescribe Root.tsx)
  src/pruebas/           ← composiciones de prueba (Short animado de ChatGPT)
  public-motor/          ← carpeta pública MÍNIMA del motor
  public/                ← HEREDADO (~7 GB, gitignored): audios, imágenes y SFX antiguos; la voz nueva también se genera aquí
  out/                   ← props, candados y temporales del render
  output/                ← MP4 finales (gitignored)
assets/                  ← fonts/Montserrat-ExtraBold.ttf · sfx/motor (44 SFX + sfx_gain.json) · sfx/shorts (heredado)
scripts/                 ← herramientas (mapa con estado en docs/scripts.md)
scratch-yt/              ← publicación YouTube/TikTok (lo lanzan las tareas programadas: NO mover)
agentic-channel-analytics/ ← auditoría de canales y fórmula de guiones (benchmark @ecomonos)
scripts-out/             ← HEREDADO: guiones antiguos que videos.json aún referencia
tiktok_inbox/            ← local: Shorts preparados para TikTok
archivo/                 ← retirado pero conservado (archivo/README.md)
```

Scripts del motor y comunes: `motor_plano.py`, `preflight.py`, `generate_voice.py`, `whisper_timestamps.py`,
`check_negations.py`, `thumbnail_text.py`, `config.py` (lee `.env`: única fuente de verdad), `gasto.py`,
`competitor_scan.py`. El resto de `scripts/` es del método heredado (ver [docs/scripts.md](docs/scripts.md)).

## Instalación (detalle: [docs/instalacion.md](docs/instalacion.md))

```bash
pip install -r requirements.txt      # requests, python-dotenv, faster-whisper, Pillow, librerías de Google para YouTube
cp .env.example .env                 # para el motor basta ELEVENLABS_API_KEY
cd remotion && npm install && cd ..
```
El `.env` es **local** (gitignored). Las claves se comparten por canal seguro, NUNCA en git.
Hace falta ffmpeg en el `PATH`.

## Comandos

Motor (método actual):
```bash
python scripts/motor_plano.py <slug>                 # resuelve y valida el plano (crea words.json la 1.ª vez)
python scripts/motor_plano.py <slug> --render        # render + loudnorm → remotion/output/<slug>.mp4
python scripts/motor_plano.py <slug> --stills 3,10,25 --dir <carpeta>
python scripts/motor_plano.py <slug> --still 4.5 --out x.png
python scripts/motor_plano.py <slug> --capitulos     # capítulos reales en seo.md
python scripts/motor_plano.py <slug> --negaciones    # check_negations.py con words.json
python scripts/motor_plano.py <slug> --voz otra.mp3  # otra locución (words_<nombre>.json)
python scripts/motor_plano.py --hoja                 # hoja de personajes
python scripts/preflight.py --video <slug> --stage publish
python scripts/gasto.py                              # gasto de imágenes (decírselo al dueño)
```

Remotion (desde `remotion/`):
```bash
npm run dev                # Remotion Studio con el motor (src/motor/index.ts, public-motor)
npm run dev:heredado       # Studio con las composiciones antiguas (src/index.ts)
npm run typecheck:motor    # tipos del motor con tsc (no hay tsconfig.json: Remotion no lo necesita)
```
Los renders del motor se lanzan SIEMPRE con `motor_plano.py --render` (prepara `public-motor`, pone el
candado y aplica loudnorm). No hay tests ni lint, salvo `scratch-yt/test_youtube_channel.py`.

---

## Gotchas vigentes

> Los del método de imágenes (whisper por segmentos, naming `M_SS.jpg`, Gemini/Higgsfield, música,
> `playbackRate`) están en [docs/heredado/reglas-metodo-imagenes.md](docs/heredado/reglas-metodo-imagenes.md).

- **OAuth de YouTube caduca cada 7 días** mientras la app siga en modo "Testing" en Google Cloud
  (`invalid_grant: Token has been expired or revoked`). Renovar con `python scratch-yt/reauth.py`
  (abre el navegador). Solución definitiva: publicar la app OAuth en producción.
- **Los subagentes en background pueden fallar silenciosamente** (límite de gasto de la org u otro corte) y devolver un resumen de texto que describe una tarea que NUNCA se ejecutó ("he lanzado un agente para...", "ya he generado X"). Verifica siempre con `ls`/existencia real de ficheros antes de confiar en el resumen de un agente, sobre todo en tandas grandes de generación de audio o renders.
- **NO pases `--stability`/`--style` a `generate_voice.py` "para mejorar la entonación": el `.env` ya está afinado y el override la EMPEORA.** El `.env` del canal está en `ELEVENLABS_STABILITY=0.10` / `ELEVENLABS_STYLE=0.68` (muy expresivo). Los defaults de `config.py` (0.45/0.30) son mucho más conservadores, así que comparando contra ELLOS parece que pasar 0.30/0.55 "sube" la expresividad — y en realidad la baja: sube la estabilidad (menos variación) y baja el style. Así salieron 4 vídeos con voz plana antes de detectarlo. **Comprueba siempre `grep ELEVENLABS .env` antes de asumir la configuración de voz; el `.env` es la fuente de verdad, no los defaults del código ni este documento.** `generate_voice.py` ahora imprime los ajustes efectivos y deja un sidecar `<audio>.voice.json` que `preflight.py` compara contra el `.env` para que una regresión así no vuelva a pasar en silencio.
- Las etiquetas de emoción inline (`[tono curioso]`, `[excited]`, `[ominous]`…) siguen ayudando en los puntos de énfasis, pero por sí solas no compensan unos `voice_settings` mal puestos.
- **La miniatura debe conectar con el título elegido, no ser un gancho genérico desconectado del tema** (ej. si el título es "red neuronal por dentro", el texto de la miniatura debería mencionar "red neuronal", no una pregunta suelta tipo "¿cómo ve esto tu cerebro?" que no se relaciona). Sigue siendo válido no repetir el título palabra por palabra (ver sección Miniatura), pero el concepto central sí debe coincidir.
- **`captions.insert` (subir subtítulos vía API) da 403 `insufficientPermissions` con el scope `youtube` que ya basta para `videos.insert`/`thumbnails.set`.** Hace falta añadir también `https://www.googleapis.com/auth/youtube.force-ssl` a `SCOPES` en `upload_youtube.py` y volver a autenticar (borrar `token.json` si ya existía con el scope antiguo) — si no, la subida de vídeo+miniatura funciona pero los subtítulos fallan silenciosamente al final del pipeline.
- **Cada canal/colaborador necesita su propio proyecto de Google Cloud + cliente OAuth para YouTube**, incluso reutilizando el mismo repo — la app OAuth vive en modo Testing con una lista fija de "usuarios de prueba"; no se puede compartir `client_secret.json` entre cuentas de Google distintas sin añadir cada cuenta a esa lista, y aun así es más limpio que cada canal tenga su propio proyecto aislado. Ver `scratch-yt/GUIA-COLABORADOR-YOUTUBE.md` para el proceso paso a paso.
- **`upload_youtube.py` crasheaba DESPUÉS de subir el vídeo con éxito** por un `UnicodeEncodeError` al imprimir emojis (✅) en una consola Windows con codepage `cp1252` — el vídeo sí se subía, solo fallaba el print de confirmación, lo que puede hacer parecer un fallo total cuando no lo es. Verificar siempre con `youtube.search().list(forMine=True, order='date')` antes de asumir que un traceback significa que la subida no ocurrió. Arreglado con `sys.stdout.reconfigure(encoding="utf-8")` al inicio del script.

---

## Agentic channel analytics y skills

Herramienta aparte en `agentic-channel-analytics/` que audita canales y produce guiones; lo que sale alimenta el pipeline de arriba. La referencia es **@ecomonos** (perfil en `channels/ecomonos.md`; fórmula en `reference/`).

Skills de proyecto (se invocan con `/nombre` tras reiniciar Claude Code). Estado real a 3-nov-2026: en git
están `channel-audit`, `channel-setup` y `video-seo` (`.claude/` está en `.gitignore`, pero esas tres se
versionaron a mano); `video-reviewer` existe solo en local; `channel-formula`, `script-forge` y
`thumbnail-creator` no existen en este clon (si hacen falta, seguir a mano lo que dice este archivo).

| Skill | Para qué |
|---|---|
| `/channel-formula` | Saca el ADN viral de un canal a un perfil `channels/<slug>.md` |
| `/channel-audit` | Audita la fórmula de un canal frente a Ecomonos y devuelve arreglos P0/P1/P2 |
| `/script-forge` | Escribe un guion con la voz del canal (lee `channels/<slug>.md`) |
| `/thumbnail-creator` | (Heredado) variantes de miniatura con Higgsfield, puntuadas con la rúbrica |
| `/video-seo <slug>` | Título, descripción con capítulos y tags; revisión humana; subida del MP4 y la miniatura por la API |
| `/channel-setup` | Configura o audita la presentación del canal (about, keywords, tráiler, secciones, listas, banner) |

Si `/nombre` no está disponible, abre `.claude/skills/<nombre>/SKILL.md` y síguelo a mano. `/thumbnail-creator`
generaba con Higgsfield: con el motor la miniatura sale de un fotograma (ver "Miniatura").

Datos de YouTube: YouTube bloquea el scraping tras el aviso de consentimiento, así que las skills trabajan con datos pegados (URL del canal, títulos y vistas, transcripciones, exportaciones de retención/CTR de Studio).

---

## Método HEREDADO: imágenes generadas + Ken Burns (hasta oct-2026)

Así se hicieron los vídeos antiguos: guion → voz → whisper por segmentos → una escena por frase en
`frames.json` → imágenes con Gemini/Vertex AI (o Higgsfield) con imagen de referencia → QC visual →
SFX y música → `make_tsx.py` (un `.tsx` por vídeo en `remotion/src/`, registrado en `Root.tsx`) →
render → Shorts recortados con `make_shorts.py` y `publish_shorts.py`. Orquestado con
`scripts/orchestrate.py` (`state.json`) o `produce.bat`.

**No se usa para vídeos nuevos.** Todo el detalle (Style Bible, `scene_diversity_check.py`,
`scene_context.py`, QC con agentes, Shorts con imágenes y subtítulos karaoke, `gancho`/`reveal`,
largos dinámicos, SFX y música, velocidad 1.1, gotchas de whisper, Gemini y Higgsfield, costes) está en:

- [docs/heredado/reglas-metodo-imagenes.md](docs/heredado/reglas-metodo-imagenes.md) — las reglas que estaban aquí
- [docs/heredado/workflow-imagenes.md](docs/heredado/workflow-imagenes.md) — guía paso a paso
- [docs/heredado/orquestador.md](docs/heredado/orquestador.md) — orquestador y relevo
