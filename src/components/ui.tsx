import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { progress } from "../anim";
import { demo } from "../data/demo";
import { colors, font, radius } from "../theme";

const FADE = 10;

// Fundo fixo + conteúdo que entra/sai nas bordas da janela da cena.
export const Background: React.FC<{
  variant?: "brand" | "product";
  duration: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  children?: React.ReactNode;
}> = ({ variant = "product", duration, fadeIn = true, fadeOut = true, children }) => {
  const frame = useCurrentFrame();
  const inP = fadeIn ? progress(frame, 0, FADE) : 1;
  const outP = fadeOut ? progress(frame, duration - FADE, FADE) : 0;
  return (
    <AbsoluteFill
      style={{
        fontFamily: font.family,
        color: colors.text,
        background:
          variant === "brand"
            ? `radial-gradient(1200px 800px at 75% 40%, rgba(20,216,205,0.12), transparent 60%), ${colors.bgDeep}`
            : `radial-gradient(1400px 900px at 70% 0%, rgba(20,216,205,0.10), transparent 60%), linear-gradient(180deg, ${colors.bg}, ${colors.bgDeep})`,
      }}
    >
      <AbsoluteFill style={{ opacity: Math.min(inP, 1 - outP), scale: String(1 - outP * 0.02) }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Cursor demonstrativo; `press` (0..1) encolhe levemente no clique.
export const Cursor: React.FC<{ x: number; y: number; press?: number; opacity?: number }> = ({
  x,
  y,
  press = 0,
  opacity = 1,
}) => (
  <svg
    width={44}
    height={44}
    viewBox="0 0 24 24"
    style={{ position: "absolute", left: x, top: y, opacity, scale: String(1 - press * 0.15), transformOrigin: "0 0" }}
  >
    <path d="M3 2l7 19 2.5-7.5L20 11z" fill={colors.text} stroke={colors.bgDeep} strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);

export const Card: React.FC<{
  style?: React.CSSProperties;
  glow?: boolean;
  children: React.ReactNode;
}> = ({ style, glow, children }) => (
  <div
    style={{
      background: `linear-gradient(160deg, ${colors.surfaceHi}, ${colors.surface})`,
      border: `1.5px solid ${glow ? "rgba(20,216,205,0.55)" : colors.border}`,
      borderRadius: radius.lg,
      boxShadow: glow
        ? "0 0 0 6px rgba(20,216,205,0.06), 0 30px 80px rgba(0,0,0,0.45), 0 0 60px rgba(20,216,205,0.18)"
        : "0 30px 80px rgba(0,0,0,0.45)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const ModuleCard: React.FC<{
  icon: IconName;
  title: string;
  subtitle?: string;
  glow?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ icon, title, subtitle, glow, style, children }) => (
  <Card glow={glow} style={{ position: "absolute", padding: 32, ...style }}>
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <IconTile name={icon} />
      <div>
        <div style={{ fontSize: 32, fontWeight: font.bold }}>{title}</div>
        {subtitle ? (
          <div style={{ fontSize: 22, color: colors.muted, marginTop: 6 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
    {children}
  </Card>
);

export const StatusPill: React.FC<{
  children: string;
  tone?: "accent" | "success";
  size?: number;
}> = ({ children, tone = "accent", size = 22 }) => {
  const c = tone === "success" ? colors.success : colors.accent;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.45,
        padding: `${size * 0.3}px ${size * 0.7}px`,
        borderRadius: 999,
        background: tone === "success" ? colors.successSoft : colors.accentSoft,
        color: c,
        fontSize: size,
        fontWeight: font.semibold,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: 99,
          background: c,
        }}
      />
      {children}
    </span>
  );
};

export const Button: React.FC<{
  children: string;
  primary?: boolean;
  size?: number;
}> = ({ children, primary, size = 24 }) => (
  <span
    style={{
      display: "inline-block",
      padding: `${size * 0.6}px ${size * 1.1}px`,
      borderRadius: radius.md,
      fontSize: size,
      fontWeight: font.semibold,
      color: primary ? colors.bgDeep : colors.text,
      background: primary
        ? `linear-gradient(180deg, #3DF0E6, ${colors.accent})`
        : "rgba(242,247,246,0.08)",
      border: primary ? "none" : `1.5px solid ${colors.border}`,
      boxShadow: primary ? "0 0 40px rgba(20,216,205,0.45)" : "none",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 64, style }) => (
  <div
    style={{
      fontSize: size,
      fontWeight: font.bold,
      letterSpacing: "-0.025em",
      lineHeight: 1.1,
      color: colors.text,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Accent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span style={{ color: colors.accent }}>{children}</span>;

export const DemoSeal: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 48,
      bottom: 40,
      padding: "8px 18px",
      borderRadius: 999,
      border: `1.5px solid ${colors.border}`,
      background: "rgba(2,11,10,0.6)",
      color: colors.muted,
      fontSize: 18,
      fontWeight: font.semibold,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}
  >
    {demo.seal}
  </div>
);

// Linhas de conexão desenhadas sobre o frame inteiro (coordenadas em px do frame).
// `progress` (0..1) desenha as linhas; `pulse` (0..1) percorre cada uma com um brilho.
export const Connectors: React.FC<{
  paths: string[];
  progress?: number | number[];
  pulse?: number;
}> = ({ paths, progress = 1, pulse }) => (
  <svg
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0, overflow: "visible" }}
  >
    {paths.map((d, i) => {
      const p = Array.isArray(progress) ? progress[i] : progress;
      return (
        <g key={d}>
          <path
            d={d}
            stroke={colors.accent}
            strokeOpacity={0.18 * p}
            strokeWidth={10}
            fill="none"
          />
          <path
            d={d}
            stroke={colors.accent}
            strokeWidth={3}
            fill="none"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - p}
            strokeLinecap="round"
          />
          {pulse !== undefined && pulse > 0 && pulse < 1 ? (
            <path
              d={d}
              stroke="#BFFFFA"
              strokeWidth={8}
              fill="none"
              pathLength={1}
              strokeDasharray="0.12 2"
              strokeDashoffset={0.12 - pulse * 1.12}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 10px #14D8CD)" }}
            />
          ) : null}
        </g>
      );
    })}
  </svg>
);

// Onda ilustrativa determinística: `phase` anima pelo frame, `level` (0..1) é a amplitude.
export const Wave: React.FC<{
  bars?: number;
  height: number;
  width: number;
  phase?: number;
  level?: number;
}> = ({ bars = 48, height, width, phase = 0, level = 1 }) => {
  const gap = width / bars;
  return (
    <svg width={width} height={height}>
      {Array.from({ length: bars }, (_, i) => {
        const env = Math.sin((i / (bars - 1)) * Math.PI);
        const amp =
          0.25 +
          0.75 *
            Math.abs(
              Math.sin(i * 0.55 + phase) * Math.cos(i * 0.21 + phase * 0.6),
            );
        const h = Math.max(8, height * env * amp * level);
        return (
          <rect
            key={i}
            x={i * gap + gap * 0.2}
            y={(height - h) / 2}
            width={gap * 0.6}
            height={h}
            rx={gap * 0.3}
            fill={colors.accent}
            opacity={0.45 + 0.55 * env}
          />
        );
      })}
    </svg>
  );
};

type IconName =
  | "chat"
  | "wave"
  | "phone"
  | "grid"
  | "inbox"
  | "megaphone"
  | "bot"
  | "plug"
  | "channels"
  | "settings";

const ICONS: Record<IconName, React.ReactNode> = {
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  wave: <path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 10v4M21 12h0" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  inbox: <path d="M3 13l3-8h12l3 8v6H3zM3 13h5l1 2h6l1-2h5" />,
  megaphone: <path d="M3 10v4h3l8 4V6L6 10zM17 9a4 4 0 0 1 0 6" />,
  bot: <path d="M6 8h12v10H6zM12 4v4M9 13h0M15 13h0M3 12v3M21 12v3" />,
  plug: <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" />,
  channels: <path d="M4 6h16M4 12h16M4 18h10" />,
  settings: (
    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
  ),
};

export const Icon: React.FC<{
  name: IconName;
  size?: number;
  color?: string;
}> = ({ name, size = 28, color = colors.accent }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {ICONS[name]}
  </svg>
);

export const IconTile: React.FC<{ name: IconName; size?: number }> = ({
  name,
  size = 72,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: colors.accentSoft,
      border: "1.5px solid rgba(20,216,205,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Icon name={name} size={size * 0.5} />
  </div>
);
