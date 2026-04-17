import { upgradeData } from "@/app/api/data";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const Upgrade = () => {
  return (
    <section className="py-16 md:py-24" id="upgrade">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-white font-medium">
              Risk-first <span className="text-primary">design</span>
            </p>
            <h2 className="text-white sm:text-5xl text-3xl  font-medium mb-5">
              Guardrails that keep decisions inside your rules
            </h2>
            <p className="text-muted/60 text-lg mb-7">
              Define exposure limits, concentration thresholds, and portfolio
              constraints before the next wave of volatility hits.
            </p>
            <div className="grid sm:grid-cols-2  text-nowrap gap-5">
              {upgradeData.map((item, index) => (
                <div key={index} className="flex gap-5">
                  <div>
                    <CheckCircle2
                      size={24}
                      className="text-white group-hover:text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-muted/60">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="ml-0 lg:ml-7 justify-self-center">
              <Image
                src="/images/upgrade/img-upgrade.png"
                alt="Risk guardrails dashboard"
                width={625}
                height={580}
                className="-mr-5"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 625px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upgrade;
