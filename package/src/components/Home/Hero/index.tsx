"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CardSlider from "./slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground";
import CryptoDashboard from "./CryptoDashboard";

const Hero = () => {
  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      className="relative z-1 overflow-hidden py-24 pt-48 isolate"
      id="main-banner"
    >
      <HeroBackground />

      <div className="container relative z-10">
        <motion.div
          {...leftAnimation}
          className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
        >
          <div className="flex flex-col items-center gap-8">
            <h1 className="font-medium xl:text-[72px] md:text-6xl sm:text-5xl text-4xl text-white">
              <span className="block sm:whitespace-nowrap">AI-Powered Trading</span>
              <span className="block sm:whitespace-nowrap">
                Master Your Portfolio
              </span>
            </h1>
            <p className="max-w-2xl text-white">
              PLAND turns fragmented signals into explainable actions <br className="hidden sm:block" />
              with multi-agent analysis, market context, and risk guardrails.
            </p>
          </div>
          <div className="flex flex-col w-full px-4 sm:px-0 sm:w-auto sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                render={<Link href="/#work" />}
                className="flex w-full sm:w-[220px] justify-center h-12 items-center gap-2 rounded-lg border border-primary bg-primary px-4 py-6 text-sm font-semibold whitespace-nowrap text-background hover:bg-primary/80 sm:px-7 sm:text-base"
              >
                Go to app
              </Button>
              <Button
                variant="outline"
                render={<Link href="/#portfolio" />}
                className="flex w-full sm:w-[220px] justify-center h-12 items-center rounded-lg border border-white/10 bg-white/5 px-4 py-6 text-sm font-semibold whitespace-nowrap text-white hover:bg-white/10 sm:px-7 sm:text-base"
              >
                Explore Capabilities
              </Button>
          </div>
        </motion.div>
        
        <CryptoDashboard />

        <CardSlider />
      </div>
    </section>
  );
};

export default Hero;
