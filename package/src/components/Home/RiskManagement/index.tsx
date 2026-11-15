import type { CSSProperties } from "react";

type RiskAlertCard = {
  title: string;
  description: string;
  time: string;
  dotClassName: string;
  animationDelay: string;
};

/** The three cards share one 9s loop, offset by a third of the cycle each. */
const RISK_ALERT_CARDS: RiskAlertCard[] = [
  {
    title: "Unusual outbound transfer detected",
    description: "10,000 USDT moved from KuCoin exchange account",
    time: "2m ago",
    dotClassName: "bg-emerald-400",
    animationDelay: "0s",
  },
  {
    title: "High volatility detected",
    description: "ETH dropping more than 5% in the last 1 hour",
    time: "15m ago",
    dotClassName: "bg-orange-400",
    animationDelay: "-3s",
  },
  {
    title: "Drawdown threshold breached",
    description: "BTC position size exceeded -15% drawdown guardrail",
    time: "1h ago",
    dotClassName: "bg-red-500",
    animationDelay: "-6s",
  },
];

const cardStackMask =
  "radial-gradient(130% 130% at 15% 20%, black 35%, transparent 65%)";

const cardStackStyle: CSSProperties = {
  maskImage: cardStackMask,
  WebkitMaskImage: cardStackMask,
};

const cardFrameStyle: CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
  filter: "drop-shadow(0 8px 32px rgba(0, 0, 0, 0.4))",
};

const cardSurfaceStyle: CSSProperties = {
  background: "#2a2a2a",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
};

const RiskManagement = () => {
  return (
    <section id="alerts" className="pt-0 pb-16 md:pt-0 md:pb-24 relative z-1">
      <div className="container px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-white font-medium">
              Core <span className="text-primary">capabilities</span>
            </p>
            <h2 className="mt-4 text-white text-2xl sm:text-3xl lg:text-[40px]">
              Proactive alerts mapped to your risk rules
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted/60">
              PLAND triggers actionable alerts based on custom risk guardrails to protect your portfolio from compounding losses.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative mt-8 h-72 w-full max-w-md" style={cardStackStyle}>
              {/*
                preserve-3d lets the cards be depth-sorted by the translateZ in
                their (compositor-only) keyframes instead of animating z-index.
              */}
              <div className="absolute inset-0 transform-3d">
                {RISK_ALERT_CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="animate-risk-card-slide absolute top-0 left-0 w-[calc(100%-80px)] rounded-xl p-px"
                    style={{ ...cardFrameStyle, animationDelay: card.animationDelay }}
                  >
                    <div className="rounded-[11px] px-5 py-4" style={cardSurfaceStyle}>
                      <div className="flex items-center gap-2.5">
                        <span className={`size-2 shrink-0 rounded-full ${card.dotClassName}`} />
                        <span className="text-[14px] font-semibold text-white/80">
                          {card.title}
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed text-white/35">
                        {card.description}
                      </p>
                      <span className="pt-2.5 text-[12px] text-white/20 block">
                        {card.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="container px-4 sm:px-6 mt-16 md:mt-24">
        <div className="w-full h-px bg-linear-to-r from-white/8 via-white/4 to-transparent" />
      </div>
    </section>
  );
};

export default RiskManagement;
