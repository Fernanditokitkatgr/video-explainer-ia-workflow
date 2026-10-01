import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-hace-analista-soc - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Ya te conté que hace un red team,
  { file: '0_02.jpg', startSec: 2.28 },  // gente a la que pagan por intentar entrar donde no deberían.
  { file: '0_05.jpg', startSec: 5.36 },  // Hoy toca el otro lado, el equipo que está ahí para que no entren de verdad.
  { file: '0_09.jpg', startSec: 9.94 },  // El analista SOC.
  { file: '0_11.jpg', startSec: 11.96 },  // Y aquí va el primer dato que sorprende,
  { file: '0_14.jpg', startSec: 14.36 },  // analista SOC no es un trabajo,
  { file: '0_16.jpg', startSec: 16.76 },  // son tres, muy distintos entre sí.
  { file: '0_19.jpg', startSec: 19.6 },  // Imagina el cuarto de seguridad de un centro comercial gigante,
  { file: '0_23.jpg', startSec: 23.32 },  // miles de cámaras encendidas a la vez, cada una con su propia alarma. Ese cuarto de seguridad para una empresa 
  { file: '0_31.jpg', startSec: 31.42 },  // Security Operation Center, y casi todas esas alarmas la inmensa mayoría no significan nada,
  { file: '0_37.jpg', startSec: 37.86 },  // son ruido.
  { file: '0_39.jpg', startSec: 39.3 },  // El trabajo del analista SOC es separar esas falsas alarmas de la única que se importa.
  { file: '0_44.jpg', startSec: 44.56 },  // Vamos con los tres niveles, porque el día a día cambia radicalmente en cada uno.
  { file: '0_49.jpg', startSec: 49.48 },  // El nivel uno es quien mira las cámaras primero.
  { file: '0_52.jpg', startSec: 52.4 },  // Recibe la alerta en bruto,
  { file: '0_54.jpg', startSec: 54.18 },  // deciden minuto si es real o si es ruido, y si es real la pasa hacia arriba.
  { file: '0_59.jpg', startSec: 59.22 },  // Es el trabajo de entrada más habitual y también el más agotador porque el volumen es brutal.
  { file: '1_04.jpg', startSec: 64.94 },  // Un equipo puede recibir miles de alertas al día y la mayoría, más de seis de cada diez, acaban siendo falsas a
  { file: '1_13.jpg', startSec: 73.44 },  // A eso se le llama fatiga de alertas y es el problema número uno de este trabajo, no técnico, humano.
  { file: '1_20.jpg', startSec: 80.32 },  // El nivel dos es quien investiga de verdad lo que el nivel uno le pasa.
  { file: '1_24.jpg', startSec: 84.64 },  // Aquí ya no se trata de mirar una alerta suelta,
  { file: '1_27.jpg', startSec: 87.36 },  // sino de reconstruir la historia completa.
  { file: '1_30.jpg', startSec: 90.0 },  // Que máquina se vio afectada, que hizo el atacante después de entrar, hasta donde llegó.
  { file: '1_35.jpg', startSec: 95.24 },  // Es trabajo de detective, cruzar registros de decenas de sistemas distintos para armar un relato coherente.
  { file: '1_41.jpg', startSec: 101.92 },  // Y el nivel tres es quien lidera cuando la cosa ya es seria de verdad. Caza amenazas de forma proactiva, sin es
  { file: '1_50.jpg', startSec: 110.7 },  // Y cuando hay un incidente grande,
  { file: '1_52.jpg', startSec: 112.66 },  // es quien dirige la respuesta completa, quien avisa a quien, que se apaga, que se aísla.
  { file: '1_58.jpg', startSec: 118.06 },  // Tres trabajos, tres ritmos, tres tipos de estrés completamente distintos,
  { file: '2_02.jpg', startSec: 122.72 },  // todos bajo el mismo título.
  { file: '2_04.jpg', startSec: 124.64 },  // Y hay un matiz importante entre nivel uno y nivel dos que mucha gente no capta.
  { file: '2_09.jpg', startSec: 129.7 },  // El nivel uno trabaja casi siempre solo con lo que ve en pantalla en el momento.
  { file: '2_14.jpg', startSec: 134.34 },  // El nivel dos tiene permiso para parar, pedir más contexto y tardar horas en una sola alerta si hace falta.
  { file: '2_21.jpg', startSec: 141.0 },  // Esa diferencia de ritmo es la razón por la que mucha gente quema en nivel uno y no en nivel dos,
  { file: '2_26.jpg', startSec: 146.1 },  // no es que el trabajo sea más fácil arriba,
  { file: '2_28.jpg', startSec: 148.48 },  // es que el reloj deja de presionar tanto.
  { file: '2_31.jpg', startSec: 151.5 },  // Vamos con un ejemplo real de cómo se ve esa fatiga de alertas en la práctica.
  { file: '2_36.jpg', startSec: 156.52 },  // Una analista de nivel uno lleva tres horas de turno.
  { file: '2_39.jpg', startSec: 159.46 },  // A revisado 40 alertas, 37 eran ruido.
  { file: '2_43.jpg', startSec: 163.22 },  // La alerta 41 también parece ruido, se parece a las otras 37,
  { file: '2_48.jpg', startSec: 168.08 },  // pero esta vez no lo es.
  { file: '2_50.jpg', startSec: 170.22 },  // Y si el analista está agotado, entrenado por horas de falsos positivos a ignorar ese patrón, se le puede pasar
  { file: '2_57.jpg', startSec: 177.18 },  // Ese momento exacto, la alerta número 41 es literalmente el trabajo,
  { file: '3_02.jpg', startSec: 182.68 },  // todo lo demás es filtro.
  { file: '3_04.jpg', startSec: 184.64 },  // Y aquí hay una herramienta que hay que nombrar si hablamos de este puesto.
  { file: '3_08.jpg', startSec: 188.62 },  // El SIEM, el ferebro del SOC, el sistema que recoge y cruza los registros de medio sistema informático de la em
  { file: '3_16.jpg', startSec: 196.84 },  // Sin él, cada alerta sería un dato suelto sin contexto.
  { file: '3_20.jpg', startSec: 200.32 },  // Con él,
  { file: '3_21.jpg', startSec: 201.08 },  // una analista puede ver que tres alertas pequeñas en tres sistemas distintos son en realidad del mismo ataque.
  { file: '3_27.jpg', startSec: 207.44 },  // Saber usar bien un SIEM, no sólo mirarlo, es gran parte de lo que separa un analista junior de uno que ya sabe
  { file: '3_35.jpg', startSec: 215.0 },  // Y hay un segundo tipo de herramienta que cada vez pesa más, los manuales de respuesta.
  { file: '3_40.jpg', startSec: 220.04 },  // Listas de pasos ya escritos para cuando pasa algo concreto.
  { file: '3_43.jpg', startSec: 223.88 },  // Cuando salta cierto tipo de alerta, el analista no improvisa desde cero,
  { file: '3_48.jpg', startSec: 228.22 },  // sigue un procedimiento ya probado. Paso 1, paso 2, paso 3. Esos manuales escriben después de cada incidente re
  { file: '3_55.jpg', startSec: 235.28 },  // así que un SOC Maduro es, literalmente, la memoria acumulada de todo lo que ya le ha pasado a esa empresa ante
  { file: '4_02.jpg', startSec: 242.16 },  // Vale, y en cifras concretas, ¿cuánto se paga esto en España en 2026?
  { file: '4_07.jpg', startSec: 247.82 },  // Una analista de nivel 1 recién entrado ronda entre 22 .000 y 28 .000 euros brutos al año.
  { file: '4_14.jpg', startSec: 254.26 },  // Con experiencia media, tres a cinco años,
  { file: '4_16.jpg', startSec: 256.88 },  // sube a un rango de 35 a 50 .000.
  { file: '4_19.jpg', startSec: 259.9 },  // Y un nivel 3, senior, liderando respuesta incidentes, puede superar los 60 .000.
  { file: '4_25.jpg', startSec: 265.94 },  // La diferencia entre esos números no es solo antigüedad, es haber sobrevivido a la fatiga de alertas el tiempo 
  { file: '4_36.jpg', startSec: 276.12 },  // Y hay un problema silencioso en este sector que casi nadie cuenta.
  { file: '4_40.jpg', startSec: 280.5 },  // Muchas empresas rotan a sus analistas de nivel 1, cada 2 o 3 años,
  { file: '4_44.jpg', startSec: 284.72 },  // y cuando ese analista se va, se va también todo el conocimiento del contexto,
  { file: '4_49.jpg', startSec: 289.02 },  // que sistemas son normales, que patrones son propios de esta empresa en concreto,
  { file: '4_53.jpg', startSec: 293.64 },  // esa perdida constante de contexto es una de las razones por las que la fatiga de alertas nunca desaparece del 
  { file: '5_00.jpg', startSec: 300.4 },  // cada nueva generación de analistas empieza casi de 0.
  { file: '5_04.jpg', startSec: 304.52 },  // Y por qué rota tanto la gente en nivel 1, exactamente?
  { file: '5_08.jpg', startSec: 308.14 },  // Porque es un trabajo de guardia, muchas veces aturnos, de noche, de fin de semana,
  { file: '5_12.jpg', startSec: 312.62 },  // con la presión constante de no poder equivocarte con la alerta que sí importa.
  { file: '5_17.jpg', startSec: 317.36 },  // Ese desgaste, más que el sueldo de entrada, es la razón real por la que tanta gente lo usa como trampolín y no
  { file: '5_25.jpg', startSec: 325.54 },  // Y aquí viene el cambio que está sacudiendo justo ahora este puesto.
  { file: '5_29.jpg', startSec: 329.7 },  // Los sistemas de Ia agéntica que dimos en otro vídeo ya están entrando de lleno en lossoc.
  { file: '5_35.jpg', startSec: 335.32 },  // Pueden revisar miles de alertas de nivel 1 de forma autónoma, descartar el ruido y solo escalar lo que de verd
  { file: '5_42.jpg', startSec: 342.9 },  // Lo cual suena genial hasta que piensas qué pasa con la gente que hoy entra a este sector precisamente por el n
  { file: '5_50.jpg', startSec: 350.06 },  // El trabajo de entrada de siempre podría dejar de ser la puerta de entrada.
  { file: '5_54.jpg', startSec: 354.52 },  // Pero ojo,
  { file: '5_55.jpg', startSec: 355.32 },  // esto no significa que el puesto vaya a desaparecer,
  { file: '5_58.jpg', startSec: 358.16 },  // significa que va a cambiar de forma.
  { file: '6_00.jpg', startSec: 360.66 },  // Alguien va a tener que revisar lo que la Ia escala,
  { file: '6_03.jpg', startSec: 363.7 },  // entrenarla con los casos que se le escapan y decidir cuando confiar en su criterio y cuando no.
  { file: '6_09.jpg', startSec: 369.74 },  // Ese trabajo de supervisar al sistema que antes hacía de filtro es, probablemente, el nivel 1 del futuro cercan
  { file: '6_17.jpg', startSec: 377.74 },  // una mutación.
  { file: '6_19.jpg', startSec: 379.62 },  // Y cómo se entra en esto todavía mientras eso termina de pasar?
  { file: '6_23.jpg', startSec: 383.5 },  // La base son redes, sistemas operativos y entender cómo se ve el tráfico normal de una red para poder reconocer
  { file: '6_31.jpg', startSec: 391.3 },  // Después,
  { file: '6_32.jpg', startSec: 392.1 },  // manejo real de un 100,
  { file: '6_33.jpg', startSec: 393.74 },  // aunque sea un gratuito montado en casa con datos de prueba.
  { file: '6_37.jpg', startSec: 397.34 },  // Y el proyecto que de verdad impresiona no es monté un 100. Es, monté un 100,
  { file: '6_43.jpg', startSec: 403.08 },  // generé tráfico normal y un ataque simulado dentro y escribí cómo distinguí uno del otro paso a paso.
  { file: '6_49.jpg', startSec: 409.62 },  // Eso, documentar el criterio, no solo la herramienta, es lo que un entrevistador de verdad quiere ver.
  { file: '6_55.jpg', startSec: 415.86 },  // Así que la próxima vez que alguien te diga que un analista sóc solo mira pantallas, ya sabes que son tres trab
  { file: '7_03.jpg', startSec: 423.84 },  // y que el más duro no es el que investiga incidentes grandes,
  { file: '7_07.jpg', startSec: 427.22 },  // es el que se sienta cada día frente a miles de falsas alarmas sabiendo que una de ellas, tarde o temprano, no 
  { file: '7_15.jpg', startSec: 435.3 },  // El red team entra para avisarte del agujero. El analista sóc es quien tiene que notarlo cuando alguien más lo 
  { file: '7_22.jpg', startSec: 442.74 },  // Si te ha interesado esta serie sobre empleo reales en tecnología,
  { file: '7_26.jpg', startSec: 446.22 },  // suscríbete,
  { file: '7_27.jpg', startSec: 447.18 },  // se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 39.3, volume: 0.16 },
  { file: 'tense_sting.mp3', startSec: 73.44, volume: 0.16 },
  { file: 'example_transition.mp3', startSec: 151.5, volume: 0.14 },
  { file: 'realization_sting.mp3', startSec: 177.18, volume: 0.17 },
  { file: 'money_chime.mp3', startSec: 247.82, volume: 0.17 },
  { file: 'quiet_concern.mp3', startSec: 276.12, volume: 0.14 },
  { file: 'twist_shift.mp3', startSec: 325.54, volume: 0.16 },
  { file: 'question_transition.mp3', startSec: 379.62, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 415.86, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 442.74, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHaceAnalistaSoc: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hace-analista-soc.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hace-analista-soc-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hace-analista-soc-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hace-analista-soc/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
