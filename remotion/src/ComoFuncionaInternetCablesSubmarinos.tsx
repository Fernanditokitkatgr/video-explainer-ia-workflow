import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// como-funciona-internet-cables-submarinos - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Seguramente, piensas que internet está en el aire, que viaja por el guici o que vive en algún lugar llamado la
  { file: '0_06.jpg', startSec: 6.46 },  // Pues no, internet no está en el aire, tampoco está en la nube, está en el fondo del mar.
  { file: '0_12.jpg', startSec: 12.6 },  // En cables del grosor de una manguera tirado sobre el lecho del océano a miles de metros de profundidad.
  { file: '0_18.jpg', startSec: 18.92 },  // Hoy vamos a seguir el viaje de un solo clic, desde tu sofá hasta el fondo del océano y de vuelta en menos de l
  { file: '0_27.jpg', startSec: 27.02 },  // Empecemos por el principio.
  { file: '0_28.jpg', startSec: 28.74 },  // Tocas un enlace para abrir una web.
  { file: '0_31.jpg', startSec: 31.18 },  // Esa web no está en tu móvil, está guardada en un ordenador que puede estar en otro continente.
  { file: '0_36.jpg', startSec: 36.44 },  // Así que tu móvil tiene que pedirsela y para entender cómo imagina que internet es un enorme servicio de correo
  { file: '0_42.jpg', startSec: 42.96 },  // Tu petición no viaja de una pieza, se corta entre citos pequeños, llamados paquetes.
  { file: '0_48.jpg', startSec: 48.12 },  // Cada paquete es como un sobre, y cada sobre lleva escrito donde tiene que ir y de dónde viene.
  { file: '0_53.jpg', startSec: 53.6 },  // Igual que una carta lleva la dirección del destinatario y el remite.
  { file: '0_57.jpg', startSec: 57.46 },  // En internet esa dirección se llama Dirección IP.
  { file: '1_00.jpg', startSec: 60.98 },  // Es un número que identifica a cada aparato conectado.
  { file: '1_04.jpg', startSec: 64.1 },  // Tu router tiene una, el servidor de la web, otra.
  { file: '1_07.jpg', startSec: 67.5 },  // Pero aquí hay un problema, tú no escribes números, tú escribes nombres, como el de una tienda o un periódico.
  { file: '1_13.jpg', startSec: 73.88 },  // Para traducirlos existe el DNS, es la agenda de contactos de internet.
  { file: '1_18.jpg', startSec: 78.74 },  // Tu móvil pregunta cuál es el número de esa web y un servidor DNS le responde con su dirección IP.
  { file: '1_24.jpg', startSec: 84.74 },  // Con la dirección ya en el sobre, los paquetes salen de casa.
  { file: '1_28.jpg', startSec: 88.56 },  // Primero por el wifi, que solo recorre los últimos metros hasta tu router.
  { file: '1_32.jpg', startSec: 92.66 },  // Y del router al mundo exterior, casi siempre por un cable, nada de aire.
  { file: '1_37.jpg', startSec: 97.18 },  // Desde ahí los paquetes van saltando de router en router.
  { file: '1_40.jpg', startSec: 100.24 },  // Cada router es como una oficina de reparto.
  { file: '1_42.jpg', startSec: 102.72 },  // No conoce el camino completo, solo mira la dirección del sobre y decide cuál es la siguiente oficina más cerca
  { file: '1_49.jpg', startSec: 109.66 },  // Salto a salto, en unas pocas decenas de pasos, el paquete puede cruzar medio planeta.
  { file: '1_55.jpg', startSec: 115.02 },  // Y lo más curioso es que cada paquete puede ir por un camino distinto,
  { file: '1_58.jpg', startSec: 118.86 },  // algunos se pierden por el camino.
  { file: '2_00.jpg', startSec: 120.56 },  // No pasa nada, a llegar los paquetes se vuelven a ordenar como un puzzle,
  { file: '2_04.jpg', startSec: 124.68 },  // y si falta alguna pieza, se pide otra vez.
  { file: '2_07.jpg', startSec: 127.74 },  // Gracias a eso, internet no depende de un único camino,
  { file: '2_10.jpg', startSec: 130.96 },  // si una ruta se rompe, los paquetes buscan otra.
  { file: '2_14.jpg', startSec: 134.26 },  // Y a donde llegan esos paquetes, a un centro de datos.
  { file: '2_17.jpg', startSec: 137.72 },  // Un centro de datos es una nave enorme llena de ordenadores apilados en armarios, filas y filas.
  { file: '2_23.jpg', startSec: 143.48 },  // Algunos son del tamaño de varios campos de fútbol.
  { file: '2_26.jpg', startSec: 146.34 },  // Y aquí viene la verdad incómoda, la famosa nube no existe.
  { file: '2_30.jpg', startSec: 150.38 },  // La nube es simplemente el ordenador de otra persona.
  { file: '2_34.jpg', startSec: 154.1 },  // Tus fotos, tus correos y tus series están guardados en discos duros de verdad dentro de naves como ésta.
  { file: '2_40.jpg', startSec: 160.22 },  // Y el problema es que muchas de esas naves están muy lejos de ti, a veces al otro nado del océano.
  { file: '2_46.jpg', startSec: 166.26 },  // Así que los paquetes tienen que cruzar el mar.
  { file: '2_48.jpg', startSec: 168.74 },  // ¿Cómo? Con luz.
  { file: '2_50.jpg', startSec: 170.3 },  // Los cables de internet de larga distancia no llevan electricidad con los datos, llevan fibra óptica.
  { file: '2_56.jpg', startSec: 176.2 },  // Una fibra óptica es un hilo de vidrio purísimo, más o menos tan fino como un pelo.
  { file: '3_01.jpg', startSec: 181.26 },  // Por dentro viajan pulsos de luz laser.
  { file: '3_03.jpg', startSec: 183.74 },  // Luz encendida es un uno, luz apagada es un cero.
  { file: '3_07.jpg', startSec: 187.18 },  // Miles de millones de veces por segundo.
  { file: '3_09.jpg', startSec: 189.8 },  // La luz no se escapa porque rebota contra las paredes del hilo, como un tobogán de espejos.
  { file: '3_14.jpg', startSec: 194.92 },  // Y aún hay más.
  { file: '3_16.jpg', startSec: 196.4 },  // Por la misma fibra pueden viajar muchos colores de luz a la vez, cada uno con su propia conversación,
  { file: '3_22.jpg', startSec: 202.02 },  // como varios carriles invisibles dentro de un pelo de vidrio.
  { file: '3_25.jpg', startSec: 205.7 },  // Ahora sí, bajamos al fondo del mar.
  { file: '3_28.jpg', startSec: 208.34 },  // Hay más de 500 cables submarinos repartidos por el planeta,
  { file: '3_32.jpg', startSec: 212.06 },  // juntos suman más de un millón de kilómetros.
  { file: '3_34.jpg', startSec: 214.82 },  // Con eso se podría dar la vuelta a la tierra de cenas de veces.
  { file: '3_38.jpg', startSec: 218.42 },  // Y por ellos pasa prácticamente todo el tráfico de internet entre continentes.
  { file: '3_42.jpg', startSec: 222.8 },  // Se suele decir que alrededor del 99%.
  { file: '3_46.jpg', startSec: 226.0 },  // Los atélites existen, sí, pero ni de lejos pueden mover tantos datos como los cables.
  { file: '3_51.jpg', startSec: 231.54 },  // Los sorprendentes es lo poco que abultan.
  { file: '3_54.jpg', startSec: 234.18 },  // En las zonas profundas, un cable submarino tiene más o menos el grosor de una manguera de jardín.
  { file: '3_59.jpg', startSec: 239.68 },  // En el centro van unas pocas fibras, alrededor al ámbres de acero,
  { file: '4_03.jpg', startSec: 243.6 },  // cobre y una funda de plástico.
  { file: '4_05.jpg', startSec: 245.92 },  // Cerca de la costa se hacen más gruesos y se entierran bajo la arena.
  { file: '4_09.jpg', startSec: 249.0 },  // Ahí corren más peligro en el fondo del océano, en cambio,
  { file: '4_13.jpg', startSec: 253.5 },  // simplemente descansan sobre el lecho marino en la oscuridad total.
  { file: '4_18.jpg', startSec: 258.2 },  // Y cómo se pone un cable al otro lado del océano?
  { file: '4_21.jpg', startSec: 261.2 },  // Con un barco, hay barcos especiales que cargan miles de kilómetros de cable enrollado.
  { file: '4_26.jpg', startSec: 266.28 },  // El barco avanza despacio y va soltando el cable por la popa,
  { file: '4_29.jpg', startSec: 269.72 },  // siguiendo un mapa del fondo marino para esquivar montañas submarinas.
  { file: '4_33.jpg', startSec: 273.7 },  // Pero hay un detalle.
  { file: '4_35.jpg', startSec: 275.28 },  // La luz se va debilitando a medida que avanza por el vidrio.
  { file: '4_38.jpg', startSec: 278.66 },  // Por eso, cada cierto número de kilómetros, el cable lleva a un repetidor,
  { file: '4_43.jpg', startSec: 283.04 },  // un aparato que recoge la luz cansada y la vuelve a amplificar.
  { file: '4_46.jpg', startSec: 286.74 },  // Para eso sirve el cobre, lleva desde la costa la electricidad que alimenta esos repetidores.
  { file: '4_52.jpg', startSec: 292.26 },  // Ahora una historia que parece un chiste, los tiburones.
  { file: '4_55.jpg', startSec: 295.8 },  // Hay vídeos de tiburones mordiendo cables submarinos,
  { file: '4_58.jpg', startSec: 298.96 },  // se cree que les atraen los campos eléctricos que emiten.
  { file: '5_02.jpg', startSec: 302.18 },  // Pero los tiburones son una causa anectótica,
  { file: '5_04.jpg', startSec: 304.24 },  // el verdadero enemigo de los cables está en la superficie.
  { file: '5_08.jpg', startSec: 308.08 },  // Son las anclas de los barcos y las redes de pesca de arrastre.
  { file: '5_11.jpg', startSec: 311.9 },  // Detrás de la mayoría de las abierías hay un accidente humano.
  { file: '5_15.jpg', startSec: 315.62 },  // Cada año se produce en más de 100 abierías en cables submarinos y casi nadie se entera.
  { file: '5_20.jpg', startSec: 320.74 },  // ¿Por qué no nos enteramos?
  { file: '5_22.jpg', startSec: 322.52 },  // Porque la red está pensada para eso.
  { file: '5_24.jpg', startSec: 324.8 },  // Cada país importante está conectado por varios cables.
  { file: '5_27.jpg', startSec: 327.84 },  // Si uno se rompe, los paquetes simplemente se desvían por otros, como hacían con los routers.
  { file: '5_32.jpg', startSec: 332.96 },  // Mientras tanto sale un barco de reparación, pesca el cable con un gancho,
  { file: '5_37.jpg', startSec: 337.16 },  // lo sube a cubierta y empalma las fibras.
  { file: '5_39.jpg', startSec: 339.82 },  // Pero cuando un lugar depende de un solo cable, la cosa cambia.
  { file: '5_43.jpg', startSec: 343.88 },  // En enero de 2022, la erupción de un volcán submarino en Tonga
  { file: '5_47.jpg', startSec: 347.74 },  // rompió el único cable que conectaba las islas con el resto del mundo.
  { file: '5_52.jpg', startSec: 352.02 },  // El país se quedó prácticamente desconectado durante semanas,
  { file: '5_55.jpg', startSec: 355.32 },  // justo cuando más necesitaba pedir ayuda.
  { file: '5_58.jpg', startSec: 358.18 },  // Y ahora el otro extremo del cable, donde sale del mar.
  { file: '6_02.jpg', startSec: 362.14 },  // En unos edificios discretos cerca de la playa que se llaman estaciones de amarre.
  { file: '6_07.jpg', startSec: 367.18 },  // España es un punto clave.
  { file: '6_09.jpg', startSec: 369.04 },  // Por su posición, aquí llegan cables que vienen de América, de África y del Mediterráneo.
  { file: '6_14.jpg', startSec: 374.14 },  // Uno de los más conocidos se llama marea,
  { file: '6_17.jpg', startSec: 377.1 },  // cruza el Atlántico desde Virginia en Estados Unidos
  { file: '6_19.jpg', startSec: 379.58 },  // y sale del mar en la costa de bizcaya cerca de Bilbao.
  { file: '6_23.jpg', startSec: 383.56 },  // Vale, si todo viaja a la velocidad de la luz,
  { file: '6_25.jpg', startSec: 385.8 },  // ¿por qué a veces internet valento?
  { file: '6_28.jpg', startSec: 388.56 },  // Por una cosa que se llama latencia.
  { file: '6_31.jpg', startSec: 391.2 },  // Es el tiempo que tarda un paquete en ir y volver.
  { file: '6_34.jpg', startSec: 394.2 },  // Dentro del vidrio, la luz no va a su velocidad máxima,
  { file: '6_37.jpg', startSec: 397.62 },  // va más o menos a 200.000 kilómetros por segundo.
  { file: '6_40.jpg', startSec: 400.88 },  // Parece infinito, pero cruzar el Atlántico,
  { file: '6_43.jpg', startSec: 403.8 },  // ir y volver, ya se come varias decenas de milisegundos
  { file: '6_46.jpg', startSec: 406.74 },  // y cada rúter añade un poco más.
  { file: '6_49.jpg', startSec: 409.76 },  // Con los atélites clásicos, es peor,
  { file: '6_52.jpg', startSec: 412.14 },  // están a unos 36.000 kilómetros de altura
  { file: '6_54.jpg', startSec: 414.64 },  // y un viaje de hída y vuelta puede tardar más de medio segundo.
  { file: '6_58.jpg', startSec: 418.88 },  // Por eso las grandes plataformas guardan copias de sus vídeos
  { file: '7_01.jpg', startSec: 421.76 },  // en centros de datos cerca de ti.
  { file: '7_04.jpg', startSec: 424.08 },  // Cuanto más corto el viaje, más rápido llega.
  { file: '7_07.jpg', startSec: 427.54 },  // Y aquí es donde todo esto conecta con la inteligencia artificial.
  { file: '7_11.jpg', startSec: 431.58 },  // Una inteligencia artificial moderna se entrena en centros de datos gigantescos
  { file: '7_15.jpg', startSec: 435.86 },  // con miles de tarjetas gráficas trabajando la vez.
  { file: '7_19.jpg', startSec: 439.56 },  // Esas máquinas intercambian cantidades enormes de datos todo el rato
  { file: '7_23.jpg', startSec: 443.16 },  // y cuando usas una hía desde tu móvil,
  { file: '7_25.jpg', startSec: 445.78 },  // tu pregunta hace el mismo viaje que cualquier web.
  { file: '7_29.jpg', startSec: 449.12 },  // Por eso las grandes tecnológicas ya no sólo alquilan sitio en los cables,
  { file: '7_33.jpg', startSec: 453.1 },  // ahora pagan los suyos propios.
  { file: '7_35.jpg', startSec: 455.6 },  // La inteligencia artificial parece algo etéreo, casi mágico,
  { file: '7_39.jpg', startSec: 459.3 },  // pero depende de naves llenas de ordenadores, de hilos de vidrio
  { file: '7_42.jpg', startSec: 462.54 },  // y de barco soltando cable en mitad del océano.
  { file: '7_45.jpg', startSec: 465.86 },  // Así que la próxima vez que abrazuna web,
  { file: '7_48.jpg', startSec: 468.28 },  // piensan el viaje que acaba de hacer tu clic.
  { file: '7_51.jpg', startSec: 471.14 },  // Se ha cortado en paquetes, ha preguntado una dirección en la agenda de Internet,
  { file: '7_55.jpg', startSec: 475.92 },  // ha saltado de router en router,
  { file: '7_58.jpg', startSec: 478.08 },  // ha viajado convertido en luz por un hilo de vidrio tan fino como un pelo,
  { file: '8_02.jpg', startSec: 482.08 },  // ha cruzado el océano y ha vuelto,
  { file: '8_04.jpg', startSec: 484.6 },  // en menos de lo que tarda se emparpadear.
  { file: '8_07.jpg', startSec: 487.24 },  // Internet no está en el aire, ni en la nube, está en el fondo del mar.
  { file: '8_12.jpg', startSec: 492.24 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día,
  { file: '8_16.jpg', startSec: 496.02 },  // suscríbete. Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'underwater_bubbles.mp3', startSec: 6.5, volume: 0.15 },
  { file: 'click.mp3', startSec: 28.7, volume: 0.16 },
  { file: 'paper_swish.mp3', startSec: 43.0, volume: 0.14 },
  { file: 'contacts_blip.mp3', startSec: 73.9, volume: 0.13 },
  { file: 'hop_blips.mp3', startSec: 97.2, volume: 0.13 },
  { file: 'reveal_chime.mp3', startSec: 146.3, volume: 0.16 },
  { file: 'light_whoosh.mp3', startSec: 168.7, volume: 0.15 },
  { file: 'deep_dive.mp3', startSec: 205.7, volume: 0.15 },
  { file: 'ship_horn.mp3', startSec: 261.2, volume: 0.14 },
  { file: 'shark_sting.mp3', startSec: 292.3, volume: 0.15 },
  { file: 'anchor_clank.mp3', startSec: 308.1, volume: 0.15 },
  { file: 'volcano_rumble.mp3', startSec: 343.9, volume: 0.14 },
  { file: 'tick_tock.mp3', startSec: 388.6, volume: 0.13 },
  { file: 'scifi_sting.mp3', startSec: 427.5, volume: 0.16 },
  { file: 'closing_turn.mp3', startSec: 487.2, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 492.2, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ComoFuncionaInternetCablesSubmarinos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('como-funciona-internet-cables-submarinos.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`como-funciona-internet-cables-submarinos-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`como-funciona-internet-cables-submarinos-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`como-funciona-internet-cables-submarinos/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
