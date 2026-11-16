"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { headerData } from "../Header/Navigation/menuData";
import { introAnimation } from "../introTimeline";
import Logo from "./Logo";
import { useHeaderBehavior } from "./useHeaderBehavior";

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const { isScrolled, isVisible } = useHeaderBehavior(navbarOpen);
  const intro = introAnimation("header");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    // The header lives in the root layout, so its intro only plays on first load.
    <div className={cn("fixed inset-x-0 top-0 z-40", intro.className)} style={intro.style}>
      <header
        className={cn(
          "transition-transform duration-300 ease-out",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container px-4 pt-4 sm:pt-5">
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-all duration-300 ease-out",
              isScrolled
                ? "rounded-full border border-white/20 bg-white/8 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl supports-backdrop-filter:bg-white/10"
                : "px-0 py-3"
            )}
          >
            <div onClick={() => setActiveHash("")} className="cursor-pointer">
              <Logo />
            </div>

            <nav className="hidden grow items-center justify-center gap-8 lg:flex">
              {headerData.map((item, index) => (
                <HeaderLink
                  key={index}
                  item={item}
                  activeHash={activeHash}
                  setActiveHash={setActiveHash}
                />
              ))}
            </nav>

            <div className="hidden h-11 gap-4 lg:flex">
              <Button
                size="lg"
                render={<Link href="https://hackathon-pland.vercel.app/" target="_blank" rel="noopener noreferrer" />}
                className="h-full rounded-full border border-primary bg-primary px-5 py-2 font-medium text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
              >
                Open App
              </Button>
            </div>

            <Sheet open={navbarOpen} onOpenChange={setNavbarOpen}>
              <SheetTrigger
                render={
                  <button
                    className={cn(
                      "block rounded-full p-2 lg:hidden",
                      isScrolled && "bg-white/10"
                    )}
                    aria-label="Toggle mobile menu"
                  />
                }
              >
                <span className="block h-0.5 w-6 bg-white"></span>
                <span className="mt-1.5 block h-0.5 w-6 bg-white"></span>
                <span className="mt-1.5 block h-0.5 w-6 bg-white"></span>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-xs border-l border-border bg-background p-0"
              >
                <div className="flex items-center justify-between p-4">
                  <div onClick={() => setActiveHash("")} className="cursor-pointer">
                    <Logo />
                  </div>
                </div>

                <nav className="flex flex-col items-start p-4">
                  {headerData.map((item, index) => (
                    <MobileHeaderLink
                      key={index}
                      item={item}
                      activeHash={activeHash}
                      setActiveHash={setActiveHash}
                      onClick={() => setNavbarOpen(false)}
                    />
                  ))}

                  <div className="mt-4 flex w-full flex-col gap-4">
                    <Button
                      size="lg"
                      render={<Link href="https://hackathon-pland.vercel.app/" target="_blank" rel="noopener noreferrer" />}
                      onClick={() => setNavbarOpen(false)}
                      className="w-full rounded-full border border-primary bg-primary font-medium text-primary-foreground hover:bg-transparent hover:text-primary"
                    >
                      Open App
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
