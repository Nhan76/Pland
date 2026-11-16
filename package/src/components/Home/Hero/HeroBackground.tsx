"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";

import { usePageIntroHero } from "@/components/Layout/PageIntroProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { hasHardwareWebGL } from "@/lib/webgl";

import LaserFlowFallback from "./LaserFlowFallback";

const LaserFlow = dynamic(() => import("./LaserFlow"), {
  loading: () => null,
  ssr: false,
});

const HERO_LASER_FLOW_WRAPPER_CLASS =
  "absolute left-1/2 -translate-x-1/2 w-full max-w-7xl top-[-28%] md:top-[-18%] h-[136%] mask-[linear-gradient(180deg,black,black_86%,transparent)]";

const HERO_LASER_FLOW_BASE_PROPS = {
  className: "mix-blend-screen",
  color: "#16c784",
  flowSpeed: 0.28,
  flowStrength: 0.4,
  fogFallSpeed: 0.52,
  fogIntensity: 0.12,
  fogScale: 0.15,
  horizontalBeamOffset: 0,
  horizontalSizing: 1.3,
  verticalBeamOffset: 0.11,
  wispDensity: 0.8,
  wispIntensity: 5.6,
  wispSpeed: 13,
  decay: 1.05,
  falloffStart: 1.15,
} as const;

const subscribeToNothing = () => () => {};

/**
 * `null` until hydrated, then whether the shader can run on a real GPU. The
 * three.js chunk is only requested when it can.
 */
const useCanRenderShader = () =>
  useSyncExternalStore<boolean | null>(subscribeToNothing, hasHardwareWebGL, () => null);

const HeroBackground = () => {
  const { showLaserFlow } = usePageIntroHero();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = Boolean(useReducedMotion());
  const canRenderShader = useCanRenderShader();
  const [hasShaderFailed, setHasShaderFailed] = useState(false);
  const showFallback = canRenderShader === false || hasShaderFailed;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className={HERO_LASER_FLOW_WRAPPER_CLASS}
        initial={false}
        animate={{ opacity: showLaserFlow ? 0.9 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {showFallback ? (
          <LaserFlowFallback className="mix-blend-screen" />
        ) : (
          canRenderShader && (
            <LaserFlow
              {...HERO_LASER_FLOW_BASE_PROPS}
              active={showLaserFlow}
              animate={!prefersReducedMotion}
              verticalSizing={isMobile ? 0.6 : 0.8}
              onUnsupported={() => setHasShaderFailed(true)}
            />
          )
        )}
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(22,199,132,0.14),transparent_32%),linear-gradient(180deg,rgba(5,16,26,0.08)_0%,rgba(5,16,26,0.4)_58%,var(--background)_100%)]" />
      <div className="absolute left-1/2 top-16 h-44 w-44 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-[10%] top-24 h-32 w-32 rounded-full bg-white/6 blur-3xl" />
    </div>
  );
};

export default HeroBackground;
