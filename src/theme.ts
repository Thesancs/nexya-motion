import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Paleta aproximada do BRIEF; substituir pelos tokens oficiais quando houver.
export const colors = {
  bg: "#061A17",
  bgDeep: "#020B0A",
  sidebar: "#0A2A25",
  surface: "#12332E",
  surfaceHi: "#1A3F39",
  border: "rgba(154, 181, 176, 0.16)",
  accent: "#14D8CD",
  accentSoft: "rgba(20, 216, 205, 0.14)",
  text: "#F2F7F6",
  muted: "#9AB5B0",
  success: "#26C978",
  successSoft: "rgba(38, 201, 120, 0.16)",
} as const;

export const font = {
  family: "Inter, sans-serif",
  regular: 400,
  semibold: 600,
  bold: 700,
} as const;

export const radius = { sm: 10, md: 16, lg: 24, xl: 32 } as const;

export const video = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 900,
} as const;

for (const weight of [400, 600, 700]) {
  loadFont({
    family: "Inter",
    url: staticFile(`fonts/Inter-${weight}.woff2`),
    weight: String(weight),
  });
}
