import { Composition, Folder } from "remotion";
import { NexyaMotion } from "./NexyaMotion";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Hub } from "./scenes/Scene2Hub";
import { Scene3Customization } from "./scenes/Scene3Customization";
import { Scene4Campaign } from "./scenes/Scene4Campaign";
import { Scene5Voice } from "./scenes/Scene5Voice";
import { Scene6Connected } from "./scenes/Scene6Connected";
import { Scene7Closing } from "./scenes/Scene7Closing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NexyaLandscape"
        component={NexyaMotion}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={900}
      />
      {/* Mesmo roteiro com layouts próprios para celular (usePortrait nas cenas) */}
      <Composition
        id="NexyaPortrait"
        component={NexyaMotion}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={900}
      />
      <Folder name="Cenas">
        <Composition
          id="Cena1-Abertura"
          component={Scene1Opening}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={90}
        />
        <Composition
          id="Cena2-VozTexto"
          component={Scene2Hub}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={120}
        />
        <Composition
          id="Cena3-Personalizacao"
          component={Scene3Customization}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={140}
        />
        <Composition
          id="Cena4-Campanha"
          component={Scene4Campaign}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={154}
        />
        <Composition
          id="Cena5-Voz"
          component={Scene5Voice}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={114}
        />
        <Composition
          id="Cena6-Conectada"
          component={Scene6Connected}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={117}
        />
        <Composition
          id="Cena7-CTA"
          component={Scene7Closing}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={165}
        />
      </Folder>
    </>
  );
};
