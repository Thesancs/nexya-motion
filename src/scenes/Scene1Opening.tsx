import React from "react";
import { useCurrentFrame } from "remotion";
import { enter, progress, usePortrait } from "../anim";
import { copy } from "../data/demo";
import { GlassMark, Logo } from "../components/Brand";
import { Accent, Background, Headline } from "../components/ui";
import { colors } from "../theme";

const L = {
  glass: { size: 1050, left: 1130, top: 40, slide: 260 },
  logo: { left: 140, top: 110 },
  headline: { size: 112, left: 140, top: 400, width: 1050 },
  line: { top: 900, left: 140, length: 1640 },
};
const P: typeof L = {
  glass: { size: 900, left: 400, top: 140, slide: 200 },
  logo: { left: 90, top: 180 },
  headline: { size: 104, left: 90, top: 980, width: 900 },
  line: { top: 1580, left: 90, length: 900 },
};

export const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const c = usePortrait() ? P : L;
  const glass = progress(frame, 0, 36);
  // Reflexo atravessa o vidro em 0–0,8 s e volta no fim para virar a linha de conexão.
  const sheen =
    frame < 50
      ? -0.2 + 1.4 * progress(frame, 0, 24)
      : -0.2 + 1.4 * progress(frame, 62, 16);
  const line = progress(frame, 70, 18);
  return (
    <Background variant="brand" duration={90} fadeIn={false}>
      <GlassMark
        size={c.glass.size}
        sheen={sheen}
        rotateY={-40 + glass * 16 + frame * 0.05}
        style={{ left: c.glass.left + (1 - glass) * c.glass.slide, top: c.glass.top, opacity: glass }}
      />
      <div style={{ position: "absolute", ...c.logo, ...enter(frame, 4) }}>
        <Logo size={56} />
      </div>
      <Headline
        size={c.headline.size}
        style={{ position: "absolute", left: c.headline.left, top: c.headline.top, width: c.headline.width }}
      >
        <span style={{ display: "inline-block", ...enter(frame, 10, 48) }}>
          {copy.opening.before}
          <Accent>{copy.opening.highlight}</Accent>
        </span>{" "}
        <span style={{ display: "inline-block", ...enter(frame, 22, 48) }}>
          {copy.opening.after.trim()}
        </span>
      </Headline>
      {/* Transição: o reflexo vira uma linha de conexão */}
      <div
        style={{
          position: "absolute",
          top: c.line.top,
          left: c.line.left + (1 - line) * c.line.length,
          width: line * c.line.length,
          height: 3,
          borderRadius: 3,
          background: `linear-gradient(90deg, transparent, ${colors.accent})`,
          boxShadow: `0 0 18px ${colors.accent}`,
        }}
      />
    </Background>
  );
};
