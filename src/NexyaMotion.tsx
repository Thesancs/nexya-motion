import React from "react";
import { Audio } from "@remotion/media";
import { Series, staticFile, useVideoConfig } from "remotion";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Hub } from "./scenes/Scene2Hub";
import { Scene3Customization } from "./scenes/Scene3Customization";
import { Scene4Campaign } from "./scenes/Scene4Campaign";
import { Scene5Voice } from "./scenes/Scene5Voice";
import { Scene6Connected } from "./scenes/Scene6Connected";
import { Scene7Closing } from "./scenes/Scene7Closing";

// Janelas alinhadas ao início de cada frase da narração (medido em out/voice-captions.json).
// Transições ficam dentro de cada cena. Total: 900 frames.
export const NexyaMotion: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      {/* A narração termina em 26,9 s; o arquivo traz outro conteúdo a partir de 27,5 s, daí o corte em 816. */}
      <Audio
        name="Narração"
        src={staticFile("audio/voice.wav")}
        durationInFrames={816}
      />
      <Series>
        <Series.Sequence
          name="1 · Abertura"
          durationInFrames={90}
          premountFor={fps}
        >
          <Scene1Opening />
        </Series.Sequence>
        <Series.Sequence
          name="2 · Voz e texto"
          durationInFrames={120}
          premountFor={fps}
        >
          <Scene2Hub />
        </Series.Sequence>
        <Series.Sequence
          name="3 · Personalização"
          durationInFrames={140}
          premountFor={fps}
        >
          <Scene3Customization />
        </Series.Sequence>
        <Series.Sequence
          name="4 · Campanha e atendimento"
          durationInFrames={154}
          premountFor={fps}
        >
          <Scene4Campaign />
        </Series.Sequence>
        <Series.Sequence
          name="5 · Ligações"
          durationInFrames={114}
          premountFor={fps}
        >
          <Scene5Voice />
        </Series.Sequence>
        <Series.Sequence
          name="6 · Operação conectada"
          durationInFrames={117}
          premountFor={fps}
        >
          <Scene6Connected />
        </Series.Sequence>
        <Series.Sequence
          name="7 · Marca e CTA"
          durationInFrames={165}
          premountFor={fps}
        >
          <Scene7Closing />
        </Series.Sequence>
      </Series>
    </>
  );
};
