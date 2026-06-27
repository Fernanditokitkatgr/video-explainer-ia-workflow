import { Composition } from "remotion";
import { InteresCompuesto } from "./InteresCompuesto";
import { SuenoStick } from "./SuenoStick";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InteresCompuesto"
        component={InteresCompuesto}
        durationInFrames={3890}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SuenoStick"
        component={SuenoStick}
        durationInFrames={4960}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
