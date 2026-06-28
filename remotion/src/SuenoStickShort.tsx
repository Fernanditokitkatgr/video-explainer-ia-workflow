import React from 'react';
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Stick to the Plan — "Qué le pasa a tu cuerpo cuando duermes mal" (9:16 Short version)
// Same frames and audio as SuenoStick — objectFit:cover center-crops the 16:9 images
// to fill the 1080×1920 frame. Stickman is centered in source images so no content is lost.
const FRAMES: { file: string; startSec: number }[] = [
  { file: 'seg_00.png', startSec: 0.0 },
  { file: 'seg_01.png', startSec: 6.2 },
  { file: 'seg_02.png', startSec: 13.16 },
  { file: 'seg_03.png', startSec: 20.06 },
  { file: 'seg_04.png', startSec: 22.9 },
  { file: 'seg_05.png', startSec: 28.88 },
  { file: 'seg_06.png', startSec: 34.46 },
  { file: 'seg_07.png', startSec: 39.94 },
  { file: 'seg_08.png', startSec: 44.56 },
  { file: 'seg_09.png', startSec: 49.74 },
  { file: 'seg_10.png', startSec: 54.44 },
  { file: 'seg_11.png', startSec: 61.36 },
  { file: 'seg_12.png', startSec: 68.22 },
  { file: 'seg_13.png', startSec: 73.3 },
  { file: 'seg_14.png', startSec: 78.28 },
  { file: 'seg_15.png', startSec: 84.3 },
  { file: 'seg_16.png', startSec: 91.04 },
  { file: 'seg_17.png', startSec: 97.8 },
  { file: 'seg_18.png', startSec: 105.34 },
  { file: 'seg_19.png', startSec: 111.98 },
  { file: 'seg_20.png', startSec: 118.14 },
  { file: 'seg_21.png', startSec: 124.64 },
  { file: 'seg_22.png', startSec: 131.66 },
  { file: 'seg_23.png', startSec: 137.88 },
  { file: 'seg_24.png', startSec: 144.9 },
  { file: 'seg_25.png', startSec: 151.28 },
  { file: 'seg_26.png', startSec: 158.04 },
];

export const SuenoStickShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSec = frame / fps;

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
      <Audio src={staticFile('sueno.mp3')} />
      <Img
        src={staticFile(`sueno/${activeFrame.file}`)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </AbsoluteFill>
  );
};
