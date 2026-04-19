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

const INITIAL_HEADER_STATE: HeaderIntroState = {
  showHeader: false,
  isComplete: false,
};

const COMPLETE_HEADER_STATE: HeaderIntroState = {
  showHeader: true,
  isComplete: true,
};

const HEADER_VISIBLE_STATE: HeaderIntroState = {
  showHeader: true,
  isComplete: false,
};

const INITIAL_HERO_STATE: HeroIntroState = {
  showLaserFlow: false,
  showTitle: false,
  showDescription: false,
  showCta: false,
  showDashboard: false,
  isComplete: false,
};

const COMPLETE_HERO_STATE: HeroIntroState = {
  showLaserFlow: true,
  showTitle: true,
  showDescription: true,
  showCta: true,
  showDashboard: true,
  isComplete: true,
};

const HERO_STAGE_DELAYS = [620, 980, 1140, 1300, 1460, 1760] as const;

const HERO_STAGE_PATCHES: HeroIntroState[] = [
  { ...INITIAL_HERO_STATE, showLaserFlow: true },
  { ...INITIAL_HERO_STATE, showLaserFlow: true, showTitle: true },
  {
    ...INITIAL_HERO_STATE,
    showLaserFlow: true,
    showTitle: true,
    showDescription: true,
  },
  {
    ...INITIAL_HERO_STATE,
    showLaserFlow: true,
    showTitle: true,
    showDescription: true,
    showCta: true,
  },
  {
    ...INITIAL_HERO_STATE,
    showLaserFlow: true,
    showTitle: true,
    showDescription: true,
    showCta: true,
    showDashboard: true,
  },
  COMPLETE_HERO_STATE,
];

const HeaderIntroContext = createContext<HeaderIntroState>(COMPLETE_HEADER_STATE);
const HeroIntroContext = createContext<HeroIntroState>(COMPLETE_HERO_STATE);

export const PageIntroProvider = ({ children }: PropsWithChildren) => {
  const prefersReducedMotion = useReducedMotion();
  const [headerState, setHeaderState] = useState<HeaderIntroState>(
    prefersReducedMotion ? COMPLETE_HEADER_STATE : INITIAL_HEADER_STATE,
  );
  const [heroStage, setHeroStage] = useState(
    prefersReducedMotion ? HERO_STAGE_PATCHES.length - 1 : -1,
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeaderState(COMPLETE_HEADER_STATE);
      setHeroStage(HERO_STAGE_PATCHES.length - 1);
      return;
    }

    setHeaderState(INITIAL_HEADER_STATE);
    setHeroStage(-1);

    const timeouts = [
      window.setTimeout(() => {
        setHeaderState(HEADER_VISIBLE_STATE);
      }, 40),
      ...HERO_STAGE_DELAYS.map((delay, index) =>
        window.setTimeout(() => {
          setHeroStage(index);
        }, delay),
      ),
    ];

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (heroStage === HERO_STAGE_PATCHES.length - 1) {
      setHeaderState(COMPLETE_HEADER_STATE);
    }
  }, [heroStage, prefersReducedMotion]);

  const headerValue = useMemo(() => {
    if (prefersReducedMotion) {
      return COMPLETE_HEADER_STATE;
    }

    return heroStage === HERO_STAGE_PATCHES.length - 1
      ? COMPLETE_HEADER_STATE
      : headerState;
  }, [headerState, heroStage, prefersReducedMotion]);

  const heroValue = useMemo(() => {
    if (prefersReducedMotion) {
      return COMPLETE_HERO_STATE;
    }

    return heroStage < 0 ? INITIAL_HERO_STATE : HERO_STAGE_PATCHES[heroStage];
  }, [heroStage, prefersReducedMotion]);

  return (
    <HeaderIntroContext.Provider value={headerValue}>
      <HeroIntroContext.Provider value={heroValue}>
        {children}
      </HeroIntroContext.Provider>
    </HeaderIntroContext.Provider>
  );
};

export const usePageIntroHeader = () => useContext(HeaderIntroContext);

export const usePageIntroHero = () => useContext(HeroIntroContext);

export const usePageIntro = () => {
  const headerState = usePageIntroHeader();
  const heroState = usePageIntroHero();

  return useMemo(
    () => ({
      ...headerState,
      ...heroState,
      isComplete: headerState.isComplete && heroState.isComplete,
    }),
    [headerState, heroState],
  );
};
