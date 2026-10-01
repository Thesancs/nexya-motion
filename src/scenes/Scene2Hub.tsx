import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { enter, progress, usePortrait } from "../anim";
import { copy, demo } from "../data/demo";
import { Hub } from "../components/Brand";
import { Shell } from "../components/Shell";
import {
  Background,
  Connectors,
  DemoSeal,
  Headline,
  ModuleCard,
  StatusPill,
  Wave,
} from "../components/ui";

const L = {
  headline: { size: 76, top: 120 },
  zoomOrigin: "960px 620px",
  hub: { x: 960, y: 600 },
  paths: ["M 700 620 C 780 620, 790 600, 840 600", "M 1080 600 C 1130 600, 1140 620, 1220 620"],
  textCard: { left: 240, top: 500, width: 460 },
  voiceCard: { left: 1220, top: 500, width: 460 },
  waveWidth: 396,
};
// Vertical: agentes empilhados acima e abaixo do núcleo.
const P: typeof L = {
  headline: { size: 84, top: 220 },
  zoomOrigin: "540px 960px",
  hub: { x: 540, y: 960 },
  paths: ["M 540 717 L 540 840", "M 540 1080 L 540 1200"],
  textCard: { left: 190, top: 520, width: 700 },
  voiceCard: { left: 190, top: 1200, width: 700 },
  waveWidth: 636,
};

export const Scene2Hub: React.FC = () => {
  const frame = useCurrentFrame();
  const c = usePortrait() ? P : L;
  const shell = progress(frame, 0, 30);
  const hub = progress(frame, 4, 20);
  return (
    <Background duration={120}>
      {/* Shell emergindo ao fundo */}
      <Shell
        active="Agentes"
        title="Agentes"
        subtitle={demo.indicators[0]}
        style={{ opacity: 0.12 * shell, scale: String(1.08 - 0.04 * shell), filter: "blur(3px)" }}
      />
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
        {copy.hub}
      </Headline>
      {/* Leve aproximação para destacar os estados */}
      <AbsoluteFill style={{ scale: String(1 + 0.05 * progress(frame, 40, 70)), transformOrigin: c.zoomOrigin }}>
        <Connectors paths={c.paths} progress={[progress(frame, 26, 20), progress(frame, 32, 20)]} />
        <AbsoluteFill
          style={{ opacity: hub, scale: String(0.7 + 0.3 * hub), transformOrigin: `${c.hub.x}px ${c.hub.y}px` }}
        >
          <Hub x={c.hub.x} y={c.hub.y} />
        </AbsoluteFill>
        <ModuleCard icon="chat" title={demo.agents.text} glow style={{ ...c.textCard, ...enter(frame, 10, 40) }}>
          <div style={{ marginTop: 28, ...enter(frame, 46, 12) }}>
            <StatusPill tone="success">{demo.status.agent}</StatusPill>
          </div>
        </ModuleCard>
        <ModuleCard icon="wave" title={demo.agents.voice} glow style={{ ...c.voiceCard, ...enter(frame, 20, 40) }}>
          <div style={{ marginTop: 24 }}>
            <Wave width={c.waveWidth} height={56} bars={36} phase={frame * 0.25} level={progress(frame, 34, 20)} />
          </div>
        </ModuleCard>
      </AbsoluteFill>
      <DemoSeal />
    </Background>
  );
};
