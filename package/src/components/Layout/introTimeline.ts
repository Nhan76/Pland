import type { CSSProperties } from "react";

type IntroStep = {
  /** Delay from the first paint, in ms. */
  delay: number;
  duration: number;
  /** Starting vertical offset in px (the element rises/drops into place). */
  offsetY: number;
  scale?: number;
};

/**
 * Page intro, played with CSS animations from the very first paint (no need to
 * wait for hydration). The hero laser beam is not part of it: it lights up in
 * JS once the dashboard reveal has finished (see PageIntroProvider).
 */
export const INTRO_TIMELINE = {
  header: { delay: 40, duration: 550, offsetY: -28 },
  title: { delay: 620, duration: 550, offsetY: 36 },
  description: { delay: 780, duration: 550, offsetY: 36 },
  cta: { delay: 940, duration: 550, offsetY: 36 },
  dashboard: { delay: 1100, duration: 650, offsetY: 52, scale: 0.98 },
} as const satisfies Record<string, IntroStep>;

export type IntroStepName = keyof typeof INTRO_TIMELINE;

/** Class + custom properties that play an intro step (`.animate-intro`). */
export const introAnimation = (step: IntroStepName) => {
  const { delay, duration, offsetY, ...rest } = INTRO_TIMELINE[step];
  const scale = "scale" in rest ? rest.scale : 1;

  return {
    className: "animate-intro",
    style: {
      "--intro-delay": `${delay}ms`,
      "--intro-duration": `${duration}ms`,
      "--intro-offset-y": `${offsetY}px`,
      "--intro-scale": scale,
    } as CSSProperties,
  };
};
