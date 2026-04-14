"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { useReducedMotion } from "framer-motion";

type PageIntroState = {
  showHeader: boolean;
  showLaserFlow: boolean;
  showTitle: boolean;
  showDescription: boolean;
  showCta: boolean;
  showDashboard: boolean;
  isComplete: boolean;
};

const INITIAL_INTRO_STATE: PageIntroState = {
  showHeader: false,
  showLaserFlow: false,
  showTitle: false,
  showDescription: false,
  showCta: false,
  showDashboard: false,
  isComplete: false,
};

const COMPLETE_INTRO_STATE: PageIntroState = {
  showHeader: true,
  showLaserFlow: true,
  showTitle: true,
  showDescription: true,
  showCta: true,
  showDashboard: true,
  isComplete: true,
};

const INTRO_STEPS: Array<{
  delay: number;
  patch: Partial<PageIntroState>;
}> = [
  { delay: 40, patch: { showHeader: true } },
  { delay: 620, patch: { showLaserFlow: true } },
  { delay: 980, patch: { showTitle: true } },
  { delay: 1140, patch: { showDescription: true } },
  { delay: 1300, patch: { showCta: true } },
  { delay: 1460, patch: { showDashboard: true } },
  { delay: 1760, patch: COMPLETE_INTRO_STATE },
];

const PageIntroContext = createContext<PageIntroState>(COMPLETE_INTRO_STATE);

export const PageIntroProvider = ({ children }: PropsWithChildren) => {
  const prefersReducedMotion = useReducedMotion();
  const hasStartedRef = useRef(false);
  const [introState, setIntroState] = useState<PageIntroState>(
    prefersReducedMotion ? COMPLETE_INTRO_STATE : INITIAL_INTRO_STATE
  );

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    if (prefersReducedMotion) {
      setIntroState(COMPLETE_INTRO_STATE);
      return;
    }

    const timeouts = INTRO_STEPS.map(({ delay, patch }) =>
      window.setTimeout(() => {
        setIntroState((currentState) => ({
          ...currentState,
          ...patch,
        }));
      }, delay)
    );

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [prefersReducedMotion]);

  const value = useMemo(() => introState, [introState]);

  return (
    <PageIntroContext.Provider value={value}>{children}</PageIntroContext.Provider>
  );
};

export const usePageIntro = () => useContext(PageIntroContext);