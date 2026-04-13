import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { footerlabels } from "@/app/api/data";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const Footer: FC = () => {
  return (
    <footer className="pt-16 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-11 lg:gap-20 md:gap-6 sm:gap-12 gap-6  pb-16">
          <div className="lg:col-span-4 md:col-span-6 col-span-6 flex flex-col gap-6">
            <Logo />
            <p className="text-white/60">
              PLAND gives crypto investors a clearer portfolio story with
              explainable AI, market context, and disciplined risk checks.
            </p>
            <div className="flex gap-6 items-center relative z-1">
              <Link href="https://www.facebook.com/" className="group">
                <Icon
                  icon="fa6-brands:facebook-f"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary"
                />
              </Link>
              <Link href="https://www.instagram.com/" className="group">
                <Icon
                  icon="fa6-brands:instagram"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary"
                />
              </Link>
              <Link href="https://www.twitter.com/" className="group">
                <Icon
                  icon="fa6-brands:x-twitter"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary"
                />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Sections</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-primary text-17"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Explore</h4>
            <ul>
              {footerlabels.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link
                    href={item.herf}
                    className="text-white/60 hover:text-primary text-17"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <h3 className="text-white text-24 font-medium mb-4">
              Start with PLAND
            </h3>
            <div className="flex flex-col gap-4">
              <Link
                href="/#development"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors hover:bg-white/10"
              >
                Explore workflow
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-primary transition-colors hover:bg-primary/15"
              >
                Review capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
