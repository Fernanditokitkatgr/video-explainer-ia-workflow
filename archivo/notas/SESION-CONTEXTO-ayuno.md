# Contexto de sesión — Vídeo "Ayuno Intermitente"

## ⚡ PARA EJECUTAR AHORA (instrucciones para Claude Code)

> Abre este repo en Claude Code y escribe exactamente esto:

```
Lee SESION-CONTEXTO.md y genera los 56 frames del vídeo de ayuno intermitente con Higgsfield MCP.
Modelo: nano_banana_pro, aspect ratio: 16:9.
Referencia de Stick (pasar como medias con role "image"): job_id 673502ef-9bf9-4db4-8d9a-eb5d949fb6ee
Carpeta destino: remotion/public/ayuno-intermitente/
Los filenames exactos están en la lista de frames de este archivo.
Cuando tengas las 56 imágenes, lanza el render:
  cd remotion && npx remotion render AyunoIntermitente output/ayuno-intermitente.mp4
```

**Style base para todos los frames (incluir siempre al final de cada prompt):**
```
Simple stickman drawing on white paper, hand-drawn thick black marker lines,
muscular stickman character with long hair, headband, red glasses.
Red glasses are the ONLY color accent. Pure white background. Minimal, clean.
```

---

## Estado actual del pipeline

| Paso | Estado | Detalle |
|---|---|---|
| Script | ✅ Listo | `scripts-out/ayuno-intermitente.es.txt` |
| Audio ElevenLabs | ✅ Generado | `remotion/public/ayuno-intermitente.mp3` (3.6 MB) |
| Timestamps Whisper | ✅ Extraídos | 55 segmentos, ya en `AyunoIntermitente.tsx` |
| Composición Remotion | ✅ Lista | `remotion/src/AyunoIntermitente.tsx` + registrada en `Root.tsx` |
| Imágenes Higgsfield | ❌ Pendiente | 56 frames — Higgsfield estaba caído |
| Render MP4 | ⏳ Pendiente | Esperando imágenes |

---

## Lista de frames a generar

