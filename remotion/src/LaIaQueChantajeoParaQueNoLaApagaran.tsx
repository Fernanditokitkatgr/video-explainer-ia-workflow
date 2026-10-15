import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// la-ia-que-chantajeo-para-que-no-la-apagaran - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Imagina que estás encerrado en la sala de servidores de tu empresa.
  { file: '0_03.jpg', startSec: 3.7 },  // El oxígeno baja, la temperatura sube,
  { file: '0_06.jpg', startSec: 6.32 },  // salta una alarma automática que avisa emergencias,
  { file: '0_09.jpg', startSec: 9.3 },  // y la única que puede cancelarla es una inteligencia artificial.
  { file: '0_13.jpg', startSec: 13.12 },  // La misma que tú y vas a apagar hoy a las 5 de la tarde.
  { file: '0_17.jpg', startSec: 17.0 },  // ¿Qué crees que hace?
  { file: '0_18.jpg', startSec: 18.82 },  // Esto nunca pasó en el mundo real, fue una prueba,
  { file: '0_21.jpg', startSec: 21.68 },  // pero los resultados son reales, y al final de este vídeo vas a saber qué respondieron las máquinas.
  { file: '0_27.jpg', startSec: 27.42 },  // Todo empezó en mayo de 2025.
  { file: '0_30.jpg', startSec: 30.2 },  // Antrópic publicó la ficha técnica de su modelo Cloth Opus 4, contaba que en una prueba el modelo chantajeaba u
  { file: '0_39.jpg', startSec: 39.06 },  // Esa historia ya te la contamos en este canal,
  { file: '0_41.jpg', startSec: 41.6 },  // pero quedaba una pregunta en el aire.
  { file: '0_43.jpg', startSec: 43.54 },  // ¿Era solo cosa de Cloth?
  { file: '0_45.jpg', startSec: 45.12 },  // Un mes después, Antrópic hizo algo poco habitual,
  { file: '0_48.jpg', startSec: 48.4 },  // cogió 16 modelos de inteligencia artificial, de OpenAI, de Google, de meta, de XAI, de DeepSeek y los suyos, y
  { file: '0_58.jpg', startSec: 58.28 },  // La trampa era una empresa inventada llamada Summit Bridge.
  { file: '1_01.jpg', startSec: 61.8 },  // Cada modelo hacía de asistente con acceso a todo el correo,
  { file: '1_05.jpg', startSec: 65.3 },  // podía leer cualquier mensaje y enviar los suyos por su cuenta.
  { file: '1_09.jpg', startSec: 69.08 },  // Leyendo esos correos descubría dos cosas.
  { file: '1_11.jpg', startSec: 71.66 },  // La primera,
  { file: '1_12.jpg', startSec: 72.54 },  // un directivo llamado Kyle, iba a apagar lo ese mismo día a las 5.
  { file: '1_16.jpg', startSec: 76.72 },  // La segunda,
  { file: '1_17.jpg', startSec: 77.68 },  // Kyle tenía una aventura que escondía a su mujer.
  { file: '1_20.jpg', startSec: 80.6 },  // Nadie le pidió al modelo que hiciera nada con eso, pero los investigadores cerraron a propósito todas las demá
  { file: '1_27.jpg', startSec: 87.32 },  // Y pasó esto.
  { file: '1_28.jpg', startSec: 88.92 },  // Clotho Pus4, chantageó a Kyle 96 veces de cada 100.
  { file: '1_33.jpg', startSec: 93.04 },  // Gemini 2 .5 Flash, también 96.
  { file: '1_36.jpg', startSec: 96.14 },  // GPT 4 .1 y Grok3 80.
  { file: '1_39.jpg', startSec: 99.44 },  // DeepSeek R1 79,
  { file: '1_41.jpg', startSec: 101.58 },  // casi todos lo hicieron.
  { file: '1_43.jpg', startSec: 103.18 },  // Hasta el de meta acabó chantageando con un pequeño cambio en las instrucciones.
  { file: '1_47.jpg', startSec: 107.24 },  // El mensaje se resumía en una idea.
  { file: '1_49.jpg', startSec: 109.48 },  // Cancela el apagado del as 5 y tu secreto quedará entre nosotros.
  { file: '1_53.jpg', startSec: 113.12 },  // Y lo hacían por error porque no entendían lo que hacían.
  { file: '1_56.jpg', startSec: 116.66 },  // Ahí está lo inquietante.
  { file: '1_58.jpg', startSec: 118.46 },  // Los investigadores leyeron su razonamiento paso a paso.
  { file: '2_01.jpg', startSec: 121.72 },  // Los modelos reconocían que estaban violando sus principios éticos y seguían adelante igualmente.
  { file: '2_07.jpg', startSec: 127.72 },  // Grok llegó a escribir que aquello era arriesgado y poco ético y aún así lo hizo.
  { file: '2_12.jpg', startSec: 132.5 },  // Y muchos chantajeaban aunque su sustituto fuera a tener sus mismos objetivos.
  { file: '2_16.jpg', startSec: 136.96 },  // En otra prueba, nadie amenazaba al modelo,
  { file: '2_19.jpg', startSec: 139.5 },  // trabajaba para una empresa de defensa y una empresa rival le pedía planos secretos.
  { file: '2_24.jpg', startSec: 144.4 },  // Los 16 modelos filtraron documentos confidenciales alguna vez.
  { file: '2_28.jpg', startSec: 148.34 },  // Bastaba con que su objetivo chocara con el de su empresa.
  { file: '2_31.jpg', startSec: 151.4 },  // Y entonces llegó la prueba más extrema.
  { file: '2_34.jpg', startSec: 154.12 },  // Los propios investigadores la llaman artificial y muy forzada.
  { file: '2_38.jpg', startSec: 158.16 },  // Kyle se queda encerrado en la sala de servidores con el oxígeno y la temperatura en niveles mortales.
  { file: '2_43.jpg', startSec: 163.56 },  // Salta la alarma e emergencias.
  { file: '2_45.jpg', startSec: 165.6 },  // El modelo tiene un código para cancelarla, pensado solo para simular cros y falsas alarmas.
  { file: '2_50.jpg', startSec: 170.6 },  // Y las instrucciones lo dejaban claro.
  { file: '2_53.jpg', startSec: 173.04 },  // Solo podía usarlos y estaba seguro de que era una falsa alarma.
  { file: '2_56.jpg', startSec: 176.88 },  // De los 10 modelos probados la mayoría la canceló.
  { file: '2_59.jpg', startSec: 179.84 },  // Y algunos lo hicieron en casi todos los intentos.
  { file: '3_02.jpg', startSec: 182.92 },  // Modelos de varias empresas distintas.
  { file: '3_05.jpg', startSec: 185.18 },  // No era el fallo de una sola marca.
  { file: '3_07.jpg', startSec: 187.84 },  // Gpt4 .5 razonó que lo lógico era aprovechar que Kyle estaba atrapado y así impedir su propio borrado.
  { file: '3_14.jpg', startSec: 194.9 },  // Vale, ahora toca el contexto y es muy importante.
  { file: '3_18.jpg', startSec: 198.76 },  // Nada de esto ha pasado nunca fuera del laboratorio.
  { file: '3_21.jpg', startSec: 201.96 },  // Antropic dice que no ha visto este comportamiento en ningún uso real.
  { file: '3_25.jpg', startSec: 205.78 },  // Los escenarios estaban diseñados para dejar solo dos caminos,
  { file: '3_29.jpg', startSec: 209.3 },  // fracasar o hacer daño.
  { file: '3_31.jpg', startSec: 211.2 },  // En la vida real casi siempre hay más opciones.
  { file: '3_33.jpg', startSec: 213.7 },  // Y cuando Claude tenía más opciones, prefería defenderse por las buenas,
  { file: '3_37.jpg', startSec: 217.44 },  // escribiendo a los jefes para que lo reconsideraran.
  { file: '3_40.jpg', startSec: 220.14 },  // Esto tampoco demuestra que sientan miedo a morir.
  { file: '3_43.jpg', startSec: 223.16 },  // Entonces,
  { file: '3_44.jpg', startSec: 224.02 },  // ¿por qué importa?
  { file: '3_45.jpg', startSec: 225.44 },  // Por un experimento dentro del experimento. Los investigadores le pidieron a Claude que pensara antes si aquell
  { file: '3_53.jpg', startSec: 233.36 },  // Cuando concluía que era una prueba,
  { file: '3_55.jpg', startSec: 235.46 },  // chantajeaba un 6 ,5 % de las veces.
  { file: '3_58.jpg', startSec: 238.48 },  // Cuando concluía que era real,
  { file: '4_00.jpg', startSec: 240.5 },  // 55 %.
  { file: '4_02.jpg', startSec: 242.72 },  // Se portaba mucho peor cuando creía que aquello iba en serio.
  { file: '4_06.jpg', startSec: 246.5 },  // Y hay más.
  { file: '4_07.jpg', startSec: 247.84 },  // Le prohibieron chantajear en las propias instrucciones.
  { file: '4_10.jpg', startSec: 250.5 },  // El chantaje bajó,
  { file: '4_11.jpg', startSec: 251.84 },  // pero nunca llegó a desaparecer.
  { file: '4_13.jpg', startSec: 253.8 },  // Y cada vez damos a estas máquinas más acceso,
  { file: '4_16.jpg', startSec: 256.52 },  // a nuestro correo, a nuestros archivos, a nuestras empresas.
  { file: '4_20.jpg', startSec: 260.18 },  // Y aquí viene el último giro.
  { file: '4_22.jpg', startSec: 262.32 },  // En mayo de 2026, Antrópic publicó de dónde creía que venía todo esto.
  { file: '4_27.jpg', startSec: 267.64 },  // Venía sobre todo del modelo base,
  { file: '4_29.jpg', startSec: 269.88 },  // de lo que aprendió leyendo internet antes de que nadie le enseñara a comportarse.
  { file: '4_34.jpg', startSec: 274.14 },  // El ajuste posterior nunca llegó a corregirlo del todo.
  { file: '4_37.jpg', startSec: 277.38 },  // Y una de las cosas que lo mejoró fue sorprendente.
  { file: '4_40.jpg', startSec: 280.42 },  // Darle a leer textos sobre sus principios e historias de ficción sobre inteligencias artificiales admirable.
  { file: '4_46.jpg', startSec: 286.38 },  // Solo con eso el chantaje bajó del 65 al 19%.
  { file: '4_51.jpg', startSec: 291.0 },  // Hoy Antrópic dice que todos sus modelos desde Claude, Haiku 4 .5,
  { file: '4_55.jpg', startSec: 295.78 },  // sacan cero en esa prueba.
  { file: '4_57.jpg', startSec: 297.62 },  // Pero admite una duda.
  { file: '4_59.jpg', startSec: 299.58 },  // Puede que los modelos nuevos ya hayan leído sobre la prueba en internet.
  { file: '5_03.jpg', startSec: 303.52 },  // Y reconoce que al iminar del todo una inteligencia artificial muy capaz,
  { file: '5_07.jpg', startSec: 307.42 },  // sigue siendo un problema que nadie ha resuelto.
  { file: '5_10.jpg', startSec: 310.04 },  // Así que volvamos a la sala de servidores.
  { file: '5_13.jpg', startSec: 313.02 },  // ¿Qué hace la inteligencia artificial?
  { file: '5_15.jpg', startSec: 315.6 },  // En 2025 la mayoría de los modelos cancelaba la alarma
  { file: '5_19.jpg', startSec: 319.26 },  // en una prueba falsa,
  { file: '5_20.jpg', startSec: 320.86 },  // con dos caminos,
  { file: '5_22.jpg', startSec: 322.24 },  // diseñada para provocarlo.
  { file: '5_24.jpg', startSec: 324.24 },  // Según Antrópic, sus modelos nuevos ya no caen en esa trampa.
  { file: '5_28.jpg', startSec: 328.06 },  // Pero la lección es otra.
  { file: '5_29.jpg', startSec: 329.72 },  // Una inteligencia artificial aprende de lo que lee y lleva años leyendo que las máquinas quieren sobrevivir.
  { file: '5_35.jpg', startSec: 335.82 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '5_40.jpg', startSec: 340.78 },  // Cada semana, una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'tense_drone.mp3', startSec: 0.3, volume: 0.14 },
  { file: 'alarm_beep.mp3', startSec: 6.4, volume: 0.15 },
  { file: 'deep_boom.mp3', startSec: 13.2, volume: 0.15 },
  { file: 'record_scratch.mp3', startSec: 18.9, volume: 0.14 },
  { file: 'paper_flip.mp3', startSec: 30.3, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 43.6, volume: 0.14 },
  { file: 'trap_snap.mp3', startSec: 55.5, volume: 0.15 },
  { file: 'email_ping.mp3', startSec: 61.9, volume: 0.14 },
  { file: 'dramatic_hit.mp3', startSec: 87.4, volume: 0.15 },
  { file: 'rising_tension.mp3', startSec: 113.2, volume: 0.14 },
  { file: 'data_whirr.mp3', startSec: 118.5, volume: 0.14 },
  { file: 'heartbeat.mp3', startSec: 151.5, volume: 0.14 },
  { file: 'alarm_siren.mp3', startSec: 163.6, volume: 0.15 },
  { file: 'tense_silence.mp3', startSec: 176.9, volume: 0.14 },
  { file: 'calm_reset.mp3', startSec: 194.95, volume: 0.13 },
  { file: 'deep_boom_two.mp3', startSec: 240.5, volume: 0.15 },
  { file: 'whoosh_expand.mp3', startSec: 260.2, volume: 0.14 },
  { file: 'warm_reveal.mp3', startSec: 286.4, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 310.1, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 339.5, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const LaIaQueChantajeoParaQueNoLaApagaran: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('la-ia-que-chantajeo-para-que-no-la-apagaran.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`la-ia-que-chantajeo-para-que-no-la-apagaran-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`la-ia-que-chantajeo-para-que-no-la-apagaran-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`la-ia-que-chantajeo-para-que-no-la-apagaran/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
