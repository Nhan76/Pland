"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useReducedMotion } from "framer-motion";

type HeaderIntroState = {
  showHeader: boolean;
  isComplete: boolean;
};

type HeroIntroState = {
  showLaserFlow: boolean;
  showTitle: boolean;
  showDescription: boolean;
  showCta: boolean;
  showDashboard: boolean;
  isComplete: boolean;
};

/**
 * Intro sequence: the hero content reveals first (title → description → CTA →
 * dashboard) and the laser beam only lights up once the dashboard is on
 * screen, so the beam always lands on an already visible dashboard.
 */
enum IntroStage {
  Idle = -1,
  Title,
  Description,
  Cta,
  Dashboard,
  LaserFlow,
  Complete,
}

const HEADER_REVEAL_DELAY_MS = 40;

/** Content stages, as delays from mount. */
const CONTENT_STAGE_DELAYS: ReadonlyArray<readonly [IntroStage, number]> = [
  [IntroStage.Title, 620],
  [IntroStage.Description, 780],
  [IntroStage.Cta, 940],
  [IntroStage.Dashboard, 1100],
];

/** Let the dashboard reveal (0.65s) mostly settle before the beam appears. */
const LASER_DELAY_AFTER_DASHBOARD_MS = 550;
/** Never hold the beam back indefinitely if the dashboard chunk is slow. */
const DASHBOARD_READY_TIMEOUT_MS = 2500;
/** Matches the laser wrapper fade-in in HeroBackground. */
const LASER_REVEAL_MS = 700;

const COMPLETE_HEADER_STATE: HeaderIntroState = {
  showHeader: true,
  isComplete: true,
};

const getHeroState = (stage: IntroStage): HeroIntroState => ({
  showTitle: stage >= IntroStage.Title,
  showDescription: stage >= IntroStage.Description,
  showCta: stage >= IntroStage.Cta,
  showDashboard: stage >= IntroStage.Dashboard,
  showLaserFlow: stage >= IntroStage.LaserFlow,
  isComplete: stage >= IntroStage.Complete,
});

const COMPLETE_HERO_STATE = getHeroState(IntroStage.Complete);

const noop = () => {};

const HeaderIntroContext = createContext<HeaderIntroState>(COMPLETE_HEADER_STATE);
const HeroIntroContext = createContext<HeroIntroState>(COMPLETE_HERO_STATE);
const HeroDashboardReadyContext = createContext<() => void>(noop);

export const PageIntroProvider = ({ children }: PropsWithChildren) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isHeaderShown, setIsHeaderShown] = useState(prefersReducedMotion);
  const [stage, setStage] = useState<IntroStage>(
    prefersReducedMotion ? IntroStage.Complete : IntroStage.Idle,
  );
  const [isDashboardReady, setIsDashboardReady] = useState(false);
  const markDashboardReady = useCallback(() => setIsDashboardReady(true), []);

  // Header and hero content: a fixed timeline from mount.
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsHeaderShown(true);
      setStage(IntroStage.Complete);
      return;
    }

    setIsHeaderShown(false);
    setStage(IntroStage.Idle);

    const timeouts = [
      window.setTimeout(() => setIsHeaderShown(true), HEADER_REVEAL_DELAY_MS),
      ...CONTENT_STAGE_DELAYS.map(([contentStage, delay]) =>
        window.setTimeout(() => setStage(contentStage), delay),
      ),
    ];

    return () => timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, [prefersReducedMotion]);

  // Laser beam: waits for the dashboard to be revealed *and* rendered.
  useEffect(() => {
    if (stage !== IntroStage.Dashboard) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => setStage(IntroStage.LaserFlow),
      isDashboardReady ? LASER_DELAY_AFTER_DASHBOARD_MS : DASHBOARD_READY_TIMEOUT_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [stage, isDashboardReady]);

  useEffect(() => {
    if (stage !== IntroStage.LaserFlow) {
      return;
    }

    const timeoutId = window.setTimeout(() => setStage(IntroStage.Complete), LASER_REVEAL_MS);

    return () => window.clearTimeout(timeoutId);
  }, [stage]);

  const headerValue = useMemo<HeaderIntroState>(
    () => ({
      showHeader: isHeaderShown || stage >= IntroStage.Complete,
      isComplete: stage >= IntroStage.Complete,
    }),
    [isHeaderShown, stage],
  );

  const heroValue = useMemo(() => getHeroState(stage), [stage]);

  return (
    <HeaderIntroContext.Provider value={headerValue}>
      <HeroIntroContext.Provider value={heroValue}>
        <HeroDashboardReadyContext.Provider value={markDashboardReady}>
          {children}
        </HeroDashboardReadyContext.Provider>
      </HeroIntroContext.Provider>
    </HeaderIntroContext.Provider>
  );
};

export const usePageIntroHeader = () => useContext(HeaderIntroContext);

export const usePageIntroHero = () => useContext(HeroIntroContext);

/** Call from the hero dashboard so the intro knows it has rendered. */
export const useSignalHeroDashboardReady = () => {
  const markDashboardReady = useContext(HeroDashboardReadyContext);

  useEffect(() => {
    markDashboardReady();
  }, [markDashboardReady]);
};
