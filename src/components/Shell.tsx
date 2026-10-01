import React from "react";
import { demo } from "../data/demo";
import { colors, font, radius } from "../theme";
import { Logo } from "./Brand";
import { Button } from "./ui";

export const SIDEBAR_WIDTH = 300;

// Shell da plataforma recriado a partir da linguagem visual das referências.
export const Shell: React.FC<{
  active: (typeof demo.nav)[number];
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ active, title, subtitle, children, style }) => (
  <div style={{ position: "absolute", inset: 0, display: "flex", ...style }}>
    <div
      style={{
        width: SIDEBAR_WIDTH,
        background: `linear-gradient(180deg, ${colors.sidebar}, ${colors.bg})`,
        borderRight: `1.5px solid ${colors.border}`,
        padding: "56px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ padding: "0 14px 48px" }}>
        <Logo size={48} />
      </div>
      {demo.nav.map((item) => {
        const on = item === active;
        return (
          <div
            key={item}
            style={{
              padding: "16px 20px",
              borderRadius: radius.md,
              fontSize: 24,
              fontWeight: on ? font.semibold : font.regular,
              color: on ? colors.text : colors.muted,
              background: on ? colors.accentSoft : "transparent",
              border: `1.5px solid ${on ? "rgba(20,216,205,0.5)" : "transparent"}`,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
    <div style={{ flex: 1, position: "relative", padding: "64px 72px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 60,
              fontWeight: font.bold,
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, color: colors.muted, marginTop: 10 }}>
            {subtitle}
          </div>
        </div>
        <Button primary>+ Campanha</Button>
      </div>
      {children}
    </div>
  </div>
);