| Filename | Escena |
|---|---|
| 0_00.jpg | Stick standing in front of an open fridge, clock on wall shows 10:00, morning light |
| 0_06.jpg | Stick staring into the fridge with wide curious eyes |
| 0_10.jpg | Stick closing the fridge door firmly, determined expression |
| 0_15.jpg | Close-up of Stick's face with a small lightbulb drawn above his head |
| 0_17.jpg | Stick looking at his own body with curiosity, arrows pointing inward to his torso |
| 0_23.jpg | A large ON/OFF switch labeled REPARACION, Stick pointing at it excitedly |
| 0_28.jpg | Stick eating a big meal, a large upward arrow next to him labeled insulina |
| 0_31.jpg | A giant cell door wide open, tiny packages being delivered through it non-stop |
| 0_33.jpg | Construction stick-figure workers carrying boxes through the open cell door |
| 0_37.jpg | Workers inside a cell stacking boxes labeled construccion, no cleaning crew in sight |
| 0_42.jpg | Dirty cluttered cell interior, dust everywhere, no cleaning happening |
| 0_44.jpg | Stick sitting with a coffee, arrow going down labeled insulina |
| 0_48.jpg | The giant cell door closing slowly, construction workers leaving with their boxes |
| 0_50.jpg | A tiny cleaning crew in overalls entering through the closed door with mops and tools |
| 0_53.jpg | Text AUTOFAGIA in bold with Stick pointing at it, Greek letters scattered in background |
| 1_00.jpg | The cleaning crew inside a cell finding tangled broken protein strings on the floor |
| 1_04.jpg | Crew dismantling broken parts with tiny tools, sorting pieces into two piles |
| 1_08.jpg | Good pieces going into a bin labeled reutilizar, bad pieces into a trash can |
| 1_12.jpg | A building being renovated from the inside, scaffolding inside, clean facade outside |
| 1_17.jpg | Construction workers trying to enter the cell door but it is closed, they wait outside |
| 1_24.jpg | Stick eating a snack, clock ticking, construction workers always at the door again |
| 1_28.jpg | Stick's body silhouette as a dusty building that was never renovated |
| 1_31.jpg | A large stopwatch showing 14 to 16 hours, cleaning crew waiting patiently |
| 1_34.jpg | A clock face split: 16 dark hours labeled ayuno, 8 bright hours labeled comer |
| 1_40.jpg | Stick relaxing with coffee, label 16:8 with a green checkmark |
| 1_44.jpg | Timeline: Stick eats at 12, eats at 20, a bracket spanning 16 hours labeled mantenimiento |
| 1_52.jpg | Tiny maintenance workers operating inside Stick's body silhouette during the 16-hour gap |
| 1_56.jpg | Stick flexing, tiny glowing batteries inside his muscles labeled mitocondrias |
| 2_00.jpg | Two batteries side by side: one dim labeled insulina alta, one bright labeled ayuno |
| 2_06.jpg | A car engine with clogged dirty filters versus clean filters, same engine label |
| 2_10.jpg | The clean-filter engine with speed lines, running better |
| 2_15.jpg | Stick's brain with a fuel gauge needle moving from glucosa to cetonas |
| 2_19.jpg | The liver labeled higado producing small pentagon shapes labeled cetonas |
| 2_24.jpg | Stick's brain glowing with stars, alert focused expression |
| 2_27.jpg | Stick with clear sharp eyes and upright posture, no fog or cloud around his head |
| 2_32.jpg | Warning sign labeled OJO, a clock timeline showing 12 to 16 hours |
| 2_38.jpg | A bar chart glycogen tank emptying slowly over 16 hours |
| 2_41.jpg | 16:8 label with green checkmark, cleaning crew giving thumbs up |
| 2_43.jpg | Stick looking at his watch, thought bubble showing a plate and a clock |
| 2_47.jpg | A simple eating window timeline: breakfast time arrow to dinner time, bracket showing gap |
| 2_51.jpg | Two timelines side by side: old eating schedule versus new schedule with bigger gap |
| 2_54.jpg | Stick with a medical cross symbol and a doctor stick figure in white coat |
| 2_58.jpg | Stick standing next to a person in a wheelchair and a person with a heart symbol |
| 3_02.jpg | An open science book with beaker and molecules, label la ciencia dice |
| 3_05.jpg | A light switch labeled interruptor de reparacion being turned ON, light radiates |
| 3_10.jpg | Stick holding a sign that reads el ayuno no es una dieta |
| 3_13.jpg | A clock face with a bracket labeled ventana de tiempo |
| 3_16.jpg | Same food portions squeezed into a smaller time window on a timeline diagram |
| 3_20.jpg | Cleaning crew repair workers and recycling team all working together inside Stick's body |
| 3_24.jpg | Stick sleeping peacefully, cleaning crew working inside him, label ayuno |
| 3_29.jpg | A sleep timeline extended by 2 hours with an arrow labeled alargar la ventana |
| 3_32.jpg | Stick closing the fridge one more time, calm satisfied smile |
| 3_37.jpg | Stick making a black coffee, steam rising from the cup |
| 3_43.jpg | Stick sitting quietly by a window, coffee in hand, peaceful morning light |
| 3_47.jpg | Stick with a thought bubble containing an hourglass |
| 3_52.jpg | Stick standing tall, confident fist-bump pose. Text below: Stick to the plan. |

---

## Archivos clave

- Audio: `remotion/public/ayuno-intermitente.mp3`
- Composición: `remotion/src/AyunoIntermitente.tsx` (56 FRAMES con timestamps ya configurados)
- Imágenes destino: `remotion/public/ayuno-intermitente/` (carpeta vacía, esperando los .jpg)
- Config MCP: `.mcp.json`
