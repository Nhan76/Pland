import type { CSSProperties } from "react";

import { pricedata } from "@/app/api/data";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const marqueeStyle = {
  "--market-marquee-duration": `${pricedata.length * 5}s`,
} as CSSProperties;

const PriceCard = ({ item }: { item: (typeof pricedata)[number] }) => {
  return (
    <Card className="w-72 shrink-0 bg-white/5 border-none shadow-none rounded-xl p-0">
      <CardContent className="px-5 py-6">
        <div className="flex flex-col items-center gap-5">
          <div className={`${item.background} ${item.padding} rounded-full`}>
            <Image
              src={item.icon}
              alt={`${item.title} icon`}
              width={item.width}
              height={item.height}
            />
          </div>
          <p className="text-white text-xs font-normal">
            <span className="text-16 font-bold mr-2">{item.title}</span>
            {item.short}
          </p>
        </div>
        <div className="mt-2 flex justify-center">
          <p className="text-xl font-bold text-white mb-0 leading-none">
            {item.price}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const CardSlider = () => {
  return (
    <div className="pt-14 flex flex-col gap-10">
      <div className="flex flex-col gap-3 items-center justify-center text-center">
        <p className="text-white font-medium">
          Illustrative <span className="text-primary">market snapshot</span>
        </p>
        <h2 className="sm:text-5xl text-3xl text-white font-medium">
          A cleaner read on tracked assets
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-background to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-background to-transparent sm:w-20" />

        <div
          className="flex w-max animate-market-marquee will-change-transform motion-reduce:animate-none hover:[animation-play-state:paused]"
          style={marqueeStyle}
        >
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1}
              className="flex shrink-0 gap-6 pr-6"
            >
              {pricedata.map((item) => (
                <PriceCard
                  key={`${groupIndex}-${item.title}`}
                  item={item}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
