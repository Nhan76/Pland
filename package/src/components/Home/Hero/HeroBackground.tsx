"use client";

import dynamic from "next/dynamic";

import { usePageIntro } from "@/components/Layout/PageIntroProvider";

const LaserFlow = dynamic(() => import("./LaserFlow"), {
  loading: () => null,
  ssr: false,
});

const HERO_LASER_FLOW_WRAPPER_CLASS =
  "absolute left-1/2 -translate-x-1/2 w-full max-w-7xl top-[-18%] h-[136%] opacity-90 mask-[linear-gradient(180deg,black,black_86%,transparent)]";

const HERO_LASER_FLOW_PROPS = {
  className: "mix-blend-screen",
  color: "#16c784",
  flowSpeed: 0.28,
  flowStrength: 0.4,
  fogFallSpeed: 0.52,
  fogIntensity: 0.12,
  fogScale: 0.15,
  horizontalBeamOffset: 0,
  horizontalSizing: 1.3,
  mouseSmoothTime: 0.18,
  mouseTiltStrength: 0.035,
  verticalBeamOffset: 0.11,
  verticalSizing: 0.8,
  wispDensity: 0.8,
  wispIntensity: 5.6,
  wispSpeed: 13,
  decay: 1.05,
  falloffStart: 1.15,
} as const;

const HeroBackground = () => {
  const { showLaserFlow } = usePageIntro();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={HERO_LASER_FLOW_WRAPPER_CLASS}>
        {showLaserFlow ? <LaserFlow {...HERO_LASER_FLOW_PROPS} /> : null}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(22,199,132,0.14),transparent_32%),linear-gradient(180deg,rgba(5,16,26,0.08)_0%,rgba(5,16,26,0.4)_58%,var(--background)_100%)]" />
      <div className="absolute left-1/2 top-16 h-44 w-44 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-[10%] top-24 h-32 w-32 rounded-full bg-white/6 blur-3xl" />
    </div>
  );
};

export default HeroBackground;
