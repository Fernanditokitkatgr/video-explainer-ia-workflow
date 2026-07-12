import React from 'react';
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Stick to the Plan — "Qué le pasa a tu cuerpo cuando duermes mal"
// Timestamps from Whisper segment boundaries (exact audio sync). 1 segment = 1 image.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: 'seg_00.png', startSec: 0.0 },  // "3 de la manana, todos menos Stick"
  { file: 'seg_01.png', startSec: 5.32 },  // "gafas rojas, luz del movil"
  { file: 'seg_02.png', startSec: 10.34 },  // "un video mas, manana cumplo el plan"
  { file: 'seg_03.png', startSec: 14.54 },  // "le ha salido una cana"
  { file: 'seg_04.png', startSec: 19.24 },  // "dormir es perder el tiempo"
  { file: 'seg_05.png', startSec: 24.0 },  // "el cuerpo se arregla por dentro"
  { file: 'seg_06.png', startSec: 30.8 },  // "cuando duerme bien, su cuerpo trabaja"
  { file: 'seg_07.png', startSec: 33.54 },  // "entra el equipo de limpieza"
  { file: 'seg_08.png', startSec: 36.0 },  // "recoge la basura del cerebro"
  { file: 'seg_09.png', startSec: 38.56 },  // "si no duerme, la basura se queda"
  { file: 'seg_10.png', startSec: 44.2 },  // "sus pilas se recargan"
  { file: 'seg_11.png', startSec: 46.82 },  // "cose lo roto, cuida la punta del cordon"
  { file: 'seg_12.png', startSec: 50.58 },  // "la punta de plastico del cordon"
  { file: 'seg_13.png', startSec: 52.82 },  // "tus celulas tienen una igual"
  { file: 'seg_14.png', startSec: 59.44 },  // "mira a Stick sin dormir"
  { file: 'seg_15.png', startSec: 61.14 },  // "alarma de incendios del estres"
  { file: 'seg_16.png', startSec: 65.38 },  // "no se apaga, fuego lento"
  { file: 'seg_17.png', startSec: 68.5 },  // "arde despacio, oxida el cuerpo"
  { file: 'seg_18.png', startSec: 71.48 },  // "cordones se deshilachan, mas canas"
  { file: 'seg_19.png', startSec: 75.54 },  // "envejece al doble"
  { file: 'seg_20.png', startSec: 80.0 },  // "esta noche enciende tu alarma"
  { file: 'seg_21.png', startSec: 82.34 },  // "cerebro sin limpiar, 10 anos"
  { file: 'seg_22.png', startSec: 86.2 },  // "duerme profundo a tu ritmo"
  { file: 'seg_23.png', startSec: 91.42 },  // "divulgacion, no consejo medico"
  { file: 'seg_24.png', startSec: 95.58 },  // "tu equipo quiere entrar, dejalo pasar"
  { file: 'seg_25.png', startSec: 98.58 },  // "cumple el plan, duerme"
  { file: 'seg_26.png', startSec: 102.08 },  // "que habito alarga la vida? like"
];





// === FRAMES:END ===

export const SuenoStick: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;

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
      <Audio src={staticFile('sueno.mp3')} playbackRate={PLAYBACK_RATE} />
      <Img
        src={staticFile(`sueno/${activeFrame.file}`)}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </AbsoluteFill>
  );
};
