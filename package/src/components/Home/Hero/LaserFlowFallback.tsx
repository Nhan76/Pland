import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type LaserFlowFallbackProps = {
  className?: string;
  /** Vertical position (in % of the container) where the beam hits. */
  impactY?: number;
};

/** Beam colors (r, g, b): the brand green and the hotter cyan of its core. */
const BEAM = "22, 199, 132";
const CORE = "40, 214, 190";

/**
 * Stacked ellipses around the impact point, each wider and flatter than the
 * last, approximate the beam's concave fan: [width %, height %, opacity].
 */
const FAN_LAYERS = [
  [1.8, 34, 0.7],
  [3.5, 20, 0.75],
  [7, 11, 0.7],
  [13, 6, 0.65],
  [24, 3.2, 0.55],
  [40, 1.7, 0.55],
] as const;

/**
 * Static, CSS-only approximation of `LaserFlow` (vertical beam, fan, flare and
 * bloom). Used when the GPU cannot run the shader, so the hero keeps its look
 * without blocking the main thread.
 */
const LaserFlowFallback = ({ className, impactY = 39 }: LaserFlowFallbackProps) => {
  const at = `50% ${impactY}%`;
  const rgba = (rgb: string, alpha: number) => `rgba(${rgb}, ${alpha})`;

  const layers = [
    // Bright horizontal flare along the impact line.
    `radial-gradient(ellipse 36% 0.9% at ${at}, ${rgba(CORE, 1)}, ${rgba(BEAM, 0.6)} 45%, transparent 100%)`,
    ...FAN_LAYERS.map(
      ([width, height, alpha]) =>
        `radial-gradient(ellipse ${width}% ${height}% at ${at}, ${rgba(CORE, alpha)}, ${rgba(BEAM, alpha * 0.35)} 55%, transparent 100%)`,
    ),
    // Soft bloom around the impact point.
    `radial-gradient(ellipse 30% 18% at ${at}, ${rgba(BEAM, 0.28)}, transparent 100%)`,
    // Vertical beam: core plus two halos (sized to stop at the impact point).
    `linear-gradient(to right, transparent calc(50% - 2.5px), ${rgba(CORE, 1)} 50%, transparent calc(50% + 2.5px))`,
    `linear-gradient(to right, transparent calc(50% - 9px), ${rgba(BEAM, 0.6)} 50%, transparent calc(50% + 9px))`,
    `linear-gradient(to right, transparent calc(50% - 32px), ${rgba(BEAM, 0.3)} 50%, transparent calc(50% + 32px))`,
  ];
  const beamLayerCount = 3;

  const style: CSSProperties = {
    backgroundImage: layers.join(", "),
    backgroundRepeat: "no-repeat",
    backgroundSize: layers
      .map((_, index) =>
        index >= layers.length - beamLayerCount ? `100% ${impactY}%` : "100% 100%",
      )
      .join(", "),
    // Fade the beam in from the top, like the shader's top falloff.
    maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.35), black ${impactY * 0.7}%)`,
  };

  return <div aria-hidden="true" className={cn("absolute inset-0", className)} style={style} />;
};

export default LaserFlowFallback;
