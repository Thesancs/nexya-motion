import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { enter, progress, usePortrait } from "../anim";
import { copy, demo } from "../data/demo";
import { colors, font, radius } from "../theme";
import {
  Background,
  Card,
  Connectors,
  DemoSeal,
  Headline,
  IconTile,
  ModuleCard,
  StatusPill,
} from "../components/ui";

// Campos entram em sequência até ~9 s (frame local 60); conexões entre 9 e 11 s.
const FIELD_START = [14, 26, 38];

const L = {
  headline: { size: 64, left: 120, top: 100, width: 1700 },
  paths: [
    "M 980 470 C 1120 470, 1160 430, 1300 430",
    "M 980 750 C 1120 750, 1160 790, 1300 790",
  ],
  panel: { left: 120, top: 250, width: 860 },
  systems: { left: 1300, top: 340, width: 500 },
  channels: { left: 1300, top: 700, width: 500 },
};
// Vertical: painel em cima, sistemas e canais lado a lado embaixo.
const P: typeof L = {
  headline: { size: 72, left: 90, top: 200, width: 900 },
  paths: ["M 305 1128 L 305 1300", "M 775 1128 L 775 1300"],
  panel: { left: 90, top: 500, width: 900 },
  systems: { left: 90, top: 1300, width: 430 },
  channels: { left: 560, top: 1300, width: 430 },
};

export const Scene3Customization: React.FC = () => {
  const frame = useCurrentFrame();
  const c = usePortrait() ? P : L;
  return (
    <Background duration={140}>
      <Headline
        size={c.headline.size}
        style={{
          position: "absolute",
          left: c.headline.left,
          top: c.headline.top,
          width: c.headline.width,
          ...enter(frame, 0),
        }}
      >
        {copy.customization}
      </Headline>
      <Connectors
        paths={c.paths}
        progress={[progress(frame, 62, 30), progress(frame, 78, 30)]}
      />
      <Card
        glow
        style={{
          position: "absolute",
          ...c.panel,
          padding: 44,
          ...enter(frame, 4, 40),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginBottom: 36,
          }}
        >
          <IconTile name="bot" />
          <div style={{ fontSize: 40, fontWeight: font.bold, flex: 1 }}>
            Seu agente
          </div>
          <StatusPill>{demo.agents.support}</StatusPill>
        </div>
        {demo.customization.map((field, i) => {
          const start = FIELD_START[i];
          const typed = Math.floor(
            interpolate(
              frame,
              [start + 6, start + 6 + field.value.length * 0.8],
              [0, field.value.length],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          );
          const typing = typed > 0 && typed < field.value.length;
          return (
            <div
              key={field.label}
              style={{ marginTop: 26, ...enter(frame, start, 20) }}
            >
              <div
                style={{
                  fontSize: 20,
                  color: colors.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: font.semibold,
                }}
              >
                {field.label}
              </div>
              <div
                style={{
                  marginTop: 12,
                  padding: "22px 26px",
                  borderRadius: radius.md,
                  background: "rgba(2,11,10,0.45)",
                  border: `1.5px solid ${typing ? "rgba(20,216,205,0.6)" : colors.border}`,
                  fontSize: 30,
                  fontWeight: font.semibold,
                  height: 82,
                  boxSizing: "border-box",
                }}
              >
                {field.value.slice(0, typed)}
                {typing ? (
                  <span style={{ color: colors.accent }}>|</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </Card>
      <ModuleCard
        icon="plug"
        title="Seus sistemas"
        subtitle="Conectados ao agente"
        glow={frame >= 88}
        style={{ ...c.systems, ...enter(frame, 56, 30) }}
      />
      <ModuleCard
        icon="channels"
        title="Seus canais"
        subtitle="Conectados ao agente"
        glow={frame >= 104}
        style={{ ...c.channels, ...enter(frame, 70, 30) }}
      />
      <DemoSeal />
    </Background>
  );
};
