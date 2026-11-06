# El motor de animación

Desde el 3-nov-2026 **todos los vídeos nuevos de Tecnomono, largos y Shorts, se animan por código**.
No se genera ninguna imagen: el mono stick cutre, sus amigos, las escenas gráficas, el fondo de rayos y
los efectos de sonido se dibujan en SVG/CSS con Remotion.

Esta página explica la idea y el recorrido. La **referencia completa** (todas las escenas con sus
campos, poses, caras, objetos, iconos, colores y SFX) está en la sección
"FORMA DE TRABAJAR ACTUAL" de [CLAUDE.md](../CLAUDE.md): se mantiene en un solo sitio para que no
se desincronice cada vez que se añade un personaje o una escena.

## La idea en tres frases

1. **Un vídeo = guion + voz + `plano.json`.** Ningún vídeo nuevo necesita programar.
2. El `plano.json` dice qué pasa en cada frase (escenas, personajes, sonidos) y se **ancla a las
   palabras de la locución** con `"@palabra"`.
3. `scripts/motor_plano.py` resuelve las anclas con los tiempos reales de la voz (`words.json`), valida
   el plano, saca fotogramas de revisión y renderiza.

```
script.md ──generate_voice.py──▶ voz.mp3 ──whisper──▶ words.json
                                                   │
plano.json (a mano) ───────────────────────────────┴──▶ motor_plano.py ──▶ remotion/output/<slug>.mp4
```

## Dónde vive cada cosa

| Ruta | Qué es |
|---|---|
| `remotion/src/motor/` | El motor. Entrada propia (`index.ts` → `Root.tsx`), separada de `remotion/src/Root.tsx` (vídeos antiguos) |
| `remotion/src/motor/MotorPlano.tsx` | La composición genérica que lee cualquier plano |
| `remotion/src/motor/Mono.tsx` | Personajes, poses, caras y objetos |
| `remotion/src/motor/Escenas.tsx` | Biblioteca de escenas (cifra, gráfica, chat, mapa, sello…) |
| `remotion/src/motor/Reparto.tsx` | Entradas, salidas, desplazamientos y bocadillos |
| `remotion/public-motor/` | Carpeta pública **mínima** del render (fuente, SFX y, por vídeo, `voz.mp3` + `plano.json` + `words.json`). La prepara `motor_plano.py` |
| `assets/sfx/motor/` | Biblioteca de efectos del motor + `sfx_gain.json` (sonoridad igualada) |
| `scripts/motor_plano.py` | Resolver, validar, fotogramas, capítulos y render con loudnorm |
| `scripts/preflight.py` | Gate antes de publicar; con `"estilo": "motor"` usa `check_plano` |
| `channel/tecno/videos/<slug>/` | La receta del vídeo: `script.md`, `plano.json`, `words.json`, `seo.md` |
| `channel/tecno/_plantilla_motor/` | Plantilla para empezar un vídeo nuevo |

## Recorrido de un vídeo

El orden exacto, con comandos, está en [checklist-produccion.md](./checklist-produccion.md). En resumen:

1. Tema del backlog y guion v3 en `script.md`.
2. Entrada en `videos.json` con `"estilo": "motor"`.
3. Voz con `eleven_v4`.
4. Primer borrador de `plano.json` y `motor_plano.py <slug>` (crea `words.json` la primera vez).
5. Escribir el plano de verdad, validar y revisar fotogramas (`--stills`).
6. Render, miniatura, capítulos, `preflight.py` y a la cola de publicación.

## Por qué está hecho así

- **Coste:** Google está bloqueado y las imágenes costaban dinero. El motor cuesta 0 € en imágenes;
  solo se paga la voz.
- **Ritmo:** el dueño pidió algo nuevo en pantalla cada pocos segundos y más movimiento. El validador
  mide el ritmo y `preflight.py` falla con huecos de más de 5 s.
- **Disco:** el bundler de Remotion copia la carpeta pública a `%TEMP%` en cada render.
  `remotion/public` pesa unos 7 GB y llenaba el disco, por eso el motor usa `public-motor`.
- **Un render por slug:** dos renders del mismo vídeo a la vez se pisan; `motor_plano.py` lo impide
  con un candado en `remotion/out/<slug>.render.lock`.

## Ampliar el motor

Añadir personajes, poses, caras, escenas o iconos es bienvenido, siempre **de forma aditiva** (que los
planos existentes sigan funcionando). Al añadir algo:

1. Añádelo a su lista de validación (`TIPOS`/`POSES`/`CARAS` en `Mono.tsx`, `ESCENAS` en `motor_plano.py`).
2. Documéntalo en la sección del motor de [CLAUDE.md](../CLAUDE.md).
3. Comprueba que sigue compilando (`cd remotion && npm run typecheck:motor`)
   y que `python scripts/motor_plano.py --hoja` renderiza.

## Ejemplos para copiar

Largos: `por-que-bitcoin-sube-y-baja`, `cuanto-gana-de-verdad-un-youtuber-en-espana`,
`por-que-tu-movil-va-mas-lento-con-los-anos`. Shorts: `short-asi-te-roba-un-hacker-la-contrasena`,
`short-por-que-la-ia-se-inventa-cosas`. Sus `plano.json` están en `channel/tecno/videos/<slug>/`.

## Formatos v3 e imágenes de apoyo (nov-2026)

- **Formatos** (`remotion/src/motor/EscenasFormatos.tsx`): `capas`, `viaje`, `combate`, `reloj`, `tier_list`,
  `mito_verdad`, `linea_tiempo`, `experimento` e `imagen`. Catálogo con estructura, plantilla de hook y ejemplos en
  [channel/tecno/FORMATOS.md](../channel/tecno/FORMATOS.md).
