"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHeaderBehavior } from "./useHeaderBehavior";

const NavbarLogo = () => {
  return (
    <Link href="/" aria-label="Pland home" className="inline-flex items-center">
      <Image
        src="/logo.svg"
        alt="Pland"
        width={1334}
        height={486}
        priority
        className="h-auto w-20 sm:w-24"
      />
    </Link>
  );
};

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const { isScrolled, isVisible } = useHeaderBehavior(navbarOpen);

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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out",
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
            <NavbarLogo />
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
              variant="outline"
              render={<Link href="/#portfolio" />}
              className="h-full rounded-full border border-primary! bg-transparent px-5 py-2 text-primary transition-all duration-300 hover:bg-primary! hover:text-primary-foreground"
            >
              View Capabilities
            </Button>
            <Button
              size="lg"
              render={<Link href="/#upgrade" />}
              className="h-full rounded-full border border-primary bg-primary px-5 py-2 font-medium text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
            >
              See Guardrails
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
                  <NavbarLogo />
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
                    variant="outline"
                    size="lg"
                    render={<Link href="/#portfolio" />}
                    onClick={() => setNavbarOpen(false)}
                    className="w-full rounded-full border border-primary! bg-transparent text-primary hover:bg-primary! hover:text-primary-foreground"
                  >
                    View Capabilities
                  </Button>

                  <Button
                    size="lg"
                    render={<Link href="/#upgrade" />}
                    onClick={() => setNavbarOpen(false)}
                    className="w-full rounded-full border border-primary bg-primary font-medium text-primary-foreground hover:bg-transparent hover:text-primary"
                  >
                    See Guardrails
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
