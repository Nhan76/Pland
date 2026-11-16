"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Calls `onReached` once every animation attached to the element (e.g. a CSS
 * intro animation) has reached `progress` (0–1) of its duration. Uses the Web
 * Animations API, so it stays in sync with the actual animation however late
 * the component hydrates. Fires right away when nothing is animating —
 * including when the animation already ended, or is disabled by
 * `prefers-reduced-motion`.
 */
export function useAnimationProgress<T extends Element>(
  ref: RefObject<T | null>,
  progress: number,
  onReached: () => void,
) {
  const onReachedRef = useRef(onReached);

  useEffect(() => {
    onReachedRef.current = onReached;
  }, [onReached]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const animations =
      typeof element.getAnimations === "function" ? element.getAnimations() : [];

    const remainingMs = Math.max(
      0,
      ...animations.map((animation) => {
        const { delay = 0, activeDuration = 0, localTime } =
          animation.effect?.getComputedTiming() ?? {};
        const targetTime = Number(delay) + Number(activeDuration) * progress;

        return targetTime - Number(localTime ?? targetTime);
      }),
    );

    const timeoutId = window.setTimeout(() => onReachedRef.current(), remainingMs);

    return () => window.clearTimeout(timeoutId);
  }, [ref, progress]);
}
