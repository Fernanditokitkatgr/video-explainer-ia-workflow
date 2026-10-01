import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// investigador-anthropic-dimite - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Hace 12 días, un investigador de 27 años se sentó en un banco de un parque de San Francisco y escribió un mens
  { file: '0_07.jpg', startSec: 7.06 },  // En ese mensaje anunciaba que dejaba su trabajo, y su trabajo era investigar cómo se entrenan los modelos de in
  { file: '0_16.jpg', startSec: 16.0 },  // Lo dejaba dos meses antes de cobrar sus acciones de la empresa.
  { file: '0_19.jpg', startSec: 19.38 },  // Dos meses.
  { file: '0_20.jpg', startSec: 20.94 },  // Y la frase que escribió para explicar por qué se iba fuesta y la cito literal.
  { file: '0_25.jpg', startSec: 25.98 },  // Están corriendo directos hacia una súper inteligencia que se mejora a sí misma y apostando con nuestras vidas.
  { file: '0_33.jpg', startSec: 33.4 },  // Hoy te cuento quiénes, ¿qué dijo exactamente y por qué esto no es un berrinche de un empleado descontento?
  { file: '0_40.jpg', startSec: 40.16 },  // Se llama Jacob Coxson.
  { file: '0_42.jpg', startSec: 42.22 },  // Y lo primero que hay que entender es de dónde viene, porque cambia completamente cómo hay que leer lo que dice
  { file: '0_48.jpg', startSec: 48.42 },  // Coxson no es un crítico externo de la inteligencia artificial.
  { file: '0_51.jpg', startSec: 51.72 },  // No es un periodista ni un filósofo ni alguien que opina desde fuera.
  { file: '0_55.jpg', startSec: 55.78 },  // Es de los que lo construyen.
  { file: '0_58.jpg', startSec: 58.02 },  // Ha pasado los últimos tres años haciendo investigación de preentrenamiento.
  { file: '1_02.jpg', startSec: 62.18 },  // Y el preentrenamiento es literalmente la fase en la que un modelo aprende, la parte más profunda del proceso.
  { file: '1_08.jpg', startSec: 68.84 },  // Primero lo hizo en Open Eye.
  { file: '1_10.jpg', startSec: 70.68 },  // Después en Anthropic, las dos empresas que están en la primera línea absoluta de esta tecnología.
  { file: '1_15.jpg', startSec: 75.5 },  // O sea, que este chico ha visto el motor por dentro en los dos laboratorios más punteros del planeta.
  { file: '1_21.jpg', startSec: 81.26 },  // Y su conclusión, después de esos tres años, fue que ninguna de las dos está actuando de forma responsable.
  { file: '1_27.jpg', startSec: 87.46 },  // Pero ojo, porque aquí es donde su argumento se pone interesante de verdad.
  { file: '1_32.jpg', startSec: 92.0 },  // Coxson no dice que sus compañeros sean idiotas ni que no vean el peligro.
  { file: '1_36.jpg', startSec: 96.18 },  // Dice exactamente lo contrario.
  { file: '1_38.jpg', startSec: 98.56 },  // Escribió que en Anthropic los riesgos entienden perfectamente, que la gente de dentro sabe lo que hay en juego
  { file: '1_44.jpg', startSec: 104.04 },  // El problema, según él, es otro. Es que están atrapados en una carrera.
  { file: '1_48.jpg', startSec: 108.74 },  // Y la lógica de esa carrera es la siguiente.
  { file: '1_51.jpg', startSec: 111.68 },  // Nadie más va a actuar con responsabilidad, así que tenemos que llegarnos otros primero, aunque sea peligroso.
  { file: '1_57.jpg', startSec: 117.62 },  // Porque si nos frenamos, el que llegue primero será alguien peor.
  { file: '2_01.jpg', startSec: 121.18 },  // Y esa lógica tiene un problema evidente en cuanto la dices en voz alta.
  { file: '2_05.jpg', startSec: 125.06 },  // Que es exactamente el mismo razonamiento que está haciendo el competidor al mismo tiempo.
  { file: '2_09.jpg', startSec: 129.16 },  // Todos corren, porque todos creen que los demás corren.
  { file: '2_12.jpg', startSec: 132.74 },  // Y así nadie puede frenar, aunque absolutamente todos quieran frenar.
  { file: '2_17.jpg', startSec: 137.74 },  // Coxson tiene una frase para describir eso que a mí me parece la mejor del texto entero.
  { file: '2_22.jpg', startSec: 142.24 },  // Dice que aceptar esta carrera y entrar en la fase final es una puesta soberbia que no debería lanzarse desde e
  { file: '2_30.jpg', startSec: 150.02 },  // Y para te apensar en lo que está diciendo ahí, porque es muy concreto.
  { file: '2_33.jpg', startSec: 153.74 },  // No está diciendo que la tecnología sea mala.
  { file: '2_35.jpg', startSec: 155.78 },  // Está diciendo que una decisión de este tamaño no la puede tomar un grupo de gente en un chat interno de una em
  { file: '2_42.jpg', startSec: 162.18 },  // sin votación, sin regulación, sin que nadie de fuera pueda opinar.
  { file: '2_46.jpg', startSec: 166.76 },  // Una decisión que afecta a todo el mundo, tomada por unas cuantas personas en una sala.
  { file: '2_51.jpg', startSec: 171.44 },  // ¿Y qué es lo que devenir exactamente?
  { file: '2_54.jpg', startSec: 174.34 },  // Aquí también fue concreto, y no hablo de robots ni de nada de ciencia ficción.
  { file: '2_59.jpg', startSec: 179.1 },  // Hablo de tres capacidades.
  { file: '3_01.jpg', startSec: 181.14 },  // Sistemas sobre humanos capaces de hackear cualquier cosa.
  { file: '3_04.jpg', startSec: 184.6 },  // Capaces de revolucionar cualquier campo científico de la noche a la mañana.
  { file: '3_08.jpg', startSec: 188.8 },  // Y capaces de adquirir poder y recursos reales en el mundo.
  { file: '3_12.jpg', startSec: 192.34 },  // Y añadió la parte que más es cuese, que es que el progreso en esas tres direcciones no se está frenando.
  { file: '3_18.jpg', startSec: 198.8 },  // Todos lo hemos visto avanzar, dijo, y sigue avanzando.
  { file: '3_23.jpg', startSec: 203.06 },  // Y luego soltó la frase que ha dado la vuelta al mundo,
  { file: '3_25.jpg', startSec: 205.46 },  // que la gente que está construyendo esto crees sinceramente que podría matarnos a todos antes de que acabe la d
  { file: '3_32.jpg', startSec: 212.66 },  // No los críticos, los constructores.
  { file: '3_35.jpg', startSec: 215.48 },  // Y ahora vamos al detalle que separa a alguien que se queja de alguien que se juega algo.
  { file: '3_40.jpg', startSec: 220.36 },  // Cox ondimitió dos meses antes de que le vestieran sus acciones.
  { file: '3_43.jpg', startSec: 223.9 },  // Para el que no esté familiarizado, te lo explico rápido.
  { file: '3_46.jpg', startSec: 226.74 },  // En estas empresas, buena parte del sueldo real no es el sueldo.
  { file: '3_50.jpg', startSec: 230.36 },  // Son acciones que se van consolidando con el tiempo.
  { file: '3_52.jpg', startSec: 232.58 },  // Y si te vas antes de la fecha, las pierdes.
  { file: '3_55.jpg', startSec: 235.64 },  // En una empresa como antrópica, en un momento como éste,
  { file: '3_58.jpg', startSec: 238.92 },  // eso es una cantidad de dinero que cambio en la vida.
  { file: '4_01.jpg', startSec: 241.86 },  // El dijo que el coste económico apenas influyó en su decisión.
  { file: '4_05.jpg', startSec: 245.52 },  // Dada la magnitud de lo que le preocupaba.
  { file: '4_08.jpg', startSec: 248.26 },  // Y eso, te lo creas o no te lo creas, es un dato verificable.
  { file: '4_12.jpg', startSec: 252.18 },  // ¿Por qué es muy fácil tuitiar que el mundo se acaba?
  { file: '4_14.jpg', startSec: 254.72 },  // Es bastante más difícil hacerlo dejándose dinero encima de la mesa.
  { file: '4_18.jpg', startSec: 258.84 },  // Dicho todo esto, toca la parte honesta.
  { file: '4_21.jpg', startSec: 261.52 },  // Porque si no, esto es propaganda y no información.
  { file: '4_24.jpg', startSec: 264.86 },  // Que alguien se vaya dando un portazo, no lo convierte en que tenga razón.
  { file: '4_28.jpg', startSec: 268.78 },  // Cox ond es una persona, con una opinión.
  { file: '4_31.jpg', startSec: 271.12 },  // Y dentro de esas mismas empresas hay gente igual de cualificada
  { file: '4_34.jpg', startSec: 274.18 },  // que discrepa completamente.
  { file: '4_36.jpg', startSec: 276.3 },  // Hay investigadores de primer nivel que consideran que este riesgo
  { file: '4_39.jpg', startSec: 279.42 },  // está enormemente exagerado.
  { file: '4_41.jpg', startSec: 281.62 },  // Y hay un sesgo que conviene tener presente siempre.
  { file: '4_44.jpg', startSec: 284.4 },  // Y es que el que se va tiene un incentivo para dramatizar su salida.
  { file: '4_48.jpg', startSec: 288.04 },  // Eso es real y hay que decirlo.
  { file: '4_50.jpg', startSec: 290.44 },  // Pero también hay que decirlo otro.
  { file: '4_52.jpg', startSec: 292.7 },  // Y es que Cox ond no es el primero, ni de lejos.
  { file: '4_55.jpg', startSec: 295.8 },  // Lleva años pasando lo mismo, con nombres distintos,
  { file: '4_58.jpg', startSec: 298.58 },  // en las dos empresas y siempre por el mismo motivo.
  { file: '5_02.jpg', startSec: 302.08 },  // Gente que trabaja en seguridad, que se va.
  { file: '5_04.jpg', startSec: 304.56 },  // Y que al salir dice que dentro no se está priorizando la seguridad.
  { file: '5_08.jpg', startSec: 308.4 },  // Una persona diciendo eso es una anécdota.
  { file: '5_11.jpg', startSec: 311.0 },  // Un patrón que se repite durante años no lo es.
  { file: '5_14.jpg', startSec: 314.22 },  // Así que la próxima vez que leas un titular sobre alguien que avisa
  { file: '5_17.jpg', startSec: 317.22 },  // de que la inteligencia artificial nos va a matar,
  { file: '5_19.jpg', startSec: 319.78 },  // hasta las dos preguntas que de verdad importan.
  { file: '5_22.jpg', startSec: 322.7 },  // La primera, esta persona lo construye o lo comenta desde fuera.
  { file: '5_26.jpg', startSec: 326.76 },  // Y la segunda, que ha dejado de ganar por decirlo.
  { file: '5_29.jpg', startSec: 329.98 },  // Porque en este caso concreto, la respuesta a la primera
  { file: '5_32.jpg', startSec: 332.6 },  // es que lo construían los dos sitios a la vez.
  { file: '5_35.jpg', startSec: 335.36 },  // Y la respuesta a la segunda, que dejó sus acciones
  { file: '5_37.jpg', startSec: 337.98 },  // sin cobrar sentado en un banco de un parque.
  { file: '5_41.jpg', startSec: 341.16 },  // Si esto te ha hecho pensar, suscríbete.
  { file: '5_43.jpg', startSec: 343.48 },  // Se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_calm_tense.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'impact_beat.mp3', startSec: 19.38, volume: 0.17 },
  { file: 'quote_sting.mp3', startSec: 25.98, volume: 0.15 },
  { file: 'name_reveal.mp3', startSec: 40.16, volume: 0.15 },
  { file: 'verdict_low.mp3', startSec: 81.26, volume: 0.15 },
  { file: 'race_tension.mp3', startSec: 104.04, volume: 0.14 },
  { file: 'key_line.mp3', startSec: 137.74, volume: 0.16 },
  { file: 'world_phrase.mp3', startSec: 203.06, volume: 0.16 },
  { file: 'money_walkaway.mp3', startSec: 220.36, volume: 0.15 },
  { file: 'balance_turn.mp3', startSec: 258.84, volume: 0.14 },
  { file: 'pattern_reveal.mp3', startSec: 292.7, volume: 0.15 },
  { file: 'subscribe_chime.mp3', startSec: 341.16, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const InvestigadorAnthropicDimite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('investigador-anthropic-dimite.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`investigador-anthropic-dimite-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`investigador-anthropic-dimite-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`investigador-anthropic-dimite/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
