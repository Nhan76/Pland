"use client";

import React from "react";

const RiskManagement = () => {
  return (
    <section className="pt-0 pb-16 md:pt-0 md:pb-24 relative z-1">
      {/* Inline styles for continuous sliding animation */}
      <style>{`
        @keyframes slideContinuous {
          0% {
            top: 0px;
            left: 0px;
            right: 16px;
            opacity: 0.2;
            z-index: 10;
          }
          33.33% {
            top: 48px;
            left: 40px;
            right: 8px;
            opacity: 0.6;
            z-index: 20;
          }
          66.66% {
            top: 96px;
            left: 80px;
            right: 0px;
            opacity: 1;
            z-index: 30;
          }
          95% {
            top: 144px;
            left: 120px;
            right: -8px;
            opacity: 0;
            z-index: 30;
          }
          95.1% {
            top: -48px;
            left: -40px;
            right: 24px;
            opacity: 0;
            z-index: 10;
          }
          100% {
            top: 0px;
            left: 0px;
            right: 16px;
            opacity: 0.2;
            z-index: 10;
          }
        }
      `}</style>
      <div className="container px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-white font-medium">
              Core <span className="text-primary">capabilities</span>
            </p>
            <h2 className="mt-4 text-white sm:text-[40px] text-3xl">
              Proactive alerts mapped to your risk rules
            </h2>
            <p className="mt-6 text-lg text-muted/60">
              PLAND triggers actionable alerts based on custom risk guardrails to protect your portfolio from compounding losses.
            </p>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative mt-8 h-72 w-full max-w-md"
              style={{
                maskImage:
                  "radial-gradient(ellipse 130% 130% at 15% 20%, black 35%, transparent 65%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 130% 130% at 15% 20%, black 35%, transparent 65%)",
              }}
            >
              {/* Card 1 */}
              <div
                className="absolute rounded-xl p-px"
                style={{
                  transform: "skewY(-8deg) skewX(-2deg)",
                  animation: "slideContinuous 9s linear infinite",
                  animationDelay: "0s",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
                }}
              >
                <div
                  className="rounded-[11px] px-5 py-4"
                  style={{ background: "#2a2a2a" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-2 shrink-0 rounded-full bg-emerald-400"></span>
                    <span className="text-[14px] font-semibold text-white/80">
                      Unusual outbound transfer detected
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/35">
                    10,000 USDT moved from KuCoin exchange account
                  </p>
                  <span className="pt-2.5 text-[12px] text-white/20 block">
                    2m ago
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="absolute rounded-xl p-px"
                style={{
                  transform: "skewY(-8deg) skewX(-2deg)",
                  animation: "slideContinuous 9s linear infinite",
                  animationDelay: "-3s",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
                }}
              >
                <div
                  className="rounded-[11px] px-5 py-4"
                  style={{ background: "#2a2a2a" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-2 shrink-0 rounded-full bg-orange-400"></span>
                    <span className="text-[14px] font-semibold text-white/80">
                      High volatility detected
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/35">
                    ETH dropping more than 5% in the last 1 hour
                  </p>
                  <span className="pt-2.5 text-[12px] text-white/20 block">
                    15m ago
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div
                className="absolute rounded-xl p-px"
                style={{
                  transform: "skewY(-8deg) skewX(-2deg)",
                  animation: "slideContinuous 9s linear infinite",
                  animationDelay: "-6s",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
                }}
              >
                <div
                  className="rounded-[11px] px-5 py-4"
                  style={{ background: "#2a2a2a" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-2 shrink-0 rounded-full bg-red-500"></span>
                    <span className="text-[14px] font-semibold text-white/80">
                      Drawdown threshold breached
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/35">
                    BTC position size exceeded -15% drawdown guardrail
                  </p>
                  <span className="pt-2.5 text-[12px] text-white/20 block">
                    1h ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskManagement;