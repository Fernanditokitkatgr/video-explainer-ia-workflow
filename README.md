# Tecnomono: fábrica de vídeos explicativos animados por código

**Tecnomono** es un canal de YouTube (y TikTok) en castellano que explica tecnología, internet,
ciberseguridad e IA con un mono stick cutre y sus amigos. Este repositorio es la fábrica entera:
guion → voz sintética → animación dibujada por código y sincronizada palabra a palabra → miniatura y
SEO → subida programada. Está en producción: un vídeo largo al día más Shorts.

- **Desde el 3-nov-2026** todo se anima con un **motor propio en Remotion** (`remotion/src/motor/`).
  No se genera ninguna imagen: Google cuesta 0 € y solo se paga la voz de ElevenLabs.
- Hasta oct-2026 se usaban imágenes de Gemini/Higgsfield con Ken Burns. Ese método queda
  **heredado** ([docs/heredado/](docs/heredado/README.md)) solo para mantener los vídeos antiguos.

## Cómo se hace un vídeo hoy (en 10 líneas)

```bash
cp -r channel/tecno/_plantilla_motor channel/tecno/videos/<slug>      # 1. receta desde la plantilla
#   + entrada en videos.json con "estilo": "motor" y guion v3 en script.md
python scripts/generate_voice.py --video <slug> --model eleven_v4     # 2. voz
python scripts/motor_plano.py <slug>                                  # 3. words.json + valida plano.json
python scripts/motor_plano.py <slug> --stills 3,10,25 --dir revisar   # 4. fotogramas para revisar
python scripts/motor_plano.py <slug> --render                         # 5. → remotion/output/<slug>.mp4
python scripts/motor_plano.py <slug> --still 12 --out channel/tecno/videos/<slug>/thumbnail.png
#   ffmpeg -i …/thumbnail.png …/thumbnail.jpg  y luego:
python scripts/thumbnail_text.py --video <slug>                       # 6. texto de seo.md → thumbnail_final.jpg
python scripts/motor_plano.py <slug> --capitulos                      # 7. capítulos reales en seo.md
python scripts/preflight.py --video <slug> --stage publish            # 8. gate
echo <slug> >> scratch-yt/pending_long.txt                            # 9. la tarea diaria lo sube
```

Paso a paso con lo que hay que revisar en cada punto: [docs/checklist-produccion.md](docs/checklist-produccion.md).

## Mapa de carpetas

```
├── README.md                ← esta página
├── CLAUDE.md                ← referencia completa para el agente (API del motor, reglas, gotchas)
├── videos.json              ← registro de todos los vídeos (rutas, formato, estilo, publicación)
├── gasto_imagenes.jsonl     ← registro del gasto de imágenes (tope de 250 €)
├── requirements.txt · .env.example · .gitignore
├── produce.bat              ← (heredado) producción por lotes del método de imágenes
├── docs/                    ← guías por tema (empieza por docs/README.md)
├── channel/tecno/           ← el canal: playbooks, backlog de temas, estilo y competencia
│   ├── _plantilla_motor/    ← plantilla para un vídeo nuevo
│   └── videos/<slug>/       ← la receta de cada vídeo: script.md · plano.json · words.json · seo.md
├── remotion/
│   ├── src/motor/           ← MOTOR de animación (personajes, escenas, reparto, composición genérica)
│   ├── src/*.tsx            ← (heredado) un .tsx por vídeo de imágenes, registrados en src/Root.tsx
│   ├── public-motor/        ← carpeta pública mínima del motor (fuente, SFX, voz y plano por vídeo)
│   ├── public/              ← (heredado, ~7 GB, no va a git) audios e imágenes antiguos
│   └── output/              ← MP4 finales (no va a git)
├── scripts/                 ← herramientas del pipeline (mapa en docs/scripts.md)
├── scratch-yt/              ← publicación en YouTube y TikTok (lo lanzan las tareas programadas)
├── assets/                  ← fuente Montserrat y biblioteca de SFX (assets/sfx/motor)
├── agentic-channel-analytics/ ← auditoría de canales y fórmula de guiones (referencia @ecomonos)
├── scripts-out/             ← (heredado) guiones antiguos que videos.json aún referencia
├── tiktok_inbox/            ← (local) Shorts preparados para subir a TikTok a mano
└── archivo/                 ← notas, pruebas y scripts retirados (ver archivo/README.md)
```

