import React from 'react';
import {Composition} from 'remotion';
import {ShortAnimadoChatgpt, SHORT_CHATGPT_SECONDS} from './ShortAnimadoChatgpt';

export const PruebasRoot: React.FC = () => (
  <Composition
    id="ShortAnimadoChatgpt"
    component={ShortAnimadoChatgpt}
    durationInFrames={Math.ceil(SHORT_CHATGPT_SECONDS * 30)}
    fps={30}
    width={1080}
    height={1920}
  />
);
