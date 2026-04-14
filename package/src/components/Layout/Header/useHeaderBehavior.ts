"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

const GLASS_OFFSET = 24;
const VISIBILITY_OFFSET = 80;
const DIRECTION_DELTA = 4;

export const useHeaderBehavior = (menuOpen: boolean) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const syncHeaderState = useEffectEvent(() => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY.current;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

    setIsScrolled(currentScrollY > GLASS_OFFSET);

    if (menuOpen || currentScrollY <= VISIBILITY_OFFSET) {
      setIsVisible(true);
    } else if (scrollDelta > DIRECTION_DELTA) {
      setIsVisible(!scrollingDown);
    }

    lastScrollY.current = currentScrollY;
  });

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    syncHeaderState();

    window.addEventListener("scroll", syncHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncHeaderState);
    };
  }, [syncHeaderState]);

  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true);
    }
  }, [menuOpen]);

  return { isScrolled, isVisible };
};