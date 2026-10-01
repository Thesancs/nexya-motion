import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { enter, progress, usePortrait } from "../anim";
import { copy } from "../data/demo";
import { Hub } from "../components/Brand";
import {
  Background,
  Connectors,
  DemoSeal,
  Headline,
  ModuleCard,
} from "../components/ui";

const L = {
  headline: { size: 76, top: 100 },
  zoomOrigin: "960px 640px",
  hub: { x: 960, y: 580 },
  paths: [
    "M 620 560 C 720 560, 740 580, 840 580",
    "M 1080 580 C 1180 580, 1200 560, 1300 560",
    "M 960 700 L 960 800",
  ],
  messages: { left: 200, top: 480, width: 420 },
  support: { left: 1300, top: 480, width: 420 },
  voice: { left: 750, top: 800, width: 420 },
};
// Vertical: mensagens acima do núcleo; atendimento e voz lado a lado abaixo.
const P: typeof L = {
  headline: { size: 84, top: 220 },
  zoomOrigin: "540px 900px",
  hub: { x: 540, y: 900 },
  paths: [
    "M 540 636 L 540 780",
    "M 470 1000 C 420 1100, 305 1100, 305 1200",
    "M 610 1000 C 660 1100, 775 1100, 775 1200",
  ],
  messages: { left: 240, top: 500, width: 600 },
  support: { left: 90, top: 1200, width: 430 },
  voice: { left: 560, top: 1200, width: 430 },
};

export const Scene6Connected: React.FC = () => {
  const frame = useCurrentFrame();
  const c = usePortrait() ? P : L;
  const lines = progress(frame, 14, 22);
  // Módulos saem antes do hub: a marca permanece até o corte para o CTA.
  const modules = 1 - progress(frame, 96, 10);
  return (
    <Background duration={117}>
      <Headline
        size={c.headline.size}
        style={{
          position: "absolute",
          top: c.headline.top,
          left: 0,
          right: 0,
          padding: "0 90px",
          textAlign: "center",
          ...enter(frame, 0),
        }}
      >
        {copy.connected}
      </Headline>
      {/* Câmera se afasta e o conjunto estabiliza */}
      <AbsoluteFill
        style={{
          scale: String(1.12 - 0.12 * progress(frame, 0, 40)),
          transformOrigin: c.zoomOrigin,
        }}
      >
        <AbsoluteFill style={{ opacity: modules }}>
          <Connectors
            paths={c.paths}
            progress={lines}
            pulse={interpolate(frame, [44, 84], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </AbsoluteFill>
        <Hub x={c.hub.x} y={c.hub.y} />
        <AbsoluteFill style={{ opacity: modules }}>
          <ModuleCard
            icon="chat"
            title="Mensagens"
            subtitle="Campanhas"
            style={{ ...c.messages, ...enter(frame, 6, 30) }}
          />
          <ModuleCard
            icon="inbox"
            title="Atendimento"
            subtitle="Respostas"
            style={{ ...c.support, ...enter(frame, 12, 30) }}
          />
          <ModuleCard
            icon="phone"
            title="Voz"
            subtitle="Ligações"
            style={{ ...c.voice, ...enter(frame, 18, 30) }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
      <DemoSeal />
    </Background>
  );
};
