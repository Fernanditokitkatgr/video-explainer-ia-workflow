import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-hace-ai-engineer - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Llevamos dos vídeos hablando de quién analiza el agua y quién construye la tubería.
  { file: '0_04.jpg', startSec: 4.92 },  // Pero falta alguien en esa cadena y es probable que sea el puesto del que más soyes hablar ahora mismo.
  { file: '0_11.jpg', startSec: 11.18 },  // El AI -Engineer.
  { file: '0_14.jpg', startSec: 14.04 },  // Y casi todo el mundo se hace una idea equivocada de qué hace en realidad.
  { file: '0_18.jpg', startSec: 18.66 },  // La mayoría de la gente cree que un AI -Engineer entraena inteligencias artificiales.
  { file: '0_24.jpg', startSec: 24.28 },  // No.
  { file: '0_25.jpg', startSec: 25.38 },  // Casi nunca entren a nada desde cero.
  { file: '0_27.jpg', startSec: 27.84 },  // Y entender por qué es la clave de todo este vídeo.
  { file: '0_32.jpg', startSec: 32.06 },  // Volvamos al agua un momento.
  { file: '0_34.jpg', startSec: 34.32 },  // El Data Scientist analiza el agua.
  { file: '0_37.jpg', startSec: 37.18 },  // El DataEngineer construye la tubería que la trae.
  { file: '0_40.jpg', startSec: 40.62 },  // Pero alguien tiene que instalar el grifo en tu cocina.
  { file: '0_43.jpg', startSec: 43.98 },  // Alguien tiene que hacer que cuando tú lo abres salga agua caliente en el momento exacto en que las necesitas s
  { file: '0_53.jpg', startSec: 53.56 },  // Ese es el AI -Engineer.
  { file: '0_56.jpg', startSec: 56.3 },  // En la práctica esto significa una cosa muy concreta.
  { file: '1_00.jpg', startSec: 60.36 },  // Modelos como los que hacen chat GPT, Cloud o Gemini ya existen.
  { file: '1_04.jpg', startSec: 64.82 },  // Entrenados por equipos enormes con presupuestos de cientos de millones.
  { file: '1_09.jpg', startSec: 69.26 },  // El AI -Engineer no compite con eso.
  { file: '1_12.jpg', startSec: 72.44 },  // Lo usa a través de una conexión,
  { file: '1_15.jpg', startSec: 75.02 },  // como quien usa el agua que ya llega por la tubería.
  { file: '1_18.jpg', startSec: 78.14 },  // Su trabajo es construir el producto encima de ese modelo, no el modelo en sí.
  { file: '1_23.jpg', startSec: 83.2 },  // Y aquí es donde entra la palabra que más vas a oír sitemetes en esto.
  { file: '1_27.jpg', startSec: 87.5 },  // Ragh.
  { file: '1_28.jpg', startSec: 88.92 },  // Son las siglas de recuperación aumentada de generación y suena más complicado de lo que es.
  { file: '1_34.jpg', startSec: 94.76 },  // Es enseñarle a la IA a buscar información concreta, la tuya, la de tu empresa, antes de responder,
  { file: '1_40.jpg', startSec: 100.98 },  // en vez de fiarse solo de lo que aprendió durante el entrenamiento.
  { file: '1_44.jpg', startSec: 104.8 },  // Sin eso, un modelo puede sonar seguro de sí mismo y estar completamente equivocado sobre tus propios datos.
  { file: '1_51.jpg', startSec: 111.86 },  // Construir bien ese sistema de búsqueda es buena parte del trabajo real.
  { file: '1_56.jpg', startSec: 116.46 },  // Vamos con un ejemplo muy típico y muy concreto.
  { file: '2_00.jpg', startSec: 120.16 },  // Una aseguradora quiere un asistente que responda dudas sobre polizas a sus clientes.
  { file: '2_05.jpg', startSec: 125.46 },  // El modelo de lenguaje ya sabe hablar perfectamente, eso no hay que enseñárselo.
  { file: '2_10.jpg', startSec: 130.48 },  // Lo que no sabe es que dice exactamente la poliza número tal de ese cliente concreto, porque esa información nu
  { file: '2_19.jpg', startSec: 139.54 },  // El IA y engineer construye el puente,
  { file: '2_22.jpg', startSec: 142.46 },  // el sistema que busca esa poliza exacta se la pasa al modelo como contexto y solo entonces deja que responda.
  { file: '2_29.jpg', startSec: 149.7 },  // Si ese puente está mal construido, el modelo se inventa condiciones que la poliza no dice con total seguridad 
  { file: '2_37.jpg', startSec: 157.17 },  // Y ese fallo tiene nombre,
  { file: '2_38.jpg', startSec: 158.92 },  // se le llama alucinación y detectarlo antes de que llegue al cliente es gran parte del trabajo.
  { file: '2_45.jpg', startSec: 165.16 },  // La otra mitad del trabajo son los agentes.
  { file: '2_48.jpg', startSec: 168.56 },  // Ya lo vimos en otro vídeo,
  { file: '2_50.jpg', startSec: 170.3 },  // un chatbot contesta, una gente actúa.
  { file: '2_53.jpg', startSec: 173.54 },  // El IA y engineer es quien decide qué herramientas puede usar ese agente,
  { file: '2_58.jpg', startSec: 178.42 },  // que instrucciones recibe exactamente y qué pasa cuando decide algo que no debería.
  { file: '3_04.jpg', startSec: 184.13 },  // Porque una gente con acceso real a herramientas puede hacer daño real si nadie ha pensado bien los límites.
  { file: '3_11.jpg', startSec: 191.0 },  // Esa parte, diseñar los límites,
  { file: '3_13.jpg', startSec: 193.5 },  // es más trabajo de ingeniería de software clásica que de inteligencia artificial.
  { file: '3_18.jpg', startSec: 198.44 },  // Y aquí está el dato que más sorprende cuando lo comparas con el puesto vecino.
  { file: '3_23.jpg', startSec: 203.14 },  // Existe otro rol, el Machine Learning Engineer y a menudo se confunden.
  { file: '3_28.jpg', startSec: 208.1 },  // El Machine Learning Engineer sí entren a modelos desde cero,
  { file: '3_32.jpg', startSec: 212.34 },  // cuida los datos de entrenamiento, ajusta la arquitectura,
  { file: '3_35.jpg', startSec: 215.68 },  // vigila que el modelo no se degrade con el tiempo.
  { file: '3_38.jpg', startSec: 218.96 },  // Es el ingeniero de fiabilidad del modelo.
  { file: '3_42.jpg', startSec: 222.2 },  // El IA y engineer es el ingeniero de producto,
  { file: '3_45.jpg', startSec: 225.68 },  // el que construye lo que el usuario final llega a tocar.
  { file: '3_49.jpg', startSec: 229.52 },  // Se parecen mucho sobre el papel, comparten herramientas, pero el día a día es distinto.
  { file: '3_55.jpg', startSec: 235.04 },  // En las ofertas de trabajo reales se nota clarísimo.
  { file: '3_58.jpg', startSec: 238.64 },  // Raja parece en más de un tercio de las ofertas de IA y engineer y solo en una de cada 6 de Machine Learning En
  { file: '4_07.jpg', startSec: 247.1 },  // entrenar modelos con librerías especializadas aparece el doble de veces en las ofertas de Machine Learning Eng
  { file: '4_13.jpg', startSec: 253.44 },  // Somprimos muy cercanos pero no son el mismo trabajo.
  { file: '4_16.jpg', startSec: 256.92 },  // Vale y en cifras concretas, ¿cuánto se paga esto en España en 2016?
  { file: '4_21.jpg', startSec: 261.66 },  // El sueldo medio de un IA y engineer ronda los 71 .000 euros brutos al año.
  { file: '4_27.jpg', startSec: 267.76 },  // El de un Machine Learning Engineer puede llegar más alto en el rango superior entre 48 .000 y más de 85 .000.
  { file: '4_35.jpg', startSec: 275.72 },  // Así que, al contrario de lo que la mayoría asume,
  { file: '4_38.jpg', startSec: 278.76 },  // entrenar el modelo sigue pagándose algo mejor que construir encima de él al menos por ahora.
  { file: '4_44.jpg', startSec: 284.4 },  // Pero el IA y engineer parte de un sueldo ya muy por encima de la media del sector tecnológico.
  { file: '4_50.jpg', startSec: 290.34 },  // Y esos dos puestos comparten más de la mitad de sus habilidades sobre el papel.
  { file: '4_55.jpg', startSec: 295.08 },  // Lo que de verdad lo separa en la práctica diaria no es lo que sabes,
  { file: '4_59.jpg', startSec: 299.28 },  // es en qué pasas las horas.
  { file: '5_01.jpg', startSec: 301.74 },  // Y por qué está explotando esta demanda justo ahora?
  { file: '5_05.jpg', startSec: 305.24 },  // Porque hace tres años casi ninguna empresa tenía un modelo de lenguaje potente al que conectarse por una simpl
  { file: '5_12.jpg', startSec: 312.06 },  // Hoy cualquier empresa puede acceder a un modelo de nivel mundial en minutos. Lo que no tiene es a nadie que se
  { file: '5_24.jpg', startSec: 324.5 },  // Ese hueco, entre tener acceso a la IA y saber usarla bien de verdad,
  { file: '5_28.jpg', startSec: 328.94 },  // es exactamente el hueco que ocupa este puesto.
  { file: '5_32.jpg', startSec: 332.28 },  // Por eso las ofertas de este perfil se han multiplicado en apenas dos años,
  { file: '5_36.jpg', startSec: 336.48 },  // mucho más rápido que casi cualquier otro puesto técnico. No porque haga falta gente que sepa más matemáticas q
  { file: '5_43.jpg', startSec: 343.34 },  // sino porque hace falta gente que sepa unir piezas que ya existen, sin que el resultado se caiga a la primera p
  { file: '5_50.jpg', startSec: 350.68 },  // Y hay una parte del trabajo que casi nunca se cuenta y que ocupa muchísimas horas.
  { file: '5_55.jpg', startSec: 355.6 },  // Evaluarse las respuestas son buenas no es tan simple como con código tradicional,
  { file: '6_00.jpg', startSec: 360.28 },  // donde algo funciona o no funciona.
  { file: '6_02.jpg', startSec: 362.74 },  // Aquí hay que construir conjuntos de preguntas de prueba,
  { file: '6_06.jpg', startSec: 366.08 },  // revisar cientos de respuestas y decidir con números si una versión nueva del sistema es mejor que la anterior.
  { file: '6_12.jpg', startSec: 372.98 },  // Sin esa evaluación constante, cualquier cambio pequeño en el diseño puede romper algo en silencio y nadie se e
  { file: '6_21.jpg', startSec: 381.42 },  // Por eso una parte grande del día a día se parece más a hacer de científico de datos sobre el propio producto q
  { file: '6_28.jpg', startSec: 388.84 },  // ¿Y cómo se entra en esto?
  { file: '6_31.jpg', startSec: 391.3 },  // La base es programación seria, sobre todo Python y entender bien cómo funcionan las APIs.
  { file: '6_37.jpg', startSec: 397.18 },  // Después hay que entender los conceptos de arriba,
  { file: '6_39.jpg', startSec: 399.9 },  // RAG, agentes, evaluación de calidad de las respuestas sin necesidad de saber entrenar una red neuronal desde c
  { file: '6_47.jpg', startSec: 407.3 },  // Y el proyecto que de verdad impresiona en una entrevista no es conecté la API de un modelo.
  { file: '6_52.jpg', startSec: 412.86 },  // Es construir un asistente que busque información real en un conjunto de documentos tuyo y que puedas medir con
  { file: '7_03.jpg', startSec: 423.88 },  // Eso, medir cuando falla, es lo que separa un proyecto de fin de semana de algo que una empresa se atrevería a 
  { file: '7_11.jpg', startSec: 431.96 },  // Así que la próxima vez que alguien te diga que un AI Engineer entrena la inteligencia artificial,
  { file: '7_17.jpg', startSec: 437.86 },  // ya sabes que no, que su trabajo empieza justo donde termina el entrenamiento.
  { file: '7_22.jpg', startSec: 442.26 },  // Es quien instala el grifo, quien decide que sale por él y quien se asegura de que lo que sale sea agua de verd
  { file: '7_31.jpg', startSec: 451.46 },  // Con el agua analizada,
  { file: '7_32.jpg', startSec: 452.94 },  // la tubería construida y el grifo instalado,
  { file: '7_35.jpg', startSec: 455.44 },  // la cadena completa por fin tiene sentido.
  { file: '7_38.jpg', startSec: 458.38 },  // Y si algún día ese grifo suelta agua fría cuando deberías salir caliente o directamente no sale nada,
  { file: '7_44.jpg', startSec: 464.34 },  // ya sabes exactamente a quién buscar. Si te ha interesado esta serie sobre empleos reales en tecnología,
  { file: '7_50.jpg', startSec: 470.48 },  // suscríbete.
  { file: '7_51.jpg', startSec: 471.48 },  // Se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 53.56, volume: 0.16 },
  { file: 'concept_ping.mp3', startSec: 87.5, volume: 0.15 },
  { file: 'warning_sting.mp3', startSec: 104.8, volume: 0.16 },
  { file: 'agent_shift.mp3', startSec: 165.16, volume: 0.15 },
  { file: 'curious_twist.mp3', startSec: 198.44, volume: 0.16 },
  { file: 'money_chime.mp3', startSec: 261.66, volume: 0.17 },
  { file: 'question_transition.mp3', startSec: 301.74, volume: 0.14 },
  { file: 'analytical_tone.mp3', startSec: 355.6, volume: 0.15 },
  { file: 'confident_swell.mp3', startSec: 407.3, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 442.26, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 470.48, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHaceAiEngineer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hace-ai-engineer.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hace-ai-engineer-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hace-ai-engineer-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hace-ai-engineer/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
