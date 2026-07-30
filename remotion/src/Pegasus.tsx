import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Pegasus — mono hacker crudo Ecomonos. 1 segmento = 1 imagen.
// === FRAMES:START ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Imagina un programa que puede entrar en tu móvil, "
  { file: '0_05.jpg', startSec: 5.22 },  // "Ni un clic, ni un enlace, ni una descarga."
  { file: '0_08.jpg', startSec: 8.72 },  // "Se llama Pegasus, y es el espía más potente, jamás"
  { file: '0_13.jpg', startSec: 13.24 },  // "Lo fabrica una empresa Israelí en ese O-Group, y n"
  { file: '0_20.jpg', startSec: 20.38 },  // "Oficialmente, para una sola cosa, cazar terrorista"
  { file: '0_24.jpg', startSec: 24.94 },  // "Pero la historia, ya verás, se tuerce."
  { file: '0_28.jpg', startSec: 28.28 },  // "Primero lo más flipante, como entra."
  { file: '0_31.jpg', startSec: 31.52 },  // "Un virus normal necesita que hagas algo, picar un "
  { file: '0_36.jpg', startSec: 36.7 },  // "Pegasus no necesita nada de eso."
  { file: '0_39.jpg', startSec: 39.36 },  // "Aprovecha un fallo secreto en apps que usas cada d"
  { file: '0_45.jpg', startSec: 45.18 },  // "Te llega un mensaje, y aunque no lo abras, ya está"
  { file: '0_50.jpg', startSec: 50.18 },  // "En algunos casos bastaba una simple llamada perdid"
  { file: '0_53.jpg', startSec: 53.74 },  // "y después ese mensaje se borra sólo, para no dejar"
  { file: '0_58.jpg', startSec: 58.54 },  // "Una vez dentro, es el dueño absoluto de tu móvil."
  { file: '1_02.jpg', startSec: 62.42 },  // "Le tus whatsapps y tus telegram, aunque estén cifr"
  { file: '1_06.jpg', startSec: 66.18 },  // "¿Cómo?"
  { file: '1_07.jpg', startSec: 67.12 },  // "Los lee directamente en tu pantalla, antes de cifr"
  { file: '1_13.jpg', startSec: 73.26 },  // "Ve tus fotos, tus correos y tus contraseñas."
  { file: '1_16.jpg', startSec: 76.68 },  // "Sabe exactamente dónde estás por el GPS."
  { file: '1_20.jpg', startSec: 80.28 },  // "Y lo más escalofriante."
  { file: '1_22.jpg', startSec: 82.08 },  // "Encién de tu cámara y tu micrófono cuando quiere."
  { file: '1_25.jpg', startSec: 85.46 },  // "Tu teléfono se convierte en un micrófono espía den"
  { file: '1_31.jpg', startSec: 91.22 },  // "Y aquí es donde la cosa se tuerce de verdad."
  { file: '1_34.jpg', startSec: 94.82 },  // "En 2021, estalló el escándalo."
  { file: '1_37.jpg', startSec: 97.44 },  // "Una investigación destapó una lista de más de 50.0"
  { file: '1_42.jpg', startSec: 102.6 },  // "¿Y quiénes estaban en ella?"
  { file: '1_43.jpg', startSec: 103.92 },  // "Periodistas, activistas, abocados, jueces y hasta "
  { file: '1_50.jpg', startSec: 110.86 },  // "Gente, cuyo único delito era investigar o incomoda"
  { file: '1_55.jpg', startSec: 115.62 },  // "Se llegó a vincular con el asesinato del periodist"
  { file: '2_00.jpg', startSec: 120.2 },  // "Y salpico a media Europa, España incluida."
  { file: '2_03.jpg', startSec: 123.86 },  // "Una herramienta que se vendía contra el terrorismo"
  { file: '2_09.jpg', startSec: 129.8 },  // "¿Y cómo se supo todo esto?"
  { file: '2_12.jpg', startSec: 132.32 },  // "Gracias a investigadores como Citizen Lab y Amnist"
  { file: '2_16.jpg', startSec: 136.98 },  // "Analizaron los móviles y encontraron las huellas d"
  { file: '2_20.jpg', startSec: 140.8 },  // "El escándalo fue tan bestia que Estados Unidos met"
  { file: '2_26.jpg', startSec: 146.66 },  // "Pero el software sigue ahí fuera y sigue mejorando"
  { file: '2_30.jpg', startSec: 150.68 },  // "¿Y cuánto cuesta espiar así a una persona?"
  { file: '2_33.jpg', startSec: 153.98 },  // "Millones de euros por objetivo."
  { file: '2_36.jpg', startSec: 156.72 },  // "Así que respira, nadie va a gastar una fortuna en "
  { file: '2_42.jpg', startSec: 162.14 },  // "Si no eres periodista, activista o político, no er"
  { file: '2_47.jpg', startSec: 167.44 },  // "Pero hay un problema serio."
  { file: '2_49.jpg', startSec: 169.36 },  // "Es casi imposible detectar."
  { file: '2_51.jpg', startSec: 171.92 },  // "No hay icono, no haya viso, no valento."
  { file: '2_55.jpg', startSec: 175.56 },  // "Nada."
  { file: '2_56.jpg', startSec: 176.82 },  // "Aún así, puedes ponerse lo muy difícil."
  { file: '3_00.jpg', startSec: 180.42 },  // "Uno, reinicia el móvil cada día."
  { file: '3_03.jpg', startSec: 183.78 },  // "Muchas versiones no sobreviven a un reinicio."
  { file: '3_06.jpg', startSec: 186.88 },  // "Dos, mantello siempre actualizado."
  { file: '3_10.jpg', startSec: 190.12 },  // "Cada parche tapa un agujero."
  { file: '3_12.jpg', startSec: 192.54 },  // "Tres, si de verdad eres un objetivo, activa el mod"
  { file: '3_18.jpg', startSec: 198.4 },  // "Y cuatro, desconfía."
  { file: '3_21.jpg', startSec: 201.12 },  // "Casi todos los ataques normales empiezan por un en"
  { file: '3_24.jpg', startSec: 204.98 },  // "Porque en el mundo de hoy, tu teléfono sabe más de"
  { file: '3_29.jpg', startSec: 209.96 },  // "¿Dónde vas con quién hablas?"
  { file: '3_32.jpg', startSec: 212.42 },  // "¿Qué piensas a las tres de la mañana?"
  { file: '3_34.jpg', startSec: 214.92 },  // "Y alguien, en algún lugar, podría estar mirando po"
  { file: '3_40.jpg', startSec: 220.28 },  // "Ahora mismo."
  { file: '3_42.jpg', startSec: 222.22 },  // "¿Te ha dado mal rollo?"
  { file: '3_44.jpg', startSec: 224.16 },  // "Pues esto no ha hecho más que empezar."
  { file: '3_47.jpg', startSec: 227.0 },  // "Suscríbete que hay mucho más del lado oscuro de la"
];
// === FRAMES:END ===
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'whoosh_in.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'reveal_sting.mp3', startSec: 8.72, volume: 0.14 },
  { file: 'glitch_seep.mp3', startSec: 39.36, volume: 0.13 },
  { file: 'phone_notify.mp3', startSec: 45.18, volume: 0.12 },
  { file: 'creepy_on.mp3', startSec: 82.08, volume: 0.14 },
  { file: 'tone_shift.mp3', startSec: 91.22, volume: 0.14 },
  { file: 'impact_hit.mp3', startSec: 94.82, volume: 0.15 },
  { file: 'target_beep.mp3', startSec: 97.44, volume: 0.13 },
  { file: 'somber_sting.mp3', startSec: 115.62, volume: 0.13 },
  { file: 'stamp.mp3', startSec: 140.8, volume: 0.14 },
  { file: 'cash.mp3', startSec: 153.98, volume: 0.13 },
  { file: 'eerie_search.mp3', startSec: 169.36, volume: 0.12 },
  { file: 'power_up.mp3', startSec: 176.82, volume: 0.13 },
  { file: 'reboot.mp3', startSec: 180.42, volume: 0.13 },
  { file: 'ding.mp3', startSec: 186.88, volume: 0.12 },
  { file: 'shield.mp3', startSec: 192.54, volume: 0.13 },
  { file: 'creepy_watch.mp3', startSec: 214.92, volume: 0.14 },
  { file: 'ominous_grin.mp3', startSec: 224.16, volume: 0.14 },
  { file: 'subscribe.mp3', startSec: 227.0, volume: 0.15 },
];
const MUSIC_FILE = 'background_hacker_constant.mp3';
const MUSIC_CLIP_SECONDS = 106;
const MUSIC_VOLUME = 0.42;

export const Pegasus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let a = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { a = i; } else { break; } }
  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1117' }}>
      <Audio src={staticFile('pegasus.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`pegasus-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((s, i) => (
        <Sequence key={i} from={Math.round((s.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`pegasus-sfx/${s.file}`)} volume={s.volume ?? 0.2} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      <Img src={staticFile(`pegasus/${FRAMES[a].file}`)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </AbsoluteFill>
  );
};
