import React from 'react';
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Stick to the Plan — "Qué le pasa a tu cuerpo cuando duermes mal"
// Timestamps from Whisper segment boundaries (exact audio sync). 1 segment = 1 image.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: 'seg_00.png', startSec: 0.0 },  // "Son las tres de la mañana, toda la ciudad duerme, todos menos Stick."
  { file: 'seg_01.png', startSec: 6.2 },  // "pelo largo, cinta, gafas rojas, la luz del móvil le ilumina las gafas."
  { file: 'seg_02.png', startSec: 13.16 },  // "Un vídeo más... y mañana sí cumplo el plan, pero mira de cerca su pelo..."
  { file: 'seg_03.png', startSec: 20.06 },  // "salirle una cana, y ayer no estaba."
  { file: 'seg_04.png', startSec: 22.9 },  // "dormir es perder el tiempo... su turno de mantenimiento"
  { file: 'seg_05.png', startSec: 28.88 },  // "el cuerpo se arregla por dentro, no dormir no le roba horas"
  { file: 'seg_06.png', startSec: 34.46 },  // "le roba años de vida. Cuando Stick duerme bien, su cuerpo trabaja"
  { file: 'seg_07.png', startSec: 39.94 },  // "entra el equipo de limpieza nocturno"
  { file: 'seg_08.png', startSec: 44.56 },  // "recoge la basura que el cerebro deja durante el día"
  { file: 'seg_09.png', startSec: 49.74 },  // "si Stick no duerme, el equipo no entra, la basura se queda"
  { file: 'seg_10.png', startSec: 54.44 },  // "noche tras noche se amontona, sus pilas se recargan"
  { file: 'seg_11.png', startSec: 61.36 },  // "el cuerpo cose lo que rompió y cuida la punta de sus cordones"
  { file: 'seg_12.png', startSec: 68.22 },  // "la punta de plástico del cordón"
  { file: 'seg_13.png', startSec: 73.3 },  // "tus células tienen una igual, cuanto más se gasta, más viejo"
  { file: 'seg_14.png', startSec: 78.28 },  // "dormir bien la mantiene entera, ahora mira Stick sin dormir, suena una alarma"
  { file: 'seg_15.png', startSec: 84.3 },  // "la alarma de incendios del estrés, de día/de noche"
  { file: 'seg_16.png', startSec: 91.04 },  // "no se apaga nunca, enciende un fuego lento"
  { file: 'seg_17.png', startSec: 97.8 },  // "arde despacio, oxida el cuerpo poco a poco"
  { file: 'seg_18.png', startSec: 105.34 },  // "la punta de los cordones se deshilacha, más canas más rápido"
  { file: 'seg_19.png', startSec: 111.98 },  // "envejece al doble, no es solo cosa de Stick, pasa en tu cuerpo"
  { file: 'seg_20.png', startSec: 118.14 },  // "esta misma noche, una mala noche enciende tu alarma"
  { file: 'seg_21.png', startSec: 124.64 },  // "tu cerebro sin limpiar, lo notas en 10 años, seamos honestos"
  { file: 'seg_22.png', startSec: 131.66 },  // "dormir profundo a tu ritmo, cada cuerpo necesita lo suyo"
  { file: 'seg_23.png', startSec: 137.88 },  // "divulgación, no consejo médico, habla con un profesional"
  { file: 'seg_24.png', startSec: 144.9 },  // "tu equipo de limpieza quiere entrar, déjalo pasar"
  { file: 'seg_25.png', startSec: 151.28 },  // "empieza por algo simple, cumple el plan, duerme"
  { file: 'seg_26.png', startSec: 158.04 },  // "qué hábito alarga más la vida, siguiente vídeo, like, Stick to the plan"
];


// === FRAMES:END ===

export const SuenoStick: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSec = frame / fps;

  // Active image: last one whose startSec <= currentSec
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) {
    if (FRAMES[i].startSec <= currentSec) {
      activeIndex = i;
    } else {
      break;
    }
  }

  const activeFrame = FRAMES[activeIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('sueno.mp3')} />
      <Img
        src={staticFile(`sueno/${activeFrame.file}`)}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </AbsoluteFill>
  );
};
