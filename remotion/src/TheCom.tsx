import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// The Com — mono-hacker oscuro. 1 segmento whisper = 1 imagen.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Hay un rincón de internet gobernado por niños, tienen e"
  { file: '0_05.jpg', startSec: 5.14 },  // "Y han robado cientos de millones de dólares, se llama D"
  { file: '0_09.jpg', startSec: 9.78 },  // "Y no es un grupo, es un archipiélago de bandas conectad"
  { file: '0_13.jpg', startSec: 13.96 },  // "la mayoría menores de edad."
  { file: '0_16.jpg', startSec: 16.16 },  // "¿Y cómo caen ahí?"
  { file: '0_17.jpg', startSec: 17.78 },  // "Los reclutan jugando, en Roblox, en Minecraft,"
  { file: '0_21.jpg', startSec: 21.14 },  // "les prometen dinero rápido y estatus,"
  { file: '0_23.jpg', startSec: 23.66 },  // "y funciona, Fardan de Rolex, de cripto, de Lamborghinis"
  { file: '0_27.jpg', startSec: 27.22 },  // "ese es justo su gran error."
  { file: '0_29.jpg', startSec: 29.5 },  // "A más de uno lo han pillado por subir una simple foto a"
  { file: '0_33.jpg', startSec: 33.12 },  // "Pero cuando todavía no los pillan, lo que hacen a cojon"
  { file: '0_36.jpg', startSec: 36.74 },  // "Tumbaron los casinos MGM de Las Vegas y los dejaron fue"
  { file: '0_41.jpg', startSec: 41.54 },  // "Un chaval de 17 años filtró el GTA6 entero antes de que"
  { file: '0_46.jpg', startSec: 46.14 },  // "Han atacado a Nvidia, a Microsoft, a Samsung."
  { file: '0_49.jpg', startSec: 49.24 },  // "Los daños, más de 500 millones de dólares."
  { file: '0_53.jpg', startSec: 53.06 },  // "Su arma favorita, el SIM Swapping."
  { file: '0_56.jpg', startSec: 56.02 },  // "Básicamente, te roban tu número de teléfonos sin tocar "
  { file: '0_59.jpg', startSec: 59.6 },  // "y con eso entran en tus mensajes, en tus cuentas y en t"
  { file: '1_03.jpg', startSec: 63.44 },  // "Ahora lo serio."
  { file: '1_04.jpg', startSec: 64.7 },  // "Decom también tiene zonas muchísimo más oscuras y pelig"
  { file: '1_08.jpg', startSec: 68.52 },  // "Tanto que el FBI ya no se anda con la edad."
  { file: '1_11.jpg', startSec: 71.56 },  // "Están cayendo penas de 10 años, de 25,"
  { file: '1_14.jpg', startSec: 74.46 },  // "y en lo más grave, de más de 80."
  { file: '1_16.jpg', startSec: 76.92 },  // "Así que, protéjete, que es fácil, no uses SMS para tus "
  { file: '1_21.jpg', startSec: 81.2 },  // "usa una app de autenticación,"
  { file: '1_22.jpg', startSec: 82.64 },  // "no fardes de lo que tienes,"
  { file: '1_24.jpg', startSec: 84.76 },  // "y desconfía de quien te promete dinero fácil por intern"
  { file: '1_27.jpg', startSec: 87.94 },  // "Porque en Decom, el que menos parece un criminal,"
  { file: '1_31.jpg', startSec: 91.34 },  // "suele ser el más peligroso."
  { file: '1_33.jpg', startSec: 93.52 },  // "¿Te flipa que unos críos muevan todo esto?"
  { file: '1_36.jpg', startSec: 96.06 },  // "Suscríbete, que hay mucho más."
];
// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_drone.mp3', startSec: 0.0, volume: 0.05 },
  { file: 'cash_glitch.mp3', startSec: 5.14, volume: 0.13 },
  { file: 'game_blip.mp3', startSec: 17.78, volume: 0.12 },
  { file: 'error_buzz.mp3', startSec: 27.22, volume: 0.13 },
  { file: 'police_blip.mp3', startSec: 29.5, volume: 0.12 },
  { file: 'ominous_sting.mp3', startSec: 33.12, volume: 0.14 },
  { file: 'power_down.mp3', startSec: 36.74, volume: 0.13 },
  { file: 'data_glitch.mp3', startSec: 41.54, volume: 0.13 },
  { file: 'money_whoosh.mp3', startSec: 49.24, volume: 0.13 },
  { file: 'sim_click.mp3', startSec: 53.06, volume: 0.12 },
  { file: 'tone_shift.mp3', startSec: 63.44, volume: 0.14 },
  { file: 'deep_drone.mp3', startSec: 64.7, volume: 0.15 },
  { file: 'law_hit.mp3', startSec: 68.52, volume: 0.14 },
  { file: 'cell_clang.mp3', startSec: 74.46, volume: 0.14 },
  { file: 'shield_chime.mp3', startSec: 76.92, volume: 0.13 },
  { file: 'good_ding.mp3', startSec: 81.2, volume: 0.12 },
  { file: 'creepy_sting.mp3', startSec: 91.34, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 96.06, volume: 0.15 },
];

const MUSIC_FILE = 'background_hacker_constant.mp3';
const MUSIC_CLIP_SECONDS = 106;
const MUSIC_VOLUME = 0.42;

export const TheCom: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1117' }}>
      <Audio src={staticFile('the-com.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`the-com-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`the-com-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.2} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      <Img src={staticFile(`the-com/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </AbsoluteFill>
  );
};
