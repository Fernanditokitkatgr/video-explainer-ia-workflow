import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// por-que-nvidia-vale-tanto - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // En 1993, tres ingenieros sentaron a la mesa de un restaurante de carretera en California.
  { file: '0_06.jpg', startSec: 6.38 },  // Pidieron café, mucho café y empezaron a imaginar una empresa.
  { file: '0_11.jpg', startSec: 11.88 },  // Hoy esa empresa vale más de tres billones de dólares,
  { file: '0_15.jpg', startSec: 15.7 },  // más de lo que produce España entera en todo un año.
  { file: '0_19.jpg', startSec: 19.04 },  // Se llama EnVIDIA y hace unos años sólo la conocían los jugadores.
  { file: '0_23.jpg', startSec: 23.44 },  // Hoy las grandes empresas de inteligencia artificial hacen cola para comprarles sus chips.
  { file: '0_28.jpg', startSec: 28.68 },  // ¿Vas a entender por qué? ¿Qué es una tarjeta gráfica?
  { file: '0_32.jpg', startSec: 32.84 },  // ¿Por qué laía la necesita? ¿Y qué puede salir mal?
  { file: '0_36.jpg', startSec: 36.8 },  // Y ojo con esa comparación con los países, tiene trampa.
  { file: '0_40.jpg', startSec: 40.24 },  // Te la explico más adelante. Pero empecemos por aquella mesa y por la cuenta del café.
  { file: '0_46.jpg', startSec: 46.16 },  // El restaurante era un Denys, una cadena americana abierta día y noche.
  { file: '0_50.jpg', startSec: 50.66 },  // Uno de los tres era Jensen Huang, de adolescente había trabajado en un Denys fregando platos.
  { file: '0_56.jpg', startSec: 56.6 },  // Los otros dos eran Christmas, a la Chofsky y Kurtis Priem,
  { file: '1_00.jpg', startSec: 60.08 },  // dos ingenieros expertos en chips. Su idea era muy concreta,
  { file: '1_04.jpg', startSec: 64.34 },  // crear chips para dibujar gráficos en tres dimensiones.
  { file: '1_07.jpg', startSec: 67.82 },  // ¿Y quién quería eso en 1993?
  { file: '1_11.jpg', startSec: 71.06 },  // Los videojuegos. Los juegos estaban saltando a mundos en 3D
  { file: '1_15.jpg', startSec: 75.22 },  // y los ordenadores de casa sufrían para moverlos.
  { file: '1_18.jpg', startSec: 78.82 },  // El arranque fue durísimo. Su primer chip fue un fracaso de ventas
  { file: '1_22.jpg', startSec: 82.8 },  // y la empresa estuvo al borde de la quiebra.
  { file: '1_25.jpg', startSec: 85.72 },  // Pero aguantaron,
  { file: '1_26.jpg', startSec: 86.86 },  // y en 1999 lanzaron una tarjeta llamada Gifors 256.
  { file: '1_32.jpg', startSec: 92.78 },  // La presentaron con una palabra que hoy usa todo el mundo.
  { file: '1_36.jpg', startSec: 96.54 },  // GPU. Unidad de procesamiento gráfico.
  { file: '1_40.jpg', startSec: 100.12 },  // El chip que dibuja lo que ves en pantalla.
  { file: '1_42.jpg', startSec: 102.8 },  // Y la cuenta siguió creciendo. Pero ¿qué tiene de especial una GPU?
  { file: '1_47.jpg', startSec: 107.86 },  // Para entenderlo entremos en la cocina del restaurante.
  { file: '1_50.jpg', startSec: 110.9 },  // El procesador principal de tu ordenador se llama CPU.
  { file: '1_54.jpg', startSec: 114.5 },  // Piensa en la CPU como un pequeño grupo de chefs brillantes.
  { file: '1_58.jpg', startSec: 118.08 },  // Cada chef sabe preparar cualquier plato, por difícil que sea, pero son pocos, un puñado.
  { file: '2_03.jpg', startSec: 123.98 },  // La GPU es otra cosa, es un ejército de pinches de cocina.
  { file: '2_08.jpg', startSec: 128.16 },  // Cada pinche solo sabe hacer tareas sencillas, pelar una patata, cortar una cebolla,
  { file: '2_13.jpg', startSec: 133.02 },  // pero hay miles de pinches y trabajan todos a la vez.
  { file: '2_16.jpg', startSec: 136.86 },  // Si tienes que pelar un millón de patatas, a quién se lo encargas?
  { file: '2_19.jpg', startSec: 139.8 },  // Al ejército de pinches, ganan por goleada.
  { file: '2_23.jpg', startSec: 143.82 },  // Y eso es justo lo que pide un videojuego. Tu pantalla tiene unos dos millones de puntitos de color,
  { file: '2_29.jpg', startSec: 149.38 },  // los píxeles y el juego tiene que calcular el color de cada uno
  { file: '2_33.jpg', startSec: 153.06 },  // una 60 veces por segundo.
  { file: '2_35.jpg', startSec: 155.84 },  // Calculos sencillos, pero muchísimos, patatas y más patatas.
  { file: '2_40.jpg', startSec: 160.64 },  // Para eso nació la GPU, para hacer millones de cosas pequeñas a la vez.
  { file: '2_45.jpg', startSec: 165.52 },  // Durante años ese ejército de pinches trabajaba en una sola cosa,
  { file: '2_49.jpg', startSec: 169.16 },  // dibujar gráficos. Pero algunos científicos se dieron cuenta de algo.
  { file: '2_53.jpg', startSec: 173.98 },  // Esa fuerza bruta servía para mucho más.
  { file: '2_56.jpg', startSec: 176.9 },  // El problema es que programar una GPU para eso era una pesadilla.
  { file: '3_00.jpg', startSec: 180.76 },  // Había que disfrazar cada cálculo de dibujo.
  { file: '3_03.jpg', startSec: 183.6 },  // Y entonces envidia hizo la apuesta que lo cambió todo.
  { file: '3_06.jpg', startSec: 186.74 },  // La llamó CUDA. La presentó a finales de 2006 y la lanzó en 2007.
  { file: '3_12.jpg', startSec: 192.64 },  // CUDA es como un idioma para dar órdenes a esos pinches.
  { file: '3_15.jpg', startSec: 195.28 },  // Con CUDA, cualquier programador podía usar la GPU para sus propios cálculos.
  { file: '3_20.jpg', startSec: 200.56 },  // En VIDEA insistió durante años, llevó CUDA a las universidades
  { file: '3_24.jpg', startSec: 204.24 },  // y creó herramientas listas para usar.
  { file: '3_27.jpg', startSec: 207.34 },  // Poco a poco, millones de programadores aprendieron a trabajar con CUDA.
  { file: '3_31.jpg', startSec: 211.66 },  // Y aquí está el verdadero secreto de en VIDEA.
  { file: '3_34.jpg', startSec: 214.36 },  // Van más allá del chip. Cuando todo tu software está escrito para CUDA,
  { file: '3_38.jpg', startSec: 218.8 },  // cambiarte a otra marca cuesta muchísimo.
  { file: '3_41.jpg', startSec: 221.44 },  // Es como el foso que rodea un castillo. Los rivales pueden tener buenos chips,
  { file: '3_45.jpg', startSec: 225.68 },  // pero primero tienen que cruzar el foso.
  { file: '3_48.jpg', startSec: 228.4 },  // Y la cuenta siguió creciendo. Ahora viajamos a 2012 a la Universidad de Toronto.
  { file: '3_54.jpg', startSec: 234.24 },  // Un estudiante llamado Alex Kriszczewski quería enseñar a un ordenador a reconocer imágenes.
  { file: '3_59.jpg', startSec: 239.88 },  // Trabajaba junto a Elias Utskeber y su profesor Jeff Rijinton.
  { file: '4_04.jpg', startSec: 244.08 },  // Usaban una red neuronal, un programa que aprende viendo muchísimos ejemplos.
  { file: '4_08.jpg', startSec: 248.98 },  // Entrenar algo así exige una cantidad absurda de multiplicaciones
  { file: '4_12.jpg', startSec: 252.32 },  // por millones. ¿Te suena?
  { file: '4_15.jpg', startSec: 255.26 },  // Calculos sencillos, muchísimos, patatas.
  { file: '4_19.jpg', startSec: 259.18 },  // Alex entrenó su red con dos tarjetas gráficas de en VIDEA,
  { file: '4_22.jpg', startSec: 262.42 },  // tarjetas pensadas para jugar y las tenía en su habitación en casa de sus padres.
  { file: '4_27.jpg', startSec: 267.58 },  // Su red se llamó AlexNet y arrasó en el concurso de imágenes más famoso del mundo.
  { file: '4_33.jpg', startSec: 273.02 },  // Cometió muchísimos menos errores que el segundo clasificado,
  { file: '4_36.jpg', startSec: 276.48 },  // una diferencia enorme. Ese día los investigadores entendieron dos cosas.
  { file: '4_40.jpg', startSec: 280.2 },  // Las redes neuronales funcionaban y la GPU era su motor perfecto.
  { file: '4_45.jpg', startSec: 285.86 },  // El ejército de pinches acababa de encontrar su gran trabajo,
  { file: '4_49.jpg', startSec: 289.74 },  // pero el gran terremoto llegó a finales de 2022, con Chat GPT.
  { file: '4_55.jpg', startSec: 295.42 },  // Se calcula que en unos dos meses ya tenía cien millones de usuarios.
  { file: '4_59.jpg', startSec: 299.76 },  // De repente todas las grandes tecnológicas quisieron su propia ella
  { file: '5_03.jpg', startSec: 303.38 },  // y la querían ya. Para entrenar un modelo así,
  { file: '5_06.jpg', startSec: 306.8 },  // hacen falta miles de GPUs trabajando juntas durante semanas.
  { file: '5_11.jpg', startSec: 311.14 },  // Y casi todas esas GPUs eran de en VIDEA,
  { file: '5_14.jpg', startSec: 314.3 },  // con su software escrito en CUDA. El foso del castillo de pronto valía oro
  { file: '5_19.jpg', startSec: 319.0 },  // y la cuenta siguió creciendo. El chip estrella de esa fiebre se llama H100.
  { file: '5_24.jpg', startSec: 324.32 },  // Es otra lida, una pieza para centros de datos pensada para entrenaría
  { file: '5_28.jpg', startSec: 328.44 },  // y cada uno cuesta de cenas de miles de dólares.
  { file: '5_31.jpg', startSec: 331.88 },  // Ubolistas de espera de meses. Cuando todos quieren algo y casi solo hay un vendedor,
  { file: '5_37.jpg', startSec: 337.28 },  // ese vendedor pone el precio. Por eso en VIDEA gana una barbaridad con cada chip,
  { file: '5_42.jpg', startSec: 342.3 },  // como en la fiebre del oro, los que más ganaron fueron los que vendían palas.
  { file: '5_47.jpg', startSec: 347.0 },  // En 2023, en VIDEA superó por primera vez el billón de dólares de valor
  { file: '5_51.jpg', startSec: 351.44 },  // y, ojo, billón en español,
  { file: '5_54.jpg', startSec: 354.44 },  // un millón de millones, un uno seguido de 12 zeros.
  { file: '5_58.jpg', startSec: 358.48 },  // En 2024, ya había pasado de los tres billones
  { file: '6_01.jpg', startSec: 361.92 },  // y durante unos días llegó a ser la empresa más valiosa del planeta,
  { file: '6_06.jpg', startSec: 366.44 },  // y hoy sigue entre las empresas más valiosas del mundo.
  { file: '6_10.jpg', startSec: 370.14 },  // La cuenta del café se ha convertido en billones,
  { file: '6_13.jpg', startSec: 373.36 },  // y aquí llega la trampa que te prometí. Eso de que en VIDEA vale más que países enteros.
  { file: '6_18.jpg', startSec: 378.86 },  // Lo que produce España en un año ronda los dos billones de dólares,
  { file: '6_22.jpg', startSec: 382.8 },  // en VIDEA vale bastante más. Suena brutal,
  { file: '6_26.jpg', startSec: 386.2 },  // pero estás comparando dos cosas distintas.
  { file: '6_28.jpg', startSec: 388.3 },  // El PIB de un país es lo que produce en un solo año,
  { file: '6_32.jpg', startSec: 392.32 },  // es como un sueldo anual. El valor de una empresa es otra cosa,
  { file: '6_36.jpg', startSec: 396.52 },  // es lo que cuesta en todas sus acciones juntas.
  { file: '6_39.jpg', startSec: 399.34 },  // Y ese precio refleja lo que los inversores esperan que gane durante muchos años.
  { file: '6_44.jpg', startSec: 404.16 },  // Es como comparar el precio de una casa con el sueldo anual de una persona,
  { file: '6_48.jpg', startSec: 408.26 },  // son medidas diferentes, y ese valor cambia cada día en la bolsa.
  { file: '6_53.jpg', startSec: 413.06 },  // Así que la frase honesta es otra.
  { file: '6_54.jpg', startSec: 414.78 },  // Los inversores apuestan a que en VIDEA ganará fortunas durante muchos años.
  { file: '6_59.jpg', startSec: 419.74 },  // Un detalle que sorprende, en VIDEA diseña sus chips,
  { file: '7_03.jpg', startSec: 423.2 },  // pero quien los fabrica es otra empresa.
  { file: '7_05.jpg', startSec: 425.38 },  // Y la que los fabricas se llama TSMC, está en Taiwan.
  { file: '7_09.jpg', startSec: 429.8 },  // TSMC es el mayor fabricante de chips por encargo del mundo.
  { file: '7_13.jpg', startSec: 433.54 },  // También fabrica para Apple y para AMD.
  { file: '7_16.jpg', startSec: 436.46 },  // El chip más deseado del planeta depende de fábricas
  { file: '7_19.jpg', startSec: 439.2 },  // en una isla con mucha tensión política.
  { file: '7_22.jpg', startSec: 442.12 },  // Es como un chef famoso que inventa las recetas,
  { file: '7_24.jpg', startSec: 444.44 },  // pero las cocinas siempre en la misma cocina alquilada.
  { file: '7_28.jpg', startSec: 448.38 },  // Entonces, en VIDEA es imparable?
  { file: '7_31.jpg', startSec: 451.2 },  // Vamos con lo que puedes salir mal. Primer riesgo, la competencia.
  { file: '7_36.jpg', startSec: 456.42 },  // AMD también diseña GPUs muy potentes para ella
  { file: '7_39.jpg', startSec: 459.62 },  // y cada año se acerca un poco más.
  { file: '7_42.jpg', startSec: 462.54 },  // Y los grandes clientes de Nvidia están creando sus propios chips.
  { file: '7_46.jpg', startSec: 466.22 },  // Google tiene los suyos, Amazon también.
  { file: '7_49.jpg', startSec: 469.18 },  // Cuanto menos dependan de en VIDEA, menos chips le comprarán.
  { file: '7_53.jpg', startSec: 473.26 },  // Segundo riesgo, la política.
  { file: '7_56.jpg', startSec: 476.18 },  // Estados Unidos limita que chips de IA puede vender en VIDEA China
  { file: '7_59.jpg', startSec: 479.96 },  // y China era uno de sus grandes mercados.
  { file: '8_03.jpg', startSec: 483.78 },  // Tercer riesgo, el más grande. Que el boom de la IA se enfrié.
  { file: '8_08.jpg', startSec: 488.68 },  // Si las empresas recortan su gasto en IA, también comprarán menos chips.
  { file: '8_13.jpg', startSec: 493.32 },  // Ya hubo un susto. En enero de 2025, una IA China llamada DeepSec
  { file: '8_18.jpg', startSec: 498.2 },  // aseguró haber entrenado un buen modelo gastando mucho menos.
  { file: '8_22.jpg', startSec: 502.32 },  // Ese día en VIDEA perdió casi 600.000 millones
  { file: '8_25.jpg', startSec: 505.42 },  // de dólares de valor en bolsa, en un solo día.
  { file: '8_28.jpg', startSec: 508.92 },  // Lo que sube como un cohete también puede caer como una piedra.
  { file: '8_33.jpg', startSec: 513.12 },  // Así que volvamos a aquella mesa del Denys.
  { file: '8_35.jpg', startSec: 515.8 },  // Tres ingenieros, unos cafés y una idea para dibujar videojuegos.
  { file: '8_40.jpg', startSec: 520.66 },  // La GPU nació para pintar millones de píxeles a la vez,
  { file: '8_44.jpg', startSec: 524.32 },  // un ejército de pinches. CUDA convirtió ese ejército en una herramienta
  { file: '8_48.jpg', startSec: 528.84 },  // para cualquier programador y levantó el foso.
  { file: '8_52.jpg', startSec: 532.18 },  // Alex Net demostró que ese ejército era perfecto para la IA.
  { file: '8_56.jpg', startSec: 536.06 },  // Y Chad, GPT, hizo que todo el mundo lo quisiera a la vez.
  { file: '9_00.jpg', startSec: 540.0 },  // Por eso en VIDEA vale tanto. Vende las palas en plena fiebre del oro.
  { file: '9_04.jpg', startSec: 544.62 },  // Comparar su valor con lo que produce un país tiene trampa
  { file: '9_07.jpg', startSec: 547.36 },  // y esa cuenta puede bajar igual de rápido.
  { file: '9_10.jpg', startSec: 550.92 },  // Ya sabes por qué en VIDEA vale más que países enteros
  { file: '9_13.jpg', startSec: 553.72 },  // y qué hay de verdad detrás del titular. Si te gusta entender cómo funciona de verdad la tecnología
  { file: '9_18.jpg', startSec: 558.72 },  // que usas cada día, suscríbete. Cada semana una máquina, un invento
  { file: '9_22.jpg', startSec: 562.98 },  // o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'coin_chime.mp3', startSec: 11.9, volume: 0.16 },
  { file: 'diner_bell.mp3', startSec: 46.2, volume: 0.15 },
  { file: 'record_scratch.mp3', startSec: 78.8, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 86.9, volume: 0.16 },
  { file: 'chop_chop.mp3', startSec: 124.0, volume: 0.14 },
  { file: 'pop_multiply.mp3', startSec: 160.6, volume: 0.14 },
  { file: 'scifi_sting.mp3', startSec: 183.6, volume: 0.16 },
  { file: 'gate_close.mp3', startSec: 221.4, volume: 0.14 },
  { file: 'time_travel.mp3', startSec: 228.4, volume: 0.14 },
  { file: 'earthquake_rumble.mp3', startSec: 289.7, volume: 0.13 },
  { file: 'cash_register.mp3', startSec: 319.0, volume: 0.16 },
  { file: 'rising_whoosh.mp3', startSec: 347.0, volume: 0.14 },
  { file: 'record_scratch2.mp3', startSec: 373.4, volume: 0.14 },
  { file: 'factory_clank.mp3', startSec: 419.7, volume: 0.14 },
  { file: 'tense_sting.mp3', startSec: 451.2, volume: 0.15 },
  { file: 'crash_sting.mp3', startSec: 502.3, volume: 0.16 },
  { file: 'closing_turn.mp3', startSec: 513.1, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 558.7, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const PorQueNvidiaValeTanto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('por-que-nvidia-vale-tanto.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`por-que-nvidia-vale-tanto-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`por-que-nvidia-vale-tanto-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`por-que-nvidia-vale-tanto/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