- **Escena `imagen`** (aditiva): una imagen generada con Gemini como APOYO en un momento clave (un lugar, un objeto o
  un fondo que el código no dibuja bien). El mono y los gráficos siguen siendo de código.

  ```json
  {"tipo": "imagen", "archivo": "router.png", "prompt": "an old home wifi router with a sticker on its side",
   "al": "@pegatina", "pie": "LA CLAVE DE FÁBRICA", "modo": "marco", "aspecto": "16:9"}
  ```

  - `modo: "marco"` (por defecto) la pega como una foto con celo en la zona; `modo: "fondo"` la pone a pantalla completa
    con un velo blanco (`velo`, 0,18 por defecto). `aspecto`: `16:9`, `1:1` o `9:16`. `pie` y `pie_al`: rótulo debajo.
  - `python scripts/motor_imagenes.py <slug> [--dry-run]` genera las que falten en `<manifest_dir>/img_motor/`. Pasa por
    `gasto.py` en cada imagen (tope duro de 250 €), usa el `image_model` del vídeo (lite o flash, nunca pro) y se niega
    si el plano pide más de 15 imágenes en un largo o más de 5 en un Short. El estilo (rotulador sobre papel blanco,
    paleta del canal, sin texto ni personas) lo añade el script.
  - `motor_plano.py` copia `img_motor/` a `public-motor/<slug>/img/` y da error si falta alguna imagen del plano.
- **Más escenas** (mismo archivo): `juicio` (balanza con pruebas de acusación y defensa, marcador y veredicto con sello),
  `partida` (pantalla partida: dos bandos a la misma hora, reloj común y choques) y `mundo` (habitaciones continuas hechas
  con imágenes de apoyo; la cámara viaja de una a otra mientras el personaje camina). `reloj` admite `continua: true` para
  no repetir la entrada del reloj entre tramos seguidos.
- **Hook en el fotograma 0**: las palabras del rótulo del hook llevan `"al": "@-0.5"` (medio segundo antes del inicio),
  así ya están completas en el primer fotograma, sin la animación de entrada. Para que una escena entera ya esté montada (móvil, imagen de fondo, balanza) se le añade `"aparece": "@-0.6"`. El orden importa: la imagen de fondo va ANTES del rótulo en `escenas`, o lo tapa. El golpe va en el `sfx` del tramo:
  `[["golpe", 0.02, 1.0], ["boom", 0.04, 0.7]]`.
- **Guardia**: `make_tsx.py` ya no toca vídeos con `estilo: motor` (antes podía sobrescribir `MotorPlano.tsx`).

## Mundos temáticos y estilos de dibujo (nov-2026, en prueba)

Campo opcional `"mundo"` en `plano.json`, a la altura de `"reparto"` y `"tramos"`. **Sin el campo, el vídeo se pinta
exactamente igual que antes.** Código: `remotion/src/motor/Mundos.tsx` (catálogo, fondos, filtros y escenas) y
`remotion/src/motor/tema.ts` (tema de `Caja` y `Grande`).

```json
{"formato": "9:16", "mundo": "hacking", "reparto": {...}, "tramos": [...]}
```

| `mundo` | Qué cambia | Mono |
|---|---|---|
| `hacking` | Terminal oscuro, verde y rojo, volcado hexadecimal, barrido de escaneo | El mismo, con contorno blanco recortado |
| `ia` | Plano técnico azul, retícula, circuitos, cotas y cajetín | El mismo, con contorno blanco recortado |
| `periodico` | Periódico antiguo: papel, tinta, cabecera gótica, columnas | El mismo, sin contorno |
| `comic` | Bendé y rayos, color por tramo, rótulos en viñeta | Rotulador grueso, tinta plana, sombra a trama |
| `collage` | Cartón y papeles, rótulos de letras recortadas | Recorte de papel, animación a saltos (`paso`: 4 fotogramas) |
| `pegatina` | Colores saturados, pegatinas de fondo | Saturado, troquel blanco grueso y sombra dura |

Cada mundo trae fondo, cortinilla (se dispara al empezar cada tramo; el `color` del tramo no se usa), tema de cajas y
títulos, estilo de iconos (duotono SVG sobre los dibujos de `Iconos.tsx`), filtro del reparto, ambiente sonoro en bucle y
equivalencias de efectos (`sonidos`: p. ej. `whoosh` → `glitch`). Todo son bordes duros: **ningún filtro desenfoca**.

Escenas propias de los mundos (solo pintan bien dentro de uno; no llevan relleno automático si el tramo pone `"relleno": false`):

- `m_rotulo`: `texto` ("
" parte líneas), `kicker`, `al`, `tam`, `color` (`"alerta"` o un color), `zona: {x, y, w}`, `barra`. Con `al` negativo ya está completo en el fotograma 0.
- `m_paso`: `n`, `titulo`, `detalle`, `icono`, `al`, `y`, `color: "alerta"`.
- `m_visual`: `icono`, `al`, `y`, `tam`, `etiqueta`, `alerta_al`, `alerta_texto`.

**Limitaciones:** de las escenas clásicas, `texto`, `lista`, `sello` y los bocadillos usan `Caja`/`Grande` y heredan el
tema; las que dibujan con tinta negra directa (`flujo`, `grafica`, `mapa`, `pantalla`…) no están adaptadas y en los mundos
oscuros perderán sus líneas. Las fuentes de los mundos son del sistema (Consolas, Bahnschrift, Georgia Pro, Old English,
Impact, Rockwell Nova): el render depende de que estén instaladas.

Prueba comparativa con la misma voz: `channel/tecno/pruebas/mundos/` (`hacer_mundos.py` y un `plano.json` por mundo).
