import React from "react";
import { useCurrentFrame } from "remotion";
import { enter, progress, usePortrait } from "../anim";
import { copy, demo } from "../data/demo";
import { colors, font } from "../theme";
import { GlassMark } from "../components/Brand";
import {
  Background,
  Card,
  DemoSeal,
  Headline,
  IconTile,
  StatusPill,
  Wave,
} from "../components/ui";

const L = {
  glass: { size: 560, left: -240, top: 600 },
  headline: { size: 72, top: 100 },
  panel: { left: 410, top: 250, width: 1100 },
  wave: { width: 996, height: 220 },
};
const P: typeof L = {
  glass: { size: 600, left: -220, top: 1260 },
  headline: { size: 80, top: 220 },
  panel: { left: 90, top: 520, width: 900 },
  wave: { width: 796, height: 260 },
};

const formatTimer = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// Sem direção de chamada nem transcrição: só "chamada em andamento" (BRIEF §1 e cena 5).
export const Scene5Voice: React.FC = () => {
  const frame = useCurrentFrame();
  const c = usePortrait() ? P : L;
  const panel = progress(frame, 4, 24);
  const glass = progress(frame, 0, 40);
  return (
    <Background duration={114}>
      <GlassMark
        size={c.glass.size}
        sheen={-0.2 + 1.4 * progress(frame, 30, 90)}
        rotateY={-30 + frame * 0.04}
        style={{
          left: c.glass.left - (1 - glass) * 200,
          top: c.glass.top,
          opacity: 0.8 * glass,
        }}
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
        {copy.voice}
      </Headline>
      <Card
        glow
        style={{
          position: "absolute",
          ...c.panel,
          padding: 52,
          opacity: panel,
          scale: String(0.94 + 0.06 * panel + 0.03 * progress(frame, 30, 140)),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <IconTile name="phone" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 36, fontWeight: font.bold }}>
              {demo.agents.voice}
            </div>
            <div style={{ fontSize: 24, color: colors.muted, marginTop: 6 }}>
              Chamada {demo.status.call.toLowerCase()}
            </div>
          </div>
          <StatusPill tone="success" size={24}>
            {demo.status.call}
          </StatusPill>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            marginTop: 48,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: colors.accentSoft,
              border: "2px solid rgba(20,216,205,0.5)",
              boxShadow: `0 0 0 ${8 + 6 * Math.sin(frame * 0.15)}px rgba(20,216,205,0.08)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: font.bold,
              color: colors.accent,
            }}
          >
            CD
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 38, fontWeight: font.bold }}>
              {demo.contact}
            </div>
            <div style={{ fontSize: 26, color: colors.muted, marginTop: 6 }}>
              {demo.phoneLabel}
            </div>
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: font.semibold,
              fontVariantNumeric: "tabular-nums",
              color: colors.text,
            }}
          >
            {formatTimer(demo.callStartSeconds + Math.floor(frame / 30))}
          </div>
        </div>
        <div
          style={{ marginTop: 48, display: "flex", justifyContent: "center" }}
        >
          {/* Onda ilustrativa (sem áudio de chamada) */}
          <Wave
            {...c.wave}
            bars={64}
            phase={frame * 0.3}
            level={progress(frame, 16, 30)}
          />
        </div>
      </Card>
      <DemoSeal />
    </Background>
  );
};
