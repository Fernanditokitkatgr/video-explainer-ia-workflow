# Video Explainer IA — Workflow de Producción

Proceso completo para producir vídeos explainer estilo YouTube con voz sintética e imágenes generadas por IA.

---

## Stack de Herramientas

| Herramienta | Función | Plan |
|---|---|---|
| **ElevenLabs V3** | Síntesis de voz con emociones | Starter (€6/mes) |
| **Higgsfield AI** | Generación de imágenes por frase | Ultra (3.000 créditos/mes) |
| **Whisper (OpenAI)** | Extracción de timestamps del audio | API pay-per-use |
| **Remotion** | Montaje y renderización del vídeo | Open Source |

---

## Flujo Completo (5 Pasos + 3 Revisiones Humanas)

```
PASO 1 → PASO 2 → [HITL 1] → PASO 3 → PASO 4 → [HITL 2] → PASO 5 → [HITL 3] → RENDER
```

---

### PASO 1 — Crear el Guion

**Reglas del guion:**
- Frases **muy cortas** (cada frase = una imagen = un momento visual)
- Usar **emociones entre corchetes** para ElevenLabs V3: `[tono cercano]`, `[énfasis emocional]`, `[pausa reflexiva]`
- Un vídeo de 2,5 min → ~63-70 frases

**Ejemplo de formato:**
```
[tono cercano]
Porque mientras tú esperas a tener más dinero…

[tono serio, pausa final]
el tiempo sigue pasando.
```

---

### PASO 2 — Síntesis de Voz con ElevenLabs V3

