import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-hacen-los-agentes-de-ia - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Si le preguntas a la mayoría de la gente qué es una gente de inteligencia artificial,
  { file: '0_04.jpg', startSec: 4.5 },  // te van a decir que es un chatbot más listo.
  { file: '0_07.jpg', startSec: 7.28 },  // Es mentira, o más bien, es la mitad de la mentira que peor entiende el sector ahora mismo.
  { file: '0_13.jpg', startSec: 13.22 },  // Un chatbot contesta, una gente actúa.
  { file: '0_17.jpg', startSec: 17.12 },  // Hoy te cuento qué hace de verdad una gente de ella,
  { file: '0_19.jpg', startSec: 19.86 },  // porque falla mucho más de lo que la gente cree,
  { file: '0_22.jpg', startSec: 22.54 },  // cuánto se cobra por construirlos y cómo se empieza.
  { file: '0_26.jpg', startSec: 26.0 },  // Vamos con la diferencia real porque aquí está todo el tema.
  { file: '0_30.jpg', startSec: 30.0 },  // Un chatbot recibe una pregunta y te devuelve una respuesta.
  { file: '0_33.jpg', startSec: 33.26 },  // Ida y vuelta.
  { file: '0_34.jpg', startSec: 34.14 },  // Fín.
  { file: '0_35.jpg', startSec: 35.06 },  // Si le pides que reserbe un vuelo en el mejor de los casos,
  { file: '0_37.jpg', startSec: 37.66 },  // te va a decir cómo hacerlo tú mismo.
  { file: '0_40.jpg', startSec: 40.2 },  // Una gente no.
  { file: '0_41.jpg', startSec: 41.32 },  // A una gente le das un objetivo, no una pregunta.
  { file: '0_44.jpg', startSec: 44.74 },  // Reserva un vuelo a Madrid para el jueves por menos de 200 euros.
  { file: '0_48.jpg', startSec: 48.42 },  // Y a partir de ahí, el agente hace algo que un chatbot no puede hacer ni de lejos.
  { file: '0_53.jpg', startSec: 53.26 },  // Entra en un bucle.
  { file: '0_55.jpg', startSec: 55.06 },  // Primero descompone el objetivo en pasos, buscar vuelos, comparar precios,
  { file: '0_58.jpg', startSec: 58.88 },  // elegir el mejor, reservarlo.
  { file: '1_01.jpg', startSec: 61.8 },  // Segundo, decide que herramienta necesita para cada paso,
  { file: '1_05.jpg', startSec: 65.26 },  // una api de una aerolínea, un buscador, un formulario de pago.
  { file: '1_09.jpg', startSec: 69.56 },  // Tercero, ejecuta esa herramienta de verdad.
  { file: '1_12.jpg', startSec: 72.46 },  // No te explica cómo hacerlo, lo hace.
  { file: '1_15.jpg', startSec: 75.32 },  // Cuarto, mira el resultado.
  { file: '1_17.jpg', startSec: 77.34 },  // Y aquí está la parte que de verdad importa.
  { file: '1_19.jpg', startSec: 79.72 },  // Si el resultado no vale, el agente no se rinde,
  { file: '1_22.jpg', startSec: 82.72 },  // vuelve atrás y lo replantea.
  { file: '1_24.jpg', startSec: 84.94 },  // Recio muy alto, prueba otra fecha.
  { file: '1_26.jpg', startSec: 86.64 },  // Vuelo lleno, prueba otra aerolínea.
  { file: '1_29.jpg', startSec: 89.66 },  // Repite ese bucle las veces que ha a falta hasta que el objetivo se cumple,
  { file: '1_34.jpg', startSec: 94.08 },  // o hasta que se da cuenta de que no puede.
  { file: '1_36.jpg', startSec: 96.72 },  // Un chatbot con esteroides no hace eso.
  { file: '1_39.jpg', startSec: 99.38 },  // Un chatbot con esteroides sigue sin memoria entre pasos,
  { file: '1_42.jpg', startSec: 102.66 },  // sin decidir por su cuenta y sin tocar nada fuera de la conversación.
  { file: '1_47.jpg', startSec: 107.1 },  // Jamar a una herramienta una vez por sí solo,
  { file: '1_49.jpg', startSec: 109.68 },  // tampoco convierte a un modelo en un agente.
  { file: '1_52.jpg', startSec: 112.06 },  // Lo que lo convierte en agente es que decida solo qué herramienta usar,
  { file: '1_55.jpg', startSec: 115.46 },  // cuando usarla y qué hacer si falla.
  { file: '1_58.jpg', startSec: 118.8 },  // Esa es la frase que te tienes que quedar.
  { file: '2_00.jpg', startSec: 120.94 },  // Un chatbot contesta, una gente actúa.
  { file: '2_04.jpg', startSec: 124.02 },  // Vamos con un ejemplo real y muy típico en empresas ahora mismo.
  { file: '2_08.jpg', startSec: 128.06 },  // Una empresa de e-commerce quiere que alguien revise cada devolución,
  { file: '2_11.jpg', startSec: 131.62 },  // decidas y se acepta y genere el rembolso.
  { file: '2_14.jpg', startSec: 134.66 },  // Antes, es solo hacia una persona,
  { file: '2_17.jpg', startSec: 137.0 },  // abriendo el correo, mirando el pedido,
  { file: '2_19.jpg', startSec: 139.06 },  // consultando la política de la empresa y tramitando el rembolso a mano.
  { file: '2_23.jpg', startSec: 143.42 },  // Ahora se lo dan como objetivo a una gente.
  { file: '2_26.jpg', startSec: 146.16 },  // El agente lee el correo de devolución,
  { file: '2_28.jpg', startSec: 148.48 },  // consulta el sistema de pedidos para verificar que existe,
  { file: '2_31.jpg', startSec: 151.54 },  // compara el motivo con la política interna de la empresa
  { file: '2_33.jpg', startSec: 153.82 },  // y si encaja, ejecuta el rembolso o el solo.
  { file: '2_37.jpg', startSec: 157.5 },  // Y si algo no encaja,
  { file: '2_38.jpg', startSec: 158.94 },  // si el pedido no existe o el motivo es raro,
  { file: '2_41.jpg', startSec: 161.42 },  // no inventa una respuesta,
  { file: '2_43.jpg', startSec: 163.14 },  // separa y lo escala a una persona.
  { file: '2_45.jpg', startSec: 165.96 },  // Y aquí viene la parte que casi nadie cuenta
  { file: '2_48.jpg', startSec: 168.02 },  // y que es la más importante de todo este vídeo.
  { file: '2_51.jpg', startSec: 171.26 },  // Los agentes fallan,
  { file: '2_53.jpg', startSec: 173.02 },  // mucho más de lo que el marketing del sector quiere que creas.
  { file: '2_56.jpg', startSec: 176.4 },  // No porque el modelo sea tonto,
  { file: '2_58.jpg', startSec: 178.34 },  // sino porque cada paso del bucle es una oportunidad de que algo se tuerza.
  { file: '3_02.jpg', startSec: 182.58 },  // Si el agente interpreta mal un correo,
  { file: '3_04.jpg', startSec: 184.88 },  // ese error se arrastra al siguiente paso
  { file: '3_06.jpg', startSec: 186.8 },  // y al siguiente y al siguiente.
  { file: '3_09.jpg', startSec: 189.38 },  // Un fallo pequeño al principio de la cadena
  { file: '3_11.jpg', startSec: 191.58 },  // se convierte en un desastre grande al final.
  { file: '3_14.jpg', startSec: 194.86 },  // Hay un patrón de fallo que se repite tanto
  { file: '3_16.jpg', startSec: 196.84 },  // que ya tiene nombre entre quienes construyen esto.
  { file: '3_19.jpg', startSec: 199.1 },  // La alucinación de herramienta.
  { file: '3_21.jpg', startSec: 201.84 },  // El agente decide usar una herramienta que no existe
  { file: '3_24.jpg', startSec: 204.46 },  // o la llama con datos que se ha inventado,
  { file: '3_26.jpg', startSec: 206.78 },  // convencido de que es el paso correcto.
  { file: '3_28.jpg', startSec: 208.96 },  // Y como el resto del bucle confía en ese resultado,
  { file: '3_31.jpg', startSec: 211.92 },  // el error se cuela en todos los pasos siguientes
  { file: '3_34.jpg', startSec: 214.2 },  // sin que nadie se de cuenta hasta el final.
  { file: '3_36.jpg', startSec: 216.84 },  // Por eso, equipos serios revisan cada llamada herramienta
  { file: '3_39.jpg', startSec: 219.84 },  // antes de dejarla pasar,
  { file: '3_41.jpg', startSec: 221.32 },  // no solo el resultado final.
  { file: '3_43.jpg', startSec: 223.52 },  // Por eso, casi ningún equipo serio
  { file: '3_45.jpg', startSec: 225.38 },  // deja una gente actuar sin límites.
  { file: '3_47.jpg', startSec: 227.96 },  // Se le pone un tope de pasos,
  { file: '3_49.jpg', startSec: 229.44 },  // un presupuesto de gasto y, sobre todo,
  { file: '3_51.jpg', startSec: 231.86 },  // una lista de acciones que necesitan que una persona diga que sí
  { file: '3_55.jpg', startSec: 235.08 },  // antes de ejecutarse.
  { file: '3_57.jpg', startSec: 237.76 },  // Reenbolzar 20 euros lo hace solo.
  { file: '3_59.jpg', startSec: 239.86 },  // Reenbolzar 2000 lo pregunta primero.
  { file: '4_02.jpg', startSec: 242.54 },  // Y aquí está el trabajo real de quien construye estos sistemas.
  { file: '4_06.jpg', startSec: 246.34 },  // No es escribir el promponito y ya está.
  { file: '4_08.jpg', startSec: 248.96 },  // Es decidir qué puede hacer el agente sin supervisión,
  { file: '4_11.jpg', startSec: 251.92 },  // qué necesita aprobación humana
  { file: '4_13.jpg', startSec: 253.46 },  // y qué pasa cuando algo sale mal a mitad del bucle.
  { file: '4_16.jpg', startSec: 256.9 },  // Disseñar los límites es más trabajo que diseñar las capacidades,
  { file: '4_20.jpg', startSec: 260.8 },  // porque una gente con demasiada libertad no es más útil,
  { file: '4_23.jpg', startSec: 263.9 },  // es más peligroso.
  { file: '4_25.jpg', startSec: 265.82 },  // Y hay una segunda forma de fallo, más silenciosa,
  { file: '4_29.jpg', startSec: 269.1 },  // que se llama deriva de objetivo.
  { file: '4_31.jpg', startSec: 271.44 },  // El agente empieza persiguiendo la tarea correcta,
  { file: '4_34.jpg', startSec: 274.56 },  // pero en el paso número 12 del bucle,
  { file: '4_36.jpg', startSec: 276.62 },  // algo lo despía sin que nadie lo note.
  { file: '4_39.jpg', startSec: 279.18 },  // Le pediste que resumiera un informe
  { file: '4_40.jpg', startSec: 280.98 },  // y 15 pasos después está reescribiendo el informe entero
  { file: '4_44.jpg', startSec: 284.42 },  // porque en algún punto interpretó que eso era mejorarlo.
  { file: '4_48.jpg', startSec: 288.42 },  // Nadie le dio esa instrucción.
  { file: '4_50.jpg', startSec: 290.4 },  // La construyó el solo, paso a paso,
  { file: '4_52.jpg', startSec: 292.68 },  // cada uno pareciendo razonable en su momento.
  { file: '4_55.jpg', startSec: 295.58 },  // Por eso los buenos sistemas
  { file: '4_56.jpg', startSec: 296.86 },  // comprueban el objetivo original a mitad de camino,
  { file: '4_59.jpg', startSec: 299.66 },  // no solo al final.
  { file: '5_01.jpg', startSec: 301.42 },  // Preguntarle a la gente,
  { file: '5_02.jpg', startSec: 302.9 },  // sigues persiguiendo lo que te pedí o te has desviado.
  { file: '5_05.jpg', startSec: 305.56 },  // En mitad del proceso,
  { file: '5_07.jpg', startSec: 307.0 },  // ahorra más dolores de cabeza
  { file: '5_08.jpg', startSec: 308.34 },  // que cualquier promperefecto al principio.
  { file: '5_11.jpg', startSec: 311.44 },  // Vale, y todo esto,
  { file: '5_12.jpg', startSec: 312.8 },  // ¿cuánto se paga en España en 2026?
  { file: '5_16.jpg', startSec: 316.5 },  // Un perfil junior, con cero a dos años,
  { file: '5_18.jpg', startSec: 318.82 },  // se mueve entre 35.000 y 45.000 euros brutos al año.
  { file: '5_23.jpg', startSec: 323.08 },  // Un perfil con 5 a 10 años de experiencia real
  { file: '5_25.jpg', startSec: 325.82 },  // está entre 51.000 y 70.000.
  { file: '5_29.jpg', startSec: 329.08 },  // Y por encima de 10 años,
  { file: '5_30.jpg', startSec: 330.98 },  // especializado en sistemas de gente en producción
  { file: '5_33.jpg', startSec: 333.3 },  // entre 71 y 90.000,
  { file: '5_35.jpg', startSec: 335.92 },  // con picos más altos enroles del liderazgo técnico.
  { file: '5_39.jpg', startSec: 339.54 },  // La diferencia entre esos números no es solo antigüedad,
  { file: '5_42.jpg', startSec: 342.36 },  // es saber visto fallar una gente en producción
  { file: '5_44.jpg', startSec: 344.76 },  // y saber por qué fallo.
  { file: '5_47.jpg', startSec: 347.18 },  // Y cómo se entra en esto?
  { file: '5_49.jpg', startSec: 349.14 },  // La base técnica es programación normal,
  { file: '5_51.jpg', startSec: 351.56 },  // país on sobre todo,
  { file: '5_52.jpg', startSec: 352.78 },  // y entender bien cómo funciona una API.
  { file: '5_55.jpg', startSec: 355.98 },  // Después, aprender el patrón del bucle,
  { file: '5_58.jpg', startSec: 358.38 },  // objetivo, herramienta, observación, replanteamiento,
  { file: '6_02.jpg', startSec: 362.06 },  // que es siempre el mismo aunque cambia el framework de moda.
  { file: '6_05.jpg', startSec: 365.66 },  // Y el proyecto que de verdad vale en una entrevista
  { file: '6_08.jpg', startSec: 368.18 },  // no es hice un chatbot.
  { file: '6_10.jpg', startSec: 370.26 },  // Es construir una gente que hace una tarea real
  { file: '6_12.jpg', startSec: 372.94 },  // con una herramienta real y le puse límites
  { file: '6_15.jpg', startSec: 375.38 },  // para que no se descontrolara.
  { file: '6_18.jpg', startSec: 378.1 },  // Automatizar la búsqueda y el resumen de ofertas de trabajo
  { file: '6_20.jpg', startSec: 380.78 },  // que encaje en con tu perfil
  { file: '6_22.jpg', startSec: 382.12 },  // es un proyecto de este mismo fin de semana
  { file: '6_24.jpg', startSec: 384.52 },  // y ya te obliga a resolver el problema de verdad
  { file: '6_27.jpg', startSec: 387.16 },  // cuando parar a la gente.
  { file: '6_29.jpg', startSec: 389.64 },  // Así que la próxima vez que alguien te diga que una gente de IA
  { file: '6_32.jpg', startSec: 392.7 },  // es solo un chatbot con esteroides,
  { file: '6_34.jpg', startSec: 394.84 },  // ya sabes que la diferencia real es el bucle,
  { file: '6_37.jpg', startSec: 397.48 },  // actuar, mirar el resultado
  { file: '6_39.jpg', startSec: 399.34 },  // y decidir el siguiente paso sin que nadie se lo diga.
  { file: '6_43.jpg', startSec: 403.3 },  // Y que el trabajo de verdad no es hacer que la gente
  { file: '6_45.jpg', startSec: 405.74 },  // pueda hacer más cosas,
  { file: '6_47.jpg', startSec: 407.58 },  // es decidir con cuidado
  { file: '6_48.jpg', startSec: 408.82 },  // cuál es de esas cosas debería hacer solo.
  { file: '6_52.jpg', startSec: 412.58 },  // Si te ha interesado esta serie sobre empleo reales
  { file: '6_55.jpg', startSec: 415.16 },  // en tecnología, suscríbete,
  { file: '6_57.jpg', startSec: 417.06 },  // se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'loop_start.mp3', startSec: 53.26, volume: 0.15 },
  { file: 'myth_bust.mp3', startSec: 96.72, volume: 0.16 },
  { file: 'reveal_twist.mp3', startSec: 165.96, volume: 0.16 },
  { file: 'glitch_error.mp3', startSec: 199.1, volume: 0.16 },
  { file: 'serious_turn.mp3', startSec: 242.54, volume: 0.14 },
  { file: 'quiet_drift.mp3', startSec: 265.82, volume: 0.14 },
  { file: 'question_check.mp3', startSec: 301.42, volume: 0.14 },
  { file: 'money_chime.mp3', startSec: 316.5, volume: 0.17 },
  { file: 'path_question.mp3', startSec: 347.18, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 389.64, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 412.58, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHacenLosAgentesDeIA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hacen-los-agentes-de-ia.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hacen-los-agentes-de-ia-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hacen-los-agentes-de-ia-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hacen-los-agentes-de-ia/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
