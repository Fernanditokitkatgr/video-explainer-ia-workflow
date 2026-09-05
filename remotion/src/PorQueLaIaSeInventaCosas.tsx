import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Por que la IA se inventa cosas - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Un abogado en Nueva York le pidió ayuda a una Ia p
  { file: '0_05.jpg', startSec: 5.76 },  // La Ia le dio seis casos judiciales perfectos, con 
  { file: '0_11.jpg', startSec: 11.6 },  // Ninguno de los seis casos existía.
  { file: '0_14.jpg', startSec: 14.4 },  // La Ia se los había inventado, de principio a fin.
  { file: '0_18.jpg', startSec: 18.08 },  // Y el abogado los presentó ante un juez real, sin c
  { file: '0_22.jpg', startSec: 22.38 },  // Hoy vamos a ver capítulo a capítulo, porque la Ia 
  { file: '0_29.jpg', startSec: 29.42 },  // Capítulo uno,
  { file: '0_30.jpg', startSec: 30.8 },  // que es exactamente una alucinación.
  { file: '0_33.jpg', startSec: 33.86 },  // No es un fallo técnico como cuando una apse cierra
  { file: '0_37.jpg', startSec: 37.46 },  // Es la Ia generando texto que suena perfectamente c
  { file: '0_42.jpg', startSec: 42.66 },  // pero que es falso.
  { file: '0_44.jpg', startSec: 44.22 },  // Y lo dice con la misma confianza que cuando aciert
  { file: '0_47.jpg', startSec: 47.22 },  // esa es la parte peligrosa.
  { file: '0_49.jpg', startSec: 49.72 },  // Capítulo dos,
  { file: '0_50.jpg', startSec: 50.88 },  // ¿por qué pasa esto?
  { file: '0_52.jpg', startSec: 52.94 },  // Una Ia de texto no busca la verdad en una base de 
  { file: '1_04.jpg', startSec: 64.6 },  // Si le preguntas algo muy específico que casi no ap
  { file: '1_08.jpg', startSec: 68.8 },  // igualmente sigue prediciendo la palabra más probab
  { file: '1_12.jpg', startSec: 72.18 },  // El resultado suena fluido y seguro,
  { file: '1_14.jpg', startSec: 74.68 },  // pero nadie comprobó que fuera verdad,
  { file: '1_16.jpg', startSec: 76.8 },  // porque la máquina no comproeba nada, sólo continúa
  { file: '1_21.jpg', startSec: 81.14 },  // Capítulo tres,
  { file: '1_22.jpg', startSec: 82.44 },  // ¿cuándo alucina más?
  { file: '1_24.jpg', startSec: 84.02 },  // Casi siempre los mismos tres casos,
  { file: '1_26.jpg', startSec: 86.76 },  // fechas y cifras exactas que no recuerda bien,
  { file: '1_29.jpg', startSec: 89.7 },  // nombres propios poco comunes y citas textuales de 
  { file: '1_35.jpg', startSec: 95.02 },  // En esos tres casos rellena el hueco con algo que s
  { file: '1_41.jpg', startSec: 101.52 },  // Capítulo cuatro,
  { file: '1_42.jpg', startSec: 102.64 },  // ¿el caso real que ya pasó?
  { file: '1_44.jpg', startSec: 104.94 },  // En 2023,
  { file: '1_46.jpg', startSec: 106.4 },  // un abogado en Nueva York usó una Ia para preparar 
  { file: '1_50.jpg', startSec: 110.18 },  // La Ia citó seis sentencias judiciales que parecían
  { file: '1_54.jpg', startSec: 114.16 },  // ninguna existía.
  { file: '1_56.jpg', startSec: 116.06 },  // El juez las buscó, no encontró nada,
  { file: '1_58.jpg', startSec: 118.74 },  // y el abogado tuvo que explicar ante el tribunal po
  { file: '2_03.jpg', startSec: 123.46 },  // le sancionaron,
  { file: '2_04.jpg', startSec: 124.68 },  // y todo por no comprobar seis nombres antes de firm
  { file: '2_08.jpg', startSec: 128.74 },  // Capítulo cinco,
  { file: '2_10.jpg', startSec: 130.26 },  // ¿cómo detectarlo tú?
  { file: '2_12.jpg', startSec: 132.36 },  // Si la Ia te da una fecha exacta, un nombre propio 
  { file: '2_19.jpg', startSec: 139.12 },  // Búscalo por tu cuenta en una fuente real antes de 
  { file: '2_23.jpg', startSec: 143.68 },  // Y si le preguntas y responde con total seguridad s
  { file: '2_27.jpg', startSec: 147.78 },  // eso no es una señal de que acierta,
  { file: '2_29.jpg', startSec: 149.88 },  // es solo como habla siempre.
  { file: '2_32.jpg', startSec: 152.24 },  // Así que la próxima vez que una Ia te de un dato mu
  { file: '2_35.jpg', startSec: 155.84 },  // tú haz una cosa muy simple.
  { file: '2_38.jpg', startSec: 158.18 },  // Compruebaló antes de creerlo, como harías con cual
  { file: '2_44.jpg', startSec: 164.54 },  // Si esto te ha hecho pensar en algo que copiaste si
  { file: '2_48.jpg', startSec: 168.98 },  // Se vien más de este mundo.
];
// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'chapter_ding1.mp3', startSec: 29.42, volume: 0.15 },
  { file: 'chapter_ding2.mp3', startSec: 49.72, volume: 0.15 },
  { file: 'chapter_ding3.mp3', startSec: 81.14, volume: 0.15 },
  { file: 'chapter_ding4.mp3', startSec: 101.52, volume: 0.15 },
  { file: 'chapter_ding5.mp3', startSec: 128.74, volume: 0.15 },
  { file: 'serious_turn.mp3', startSec: 155.84, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 168.98, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const PorQueLaIaSeInventaCosas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('por-que-la-ia-se-inventa-cosas.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`por-que-la-ia-se-inventa-cosas-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`por-que-la-ia-se-inventa-cosas-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`por-que-la-ia-se-inventa-cosas/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