1. Ir a [ElevenLabs](https://elevenlabs.io)
2. Seleccionar **modelo V3** (acepta emociones entre corchetes)
3. Pegar el guion completo con los tags de emoción
4. Generar y descargar el **MP3**
5. Guardar como: `nombre-video.mp3`

**Coste:** ~2.000 caracteres por vídeo · Plan Starter = ~15 vídeos/mes

---

### 🔴 REVISIÓN HUMANA 1 — Validar la Voz

> Escuchar el audio completo y verificar:
> - ¿Las emociones suenan naturales?
> - ¿El ritmo y las pausas están bien?
> - ¿Alguna frase suena rara o hay que regrabar?

Si hay problemas → ajustar el guion y regenerar.

---

### PASO 3 — Extraer Timestamps con Whisper

**Script Python** para obtener el segundo exacto de cada frase:

```python
import whisper

model = whisper.load_model("base")
result = model.transcribe(
    "nombre-video.mp3",
    word_timestamps=True,
    language="es"
)

# Imprimir segmentos con timestamps
for seg in result["segments"]:
    print(f"{seg['start']:.2f}s → {seg['text'].strip()}")
```

**⚠️ IMPORTANTE — Gotcha crítico:**
- Usar timestamps de **SEGMENTOS**, NO de palabras individuales
- El matching por palabras da falsos positivos: `"no"` aparece dentro de `"años"`, `"a"` dentro de `"la"`
- Los segmentos de Whisper son más fiables para mapear frases completas

**Output esperado:**
```
0.00s → Esta noche, Carlos va a gastar 10 euros en una tontería.
4.50s → Y no va a pensar demasiado en ello.
6.94s → Pero esos 10 euros podrían valer muchísimo más en el futuro.
...
```

---

### PASO 4 — Generar Imágenes con Higgsfield

1. Ir a [Higgsfield AI](https://higgsfield.ai)
2. Por cada frase del timestamp, generar **1 imagen**
3. **Prompt base para estilo stickman:**
   ```
   Simple stickman drawing on white paper background, hand-drawn style, [descripción de la escena]
   ```
4. Descargar todas las imágenes y nombrarlas por timestamp: `0_00.jpg`, `0_04.jpg`, `0_07.jpg`...

**Coste:** 2 créditos/imagen · 70 imágenes = 140 créditos · Plan Ultra = ~21 vídeos/mes

**Nomenclatura de archivos:**
```
m_ss.jpg  →  minuto_segundo.jpg
0_00.jpg  →  0:00
1_30.jpg  →  1:30
2_15.jpg  →  2:15
```

---

### 🔴 REVISIÓN HUMANA 2 — Validar las Imágenes

> Revisar todas las imágenes generadas:
> - ¿Cada imagen corresponde visualmente a su frase?
> - ¿Hay imágenes raras, erróneas o que no encajan?
> - Regenerar las que no sirvan

**⚠️ Si falta UNA imagen en la secuencia**, todos los frames posteriores quedarán desincronizados. Verificar que están todas antes de continuar.

---

### PASO 5 — Montar el Vídeo con Remotion

**1. Copiar imágenes al proyecto:**
```
Remotion/public/nombre-video/   ← todas las imágenes aquí
Remotion/public/nombre-video.mp3
```

**2. Crear el componente en `src/NombreVideo.tsx`:**

```typescript
import React from 'react';
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const PLAYBACK_RATE = 1.1; // Ajuste de velocidad

const FRAMES = [
  { file: '0_00.jpg', startSec: 0 },        // "Esta noche..."
  { file: '0_04.jpg', startSec: 4.5 },      // "Y no va a pensar..."
  // ... resto de frames con timestamps de Whisper
];

export const NombreVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSec = (frame / fps) * PLAYBACK_RATE;

  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) {
    if (FRAMES[i].startSec <= currentSec) {
      activeIndex = i;
    } else {
      break;
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <Audio src={staticFile('nombre-video.mp3')} playbackRate={PLAYBACK_RATE} />
      <Img
        src={staticFile(`nombre-video/${FRAMES[activeIndex].file}`)}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </AbsoluteFill>
  );
};
```

**3. Registrar en `src/Root.tsx`:**
```typescript
<Composition
  id="NombreVideo"
  component={NombreVideo}
  durationInFrames={Math.round(duracionSegundos * 30 / PLAYBACK_RATE)}
  fps={30}
  width={1920}
  height={1080}
/>
```

**4. Abrir el studio:**
```bash
npx remotion studio --port 3000
# Abrir: http://localhost:3000
```

---

### 🔴 REVISIÓN HUMANA 3 — Validar Sincronización

> Ver el vídeo completo en el studio:
> - ¿Las imágenes cambian en el momento correcto?
> - ¿Hay frames que se adelantan o se retrasan?
> - Ajustar `startSec` en el array FRAMES si hay desfase

**Causas comunes de desync:**
1. Falta una imagen en la secuencia (todos los frames posteriores se desfasan en +1)
2. Whisper segmentó una frase de forma diferente al guion
3. El `PLAYBACK_RATE` no está aplicado al lookup de frames (recordar multiplicar `currentSec`)

---

### RENDER FINAL

```bash
cd Remotion
npx remotion render NombreVideo output/nombre-video-final.mp4
```

El render tarda ~7-10 min para un vídeo de 2,5 min a 1920×1080.

---

## Costes por Vídeo

| Herramienta | Coste por vídeo |
|---|---|
| ElevenLabs V3 (Starter) | ~€0,40 |
| Higgsfield Ultra (140 créditos) | ~€5,60 |
| Whisper API | ~€0,01 |
| Remotion | €0,00 |
| **TOTAL** | **~€6,00** |

**Capacidad mensual con planes actuales:**
- Higgsfield: 3.000 créditos / 140 por vídeo = **~21 vídeos/mes**
- ElevenLabs: 30.000 chars / 2.000 por vídeo = **~15 vídeos/mes**

📊 Análisis completo de costes: [Notion — Costes de Producción](https://app.notion.com/p/389df36536f381ff9c46d8325c37d655)

---

## Diagrama del Flujo

🎨 FigJam: [Video Explainer IA — Flujo de Producción](https://www.figma.com/board/1SE5XSFGzfIiamBL5gN9Fq)

---

## Checklist Rápida

- [ ] Guion escrito con frases cortas y emociones en corchetes
- [ ] Audio generado con ElevenLabs V3
- [ ] **HITL 1:** Voz aprobada
- [ ] Timestamps extraídos con Whisper (segmentos, no palabras)
- [ ] Imágenes generadas en Higgsfield (1 por frase)
- [ ] **HITL 2:** Todas las imágenes revisadas y aprobadas
- [ ] Imágenes copiadas a `Remotion/public/`
- [ ] Componente creado en Remotion con FRAMES array
- [ ] Studio abierto y vídeo revisado
- [ ] **HITL 3:** Sincronización validada
- [ ] Render final ejecutado
- [ ] MP4 listo para publicar ✅
