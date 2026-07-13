# Video Explainer IA 🎬

Pipeline completo para producir vídeos explainer estilo YouTube con **voz sintética** e **imágenes generadas por IA**, montados con código en Remotion.

## Demo

> Vídeo de interés compuesto (2,5 min) — producido con este pipeline en una sesión de trabajo.

---

## Stack

| | Herramienta | Función |
|---|---|---|
| 🎙️ | **ElevenLabs V3** | Voz sintética con emociones |
| 🎨 | **Higgsfield AI** | Imágenes por frase (estilo stickman) |
| ⏱️ | **Whisper AI** | Timestamps exactos del audio |
| 🎬 | **Remotion** | Montaje y render del vídeo |

---

## Estructura del repo

```
├── README.md
├── VIDEO_EXPLAINER_WORKFLOW.md   ← Guía completa del proceso paso a paso
│
├── remotion/
│   ├── package.json
│   └── src/
│       ├── InteresCompuesto.tsx  ← Componente principal (ejemplo real producido)
│       ├── Root.tsx              ← Registro de composiciones
│       └── index.ts
│
└── scripts/
    └── whisper_timestamps.py     ← Extrae timestamps del audio con Whisper
```

---

## Inicio rápido

### 1. Extrae timestamps del audio

```bash
pip install faster-whisper
python scripts/whisper_timestamps.py tu-audio.mp3 --format remotion
```

Esto genera el array `FRAMES` listo para pegar en el componente de Remotion.

### 2. Monta el vídeo

```bash
cd remotion
npm install

# Coloca tus imágenes en public/tu-video/ y el audio en public/
# Edita src/InteresCompuesto.tsx con tus FRAMES y timestamps

npm run dev          # Abre el studio en localhost:3000
npm run render       # Renderiza el MP4 final
```

---

## Flujo completo

```
Guion → ElevenLabs V3 → [Revisar voz] → Whisper → Higgsfield → [Revisar imágenes] → Remotion → [Revisar sync] → MP4
```

📋 Guía detallada: [VIDEO_EXPLAINER_WORKFLOW.md](./VIDEO_EXPLAINER_WORKFLOW.md)

## Skills del proyecto (SEO + canal)

Dos skills automatizan el packaging y SEO de YouTube vía la YouTube Data API v3 (sin
pasos manuales en YouTube Studio):

- **`/video-seo <slug>`** — genera el título (híbrido: keyword de búsqueda al frente si
  hay demanda probada — método Hot Dog —, o gancho narrativo si no la hay), descripción
  con capítulos, tags y hashtags para un vídeo del pipeline. Antes de subir, comprueba
  automáticamente que el canal tiene su packaging configurado (`/channel-setup`); si
  falta algo, bloquea la subida y avisa. Sube el vídeo (privado) + miniatura vía API.
- **`/channel-setup`** — configura o audita el packaging del canal: descripción/about,
  keywords, tráiler para no-suscriptores, secciones de la home, playlists y banner. Todo
  vía API, con confirmación humana antes de escribir cualquier cambio real en el canal.

Ambas comparten `scratch-yt/youtube_channel.py` (helpers de la API) y reutilizan las
credenciales OAuth ya configuradas para la subida de vídeos.

> Estas skills viven en `.claude/skills/` (gitignored) — ver `CLAUDE.md` para el listado
> completo y el proceso manual de respaldo si no están disponibles en tu clon.

📊 Costes y escalabilidad: [Notion](https://app.notion.com/p/389df36536f381ff9c46d8325c37d655)

🎨 Diagrama del flujo: [FigJam](https://www.figma.com/board/1SE5XSFGzfIiamBL5gN9Fq)

---

## Coste por vídeo (~2,5 min)

| Herramienta | Coste |
|---|---|
| ElevenLabs (Starter €6/mes) | ~€0,40 |
| Higgsfield (Ultra, 140 créditos) | ~€5,60 |
| Whisper API | ~€0,01 |
| Remotion | €0 |
| **Total** | **~€6/vídeo** |

Capacidad máxima con planes actuales: **~21 vídeos/mes**

---

## Gotchas importantes

- **Usar timestamps de segmentos Whisper**, no de palabras individuales (el matching por palabras da falsos positivos)
- Si falta **una imagen** en la secuencia, todos los frames posteriores se desincronizan
- Para velocidad 1.1x: aplicar `playbackRate={1.1}` en `<Audio>` Y multiplicar `currentSec * 1.1` en el lookup de frames
