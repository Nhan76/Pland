"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Calls `onFinished` once every animation currently attached to the element
 * (e.g. a CSS intro animation) has finished or been cancelled. Fires right
 * away when nothing is animating — including when the animation already ended
 * before hydration, or is disabled by `prefers-reduced-motion`.
 */
export function useAnimationsFinished<T extends Element>(
  ref: RefObject<T | null>,
  onFinished: () => void,
) {
  const onFinishedRef = useRef(onFinished);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let isCancelled = false;
    const animations =
      typeof element.getAnimations === "function" ? element.getAnimations() : [];

    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (!isCancelled) {
        onFinishedRef.current();
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [ref]);
}
