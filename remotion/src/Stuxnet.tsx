import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Stuxnet - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "En 2010, un virus informático hizo algo que nadie creía posible."
  { file: '0_04.jpg', startSec: 4.76 },  // "Destruyó máquinas físicas en el mundo real,"
  { file: '0_07.jpg', startSec: 7.72 },  // "sin que nadie tocara un solo botón dentro del edificio."
  { file: '0_11.jpg', startSec: 11.36 },  // "No robó datos,"
  { file: '0_12.jpg', startSec: 12.66 },  // "no pidió un rescate."
  { file: '0_14.jpg', startSec: 14.7 },  // "Solo tenía una mesión y la cumplió en silencio durante meses."
  { file: '0_19.jpg', startSec: 19.74 },  // "Hoy vamos a contar cómo se descubrió el arma informática más sofisticada, jamás creada,"
  { file: '0_25.jpg', startSec: 25.06 },  // "y por qué se descubrió por puro accidente."
  { file: '0_28.jpg', startSec: 28.46 },  // "Todo empieza en una planta de enriquecimiento de uranio en Natanz, Irán."
  { file: '0_33.jpg', startSec: 33.72 },  // "Miles de centrifugadoras giraban día y noche a una velocidad altísima,"
  { file: '0_37.jpg', startSec: 37.7 },  // "separando el uranio que Irán necesitaba para su programa nuclear."
  { file: '0_42.jpg', startSec: 42.06 },  // "A finales de 2009,"
  { file: '0_43.jpg', startSec: 43.66 },  // "esas centrifugadoras empezaron a romperse."
  { file: '0_46.jpg', startSec: 46.56 },  // "Una detrás de otra sin motivo aparente."
  { file: '0_49.jpg', startSec: 49.66 },  // "Los ingenieros revisaban cada pieza, cada motor,"
  { file: '0_52.jpg', startSec: 52.86 },  // "cada cable. Todo parecía perfecto, y aún así seguían fallando."
  { file: '0_58.jpg', startSec: 58.18 },  // "Lo que nadie sabía todavía es que el problema no estaba en las máquinas,"
  { file: '1_02.jpg', startSec: 62.4 },  // "estaba en el código que las controlaba."
  { file: '1_04.jpg', startSec: 64.98 },  // "Ese código vivía dentro de un sistema industrial llamado Escada,"
  { file: '1_09.jpg', startSec: 69.04 },  // "el tipo de software que controlas fábricas, plantas eléctricas y en este caso centrifugadoras nucleares."
  { file: '1_15.jpg', startSec: 75.84 },  // "Un gusano informático se había colado ahí dentro y hacía dos cosas a la vez con una precisión quirúrgica."
  { file: '1_22.jpg', startSec: 82.84 },  // "Primero, aceleraba y frenaba las centrifugadoras de forma errática hasta que la fricción las destruía por dentro."
  { file: '1_29.jpg', startSec: 89.68 },  // "Y segundo, mientras tanto,"
  { file: '1_31.jpg', startSec: 91.7 },  // "le mostraba a los operarios en sus pantallas de control que todo funcionaba con total normalidad."
  { file: '1_37.jpg', startSec: 97.68 },  // "Los ingenieros miraban un panel que decía que todo iba bien,"
  { file: '1_41.jpg', startSec: 101.04 },  // "mientras a pocos metros las máquinas se destrozaban solas."
  { file: '1_45.jpg', startSec: 105.36 },  // "Para lograr algo así,"
  { file: '1_46.jpg', startSec: 106.82 },  // "el virus necesitaba entrar en una red que ni siquiera estaba conectada a Internet."
  { file: '1_51.jpg', startSec: 111.7 },  // "Natanz usaba lo que se llama un ERGAP,"
  { file: '1_54.jpg', startSec: 114.9 },  // "una separación física total respecto al exterior,"
  { file: '1_57.jpg', startSec: 117.86 },  // "precisamente para evitar esto."
  { file: '2_00.jpg', startSec: 120.08 },  // "StaxNet saltó ese muro usando algo tan simple como memoria USB infectadas que alguien conectó dentro de la planta sin saberlo."
  { file: '2_09.jpg', startSec: 129.62 },  // "Y para moverse sin ser detectado usaba cuatro vulnerabilidades de windows que nadie conocía todavía ni siquiera Microsoft."
  { file: '2_17.jpg', startSec: 137.2 },  // "Cuatro agujeros de seguridad nunca vistos, gastados de golpe en un solo ataque."
  { file: '2_22.jpg', startSec: 142.6 },  // "Eso, por sí solo,"
  { file: '2_23.jpg', startSec: 143.98 },  // "ya era una locura de recursos."
  { file: '2_26.jpg', startSec: 146.86 },  // "Y aquí está la parte que de verdad demuestra lo quirúrgico que era este código."
  { file: '2_31.jpg', startSec: 151.82 },  // "StaxNet no atacaba cualquier sistema industrial que encontraba a su paso, comprobaba antes de hacer nada si esa configuración exacta de centrifugadoras coincidía con la de Natanz. Si no coincidía, se quedaba completamente dormido sin hacer absolutamente nada,"
  { file: '2_46.jpg', startSec: 166.94 },  // "esperando."
  { file: '2_48.jpg', startSec: 168.08 },  // "Eso significa que quien lo creó no quería causar daño en general,"
  { file: '2_52.jpg', startSec: 172.32 },  // "quería destruir ese objetivo y solo ese objetivo."
  { file: '2_55.jpg', startSec: 175.96 },  // "Entonces, ¿cómo se descubrió todo esto?"
  { file: '2_58.jpg', startSec: 178.72 },  // "Por un error de programación,"
  { file: '3_00.jpg', startSec: 180.36 },  // "no por ninguna investigación de seguridad."
  { file: '3_02.jpg', startSec: 182.8 },  // "Una actualización del propio StaxNet hizo que el gusano empezara a propagarse fuera de la planta a ordenadores normales por todo el mundo."
  { file: '3_10.jpg', startSec: 190.66 },  // "Una empresa Bielorrusa de Antibirus,"
  { file: '3_12.jpg', startSec: 192.76 },  // "Virus blocada,"
  { file: '3_14.jpg', startSec: 194.16 },  // "encontró un código extrañísimo en el ordenador de un cliente en Irán en junio de 2010."
  { file: '3_19.jpg', startSec: 199.76 },  // "Tiraron del hilo y lo que encontraron de jobo que abierta a toda la industria de la ciberseguridad."
  { file: '3_25.jpg', startSec: 205.4 },  // "Analistas de todo el mundo empezaron a diseccionar el código durante meses."
  { file: '3_29.jpg', startSec: 209.44 },  // "Y cuanto más miraban,"
  { file: '3_31.jpg', startSec: 211.06 },  // "menos sentido tenía que esto fuera obra de un ciber criminal cualquiera. La complejidad, los cuatro días cero, el conocimiento específico de equipos industriales de Siemens,"
  { file: '3_40.jpg', startSec: 220.94 },  // "todo apuntaba a un nivel de recursos propio de un estado."
  { file: '3_44.jpg', startSec: 224.88 },  // "Investigadores de seguridad con base en el código y en informes periodísticos posteriores apuntaron a una operación conjunta entre Estados Unidos e Israel."
  { file: '3_53.jpg', startSec: 233.5 },  // "Ni un gobierno ni el otro, lo ha confirmado jamás oficialmente,"
  { file: '3_57.jpg', startSec: 237.8 },  // "sigue siendo técnicamente un secreto de estado."
  { file: '4_01.jpg', startSec: 241.36 },  // "El resultado final, según estimaciones de la época,"
  { file: '4_04.jpg', startSec: 244.6 },  // "fue la destrucción de alrededor de 1000 centrifugadores."
  { file: '4_07.jpg', startSec: 247.94 },  // "Un golpe real al programa nuclear iraní conseguido sin un solo soldado, sin un solo misil,"
  { file: '4_13.jpg', startSec: 253.66 },  // "sin cruzar ninguna frontera física."
  { file: '4_16.jpg', startSec: 256.26 },  // "Por eso a Staxnet se le considera la primera arma puramente digital de la historia con un daño físico confirmado."
  { file: '4_22.jpg', startSec: 262.6 },  // "Y por eso también habría una puerta que ya no se puede cerrar,"
  { file: '4_26.jpg', startSec: 266.04 },  // "la de la guerra entre países librada con código en vez de con armas."
  { file: '4_30.jpg', startSec: 270.2 },  // "Así que la próxima vez que pienses que un virus solo puede robarte datos o pedirte un rescate,"
  { file: '4_35.jpg', startSec: 275.7 },  // "recuerda Natanz."
  { file: '4_37.jpg', startSec: 277.34 },  // "Ahí un puñado de líneas de código hizo lo que antes solo lograba un ejército,"
  { file: '4_42.jpg', startSec: 282.98 },  // "y lo hizo mientras las pantallas de control decían tranquilamente que no pasaban nada."
  { file: '4_48.jpg', startSec: 288.62 },  // "Si esto te ha volado la cabeza, suscríbete, se viene más de este mundo."
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'mechanical_break.mp3', startSec: 42.06, volume: 0.15 },
  { file: 'reveal_dark.mp3', startSec: 64.98, volume: 0.15 },
  { file: 'tense_creep.mp3', startSec: 120.08, volume: 0.15 },
  { file: 'digital_glitch.mp3', startSec: 151.82, volume: 0.14 },
  { file: 'question_sting.mp3', startSec: 175.96, volume: 0.15 },
  { file: 'reveal_dark2.mp3', startSec: 224.88, volume: 0.16 },
  { file: 'impact_thud.mp3', startSec: 244.6, volume: 0.17 },
  { file: 'serious_turn.mp3', startSec: 262.6, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 288.62, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const Stuxnet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('stuxnet.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`stuxnet-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`stuxnet-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`stuxnet/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
