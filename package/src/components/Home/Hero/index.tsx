"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { usePageIntro } from "@/components/Layout/PageIntroProvider";

import CryptoDashboard from "./CryptoDashboard";
import HeroBackground from "./HeroBackground";
import CardSlider from "./slider";

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

const Hero = () => {
  const { showTitle, showDescription, showCta, showDashboard, isComplete } =
    usePageIntro();
  const introInitialState = isComplete ? "visible" : "hidden";

  return (
    <section
      className="relative z-1 overflow-hidden py-24 pt-48 isolate"
      id="main-banner"
    >
      <HeroBackground />

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
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
              className="max-w-2xl text-white"
            >
              PLAND turns fragmented signals into explainable actions{" "}
              <br className="hidden sm:block" />
              with multi-agent analysis, market context, and risk guardrails.
            </motion.p>
          </div>

          <motion.div
            variants={HERO_REVEAL_VARIANTS}
            initial={introInitialState}
            animate={showCta ? "visible" : "hidden"}
            className="flex w-full flex-col items-center justify-center gap-3 px-4 sm:w-auto sm:flex-row sm:gap-4 sm:px-0"
          >
            <Button
              render={<Link href="/#work" />}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-4 py-6 text-sm font-semibold whitespace-nowrap text-background hover:bg-primary/80 sm:w-55 sm:px-7 sm:text-base"
            >
              Go to app
            </Button>
            <Button
              variant="outline"
              render={<Link href="/#portfolio" />}
              className="flex h-12 w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-6 text-sm font-semibold whitespace-nowrap text-white hover:bg-white/10 sm:w-55 sm:px-7 sm:text-base"
            >
              Explore Capabilities
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={DASHBOARD_REVEAL_VARIANTS}
          initial={introInitialState}
          animate={showDashboard ? "visible" : "hidden"}
        >
          <CryptoDashboard />
        </motion.div>

        <CardSlider />
      </div>
    </section>
  );
};

export default Hero;
