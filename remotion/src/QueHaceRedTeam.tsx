import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-hace-red-team - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Cuando alguien dice que trabaje en un red team,
  { file: '0_02.jpg', startSec: 2.58 },  // la gente se imagina un tío encapuchado
  { file: '0_04.jpg', startSec: 4.52 },  // entrando en sistemas ajenos a las tres de la mañana.
  { file: '0_07.jpg', startSec: 7.72 },  // Y sí, eso pasa,
  { file: '0_09.jpg', startSec: 9.36 },  // pero es la parte más pequeña del trabajo.
  { file: '0_12.jpg', startSec: 12.26 },  // La mayoría del tiempo de un red team no se dedica a atacar nada,
  { file: '0_16.jpg', startSec: 16.08 },  // se dedica a mirar, a esperar y a escribir.
  { file: '0_19.jpg', startSec: 19.4 },  // Y lo más importante de todo,
  { file: '0_21.jpg', startSec: 21.3 },  // el objetivo real de un red team no es entrar,
  { file: '0_24.jpg', startSec: 24.7 },  // es medir cuánto tarda el equipo de enfrente
  { file: '0_27.jpg', startSec: 27.22 },  // en darse cuenta de que has entrado.
  { file: '0_29.jpg', startSec: 29.96 },  // Hoy te cuento qué hace de verdad,
  { file: '0_32.jpg', startSec: 32.04 },  // cuánto se cobra en España y cómo se llega ahí.
  { file: '0_34.jpg', startSec: 34.88 },  // Y hay que empezar por la confusión más común de todas,
  { file: '0_37.jpg', startSec: 37.92 },  // porque la vas a oír constantemente.
  { file: '0_40.jpg', startSec: 40.72 },  // Red team y pentesting no son lo mismo.
  { file: '0_44.jpg', startSec: 44.1 },  // No es una diferencia de nombre,
  { file: '0_45.jpg', startSec: 45.9 },  // es una diferencia de trabajo entero.
  { file: '0_48.jpg', startSec: 48.54 },  // Un pentest tiene un alcance técnico cerrado desde el principio,
  { file: '0_52.jpg', startSec: 52.38 },  // una aplicación web concreta, una red concreta,
  { file: '0_55.jpg', startSec: 55.14 },  // un directorio activo concreto.
  { file: '0_57.jpg', startSec: 57.72 },  // Y el encargo es encontrar el máximo número de vulnerabilidades
  { file: '1_00.jpg', startSec: 60.92 },  // dentro de ese perímetro.
  { file: '1_02.jpg', startSec: 62.88 },  // Dura entre una y cuatro semanas y todo el mundo sabe que se está haciendo.
  { file: '1_07.jpg', startSec: 67.56 },  // El equipo de fensor está avisado, no es ningún secreto.
  { file: '1_11.jpg', startSec: 71.14 },  // Un red team funciona al revés,
  { file: '1_13.jpg', startSec: 73.2 },  // no te dan un alcance técnico,
  { file: '1_14.jpg', startSec: 74.88 },  // te dan un objetivo de negocio.
  { file: '1_17.jpg', startSec: 77.2 },  // Entra en el sistema que gestiona los pedidos,
  { file: '1_19.jpg', startSec: 79.72 },  // saca datos de clientes, llega al ERP.
  { file: '1_22.jpg', startSec: 82.84 },  // Y como llegues hasta ahí, es cosa a tuya.
  { file: '1_25.jpg', startSec: 85.6 },  // Puede decir por la web, por un empleado,
  { file: '1_27.jpg', startSec: 87.7 },  // por un proveedor, por una cuenta olvidada,
  { file: '1_30.jpg', startSec: 90.12 },  // exactamente igual que haría un atacante real,
  { file: '1_32.jpg', startSec: 92.74 },  // que tampoco pide permiso para elegir camino.
  { file: '1_35.jpg', startSec: 95.64 },  // Y no dura semanas.
  { file: '1_37.jpg', startSec: 97.26 },  // Un ejercicio de red team dura entre cuatro y dieciséis semanas.
  { file: '1_41.jpg', startSec: 101.2 },  // Y en los ejercicios más serios,
  { file: '1_43.jpg', startSec: 103.0 },  // los que hacen los bancos bajo el marco europeo Tiber se alargan meses.
  { file: '1_47.jpg', startSec: 107.84 },  // Entonces, si dura meses,
  { file: '1_49.jpg', startSec: 109.38 },  // ¿qué hace exactamente esa persona todos esos días?
  { file: '1_53.jpg', startSec: 113.4 },  // Pues la mayor parte del tiempo, reconocimiento,
  { file: '1_56.jpg', startSec: 116.38 },  // que es la palabra elegante para decir investigar a la empresa sin tocarla.
  { file: '2_00.jpg', startSec: 120.9 },  // Se llama reconocimiento pasivo
  { file: '2_02.jpg', startSec: 122.6 },  // y consiste en recopilar todo lo que la empresa ha dejado a la vista sin darse cuenta.
  { file: '2_08.jpg', startSec: 128.0 },  // Y te sorprendería la cantidad de cosas que una empresa deja a la vista.
  { file: '2_12.jpg', startSec: 132.54 },  // Buckets de almacenamiento en la nube abiertos al público.
  { file: '2_15.jpg', startSec: 135.98 },  // Paneles de administración accesibles desde Internet,
  { file: '2_18.jpg', startSec: 138.52 },  // escritorio remotos expuestos que alguien levantó para tele trabajar en 2020
  { file: '2_23.jpg', startSec: 143.14 },  // y nadie volvió a cerrar.
  { file: '2_25.jpg', startSec: 145.7 },  // Y repositorios de código en GitHub de empleados con credenciales dentro.
  { file: '2_30.jpg', startSec: 150.64 },  // Todo eso está y fuera gratis sin necesidad de atacar a nadie todavía.
  { file: '2_35.jpg', startSec: 155.26 },  // Y cuanto más tiempo dedicas a esta fase,
  { file: '2_37.jpg', startSec: 157.76 },  // más caminos de entrada encuentras.
  { file: '2_40.jpg', startSec: 160.18 },  // Por eso, un red team bueno parece que no hace nada durante semanas.
  { file: '2_44.jpg', startSec: 164.18 },  // Está construyendo el mapa antes de dar el primer paso.
  { file: '2_47.jpg', startSec: 167.72 },  // Y luego está la condición que lo cambia absolutamente todo.
  { file: '2_52.jpg', startSec: 172.02 },  // El sigilo no es opcional, es el requisito.
  { file: '2_55.jpg', startSec: 175.78 },  // En un red team, el equipo de fensor no sabe que el ejercicio se está ejecutando.
  { file: '3_00.jpg', startSec: 180.98 },  // Solo lo sabe un grupo minúsculo de personas,
  { file: '3_03.jpg', startSec: 183.62 },  // normalmente dirección y poco más, que se llama el equipo blanco.
  { file: '3_07.jpg', startSec: 187.7 },  // Los que están en el centro de operaciones de seguridad viendo las alertas no tienen ni idea.
  { file: '3_13.jpg', startSec: 193.18 },  // Y eso es justo lo que hace que el ejercicio valga para algo.
  { file: '3_16.jpg', startSec: 196.98 },  // Porque si les avisas, están mirando.
  { file: '3_19.jpg', startSec: 199.28 },  // Y si están mirando, no estás midiendo la realidad.
  { file: '3_22.jpg', startSec: 202.74 },  // Estás midiendo cómo se comportan cuando saben que hay exámen.
  { file: '3_27.jpg', startSec: 207.0 },  // Lo cual nos lleva a la pregunta buena.
  { file: '3_29.jpg', startSec: 209.32 },  // ¿Qué se mide realmente al final de un red team?
  { file: '3_32.jpg', startSec: 212.52 },  // Y aquí es donde casi todo el mundo se equivoca.
  { file: '3_35.jpg', startSec: 215.56 },  // No se mide cuántas vulnerabilidades hay.
  { file: '3_38.jpg', startSec: 218.12 },  // Eso es lo que mide un pentest.
  { file: '3_40.jpg', startSec: 220.18 },  // Un red team media el equipo de fensor.
  { file: '3_42.jpg', startSec: 222.6 },  // Mide cuánto tardaron en detectar la intrusión.
  { file: '3_45.jpg', startSec: 225.28 },  // Lo que en el sector se llama tiempo medio de detección.
  { file: '3_48.jpg', startSec: 228.46 },  // Mide cuánto tardaron en contenerla una vez detectada.
  { file: '3_51.jpg', startSec: 231.76 },  // Y mide qué alertas saltaron, cuáles nos saltaron y cuáles saltaron pero nadie miró.
  { file: '3_56.jpg', startSec: 236.76 },  // Piénsalo como un simulacro de incendio.
  { file: '3_59.jpg', startSec: 239.26 },  // Un simulacro de incendio no se hace para demostrar que el fuego quema.
  { file: '4_02.jpg', startSec: 242.98 },  // Eso ya lo sabemos.
  { file: '4_04.jpg', startSec: 244.58 },  // Se hace para cronometrar cuánto tarda la gente en salir del edificio.
  { file: '4_08.jpg', startSec: 248.58 },  // El red team es exactamente eso pero con un atacante en vez de con humo.
  { file: '4_12.jpg', startSec: 252.82 },  // Y si el red team entra hasta la cocina y nadie se entera en tres semanas,
  { file: '4_16.jpg', startSec: 256.9 },  // el ejercicio ha sido un éxito rotundo.
  { file: '4_19.jpg', startSec: 259.3 },  // Un éxito horrible para la empresa pero un éxito.
  { file: '4_22.jpg', startSec: 262.82 },  // Y al final de todo eso viene la parte que nadie enseña en los vídeos de hackers.
  { file: '4_27.jpg', startSec: 267.54 },  // El informe.
  { file: '4_28.jpg', startSec: 268.98 },  // Porque el entrecable de un red team no es la intrusión, es el documento.
  { file: '4_33.jpg', startSec: 273.56 },  // Un documento que explica la cadena entera, paso a paso, con evidencias de cada movimiento.
  { file: '4_38.jpg', startSec: 278.78 },  // Que se hizo, cuándo se hizo, que lo detectó y que lo dejó pasar.
  { file: '4_43.jpg', startSec: 283.16 },  // Y escrito de forma que lo entienda a alguien de dirección que no sabe lo que es un directorio activo.
  { file: '4_48.jpg', startSec: 288.48 },  // Un red team que entra pero no sabe explicar cómo entró, no sirve para nada.
  { file: '4_53.jpg', startSec: 293.3 },  // Porque la empresa no te paga por la azáña, te paga por poder arreglarlo después.
  { file: '4_58.jpg', startSec: 298.32 },  // Vale y todo esto, cuánto se paga en España en 2026?
  { file: '5_02.jpg', startSec: 302.4 },  // Un perfil junior, con menos de dos años, se mueve entre 24.000 y 35.000 euros brutos al año.
  { file: '5_09.jpg', startSec: 309.28 },  // Un perfil medio, con 3 a 6 años, está entre 35.000 y 50.000.
  { file: '5_14.jpg', startSec: 314.52 },  // Y un senior, o alguien ya metido en red team de verdad, va de 50.000 a 75.000 y por encima en algunos casos.
  { file: '5_22.jpg', startSec: 322.22 },  // Barcelona paga bastante por encima de la media nacional y en remoto para empresas extranjeras se paga más toda
  { file: '5_28.jpg', startSec: 328.72 },  // Y ojo con un detalle porque se mezcla constantemente.
  { file: '5_32.jpg', startSec: 332.26 },  // Eso es sueldo de nómina, el book bounty, cazar fallos por recompensa, es otra cosa distinta y es ingreso varia
  { file: '5_39.jpg', startSec: 339.84 },  // Hay gente que vive de ello, pero no es un sueldo, es una comisión sin garantía ninguna.
  { file: '5_45.jpg', startSec: 345.24 },  // ¿Y cómo se entra en esto?
  { file: '5_47.jpg', startSec: 347.5 },  // Aquí viene la respuesta que a mucha gente le fastidia.
  { file: '5_50.jpg', startSec: 350.44 },  // Casi nadie entra directamente en un red team.
  { file: '5_53.jpg', startSec: 353.46 },  // Se llega después desde otro sitio.
  { file: '5_56.jpg', startSec: 356.06 },  // Desde Pentestin, desde Administración de Sistemas o desde el equipo Defensor, el Centro de Operaciones de Segu
  { file: '6_02.jpg', startSec: 362.96 },  // Y tiene todo el sentido del mundo porque para saber esconderte de un sistema de detección, primero tienes que 
  { file: '6_10.jpg', startSec: 370.24 },  // Para evadir a un Defensor hay que entender cómo piensa el Defensor.
  { file: '6_14.jpg', startSec: 374.42 },  // Por eso los mejores atacantes suelen venir de haber defendido antes.
  { file: '6_18.jpg', startSec: 378.48 },  // Y la base técnica es casi siempre la misma, redes, sistemas operativos y sobre todo directorio activo,
  { file: '6_23.jpg', startSec: 383.96 },  // que es donde se juega la partida en la mayoría de empresas.
  { file: '6_27.jpg', startSec: 387.4 },  // Este mismo fin de semana puedes montarte un laboratorio en casa con dos máquinas virtuales y un dominio de pru
  { file: '6_34.jpg', startSec: 394.04 },  // Gratis, legal y en tu propio ordenador.
  { file: '6_36.jpg', startSec: 396.96 },  // Y eso ya vale más en una entrevista que cualquier curso sin práctica detrás.
  { file: '6_41.jpg', startSec: 401.58 },  // Así que la próxima vez que veas a alguien decir que en un red team se pasa el día hackeando,
  { file: '6_46.jpg', startSec: 406.28 },  // ya sabes que la mayor parte del trabajo es mirar sin tocar,
  { file: '6_49.jpg', startSec: 409.12 },  // entrar sin que salte una alerta y escribir un informe que alguien de dirección pueda entender.
  { file: '6_55.jpg', startSec: 415.08 },  // Y que el objetivo nunca fue demostrar que se puede entrar.
  { file: '6_58.jpg', startSec: 418.02 },  // El objetivo era cronometrar cuánto tardan en darse cuenta.
  { file: '7_02.jpg', startSec: 422.22 },  // Si te ha interesado esta serie sobre empleos reales en tecnología, suscríbete.
  { file: '7_06.jpg', startSec: 426.38 },  // Se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_stealth.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'twist_reveal.mp3', startSec: 21.3, volume: 0.16 },
  { file: 'distinction_clack.mp3', startSec: 40.72, volume: 0.15 },
  { file: 'reverse_whoosh.mp3', startSec: 71.14, volume: 0.14 },
  { file: 'recon_scan.mp3', startSec: 113.4, volume: 0.14 },
  { file: 'stealth_condition.mp3', startSec: 167.72, volume: 0.15 },
  { file: 'question_turn.mp3', startSec: 207.0, volume: 0.14 },
  { file: 'fire_drill.mp3', startSec: 236.76, volume: 0.16 },
  { file: 'paper_report.mp3', startSec: 262.82, volume: 0.14 },
  { file: 'money_chime.mp3', startSec: 298.32, volume: 0.17 },
  { file: 'path_question.mp3', startSec: 345.24, volume: 0.14 },
  { file: 'actionable_ding.mp3', startSec: 387.4, volume: 0.15 },
  { file: 'subscribe_chime.mp3', startSec: 422.22, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHaceRedTeam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hace-red-team.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hace-red-team-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hace-red-team-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hace-red-team/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
