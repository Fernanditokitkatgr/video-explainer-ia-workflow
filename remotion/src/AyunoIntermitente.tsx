import React from 'react';
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Stick to the Plan — "Ayuno intermitente: lo que le pasa a tu cuerpo cuando no comes"
// FRAMES populated after Whisper run:
//   python scripts/whisper_timestamps.py remotion/public/ayuno-intermitente.mp3 --format remotion
// Replace the placeholder array below with the Whisper output.

// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },
  { file: '0_06.jpg', startSec: 6.3 },
  { file: '0_10.jpg', startSec: 10.16 },
  { file: '0_15.jpg', startSec: 15.54 },
  { file: '0_17.jpg', startSec: 17.94 },
  { file: '0_23.jpg', startSec: 23.56 },
  { file: '0_28.jpg', startSec: 28.32 },
  { file: '0_31.jpg', startSec: 31.3 },
  { file: '0_33.jpg', startSec: 33.5 },
  { file: '0_37.jpg', startSec: 37.84 },
  { file: '0_42.jpg', startSec: 42.56 },
  { file: '0_44.jpg', startSec: 44.22 },
  { file: '0_48.jpg', startSec: 48.5 },
  { file: '0_50.jpg', startSec: 50.94 },
  { file: '0_53.jpg', startSec: 53.38 },
  { file: '1_00.jpg', startSec: 60.16 },
  { file: '1_04.jpg', startSec: 64.62 },
  { file: '1_08.jpg', startSec: 68.86 },
  { file: '1_12.jpg', startSec: 72.32 },
  { file: '1_17.jpg', startSec: 77.68 },
  { file: '1_24.jpg', startSec: 84.6 },
  { file: '1_28.jpg', startSec: 88.04 },
  { file: '1_31.jpg', startSec: 91.42 },
  { file: '1_34.jpg', startSec: 94.76 },
  { file: '1_40.jpg', startSec: 100.82 },
  { file: '1_44.jpg', startSec: 104.86 },
  { file: '1_52.jpg', startSec: 112.38 },
  { file: '1_56.jpg', startSec: 116.34 },
  { file: '2_00.jpg', startSec: 120.86 },
  { file: '2_06.jpg', startSec: 126.56 },
  { file: '2_10.jpg', startSec: 130.62 },
  { file: '2_15.jpg', startSec: 135.28 },
  { file: '2_19.jpg', startSec: 139.62 },
  { file: '2_24.jpg', startSec: 144.48 },
  { file: '2_27.jpg', startSec: 147.14 },
  { file: '2_32.jpg', startSec: 152.22 },
  { file: '2_38.jpg', startSec: 158.28 },
  { file: '2_41.jpg', startSec: 161.94 },
  { file: '2_43.jpg', startSec: 163.92 },
  { file: '2_47.jpg', startSec: 167.52 },
  { file: '2_51.jpg', startSec: 171.9 },
  { file: '2_54.jpg', startSec: 174.16 },
  { file: '2_58.jpg', startSec: 178.08 },
  { file: '3_02.jpg', startSec: 182.04 },
  { file: '3_05.jpg', startSec: 185.54 },
  { file: '3_10.jpg', startSec: 190.5 },
  { file: '3_13.jpg', startSec: 193.74 },
  { file: '3_16.jpg', startSec: 196.72 },
  { file: '3_20.jpg', startSec: 200.26 },
  { file: '3_24.jpg', startSec: 204.9 },
  { file: '3_29.jpg', startSec: 209.94 },
  { file: '3_32.jpg', startSec: 212.14 },
  { file: '3_37.jpg', startSec: 217.62 },
  { file: '3_43.jpg', startSec: 223.26 },
  { file: '3_47.jpg', startSec: 227.2 },
  { file: '3_52.jpg', startSec: 232.9 },
];

// === FRAMES:END ===

const PLAYBACK_RATE = 1.0;

export const AyunoIntermitente: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSec = (frame / fps) * PLAYBACK_RATE;

  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) {
    if (FRAMES[i].startSec <= currentSec) {
      activeIndex = i;
    } else {
      break;
    }
  }

  const activeFrame = FRAMES[activeIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('ayuno-intermitente.mp3')} playbackRate={PLAYBACK_RATE} />
      <Img
        src={staticFile(`ayuno-intermitente/${activeFrame.file}`)}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </AbsoluteFill>
  );
};
