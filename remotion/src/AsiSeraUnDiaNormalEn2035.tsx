import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// asi-sera-un-dia-normal-en-2035 - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // son las siete de la mañana de un martes de 2035.
  { file: '0_03.jpg', startSec: 3.5 },  // ¿Tu casa ya está caliente?
  { file: '0_05.jpg', startSec: 5.1 },  // ¡Y ya no tienes caldera! Abajo te espera un taxi,
  { file: '0_08.jpg', startSec: 8.24 },  // sin nadie al volante.
  { file: '0_09.jpg', startSec: 9.62 },  // ¿Ciencia ficción?
  { file: '0_10.jpg', startSec: 10.68 },  // ¡No!
  { file: '0_11.jpg', startSec: 11.3 },  // Las diez cosas de este día ya se están construyendo.
  { file: '0_14.jpg', startSec: 14.5 },  // ¿Van a llegar todas?
  { file: '0_15.jpg', startSec: 15.82 },  // ¡No! Algunas lo tienen muy difícil.
  { file: '0_18.jpg', startSec: 18.36 },  // Cada hora lleva a su beré dicto. Y una ya tuvo fecha, para dentro de un año.
  { file: '0_23.jpg', startSec: 23.18 },  // ¿Han pasado siete?
  { file: '0_24.jpg', startSec: 24.46 },  // ¿A divinas cuál?
  { file: '0_25.jpg', startSec: 25.48 },  // ¡La siete de la mañana!
  { file: '0_26.jpg', startSec: 26.92 },  // ¡El despertar!
  { file: '0_28.jpg', startSec: 28.02 },  // Te calienta una bomba de calor. Y la luz sale de las placas del tejado. Esto ya tiene ley. Según la directiva 
  { file: '0_45.jpg', startSec: 45.74 },  // Lo que puede fallar. España debía adaptarla antes de junio. Y en mayo iba por el 60%. La casa de futuro ya se 
  { file: '0_55.jpg', startSec: 55.84 },  // ¡La siete y media!
  { file: '0_57.jpg', startSec: 57.1 },  // ¡El desayuno! ¡Un taspate en la tostada! Y ese pato nunca existió. Salió de células cultivadas.
  { file: '1_03.jpg', startSec: 63.22 },  // Esto ya se vende.
  { file: '1_04.jpg', startSec: 64.56 },  // Singapura provó la carne cultivada en 2020.
  { file: '1_07.jpg', startSec: 67.28 },  // Estados Unidos en 2023.
  { file: '1_09.jpg', startSec: 69.5 },  // Y en San Sebastián Bayotec Futs empezó a construir una planta para mil toneladas al año.
  { file: '1_14.jpg', startSec: 74.58 },  // Veré dicto. ¡Fuera ya existe!
  { file: '1_16.jpg', startSec: 76.74 },  // En España,
  { file: '1_17.jpg', startSec: 77.6 },  // dudoso.
  { file: '1_18.jpg', startSec: 78.36 },  // Lo que puede fallar. Italia la prohivió por ley. Y la Unión Europea aún no ha aprobado ninguna.
  { file: '1_23.jpg', startSec: 83.92 },  // La carne del futuro ya existe. Lo difícil es que te dejen comprarla. ¡Las ocho y cuarto!
  { file: '1_29.jpg', startSec: 89.48 },  // ¡El trayecto! Te subes al taxi y el volante gira solo. Esto ya pasa.
  { file: '1_34.jpg', startSec: 94.5 },  // Waymo, la empresa hermana de Google, circula sin conductor en más de 10 ciudades de Estados Unidos.
  { file: '1_39.jpg', startSec: 99.58 },  // A principios de este año daba unos 500 mil viajes de pago a la semana.
  { file: '1_43.jpg', startSec: 103.52 },  // Veré dicto. ¡Aye ya existe!
  { file: '1_45.jpg', startSec: 105.6 },  // En Europa lo prometen. Su primera ciudad será Londres.
  { file: '1_49.jpg', startSec: 109.04 },  // Lo que puede fallar. Para España, Waymo no ha dado ninguna fecha. El coche sin conductor ya existe,
  { file: '1_54.jpg', startSec: 114.98 },  // solo que vive en otro continente.
  { file: '1_57.jpg', startSec: 117.02 },  // ¡Las nueve de la mañana!
  { file: '1_58.jpg', startSec: 118.44 },  // ¡El trabajo!
  { file: '1_59.jpg', startSec: 119.36 },  // Tu agente de inteligencia artificial ya ha contestado los correos y ha hecho el informe. Según el laboratorio 
  { file: '2_13.jpg', startSec: 133.58 },  // Veré dicto. Lo prometen. Y la tendencia les da la razón.
  { file: '2_17.jpg', startSec: 137.5 },  // Lo que puede fallar. Esas tareas las cierta la mitad de las veces.
  { file: '2_21.jpg', startSec: 141.52 },  // La otra mitad hay que repasarla. Tu compañero de mesa puede ser un programa y tú, el que le corriga los debere
  { file: '2_29.jpg', startSec: 149.24 },  // El médico.
  { file: '2_30.jpg', startSec: 150.06 },  // Tu madre se hace una mamografía.
  { file: '2_32.jpg', startSec: 152.1 },  // Antes que el radiólogo, la mira una inteligencia artificial. Esto ya funciona.
  { file: '2_36.jpg', startSec: 156.68 },  // En su écie a un ensayo con más de 100 .000 mujeres lo probó. Se encontraron un 29 % más de cánceres y los radi
  { file: '2_46.jpg', startSec: 166.16 },  // Veré dicto. Ya existe. Lo que puede fallar. Encontrar más cánceres aún no demuestra que mueran menos personas.
  { file: '2_53.jpg', startSec: 173.22 },  // La máquina ya está en la consulta y el médico sigue firmando. La una del mediodía.
  { file: '2_58.jpg', startSec: 178.5 },  // La compra.
  { file: '2_59.jpg', startSec: 179.3 },  // Te falta leche.
  { file: '3_00.jpg', startSec: 180.38 },  // Y un dron te la dejan el jardín.
  { file: '3_02.jpg', startSec: 182.22 },  // Esto ya pasa en Texas.
  { file: '3_04.jpg', startSec: 184.18 },  // Wing de la familia de Google reparte con drones para los supermercados Walmart.
  { file: '3_08.jpg', startSec: 188.5 },  // En 2027 quieren llegar a más de 40 millones de personas.
  { file: '3_12.jpg', startSec: 192.36 },  // Veré dicto. Ya existe.
  { file: '3_14.jpg', startSec: 194.34 },  // Lo que puede fallar. Cada dron carga poco más de 2 kilos y en un piso de Madrid,
  { file: '3_19.jpg', startSec: 199.0 },  // donde aterrisa.
  { file: '3_20.jpg', startSec: 200.02 },  // El repartidor del futuro vuela, pero necesita un patio.
  { file: '3_23.jpg', startSec: 203.66 },  // Y ahora vienen las que más cuestan. Las 4 de la tarde.
  { file: '3_27.jpg', startSec: 207.28 },  // El dinero.
  { file: '3_28.jpg', startSec: 208.18 },  // Vágas el café con euros digitales desde el móvil y hasta sin cobertura.
  { file: '3_32.jpg', startSec: 212.48 },  // Esto tiene fecha. El Banco Central Europeo quiere emitirlo en 2019.
  { file: '3_36.jpg', startSec: 216.88 },  // En julio el Parlamento Europeo votó abrir la negociación y el ponente es español.
  { file: '3_41.jpg', startSec: 221.5 },  // Fernando Navarrete.
  { file: '3_42.jpg', startSec: 222.86 },  // Veré dicto. Lo prometen. Y con fecha. Lo que puede fallar. Esa fecha exige a probar la ley este año. Si se ret
  { file: '3_51.jpg', startSec: 231.72 },  // El dinero del futuro ya tiene calendario. Le falta la ley.
  { file: '3_55.jpg', startSec: 235.22 },  // La 6 de la tarde.
  { file: '3_56.jpg', startSec: 236.58 },  // El ocio.
  { file: '3_57.jpg', startSec: 237.48 },  // Llevas gafas con pantalla y contestas mensajes moviendo los dedos. Esto ya se vende. Las gafas reivan con pant
  { file: '4_10.jpg', startSec: 250.5 },  // Por 899 euros.
  { file: '4_12.jpg', startSec: 252.56 },  // Veré dicto. Ya existe,
  { file: '4_14.jpg', startSec: 254.36 },  // pero en España aún sin fecha. Lo que puede fallar. Una cámara en la cara de cada persona y una lucecita como u
  { file: '4_25.jpg', startSec: 265.08 },  // Las 8 de la tarde.
  { file: '4_26.jpg', startSec: 266.52 },  // La casa.
  { file: '4_27.jpg', startSec: 267.32 },  // Un robot con forma de persona te ha doblado la ropa. Esto ya se fabrica. La empresa Wannex vende su robotneo p
  { file: '4_38.jpg', startSec: 278.08 },  // Pero aquí viene lo raro. Cuando Neo no sabe hacer algo, lo maneja distancia un empleado, viendo tu casa.
  { file: '4_44.jpg', startSec: 284.58 },  // Veré dicto. Lo prometen. Que lo haga todo solo es dudoso. Lo que puede fallar. Tu intimidad.
  { file: '4_50.jpg', startSec: 290.98 },  // Esa robot puede tener a un desconocido detrás. El robot de casa ya existe,
  { file: '4_55.jpg', startSec: 295.42 },  // le falta aprender solo.
  { file: '4_56.jpg', startSec: 296.94 },  // La 11 de la noche.
  { file: '4_58.jpg', startSec: 298.42 },  // La cama.
  { file: '4_59.jpg', startSec: 299.22 },  // Escribes un mensaje sin tocar el móvil. Solo compensarlo. Esto ya pasa en ensayos. Neuralink, la empresa de El
  { file: '5_14.jpg', startSec: 314.36 },  // Veré dicto. En ensayo existe.
  { file: '5_16.jpg', startSec: 316.78 },  // Para alguien sano,
  { file: '5_18.jpg', startSec: 318.0 },  // dudoso.
  { file: '5_19.jpg', startSec: 318.76 },  // Lo que puede fallar. Al primer paciente se le saltaron parte de los hilos del implante. Escribir con la mente 
  { file: '5_27.jpg', startSec: 327.72 },  // Volvamos a la pregunta.
  { file: '5_29.jpg', startSec: 329.16 },  // ¿Cuál falló su fecha?
  { file: '5_30.jpg', startSec: 330.5 },  // El taxi sin conductor.
  { file: '5_32.jpg', startSec: 332.04 },  // El detesla. En 2019 Elon Musk prometió más de un millón de robotaxis para el año siguiente. Al acabar 2025 en 
  { file: '5_39.jpg', startSec: 339.96 },  // circulaban unos 30.
  { file: '5_41.jpg', startSec: 341.24 },  // Y aquí está lo curioso. Esa promesa fallida es una de las que ya existen. Voyngo la cumple cada semana.
  { file: '5_47.jpg', startSec: 347.54 },  // ¿Y tú? ¿Cuál de las 10 crees que llega antes a España?
  { file: '5_50.jpg', startSec: 350.54 },  // Teleon los comentarios.
  { file: '5_51.jpg', startSec: 351.96 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete. Cada semana una máqu
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 24.46, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 25.48, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 55.84, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 89.48, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 117.02, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 149.24, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 178.5, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 207.28, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 235.22, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 265.08, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 296.94, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 327.72, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 351.96, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.0;

export const AsiSeraUnDiaNormalEn2035: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('asi-sera-un-dia-normal-en-2035.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`asi-sera-un-dia-normal-en-2035-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`asi-sera-un-dia-normal-en-2035-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`asi-sera-un-dia-normal-en-2035/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
