import React from "react";
import { useCurrentFrame } from "remotion";
import { enter, progress, usePortrait } from "../anim";
import { copy, demo } from "../data/demo";
import { colors, font, radius } from "../theme";
import { Logo } from "../components/Brand";
import { Shell } from "../components/Shell";
import {
  Background,
  Button,
  Card,
  Cursor,
  DemoSeal,
  Headline,
  Icon,
  IconTile,
  StatusPill,
} from "../components/ui";

// Roteiro local (30 fps, 154 frames): 0–30 campanha entra · 34 clique e "Em execução" ·
// 54 mensagem chega · 76 digitação · 100–154 resposta do agente.
const CLICK = 34;
const MESSAGE = 54;
const TYPING = 76;
const REPLY = 100;

// Cursor: ponto inicial → botão "Iniciar campanha" em cada formato.
const CURSOR = {
  landscape: { from: [1100, 1000], to: [540, 860] },
  portrait: { from: [760, 1100], to: [290, 850] },
};

const bubbleStyle = (from: "contact" | "agent"): React.CSSProperties => ({
  alignSelf: from === "agent" ? "flex-end" : "flex-start",
  maxWidth: 560,
  padding: "22px 28px",
  borderRadius: 26,
  borderBottomLeftRadius: from === "contact" ? 8 : 26,
  borderBottomRightRadius: from === "agent" ? 8 : 26,
  background:
    from === "agent" ? "rgba(20,216,205,0.18)" : "rgba(242,247,246,0.08)",
  border: `1.5px solid ${from === "agent" ? "rgba(20,216,205,0.45)" : colors.border}`,
  fontSize: 30,
  lineHeight: 1.35,
});

export const Scene4Campaign: React.FC = () => {
  const frame = useCurrentFrame();
  const portrait = usePortrait();
  const running = frame >= CLICK + 4;
  const press = progress(frame, CLICK, 4) - progress(frame, CLICK + 5, 6);
  const cursor = progress(frame, 12, 20);
  const path = portrait ? CURSOR.portrait : CURSOR.landscape;

  const campaignCard = (style: React.CSSProperties) => (
    <Card
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        ...style,
        ...enter(frame, 4, 40),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <IconTile name="megaphone" size={64} />
        <div
          style={{
            fontSize: 22,
            color: colors.muted,
            fontWeight: font.semibold,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Campanha
        </div>
      </div>
      <div style={{ fontSize: 40, fontWeight: font.bold, marginTop: 28 }}>
        {demo.campaign}
      </div>
      <div style={{ marginTop: 20 }}>
        {running ? (
          <StatusPill tone="success">{demo.status.campaign}</StatusPill>
        ) : (
          <StatusPill>{demo.status.campaignIdle}</StatusPill>
        )}
      </div>
      <div
        style={{
          height: 12,
          borderRadius: 9,
          background: "rgba(242,247,246,0.08)",
          marginTop: 40,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${42 * progress(frame, CLICK + 6, 70)}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.success})`,
          }}
        />
      </div>
      <div
        style={{
          marginTop: "auto",
          scale: String(1 - press * 0.05),
          transformOrigin: "left center",
        }}
      >
        <Button primary size={26}>
          Iniciar campanha
        </Button>
      </div>
    </Card>
  );

  const chatCard = (style: React.CSSProperties) => (
    <Card
      glow={frame >= MESSAGE}
      style={{
        padding: 0,
        overflow: "hidden",
        ...style,
        ...enter(frame, 12, 40),
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "28px 36px",
          borderBottom: `1.5px solid ${colors.border}`,
        }}
      >
        <div style={{ fontSize: 30, fontWeight: font.bold }}>
          {demo.contact}
        </div>
        <div style={{ fontSize: 22, color: colors.muted }}>
          {demo.phoneLabel}
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            borderRadius: 999,
            background: colors.accentSoft,
            fontSize: 22,
            fontWeight: font.semibold,
            color: colors.accent,
            ...enter(frame, TYPING - 4, 12),
          }}
        >
          <Icon name="bot" size={24} />
          {demo.agents.support}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: 40,
        }}
      >
        <div
          style={{ ...bubbleStyle("contact"), ...enter(frame, MESSAGE, 24) }}
        >
          {demo.incomingMessage}
        </div>
        {frame < REPLY ? (
          <div
            style={{
              ...bubbleStyle("agent"),
              display: "flex",
              gap: 10,
              padding: "30px 32px",
              opacity: progress(frame, TYPING, 6),
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 9,
                  background: colors.accent,
                  opacity:
                    0.4 + 0.6 * Math.max(0, Math.sin((frame - i * 4) * 0.35)),
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ ...bubbleStyle("agent"), ...enter(frame, REPLY, 24) }}>
            {demo.agentReply}
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <Background duration={154}>
      {portrait ? (
        // Vertical: sem sidebar; campanha e conversa empilhadas em tela cheia.
        <>
          <div
            style={{
              position: "absolute",
              left: 90,
              top: 180,
              ...enter(frame, 0),
            }}
          >
            <Logo size={44} />
          </div>
          <Headline
            size={80}
            style={{
              position: "absolute",
              left: 90,
              top: 280,
              width: 900,
              ...enter(frame, 0),
            }}
          >
            {copy.campaign}
          </Headline>
          {campaignCard({
            position: "absolute",
            left: 90,
            top: 500,
            width: 900,
            height: 420,
            boxSizing: "border-box",
          })}
          {chatCard({
            position: "absolute",
            left: 90,
            top: 960,
            width: 900,
            height: 620,
            boxSizing: "border-box",
          })}
        </>
      ) : (
        <Shell
          active="Campanhas"
          title={copy.campaign}
          subtitle="Campanhas e respostas em um só lugar."
        >
          {/* Indicadores ilustrativos, não desempenho */}
          <Card
            style={{
              marginTop: 44,
              display: "flex",
              padding: "26px 36px",
              gap: 56,
              borderRadius: radius.lg,
              ...enter(frame, 6, 20),
            }}
          >
            {demo.indicators.map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 26,
                  fontWeight: font.semibold,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 9,
                    background: colors.accent,
                  }}
                />
                {label}
              </div>
            ))}
          </Card>
          <div style={{ display: "flex", gap: 36, marginTop: 36, height: 600 }}>
            {campaignCard({ width: 560 })}
            {chatCard({ flex: 1 })}
          </div>
        </Shell>
      )}
      <Cursor
        x={path.from[0] + (path.to[0] - path.from[0]) * cursor}
        y={path.from[1] + (path.to[1] - path.from[1]) * cursor}
        press={press}
        opacity={progress(frame, 8, 8) * (1 - progress(frame, 50, 10))}
      />
      <DemoSeal />
    </Background>
  );
};
