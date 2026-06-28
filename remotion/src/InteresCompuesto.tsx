import React from 'react';
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Timestamps from Whisper segment boundaries (exact audio sync, not guion approximations)
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: 'esta_noche.png', startSec: 0 },        // "Esta noche"
  { file: 'carlos_gasta.png', startSec: 1.16 },   // "Carlos va a gastar 10 euros en una tontería."
  { file: '0_04.jpg', startSec: 4.5 },     // "Y no va a pensar demasiado en ello."
  { file: '0_07.jpg', startSec: 6.94 },    // "Pero esos 10 euros podrían valer..."
  { file: '0_11.jpg', startSec: 10.88 },   // "Porque el dinero tiene una regla brutal."
  { file: '0_14.jpg', startSec: 13.58 },   // "Cuanto antes empieza a trabajar..."
  { file: '0_16.jpg', startSec: 17.62 },   // "Y aquí es donde entra Carlos."
  { file: '0_18.jpg', startSec: 19.88 },   // "Carlos tiene 25 años."
  { file: '0_20.jpg', startSec: 21.94 },   // "No gana una locura."
  { file: '0_22.jpg', startSec: 23.4 },    // "No es rico."
  { file: '0_23.jpg', startSec: 24.6 },    // "No tiene un negocio millonario."
  { file: '0_27.jpg', startSec: 26.76 },   // "Pero hace una cosa muy simple."
  { file: '0_29.jpg', startSec: 28.4 },    // "Invierte 200 euros al mes."
  { file: '0_32.jpg', startSec: 31.18 },   // "Todos los meses."
  { file: '0_33.jpg', startSec: 32.34 },   // "Sin intentar adivinar el mercado."
  { file: '0_35.jpg', startSec: 34.68 },   // "Sin mirar la bolsa cada día."
  { file: '0_36.jpg', startSec: 36.26 },   // "Sin esperar al momento perfecto."
  { file: '0_39.jpg', startSec: 38.42 },   // "Ahora aparece María."
  { file: '0_40.jpg', startSec: 40.42 },   // "María tiene 35 años."
  { file: '0_43.jpg', startSec: 42.42 },   // "Ha esperado 10 años más."
  { file: '0_44.jpg', startSec: 44.26 },   // "Pero decide invertir el doble que Carlos."
  { file: '0_47.jpg', startSec: 46.86 },   // "400 euros al mes."
  { file: '0_49.jpg', startSec: 48.88 },   // "La pregunta es obvia."
  { file: '0_51.jpg', startSec: 50.7 },    // "¿Quién llega con más dinero a los 65?"
  { file: '0_54.jpg', startSec: 53.78 },   // "La mayoría diría María."
  { file: '0_56.jpg', startSec: 55.58 },   // "Porque invierte el doble."
  { file: '0_57.jpg', startSec: 56.66 },   // "Pero la mayoría se equivoca."
  { file: '0_59.jpg', startSec: 59.44 },   // "Carlos acabaría con unos 580.000 euros."
  { file: '1_03.jpg', startSec: 62.48 },   // "María, con unos 450.000."
  { file: '1_06.jpg', startSec: 65.22 },   // "Carlos termina con 130.000 euros más."
  { file: '1_08.jpg', startSec: 68.36 },   // "Aunque invirtió la mitad cada mes."
  { file: '1_11.jpg', startSec: 70.76 },   // "Y esto tiene un nombre."
  { file: '1_13.jpg', startSec: 72.6 },    // "Interés compuesto."
  { file: '1_15.jpg', startSec: 74.6 },    // "No es magia."
  { file: '1_16.jpg', startSec: 75.76 },   // "No es suerte."
  { file: '1_17.jpg', startSec: 77.06 },   // "Es tiempo multiplicando dinero."
  { file: '1_19.jpg', startSec: 79.34 },   // "Y cuanto más tarde empiezas..."
  { file: '1_21.jpg', startSec: 81.3 },    // "...más caro se vuelve llegar al mismo sitio."
  { file: '1_24.jpg', startSec: 84.06 },   // "Si empiezas a los 25..."
  { file: '1_26.jpg', startSec: 86.06 },   // "...podrías necesitar unos 300 euros al mes."
  { file: '1_30.jpg', startSec: 89.84 },   // "Si empiezas a los 35..."
  { file: '1_32.jpg', startSec: 91.92 },   // "...ya podrías necesitar cerca de 650."
  { file: '1_35.jpg', startSec: 95.24 },   // "Si esperas a los 40..."
  { file: '1_37.jpg', startSec: 97.16 },   // "...la cifra puede irse a más de 1.700 euros al mes."
  { file: '1_41.jpg', startSec: 100.76 },  // "Mismo objetivo."
  { file: '1_43.jpg', startSec: 102.58 },  // "Mismo millón."
  { file: '1_44.jpg', startSec: 103.84 },  // "Pero muchísimo más esfuerzo."
  { file: '1_46.jpg', startSec: 106.24 },  // "Por eso el mayor error no es invertir poco."
  { file: '1_49.jpg', startSec: 109.02 },  // "El mayor error es no empezar."
  { file: 'mientras_esperas.png', startSec: 110.6 },   // "Porque mientras tú esperas a tener más dinero..."
  { file: '1_51.jpg', startSec: 113.96 },  // "...el tiempo sigue pasando."
  { file: '1_54.jpg', startSec: 115.2 },   // "Y el interés compuesto no perdona."
  { file: '1_56.jpg', startSec: 118.5 },   // "Puedes empezar con 50 euros."
  { file: '1_59.jpg', startSec: 120.78 },  // "Con 100."
  { file: '2_00.jpg', startSec: 121.66 },  // "Con lo que puedas."
  { file: '2_02.jpg', startSec: 123.0 },   // "Pero empieza."
  { file: '2_03.jpg', startSec: 124.72 },  // "Automatiza una inversión mensual."
  { file: '2_05.jpg', startSec: 127.04 },  // "Fondos indexados."
  { file: '2_07.jpg', startSec: 128.38 },  // "Largo plazo."
  { file: '2_08.jpg', startSec: 129.56 },  // "Costes bajos."
  { file: '2_10.jpg', startSec: 130.84 },  // "Y deja que el tiempo haga su trabajo."
  { file: '2_11.jpg', startSec: 133.3 },   // "Porque dentro de 20 años..."
  { file: '2_13.jpg', startSec: 135.34 },  // "...no te vas a arrepentir de haber empezado pequeño."
  { file: '2_15.jpg', startSec: 137.8 },   // "Te vas a arrepentir de no haber empezado antes."
];
// === FRAMES:END ===

export const InteresCompuesto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSec = (frame / fps) * 1.1;

  // Find the active image: last one whose startSec <= currentSec
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
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <Audio src={staticFile('interes-compuesto.mp3')} playbackRate={1.1} />
      <Img
        src={staticFile(`interes-compuesto/${activeFrame.file}`)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </AbsoluteFill>
  );
};
