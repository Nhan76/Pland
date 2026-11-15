import type { CSSProperties } from "react";
import { perksData } from "@/app/api/data";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

/** Share (in %) of the green-tinted surface at each point of the section. */
const PERKS_SURFACE_STOPS: ReadonlyArray<readonly [tint: number, position: number]> = [
  [0, 0],
  [8, 5],
  [22, 10],
  [45, 16],
  [70, 22],
  [90, 28],
  [100, 34],
  [92, 42],
  [80, 50],
  [64, 59],
  [46, 68],
  [30, 77],
  [16, 86],
  [6, 94],
  [0, 100],
];

/*
  The section fades in from the plain page background, peaks behind the
  heading and fades back out, so neither edge shows a hard color change.
*/
const perksSectionStyle = {
  "--perks-tinted-surface":
    "color-mix(in srgb, var(--background) 82%, var(--primary) 18%)",
  background: `linear-gradient(to bottom, ${PERKS_SURFACE_STOPS.map(
    ([tint, position]) =>
      `color-mix(in srgb, var(--perks-tinted-surface) ${tint}%, var(--background)) ${position}%`,
  ).join(", ")})`,
} as CSSProperties;

const Perks = () => {
  return (
    <section id="perks" className="relative py-16 md:py-24" style={perksSectionStyle}>
      <div className="container px-4 relative z-2">
        <div className="text-center">
          <div className="flex flex-col gap-4">
            <p className="text-muted text-base relative">
              Always in <span className="text-primary">context</span>
            </p>
            <h2 className="text-white sm:text-5xl text-3xl font-medium">
              Support the investor, not the impulse
            </h2>
          </div>
          <div
            className="mt-16 border border-border grid lg:grid-cols-3 sm:grid-cols-2 py-16 gap-10 px-20 rounded-3xl sm:bg-perk bg-dark_grey/35 lg:bg-bottom bg-center bg-no-repeat"
            style={{
              maskImage:
                "radial-gradient(120% 100% at 50% 50%, black 40%, rgba(0, 0, 0, 0.85) 65%, transparent 90%)",
              WebkitMaskImage:
                "radial-gradient(120% 100% at 50% 50%, black 40%, rgba(0, 0, 0, 0.85) 65%, transparent 90%)",
            }}
          >
            {perksData.map((item, index) => (
              <Card
                key={index}
                className="text-center flex items-center justify-end flex-col bg-transparent border-none shadow-none ring-0 p-0"
              >
                <CardContent className="p-0 flex flex-col items-center justify-end">
                  <div className="bg-primary/25 backdrop-blur-xs p-4 rounded-full w-fit">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={44}
                      height={44}
                      loading="lazy"
                    />
                  </div>
                  <h3 className={`text-white text-28 mb-4 ${item.space}`}>
                    {item.title}
                  </h3>
                  <div
                    className="text-muted/60"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/*
        Ambient glow. Its blur reaches above the section, so it shares the
        previous section's layer (z-1, later in the DOM) instead of being cut
        off by that section's opaque background.
      */}
      <div className="pointer-events-none bg-linear-to-br from-tealGreen to-charcoalGray sm:w-50 w-96 z-1 sm:h-50 h-96 rounded-full sm:-bottom-80 bottom-0 blur-400 absolute sm:-left-48 opacity-60"></div>
    </section>
  );
};

export default Perks;
