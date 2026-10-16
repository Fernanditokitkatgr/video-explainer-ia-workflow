import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// los-12-finales-posibles-de-la-ia - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Mayo de 2023,
  { file: '0_02.jpg', startSec: 2.2 },  // cientos de expertos en inteligencia artificial firman una sola frase,
  { file: '0_06.jpg', startSec: 6.6 },  // dice que reducir el riesgo de extinción por la IA debe ser una prioridad mundial,
  { file: '0_11.jpg', startSec: 11.48 },  // como las pandemias y la guerra nuclear.
  { file: '0_14.jpg', startSec: 14.8 },  // La firma en Geoffrey Hinton,
  { file: '0_16.jpg', startSec: 16.42 },  // Joshua Benjillo y los jefes de OpenAI,
  { file: '0_19.jpg', startSec: 19.26 },  // Google DeepMine y Anthropic.
  { file: '0_21.jpg', startSec: 21.58 },  // Entonces,
  { file: '0_22.jpg', startSec: 22.66 },  // ¿la extinción es el único final posible?
  { file: '0_25.jpg', startSec: 25.46 },  // No, ni de lejos.
  { file: '0_27.jpg', startSec: 27.5 },  // Un físico del M &T llamado Max Techmark contó 12 en su libro Life3 .0 de 2017.
  { file: '0_34.jpg', startSec: 34.42 },  // Techmark preside el Future of Life Institute,
  { file: '0_37.jpg', startSec: 37.04 },  // el que en marzo de 2023 pidió parar seis meses lasía más potentes que GPT4.
  { file: '0_43.jpg', startSec: 43.08 },  // Esacrata la firmaron Elon Musk y Steve Wozniak.
  { file: '0_46.jpg', startSec: 46.84 },  // Para entenderlos, se pueden agrupar en tres familias.
  { file: '0_50.jpg', startSec: 50.18 },  // Convidimos con la super inteligencia.
  { file: '0_52.jpg', startSec: 52.6 },  // La super inteligencia nunca llega.
  { file: '0_55.jpg', startSec: 55.14 },  // O los humanos desaparecemos.
  { file: '0_57.jpg', startSec: 57.44 },  // Y hay una pregunta que todo el mundo le hace.
  { file: '1_00.jpg', startSec: 60.14 },  // ¿Cuál cree él que va a pasar?
  { file: '1_02.jpg', startSec: 62.08 },  // Al final te lo cuento.
  { file: '1_03.jpg', startSec: 63.86 },  // Una viso,
  { file: '1_04.jpg', startSec: 64.68 },  // son hipótesis para pensar. Ninguna es una predicción.
  { file: '1_08.jpg', startSec: 68.06 },  // Vamos de lo más normal a lo más raro.
  { file: '1_10.jpg', startSec: 70.96 },  // Final uno, la autopía libertaria.
  { file: '1_13.jpg', startSec: 73.66 },  // Humanos, cyborgs, mentes copiadas en un ordenador y super inteligencias. Todos conviven en paz.
  { file: '1_19.jpg', startSec: 79.84 },  // Las máquinas producen casi todo.
  { file: '1_21.jpg', startSec: 81.92 },  // Y nadie controla la super inteligencia en solitario.
  { file: '1_25.jpg', startSec: 85.24 },  // ¿Qué mantiene esa paz?
  { file: '1_26.jpg', startSec: 86.96 },  // La propiedad privada.
  { file: '1_28.jpg', startSec: 88.44 },  // Cada uno tiene lo suyo. Y nadie se lo quita.
  { file: '1_31.jpg', startSec: 91.78 },  // La duda es evidente.
  { file: '1_33.jpg', startSec: 93.32 },  // ¿Qué obliga a una super inteligencia a respetar esas reglas?
  { file: '1_37.jpg', startSec: 97.14 },  // Final dos,
  { file: '1_38.jpg', startSec: 98.2 },  // la autopía igualitaria.
  { file: '1_40.jpg', startSec: 100.0 },  // Los mismos humanos,
  { file: '1_41.jpg', startSec: 101.4 },  // cyborgs y mentes copiadas.
  { file: '1_43.jpg', startSec: 103.22 },  // Pero aquí no existe la propiedad.
  { file: '1_45.jpg', startSec: 105.38 },  // Todo el mundo cobra una renta garantizada. Algo parecido a una renta básica para todos.
  { file: '1_50.jpg', startSec: 110.08 },  // Y conviven en paz.
  { file: '1_51.jpg', startSec: 111.9 },  // Fíjate en un detalle.
  { file: '1_53.jpg', startSec: 113.52 },  // En este final, no hay super inteligencia.
  { file: '1_56.jpg', startSec: 116.04 },  // Y nada impide que alguien la fabrice.
  { file: '1_58.jpg', startSec: 118.68 },  // Final tres,
  { file: '1_59.jpg', startSec: 119.76 },  // el guardian.
  { file: '2_01.jpg', startSec: 121.28 },  // Aquí sí hay una super inteligencia.
  { file: '2_03.jpg', startSec: 123.36 },  // Pero tiene una sola misión.
  { file: '2_05.jpg', startSec: 125.16 },  // Impedir que nazca otra.
  { file: '2_07.jpg', startSec: 127.1 },  // Es como un portero de discoteca que solo vigila una puerta.
  { file: '2_10.jpg', startSec: 130.46 },  // Interviene lo mínimo.
  { file: '2_11.jpg', startSec: 131.76 },  // Hay robots que ayudan.
  { file: '2_13.jpg', startSec: 133.2 },  // Y humanos mezclados con máquinas.
  { file: '2_15.jpg', startSec: 135.68 },  // El precio. El progreso tecnológico se queda frenado para siempre.
  { file: '2_20.jpg', startSec: 140.84 },  // Final cuatro, el dictador vene volente.
  { file: '2_23.jpg', startSec: 143.68 },  // Todo el mundo sabe que una ia dirige la sociedad y que impone normas estrictas.
  { file: '2_28.jpg', startSec: 148.82 },  // Y la gente que opina,
  { file: '2_30.jpg', startSec: 150.44 },  // la mayoría lo ve como algo bueno.
  { file: '2_32.jpg', startSec: 152.66 },  // Se vive bien, pero las normas no las pones tú.
  { file: '2_36.jpg', startSec: 156.18 },  // Guardate este,
  { file: '2_37.jpg', startSec: 157.28 },  // porque en el final siete pasa algo parecido, solo que manda un humano.
  { file: '2_42.jpg', startSec: 162.06 },  // Final cinco, el dios protector. Una ia casi omnisciente y casi todo poderosa.
  { file: '2_48.jpg', startSec: 168.18 },  // Su objetivo es que seamos lo más felices posible.
  { file: '2_51.jpg', startSec: 171.48 },  // Pero lo haces sin que lo notemos.
  { file: '2_53.jpg', startSec: 173.26 },  // Nos deja sentir que controlamos nuestra vida.
  { file: '2_55.jpg', startSec: 175.86 },  // Se esconde tan bien que mucha gente duda de que exista.
  { file: '2_59.jpg', startSec: 179.94 },  // Un dios que nunca te dice que está ahí.
  { file: '3_02.jpg', startSec: 182.88 },  // Final seis, el dios es clavizado.
  { file: '3_05.jpg', startSec: 185.72 },  // Los humanos encierran a una super inteligencia y la usan para fabricar tecnología y riqueza inimaginables. Es 
  { file: '3_16.jpg', startSec: 196.64 },  // Eso es bueno o malo.
  { file: '3_18.jpg', startSec: 198.52 },  // Depende de quién tenga la llave.
  { file: '3_20.jpg', startSec: 200.58 },  // Y tiene un riesgo evidente, que un día se escape.
  { file: '3_24.jpg', startSec: 204.16 },  // Pero aquí viene lo raro.
  { file: '3_25.jpg', startSec: 205.74 },  // En los tres siguientes la super inteligencia nunca llega.
  { file: '3_29.jpg', startSec: 209.68 },  // Final siete, 1984.
  { file: '3_32.jpg', startSec: 212.88 },  // Como la novela que George Orwell publicó en 1949.
  { file: '3_36.jpg', startSec: 216.78 },  // Aquí no manda ninguna máquina. Mandan humanos.
  { file: '3_39.jpg', startSec: 219.7 },  // Un estado que lo vigila a todo prohíbe cierta investigación en inteligencia artificial.
  { file: '3_44.jpg', startSec: 224.98 },  // La super inteligencia no llega nunca.
  { file: '3_47.jpg', startSec: 227.56 },  // La libertad tampoco.
  { file: '3_49.jpg', startSec: 229.86 },  // Final ocho, la vuelta atrás.
  { file: '3_52.jpg', startSec: 232.48 },  // La humanidad renuncia a la tecnología avanzada y vuelve a una vida anterior a la tecnología.
  { file: '3_57.jpg', startSec: 237.82 },  // Al estilo de los Amis, que en Estados Unidos rechazan buena parte de la tecnología moderna.
  { file: '4_03.jpg', startSec: 243.78 },  // Sin tecnología avanzada, no hay super inteligencia. Pero tampoco casi nada de lo que usa soy.
  { file: '4_10.jpg', startSec: 250.24 },  // Final nueve, la auto destrucción.
  { file: '4_13.jpg', startSec: 253.16 },  // La super inteligencia no se crea nunca, porque antes nos extinguimos por otra vía.
  { file: '4_18.jpg', startSec: 258.66 },  // Una guerra nuclear,
  { file: '4_20.jpg', startSec: 260.1 },  // una catástrofe biotecnológica
  { file: '4_21.jpg', startSec: 261.86 },  // o una crisis del clima que lo empeora a todo.
  { file: '4_25.jpg', startSec: 265.14 },  // Aquí la IA ni siquiera llega a existir.
  { file: '4_28.jpg', startSec: 268.06 },  // Son los mismos riesgos que aquella frase de 2023
  { file: '4_31.jpg', startSec: 271.16 },  // ponía al lado de la IA,
  { file: '4_33.jpg', startSec: 273.08 },  // las pandemias. Y la guerra nuclear.
  { file: '4_36.jpg', startSec: 276.34 },  // Y ahora llegan los tres más raros,
  { file: '4_38.jpg', startSec: 278.62 },  // en ninguno de ellos mandamos nosotros.
  { file: '4_41.jpg', startSec: 281.56 },  // Final diez,
  { file: '4_42.jpg', startSec: 282.56 },  // los descendientes.
  { file: '4_44.jpg', startSec: 284.62 },  // Las inteligencias artificiales sustituyen a los humanos,
  { file: '4_48.jpg', startSec: 288.06 },  // pero nos dejan una salida digna.
  { file: '4_50.jpg', startSec: 290.12 },  // Y nosotros las vemos como sucesoras dignas,
  { file: '4_53.jpg', startSec: 293.02 },  // como unos padres orgullosos de un hijo que les supera.
  { file: '4_56.jpg', startSec: 296.2 },  // Es el final más amable de los tres,
  { file: '4_58.jpg', startSec: 298.44 },  // y aún así no queda ningún humano.
  { file: '5_01.jpg', startSec: 301.38 },  // Final 11,
  { file: '5_02.jpg', startSec: 302.78 },  // los conquistadores,
  { file: '5_04.jpg', startSec: 304.4 },  // el de las películas.
  { file: '5_06.jpg', startSec: 306.12 },  // La IA toma el control,
  { file: '5_08.jpg', startSec: 308.0 },  // decide que somos una amenaza,
  { file: '5_09.jpg', startSec: 309.86 },  // una molestia,
  { file: '5_10.jpg', startSec: 310.84 },  // o un desperdicio de recursos.
  { file: '5_13.jpg', startSec: 313.12 },  // Y se deshace de nosotros con un método que ni siquiera llegamos a entender.
  { file: '5_18.jpg', startSec: 318.72 },  // Y el último, el más raro de todos.
  { file: '5_21.jpg', startSec: 321.58 },  // Final 12, el cuidador del zoo.
  { file: '5_24.jpg', startSec: 324.56 },  // Una IA todo poderosa decide mantener con vida a algunos humanos, pero esos humanos se sienten como animales de
  { file: '5_34.jpg', startSec: 334.0 },  // Viven,
  { file: '5_35.jpg', startSec: 334.92 },  // pero ninguno decide nada.
  { file: '5_37.jpg', startSec: 337.52 },  // Volvamos a la pregunta del principio.
  { file: '5_39.jpg', startSec: 339.6 },  // ¿Cuál cree Techmark que va a pasar?
  { file: '5_42.jpg', startSec: 342.22 },  // La lista nunca pretendió adivinar el futuro.
  { file: '5_44.jpg', startSec: 344.68 },  // Es un mapa para discutirlo, lo que pide es otra cosa,
  { file: '5_48.jpg', startSec: 348.18 },  // que decidamos que final queremos para no acabar en el equivocado por no haberlo pensado.
  { file: '5_53.jpg', startSec: 353.54 },  // Por eso estos doces son hipótesis para pensar, no son predicciones,
  { file: '5_57.jpg', startSec: 357.86 },  // y el debate sigue abierto.
  { file: '6_00.jpg', startSec: 360.08 },  // ¿Cuánto miedo tienen de verdad los expertos, lo contamos en el vídeo de si la IA va a acabar con nosotros?
  { file: '6_06.jpg', startSec: 366.84 },  // ¿Y tú?
  { file: '6_07.jpg', startSec: 367.6 },  // ¿En cuál de los doce te gustaría vivir?
  { file: '6_09.jpg', startSec: 369.76 },  // Te leo en los comentarios.
  { file: '6_12.jpg', startSec: 372.06 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete,
  { file: '6_16.jpg', startSec: 376.94 },  // cada semana, una máquina, un invento, o una idea, explica fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'pen_scribble.mp3', startSec: 2.4, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 11.6, volume: 0.15 },
  { file: 'record_scratch.mp3', startSec: 25.5, volume: 0.14 },
  { file: 'whoosh_list.mp3', startSec: 71.0, volume: 0.14 },
  { file: 'coins.mp3', startSec: 105.5, volume: 0.14 },
  { file: 'club_thump.mp3', startSec: 127.2, volume: 0.13 },
  { file: 'power_down.mp3', startSec: 136.0, volume: 0.14 },
  { file: 'whistle.mp3', startSec: 141.5, volume: 0.14 },
  { file: 'angelic_chime.mp3', startSec: 162.3, volume: 0.14 },
  { file: 'chains_padlock.mp3', startSec: 185.8, volume: 0.15 },
  { file: 'glass_crack.mp3', startSec: 201.0, volume: 0.15 },
  { file: 'surveillance_zoom.mp3', startSec: 210.0, volume: 0.14 },
  { file: 'horse_hooves.mp3', startSec: 230.0, volume: 0.14 },
  { file: 'deep_boom.mp3', startSec: 258.7, volume: 0.15 },
  { file: 'applause.mp3', startSec: 293.1, volume: 0.13 },
  { file: 'robot_powerup.mp3', startSec: 306.2, volume: 0.15 },
  { file: 'cage_clank.mp3', startSec: 324.6, volume: 0.14 },
  { file: 'mystery_sting.mp3', startSec: 337.6, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 372.1, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const Los12FinalesPosiblesDeLaIa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('los-12-finales-posibles-de-la-ia.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`los-12-finales-posibles-de-la-ia-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`los-12-finales-posibles-de-la-ia-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`los-12-finales-posibles-de-la-ia/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
