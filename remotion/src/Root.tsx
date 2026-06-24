import "./index.css";
import { Composition } from "remotion";
import { InteresCompuesto } from "./InteresCompuesto";
import { TikTokVideo, calculateMetadata } from "./TikTokEditor";
import { VoldemortVideo } from "./VoldemortVideo";
import { UntangleVideo } from "./UntangleVideo";
import { AuthoritativeBrandVideo } from "./AuthoritativeBrandVideo";
import { PilotoUGCVideo, PilotoV2Video, PilotoV3Video } from "./PilotoUGCVideo";
import { CreavsBlueprintRender, calculateMetadata as creavsMeta } from "./CreavsBlueprintRender";
import { SubtitleMatiRender, calculateMetadata as subtitleMatiMeta } from "./SubtitleMatiRender";

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
        id="PilotoUGCVideo"
        component={PilotoUGCVideo}
        durationInFrames={604}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PilotoV2Video"
        component={PilotoV2Video}
        durationInFrames={591}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PilotoV3Video"
        component={PilotoV3Video}
        durationInFrames={457}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AuthoritativeBrandVideo"
        component={AuthoritativeBrandVideo}
        durationInFrames={2043}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="UntangleVideo"
        component={UntangleVideo}
        durationInFrames={1400}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TikTokEdit"
        component={TikTokVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ videoDurationFrames: 900 }}
        calculateMetadata={calculateMetadata}
      />
      <Composition
        id="VoldemortVideo"
        component={VoldemortVideo}
        durationInFrames={480}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CreavsBlueprintRender"
        component={CreavsBlueprintRender}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ jobId: 'preview', blueprint: undefined }}
        calculateMetadata={creavsMeta}
      />
      <Composition
        id="SubtitleMatiRender"
        component={SubtitleMatiRender}
        durationInFrames={720}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ jobId: 'sample', script: undefined }}
        calculateMetadata={subtitleMatiMeta}
      />
    </>
  );
};
