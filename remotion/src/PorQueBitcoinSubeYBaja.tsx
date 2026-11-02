import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// por-que-bitcoin-sube-y-baja - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Viernes 10 de octubre de 2025.
  { file: '0_03.jpg', startSec: 3.04 },  // Bitcoin vale más de $121 ,000.
  { file: '0_05.jpg', startSec: 5.7 },  // Esa tarde baja de $106 ,000. ¿Quién ha decidido eso? Un banco, un gobierno,
  { file: '0_11.jpg', startSec: 11.32 },  // ninguno de los dos.
  { file: '0_12.jpg', startSec: 12.58 },  // Es lo más loco, ni de lejos.
  { file: '0_14.jpg', startSec: 14.6 },  // Una vez cayó casi un 90 % en segundos.
  { file: '0_17.jpg', startSec: 17.46 },  // Aquí van 10 fuerzas que mueven su precio.
  { file: '0_20.jpg', startSec: 20.14 },  // De la más conocida a la más sorprendente. Esto es divulgación.
  { file: '0_23.jpg', startSec: 23.88 },  // Nunca es un consejo de inversión. Y al final te digo quién decide el precio.
  { file: '0_28.jpg', startSec: 28.16 },  // Número uno. Los 21 millones.
  { file: '0_30.jpg', startSec: 30.84 },  // La escasez. Nunca habrá más de 21 millones de bitcoins.
  { file: '0_34.jpg', startSec: 34.38 },  // Y cada cuatro años salen la mitad de monedas nuevas.
  { file: '0_37.jpg', startSec: 37.08 },  // Es el halving.
  { file: '0_38.jpg', startSec: 38.42 },  // Mayo de 2020.
  { file: '0_39.jpg', startSec: 39.8 },  // Halving.
  { file: '0_40.jpg', startSec: 40.5 },  // Bitcoin vale unos $8 ,600.
  { file: '0_42.jpg', startSec: 42.6 },  // Año y medio después toca casi $69 ,000. Solo por eso nadie lo puede demostrar. ¿Qué significa para ti? Es caso
  { file: '0_52.jpg', startSec: 52.6 },  // Su estilo.
  { file: '0_53.jpg', startSec: 53.54 },  // Fabrica cada vez menos. Y el resto lo haces tú. Número dos.
  { file: '0_57.jpg', startSec: 57.8 },  // La euforia. El rebaño. Cuando todos hablan de Bitcoin entra gente nueva. Y sube porque sube. En erro de 2017.
  { file: '1_05.jpg', startSec: 65.58 },  // Vale unos mil dólares.
  { file: '1_06.jpg', startSec: 66.98 },  // En diciembre roza los 20 mil. Un año después vale unos 3 ,200.
  { file: '1_11.jpg', startSec: 71.46 },  // Un 84 por ciento menos.
  { file: '1_13.jpg', startSec: 73.52 },  // ¿Qué significa para ti? Si hasta tu cuñado lo recomienda, la euforia ya va muy avanzada.
  { file: '1_18.jpg', startSec: 78.74 },  // Su estilo.
  { file: '1_19.jpg', startSec: 79.64 },  // Sube en ascensor.
  { file: '1_20.jpg', startSec: 80.86 },  // Y baja por el hueco del ascensor.
  { file: '1_23.jpg', startSec: 83.14 },  // Número tres.
  { file: '1_24.jpg', startSec: 84.04 },  // Elon Musk. El Twitter.
  { file: '1_25.jpg', startSec: 85.84 },  // 8 de febrero de 2021. Tesla compra 1 .500 millones de dólares en Bitcoin.
  { file: '1_31.jpg', startSec: 91.18 },  // Ese día el precio pasa por primera vez de 44 mil.
  { file: '1_34.jpg', startSec: 94.62 },  // 12 de mayo.
  { file: '1_35.jpg', startSec: 95.64 },  // Musk tuitea que te es la deja de aceptarlos. Por lo que contamina minarlos. En horas cae más de un 10 por cien
  { file: '1_47.jpg', startSec: 107.26 },  // Su estilo.
  { file: '1_48.jpg', startSec: 108.14 },  // Lo sube con una compra.
  { file: '1_49.jpg', startSec: 109.68 },  // Y lo baja con un tweet.
  { file: '1_51.jpg', startSec: 111.22 },  // Número cuatro.
  { file: '1_52.jpg', startSec: 112.24 },  // Los ETF.
  { file: '1_53.jpg', startSec: 113.38 },  // La puerta de Wall Street. Un ETF deja comprar Bitcoin en bolsa como una acción.
  { file: '1_58.jpg', startSec: 118.48 },  // 10 de enero de 2024.
  { file: '2_00.jpg', startSec: 120.5 },  // Estados Unidos aprueba 11 de golpe.
  { file: '2_02.jpg', startSec: 122.88 },  // Pero aquí viene lo raro. Dos semanas después baja de 39 mil. Muchos vendieron con la noticia. Luego entra el d
  { file: '2_13.jpg', startSec: 133.5 },  // ¿Qué significa para ti?
  { file: '2_15.jpg', startSec: 135.02 },  // Una buena noticia que todos esperan suele estar ya en el precio.
  { file: '2_18.jpg', startSec: 138.54 },  // Su estilo.
  { file: '2_19.jpg', startSec: 139.64 },  // Abre la puerta.
  { file: '2_20.jpg', startSec: 140.76 },  // Y entran los grandes.
  { file: '2_22.jpg', startSec: 142.38 },  // Número cinco.
  { file: '2_23.jpg', startSec: 143.36 },  // La reserva federal. El grifo. Si suben los tipos de interés, el dinero seguro paga más.
  { file: '2_28.jpg', startSec: 148.88 },  // Y el que busca riesgo se va. En 2022, la reserva federal lo sube siete veces.
  { file: '2_34.jpg', startSec: 154.22 },  // Bitcoin empieza al año en unos 47 mil dólares.
  { file: '2_37.jpg', startSec: 157.22 },  // Y lo acaba en unos 16 mil 500.
  { file: '2_39.jpg', startSec: 159.64 },  // Nunca hay una sola causa.
  { file: '2_41.jpg', startSec: 161.58 },  // ¿Qué significa para ti?
  { file: '2_43.jpg', startSec: 163.08 },  // Lo que se deciden Washington también mueve Bitcoin.
  { file: '2_46.jpg', startSec: 166.12 },  // Su estilo.
  { file: '2_47.jpg', startSec: 167.12 },  // Jamás toca un Bitcoin.
  { file: '2_48.jpg', startSec: 168.88 },  // Pero le cierre al grifo. Número seis.
  { file: '2_51.jpg', startSec: 171.38 },  // Las casas de cambio que quiebran.
  { file: '2_53.jpg', startSec: 173.28 },  // El agujero. Casi todos compran en una casa de cambio.
  { file: '2_56.jpg', startSec: 176.62 },  // Si una cae, cunde el pánico.
  { file: '2_58.jpg', startSec: 178.5 },  // Pasó con Mount Gox en 2014.
  { file: '3_00.jpg', startSec: 180.76 },  // Y con FTX en noviembre de 2022.
  { file: '3_03.jpg', startSec: 183.5 },  // En dos semanas, Bitcoin pasa de unos 21 mil a unos 15 mil 500.
  { file: '3_07.jpg', startSec: 187.96 },  // ¿Qué significa para ti? Si tus bitcoins están en una casa de cambio, tiene su promesa.
  { file: '3_12.jpg', startSec: 192.72 },  // Su estilo.
  { file: '3_13.jpg', startSec: 193.66 },  // Te guarda las monedas. Hasta el día en que ya no están.
  { file: '3_16.jpg', startSec: 196.84 },  // Y ahora empiezan las raras.
  { file: '3_18.jpg', startSec: 198.86 },  // Número siete.
  { file: '3_19.jpg', startSec: 199.88 },  // China.
  { file: '3_20.jpg', startSec: 200.5 },  // El apagón. Minar Bitcoin gasta muchísima luz. En abril de 2021, casi la mitad se minaba en China. En mayo su g
  { file: '3_29.jpg', startSec: 209.24 },  // En junio, Sichuan corta la luz a las minas. El 22 de junio, Bitcoin baja de 30 mil dólares.
  { file: '3_35.jpg', startSec: 215.0 },  // Por primera vez, desde enero. ¿Qué significa para ti? Un gobierno puede prohibirlo en su país.
  { file: '3_40.jpg', startSec: 220.32 },  // Ninguno puede apagarlo en todo el mundo.
  { file: '3_42.jpg', startSec: 222.66 },  // Su estilo.
  { file: '3_43.jpg', startSec: 223.64 },  // Le cortan la luz en un país.
  { file: '3_45.jpg', startSec: 225.3 },  // Y se enchufa en otro.
  { file: '3_46.jpg', startSec: 226.68 },  // Número ocho. Las ballenas.
  { file: '3_48.jpg', startSec: 228.76 },  // Los gigantes.
  { file: '3_50.jpg', startSec: 230.08 },  // Una ballena tiene miles de bitcoins. Si vende de golpe,
  { file: '3_53.jpg', startSec: 233.32 },  // puede hundir el precio.
  { file: '3_54.jpg', startSec: 234.6 },  // Julio de 2025.
  { file: '3_56.jpg', startSec: 236.22 },  // Galaxi vende más de 80 mil bitcoins dormidos desde 2011.
  { file: '3_59.jpg', startSec: 239.96 },  // Más de 9 mil millones de dólares.
  { file: '4_02.jpg', startSec: 242.38 },  // Bitcoin baja unos 115 mil. Pero en seguidas a recuperar, había compradores al otro lado. ¿Qué significa para t
  { file: '4_13.jpg', startSec: 253.26 },  // Su estilo.
  { file: '4_14.jpg', startSec: 254.16 },  // Hace olas, pero el mar ya es enorme.
  { file: '4_16.jpg', startSec: 256.88 },  // Número nueve. El aparancamiento.
  { file: '4_19.jpg', startSec: 259.12 },  // El dinero prestado. Muchos apuestan con dinero prestado. Con 10 euros mueven 100.
  { file: '4_24.jpg', startSec: 264.28 },  // Si el precio va en contra, te cierran la apuesta.
  { file: '4_26.jpg', startSec: 266.9 },  // Y venden.
  { file: '4_27.jpg', startSec: 267.68 },  // Recuerdas el viernes del principio? Trampa anunciar anceles del 100 % en China.
  { file: '4_32.jpg', startSec: 272.34 },  // Bitcoin cae. Y cada venta forzada provoca otra. Más de 19 mil millones de dólares liquidados. Un record.
  { file: '4_39.jpg', startSec: 279.5 },  // ¿Qué significa para ti? Con dinero prestado, lo pierdes aunque luego el precio se recupere. Su estilo. Te pres
  { file: '4_50.jpg', startSec: 290.32 },  // Número diez.
  { file: '4_51.jpg', startSec: 291.26 },  // El fallo de un robot.
  { file: '4_52.jpg', startSec: 292.72 },  // El dedo torpe. 21 de octubre de 2021.
  { file: '4_56.jpg', startSec: 296.18 },  // Bitcoin ronda los 65 mil. En Binance .us de repente se vende a 8 .200.
  { file: '5_02.jpg', startSec: 302.02 },  // Un 87 por ciento menos.
  { file: '5_04.jpg', startSec: 304.34 },  // Duras segundos.
  { file: '5_05.jpg', startSec: 305.52 },  // Binance culpa al programa de un cliente. En el resto del mundo apenas se mueve. ¿Qué significa para ti?
  { file: '5_11.jpg', startSec: 311.7 },  // Vender sin precio límite es aceptar cualquier precio.
  { file: '5_14.jpg', startSec: 314.8 },  // Aunque sea absurdo. Su estilo. Un error de un segundo.
  { file: '5_18.jpg', startSec: 318.86 },  // Y un precio que nadie se cree.
  { file: '5_20.jpg', startSec: 320.98 },  // Volvamos a la pregunta.
  { file: '5_22.jpg', startSec: 322.32 },  // ¿Quién decide el precio?
  { file: '5_23.jpg', startSec: 323.62 },  // Nadie. Y todos.
  { file: '5_25.jpg', startSec: 325.32 },  // El precio es solo la última compra.
  { file: '5_27.jpg', startSec: 327.52 },  // Lo que alguien pagó a alguien que vendía. En ese segundo.
  { file: '5_30.jpg', startSec: 330.84 },  // Por eso en Binance valió 8 .200.
  { file: '5_33.jpg', startSec: 333.32 },  // Alguien los pagó. Y así empezó todo.
  { file: '5_35.jpg', startSec: 335.96 },  // En 2010 alguien pagó 10 .000 bitcoins por dos pizzas.
  { file: '5_39.jpg', startSec: 339.46 },  // Unos 40 dólares lo decidieron dos personas.
  { file: '5_42.jpg', startSec: 342.62 },  // ¿Y tú? ¿Cuál de las 10 te has sorprendido más?
  { file: '5_45.jpg', startSec: 345.14 },  // Te leo en los comentarios. Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscr
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.13 },
  { file: 'count_1.mp3', startSec: 28.16, volume: 0.13 },
  { file: 'count_2.mp3', startSec: 83.14, volume: 0.13 },
  { file: 'count_3.mp3', startSec: 111.22, volume: 0.13 },
  { file: 'count_4.mp3', startSec: 142.38, volume: 0.13 },
  { file: 'tense_transition.mp3', startSec: 196.84, volume: 0.13 },
  { file: 'count_5.mp3', startSec: 198.86, volume: 0.13 },
  { file: 'count_6.mp3', startSec: 226.68, volume: 0.13 },
  { file: 'chapter_sting_1.mp3', startSec: 256.88, volume: 0.13 },
  { file: 'chapter_sting_2.mp3', startSec: 290.32, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 320.98, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 345.14, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.0;

export const PorQueBitcoinSubeYBaja: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('por-que-bitcoin-sube-y-baja.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`por-que-bitcoin-sube-y-baja-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`por-que-bitcoin-sube-y-baja-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`por-que-bitcoin-sube-y-baja/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
