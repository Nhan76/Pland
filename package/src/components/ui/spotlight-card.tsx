"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className, spotlightColor = "color-mix(in srgb, var(--primary) 15%, transparent)", ...props }, forwardedRef) => {
    const defaultRef = useRef<HTMLDivElement>(null);
    const divRef = (forwardedRef as React.MutableRefObject<HTMLDivElement>) || defaultRef;
    
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-bento-card backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
          style={{
            opacity,
            background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 100%)`,
          }}
        />
        {children}
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";
