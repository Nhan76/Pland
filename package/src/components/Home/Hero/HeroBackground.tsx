"use client";

import LaserFlow from "./LaserFlow";

const HERO_LASER_FLOW_WRAPPER_CLASS =
  "absolute inset-x-0 top-[-16%] h-[136%] opacity-90 mask-[linear-gradient(180deg,black,black_86%,transparent)]";

const HERO_LASER_FLOW_PROPS = {
  className: "mix-blend-screen",
  color: "#16c784",
  flowSpeed: 0.28,
  flowStrength: 0.4,
  fogFallSpeed: 0.52,
  fogIntensity: 0.2,
  fogScale: 0.28,
  horizontalBeamOffset: 0,
  horizontalSizing: 0.36,
  mouseSmoothTime: 0.18,
  mouseTiltStrength: 0.035,
  verticalBeamOffset: -0.23,
  verticalSizing: 8.2,
  wispDensity: 1.15,
  wispIntensity: 5.6,
  wispSpeed: 13,
  decay: 1.22,
  falloffStart: 1.15,
} as const;

const HeroBackground = () => {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={HERO_LASER_FLOW_WRAPPER_CLASS}>
        <LaserFlow {...HERO_LASER_FLOW_PROPS} />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(22,199,132,0.14),transparent_32%),linear-gradient(180deg,rgba(5,16,26,0.08)_0%,rgba(5,16,26,0.4)_58%,var(--background)_100%)]" />
      <div className="absolute left-1/2 top-16 h-44 w-44 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-[10%] top-24 h-32 w-32 rounded-full bg-white/6 blur-3xl" />
    </div>
  );
};

export default HeroBackground;
