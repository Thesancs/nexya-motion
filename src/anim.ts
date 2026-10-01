import type React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";

// Mesmas cenas, layout próprio no vertical (BRIEF §3: não encolher o desktop).
export const usePortrait = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};

// Easing único do vídeo (BRIEF §3: consistente, sem bounce).
export const ease = Easing.bezier(0.16, 1, 0.3, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 0 → 1 entre `start` e `start + dur` (frames locais da cena).
export const progress = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing: ease });

// Entrada padrão: fade + subida curta.
export const enter = (frame: number, start: number, dist = 32): React.CSSProperties => {
  const p = progress(frame, start);
  return { opacity: p, translate: `0px ${(1 - p) * dist}px` };
};
