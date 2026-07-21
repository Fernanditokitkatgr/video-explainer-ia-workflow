import { Composition } from "remotion";
import { InteresCompuesto } from "./InteresCompuesto";
import { SuenoStick } from "./SuenoStick";
import { SuenoStickShort } from "./SuenoStickShort";
import { AyunoIntermitente } from "./AyunoIntermitente";
import { ColonAmerica } from "./ColonAmerica";
import { ComoFuncionaLaIA } from "./ComoFuncionaLaIA";
import { SteveJobs } from "./SteveJobs";
import { RedNeuronalExplicada } from "./RedNeuronalExplicada";
import { RedNeuronalAprende } from "./RedNeuronalAprende";
import { RedNeuronalTruco } from "./RedNeuronalTruco";
import { RedNeuronalRetropropagacion } from "./RedNeuronalRetropropagacion";
import { ComoFuncionanLosLLM } from "./ComoFuncionanLosLLM";

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
        durationInFrames={2937}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SuenoStickShort"
        component={SuenoStickShort}
        durationInFrames={4960}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AyunoIntermitente"
        component={AyunoIntermitente}
        durationInFrames={7080}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ColonAmerica"
        component={ColonAmerica}
        durationInFrames={7350}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ComoFuncionaLaIA"
        component={ComoFuncionaLaIA}
        durationInFrames={7155}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SteveJobs"
        component={SteveJobs}
        durationInFrames={8114}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RedNeuronalExplicada"
        component={RedNeuronalExplicada}
        durationInFrames={7860}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RedNeuronalAprende"
        component={RedNeuronalAprende}
        durationInFrames={4980}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RedNeuronalTruco"
        component={RedNeuronalTruco}
        durationInFrames={4470}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RedNeuronalRetropropagacion"
        component={RedNeuronalRetropropagacion}
        durationInFrames={10970}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ComoFuncionanLosLLM"
        component={ComoFuncionanLosLLM}
        durationInFrames={8062}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
