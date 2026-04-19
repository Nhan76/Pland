"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { useMediaQuery } from "./useMediaQuery";

type UseMotionProfileOptions = {
  isInView?: boolean;
};

function readDeviceHints() {
  if (typeof navigator === "undefined") {
    return {
      deviceMemory: 8,
      hardwareConcurrency: 8,
      saveData: false,
    };
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  return {
    deviceMemory: nav.deviceMemory ?? 8,
    hardwareConcurrency: nav.hardwareConcurrency ?? 8,
    saveData: Boolean(nav.connection?.saveData),
  };
}

export function useMotionProfile({
  isInView = true,
}: UseMotionProfileOptions = {}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isMobileViewport = useMediaQuery("(max-width: 768px)");
  const usesCoarsePointer = useMediaQuery("(pointer: coarse)");
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [{ deviceMemory, hardwareConcurrency, saveData }] = useState(
    readDeviceHints,
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const syncVisibility = () => {
      setIsPageHidden(document.hidden);
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility, {
      passive: true,
    });

    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  return useMemo(() => {
    const isLowPowerDevice =
      saveData ||
      deviceMemory <= 4 ||
      hardwareConcurrency <= 4 ||
      (isMobileViewport && usesCoarsePointer);
    const canAnimate = !prefersReducedMotion && !isPageHidden && isInView;
    const allowHeavyEffects = canAnimate && !isLowPowerDevice;

    return {
      prefersReducedMotion,
      isMobileViewport,
      isLowPowerDevice,
      isPageHidden,
      canAnimate,
      allowHeavyEffects,
      chartAnimationsEnabled: canAnimate && !isLowPowerDevice,
      pointerTrackingEnabled: allowHeavyEffects && !usesCoarsePointer,
      canvasDpr: allowHeavyEffects ? (isMobileViewport ? 1 : 1.4) : 1,
      shouldPauseMotion: !canAnimate,
    };
  }, [
    deviceMemory,
    hardwareConcurrency,
    isInView,
    isMobileViewport,
    isPageHidden,
    prefersReducedMotion,
    saveData,
    usesCoarsePointer,
  ]);
}
