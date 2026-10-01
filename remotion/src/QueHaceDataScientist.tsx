import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Qué hace un Data Scientist en realidad - canal tecno (serie "qué hace en realidad").
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Si le preguntas a la mayoría de la gente que hace un data scientist,"
  { file: '0_03.jpg', startSec: 3.82 },  // "te van a decir algo como «entrena inteligencia artificial es todo el día». Es mentira."
  { file: '0_09.jpg', startSec: 9.34 },  // "O más bien,"
  { file: '0_10.jpg', startSec: 10.36 },  // "es solo una parte muy pequeña de la verdad."
  { file: '0_12.jpg', startSec: 12.92 },  // "Un data scientist se pasa la mayor parte de su tiempo haciendo algo mucho menos glamuroso,"
  { file: '0_18.jpg', startSec: 18.1 },  // "limpiar datos sucios."
  { file: '0_20.jpg', startSec: 20.22 },  // "Hoy te cuento qué hace de verdad, cuánto se gana en España y cómo se entra en esto sin morir en el intento."
  { file: '0_27.jpg', startSec: 27.06 },  // "Empecemos por el mito."
  { file: '0_28.jpg', startSec: 28.83 },  // "La imagen típica es alguien delante de una pantalla llena de código entrenando redes neuronales gigantes."
  { file: '0_35.jpg', startSec: 35.7 },  // "La realidad,"
  { file: '0_36.jpg', startSec: 36.76 },  // "según encuestas del propio sector,"
  { file: '0_38.jpg', startSec: 38.78 },  // "es que ese tipo de trabajo, entrenar modelos, ocupa una fracción pequeña del tiempo real."
  { file: '0_44.jpg', startSec: 44.62 },  // "La mayor parte del día se va en algo mucho más aburrido y mucho más importante,"
  { file: '0_49.jpg', startSec: 49.42 },  // "encontrar los datos,"
  { file: '0_50.jpg', startSec: 50.84 },  // "limpiarlos y entenderlos antes de tocar ningún modelo."
  { file: '0_54.jpg', startSec: 54.74 },  // "Si los datos de entrada están mal,"
  { file: '0_56.jpg', startSec: 56.66 },  // "no importa lo bueno que sea el modelo, la respuesta va a estar mal igual."
  { file: '1_01.jpg', startSec: 61.06 },  // "Vamos con un ejemplo real y muy típico,"
  { file: '1_03.jpg', startSec: 63.6 },  // "una empresa de suscripción que quiere saber qué clientes van a darse de baja el mes que viene."
  { file: '1_08.jpg', startSec: 68.7 },  // "El data scientist no empieza programando, empieza haciendo una pregunta de negocio muy concreta,"
  { file: '1_14.jpg', startSec: 74.68 },  // "¿qué comportamiento antes de irse tienen los clientes que se acaban dando de baja?"
  { file: '1_20.jpg', startSec: 80.24 },  // "Después va a buscar esos datos en bases de datos internas, en registros de uso,"
  { file: '1_25.jpg', startSec: 85.36 },  // "a veces en hojas de cálculos sueltas que nadie ha limpiado en meses."
  { file: '1_29.jpg', startSec: 89.2 },  // "Esa parte, juntar y limpiar datos de fuentes distintas..."
  { file: '1_38.jpg', startSec: 98.06 },  // "Solo cuando los datos están limpios... Python y Scikit-Learn."
  { file: '1_49.jpg', startSec: 109.78 },  // "Y aquí viene algo que casi nadie cuenta,"
  { file: '1_52.jpg', startSec: 112.5 },  // "el modelo no es el final del trabajo, es solo la mitad."
  { file: '1_56.jpg', startSec: 116.42 },  // "La otra mitad es explicarle a alguien de marketing o de dirección..."
  { file: '2_05.jpg', startSec: 125.46 },  // "Un data scientist que no sabe comunicar sus resultados... Es, literalmente,"
  { file: '2_15.jpg', startSec: 135.84 },  // "un puente entre los datos en bruto y una decisión de negocio real."
  { file: '2_20.jpg', startSec: 140.52 },  // "Vale, y todo esto,"
  { file: '2_22.jpg', startSec: 142.28 },  // "cuánto se paga en España en 2026."
  { file: '2_25.jpg', startSec: 145.7 },  // "Un perfil junior con 0 a 2 años de experiencia se mueve entre 35.000 y 45.000 euros brutos al año."
  { file: '2_33.jpg', startSec: 153.76 },  // "Un perfil senior puede llegar a 60.000, 85.000 con picos por encima de 90.000..."
  { file: '2_42.jpg', startSec: 162.18 },  // "La diferencia entre esos dos números no es solo experiencia,"
  { file: '2_46.jpg', startSec: 166.14 },  // "es sobre todo la capacidad de conectar un modelo técnico con un resultado de negocio real."
  { file: '2_51.jpg', startSec: 171.66 },  // "¿Y cómo se entra en esto sin una carrera específica de ciencia de datos?"
  { file: '2_56.jpg', startSec: 176.4 },  // "La ruta más habitual hoy en día empieza con Python y SQL,"
  { file: '3_00.jpg', startSec: 180.54 },  // "las dos herramientas base que aparecen en prácticamente cualquier oferta del sector."
  { file: '3_05.jpg', startSec: 185.72 },  // "Después,"
  { file: '3_06.jpg', startSec: 186.44 },  // "un proyecto propio y pequeño... alquileres de una ciudad."
  { file: '3_15.jpg', startSec: 195.66 },  // "Es ese tipo de proyecto, hecho de principio a fin,"
  { file: '3_18.jpg', startSec: 198.66 },  // "vale más en una entrevista que un título sin nada que enseñar detrás."
  { file: '3_23.jpg', startSec: 203.06 },  // "Este mismo fin de semana podría escoger un dataset público, gratis..."
  { file: '3_29.jpg', startSec: 209.9 },  // "Así que la próxima vez que alguien te diga que ser Data Scientist es hablar con IAs todo el día,"
  { file: '3_35.jpg', startSec: 215.88 },  // "ya sabes que la realidad es mucho más parecida a ser detective de datos sucios..."
  { file: '3_43.jpg', startSec: 223.68 },  // "Y esa parte aburrida, la de limpiar y entender los datos,"
  { file: '3_47.jpg', startSec: 227.14 },  // "es exactamente la que más se paga cuando se hace bien."
  { file: '3_51.jpg', startSec: 231.02 },  // "Si te ha interesado esta serie sobre empleos reales en tecnología,"
  { file: '3_54.jpg', startSec: 234.52 },  // "suscríbete,"
  { file: '3_55.jpg', startSec: 235.4 },  // "se viene más de este mundo."
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'myth_bust.mp3', startSec: 3.82, volume: 0.16 },
  { file: 'info_reveal.mp3', startSec: 20.22, volume: 0.15 },
  { file: 'example_transition.mp3', startSec: 61.06, volume: 0.14 },
  { file: 'reveal_twist.mp3', startSec: 109.78, volume: 0.16 },
  { file: 'money_chime.mp3', startSec: 142.28, volume: 0.17 },
  { file: 'tool_pop.mp3', startSec: 176.4, volume: 0.15 },
  { file: 'actionable_ding.mp3', startSec: 203.06, volume: 0.15 },
  { file: 'closing_transition.mp3', startSec: 209.9, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 234.52, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHaceDataScientist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hace-data-scientist.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hace-data-scientist-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hace-data-scientist-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hace-data-scientist/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
