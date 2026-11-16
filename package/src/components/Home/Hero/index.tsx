"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { useHeroIntroSignals } from "@/components/Layout/PageIntroProvider";
import { introAnimation, type IntroStepName } from "@/components/Layout/introTimeline";
import { useAnimationsFinished } from "@/hooks/useAnimationsFinished";
import { cn } from "@/lib/utils";

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

/**
 * The intro plays on the first load only. Later client-side mounts of the hero
 * (e.g. navigating back from the 404 page) show it in its final state.
 */
let hasPlayedIntro = false;

const usePlayIntro = () => {
  const [playIntro] = useState(() => !hasPlayedIntro);

  useEffect(() => {
    hasPlayedIntro = true;
  }, []);

  return (step: IntroStepName) => (playIntro ? introAnimation(step) : { className: "", style: undefined });
};

const Hero = () => {
  const introFor = usePlayIntro();
  const { markDashboardRevealed } = useHeroIntroSignals();
  const dashboardRef = useRef<HTMLDivElement>(null);

  // The laser beam waits for the dashboard reveal to finish.
  useAnimationsFinished(dashboardRef, markDashboardRevealed);

  const title = introFor("title");
  const description = introFor("description");
  const cta = introFor("cta");
  const dashboard = introFor("dashboard");

  return (
    <section
      className="relative z-1 overflow-hidden py-24 pt-36 md:pt-48 isolate"
      id="main-banner"
    >
      <HeroBackground />

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-8">
            <h1
              className={cn(
                "font-medium xl:text-[72px] md:text-6xl sm:text-5xl text-3xl text-white",
                title.className,
              )}
              style={title.style}
            >
              <span className="block sm:whitespace-nowrap">AI-Powered Trading</span>
              <span className="block sm:whitespace-nowrap">
                Master Your Portfolio
              </span>
            </h1>

            <p
              className={cn("max-w-2xl text-white text-sm sm:text-base", description.className)}
              style={description.style}
            >
              PLAND turns fragmented signals into explainable actions{" "}
              <br className="hidden sm:block" />
              with multi-agent analysis, market context, and risk guardrails.
            </p>
          </div>

          <div
            className={cn(
              "flex w-full flex-col items-center justify-center gap-3 px-4 sm:w-auto sm:flex-row sm:gap-4 sm:px-0",
              cta.className,
            )}
            style={cta.style}
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
          </div>
        </div>

        <div ref={dashboardRef} className={dashboard.className} style={dashboard.style}>
          <CryptoDashboard />
        </div>

        <CardSlider />
      </div>
    </section>
  );
};

export default Hero;
