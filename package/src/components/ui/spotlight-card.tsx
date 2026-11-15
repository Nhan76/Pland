"use client";

import {
  useRef,
  type ComponentProps,
  type CSSProperties,
  type PointerEvent,
} from "react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = ComponentProps<"div"> & {
  spotlightColor?: string;
};

/**
 * Card with a radial highlight that follows the pointer.
 *
 * The pointer position is written as CSS custom properties on the highlight
 * layer itself (a leaf node) instead of React state, so moving the mouse never
 * re-renders the card or restyles its content (e.g. charts) — only the
 * highlight layer is repainted.
 */
export const SpotlightCard = ({
  children,
  className,
  spotlightColor = "color-mix(in srgb, var(--primary) 15%, transparent)",
  onPointerMove,
  ...props
}: SpotlightCardProps) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const spotlight = spotlightRef.current;

    if (spotlight) {
      const rect = event.currentTarget.getBoundingClientRect();
      spotlight.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
      spotlight.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
    }

    onPointerMove?.(event);
  };

  const spotlightStyle: CSSProperties = {
    background: `radial-gradient(200px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), ${spotlightColor}, transparent 100%)`,
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn(
        "group/spotlight relative overflow-hidden rounded-2xl border border-white/10 bg-bento-card",
        className,
      )}
      {...props}
    >
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={spotlightStyle}
      />
      {children}
    </div>
  );
};
