import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// como-funciona-el-gps - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Abre el mapa de tu móvil. En un segundo aparece un punto azul justo donde estás, con un margen de pocos metros
  { file: '0_08.jpg', startSec: 8.72 },  // Y tu móvil no le ha enviado ni un solo mensaje al espacio. No pregunta a nadie dónde está. No manda tu posició
  { file: '0_16.jpg', startSec: 16.88 },  // Tu móvil no pregunta.
  { file: '0_18.jpg', startSec: 18.92 },  // Escucha.
  { file: '0_20.jpg', startSec: 20.02 },  // Y lo más loco es otra cosa. Sin la teoría de la relatividad de Einstein, ese punto azul se equivocaría unos 10
  { file: '0_27.jpg', startSec: 27.78 },  // Hoy vas a ver cómo funciona el GPS de verdad y por qué necesita Einstein.
  { file: '0_33.jpg', startSec: 33.44 },  // Empecemos por lo que hay ahí arriba.
  { file: '0_35.jpg', startSec: 35.82 },  // El GPS es un sistema de Estados Unidos, nació como un proyecto militar. Son unos 30 satélites dando vueltas a 
  { file: '0_49.jpg', startSec: 49.4 },  // Grita la hora. Emite una señal de radio que dice algo así.
  { file: '0_53.jpg', startSec: 53.78 },  // Soy tal satélite. Estoy en este punto exacto, y ahora mismo es esta hora.
  { file: '0_58.jpg', startSec: 58.82 },  // Tu móvil no contesta. Solo recibe esos mensajes. Por eso da igual que haya 1000 millones de personas usando el
  { file: '1_06.jpg', startSec: 66.24 },  // Los satélites ni se enteran.
  { file: '1_08.jpg', startSec: 68.44 },  // Tu móvil no pregunta. Escucha.
  { file: '1_11.jpg', startSec: 71.02 },  // Y cómo saca tu posición de un simple mensaje con la hora?
  { file: '1_14.jpg', startSec: 74.52 },  // Piense en una tormenta. Vés el rayo, y unos segundos después oyes el trueno.
  { file: '1_19.jpg', startSec: 79.7 },  // Si cuentas los segundos que pasan entre uno y otro, puedes saber a qué distancia cayó, porque el sonido viaja 
  { file: '1_27.jpg', startSec: 87.22 },  // El GPS hace exactamente lo mismo, pero con ondas de radio.
  { file: '1_31.jpg', startSec: 91.12 },  // Las ondas de radio viajan a la velocidad de la luz, unos 300.000 kilómetros por segundo.
  { file: '1_36.jpg', startSec: 96.16 },  // El satélite dice a qué hora salió su mensaje. Tu móvil mira a qué hora le llegó.
  { file: '1_41.jpg', startSec: 101.82 },  // La diferencia es el tiempo que tardó en viajar. Una siete centésimas de segundo.
  { file: '1_47.jpg', startSec: 107.08 },  // Multiplica ese tiempo por la velocidad de la luz y te sale la distancia hasta ese satélite.
  { file: '1_52.jpg', startSec: 112.46 },  // Tiempo por velocidad. Esa es toda la magia. Tu móvil convierte tiempo en distancia.
  { file: '1_58.jpg', startSec: 118.12 },  // Pero saber a qué distancia estás de un satélite todavía no te dice dónde estás.
  { file: '2_02.jpg', startSec: 122.8 },  // Imagina que te despiertas en algún lugar de España, sin saber dónde.
  { file: '2_06.jpg', startSec: 126.86 },  // Encuentras un cartel que dice estás a 300 kilómetros de Madrid.
  { file: '2_11.jpg', startSec: 131.28 },  // Eso ya te dice algo, pero puedes estar en cualquier punto de un círculo enorme alrededor de Madrid.
  { file: '2_17.jpg', startSec: 137.1 },  // Sigue sandando y encuentras otro cartel. Estás a 100 kilómetros de Valencia.
  { file: '2_22.jpg', startSec: 142.1 },  // Dibujas ese segundo círculo, y solo se cruza con el primero en dos puntos.
  { file: '2_26.jpg', startSec: 146.8 },  // Ya solo tienes dos sitios posibles.
  { file: '2_28.jpg', startSec: 148.5 },  // Y entonces aparece un tercer cartel con la distancia a otra ciudad.
  { file: '2_33.jpg', startSec: 153.28 },  // Su círculo solo pasa por uno de esos dos puntos. Ya sabes dónde estás.
  { file: '2_38.jpg', startSec: 158.18 },  // Esto se llama trilateración, localizar algo midiendo distancias.
  { file: '2_42.jpg', startSec: 162.68 },  // El GPS hace lo mismo, sólo que en el espacio no son círculos, son esferas.
  { file: '2_47.jpg', startSec: 167.9 },  // Cada satélite te dice que estás en algún punto de una gola gigante a su alrededor.
  { file: '2_52.jpg', startSec: 172.8 },  // Tres esferas se cruzan en dos puntos. Uno suele estar perdido en el espacio, así que se descarta.
  { file: '2_59.jpg', startSec: 179.14 },  // Con tres satélites debería bastar, pero tu móvil siempre necesita al menos cuatro.
  { file: '3_04.jpg', startSec: 184.14 },  // Y el motivo es su reloj.
  { file: '3_06.jpg', startSec: 186.34 },  // Todo este cálculo depende de medir el tiempo con una precisión brutal.
  { file: '3_10.jpg', startSec: 190.54 },  // Las ondas viajan tan rápido que una millonésima de segundo de error son unos 300 metros.
  { file: '3_16.jpg', startSec: 196.96 },  // Por eso los satélites llevan relojes atómicos.
  { file: '3_19.jpg', startSec: 199.22 },  // Son relojes que miden el tiempo con las vibraciones de los átomos, de los más precisos que existen.
  { file: '3_25.jpg', startSec: 205.48 },  // Pero tu móvil no lleva un reloj atómico, lleva un reloj normal, de cuarto.
  { file: '3_29.jpg', startSec: 209.94 },  // Y ese reloj se adelanta y se atrasa mucho más que una millonésima de segundo.
  { file: '3_34.jpg', startSec: 214.88 },  // Así que hace un truco muy listo, trata su propio error de hora como una incógnita más.
  { file: '3_40.jpg', startSec: 220.88 },  // Tres incógnitas para tu posición, izquierda o derecha, delante o detrás, arriba o abajo.
  { file: '3_46.jpg', startSec: 226.86 },  // Y una cuarta incógnita para el error de su reloj.
  { file: '3_50.jpg', startSec: 230.72 },  // Cuatro incógnitas, cuatro satélites.
  { file: '3_53.jpg', startSec: 233.6 },  // El cuarto satélite corrige el reloj de tu móvil.
  { file: '3_56.jpg', startSec: 236.44 },  // Y aquí es donde entra Einstein.
  { file: '3_59.jpg', startSec: 239.16 },  // Hace más de 100 años Einstein dijo algo que suena ciencia ficción.
  { file: '4_03.jpg', startSec: 243.46 },  // El tiempo no pasa igual para todo el mundo.
  { file: '4_05.jpg', startSec: 245.98 },  // Depende de lo rápido que te muevas y de la gravedad que tengas cerca.
  { file: '4_10.jpg', startSec: 250.3 },  // Primero la velocidad, es la relatividad especial.
  { file: '4_12.jpg', startSec: 252.98 },  // Cuanto más rápido te mueves, más despacio pasa tu tiempo comparado con alguien que está quieto.
  { file: '4_19.jpg', startSec: 259.56 },  // Los satélites del GPS van a unos 14.000 kilómetros por hora.
  { file: '4_23.jpg', startSec: 263.56 },  // A esa velocidad sus relojes se retrasan unos siete microsegundos cada día.
  { file: '4_28.jpg', startSec: 268.16 },  // Un microsegundo es una millonésima de segundo.
  { file: '4_31.jpg', startSec: 271.44 },  // Ahora la gravedad, es la relatividad general.
  { file: '4_34.jpg', startSec: 274.66 },  // Cuanto más fuerte es la gravedad más despacio pasa al tiempo.
  { file: '4_38.jpg', startSec: 278.32 },  // Aquí abajo la gravedad de la tierra es más fuerte.
  { file: '4_40.jpg', startSec: 280.6 },  // A 20.000 kilómetros de altura es más débil, así que arriba el tiempo corre más deprisa.
  { file: '4_46.jpg', startSec: 286.2 },  // Unos 45 microsegundos más cada día.
  { file: '4_49.jpg', startSec: 289.32 },  // Un efecto los retrasa siete.
  { file: '4_51.jpg', startSec: 291.28 },  // El otro los adelanta 45.
  { file: '4_53.jpg', startSec: 293.54 },  // Resultado, los relojes de los satélites se adelantan unos 38 microsegundos al día.
  { file: '4_59.jpg', startSec: 299.3 },  // 38 millones y más de segundo parece una tontería,
  { file: '5_03.jpg', startSec: 303.06 },  // pero acuérdate de la cuenta de antes,
  { file: '5_05.jpg', startSec: 305.04 },  // una millonésima de segundo son 300 metros.
  { file: '5_08.jpg', startSec: 308.38 },  // 38 millones y más son más de 10 kilómetros.
  { file: '5_11.jpg', startSec: 311.96 },  // Si nadie corregiera la relatividad tu posición se desviaría unos 10 kilómetros cada día que pasa.
  { file: '5_17.jpg', startSec: 317.7 },  // En una semana el mapa te pondría en otra ciudad, en un mes, en otra provincia.
  { file: '5_23.jpg', startSec: 323.18 },  // Así que los ingenieros hicieron algo precioso.
  { file: '5_26.jpg', startSec: 326.24 },  // Antes de lanzar cada satélite ajustan la frecuencia de su reloj.
  { file: '5_29.jpg', startSec: 329.9 },  // En tierra lo ponen a funcionar un poquito más lento a propósito.
  { file: '5_33.jpg', startSec: 333.0 },  // Y cuando llega a su órbita y la relatividad lo acelera marca justo el ritmo correcto.
  { file: '5_38.jpg', startSec: 338.5 },  // Cada vez que usas el GPS estás comprobando que Einstein tenía razón.
  { file: '5_43.jpg', startSec: 343.58 },  // Ahora bien, el GPS no es el único sistema que hay ahí arriba.
  { file: '5_47.jpg', startSec: 347.6 },  // Europa tiene el suyo, se llama Galileo.
  { file: '5_50.jpg', startSec: 350.44 },  // Rusia tiene glonas y China tiene Beidou.
  { file: '5_53.jpg', startSec: 353.38 },  // Todos funcionan con la misma idea, satélites que gritan la hora y receptores que escuchan.
  { file: '5_58.jpg', startSec: 358.26 },  // Y los móviles modernos no se casan con ninguno, escuchan a varios sistemas a la vez.
  { file: '6_04.jpg', startSec: 364.04 },  // Así tienen muchos más satélites a la vista y la posición sale antes y mejor.
  { file: '6_08.jpg', startSec: 368.88 },  // Pero seguro que te ha pasado, entras en un edificio y el punto azul se vuelve loco.
  { file: '6_13.jpg', startSec: 373.8 },  // La razón es que la señal de los satélites llega a tu móvil increíblemente débil.
  { file: '6_18.jpg', startSec: 378.24 },  // Viaja 20.000 kilómetros y cuando llega es más débil que el propio ruido de fondo de la radio.
  { file: '6_23.jpg', startSec: 383.06 },  // Tu móvil tiene que sacarla de ese ruido como quien oye un su surro en mitad de un concierto.
  { file: '6_28.jpg', startSec: 388.44 },  // Un techo o unas paredes gruesas bastan para taparla casi por completo.
  { file: '6_32.jpg', startSec: 392.76 },  // Y en las ciudades con edificios altos pasa otra cosa, la señal rebota en las fachadas.
  { file: '6_37.jpg', startSec: 397.82 },  // Este rebote hace un camino más largo, llega a un pelintarde.
  { file: '6_41.jpg', startSec: 401.34 },  // Y un pelintarde significa más distancia.
  { file: '6_44.jpg', startSec: 404.04 },  // Tu móvil cree que estás en la acera de enfrente.
  { file: '6_46.jpg', startSec: 406.94 },  // Por eso las aplicaciones de mapas hacen trampa y de las buenas no se fían sólo de los satélites.
  { file: '6_52.jpg', startSec: 412.0 },  // Tu móvil también escucha las redes wifi que hay a tu alrededor.
  { file: '6_56.jpg', startSec: 416.06 },  // Existen enormes bases de datos que saben dónde está cada red wifi.
  { file: '7_00.jpg', startSec: 420.36 },  // Si tu móvil ve tres redes conocidas ya tiene una buena pista de dónde estás, aunque no vean ningún satélite.
  { file: '7_06.jpg', startSec: 426.58 },  // Lo mismo pasa con las antenas de telefonía.
  { file: '7_09.jpg', startSec: 429.04 },  // Son menos precisas, pero funcionan casi en cualquier sitio.
  { file: '7_12.jpg', startSec: 432.74 },  // Satélites, wifi, antenas, tu móvil mezcla todo y te da el mejor punto azul posible.
  { file: '7_18.jpg', startSec: 438.36 },  // Y esto va mucho más allá de no perderte.
  { file: '7_20.jpg', startSec: 440.28 },  // El coche que pides por una aplicación sabe dónde recogerte gracias al GPS.
  { file: '7_25.jpg', startSec: 445.48 },  // El repartidor que te trae la cena aparece moviéndose por el mapa gracias al GPS.
  { file: '7_30.jpg', startSec: 450.42 },  // Los aviones y los barcos lo usan para navegar.
  { file: '7_33.jpg', startSec: 453.14 },  // Y hay un uso que casi nadie conoce.
  { file: '7_35.jpg', startSec: 455.36 },  // El GPS no sólo da la posición, da la hora exacta.
  { file: '7_39.jpg', startSec: 459.36 },  // Muchas redes de telefonías se sincronizan con esa hora.
  { file: '7_42.jpg', startSec: 462.46 },  // Muchos bancos y bolsas la usan para poner la hora exacta a cada operación.
  { file: '7_46.jpg', startSec: 466.32 },  // Una parte enorme del mundo moderno funciona al ritmo de esos relojes atómicos que dan vueltas ahí arriba.
  { file: '7_53.jpg', startSec: 473.24 },  // Así que volvamos al principio a ese punto azul en tu mapa.
  { file: '7_56.jpg', startSec: 476.88 },  // Tu móvil no le preguntó a nadie dónde estaba.
  { file: '7_59.jpg', startSec: 479.58 },  // Escuchó a cuatro satélites gritar la hora, convirtió el tiempo en distancia y cruzó las esferas.
  { file: '8_05.jpg', startSec: 485.9 },  // Usó el cuarto satélite para corregir su propio reloj.
  { file: '8_08.jpg', startSec: 488.96 },  // Y todo eso sólo funciona porque alguien corregió los relojes antes del lanzamiento.
  { file: '8_13.jpg', startSec: 493.02 },  // Si no, el punto se iría unos 10 kilómetros cada día.
  { file: '8_17.jpg', startSec: 497.02 },  // Tu móvil no pregunta, escucha y lo que escucha viene con la firma de Einstein.
  { file: '8_22.jpg', startSec: 502.24 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '8_27.jpg', startSec: 507.24 },  // Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'map_ping.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'listen_tone.mp3', startSec: 18.9, volume: 0.13 },
  { file: 'space_whoosh.mp3', startSec: 35.8, volume: 0.14 },
  { file: 'radio_beep.mp3', startSec: 49.4, volume: 0.14 },
  { file: 'thunder.mp3', startSec: 74.5, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 112.5, volume: 0.16 },
  { file: 'pin_drop.mp3', startSec: 153.3, volume: 0.15 },
  { file: 'tick_tock.mp3', startSec: 197.0, volume: 0.13 },
  { file: 'scifi_sting.mp3', startSec: 236.4, volume: 0.16 },
  { file: 'speed_whoosh.mp3', startSec: 259.6, volume: 0.14 },
  { file: 'alarm_sting.mp3', startSec: 308.4, volume: 0.15 },
  { file: 'success_chime.mp3', startSec: 338.5, volume: 0.15 },
  { file: 'crowd_murmur.mp3', startSec: 383.1, volume: 0.12 },
  { file: 'wifi_blip.mp3', startSec: 412.0, volume: 0.13 },
  { file: 'secret_tone.mp3', startSec: 453.1, volume: 0.13 },
  { file: 'closing_turn.mp3', startSec: 473.2, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 502.2, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ComoFuncionaElGps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('como-funciona-el-gps.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`como-funciona-el-gps-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`como-funciona-el-gps-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`como-funciona-el-gps/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
