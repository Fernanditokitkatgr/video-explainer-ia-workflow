import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// como-funciona-el-wifi - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Tu wifi de casa va rápido, y además parece gratis total.
  { file: '0_04.jpg', startSec: 4.02 },  // Lo das por hecho, está siempre ahí en todas las habitaciones, sin que pienses en ello.
  { file: '0_09.jpg', startSec: 9.36 },  // Pero subes a un avión, y ese mismo wifi se vuelve lento, caro o directamente no existe.
  { file: '0_14.jpg', startSec: 14.92 },  // Porque la misma tecnología se comporta de forma tan distinta ahí arriba.
  { file: '0_19.jpg', startSec: 19.4 },  // Hoy vas a entender qué es el wifi de verdad.
  { file: '0_22.jpg', startSec: 22.18 },  // Vas a entender porque tiene un alcance limitado, incluso dentro de tu propia casa.
  { file: '0_26.jpg', startSec: 26.94 },  // Vas a entender por qué más aparatos conectados, ralentizan a todos los demás.
  { file: '0_31.jpg', startSec: 31.68 },  // Y vas a entender por qué un avión entero pelea por una sola conexión compartida.
  { file: '0_36.jpg', startSec: 36.56 },  // Empecemos por lo que de verdad pasa dentro de tu router.
  { file: '0_39.jpg', startSec: 39.8 },  // El wifi no es internet sin cables por arte de magia.
  { file: '0_43.jpg', startSec: 43.2 },  // Es una forma de enviar datos con ondas de radio, parecidas a las de una radio normal de toda la vida.
  { file: '0_48.jpg', startSec: 48.98 },  // Tu router capta esas ondas y hace de traductor entre dos mundos distintos.
  { file: '0_53.jpg', startSec: 53.72 },  // Converte esas ondas de radio en una señal que viaja por un cable físico de verdad, el que entra en tu casa.
  { file: '0_59.jpg', startSec: 59.72 },  // Ese cable suele ser fibra óptica o cable coaxial, según la compañía que tengas contratada.
  { file: '1_05.jpg', startSec: 65.14 },  // Ese cable físico es el que de verdad te conecta con el resto de internet.
  { file: '1_09.jpg', startSec: 69.34 },  // El wifi solo es el último tramo.
  { file: '1_11.jpg', startSec: 71.78 },  // El tramo que conecta tu móvil o tu portátil con ese router.
  { file: '1_15.jpg', startSec: 75.74 },  // Desconecta ese cable de entrada y el wifi de tu casa deja de servir para nada, aunque el router siga encendido
  { file: '1_21.jpg', startSec: 81.88 },  // El router tampoco crea datos de la nada, solo hace de puente entre el aire y el cable.
  { file: '1_27.jpg', startSec: 87.5 },  // Tu router normalmente emite en dos frecuencias distintas a la vez.
  { file: '1_31.jpg', startSec: 91.48 },  // La primera se llama 2,4 GHz, esa onda viaja más lejos y atraviesa paredes con bastante más facilidad.
  { file: '1_38.jpg', startSec: 98.82 },  // A cambio, mueve los datos más despacio que la otra opción.
  { file: '1_42.jpg', startSec: 102.52 },  // La segunda se llama 5 GHz, esa onda mueve muchísimos más datos por segundo, mucho más rápido,
  { file: '1_48.jpg', startSec: 108.88 },  // pero su alcance es corto y una pared gruesa a la frena enseguida.
  { file: '1_53.jpg', startSec: 113.28 },  // Por eso tu móvil cambia solo entre una y otra, según en qué parte de la casa esté.
  { file: '1_58.jpg', startSec: 118.16 },  // Cerca del router suele tirar de la rápida.
  { file: '2_01.jpg', startSec: 121.18 },  // Lejos o detrás de varias paredes se cae sola al además alcance.
  { file: '2_05.jpg', startSec: 125.7 },  // La banda rápida va bien para ver series encortes cerca del router.
  { file: '2_09.jpg', startSec: 129.4 },  // La de más alcance basta de sobra para cosas ligeras, como leer mensajes o navegar un poco.
  { file: '2_14.jpg', startSec: 134.8 },  // Es un intercambio constante entre alcance y velocidad.
  { file: '2_18.jpg', startSec: 138.18 },  // Nunca consigues las dos cosas al máximo a la vez.
  { file: '2_21.jpg', startSec: 141.32 },  // Y por qué el wifi deja de llegar bien en el cuarto del fondo.
  { file: '2_25.jpg', startSec: 145.06 },  // Una onda de radio pierde fuerza según si aleja del router, igual que un grito suena más flojo cuanto más lejos
  { file: '2_31.jpg', startSec: 151.9 },  // Cada pared, cada puerta, cada mueble grande, resta un poco más de esa señal por el camino.
  { file: '2_37.jpg', startSec: 157.2 },  // Una pared de hormigón frena mucho más la señal que un tabí que fino.
  { file: '2_41.jpg', startSec: 161.48 },  // Pasado cierto punto, la señal llega tan débil que el aparato ya no logra entender los datos.
  { file: '2_46.jpg', startSec: 166.72 },  // Por eso mover el router al centro de la casa, lejos de paredes gruesas suelen notarse enseguida.
  { file: '2_52.jpg', startSec: 172.4 },  // Por eso un piso grande necesita varios puntos de wifi repartidos, nunca uno solo metido en una esquina.
  { file: '2_59.jpg', startSec: 179.28 },  // Ahora otra pregunta clásica.
  { file: '3_01.jpg', startSec: 181.4 },  // ¿Por qué el wifi va más lento cuando hay más gente conectada a la vez?
  { file: '3_05.jpg', startSec: 185.48 },  // Imagina un pasillo estrecho donde solo puede hablar una persona cada vez para que se la entienda bien.
  { file: '3_10.jpg', startSec: 190.72 },  // Si hay 10 personas queriendo hablar por ese mismo pasillo, cada una tiene que esperar su turno.
  { file: '3_16.jpg', startSec: 196.58 },  // Cuantas más personas comparten ese turno, menos tiempo le toca a cada una para hablar.
  { file: '3_21.jpg', startSec: 201.76 },  // El wifi funciona de forma parecida.
  { file: '3_24.jpg', startSec: 204.3 },  // Todos los aparatos de casa comparten el mismo turno de aire con el router.
  { file: '3_28.jpg', startSec: 208.24 },  // Más móviles, más tablets, más videoyamadas a la vez y a cada aparato le toca un turno bastante más corto.
  { file: '3_34.jpg', startSec: 214.96 },  // Una descarga enorme en un móvil puede robarle turno a la videoyamada que haces en el salón,
  { file: '3_39.jpg', startSec: 219.84 },  // aunque los dos usen la misma fibra de fondo.
  { file: '3_42.jpg', startSec: 222.54 },  // Por eso una casa llena de pantallas encendidas nota el wifi más lento, aunque la fibra de fuera siga siendo la
  { file: '3_50.jpg', startSec: 230.02 },  // Hasta los aparatos conectados en segundo plano, sin que los suces piden turno de vez en cuando.
  { file: '3_55.jpg', startSec: 235.62 },  // Y ese cable que entra en tu casa tampoco termina ahí, claro.
  { file: '3_59.jpg', startSec: 239.42 },  // Viaja bajo tu calle, se junta con el de miles de casas más.
  { file: '4_03.jpg', startSec: 243.08 },  // Acaba llegando a centros enormes que conectan ciudades enteras entre sí.
  { file: '4_07.jpg', startSec: 247.28 },  // Buena parte de ese tráfico cruza después países y océanos por cables físicos tendidos bajo tierra y bajo el ma
  { file: '4_14.jpg', startSec: 254.08 },  // Tu wifi de casa en el fondo es solo la última puerta de entrada a una red física gigantesca hecha de cable de 
  { file: '4_21.jpg', startSec: 261.22 },  // Esa misma estructura es la que hay detrás del wifi de una cafetería, de una oficina o de la aeropuerto antes d
  { file: '4_28.jpg', startSec: 268.06 },  // Y aquí está el problema del avión.
  { file: '4_30.jpg', startSec: 270.6 },  // Ahí arriba, ese cable físico desaparece por completo.
  { file: '4_34.jpg', startSec: 274.88 },  // Una avión en pleno vuelo no tiene ningún cable que lo una con tierra.
  { file: '4_38.jpg', startSec: 278.88 },  // No hay fibra que subir hasta las nubes, ni forma de enchufar el avión a esa red mundial de cables.
  { file: '4_44.jpg', startSec: 284.6 },  // Así que para dar wifi ahí arriba hace falta sustituir ese cable de otra forma.
  { file: '4_50.jpg', startSec: 290.26 },  // Hoy existen dos formas reales de resolver esto y conviene conocer las dos.
  { file: '4_55.jpg', startSec: 295.42 },  // La primera se llama conexión aire tierra.
  { file: '4_58.jpg', startSec: 298.4 },  // Son antenas repartidas por el suelo, parecidas a las torres que dan cobertura a tu móvil, pero apuntando hacia
  { file: '5_05.jpg', startSec: 305.92 },  // El avión capta esa señal mientras vuela por encima de esas torres, una tras otra, como quien va cambiando de t
  { file: '5_14.jpg', startSec: 314.14 },  // Esas antenas suelen estar repartidas sobre todo cerca de costas y zonas pobladas, donde compensa instalarlas.
  { file: '5_20.jpg', startSec: 320.76 },  // Funciona muy bien sobre zonas con muchas torres cerca, como tierra firme y ciudades.
  { file: '5_25.jpg', startSec: 325.58 },  // El problema llega sobre el mar abierto, o sobre zonas muy remotas.
  { file: '5_29.jpg', startSec: 329.76 },  // Ahí esa señal queda demasiado débil o desaparece del todo.
  { file: '5_33.jpg', startSec: 333.74 },  // Tiene sentido.
  { file: '5_35.jpg', startSec: 335.24 },  // Sin torre cerca apuntando al cielo, no hay nada con quien el avión pueda hablar.
  { file: '5_40.jpg', startSec: 340.22 },  // La segunda forma usa satélites.
  { file: '5_42.jpg', startSec: 342.72 },  // El avión lleva una antena pegada al fuselaje, mirando hacia el cielo, que conversa con satélites puestos en ór
  { file: '5_49.jpg', startSec: 349.44 },  // Por fuera, esa antena suele verse como un pequeño bulto curvado encima del fuselaje, si te fijas al embarcar.
  { file: '5_55.jpg', startSec: 355.6 },  // Esta forma funciona en casi cualquier parte, incluido el cruce de uno ceano entero.
  { file: '6_01.jpg', startSec: 361.16 },  // Durante años, los satélites usados para esto estaban muy lejos en una órbita alta y fija, muy por encima de la
  { file: '6_08.jpg', startSec: 368.78 },  // Esa distancia tan grande metía un retraso real en la conexión, la típica espera rara que notas en una vídeo ll
  { file: '6_15.jpg', startSec: 375.88 },  // Ahora han llegado constelaciones nuevas de satélites, mucho más bajos, mucho más cerca del planeta.
  { file: '6_22.jpg', startSec: 382.22 },  // Esos satélites bajos mejoran bastante la velocidad y ese retraso, aunque la tecnología todavía sigue puliéndos
  { file: '6_29.jpg', startSec: 389.82 },  // Es ahora mismo una de las partes de la aviación que más rápido está cambiando.
  { file: '6_34.jpg', startSec: 394.36 },  // Pero da igual que camino tome el avión para captar señal, hay un límite que comparten los dos.
  { file: '6_40.jpg', startSec: 400.0 },  // Todo el avión entero, con cientos de pasajeros a bordo, usa una única conexión compartida con tierra o con el 
  { file: '6_47.jpg', startSec: 407.26 },  // Esa conexión se reparte entre todos esos pasajeros a la vez, igual que el turno de aire de tu casa, pero con m
  { file: '6_56.jpg', startSec: 416.16 },  // Esa es la razón principal de que el wifi de un avión vaya más lento, y la razón de que muchas aerolíneas cobre
  { file: '7_03.jpg', startSec: 423.48 },  // Cobrar a parte tiene su lógica. Una conexión compartida entre cientos de personas cuesta mantenerla, igual que
  { file: '7_14.jpg', startSec: 434.14 },  // Tu wifi de casa también reparte una sola conexión de tu proveedor entre todos tus aparatos conectados.
  { file: '7_20.jpg', startSec: 440.2 },  // La diferencia real es cuánta gente pide ese mismo turno. En casa, unos pocos aparatos, en un avión, cientos de
  { file: '7_29.jpg', startSec: 449.54 },  // Por eso streaming en 4k a bordo suele ir peor que en casa, aunque uses el mismo móvil y la misma app de siempr
  { file: '7_36.jpg', startSec: 456.56 },  // La buena noticia es que esto mejora muy rápido, año tras año.
  { file: '7_40.jpg', startSec: 460.74 },  // Ya existen aerolíneas que ofrecen wifi rápido y gratis gracias a estos satélites nuevos.
  { file: '7_46.jpg', startSec: 466.3 },  // La distancia entre el wifi de tu casa y el wifi de un avión cada vez es más pequeña.
  { file: '7_51.jpg', startSec: 471.26 },  // Dentro de unos años, probablemente mire esa tras y te sorprenda lo lento que iba el wifi de hoy en un avión.
  { file: '7_57.jpg', startSec: 477.44 },  // Así que la próxima vez que tu wifi vaya lento a 10.000 metros de altura, ya sabes que pasa de verdad ahí arrib
  { file: '8_04.jpg', startSec: 484.38 },  // Una única conexión, repartida entre cientos de personas, sustituyendo al cable que entierra, das por hecho cad
  { file: '8_11.jpg', startSec: 491.92 },  // El wifi nunca voce.
  { file: '8_13.jpg', startSec: 493.98 },  // Siempre fue ondas de radio buscando, de una forma u otra, llegar hasta un cable.
  { file: '8_19.jpg', startSec: 499.24 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '8_24.jpg', startSec: 504.72 },  // Cada semana una máquina, un invento o una idea, he explicado fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'wifi_hum.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'alert_chime.mp3', startSec: 14.9, volume: 0.15 },
  { file: 'radio_static.mp3', startSec: 43.2, volume: 0.14 },
  { file: 'beep_two.mp3', startSec: 87.5, volume: 0.14 },
  { file: 'fade_signal.mp3', startSec: 141.3, volume: 0.14 },
  { file: 'hallway_echo.mp3', startSec: 181.4, volume: 0.13 },
  { file: 'whoosh_travel.mp3', startSec: 235.6, volume: 0.14 },
  { file: 'record_scratch.mp3', startSec: 268.1, volume: 0.14 },
  { file: 'tower_ping.mp3', startSec: 295.4, volume: 0.15 },
  { file: 'space_whoosh.mp3', startSec: 340.2, volume: 0.14 },
  { file: 'slow_wait.mp3', startSec: 361.2, volume: 0.13 },
  { file: 'speed_whoosh.mp3', startSec: 375.9, volume: 0.14 },
  { file: 'crowd_murmur.mp3', startSec: 394.4, volume: 0.13 },
  { file: 'cash_chime.mp3', startSec: 423.5, volume: 0.15 },
  { file: 'rising_hope.mp3', startSec: 456.6, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 491.9, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 499.2, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ComoFuncionaElWifi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('como-funciona-el-wifi.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`como-funciona-el-wifi-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`como-funciona-el-wifi-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`como-funciona-el-wifi/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
