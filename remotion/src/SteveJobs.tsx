import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Biografías — "Steve Jobs"
// Timestamps from Whisper segment boundaries (exact audio sync). 1 segment = 1 image.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Esta foto es Steve Jobsano."
  { file: '0_05.jpg', startSec: 2.2 },  // "Esta es solo unos meses antes de morir."
  { file: '0_04_b.jpg', startSec: 4.6 },  // "Fue dado en adopción de bebé,"
  { file: '1_06_c.jpg', startSec: 6.47 },  // "no terminó la universidad."
  { file: '2_47_b.jpg', startSec: 8.16 },  // "Lo despidieron de su propia empresa y aún así,"
  { file: '0_11.jpg', startSec: 11.16 },  // "cambió la tecnología para siempre."
  { file: '0_13.jpg', startSec: 13.6 },  // "Antes de morir, dio un discurso en Stanford que ya lleva más de 50 millones de reproducciones."
  { file: '0_20_b.jpg', startSec: 20.12 },  // "Ahí reveló las tres lecciones más importantes de su vida."
  { file: '3_49_b.jpg', startSec: 24.02 },  // "Unir los puntos,"
  { file: '0_25_c.jpg', startSec: 25.58 },  // "amor y pérdida."
  { file: '0_26.jpg', startSec: 26.8 },  // "Y la más dura de todas,"
  { file: '0_28_b.jpg', startSec: 28.56 },  // "la muerte."
  { file: '0_29.jpg', startSec: 29.88 },  // "Para entenderlas, primero tienes que conocer su historia."
  { file: '0_42.jpg', startSec: 33.86 },  // "1955,"
  { file: '0_35_b.jpg', startSec: 35.64 },  // "San Francisco."
  { file: '0_41.jpg', startSec: 37.1 },  // "Nace un bebé que sus padres biológicos, aún universitarios, no pueden criar."
  { file: '0_48.jpg', startSec: 42.4 },  // "Deciden darlo en adopción,"
  { file: '0_44_b.jpg', startSec: 44.18 },  // "pero ponen una condición,"
  { file: '0_53.jpg', startSec: 45.86 },  // "que su nueva familia sea universitaria."
  { file: '0_49_c.jpg', startSec: 48.6 },  // "La madre biológica no queda convencida con la primera pareja candidata porque no se habían graduado."
  { file: '0_54_b.jpg', startSec: 54.4 },  // "Al final, acepta a Paul y Clara Jobs,"
  { file: '0_58.jpg', startSec: 56.92 },  // "con la promesa de que el niño estudiaría en la universidad."
  { file: '1_00.jpg', startSec: 60.44 },  // "Ironía,"
  { file: '1_01_b.jpg', startSec: 61.3 },  // "ese niño terminaría casi sin pisar las aulas."
  { file: '1_09.jpg', startSec: 64.8 },  // "Crece en Silicon Valley, rodeado de la primera ola de tecnología con una curiosidad que no para."
  { file: '1_11.jpg', startSec: 71.04 },  // "A los 12 años, necesita piezas para un proyecto y hace algo que parece una locura."
  { file: '1_16_b.jpg', startSec: 76.38 },  // "Busca en la guía telefónica y llama directamente a Bill Hewlett, cofundador de HP."
  { file: '1_16.jpg', startSec: 82.12 },  // "Hablan 20 minutos."
  { file: '1_21.jpg', startSec: 83.66 },  // "Hewlett le da las piezas y un trabajo de verano en su empresa."
  { file: '1_27.jpg', startSec: 87.8 },  // "Termina el instituto y entra a Reed College, tal como sus padres esperaban."
  { file: '1_32_b.jpg', startSec: 92.28 },  // "Pero a los pocos meses lo deja."
  { file: '1_34.jpg', startSec: 94.46 },  // "Después de todo lo que sus padres sacrificaron por esa promesa de universidad,"
  { file: '1_39.jpg', startSec: 99.06 },  // "se queda igualmente en el campus, sin dinero,"
  { file: '1_41_b.jpg', startSec: 101.8 },  // "durmiendo en el suelo de amigos, recogiendo botellas para comer."
  { file: '1_45_c.jpg', startSec: 105.64 },  // "Solo entra a las clases que realmente le interesan."
  { file: '1_44_c.jpg', startSec: 108.7 },  // "Una de ellas es un curso de caligrafía."
  { file: '1_51.jpg', startSec: 111.2 },  // "En ese momento parece inútil."
  { file: '1_45.jpg', startSec: 113.32 },  // "Años después,"
  { file: '1_48.jpg', startSec: 114.4 },  // "esa clase se convertirá en las tipografías de sus computadoras."
  { file: '1_58_b.jpg', startSec: 118.84 },  // "Se une a Atari,"
  { file: '1_58.jpg', startSec: 120.26 },  // "y ahí un vecino llamado Bosniak le habla de una idea que suena a ciencia ficción."
  { file: '2_05.jpg', startSec: 125.36 },  // "Una computadora lo bastante pequeña para caber en una casa."
  { file: '2_09.jpg', startSec: 129.38 },  // "Juntan fuerzas en el garaje de los jobs."
  { file: '2_11_b.jpg', startSec: 131.72 },  // "Bosniak pone la ingeniería."
  { file: '2_13.jpg', startSec: 133.72 },  // "Jobs pone la visión."
  { file: '2_11.jpg', startSec: 135.66 },  // "Venden sus pertenencias más valiosas para financiar el primer prototipo,"
  { file: '2_19_b.jpg', startSec: 139.8 },  // "la Apple 1."
  { file: '2_21.jpg', startSec: 141.1 },  // "Después llega la Apple 2, y con ella el éxito."
  { file: '2_27.jpg', startSec: 144.22 },  // "Apple sale a bolsa y los convierte en millonarios."
  { file: '2_27_b.jpg', startSec: 147.4 },  // "Pero el éxito trae otro problema."
  { file: '2_34.jpg', startSec: 149.88 },  // "Jobs contrata al CEO de Pepsi con una frase que se hizo legendaria."
  { file: '2_39.jpg', startSec: 154.28 },  // "¿Quieres vender agua azucarada el resto de tu vida? O venir a cambiar el mundo conmigo."
  { file: '2_39_b.jpg', startSec: 159.44 },  // "Ese mismo hombre, años después,"
  { file: '2_45.jpg', startSec: 161.54 },  // "ayuda a la junta directiva a apartarlo de su propia empresa."
  { file: '2_29.jpg', startSec: 165.56 },  // "En 1985,"
  { file: '2_52.jpg', startSec: 167.78 },  // "Steve Jobs es despedido de Apple,"
  { file: '2_47_b.jpg', startSec: 170.12 },  // "la compañía que él mismo fundó."
  { file: '2_58.jpg', startSec: 172.72 },  // "Cuenta después que perder Apple fue uno de los golpes más duros de su vida."
  { file: '2_57_b.jpg', startSec: 177.14 },  // "Pero no se rindió."
  { file: '3_00.jpg', startSec: 178.7 },  // "Funda Next compra una pequeña empresa de efectos especiales llamada Pixar,"
  { file: '3_05.jpg', startSec: 183.88 },  // "que terminaría creando Toy Story,"
  { file: '3_09.jpg', startSec: 186.2 },  // "la primera película animada por computadora de la historia."
  { file: '3_09_b.jpg', startSec: 189.84 },  // "Mientras tanto, sin él,"
  { file: '3_15.jpg', startSec: 191.78 },  // "Apple entra en caída libre, al borde de la bancarrota."
  { file: '3_23_survive.jpg', startSec: 195.08 },  // "Para sobrevivir,"
  { file: '3_16_b.jpg', startSec: 196.48 },  // "Apple no tiene más opción que comprar Next."
  { file: '3_19.jpg', startSec: 199.22 },  // "Y con esa compra,"
  { file: '3_20_return.jpg', startSec: 200.52 },  // "Jobs vuelve a la empresa que lo había echado, once años después."
  { file: '3_25_b.jpg', startSec: 205.18 },  // "Reconstruye Apple desde cero,"
  { file: '3_32.jpg', startSec: 207.14 },  // "el iMac,"
  { file: '3_42.jpg', startSec: 208.0 },  // "el iPod, y en 2007 el iPhone,"
  { file: '3_30_b.jpg', startSec: 210.98 },  // "el dispositivo que redefiniría la tecnología para siempre."
  { file: '3_35.jpg', startSec: 215.28 },  // "Pero en 2004,"
  { file: '3_36_lineup.jpg', startSec: 216.72 },  // "en plena racha de éxitos,"
  { file: '3_45.jpg', startSec: 218.4 },  // "los médicos le dan una noticia."
  { file: '3_40_b.jpg', startSec: 220.82 },  // "Cáncer de páncreas."
  { file: '3_49.jpg', startSec: 222.76 },  // "Sigue trabajando con la misma intensidad."
  { file: '3_53.jpg', startSec: 225.5 },  // "Un año después, Stanford lo invita a dar aquel discurso."
  { file: '3_49_b.jpg', startSec: 229.26 },  // "Ahí habla de unir los puntos,"
  { file: '3_58.jpg', startSec: 231.28 },  // "que dejar la universidad sin saberlo, lo llevó a esa clase de caligrafía que terminaría definiendo el diseño de sus productos."
  { file: '4_05.jpg', startSec: 238.96 },  // "Habla de amor y pérdida,"
  { file: '4_00_b.jpg', startSec: 240.52 },  // "que sólo logró seguir adelante después de ser despedido porque amaba lo que hacía."
  { file: '0_28_b.jpg', startSec: 245.56 },  // "Y habla de la muerte,"
  { file: '4_17.jpg', startSec: 246.9 },  // "que llevaba 33 años preguntándose cada mañana frente al espejo."
  { file: '4_11_b.jpg', startSec: 251.66 },  // "Si hoy fuera el último día de mi vida,"
  { file: '4_05.jpg', startSec: 254.1 },  // "querría hacer lo que estoy a punto de hacer,"
  { file: '4_11.jpg', startSec: 257.06 },  // "cuando la respuesta era demasiadas veces no, sabía que tenía que cambiar algo."
  { file: '4_22_b.jpg', startSec: 262.38 },  // "El 5 de octubre de 2011,"
  { file: '4_32.jpg', startSec: 264.62 },  // "Steve Jobs muere."
  { file: '4_37.jpg', startSec: 266.26 },  // "Pero antes había escrito, con sólo 17 años,"
  { file: '4_29_b.jpg', startSec: 269.7 },  // "una frase que resultó profética."
  { file: '4_26.jpg', startSec: 272.5 },  // "Si vives cada día como si fuera el último,"
  { file: '4_26.jpg', startSec: 275.32 },  // "algún día tendrás razón."
  { file: '4_49.jpg', startSec: 277.8 },  // "Esa foto sano y esa foto enferma que viste al principio,"
  { file: '4_45.jpg', startSec: 281.6 },  // "son la misma persona,"
  { file: '4_29_b.jpg', startSec: 283.2 },  // "con el mismo mensaje."
  { file: '4_22.jpg', startSec: 285.22 },  // "No sabes cuánto tiempo tienes,"
  { file: '4_47_b.jpg', startSec: 287.22 },  // "así que hazlo valer."
  { file: '4_52.jpg', startSec: 289.24 },  // "Si esta historia te ha hecho pensar en tu propia vida, suscríbete y cuéntame en comentarios cuál de las tres lecciones de Jobs te llega más."
];







// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/biografias/videos/steve-jobs/sfx.json).
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'soft_whoosh.mp3', startSec: 0.0, volume: 0.11 },
  { file: 'sad_sting.mp3', startSec: 4.6, volume: 0.13 },
  { file: 'tense_sting.mp3', startSec: 28.56, volume: 0.14 },
  { file: 'page_flip.mp3', startSec: 33.86, volume: 0.1 },
  { file: 'baby_coo.mp3', startSec: 37.1, volume: 0.11 },
  { file: 'sad_sting.mp3', startSec: 42.4, volume: 0.12 },
  { file: 'hopeful_swell.mp3', startSec: 54.4, volume: 0.13 },
  { file: 'soft_whoosh.mp3', startSec: 60.44, volume: 0.1 },
  { file: 'phone_dial.mp3', startSec: 76.38, volume: 0.12 },
  { file: 'realization_chime.mp3', startSec: 83.66, volume: 0.14 },
  { file: 'tense_sting.mp3', startSec: 92.28, volume: 0.13 },
  { file: 'sad_sting.mp3', startSec: 101.8, volume: 0.1 },
  { file: 'pencil_scribble.mp3', startSec: 108.7, volume: 0.11 },
  { file: 'realization_chime.mp3', startSec: 114.4, volume: 0.13 },
  { file: 'soft_whoosh.mp3', startSec: 120.26, volume: 0.1 },
  { file: 'keyboard_clack.mp3', startSec: 129.38, volume: 0.11 },
  { file: 'cash_register.mp3', startSec: 135.66, volume: 0.13 },
  { file: 'hopeful_swell.mp3', startSec: 141.1, volume: 0.13 },
  { file: 'cash_register.mp3', startSec: 144.22, volume: 0.12 },
  { file: 'dramatic_reveal.mp3', startSec: 149.88, volume: 0.16 },
  { file: 'door_slam.mp3', startSec: 167.78, volume: 0.14 },
  { file: 'sad_sting.mp3', startSec: 172.72, volume: 0.14 },
  { file: 'hopeful_swell.mp3', startSec: 178.7, volume: 0.13 },
  { file: 'realization_chime.mp3', startSec: 186.2, volume: 0.13 },
  { file: 'tense_sting.mp3', startSec: 191.78, volume: 0.14 },
  { file: 'hopeful_swell.mp3', startSec: 200.52, volume: 0.14 },
  { file: 'dramatic_reveal.mp3', startSec: 208.0, volume: 0.17 },
  { file: 'sad_sting.mp3', startSec: 220.82, volume: 0.15 },
  { file: 'soft_whoosh.mp3', startSec: 225.5, volume: 0.1 },
  { file: 'heartbeat_soft.mp3', startSec: 246.9, volume: 0.12 },
  { file: 'sad_sting.mp3', startSec: 264.62, volume: 0.16 },
  { file: 'pencil_scribble.mp3', startSec: 269.7, volume: 0.1 },
  { file: 'candle_blow.mp3', startSec: 275.32, volume: 0.13 },
  { file: 'warm_glow_chime.mp3', startSec: 283.2, volume: 0.15 },
  { file: 'warm_glow_chime.mp3', startSec: 287.22, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 289.24, volume: 0.16 },
];

const MUSIC_FILE = 'background_theme_30.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.18;

export const SteveJobs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;

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
      <Audio src={staticFile('steve-jobs.mp3')} playbackRate={PLAYBACK_RATE} />
      {MUSIC_FILE && (
        <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
          <Audio src={staticFile(`steve-jobs-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
        </Loop>
      )}
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`steve-jobs-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      {activeFrame && (
        <Img
          src={staticFile(`steve-jobs/${activeFrame.file}`)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </AbsoluteFill>
  );
};
