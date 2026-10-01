import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// asml-maquina-mas-importante - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Cada vez que le haces una pregunta a una inteligencia artificial, pasa algo que casi nadie sabe.
  { file: '0_05.jpg', startSec: 5.82 },  // Esa respuesta sale de un chip, y ese chip solo pudo fabricarse gracias a una máquina que únicamente existe en 
  { file: '0_13.jpg', startSec: 13.54 },  // No hay alternativa.
  { file: '0_15.jpg', startSec: 15.18 },  // No hay otra empresa que sepa hacerla.
  { file: '0_17.jpg', startSec: 17.56 },  // Si mañana esa máquina dejará de existir, el avance de la inteligencia artificial separaría en seco.
  { file: '0_23.jpg', startSec: 23.82 },  // Es probablemente la máquina más importante del mundo, y cuesta más que un avión.
  { file: '0_30.jpg', startSec: 30.0 },  // Para entender por qué, hay que empezar por algo muy pequeño.
  { file: '0_34.jpg', startSec: 34.22 },  // Un chip moderno, como los que usa en Vidia para entrenar inteligencias artificiales,
  { file: '0_38.jpg', startSec: 38.9 },  // tiene decenas de miles de millones de transistores.
  { file: '0_42.jpg', startSec: 42.28 },  // Un transistore es básicamente un interruptor diminuto que deja pasar la corriente o la corta,
  { file: '0_47.jpg', startSec: 47.72 },  // encendido o apagado, uno o cero.
  { file: '0_51.jpg', startSec: 51.08 },  // Y para meter tantos interruptores en algo del tamaño de una uña, cada uno tiene que ser absurdamente pequeño.
  { file: '0_57.jpg', startSec: 57.74 },  // Tanto que muchos de sus detalles miden menos que un virus.
  { file: '1_01.jpg', startSec: 61.54 },  // La pregunta es obvia.
  { file: '1_03.jpg', startSec: 63.22 },  // Como demonio se dibuja algo tan pequeño.
  { file: '1_06.jpg', startSec: 66.34 },  // La respuesta es una técnica que se llama litografía, y es más parecida a la fotografía de lo que crees.
  { file: '1_12.jpg', startSec: 72.68 },  // Imagina que tienes un dibujo con el diseño del chip.
  { file: '1_16.jpg', startSec: 76.22 },  // Y lo proyectas con luz sobre una oblea de silicio cubierta de una recina sensible a la luz.
  { file: '1_21.jpg', startSec: 81.82 },  // Donde da la luz, la recina cambia.
  { file: '1_24.jpg', startSec: 84.36 },  // Luego se limpia, se graba, y el dibujo queda impreso en el silicio.
  { file: '1_28.jpg', startSec: 88.66 },  // Capa trascapa, cientos de veces.
  { file: '1_31.jpg', startSec: 91.62 },  // El problema es que la luz tiene un límite.
  { file: '1_34.jpg', startSec: 94.18 },  // No puedes dibujar un detalle más fino que la longitud de onda de la luz que usas,
  { file: '1_38.jpg', startSec: 98.6 },  // igual que no puedes escribirle trapequeña con un rotulador gordo.
  { file: '1_42.jpg', startSec: 102.82 },  // Durante años, la industria usó luz ultravioleta normal,
  { file: '1_46.jpg', startSec: 106.74 },  // y llegó un punto en el que ese rotulador ya era demasiado gordo para seguir haciendo chips más pequeños.
  { file: '1_52.jpg', startSec: 112.26 },  // Y esto no es un detalle técnico sin importancia.
  { file: '1_55.jpg', startSec: 115.4 },  // Es la base de algo que se llama la ley de mur.
  { file: '1_58.jpg', startSec: 118.84 },  // En los años 60, uno de los fundadores de Intel se dio cuenta de que el número de transistores en un chip
  { file: '2_04.jpg', startSec: 124.4 },  // se duplicaba más o menos cada dos años.
  { file: '2_07.jpg', startSec: 127.5 },  // Esa duplicación constante es la razón por la que tu móvil de hoy es más potente
  { file: '2_11.jpg', startSec: 131.64 },  // que los superordenadores de hace unas décadas.
  { file: '2_14.jpg', startSec: 134.56 },  // Pero para que siguiera cumpliéndose, alguien tenía que inventar una forma de dibujar todavía más pequeño.
  { file: '2_20.jpg', startSec: 140.28 },  // Y durante mucho tiempo, nadie sabía cómo.
  { file: '2_24.jpg', startSec: 144.22 },  // La solución era usar una luz con una longitud de onda muchísimo más corta.
  { file: '2_28.jpg', startSec: 148.86 },  // La llaman ultravioleta extrema, EUV por sus siglas en inglés.
  { file: '2_34.jpg', startSec: 154.14 },  // Su longitud de onda es de 13,5 nanómetros,
  { file: '2_37.jpg', startSec: 157.56 },  // unas 14 veces más fina que la luz que se usaba antes.
  { file: '2_41.jpg', startSec: 161.18 },  // Suena sencillo, solo hay que fabricar esa luz y apuntarla.
  { file: '2_45.jpg', startSec: 165.16 },  // Pero aquí empiezan los problemas de verdad,
  { file: '2_47.jpg', startSec: 167.04 },  // porque esa luz es casi imposible de fabricar y todavía más difícil de manejar.
  { file: '2_52.jpg', startSec: 172.48 },  // La luz ultravioleta extrema no existe de forma cómoda en la naturaleza aquí en la tierra,
  { file: '2_57.jpg', startSec: 177.54 },  // y además la absorbe casi todo.
  { file: '3_00.jpg', startSec: 180.06 },  // El aire, el cristal, las lentes, todo.
  { file: '3_04.jpg', startSec: 184.02 },  // Así que la máquina tiene que funcionar en el vacío y no puede usar ni una sola lente.
  { file: '3_09.jpg', startSec: 189.86 },  // Vale, y cómo se fabrica esa luz.
  { file: '3_12.jpg', startSec: 192.46 },  // Aquí viene la parte que parece ciencia ficción.
  { file: '3_15.jpg', startSec: 195.5 },  // Dentro de la máquina hay una boquilla que dispara gotitas de estaño fundido,
  { file: '3_20.jpg', startSec: 200.14 },  // 50.000 gotas por segundo.
  { file: '3_22.jpg', startSec: 202.6 },  // Cada gota, mientras cae, recibe no uno, sino dos disparos de un laser enorme.
  { file: '3_28.jpg', startSec: 208.24 },  // El primero la aplasta como una tortita, el segundo la vaporiza.
  { file: '3_32.jpg', startSec: 212.8 },  // Esa explosión convierte el estaño en un plasma más caliente que la superficie del sol,
  { file: '3_37.jpg', startSec: 217.84 },  // y ese plasma, al brillar, emite justo la luz ultravioleta extrema que necesitan.
  { file: '3_43.jpg', startSec: 223.52 },  // 50.000 veces por segundo.
  { file: '3_46.jpg', startSec: 226.04 },  // Cada segundo, durante horas, sin parar.
  { file: '3_49.jpg', startSec: 229.36 },  // Acertando con un laser a gotas diminutas que van a toda velocidad.
  { file: '3_53.jpg', startSec: 233.98 },  // Solo esta parte de la máquina es ya una de las piezas de ingeniería más difíciles jamás construidas.
  { file: '4_00.jpg', startSec: 240.28 },  // Pero fabricar la luz es sólo la mitad del problema.
  { file: '4_03.jpg', startSec: 243.4 },  // Ahora hay que llevarla hasta el chip sin perderla.
  { file: '4_06.jpg', startSec: 246.74 },  // Como no se pueden usar lentes, la luz seguía con espejos, y no espejos cualquiera.
  { file: '4_11.jpg', startSec: 251.5 },  // Los fabrica la empresa Alemana Cés, y son las superficies más lisas que ha fabricado el ser humano.
  { file: '4_17.jpg', startSec: 257.48 },  // Para que te hagas una idea, si uno de esos espejos fuera del tamaño de un país entero,
  { file: '4_22.jpg', startSec: 262.06 },  // la mayor irregularidad de su superficie no llegaría ni a un milímetro.
  { file: '4_26.jpg', startSec: 266.58 },  // Y aún así, cada espejo refleja sólo una parte de la luz.
  { file: '4_30.jpg', startSec: 270.44 },  // Así que para que llegue suficiente al final del recorrido, todo tiene que estar perfecto.
  { file: '4_35.jpg', startSec: 275.32 },  // Cada espejo, cada ángulo, cada milésima.
  { file: '4_38.jpg', startSec: 278.42 },  // Al final de ese camino, la luz atraviesa el diseño del chip, lo reduce cuatro veces,
  { file: '4_43.jpg', startSec: 283.96 },  // y lo imprime sobre la oblea de silicio con una precisión que da vertigo.
  { file: '4_48.jpg', startSec: 288.48 },  // Y aquí está el dato que convierte todo esto en una historia de poder.
  { file: '4_52.jpg', startSec: 292.74 },  // Solo hay una empresa en el mundo que sabe fabricar estas máquinas.
  { file: '4_56.jpg', startSec: 296.4 },  // Se llama ASMR, y está en un pueblo de los países bajos llamado Belhoven.
  { file: '5_01.jpg', startSec: 301.6 },  // No es que sea la mejor, es que es la única.
  { file: '5_04.jpg', startSec: 304.94 },  // Nadie más en el planeta, vende máquinas de litografía o ultravioleta extrema.
  { file: '5_09.jpg', startSec: 309.66 },  // Cada una cuesta alrededor de 200 millones de dólares, y la versión más nueva,
  { file: '5_14.jpg', startSec: 314.44 },  // la llamada High N.A. ronda los 400 millones.
  { file: '5_18.jpg', startSec: 318.52 },  // Son tan grandes que para enviar una, hacen falta varios aviones de carga y decenas de contenedores.
  { file: '5_23.jpg', startSec: 323.98 },  // Y luego, un equipo de ingenieros tardan meses en montarla en la fábrica del cliente.
  { file: '5_28.jpg', startSec: 328.7 },  // En todo el año 2024, se vendieron sólo 44.
  { file: '5_33.jpg', startSec: 333.78 },  // 44 máquinas para abastecer de chips avanzados a todo el planeta.
  { file: '5_38.jpg', startSec: 338.48 },  // Y que en las compras, muy pocos, prácticamente sólo tres empresas.
  { file: '5_43.jpg', startSec: 343.7 },  // TSMC en Taiwan, Samsung en Corea e Intel en Estados Unidos.
  { file: '5_48.jpg', startSec: 348.72 },  // Y aquí es donde conecta con la inteligencia artificial.
  { file: '5_52.jpg', startSec: 352.24 },  // Los chips con los que se entrenan los grandes modelos de IA, los de Nvidia,
  { file: '5_56.jpg', startSec: 356.52 },  // los fabrica TSMC y los fabrica con máquinas de ASMR.
  { file: '6_01.jpg', startSec: 361.34 },  // Así que la cadena es esta.
  { file: '6_03.jpg', startSec: 363.5 },  // Sin ASMR no hay máquinas, sin máquinas no hay chips avanzados.
  { file: '6_07.jpg', startSec: 367.86 },  // Y sin esos chips no hay chat GPT ni Gemini ni casi nada de lo que hoy llamamos inteligencia artificial.
  { file: '6_14.jpg', startSec: 374.76 },  // Una sola empresa holandesa es, literalmente, un cuello de botella para toda la tecnología del planeta.
  { file: '6_21.jpg', startSec: 381.54 },  // Por eso estas máquinas se han convertido también en un asunto de geopolítica.
  { file: '6_25.jpg', startSec: 385.38 },  // Varios gobiernos occidentales han prohibido venderlas más avanzadas a China.
  { file: '6_31.jpg', startSec: 391.08 },  // La razón es simple, que en no puede comprar estas máquinas,
  { file: '6_34.jpg', startSec: 394.68 },  // no puede fabricar los chips más potentes y se queda atrás en la carrera de la inteligencia artificial.
  { file: '6_40.jpg', startSec: 400.74 },  // Una máquina de fábrica ha pasado a ser, de facto, una pieza de estrategia mundial.
  { file: '6_46.jpg', startSec: 406.48 },  // Y lo más increíble es lo que costó llegar hasta aquí.
  { file: '6_50.jpg', startSec: 410.14 },  // La idea de usar luz ultravioleta extrema para fabricar chips
  { file: '6_53.jpg', startSec: 413.44 },  // se estudiaba ya en los años 90.
  { file: '6_56.jpg', startSec: 416.12 },  // Durante décadas muchos expertos pensaron que nunca funcionaría.
  { file: '7_00.jpg', startSec: 420.16 },  // Era demasiado difícil, demasiado caro, demasiado frágil.
  { file: '7_04.jpg', startSec: 424.58 },  // ASML siguió invertiendo miles de millones durante años
  { file: '7_07.jpg', startSec: 427.9 },  // sin saber si llegaría a vender una sola máquina que funcionara de verdad en una fábrica.
  { file: '7_13.jpg', startSec: 433.48 },  // Tardaron más de 20 años en conseguirlo.
  { file: '7_16.jpg', startSec: 436.3 },  // Y cuando lo lograron, se quedaron solos porque nadie más había aguantado el camino.
  { file: '7_21.jpg', startSec: 441.82 },  // Esa es la ventaja real de ASML,
  { file: '7_24.jpg', startSec: 444.64 },  // no es un secreto guardado en una caja fuerte,
  { file: '7_27.jpg', startSec: 447.28 },  // son miles de piezas y proveedores y décadas de errores ya cometidos
  { file: '7_31.jpg', startSec: 451.42 },  // que nadie puede copiar de prisa.
  { file: '7_34.jpg', startSec: 454.3 },  // Así que la próxima vez que una inteligencia artificial te responda en un segundo,
  { file: '7_38.jpg', startSec: 458.64 },  // piensa en lo que hay detrás.
  { file: '7_40.jpg', startSec: 460.5 },  // Un chip con miles de millones de interruptores,
  { file: '7_43.jpg', startSec: 463.18 },  // una fábrica en Taiwan, una máquina del tamaño de un autobús.
  { file: '7_47.jpg', startSec: 467.22 },  // Y dentro de ella, una gota de estaño que explota 50.000 veces por segundo
  { file: '7_52.jpg', startSec: 472.24 },  // para crear la luz que hace posible todo lo demás.
  { file: '7_56.jpg', startSec: 476.14 },  // La inteligencia artificial parece magia,
  { file: '7_58.jpg', startSec: 478.54 },  // pero empieza en una gota de estaño.
  { file: '8_01.jpg', startSec: 481.16 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día,
  { file: '8_05.jpg', startSec: 485.22 },  // suscríbete.
  { file: '8_06.jpg', startSec: 486.38 },  // Cada semana, una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'tiny_zoom.mp3', startSec: 30.0, volume: 0.14 },
  { file: 'projector_click.mp3', startSec: 66.3, volume: 0.15 },
  { file: 'rising_graph.mp3', startSec: 112.3, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 144.2, volume: 0.16 },
  { file: 'scifi_sting.mp3', startSec: 189.9, volume: 0.16 },
  { file: 'laser_zap.mp3', startSec: 202.6, volume: 0.17 },
  { file: 'mirror_shimmer.mp3', startSec: 246.7, volume: 0.14 },
  { file: 'power_sting.mp3', startSec: 288.5, volume: 0.17 },
  { file: 'money_chime.mp3', startSec: 309.7, volume: 0.16 },
  { file: 'chain_clank.mp3', startSec: 361.3, volume: 0.15 },
  { file: 'tense_transition.mp3', startSec: 381.5, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 454.3, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 485.2, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const AsmlMaquinaMasImportante: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('asml-maquina-mas-importante.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`asml-maquina-mas-importante-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`asml-maquina-mas-importante-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`asml-maquina-mas-importante/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
