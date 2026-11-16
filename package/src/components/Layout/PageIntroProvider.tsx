"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useReducedMotion } from "framer-motion";

type HeroIntroState = {
  showLaserFlow: boolean;
};

type HeroIntroSignals = {
  /** The hero dashboard has mounted (its chunk is loaded and rendered). */
  markDashboardRendered: () => void;
  /** The hero dashboard's intro reveal has (mostly) played. */
  markDashboardRevealed: () => void;
};

/**
 * Safety nets so the beam is never held back for good: once the dashboard has
 * been revealed we wait at most this long for its content, and overall at most
 * `LASER_MAX_WAIT_MS` after hydration.
 */
const DASHBOARD_RENDER_TIMEOUT_MS = 2500;
/**
 * When the dashboard content arrives late (slow network), give it a beat on
 * screen before the beam. On a normal load it has rendered long before its
 * reveal, so this adds nothing.
 */
const DASHBOARD_SETTLE_MS = 250;
const LASER_MAX_WAIT_MS = 6000;

const noop = () => {};

const HeroIntroContext = createContext<HeroIntroState>({ showLaserFlow: true });
const HeroIntroSignalsContext = createContext<HeroIntroSignals>({
  markDashboardRendered: noop,
  markDashboardRevealed: noop,
});

/**
 * Sequences the hero laser beam after the CSS intro (see introTimeline.ts):
 * the beam only lights up once the dashboard has rendered and its reveal is
 * mostly done, so it always lands on a visible dashboard — however fast or
 * slow the device and network are.
 */
export const PageIntroProvider = ({ children }: PropsWithChildren) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isDashboardRendered, setIsDashboardRendered] = useState(false);
  const [isDashboardSettled, setIsDashboardSettled] = useState(false);
  const [isDashboardRevealed, setIsDashboardRevealed] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  const signals = useMemo<HeroIntroSignals>(
    () => ({
      markDashboardRendered: () => setIsDashboardRendered(true),
      markDashboardRevealed: () => setIsDashboardRevealed(true),
    }),
    [],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setHasTimedOut(true), LASER_MAX_WAIT_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isDashboardRendered) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsDashboardSettled(true), DASHBOARD_SETTLE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isDashboardRendered]);

  useEffect(() => {
    if (!isDashboardRevealed || isDashboardRendered) {
      return;
    }

    const timeoutId = window.setTimeout(() => setHasTimedOut(true), DASHBOARD_RENDER_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isDashboardRevealed, isDashboardRendered]);

  const showLaserFlow =
    prefersReducedMotion || hasTimedOut || (isDashboardRevealed && isDashboardSettled);

  const heroValue = useMemo(() => ({ showLaserFlow }), [showLaserFlow]);

  return (
    <HeroIntroContext.Provider value={heroValue}>
      <HeroIntroSignalsContext.Provider value={signals}>{children}</HeroIntroSignalsContext.Provider>
    </HeroIntroContext.Provider>
  );
};

export const usePageIntroHero = () => useContext(HeroIntroContext);

export const useHeroIntroSignals = () => useContext(HeroIntroSignalsContext);

/** Call from the hero dashboard so the intro knows it has rendered. */
export const useSignalHeroDashboardRendered = () => {
  const { markDashboardRendered } = useHeroIntroSignals();

  useEffect(() => {
    markDashboardRendered();
  }, [markDashboardRendered]);
};
