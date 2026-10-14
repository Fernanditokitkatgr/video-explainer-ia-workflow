import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// alphago-la-ia-que-aprendio-a-jugar-sola - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Marzo de 2016,
  { file: '0_01.jpg', startSec: 1.64 },  // en un hotel de Seul, un ordenador hace un movimiento que deja en silencio a toda la sala.
  { file: '0_06.jpg', startSec: 6.96 },  // Los comentaristas maestros de Go con décadas de experiencia no saben qué está pasando.
  { file: '0_12.jpg', startSec: 12.72 },  // Uno de ellos dice en directo que cree que es un error del programa.
  { file: '0_16.jpg', startSec: 16.66 },  // No lo era.
  { file: '0_18.jpg', startSec: 18.1 },  // Esa jugada.
  { file: '0_19.jpg', startSec: 19.22 },  // Hoy conocida simplemente como la jugada 37,
  { file: '0_22.jpg', startSec: 22.36 },  // cambió para siempre cómo entendemos la inteligencia artificial.
  { file: '0_26.jpg', startSec: 26.54 },  // Hoy vas a entender qué pasó realmente esos días en Seul, vas a entender porque el go se consideraba hasta ese 
  { file: '0_34.jpg', startSec: 34.98 },  // Vas a entender cómo aprende de verdad una ia cuando nadie le da las respuestas.
  { file: '0_40.jpg', startSec: 40.78 },  // Empecemos por el juego que todos daban por imposible de resolver.
  { file: '0_44.jpg', startSec: 44.44 },  // El go es un juego de mesa con más de dos mil años de historia nacido en China.
  { file: '0_48.jpg', startSec: 48.94 },  // Sus reglas son de una sencillez casi infantil.
  { file: '0_51.jpg', startSec: 51.92 },  // Dos jugadores colocan piedras, negras y blancas, sobre un tablero cuadriculado turno tras turno. Rodea el terr
  { file: '1_01.jpg', startSec: 61.58 },  // Pero de esas ensillez nace una complejidad descomunal.
  { file: '1_05.jpg', startSec: 65.14 },  // El número de partidas distintas que se pueden jugar en un tablero de Go es mayor que el número de átomos que h
  { file: '1_13.jpg', startSec: 73.08 },  // En ajedrez,
  { file: '1_14.jpg', startSec: 74.06 },  // un ordenador potente podía ya ganar a los mejores humanos calculando por fuerza bruta,
  { file: '1_18.jpg', startSec: 78.78 },  // probando muchísimas jugadas por adelantado.
  { file: '1_21.jpg', startSec: 81.7 },  // En Go,
  { file: '1_22.jpg', startSec: 82.5 },  // esa fuerza bruta no sirve de nada.
  { file: '1_24.jpg', startSec: 84.56 },  // Hay demasiadas partidas posibles para calcular las todas ni con el ordenador más potente del planeta.
  { file: '1_30.jpg', startSec: 90.74 },  // Un jugador humano experto no gana calculando cada opción.
  { file: '1_34.jpg', startSec: 94.38 },  // Gana con algo parecido a la intuición,
  { file: '1_36.jpg', startSec: 96.58 },  // una sensación entrenada durante años sobre qué forma de jugar se ve bien en el tablero.
  { file: '1_42.jpg', startSec: 102.36 },  // Durante décadas, enseñarle esa intuición a una máquina pareció sencillamente imposible.
  { file: '1_48.jpg', startSec: 108.2 },  // Hay, entre DeepMind,
  { file: '1_49.jpg', startSec: 109.78 },  // un laboratorio de inteligencia artificial con un programa llamado AlphaGo.
  { file: '1_54.jpg', startSec: 114.36 },  // Y ahí entra Lise Dol,
  { file: '1_56.jpg', startSec: 116.38 },  // uno de los mejores jugadores de Go del mundo, campeón de múltiples títulos internacionales.
  { file: '2_01.jpg', startSec: 121.86 },  // Antes del partido, casi nadie esperaba que AlphaGo tuviera una sola oportunidad real.
  { file: '2_07.jpg', startSec: 127.12 },  // El propio Lise Dol predijo que ganaría la serie entera sin perder ni una sola partida.
  { file: '2_12.jpg', startSec: 132.66 },  // Perdió la primera partida y la segunda.
  { file: '2_15.jpg', startSec: 135.54 },  // En esa segunda partida llegó la jugada 37, una jugada que ningún jugador humano de nivel alto habría elegido j
  { file: '2_23.jpg', startSec: 143.92 },  // Rompía con siglos de forma de jugar aceptada, con lo que todo buen jugador sabe que no se hace.
  { file: '2_30.jpg', startSec: 150.12 },  // Los comentaristas tardaron minutos en encontrarles sentido.
  { file: '2_33.jpg', startSec: 153.66 },  // Y esa jugada, la que parecía un error,
  { file: '2_36.jpg', startSec: 156.28 },  // terminó siendo clave para ganar esa partida.
  { file: '2_39.jpg', startSec: 159.06 },  // AlphaGo terminó ganando la serie completa, cuatro partidas a una.
  { file: '2_43.jpg', startSec: 163.32 },  // Fue la primera vez que una máquina venció al campeón humano en un juego que hasta ese mismo día, se considerab
  { file: '2_52.jpg', startSec: 172.4 },  // Pero ¿cómo aprende de verdad una máquina a jugar así?
  { file: '2_55.jpg', startSec: 175.82 },  // No le programaron las reglas de ¿Qué jugada es buena?
  { file: '2_59.jpg', startSec: 179.1 },  // Nadie le dio una lista de trucos ganadores.
  { file: '3_01.jpg', startSec: 181.82 },  // AlphaGo aprendió en dos fases.
  { file: '3_03.jpg', startSec: 183.98 },  // En la primera fase, el sistema observó cientos de miles de partidas jugadas por jugadores humanos profesionale
  { file: '3_12.jpg', startSec: 192.52 },  // De ahí sacó una primera idea de que movimientos suelen funcionar en según qué situaciones.
  { file: '3_17.jpg', startSec: 197.88 },  // Esta parte se llama Aprendizaje Supervisado. El sistema aprende imitando ejemplos que ya existen.
  { file: '3_24.jpg', startSec: 204.38 },  // Pero imitar a humanos solo le permitía llegar hasta el nivel de un buen jugador humano,
  { file: '3_28.jpg', startSec: 208.78 },  // no más allá.
  { file: '3_29.jpg', startSec: 209.8 },  // La segunda fase es la que de verdad cambió las reglas del juego.
  { file: '3_33.jpg', startSec: 213.6 },  // AlphaGo empezó a jugar millones de partidas contra versiones de sí mismo.
  { file: '3_37.jpg', startSec: 217.78 },  // Cada partida terminaba en victoria o derrota, y ese resultado final servía para ajustar su comportamiento futu
  { file: '3_44.jpg', startSec: 224.26 },  // Si una forma de jugar le llevaba a ganar más veces, el sistema reforzaba esa forma de jugar.
  { file: '3_49.jpg', startSec: 229.46 },  // Si le llevaba a perder,
  { file: '3_50.jpg', startSec: 230.92 },  // la abandonaba poco a poco.
  { file: '3_52.jpg', startSec: 232.88 },  // Este proceso de prueba error y ajuste constante se llama Aprendizaje por refuerzo.
  { file: '3_58.jpg', startSec: 238.02 },  // Nadie le dijo nunca, esta jugada es buena.
  { file: '4_00.jpg', startSec: 240.92 },  // Lo descubrió jugando contra sí mismo, millones de veces,
  { file: '4_04.jpg', startSec: 244.36 },  // más partidas de las que un humano juega en toda una vida entera.
  { file: '4_08.jpg', startSec: 248.18 },  // Por dentro, dos piezas trabajaban juntas en cada turno, una red neuronal encargada de proponer qué movimientos
  { file: '4_23.jpg', startSec: 263.78 },  // Con esas dos valoraciones, el sistema exploraba por adelantado varias partidas posibles antes de decidir su si
  { file: '4_31.jpg', startSec: 271.86 },  // Así combinaba algo parecido a la intuición de la primera red con algo parecido al cálculo de esa búsqueda por 
  { file: '4_39.jpg', startSec: 279.04 },  // Un año después, en 2017,
  { file: '4_41.jpg', startSec: 281.46 },  // DeepMind presentó una versión todavía más sorprendente,
  { file: '4_44.jpg', startSec: 284.54 },  // llamada AlphaGo0.
  { file: '4_46.jpg', startSec: 286.66 },  // Esta nueva versión ni siquiera miró una sola partida humana al empezar.
  { file: '4_50.jpg', startSec: 290.86 },  // Partió de movimientos completamente aleatorios,
  { file: '4_53.jpg', startSec: 293.66 },  // sin ninguna idea previa de cómo jugar bien.
  { file: '4_56.jpg', startSec: 296.42 },  // Aprendé jugando contra sí misma desde cero,
  { file: '4_59.jpg', startSec: 299.0 },  // pura prueba y error,
  { file: '5_00.jpg', startSec: 300.3 },  // generación tras generación.
  { file: '5_02.jpg', startSec: 302.22 },  // En sólo tres días de entrenamiento,
  { file: '5_04.jpg', startSec: 304.26 },  // superó a la versión original que había vencido al lísedol.
  { file: '5_07.jpg', startSec: 307.68 },  // Partiendo de cero absoluto, sin ni un solo ejemplo humano de por medio.
  { file: '5_12.jpg', startSec: 312.16 },  // ¿Por qué un juego de mesa debería importarte a ti?
  { file: '5_15.jpg', startSec: 315.04 },  // Porque la idea central detrás de todo esto, aprender por ensayo y error contra uno mismo, sin que un humano de
  { file: '5_25.jpg', startSec: 325.08 },  // El mismo equipo de DeepMind usó principios parecidos para construir AlphaFold,
  { file: '5_30.jpg', startSec: 330.12 },  // un sistema capaz de predecir la forma en que se pliegan las proteínas, un problema que la biología llevaba déc
  { file: '5_37.jpg', startSec: 337.46 },  // Una idea nacida para ganar a un campeón de Go terminó ayudando a avanzar la investigación médica real.
  { file: '5_43.jpg', startSec: 343.5 },  // Ahora la parte honesta.
  { file: '5_45.jpg', startSec: 345.22 },  // AlphaGo es lo que se llama inteligencia artificial estrecha.
  { file: '5_48.jpg', startSec: 348.52 },  // Sabe jugar Go y solo Go a un nivel sobrehumano.
  { file: '5_52.jpg', startSec: 352.04 },  // No entiende el lenguaje, no reconoce caras, no sabe conducir un coche,
  { file: '5_56.jpg', startSec: 356.36 },  // no piensan ni comprende el mundo como lo hace una persona.
  { file: '5_59.jpg', startSec: 359.8 },  // Fuera de ese tablero es completamente inútil.
  { file: '6_02.jpg', startSec: 362.69 },  // Lo que sí dejó fue un principio,
  { file: '6_04.jpg', startSec: 364.76 },  // aprender jugando contra uno mismo, que hoy sigue usándose para entrenar otros sistemas de inteligencia artific
  { file: '6_12.jpg', startSec: 372.04 },  // Aquella jugada 37 sigue estudiándose hoy en clubs de Go de todo el mundo.
  { file: '6_16.jpg', startSec: 376.88 },  // Jugadores humanos la analizan, la discuten,
  { file: '6_19.jpg', startSec: 379.54 },  // e incluso algunos reconocen que les cambió su forma de entender el propio juego.
  { file: '6_23.jpg', startSec: 383.9 },  // Una máquina entrenada jugando sola millones de veces le enseñó algo nuevo a los mejores jugadores humanos del 
  { file: '6_30.jpg', startSec: 390.7 },  // Esa quizás sea la mejor forma de resumir lo que pasó en seula que el marzo de 2016.
  { file: '6_36.jpg', startSec: 396.6 },  // Si te gusta entender los momentos reales que cambiaron la historia de la tecnología,
  { file: '6_40.jpg', startSec: 400.48 },  // suscríbete cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'tense_silence.mp3', startSec: 1.6, volume: 0.14 },
  { file: 'gasp_murmur.mp3', startSec: 6.9, volume: 0.14 },
  { file: 'record_scratch.mp3', startSec: 16.6, volume: 0.14 },
  { file: 'mystery_sting.mp3', startSec: 22.3, volume: 0.15 },
  { file: 'wood_click.mp3', startSec: 51.9, volume: 0.14 },
  { file: 'whoosh_expand.mp3', startSec: 65.1, volume: 0.14 },
  { file: 'computer_beep.mp3', startSec: 84.6, volume: 0.14 },
  { file: 'rising_tension.mp3', startSec: 121.9, volume: 0.14 },
  { file: 'dramatic_hit.mp3', startSec: 135.5, volume: 0.15 },
  { file: 'crowd_murmur.mp3', startSec: 150.1, volume: 0.13 },
  { file: 'triumphant_chime.mp3', startSec: 159.1, volume: 0.15 },
  { file: 'data_whirr.mp3', startSec: 184.0, volume: 0.14 },
  { file: 'repeating_loop.mp3', startSec: 213.6, volume: 0.13 },
  { file: 'soft_ping.mp3', startSec: 248.2, volume: 0.14 },
  { file: 'fast_rewind.mp3', startSec: 284.5, volume: 0.14 },
  { file: 'clock_tick.mp3', startSec: 302.2, volume: 0.14 },
  { file: 'warm_reveal.mp3', startSec: 325.1, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 383.9, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 396.6, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const AlphaGoLaIaQueAprendioAJugarSola: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('alphago-la-ia-que-aprendio-a-jugar-sola.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`alphago-la-ia-que-aprendio-a-jugar-sola-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`alphago-la-ia-que-aprendio-a-jugar-sola-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`alphago-la-ia-que-aprendio-a-jugar-sola/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
