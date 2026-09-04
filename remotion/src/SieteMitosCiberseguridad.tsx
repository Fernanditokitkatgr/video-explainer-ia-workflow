import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// 7 mitos de ciberseguridad que sigues creyendo - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Hay siete cosas que casi todo el mundo crees sobre
  { file: '0_03.jpg', startSec: 3.84 },  // y las siete son mentira, o casi.
  { file: '0_06.jpg', startSec: 6.76 },  // Vamos a desmontarlas una por una, y al final vas a
  { file: '0_13.jpg', startSec: 13.12 },  // Mito uno.
  { file: '0_14.jpg', startSec: 14.42 },  // El modo incógnito te esconde de todo Internet.
  { file: '0_17.jpg', startSec: 17.78 },  // Lo crees porque el navegador te lo dice literalmen
  { file: '0_21.jpg', startSec: 21.32 },  // Nadie podrá ver tu actividad.
  { file: '0_23.jpg', startSec: 23.78 },  // La realidad es que el modo incógnito solo borra tu
  { file: '0_29.jpg', startSec: 29.26 },  // Tu operadora, tu empresa, si usa su wifi,
  { file: '0_32.jpg', startSec: 32.18 },  // y cada web que visitas te siguen viendo exactament
  { file: '0_35.jpg', startSec: 35.9 },  // Lo único que hace de verdad es no guardar cookies 
  { file: '0_40.jpg', startSec: 40.7 },  // Nada más.
  { file: '0_42.jpg', startSec: 42.38 },  // Mito dos.
  { file: '0_43.jpg', startSec: 43.76 },  // Si la web tiene el candado verde, es una web segur
  { file: '0_47.jpg', startSec: 47.48 },  // Lo crees porque durante años nos dijeron,
  { file: '0_50.jpg', startSec: 50.02 },  // busca el candado antes de meter tu contraseña.
  { file: '0_53.jpg', startSec: 53.02 },  // La realidad es que ese candado solo dice que la co
  { file: '0_58.jpg', startSec: 58.98 },  // Cualquier página de Fishing echa en una tarde tamb
  { file: '1_03.jpg', startSec: 63.74 },  // Lo que de verdad importa es la dirección exacta, l
  { file: '1_09.jpg', startSec: 69.92 },  // Mito tres.
  { file: '1_11.jpg', startSec: 71.3 },  // Un antivirus gratuito te protege igual que uno de 
  { file: '1_15.jpg', startSec: 75.06 },  // Lo crees porque ambos dicen detecta virus en la po
  { file: '1_19.jpg', startSec: 79.58 },  // La realidad es que la detección básica sí es parec
  { file: '1_26.jpg', startSec: 86.88 },  // suelen ir solo en las versiones de pago.
  { file: '1_29.jpg', startSec: 89.26 },  // Si no puedes pagar uno, mejor un gratuito conocido
  { file: '1_35.jpg', startSec: 95.5 },  // Mito cuatro.
  { file: '1_36.jpg', startSec: 96.92 },  // Una web pn te hace invisible en internet.
  { file: '1_40.jpg', startSec: 100.14 },  // Lo crees porque los anuncios de web pn literalment
  { file: '1_45.jpg', startSec: 105.94 },  // La realidad es que una web pn solo esconde tu dire
  { file: '1_50.jpg', startSec: 110.96 },  // La propia empresa de la web pn puede ver todo tu t
  { file: '1_55.jpg', startSec: 115.94 },  // Es útil,
  { file: '1_57.jpg', startSec: 117.08 },  // pero es privacidad parcial,
  { file: '1_58.jpg', startSec: 118.66 },  // no una capa mágica de anonimato total.
  { file: '2_01.jpg', startSec: 121.88 },  // Mito cinco.
  { file: '2_03.jpg', startSec: 123.54 },  // Borrar un archivo lo elimina para siempre.
  { file: '2_06.jpg', startSec: 126.54 },  // Lo crees porque el icono desaparece y la papelera 
  { file: '2_10.jpg', startSec: 130.48 },  // La realidad es que solo se borra la referencia al 
  { file: '2_13.jpg', startSec: 133.84 },  // El contenido sigue físicamente en el disco. Con so
  { file: '2_23.jpg', startSec: 143.04 },  // Si de verdad quieres borrar algo sensible,
  { file: '2_25.jpg', startSec: 145.34 },  // hace falta un borrado seguro.
  { file: '2_26.jpg', startSec: 146.98 },  // No la papelera normal.
  { file: '2_29.jpg', startSec: 149.5 },  // Mito seis.
  { file: '2_30.jpg', startSec: 150.84 },  // Los iPhone y los Mac no les afectan los virus.
  { file: '2_34.jpg', startSec: 154.34 },  // Lo crees porque durante años apenas subo casos y A
  { file: '2_39.jpg', startSec: 159.84 },  // La realidad es que tienen menos malware tradiciona
  { file: '2_42.jpg', startSec: 162.74 },  // pero no son inmunes.
  { file: '2_44.jpg', startSec: 164.3 },  // Y el Fishing, que es el ataque más común hoy,
  { file: '2_47.jpg', startSec: 167.22 },  // funciona exactamente igual en un iPhone que en cua
  { file: '2_51.jpg', startSec: 171.38 },  // La marca del aparato no te protege de que tú mismo
  { file: '2_56.jpg', startSec: 176.86 },  // Mito siete.
  { file: '2_58.jpg', startSec: 178.06 },  // Y este sorprende a mucha gente.
  { file: '3_00.jpg', startSec: 180.22 },  // Cambiar tu contraseña cada mes te hace más seguro.
  { file: '3_04.jpg', startSec: 184.14 },  // Lo crees porque durante años fue la política oblig
  { file: '3_09.jpg', startSec: 189.24 },  // La realidad,
  { file: '3_10.jpg', startSec: 190.64 },  // según el propio instituto de estándares de Estados
  { file: '3_13.jpg', startSec: 193.8 },  // es que forzar cambios frecuentes hace que la gente
  { file: '3_18.jpg', startSec: 198.98 },  // tipo añadir un número al final.
  { file: '3_21.jpg', startSec: 201.54 },  // Es mejor una contraseña larga y única que no cambi
  { file: '3_25.jpg', startSec: 205.34 },  // y cambiar las solos si hay una fuga real.
  { file: '3_28.jpg', startSec: 208.44 },  // Así que revisa esto hoy.
  { file: '3_30.jpg', startSec: 210.52 },  // Una contraseña larga sin rotar porque sí,
  { file: '3_33.jpg', startSec: 213.14 },  // comprobar la dirección exacta antes del candado y 
  { file: '3_39.jpg', startSec: 219.76 },  // Si alguno de estos siete te has sorprendido, suscr
  { file: '3_43.jpg', startSec: 223.0 },  // se viene más de este mundo.
];
// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'myth_ding1.mp3', startSec: 13.12, volume: 0.15 },
  { file: 'myth_ding2.mp3', startSec: 42.38, volume: 0.15 },
  { file: 'myth_ding3.mp3', startSec: 69.92, volume: 0.15 },
  { file: 'myth_ding4.mp3', startSec: 95.5, volume: 0.15 },
  { file: 'myth_ding5.mp3', startSec: 121.88, volume: 0.15 },
  { file: 'myth_ding6.mp3', startSec: 149.5, volume: 0.15 },
  { file: 'myth_ding7.mp3', startSec: 176.86, volume: 0.15 },
  { file: 'serious_turn.mp3', startSec: 208.44, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 223.0, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const SieteMitosCiberseguridad: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('7-mitos-ciberseguridad.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`7-mitos-ciberseguridad-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`7-mitos-ciberseguridad-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`7-mitos-ciberseguridad/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
