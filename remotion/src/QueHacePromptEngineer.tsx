import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-hace-prompt-engineer - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Hay un puesto de trabajo que la gente se toma en Internet constantemente y casi siempre por el motivo equivoca
  { file: '0_06.jpg', startSec: 6.46 },  // Le pagan por escribir preguntas bonitas a un chatbot, dicen, eso no es un trabajo de verdad.
  { file: '0_12.jpg', startSec: 12.64 },  // El prompt engineer.
  { file: '0_14.jpg', startSec: 14.06 },  // Y no, no consiste en encontrar la frase mágica que hace que un modelo responda mejor.
  { file: '0_19.jpg', startSec: 19.62 },  // Eso es la parte que ve la gente de fuera, la parte real es otra completamente distinta.
  { file: '0_25.jpg', startSec: 25.22 },  // Vamos a la diferencia real, porque aquí está la clave de todo el vídeo.
  { file: '0_29.jpg', startSec: 29.28 },  // Escribir un prompt suelto, uno, y quedarte contento porque salió una respuesta bonita,
  { file: '0_34.jpg', startSec: 34.72 },  // es lo que hace cualquier persona probando un chatbot un sábado por la tarde.
  { file: '0_39.jpg', startSec: 39.22 },  // Lo que hace un prompt engineer es preguntarse si esa respuesta buena se sostiene 100 veces seguidas
  { file: '0_45.jpg', startSec: 45.16 },  // con variaciones del mismo problema, contactos raros, con usuarios groseros, con instrucciones ambigüas.
  { file: '0_51.jpg', startSec: 51.96 },  // Y esa pregunta. Esto sigue funcionando bien de verdad, siempre, no sólo esta vez.
  { file: '0_56.jpg', startSec: 56.88 },  // Es un trabajo de evaluación sistemática, no de escritura creativa.
  { file: '1_02.jpg', startSec: 62.12 },  // Es más parecido a control de calidad y a diseño de experimentos que arredactaron mensaje ingenioso.
  { file: '1_07.jpg', startSec: 67.94 },  // Vamos con un ejemplo real y muy típico.
  { file: '1_10.jpg', startSec: 70.72 },  // Una empresa lanza un asistente de atención al cliente basado en un modelo de lenguaje.
  { file: '1_15.jpg', startSec: 75.64 },  // En la demo interna funciona genial, todo el mundo prueba dos o tres preguntas obvias y sale perfecto.
  { file: '1_21.jpg', startSec: 81.22 },  // El trabajo del prompt engineer empieza justo ahí cuando todos los demás ya se han ido a celebrar.
  { file: '1_28.jpg', startSec: 88.0 },  // Construye 200 casos de prueba distintos, sacador de conversaciones reales de soporte,
  { file: '1_33.jpg', startSec: 93.44 },  // incluyendo los casos raros, los clientes enfadados, las preguntas malescritas,
  { file: '1_38.jpg', startSec: 98.38 },  // los intentos de sacar la información que no debería dar.
  { file: '1_41.jpg', startSec: 101.56 },  // Y descubre que, de esos 200 casos, el asistente falla de forma preocupante en 15,
  { file: '1_47.jpg', startSec: 107.28 },  // no porque el modelo sea malo, sino porque nadie había probado esos 15 escenarios concretos.
  { file: '1_53.jpg', startSec: 113.48 },  // Eso, encontrar los 15 casos que nadie pensó en probar antes de que los encuentre un cliente real,
  { file: '1_59.jpg', startSec: 119.68 },  // es el trabajo entero resumido en una frase.
  { file: '2_02.jpg', startSec: 122.64 },  // Y aquí está la parte que casi nadie cuenta cuando explica este trabajo.
  { file: '2_06.jpg', startSec: 126.76 },  // La mayoría de los días, un prompt engineer, no está escribiendo instrucciones nuevas para el modelo.
  { file: '2_12.jpg', startSec: 132.38 },  // Está construyendo y manteniendo el conjunto de pruebas que detecta cuando algo empeora
  { file: '2_17.jpg', startSec: 137.46 },  // y analizando por qué falló un caso concreto.
  { file: '2_20.jpg', startSec: 140.78 },  // Y aquí hay un problema añadido que hace este trabajo más difícil de lo que parece, los modelos cambian.
  { file: '2_27.jpg', startSec: 147.16 },  // La empresa que fabrica el modelo saca una versión nueva
  { file: '2_29.jpg', startSec: 149.82 },  // y, de repente, algunas respuestas que funcionaban perfectamente durante meses,
  { file: '2_34.jpg', startSec: 154.34 },  // empiezan a fallar, sin que nadie haya tocado una sola línea de las instrucciones.
  { file: '2_39.jpg', startSec: 159.42 },  // Detectar esa regresión en horas con un conjunto de pruebas que corre automáticamente
  { file: '2_43.jpg', startSec: 163.98 },  // en vez de descubrir los semanas después por las quejas de los clientes
  { file: '2_47.jpg', startSec: 167.64 },  // es literalmente la mitad del trabajo, no un extra.
  { file: '2_51.jpg', startSec: 171.92 },  // Vale, y aquí está el mito que quiero desmontar del todo.
  { file: '2_55.jpg', startSec: 175.36 },  // Mucha gente entra pensando que esto es aprenderse trucos de rebajión
  { file: '2_59.jpg', startSec: 179.34 },  // que funcionan como magia con cualquier modelo.
  { file: '3_02.jpg', startSec: 182.42 },  // Pero no es una colección de trucos, es una disciplina de prueba y análisis de fallos
  { file: '3_07.jpg', startSec: 187.04 },  // aplicada a un sistema que no siempre falla de la misma forma dos veces.
  { file: '3_11.jpg', startSec: 191.56 },  // Un prompt que funciona perfecto en un caso puede fallar en otro casi idéntico
  { file: '3_15.jpg', startSec: 195.9 },  // y entender por qué exige mirar los datos con la misma paciencia que un investigador
  { file: '3_20.jpg', startSec: 200.86 },  // no con la intuición de quien tiene mano para escribir.
  { file: '3_24.jpg', startSec: 204.94 },  // Confundir este trabajo con hablar bien con la IA
  { file: '3_27.jpg', startSec: 207.78 },  // hace que mucha gente analítica, buena en pruebas y en encontrar patrones
  { file: '3_32.jpg', startSec: 212.04 },  // ni se plantea que este puesto es para ella.
  { file: '3_35.jpg', startSec: 215.2 },  // Y hay otra confusión que merece la pena aclarar aquí mismo.
  { file: '3_39.jpg', startSec: 219.1 },  // Esto no es lo mismo que ser Machine Learning Engineer.
  { file: '3_42.jpg', startSec: 222.28 },  // El Machine Learning Engineer construye la tubería que mantiene vivo
  { file: '3_46.jpg', startSec: 226.24 },  // un modelo propio en producción.
  { file: '3_48.jpg', startSec: 228.66 },  // El prompt engineer, casi nunca entrena nada, trabaja sobre un modelo que ya existe
  { file: '3_53.jpg', startSec: 233.58 },  // y su trabajo es decidir si las respuestas de ese modelo son lo bastante buenas
  { file: '3_58.jpg', startSec: 238.32 },  // para el caso de uso real.
  { file: '3_59.jpg', startSec: 239.86 },  // Son dos oficios que a veces se solapan en una misma empresa pequeña
  { file: '4_03.jpg', startSec: 243.26 },  // pero resuelven preguntas completamente distintas.
  { file: '4_06.jpg', startSec: 246.82 },  // Y las herramientas del día a día lo confirman.
  { file: '4_09.jpg', startSec: 249.32 },  // Son más técnicas de lo que la gente imagina.
  { file: '4_12.jpg', startSec: 252.2 },  // Sigue habiendo escritura de instrucciones, claro, pero rodeada
  { file: '4_15.jpg', startSec: 255.4 },  // de scripts en Python para lanzar cientos de casos de prueba a la vez.
  { file: '4_19.jpg', startSec: 259.62 },  // Ojas de cálculo o paneles para llevar el seguimiento de qué porcentaje
  { file: '4_23.jpg', startSec: 263.04 },  // de casos pasa y cuáles fallen.
  { file: '4_25.jpg', startSec: 265.4 },  // Y herramientas específicas de evaluación que comparan la respuesta
  { file: '4_28.jpg', startSec: 268.46 },  // del modelo contra lo que se considera correcto.
  { file: '4_31.jpg', startSec: 271.92 },  // Si una oferta de trabajo pide sobre todo redacción persuasiva
  { file: '4_35.jpg', startSec: 275.42 },  // y creatividad no es este puesto.
  { file: '4_38.jpg', startSec: 278.3 },  // Si pide diseño de pruebas, análisis de errores y albo de código
  { file: '4_41.jpg', startSec: 281.48 },  // para automatizar es exactamente este trabajo.
  { file: '4_45.jpg', startSec: 285.36 },  // Y hay una habilidad que casi nunca aparece en el título del puesto
  { file: '4_48.jpg', startSec: 288.28 },  // pero que pesa muchísimo en el día a día.
  { file: '4_51.jpg', startSec: 291.62 },  // Saberle 100 respuestas fallidas seguidas y encontrar el patrón
  { file: '4_55.jpg', startSec: 295.44 },  // común entre ellas, en vez de arreglar cada una por separado
  { file: '4_58.jpg', startSec: 298.7 },  // como si fuera un caso aislado.
  { file: '5_01.jpg', startSec: 301.08 },  // Arreglar 15 fallos 1 a 1 es lento y no escala.
  { file: '5_04.jpg', startSec: 304.92 },  // Encontrar la causa común que los conecta a los 15
  { file: '5_07.jpg', startSec: 307.46 },  // es lo que de verdad mejora el sistema entero.
  { file: '5_10.jpg', startSec: 310.88 },  // Vale, y en cifras concretas, ¿cuánto se paga esto en España en 2026?
  { file: '5_16.jpg', startSec: 316.26 },  // Un prompt engineer que empieza ronda los 30.000 euros brutos al año.
  { file: '5_20.jpg', startSec: 320.54 },  // Con experiencia media 3 a 5 años, subia un rango de 45.000.
  { file: '5_24.jpg', startSec: 324.84 },  // Y un perfil senior con buen dominio de evaluación y algo de código
  { file: '5_28.jpg', startSec: 328.88 },  // puede superarlo 65.000, especialmente si además entiende bien el negocio
  { file: '5_33.jpg', startSec: 333.76 },  // donde se aplica.
  { file: '5_35.jpg', startSec: 335.52 },  // La razón de esa cifra no es la moda, es que muy poca gente
  { file: '5_38.jpg', startSec: 338.96 },  // combina paciencia para las pruebas con criterio de negocio
  { file: '5_41.jpg', startSec: 341.96 },  // y algo de programación, y eso junto es casé a de verdad.
  { file: '5_46.jpg', startSec: 346.84 },  // Y esa combinación explica también porque este puesto no va
  { file: '5_50.jpg', startSec: 350.2 },  // a desaparecer de la noche a la mañana, aunque los modelos
  { file: '5_52.jpg', startSec: 352.92 },  // mejoren solos.
  { file: '5_54.jpg', startSec: 354.66 },  // Cuanto más capaz es un modelo, más utiles se vuelven sus fallos
  { file: '5_58.jpg', startSec: 358.22 },  // y más falta hace alguien que sepa a encontrar los antes
  { file: '6_01.jpg', startSec: 361.34 },  // de que los encuentre un cliente real.
  { file: '6_04.jpg', startSec: 364.16 },  // Y ¿cómo se entra en esto?
  { file: '6_06.jpg', startSec: 366.46 },  // Y aquí va otro mito menos.
  { file: '6_08.jpg', startSec: 368.3 },  // No hace falta ser el que mejor escribe instrucciones del equipo.
  { file: '6_12.jpg', startSec: 372.0 },  // De hecho, perfiles de control de calidad,
  { file: '6_14.jpg', startSec: 374.68 },  // análisis de datos o soporte técnico entran en este puesto
  { file: '6_17.jpg', startSec: 377.96 },  // con más naturalidad que alguien que sólo sabe hablar bien con un chatbot.
  { file: '6_22.jpg', startSec: 382.84 },  // Lo que sí hace falta, y esto es lo que de verdad marca la diferencia,
  { file: '6_26.jpg', startSec: 386.8 },  // es incomodidad genuina con la frase, funciona casi siempre,
  { file: '6_31.jpg', startSec: 391.06 },  // sin saber exactamente cuándo falla.
  { file: '6_34.jpg', startSec: 394.1 },  // El proyecto que de verdad impresiona en una entrevista no es,
  { file: '6_37.jpg', startSec: 397.58 },  // encontré el prompt perfecto para esta tarea.
  { file: '6_40.jpg', startSec: 400.44 },  // Escoger una herramienta deía pública, cualquiera,
  { file: '6_43.jpg', startSec: 403.62 },  // y construirle un conjunto de 20 o 30 casos de prueba
  { file: '6_46.jpg', startSec: 406.82 },  // deliberadamente difíciles, documentar en cuál es falla
  { file: '6_50.jpg', startSec: 410.14 },  // y explicar por qué falla ahí y no en los fáciles.
  { file: '6_54.jpg', startSec: 414.36 },  // Esa combinación, encontrar sistemáticamente donde se rompe algo
  { file: '6_58.jpg', startSec: 418.5 },  // y explicar el porqué es exactamente lo que se paga en este trabajo.
  { file: '7_03.jpg', startSec: 423.68 },  // Así que la próxima vez que alguien se burle de este puesto,
  { file: '7_06.jpg', startSec: 426.5 },  // llamándolo, el que escribe bien las preguntas,
  { file: '7_09.jpg', startSec: 429.36 },  // ya sabes que no es eso.
  { file: '7_11.jpg', startSec: 431.28 },  // Es quien decide si un sistema de inteligencia artificial
  { file: '7_14.jpg', startSec: 434.18 },  // está de verdad listo para que confíen el gente real.
  { file: '7_18.jpg', startSec: 438.48 },  // El Data Scientist te dirás si algo es posible,
  { file: '7_22.jpg', startSec: 442.02 },  // el AI Engineer lo conecta a un producto.
  { file: '7_25.jpg', startSec: 445.04 },  // El Machine Learning Engineer lo mantiene vivo.
  { file: '7_28.jpg', startSec: 448.42 },  // El prompt engineer es quien, al final,
  { file: '7_30.jpg', startSec: 450.88 },  // si atreve a decir si las respuestas queda todo eso,
  { file: '7_33.jpg', startSec: 453.96 },  // son de verdad lo bastante buenas.
  { file: '7_36.jpg', startSec: 456.68 },  // Si te he interesado esta serie sobre empleo reales en tecnología,
  { file: '7_40.jpg', startSec: 460.34 },  // suscríbete, se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'example_intro.mp3', startSec: 67.94, volume: 0.14 },
  { file: 'hidden_reveal.mp3', startSec: 122.64, volume: 0.16 },
  { file: 'myth_twist.mp3', startSec: 191.56, volume: 0.16 },
  { file: 'tools_transition.mp3', startSec: 246.82, volume: 0.14 },
  { file: 'money_question.mp3', startSec: 310.88, volume: 0.14 },
  { file: 'money_chime.mp3', startSec: 316.3, volume: 0.17 },
  { file: 'question_transition.mp3', startSec: 364.16, volume: 0.14 },
  { file: 'insight_chime.mp3', startSec: 414.36, volume: 0.15 },
  { file: 'subscribe_chime.mp3', startSec: 456.68, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHacePromptEngineer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hace-prompt-engineer.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hace-prompt-engineer-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hace-prompt-engineer-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hace-prompt-engineer/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
