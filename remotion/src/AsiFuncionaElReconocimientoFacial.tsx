import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// asi-funciona-el-reconocimiento-facial - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Mira a su móvil y la pantalla se abre sola.
  { file: '0_03.jpg', startSec: 3.06 },  // Ni siquiera toca su botón. En menos de medio segundo el teléfono te ha mirado.
  { file: '0_08.jpg', startSec: 8.16 },  // Y ha decidido que eres tú. Mucha gente cree que la cámara simplemente te hace una foto
  { file: '0_12.jpg', startSec: 12.84 },  // y la compara con otra que ya tenía guardada.
  { file: '0_15.jpg', startSec: 15.86 },  // Eso sería fácil de engañar, bastaría con una foto impresa en papel,
  { file: '0_19.jpg', startSec: 19.98 },  // o con la pantalla de otro móvil. Lo que de verdad pasa y dentro es muy distinto.
  { file: '0_25.jpg', startSec: 25.06 },  // Tu cara no es una foto, es un mapa.
  { file: '0_27.jpg', startSec: 27.76 },  // Hoy vas a entender cómo se construye ese mapa,
  { file: '0_30.jpg', startSec: 30.38 },  // qué pasa con tus datos después y hasta dónde llegan de verdad sus límites.
  { file: '0_35.jpg', startSec: 35.28 },  // Empecemos por el principio. Antes de la cara, la manera más normal de bloquear un móvil
  { file: '0_39.jpg', startSec: 39.9 },  // era un código. 4, 6 números que te cleabas a mano cada vez.
  { file: '0_44.jpg', startSec: 44.1 },  // Funciona bien, pero es lento. Y los repites de cenas de veces al día.
  { file: '0_48.jpg', startSec: 48.44 },  // La promesa del desbloqueo facial era quitarse ese paso de en medio
  { file: '0_51.jpg', startSec: 51.86 },  // y mantener la misma seguridad o más.
  { file: '0_54.jpg', startSec: 54.88 },  // Antes muchos móviles ya traían un desbloqueo facial,
  { file: '0_58.jpg', startSec: 58.08 },  // pero usaba solo la cámara frontal normal, la misma que usas para hacerte un selfie.
  { file: '1_02.jpg', startSec: 62.74 },  // Esa cámara capta una imagen plana, dos dimensiones, alto y ancho,
  { file: '1_06.jpg', startSec: 66.92 },  // y a una imagen plana le basta con otra imagen plana para confumbirla.
  { file: '1_10.jpg', startSec: 70.96 },  // Una foto impresa engañaba muchos de esos sistemas antiguos,
  { file: '1_14.jpg', startSec: 74.36 },  // incluso un vídeo de tu cara reproducido en una pantalla colaba en algunos casos.
  { file: '1_18.jpg', startSec: 78.94 },  // Por eso los fabricantes buscaron otra manera de leer tu cara,
  { file: '1_21.jpg', startSec: 81.58 },  // una que no dependiera de una sola imagen plana.
  { file: '1_24.jpg', startSec: 84.96 },  // Ahí entra el mapa en tres dimensiones. Para construir ese mapa, el móvil usa dos piezas
  { file: '1_29.jpg', startSec: 89.86 },  // que no ves a simple vista. La primera es un proyector infrarrojo.
  { file: '1_33.jpg', startSec: 93.98 },  // Una misor diminuto es condido cerca del altavoz de llamadas.
  { file: '1_37.jpg', startSec: 97.44 },  // Ese proyector lanza sobre tu cara de cenas de miles de puntos de luz infrarroja,
  { file: '1_42.jpg', startSec: 102.04 },  // invisible para tus ojos. Por eso funcionan igual con la luz apagada.
  { file: '1_46.jpg', startSec: 106.48 },  // Ese patrón de puntos tiene un nombre técnico, luz estructurada.
  { file: '1_50.jpg', startSec: 110.58 },  // Los puntos caen sobre tu frente, tu nariz,
  { file: '1_53.jpg', startSec: 113.3 },  // tus cuencas de los ojos, tus pómulos.
  { file: '1_55.jpg', startSec: 115.54 },  // Cada relieve de tu cara desviesos puntos de una forma distinta.
  { file: '1_59.jpg', startSec: 119.34 },  // La segunda pieza es una cámara infrarroja especial.
  { file: '2_02.jpg', startSec: 122.38 },  // Esa cámara mira cómo se deforma la red de puntos sobre el relieve de tu cara.
  { file: '2_06.jpg', startSec: 126.66 },  // Un hueco profundo, como la cuenca del ojo, separa los puntos de una manera.
  { file: '2_11.jpg', startSec: 131.04 },  // Un relieve alto, como la punta de la nariz, los junta de otra.
  { file: '2_14.jpg', startSec: 134.92 },  // Calcula la distancia exacta de cada zona de tu cara y construye un mapa en tres dimensiones.
  { file: '2_20.jpg', startSec: 140.28 },  // No es una fotografía, es una forma.
  { file: '2_23.jpg', startSec: 143.32 },  // Esa misma cámara de profundidad no sirve solo para desbloquear el móvil.
  { file: '2_27.jpg', startSec: 147.18 },  // Muchos teléfonos la aprovechan también en las fotos de retrato,
  { file: '2_30.jpg', startSec: 150.52 },  // para calcular qué queda cerca y qué queda lejos y desenfocar el fondo.
  { file: '2_34.jpg', startSec: 154.82 },  // Y aquí está la diferencia que de verdad importa.
  { file: '2_37.jpg', startSec: 157.7 },  // Una foto impresa es completamente plana, no tiene relieve que deformar.
  { file: '2_42.jpg', startSec: 162.06 },  // Cuando el proyector lanza sus puntos sobre un papel, esos puntos caen todos a la misma distancia.
  { file: '2_47.jpg', startSec: 167.52 },  // Lo mismo pasa con la pantalla de otro móvil. El mapa que sale es plano
  { file: '2_51.jpg', startSec: 171.22 },  // y un mapa plano queda descartado al instante.
  { file: '2_54.jpg', startSec: 174.76 },  // Por eso este sistema distingue tu cara real de cualquier imagen de tu cara.
  { file: '2_58.jpg', startSec: 178.62 },  // Se ha una foto en papel o un vídeo en una pantalla.
  { file: '3_02.jpg', startSec: 182.16 },  // Ahora el otro lado de la historia. ¿Qué pasa con ese mapa una vez calculado?
  { file: '3_06.jpg', startSec: 186.62 },  // En muchos móviles modernos, ese mapa se guarda cifrado,
  { file: '3_10.jpg', startSec: 190.08 },  // encerrado dentro de un chip de seguridad aparte, separado del resto del procesador.
  { file: '3_14.jpg', startSec: 194.78 },  // Ese chip está pensado solo para guardar datos sensibles,
  { file: '3_18.jpg', startSec: 198.06 },  // tu huella, tu mapa facial, tus claves.
  { file: '3_20.jpg', startSec: 200.76 },  // El mapa se queda dentro de ese chip. Nunca sale hacia un servidor de ninguna empresa
  { file: '3_25.jpg', startSec: 205.16 },  // como si fuera una foto tuya. Cada vez que miras el móvil,
  { file: '3_28.jpg', startSec: 208.86 },  // el chip compara el mapa nuevo contra el guardado y devuelve un único resultado.
  { file: '3_33.jpg', startSec: 213.52 },  // Acierta o falla. Es una arquitectura pensada para que ni el propio fabricante
  { file: '3_37.jpg', startSec: 217.72 },  // llegue a ver tu cara convertida en imagen.
  { file: '3_40.jpg', startSec: 220.54 },  // Pero un mapa en tres dimensiones tampoco basta por sí solo.
  { file: '3_43.jpg', startSec: 223.34 },  // Hace falta una comprobación más, se llama detección de vida.
  { file: '3_47.jpg', startSec: 227.5 },  // El sistema busca señales que solo da una persona despierta frente al móvil.
  { file: '3_51.jpg', startSec: 231.74 },  // Un parpadeo. Un giro mínimo de la cabeza.
  { file: '3_54.jpg', startSec: 234.84 },  // Un gesto diminuto e involuntario.
  { file: '3_57.jpg', startSec: 237.48 },  // Una máscara o un molde en tres dimensiones puede copiar la forma exacta de tu cara.
  { file: '4_02.jpg', startSec: 242.8 },  // Pero se queda quieta. Congelada.
  { file: '4_05.jpg', startSec: 245.66 },  // Una grabación tuya parpadeando en una pantalla tampoco cuela.
  { file: '4_09.jpg', startSec: 249.2 },  // Esa pantalla sigue siendo plana de todas formas.
  { file: '4_12.jpg', startSec: 252.16 },  // Esa quietud, delata al impostor. Un objeto estático falla la prueba
  { file: '4_16.jpg', startSec: 256.4 },  // aunque su forma sea idéntica a la tuya.
  { file: '4_19.jpg', startSec: 259.42 },  // Ahora toca la parte honesta. Porque ningún sistema biométrico es perfecto.
  { file: '4_24.jpg', startSec: 264.26 },  // Los gemelos idénticos comparten una estructura facial tan parecida.
  { file: '4_28.jpg', startSec: 268.32 },  // En algunos casos logran desbloquear el móvil del otro.
  { file: '4_31.jpg', startSec: 271.4 },  // Y en pruebas controladas de laboratorio ha pasado algo parecido con máscaras.
  { file: '4_35.jpg', startSec: 275.76 },  // Máscaras en tres dimensiones muy detalladas y caras de fabricar han conseguido enganiar
  { file: '4_40.jpg', startSec: 280.4 },  // algunos sistemas de reconocimiento facial.
  { file: '4_43.jpg', startSec: 283.06 },  // Son casos puntuales, con medios que una persona cualquiera
  { file: '4_46.jpg', startSec: 286.14 },  // raramente tiene en casa. Cada nueva generación de sensores
  { file: '4_49.jpg', startSec: 289.92 },  // y de software corrige parte de esos fallos.
  { file: '4_52.jpg', startSec: 292.92 },  // Pero el riesgo cero no existe ninguna tecnología biométrica.
  { file: '4_56.jpg', startSec: 296.94 },  // Y hay otro límite más aburrido, pero real.
  { file: '4_59.jpg', startSec: 299.74 },  // Dejarte barba, cambiar de peinado de forma radical o simplemente envejecer unos años
  { file: '5_04.jpg', startSec: 304.4 },  // a veces obliga a registrar la cara de nuevo.
  { file: '5_07.jpg', startSec: 307.7 },  // Por eso casi ningún fabricante deja la cara como única llave.
  { file: '5_11.jpg', startSec: 311.46 },  // Por eso tu móvil casi siempre conserva también el sensor de cuella.
  { file: '5_15.jpg', startSec: 315.4 },  // Hay momentos en los que la cara falla. Llevas una máscarilla puesta.
  { file: '5_19.jpg', startSec: 319.52 },  // La luz del sitio es muy mala o muy intensa.
  { file: '5_22.jpg', startSec: 322.48 },  // Estás tumbado y el ángulo de la cámara te confunde con otra cosa.
  { file: '5_26.jpg', startSec: 326.34 },  // En esos casos la huella resuelve en un segundo lo que la cara no logra.
  { file: '5_30.jpg', startSec: 330.52 },  // Dos llaves biométricas distintas, cada una cubriendo los huecos de la otra.
  { file: '5_35.jpg', startSec: 335.46 },  // Esta misma tecnología de mapa facial no vive sólo dentro de tu móvil.
  { file: '5_39.jpg', startSec: 339.74 },  // Aero puertos de varios países la usan en las puertas automáticas de control de pasaporte.
  { file: '5_44.jpg', startSec: 344.58 },  // Para comparar tu cara con la foto guardada en el chip de tu propio documento.
  { file: '5_48.jpg', startSec: 348.68 },  // Cada vez más aplicaciones de banca o depago la piden también como paso extra.
  { file: '5_53.jpg', startSec: 353.08 },  // Para confirmar que eres tú quien entra en la cuenta.
  { file: '5_55.jpg', startSec: 355.96 },  // Algunas oficinas y edificios la usan incluso para abrir la puerta de entrada
  { file: '5_59.jpg', startSec: 359.84 },  // en lugar de una tarjeta. En todos esos casos se repite el mismo patrón.
  { file: '6_05.jpg', startSec: 365.32 },  // Tu propio mapa facial, guardado para confirmarte sólo a ti.
  { file: '6_09.jpg', startSec: 369.86 },  // Y aquí conviene separar dos problemas que se parecen mucho, pero no son el mismo.
  { file: '6_14.jpg', startSec: 374.78 },  // Cuando desbloquea su móvil, tú eliges participar.
  { file: '6_17.jpg', startSec: 377.98 },  // Tu mapa facial se queda guardado en tu propio chip para confirmarte sólo a ti.
  { file: '6_22.jpg', startSec: 382.92 },  // Muy distinto es que una cámara en una plaza o en una calle escanea cientos de personas
  { file: '6_27.jpg', startSec: 387.56 },  // que simplemente pasan por ahí. Gente que jamás dio su consentimiento.
  { file: '6_32.jpg', startSec: 392.52 },  // Ese segundo escenario es el que de verdad preocupa
  { file: '6_35.jpg', startSec: 395.32 },  // expertos y reguladores en varios países.
  { file: '6_38.jpg', startSec: 398.62 },  // Vigilancia masiva sobre gente que no dio permiso para nada.
  { file: '6_42.jpg', startSec: 402.62 },  // En la Unión Europea, por ejemplo, los datos de tu cara se consideran datos especialmente sensibles
  { file: '6_48.jpg', startSec: 408.32 },  // y tienen una protección legal reforzada frente a otros datos personales.
  { file: '6_52.jpg', startSec: 412.6 },  // Por eso algunas ciudades han llegado a prohibir el uso de cámaras de reconocimiento facial
  { file: '6_56.jpg', startSec: 416.68 },  // por parte de sus propias administraciones en espacios públicos.
  { file: '7_01.jpg', startSec: 421.16 },  // Desbloquear tu propia móvil y vigilar una plaza entera parecen la misma tecnología,
  { file: '7_06.jpg', startSec: 426.02 },  // pero son dos decisiones completamente distintas sobre quién decide y quién vigila.
  { file: '7_11.jpg', startSec: 431.2 },  // Así que volvamos a ese momento en el que miras el móvil y la pantalla se abre sola.
  { file: '7_16.jpg', startSec: 436.1 },  // Ahora ya sabes lo que de verdad ocurre en ese medio segundo.
  { file: '7_20.jpg', startSec: 440.04 },  // Dezenas de miles de puntos de luz invisible.
  { file: '7_23.jpg', startSec: 443.18 },  // Una cámara leyendo el relieve de tu cara.
  { file: '7_25.jpg', startSec: 445.88 },  // Un mapa en tres dimensiones comparado dentro de un chip
  { file: '7_28.jpg', startSec: 448.48 },  // que nadie más llega a abrir. Tu cara no es una foto, es un mapa.
  { file: '7_34.jpg', startSec: 454.3 },  // Y ahora sabes cómo se construye,
  { file: '7_36.jpg', startSec: 456.54 },  // dónde se guarda y hasta dónde llegan sus límites.
  { file: '7_40.jpg', startSec: 460.76 },  // Si te gusta entender cómo funciona de verdad la tecnología
  { file: '7_43.jpg', startSec: 463.42 },  // que usas cada día, suscríbete. Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'unlock_chime.mp3', startSec: 0.0, volume: 0.15 },
  { file: 'reveal_chime.mp3', startSec: 25.1, volume: 0.16 },
  { file: 'keypad_beep.mp3', startSec: 39.9, volume: 0.14 },
  { file: 'soft_whoosh.mp3', startSec: 85.0, volume: 0.14 },
  { file: 'scan_sweep.mp3', startSec: 119.3, volume: 0.14 },
  { file: 'reveal_chime2.mp3', startSec: 154.8, volume: 0.16 },
  { file: 'fail_buzz.mp3', startSec: 162.1, volume: 0.15 },
  { file: 'lock_click.mp3', startSec: 182.2, volume: 0.15 },
  { file: 'heartbeat_soft.mp3', startSec: 223.3, volume: 0.13 },
  { file: 'tense_sting.mp3', startSec: 237.5, volume: 0.15 },
  { file: 'record_scratch.mp3', startSec: 259.4, volume: 0.14 },
  { file: 'fingerprint_beep.mp3', startSec: 296.9, volume: 0.15 },
  { file: 'airport_chime.mp3', startSec: 335.5, volume: 0.14 },
  { file: 'scifi_sting.mp3', startSec: 369.9, volume: 0.16 },
  { file: 'closing_turn.mp3', startSec: 431.2, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 460.8, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const AsiFuncionaElReconocimientoFacial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('asi-funciona-el-reconocimiento-facial.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`asi-funciona-el-reconocimiento-facial-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`asi-funciona-el-reconocimiento-facial-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`asi-funciona-el-reconocimiento-facial/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
