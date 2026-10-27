import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-red-social-y-como-te-engancha - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Son las dos de la mañana,
  { file: '0_01.jpg', startSec: 1.92 },  // llevas una hora en TikTok,
  { file: '0_03.jpg', startSec: 3.82 },  // solo ibas a ver un video y tu pulgar sigue bajando.
  { file: '0_07.jpg', startSec: 7.48 },  // Esculpa tuya,
  { file: '0_08.jpg', startSec: 8.56 },  // solo en parte,
  { file: '0_09.jpg', startSec: 9.6 },  // ese gesto lo diseñó alguien,
  { file: '0_11.jpg', startSec: 11.36 },  // y eso no es lo peor, cada red social tiene su propio enfuelo. Aquí van diez,
  { file: '0_16.jpg', startSec: 16.06 },  // de la que más usas a la más sorprendente,
  { file: '0_18.jpg', startSec: 18.44 },  // y la última nació para curarte de todas las demás.
  { file: '0_21.jpg', startSec: 21.1 },  // ¿Adivinas qué truco acabo usando?
  { file: '0_23.jpg', startSec: 23.2 },  // Número uno,
  { file: '0_24.jpg', startSec: 24.28 },  // whatsapp, el chivato. La crearon Yankum y Bryan Acton en 2009,
  { file: '0_28.jpg', startSec: 28.98 },  // ese año Facebook había rechazado Acton. 5 años después Facebook la compró,
  { file: '0_33.jpg', startSec: 33.68 },  // por 19 .000 millones de dólares.
  { file: '0_36.jpg', startSec: 36.06 },  // Su anfuelo es el doble check azul,
  { file: '0_38.jpg', startSec: 38.08 },  // sabes que te han leído, y nadie quiere dejar a nadie en visto.
  { file: '0_41.jpg', startSec: 41.46 },  // En España es la red favorita de casi cuatro de cada diez usuarios, según IAB Spain.
  { file: '0_46.jpg', startSec: 46.46 },  // ¿Cómo desengancharte?
  { file: '0_47.jpg', startSec: 47.78 },  // Quita las confirmaciones de lectura en privacidad.
  { file: '0_50.jpg', startSec: 50.16 },  // Su estilo,
  { file: '0_51.jpg', startSec: 51.12 },  // nunca te obliga a contestar, solo chiva que ya lo has leído. Número dos, youtube,
  { file: '0_56.jpg', startSec: 56.56 },  // la tele sin final.
  { file: '0_57.jpg', startSec: 57.98 },  // Nació en 2005,
  { file: '0_59.jpg', startSec: 59.46 },  // y al principio iba a ser una web de citas en vídeo. Su anfuelo es la reproducción automática,
  { file: '1_04.jpg', startSec: 64.3 },  // acaba un vídeo y empieza a otro.
  { file: '1_06.jpg', startSec: 66.38 },  // Nunca decide seguir,
  { file: '1_07.jpg', startSec: 67.82 },  // tendrías que decidir parar.
  { file: '1_09.jpg', startSec: 69.48 },  // En 2018 lo contó Neil Mohan, su director de producto.
  { file: '1_12.jpg', startSec: 72.92 },  // Más del 70 % de lo que se ve sale de sus recomendaciones.
  { file: '1_16.jpg', startSec: 76.8 },  // ¿Cómo desengancharte?
  { file: '1_18.jpg', startSec: 78.12 },  // Apaga la reproducción automática. Su estilo,
  { file: '1_20.jpg', startSec: 80.98 },  // nunca te pide que te quedes. Simplemente, nunca se acaba.
  { file: '1_24.jpg', startSec: 84.68 },  // Número tres,
  { file: '1_25.jpg', startSec: 85.6 },  // Instagram,
  { file: '1_26.jpg', startSec: 86.64 },  // el espejo.
  { file: '1_27.jpg', startSec: 87.7 },  // La crearon Kevin System y Mike Krieger en 2010.
  { file: '1_30.jpg', startSec: 90.7 },  // Su primera foto fue un perro junto a un puesto de tacos.
  { file: '1_33.jpg', startSec: 93.46 },  // Su anfuelo es el contador de Megusta, un número debajo de cada foto.
  { file: '1_37.jpg', startSec: 97.44 },  // En 2021 se filtró una investigación interna de Facebook.
  { file: '1_40.jpg', startSec: 100.96 },  // Entre las chicas que ya se sentían mal con su cuerpo,
  { file: '1_43.jpg', startSec: 103.78 },  // una de cada tres se sentía peor por Instagram.
  { file: '1_46.jpg', startSec: 106.68 },  // ¿Cómo desengancharte?
  { file: '1_48.jpg', startSec: 108.0 },  // ¿O culta los Megusta? Su estilo, te enseña la vida de los demás, con la nota apuesta debajo.
  { file: '1_53.jpg', startSec: 113.64 },  // Número cuatro,
  { file: '1_54.jpg', startSec: 114.7 },  // TikTok,
  { file: '1_55.jpg', startSec: 115.54 },  // el pozo sin fondo.
  { file: '1_57.jpg', startSec: 117.02 },  // Es de la China Byte Dance.
  { file: '1_58.jpg', startSec: 118.56 },  // En 2018 la fusionó con música al punto L y Krieger. Su anfuelo es el scroll infinito. Lo inventó a Zarraskin e
  { file: '2_07.jpg', startSec: 127.88 },  // Y su feed para ti aprende de cada segundo.
  { file: '2_10.jpg', startSec: 130.84 },  // En Kentucky se filtraron sus documentos internos. Según su propia investigación,
  { file: '2_15.jpg', startSec: 135.52 },  // el hábito puede empezar tras 260 videos. Unos 35 minutos.
  { file: '2_20.jpg', startSec: 140.16 },  // Y en 2026 Bruselas acusó a su diseño adictivo de incumplir la ley europea.
  { file: '2_25.jpg', startSec: 145.32 },  // ¿Cómo desengancharte?
  { file: '2_26.jpg', startSec: 146.66 },  // O un límite de tiempo en tu móvil. Y que el código lo ponga a otra persona.
  { file: '2_30.jpg', startSec: 150.62 },  // Su estilo,
  { file: '2_31.jpg', startSec: 151.52 },  // nunca te dice que parez, porque nunca llegas al final.
  { file: '2_35.jpg', startSec: 155.16 },  // Número cinco,
  { file: '2_36.jpg', startSec: 156.34 },  // Facebook,
  { file: '2_37.jpg', startSec: 157.26 },  // el confeso.
  { file: '2_38.jpg', startSec: 158.44 },  // Antes de crearlo, Mark Zuckerberg montó FaceMash, una web para votar quién era más guapo en Harvard.
  { file: '2_43.jpg', startSec: 163.88 },  // Su anfuelo es el botón de Megusta. Su cocreador Justin Rosenstein acabó con control parental en su propio móvi
  { file: '2_51.jpg', startSec: 171.64 },  // Sean Parker, su primer presidente,
  { file: '2_53.jpg', startSec: 173.6 },  // lo admitió en público.
  { file: '2_54.jpg', startSec: 174.9 },  // Facebook explotaba una vulnerabilidad de la psicología humana.
  { file: '2_58.jpg', startSec: 178.28 },  // Lo sabían y lo hicieron igual.
  { file: '3_00.jpg', startSec: 180.52 },  // ¿Cómo desengancharte?
  { file: '3_01.jpg', startSec: 181.86 },  // Apaga las notificaciones de Megusta y comentarios.
  { file: '3_04.jpg', startSec: 184.54 },  // Su estilo,
  { file: '3_05.jpg', startSec: 185.58 },  // te da un poquito de aprobación.
  { file: '3_07.jpg', startSec: 187.76 },  // Y te deja con ganas de la siguiente.
  { file: '3_09.jpg', startSec: 189.94 },  // Número seis,
  { file: '3_11.jpg', startSec: 191.08 },  // X,
  { file: '3_12.jpg', startSec: 191.82 },  // antes Twitter. La Traga Peras. Su primer tweet lo escribió Jack Dorsey en 2006.
  { file: '3_17.jpg', startSec: 197.04 },  // Y se vendió como NFT por casi tres millones de dólares.
  { file: '3_20.jpg', startSec: 200.66 },  // Su anfuelo es tirar hacia abajo para actualizar.
  { file: '3_23.jpg', startSec: 203.14 },  // Lo inventó Loren Brickter.
  { file: '3_24.jpg', startSec: 204.76 },  // Y hoy reconoce que es adictivo.
  { file: '3_26.jpg', startSec: 206.72 },  // Tiras.
  { file: '3_27.jpg', startSec: 207.56 },  // Esperas.
  { file: '3_28.jpg', startSec: 208.48 },  // Y a veces sale algo nuevo, como la palanca de una Traga Peras.
  { file: '3_31.jpg', startSec: 211.96 },  // En diciembre de 2025 Bruselas multó a X con 120 millones de euros.
  { file: '3_36.jpg', startSec: 216.94 },  // Su check azul engañaba.
  { file: '3_38.jpg', startSec: 218.6 },  // ¿Cómo desengancharte? Pusa la pestaña siguiendo. Su estilo.
  { file: '3_42.jpg', startSec: 222.62 },  // Cada vez que tiras, puede tocarte el premio. Y casi nunca te toca.
  { file: '3_46.jpg', startSec: 226.5 },  // Y ahora empiezan las sorprendentes.
  { file: '3_48.jpg', startSec: 228.88 },  // Número siete.
  { file: '3_50.jpg', startSec: 230.06 },  // Twitch.
  { file: '3_51.jpg', startSec: 230.72 },  // El que te paga por mirar. Empezó en 2007.
  { file: '3_53.jpg', startSec: 233.94 },  // Justin Khan se puso una cámara en la cabeza.
  { file: '3_56.jpg', startSec: 236.36 },  // Y emitió su vida en directo. Su anfuelos son los puntos de canal. Cuanto más rato miras, más puntos ganas. Y e
  { file: '4_12.jpg', startSec: 252.2 },  // Decide antes a qué hora apagas. Su estilo.
  { file: '4_15.jpg', startSec: 255.06 },  // Te paga en puntos.
  { file: '4_16.jpg', startSec: 256.32 },  // Y le paga senoras.
  { file: '4_17.jpg', startSec: 257.84 },  // Número ocho.
  { file: '4_18.jpg', startSec: 258.94 },  // Snapchat.
  { file: '4_19.jpg', startSec: 259.84 },  // La racha.
  { file: '4_20.jpg', startSec: 260.78 },  // Naciones tan fortes en 2011 con otro nombre.
  { file: '4_23.jpg', startSec: 263.48 },  // Pica Bú. Su anfuelo es la racha. Un fuego con un número.
  { file: '4_27.jpg', startSec: 267.44 },  // Sube cada día que tú y un amigo os mandáis una foto.
  { file: '4_30.jpg', startSec: 270.26 },  // Si fallas un día, vuelve a cero. En una demanda de nuevo México salió una presentación interna. Decía que las 
  { file: '4_40.jpg', startSec: 280.88 },  // Pacta con tu amigo romper la racha.
  { file: '4_43.jpg', startSec: 283.12 },  // Su estilo.
  { file: '4_44.jpg', startSec: 283.96 },  // Tu amistad tiene un contador. Y caduca a cada 24 horas.
  { file: '4_47.jpg', startSec: 287.8 },  // Número 9.
  { file: '4_48.jpg', startSec: 288.94 },  // Reddit.
  { file: '4_49.jpg', startSec: 289.64 },  // El pueblo de mentira. Pero aquí viene lo raro. Al principio estaba vacía. Así que sus fundadores crearon cient
  { file: '5_04.jpg', startSec: 304.36 },  // Según Reuters, Google le paga unos 60 millones de dólares al año para entrenar su inteligencia artificial. ¿Có
  { file: '5_11.jpg', startSec: 311.74 },  // Quita las notificaciones de votos. Su estilo. Empezó con gente inventada.
  { file: '5_16.jpg', startSec: 316.48 },  // Y hoy vende lo que escribe la gente de verdad.
  { file: '5_19.jpg', startSec: 319.08 },  // Y llegamos a la última.
  { file: '5_20.jpg', startSec: 320.66 },  // La más sorprendente.
  { file: '5_22.jpg', startSec: 322.32 },  // Número 10.
  { file: '5_23.jpg', startSec: 323.48 },  // Virreal.
  { file: '5_24.jpg', startSec: 324.42 },  // La alarma.
  { file: '5_25.jpg', startSec: 325.46 },  // La creó en Francia a Alexis Barriatt en 2020.
  { file: '5_28.jpg', startSec: 328.44 },  // Nació contra Instagram.
  { file: '5_30.jpg', startSec: 330.04 },  // Las fotos se subían tal cual. Y solo para tus amigos.
  { file: '5_33.jpg', startSec: 333.32 },  // Volvamos a la pregunta.
  { file: '5_34.jpg', startSec: 334.74 },  // ¿Qué truco acabó usando?
  { file: '5_36.jpg', startSec: 336.3 },  // Una notificación.
  { file: '5_37.jpg', startSec: 337.62 },  // Una vez al día. A una hora que nunca sabes. Tienes dos minutos para hacer la foto. Y si llegas tarde, todos lo
  { file: '5_44.jpg', startSec: 344.8 },  // Según platformer, en cinco meses pasó de 15 millones de usuarios al mes a seis. ¿Cómo desengancharte?
  { file: '5_50.jpg', startSec: 350.9 },  // Ninguna alarma de una app es una emergencia.
  { file: '5_53.jpg', startSec: 353.54 },  // Su estilo.
  { file: '5_54.jpg', startSec: 354.48 },  // Te prometías soltar el móvil. Y te lo hacías sacar corriendo cada día.
  { file: '5_58.jpg', startSec: 358.98 },  // ¿Cuál de las diez te tiene despierto a las dos de la mañana?
  { file: '6_02.jpg', startSec: 362.06 },  // Te leo en los comentarios.
  { file: '6_03.jpg', startSec: 363.46 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 21.1, volume: 0.13 },
  { file: 'count_1.mp3', startSec: 23.2, volume: 0.13 },
  { file: 'count_2.mp3', startSec: 84.68, volume: 0.13 },
  { file: 'count_3.mp3', startSec: 113.64, volume: 0.13 },
  { file: 'count_4.mp3', startSec: 155.16, volume: 0.13 },
  { file: 'count_5.mp3', startSec: 189.94, volume: 0.13 },
  { file: 'count_6.mp3', startSec: 228.88, volume: 0.13 },
  { file: 'chapter_sting_1.mp3', startSec: 257.84, volume: 0.13 },
  { file: 'chapter_sting_2.mp3', startSec: 287.8, volume: 0.13 },
  { file: 'tense_transition.mp3', startSec: 319.08, volume: 0.13 },
  { file: 'chapter_sting_3.mp3', startSec: 322.32, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 333.32, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 363.46, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.0;

export const CadaRedSocialYComoTeEngancha: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('cada-red-social-y-como-te-engancha.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`cada-red-social-y-como-te-engancha-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`cada-red-social-y-como-te-engancha-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`cada-red-social-y-como-te-engancha/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
