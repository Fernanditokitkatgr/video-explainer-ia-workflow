import React from 'react';
import {Composition} from 'remotion';
import {calcularPlano, MotorPlano, MotorProps} from './MotorPlano';
import {HOJA_SEGUNDOS, HojaPersonajes} from './HojaPersonajes';

export const MotorRoot: React.FC = () => (
  <>
    {/* Cualquier vídeo: --props='{"slug":"<slug>"}' lee public-motor/<slug>/plano.json (duración y tamaño salen del plano). */}
    <Composition
      id="MotorPlano"
      component={MotorPlano}
      calculateMetadata={calcularPlano}
      defaultProps={{slug: 'por-que-bitcoin-sube-y-baja', plano: null} as MotorProps}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition id="HojaPersonajes" component={HojaPersonajes} durationInFrames={HOJA_SEGUNDOS * 30} fps={30} width={1920} height={1080} />
  </>
);
