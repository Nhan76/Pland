"use client";

import { memo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { usePageIntroHero } from "@/components/Layout/PageIntroProvider";

import CardSlider from "./slider";

const CryptoDashboard = dynamic(() => import("./CryptoDashboard"), {
  loading: () => (
    <div className="relative z-20 w-full max-w-6xl mx-auto mt-12 md:mt-24 mb-16 px-4">
      <div className="relative bg-[#11141A] border border-white/5 rounded-3xl shadow-2xl p-4 md:p-6 min-h-[460px] md:min-h-[400px] animate-pulse" />
    </div>
  ),
  ssr: false,
});

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  loading: () => <div className="relative h-full w-full bg-transparent" />,
  ssr: false,
});

const INTRO_EASE = [0.22, 1, 0.36, 1] as const;

const HERO_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: INTRO_EASE,
    },
  },
};

const DASHBOARD_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: INTRO_EASE,
    },
  },
};

type IntroStateProps = {
  introInitialState: "visible" | "hidden";
};

type HeroCopyProps = IntroStateProps & {
  showTitle: boolean;
  showDescription: boolean;
};

const HeroCopy = memo(
  ({ introInitialState, showTitle, showDescription }: HeroCopyProps) => (
    <div className="flex flex-col items-center gap-8">
      <motion.h1
        variants={HERO_REVEAL_VARIANTS}
        initial={introInitialState}
        animate={showTitle ? "visible" : "hidden"}
        className="font-medium xl:text-[72px] md:text-6xl sm:text-5xl text-4xl text-white"
      >
        <span className="block sm:whitespace-nowrap">AI-Powered Trading</span>
        <span className="block sm:whitespace-nowrap">
          Master Your Portfolio
        </span>
      </motion.h1>

      <motion.p
        variants={HERO_REVEAL_VARIANTS}
        initial={introInitialState}
        animate={showDescription ? "visible" : "hidden"}
        className="max-w-2xl text-white text-sm sm:text-base"
      >
        PLAND turns fragmented signals into explainable actions{" "}
        <br className="hidden sm:block" />
        with multi-agent analysis, market context, and risk guardrails.
      </motion.p>
    </div>
  ),
);

HeroCopy.displayName = "HeroCopy";

type HeroActionsProps = IntroStateProps & {
  showCta: boolean;
};

const HeroActions = memo(({ introInitialState, showCta }: HeroActionsProps) => (
  <motion.div
    variants={HERO_REVEAL_VARIANTS}
    initial={introInitialState}
    animate={showCta ? "visible" : "hidden"}
    className="flex w-full flex-col items-center justify-center gap-3 px-4 sm:w-auto sm:flex-row sm:gap-4 sm:px-0"
  >
    <Button
      render={
        <Link
          href="https://hackathon-pland.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        />
      }
      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-4 py-6 text-sm font-semibold whitespace-nowrap text-background sm:w-55 sm:px-7 sm:text-base"
    >
      Go to app
    </Button>
    <Button
      variant="outline"
      render={<Link href="/#portfolio" />}
      className="flex h-12 w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-6 text-sm font-semibold whitespace-nowrap text-white sm:w-55 sm:px-7 sm:text-base"
    >
      Explore Capabilities
    </Button>
  </motion.div>
));

HeroActions.displayName = "HeroActions";

type HeroDashboardProps = IntroStateProps & {
  showDashboard: boolean;
};

const HeroDashboard = memo(
  ({ introInitialState, showDashboard }: HeroDashboardProps) => (
    <motion.div
      variants={DASHBOARD_REVEAL_VARIANTS}
      initial={introInitialState}
      animate={showDashboard ? "visible" : "hidden"}
    >
      <CryptoDashboard />
    </motion.div>
  ),
);

HeroDashboard.displayName = "HeroDashboard";

const Hero = () => {
  const { showTitle, showDescription, showCta, showDashboard, isComplete } =
    usePageIntroHero();
  const introInitialState = isComplete ? "visible" : "hidden";

  return (
    <section
      className="relative z-1 overflow-hidden py-24 pt-48 isolate"
      id="main-banner"
    >
      <HeroBackground />

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <HeroCopy
            introInitialState={introInitialState}
            showTitle={showTitle}
            showDescription={showDescription}
          />
          <HeroActions
            introInitialState={introInitialState}
            showCta={showCta}
          />
        </div>

        <HeroDashboard
          introInitialState={introInitialState}
          showDashboard={showDashboard}
        />

        <CardSlider />
      </div>
    </section>
  );
};

export default Hero;
