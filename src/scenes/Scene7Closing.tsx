import React from "react";
import { useCurrentFrame } from "remotion";
import { enter, progress, usePortrait } from "../anim";
import { copy, demo } from "../data/demo";
import { colors } from "../theme";
import { GlassMark, Logo } from "../components/Brand";
import { Background, Button, Headline } from "../components/ui";

const L = {
  glass: { size: 1150, left: 1180, top: -60 },
  stack: {
    left: 160,
    top: 320,
    width: 1100,
    alignItems: "flex-start" as React.CSSProperties["alignItems"],
    textAlign: "left" as React.CSSProperties["textAlign"],
  },
  logo: 150,
  subtitle: 64,
};
// Vertical: vidro no topo, marca e CTA centralizados.
const P: typeof L = {
  glass: { size: 900, left: 330, top: -120 },
  stack: {
    left: 90,
    top: 980,
    width: 900,
    alignItems: "center",
    textAlign: "center",
  },
  logo: 130,
  subtitle: 60,
};

// Marca e CTA completos em ~1 s (frame local 30); o resto é leitura.
export const Scene7Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const c = usePortrait() ? P : L;
  const glass = progress(frame, 0, 30);
  return (
    <Background variant="brand" duration={165} fadeOut={false}>
      <GlassMark
        size={c.glass.size}
        sheen={-0.2 + 1.4 * progress(frame, 10, 70)}
        rotateY={-32 + frame * 0.1}
        style={{
          left: c.glass.left + (1 - glass) * 140,
          top: c.glass.top,
          opacity: glass,
        }}
      />
      <div
        style={{
          position: "absolute",
          ...c.stack,
          display: "flex",
          flexDirection: "column",
          gap: 44,
        }}
      >
        <div style={enter(frame, 0, 40)}>
          <Logo size={c.logo} />
        </div>
        <Headline
          size={c.subtitle}
          style={{ color: colors.muted, fontWeight: 600, ...enter(frame, 10) }}
        >
          {copy.closing}
        </Headline>
        <div style={enter(frame, 18)}>
          <Button primary size={36}>
            {demo.cta}
          </Button>
        </div>
      </div>
    </Background>
  );
};
