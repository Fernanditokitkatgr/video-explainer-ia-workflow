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