## Documentación

| Quiero… | Lee |
|---|---|
| Instalarlo en un ordenador nuevo | [docs/instalacion.md](docs/instalacion.md) |
| Entender el motor de animación | [docs/motor.md](docs/motor.md) |
| Producir un vídeo | [docs/checklist-produccion.md](docs/checklist-produccion.md) |
| Saber cómo se publica y qué corre solo | [docs/publicacion.md](docs/publicacion.md) |
| Hacer Shorts y subir a TikTok | [docs/shorts-y-tiktok.md](docs/shorts-y-tiktok.md) |
| Controlar el gasto | [docs/gasto-y-costes.md](docs/gasto-y-costes.md) |
| Saber qué hace cada script | [docs/scripts.md](docs/scripts.md) |
| Montar un canal nuevo | [docs/nuevo-canal.md](docs/nuevo-canal.md) |
| Tocar un vídeo antiguo de imágenes | [docs/heredado/](docs/heredado/README.md) |
| Todas las reglas (API del plano, guion, SEO, gotchas) | [CLAUDE.md](CLAUDE.md) |

## Arranque rápido

```bash
pip install -r requirements.txt
cp .env.example .env              # pon al menos ELEVENLABS_API_KEY
cd remotion && npm install && cd ..
python scripts/motor_plano.py --hoja   # prueba: hoja de personajes del motor
```

## Stack

| Capa | Herramienta |
|---|---|
| Voz | ElevenLabs `eleven_v4` (etiquetas de emoción `[curious]`, `[tense]`…) |
| Tiempos | faster-whisper, alineado con el texto del guion → `words.json` |
| Animación | Remotion 4 + React 19, motor propio en SVG/CSS (`remotion/src/motor`) |
| Sonido | 44 SFX igualados por sonoridad (`assets/sfx/motor`); sin música; loudnorm a -14 LUFS |
| Publicación | YouTube Data API v3 con `publishAt`; TikTok Content Posting API |
| Control | `scripts/preflight.py` (gate determinista) + revisión de fotogramas |

## Problemas de ingeniería resueltos

Una selección; el resto está en [CLAUDE.md](CLAUDE.md) y en
[docs/heredado/reglas-metodo-imagenes.md](docs/heredado/reglas-metodo-imagenes.md).

- **El disco se llenaba en cada render**: el bundler de Remotion copia la carpeta pública a `%TEMP%`
  y `remotion/public` pesaba ~7 GB. El motor renderiza con una carpeta pública mínima (`public-motor`).
- **Anclar la animación a la voz, no a segundos**: el plano dice `"@palabra"` y el motor lo resuelve
  con los tiempos reales de whisper alineados con el guion, así que regenerar la voz no rompe el vídeo.
- **Ritmo medible**: el validador calcula el hueco máximo sin nada nuevo en pantalla y el gate falla
  por encima de 5 s; si un tramo se queda vacío esperando su ancla, se rellena solo.
- **Dos renders del mismo vídeo se pisaban** (compartían el `_raw.mp4`): candado por slug.
- **La voz se comía negaciones** ("sin", "no") y cambiaba el sentido de la frase: `check_negations.py`
  lo detecta contrastando con whisper large-v3.
- **Publicación sin proceso encendido**: se sube privado con `publishAt` y YouTube lo publica a su hora;
  la cola diaria para limpio si se agota la cuota y retoma en la siguiente ejecución.
- **Gasto controlado**: después de un cargo inesperado de Google, un tope duro de 250 € que para el
  generador de imágenes solo, con aviso diario.
- **Del método de imágenes**: desincronización silenciosa por una imagen que faltaba, segmentos
  fantasma de whisper sobre el silencio final, el modelo de imagen que solo respondía en
  `location=global`, cuotas de modelos preview agotadas a mitad de tanda.
