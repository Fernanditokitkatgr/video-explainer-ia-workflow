import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Lazarus — mono hacker crudo Ecomonos. 1 segmento = 1 imagen.
// === FRAMES:START ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Hay un país entero dedicado a robar por Internet, "
  { file: '0_04.jpg', startSec: 4.38 },  // "un país se llama Corea del Lorde y su ejército de "
  { file: '0_10.jpg', startSec: 10.9 },  // "Su unidad más temida tiene nombre bíblico."
  { file: '0_13.jpg', startSec: 13.76 },  // "Lázaros."
  { file: '0_15.jpg', startSec: 15.24 },  // "¿Por qué un país entero se dedica a robar online?"
  { file: '0_18.jpg', startSec: 18.16 },  // "Muy sencillo. Está es lado del mundo y ahogado por"
  { file: '0_21.jpg', startSec: 21.92 },  // "No puede comerciar casi con nadie y un país necesi"
  { file: '0_31.jpg', startSec: 31.66 },  // "convertir a sus mejores mentes en ladrones digital"
  { file: '0_38.jpg', startSec: 38.48 },  // "¿Por qué rápida global y difícil derrastrear?"
  { file: '0_41.jpg', startSec: 41.72 },  // "Pero antes de la cripto ya avisaron de lo que vení"
  { file: '0_44.jpg', startSec: 44.62 },  // "en 2014 hackearon a Sony Pictures."
  { file: '0_47.jpg', startSec: 47.22 },  // "El motivo,"
  { file: '0_48.jpg', startSec: 48.0 },  // "una película que se reía de su líder, filtraron co"
  { file: '0_51.jpg', startSec: 51.7 },  // "sueldos y películas enteras, un aviso a todo Holly"
  { file: '0_55.jpg', startSec: 55.24 },  // "En 2017 soltaron Guana Cry, un virus que se cuestr"
  { file: '1_00.jpg', startSec: 60.68 },  // "hospitales, empresas y gobiernos,"
  { file: '1_02.jpg', startSec: 62.84 },  // "pagando rescates para recuperar sus datos."
  { file: '1_05.jpg', startSec: 65.68 },  // "Pero el verdadero negocio llegó con las criptomone"
  { file: '1_12.jpg', startSec: 72.54 },  // "la red del juego Axi Infinity."
  { file: '1_14.jpg', startSec: 74.62 },  // "El botín,"
  { file: '1_15.jpg', startSec: 75.5 },  // "620 millones de dólares."
  { file: '1_18.jpg', startSec: 78.34 },  // "Pero en 2025 batieron todos los records."
  { file: '1_21.jpg', startSec: 81.46 },  // "Le robaron a Bybeet, una de las mayores casas de c"
  { file: '1_25.jpg', startSec: 85.26 },  // "El botín,"
  { file: '1_26.jpg', startSec: 86.28 },  // "1 .500 millones de dólares."
  { file: '1_28.jpg', startSec: 88.68 },  // "El mayor robo digital de la historia."
  { file: '1_31.jpg', startSec: 91.24 },  // "¿Y cómo lo hacen?"
  { file: '1_32.jpg', startSec: 92.46 },  // "No con películas de Matrix,"
  { file: '1_34.jpg', startSec: 94.3 },  // "su arma de verdad es la ingeniería social. Enganña"
  { file: '1_38.jpg', startSec: 98.04 },  // "su truco estrella son las ofertas de trabajo falsa"
  { file: '1_41.jpg', startSec: 101.16 },  // "Contactan a un empleado por LinkedIn con un puesta"
  { file: '1_45.jpg', startSec: 105.02 },  // "Le mandan una prueba técnica que en realidad es un"
  { file: '1_48.jpg', startSec: 108.88 },  // "El empleado lo abre y ya están dentro de la empres"
  { file: '1_52.jpg', startSec: 112.28 },  // "Desde ahí se mueven en silencio durante semanas,"
  { file: '1_54.jpg', startSec: 114.82 },  // "hasta que un día en apenas unos segundos vacían la"
  { file: '2_01.jpg', startSec: 121.66 },  // "colocan a sus propios agentes como empleados remot"
  { file: '2_05.jpg', startSec: 125.02 },  // "con identidades falsas cobran un sueldo y espían d"
  { file: '2_09.jpg', startSec: 129.2 },  // "Y luego viene lo más difícil,"
  { file: '2_10.jpg', startSec: 130.96 },  // "blanquear el dinero,"
  { file: '2_12.jpg', startSec: 132.36 },  // "trocea la criptor robada en miles de pedazos,"
  { file: '2_15.jpg', startSec: 135.02 },  // "la pasan por mezcladores que borran el rastro, y p"
  { file: '2_24.jpg', startSec: 144.06 },  // "Sí,"
  { file: '2_24.jpg', startSec: 144.84 },  // "cada vez que roban,"
  { file: '2_26.jpg', startSec: 146.0 },  // "el mundo entero tiembla un poco más."
  { file: '2_28.jpg', startSec: 148.56 },  // "¿Y nadie los para?"
  { file: '2_30.jpg', startSec: 150.08 },  // "El FBI y empresas como Chainalisis le siguen el ra"
  { file: '2_35.jpg', startSec: 155.02 },  // "han recuperado parte del dinero y han puesto cara "
  { file: '2_38.jpg', startSec: 158.92 },  // "pero la zarús es como una hidra,"
  { file: '2_40.jpg', startSec: 160.92 },  // "le cortas una cabeza y les salen tres."
  { file: '2_43.jpg', startSec: 163.58 },  // "Y a ti esto en qué te afecta, más de lo que crees,"
  { file: '2_46.jpg', startSec: 166.98 },  // "porque las mismas trampas las usan estafadores de "
  { file: '2_50.jpg', startSec: 170.56 },  // "1."
  { file: '2_51.jpg', startSec: 171.4 },  // "Desconfía de las ofertas de trabajo demasiado buen"
  { file: '2_54.jpg', startSec: 174.54 },  // "2."
  { file: '2_55.jpg', startSec: 175.28 },  // "Nunca abras archivos ni pruebas de desconocidos."
  { file: '2_58.jpg', startSec: 178.32 },  // "3."
  { file: '2_59.jpg', startSec: 179.18 },  // "Protége tu cripto con doble factor y una cartera f"
  { file: '3_03.jpg', startSec: 183.78 },  // "Si algo promete hacerte rico rápido,"
  { file: '3_06.jpg', startSec: 186.18 },  // "oye,"
  { file: '3_07.jpg', startSec: 187.1 },  // "porque ahí fuera y todo un país esperando a que ba"
  { file: '3_10.jpg', startSec: 190.66 },  // "y sólo necesitan que pique su una vez."
  { file: '3_13.jpg', startSec: 193.6 },  // "Flippas con que un país entero robe así?"
  { file: '3_16.jpg', startSec: 196.34 },  // "Suscríbete que el lado oscuro de internet no para."
];
// === FRAMES:END ===
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'whoosh_in.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'reveal_sting.mp3', startSec: 13.76, volume: 0.14 },
  { file: 'hack_impact.mp3', startSec: 44.62, volume: 0.14 },
  { file: 'alarm_lock.mp3', startSec: 55.24, volume: 0.14 },
  { file: 'cash.mp3', startSec: 75.5, volume: 0.13 },
  { file: 'jackpot.mp3', startSec: 86.28, volume: 0.16 },
  { file: 'sneaky.mp3', startSec: 94.3, volume: 0.13 },
  { file: 'virus_glitch.mp3', startSec: 105.02, volume: 0.13 },
  { file: 'drain_whoosh.mp3', startSec: 114.82, volume: 0.13 },
  { file: 'chop.mp3', startSec: 132.36, volume: 0.13 },
  { file: 'blender.mp3', startSec: 135.02, volume: 0.12 },
  { file: 'missile_ominous.mp3', startSec: 144.06, volume: 0.14 },
  { file: 'rumble.mp3', startSec: 146.0, volume: 0.13 },
  { file: 'detective_beep.mp3', startSec: 150.08, volume: 0.12 },
  { file: 'monster.mp3', startSec: 158.92, volume: 0.14 },
  { file: 'warning.mp3', startSec: 171.4, volume: 0.13 },
  { file: 'shield.mp3', startSec: 179.18, volume: 0.13 },
  { file: 'suspense.mp3', startSec: 190.66, volume: 0.13 },
  { file: 'subscribe.mp3', startSec: 196.34, volume: 0.15 },
];
const MUSIC_FILE = 'background_hacker_constant.mp3';
const MUSIC_CLIP_SECONDS = 106;
const MUSIC_VOLUME = 0.42;

export const Lazarus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let a = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { a = i; } else { break; } }
  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1117' }}>
      <Audio src={staticFile('lazarus.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`lazarus-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((s, i) => (
        <Sequence key={i} from={Math.round((s.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`lazarus-sfx/${s.file}`)} volume={s.volume ?? 0.2} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      <Img src={staticFile(`lazarus/${FRAMES[a].file}`)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </AbsoluteFill>
  );
};
