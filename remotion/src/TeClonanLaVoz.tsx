import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Como te clonan la voz con 3 segundos de audio - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Una tarde cualquiera,
  { file: '0_01.jpg', startSec: 1.54 },  // a Jennifer le suena el móvil.
  { file: '0_03.jpg', startSec: 3.36 },  // Descuelga y lo primero que hoy es a su hija llorando.
  { file: '0_06.jpg', startSec: 6.42 },  // Mamá, la he cagado.
  { file: '0_08.jpg', startSec: 8.4 },  // Su voz.
  { file: '0_09.jpg', startSec: 9.58 },  // Exacta.
  { file: '0_10.jpg', startSec: 10.66 },  // Cada matiz.
  { file: '0_11.jpg', startSec: 11.78 },  // Cada forma de respirar.
  { file: '0_13.jpg', startSec: 13.58 },  // Entonces, un hombre coge el teléfono.
  { file: '0_15.jpg', startSec: 15.88 },  // Dice que la tiene secuestrada.
  { file: '0_17.jpg', startSec: 17.62 },  // Y pide 100 .000 dólares para no hacerle baño.
  { file: '0_20.jpg', startSec: 20.7 },  // Esto pasó de verdad, en Arizona, en 2023.
  { file: '0_24.jpg', startSec: 24.14 },  // Y la hija de Jennifer nunca estuvo en peligro.
  { file: '0_26.jpg', startSec: 26.84 },  // Vamos a ver exactamente cómo se hace esto y por qué te 
  { file: '0_33.jpg', startSec: 33.92 },  // Jennifer hizo lo que haría cualquier madre.
  { file: '0_36.jpg', startSec: 36.02 },  // Se puso a gritar el nombre de su hija.
  { file: '0_38.jpg', startSec: 38.28 },  // Y al otro lado,
  { file: '0_39.jpg', startSec: 39.36 },  // la voz clonada respondía llorando, con las mismas palab
  { file: '0_44.jpg', startSec: 44.84 },  // Nadia su alrededor dudó ni un segundo de que fuera ella
  { file: '0_48.jpg', startSec: 48.64 },  // Para clonar una voz así,
  { file: '0_50.jpg', startSec: 50.26 },  // ya no hace falta un estudio de grabación ni horas de au
  { file: '0_53.jpg', startSec: 53.24 },  // Hace falta un vídeo público, uno solo,
  { file: '0_55.jpg', startSec: 55.64 },  // de unos segundos.
  { file: '0_57.jpg', startSec: 57.22 },  // Una publicación en redes,
  { file: '0_59.jpg', startSec: 59.08 },  // una nota de voz reenviada,
  { file: '1_00.jpg', startSec: 60.64 },  // un vídeo de un cumpleaños con sonido de fondo.
  { file: '1_03.jpg', startSec: 63.66 },  // La herramienta analiza el tono, el ritmo, los silencios
  { file: '1_06.jpg', startSec: 66.94 },  // y genera un modelo capaz de decir cualquier frase con e
  { file: '1_10.jpg', startSec: 70.9 },  // Escribes el texto que quieras y la máquina lo dice con 
  { file: '1_16.jpg', startSec: 76.1 },  // El FBI investigó el caso de Jennifer y no encontró ni u
  { file: '1_20.jpg', startSec: 80.76 },  // porque técnicamente no hubo secuestro, no hubo extorsió
  { file: '1_25.jpg', startSec: 85.06 },  // ni siquiera hubo una llamada rastreable a un lugar conc
  { file: '1_28.jpg', startSec: 88.5 },  // Fue una voz sintética diciendo mentiras por teléfono,
  { file: '1_31.jpg', startSec: 91.8 },  // y eso, en 2023,
  { file: '1_34.jpg', startSec: 94.0 },  // apenas encajaba en ninguna ley.
  { file: '1_36.jpg', startSec: 96.56 },  // El stafador cuelga, borre el número,
  { file: '1_38.jpg', startSec: 98.72 },  // y no queda casi nada que perseguir.
  { file: '1_40.jpg', startSec: 100.82 },  // Y aquí está el dato que de verdad importa.
  { file: '1_43.jpg', startSec: 103.48 },  // Según el propio FBI,
  { file: '1_45.jpg', startSec: 105.26 },  // las estafas que usan voces o vídeos generados poría se 
  { file: '1_54.jpg', startSec: 114.02 },  // No te ligen a ti en concreto.
  { file: '1_56.jpg', startSec: 116.08 },  // Cualquier persona con un vídeo público en redes es cand
  { file: '1_59.jpg', startSec: 119.64 },  // Cuantos más audios tuyos haya sueltos por internet más 
  { file: '2_04.jpg', startSec: 124.48 },  // Así que vamos a lo que puedes hacer hoy mismo gratis en
  { file: '2_08.jpg', startSec: 128.66 },  // Uno,
  { file: '2_09.jpg', startSec: 129.84 },  // pon una palabra clave familiar,
  { file: '2_11.jpg', startSec: 131.72 },  // algo que sólo conozcais los tuyos si que nadie diría nu
  { file: '2_16.jpg', startSec: 136.66 },  // Si te piden dinero con urgencia y la otra persona no sa
  { file: '2_20.jpg', startSec: 140.62 },  // cuelga.
  { file: '2_21.jpg', startSec: 141.7 },  // Dos,
  { file: '2_22.jpg', startSec: 142.88 },  // cuelga y llama tú por tu cuenta el número real de esa p
  { file: '2_26.jpg', startSec: 146.6 },  // Un secuestrador de verdad no te va a dejar hacer esa ll
  { file: '2_30.jpg', startSec: 150.9 },  // Tres,
  { file: '2_31.jpg', startSec: 151.94 },  // antes de creer una voz por teléfono,
  { file: '2_34.jpg', startSec: 154.08 },  // preguntate si esa persona ha subido vídeos con su voz a
  { file: '2_37.jpg', startSec: 157.62 },  // Si la respuesta es sí,
  { file: '2_39.jpg', startSec: 159.18 },  // cualquiera pudo haberla clonado.
  { file: '2_41.jpg', startSec: 161.44 },  // Esto no es un tutorial para clonar voces,
  { file: '2_44.jpg', startSec: 164.08 },  // es un aviso porque la tecnología ya existe,
  { file: '2_46.jpg', startSec: 166.68 },  // es barata y las familias normales son el objetivo real.
  { file: '2_50.jpg', startSec: 170.58 },  // Si esto te ha hecho pensar en tu palabra clave familiar
  { file: '2_53.jpg', startSec: 173.36 },  // suscríbete.
  { file: '2_54.jpg', startSec: 174.26 },  // Se viene más de este mundo.
];
// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'phone_ring.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'shock_hit.mp3', startSec: 6.42, volume: 0.16 },
  { file: 'menacing_low.mp3', startSec: 13.58, volume: 0.15 },
  { file: 'cash_dark.mp3', startSec: 17.62, volume: 0.16 },
  { file: 'voice_echo.mp3', startSec: 39.36, volume: 0.13 },
  { file: 'reveal_dark.mp3', startSec: 76.1, volume: 0.15 },
  { file: 'phone_hangup.mp3', startSec: 96.56, volume: 0.15 },
  { file: 'tick1.mp3', startSec: 128.66, volume: 0.15 },
  { file: 'hangup_click.mp3', startSec: 140.62, volume: 0.16 },
  { file: 'serious_turn.mp3', startSec: 164.08, volume: 0.14 },
  { file: 'warm_sting.mp3', startSec: 170.58, volume: 0.15 },
  { file: 'subscribe_chime.mp3', startSec: 174.26, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const TeClonanLaVoz: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('te-clonan-la-voz.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`te-clonan-la-voz-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`te-clonan-la-voz-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`te-clonan-la-voz/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
