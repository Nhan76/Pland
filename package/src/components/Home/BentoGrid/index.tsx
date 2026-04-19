"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, TrendingDown, Check, Loader2, MousePointer2 } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import { useVisibleOnce } from "@/hooks/useVisibleOnce";

const CHART_TRIGGER_MARGIN = "0px 0px 35% 0px";

const AIAnalysisGrid = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const delays = [1500, 400, 600, 2000, 2000, 2000, 5000, 500];
    const timer = setTimeout(() => {
      setPhase((p) => (p + 1) % 8);
    }, delays[phase] || 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  const steps = [
    "Aggregating exchange balances...",
    "Analyzing cross-chain token correlations...",
    "Evaluating against defined risk guardrails..."
  ];

  return (
    <SpotlightCard className="flex h-115 flex-col p-6 sm:p-8 md:col-span-1">
      <div className="z-10 max-w-sm">
        <div className="mb-2 flex items-center space-x-2 text-white">
          <span className="text-lg sm:text-xl font-semibold tracking-wider">AI Analytics</span>
        </div>
        <p className="text-white/60 text-sm xl:text-base leading-relaxed">
          Ask questions. Get answers grounded in your data. Summarize risks, check rules...
        </p>
      </div>

      <div className="relative flex flex-col w-full grow mt-6 z-10 justify-start">
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-20 pb-[25%] lg:pb-16">
          <div className="relative flex justify-center">
            <motion.div
               animate={{ 
                 opacity: phase >= 2 ? 0 : 1, 
                 y: phase >= 2 ? -60 : -30, 
                 scale: phase === 1 ? 0.95 : 1 
               }}
               transition={{ duration: phase >= 2 ? 0.6 : 0.2 }}
               className="rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg origin-center"
            >
               Analyze
            </motion.div>

            <motion.div
               initial={{ x: 60, y: 60, opacity: 0 }}
               animate={{
                 x: phase === 0 ? 60 : (phase >= 1 && phase < 2 ? 10 : 10),
                 y: phase === 0 ? 60 : (phase >= 1 && phase < 2 ? -20 : -80),
                 opacity: phase === 0 ? 0 : (phase >= 2 ? 0 : 1),
                 scale: phase === 1 ? 0.9 : 1
               }}
               transition={{ 
                 duration: phase === 0 ? 0 : (phase === 1 ? 0.4 : 0.6), 
                 ease: "easeOut" 
               }}
               className="absolute right-0 bottom-0 z-50 text-white drop-shadow-lg"
            >
              <MousePointer2 className="h-6 w-6 fill-white stroke-black stroke-[1.5]" />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col space-y-3 relative w-full pt-4">
          {steps.map((text, index) => {
            const stepIndex = index + 3;
            const isCompleted = phase > stepIndex;
            const isVisible = phase >= stepIndex;

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }} 
                className="flex items-start space-x-3 pointer-events-none"
              >
                <div className="mt-0.5">
                  {isCompleted && phase !== 7 ? (
                    <Check className="h-4.5 w-4.5 shrink-0 text-primary" />
                  ) : (
                    <Loader2 className={`h-4.5 w-4.5 shrink-0 ${isVisible && !isCompleted ? "text-primary animate-spin" : "text-transparent"}`} />
                  )}
                </div>
                <span
                   className={`text-[14px] leading-tight font-medium tracking-wide ${
                    isCompleted && phase !== 7
                      ? "text-white/50 line-through"
                      : isVisible
                      ? "text-primary"
                      : "text-transparent"
                  }`}
                >
                  {text}
                </span>
              </motion.div>
            );
          })}

          <motion.div
             layout
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: phase === 6 ? 1 : 0, y: phase === 6 ? 0 : 10 }}
             transition={{ delay: 0.2 }}
             className="relative mt-4 wrap-break-word pointer-events-none"
          >
             <p className={`text-sm leading-relaxed ${phase === 6 ? "text-white/80" : "text-transparent"}`}>
               Portfolio is optimally diversified. <br className="hidden sm:block" /><span className={`${phase === 6 ? "text-primary" : "text-transparent"} font-medium`}>0 critical risk rules violated.</span> BTC dominance holds stable at 45%.
             </p>
          </motion.div>
        </div>
      </div>
    </SpotlightCard>
  );
};

const INITIAL_ALERTS = [
  { id: 1, text: "Unusual outbound transfer detected", type: "warning" },
  { id: 2, text: "Smart contract upgrade on holdings", type: "warning" },
  { id: 3, text: "Position size > 15%", type: "critical" },
  { id: 4, text: "High volatility detected", type: "warning" },
  { id: 5, text: "Drawdown threshold breached", type: "critical" },
];

const RiskAlertGrid = () => {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  useEffect(() => {
    let count = 5;
    const interval = setInterval(() => {
      count++;
      
      const newAlert = {
        id: count,
        text: count % 2 === 0 ? "Drawdown threshold breached" : "High volatility detected",
        type: count % 2 === 0 ? "critical" : "warning",
      };

      setAlerts((prev) => [...prev.slice(1), newAlert]); 
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SpotlightCard className="flex h-115 flex-col p-6 sm:p-8 md:col-span-2">
      <div className="z-10">
        <div className="mb-2 flex items-center space-x-2 text-white">
          <span className="text-lg sm:text-xl font-semibold tracking-wider">Live Alerts</span>
        </div>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed">
          Real-time monitoring of on-chain activities, volatility spikes, and portfolio parameter breaches.
        </p>
      </div>

      <div className="relative flex grow flex-col justify-center space-y-3 mt-4 pb-2 pt-2 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <AnimatePresence mode="popLayout">
          {alerts.map((alert, index) => {
            const centerIndex = 2;
            const dist = Math.abs(centerIndex - index);

            return (
              <motion.div
                layout
                key={alert.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ 
                  opacity: 1 - dist * 0.3, 
                  scale: 1 - dist * 0.05, 
                  y: 0 
                }}
                exit={{ opacity: 0, y: -40, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="rounded-xl p-px w-full"
                style={{ 
                  zIndex: 10 - dist,
                  background: "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)"
                }}
              >
              <div className="flex items-start space-x-3 rounded-[11px] px-4 py-3 w-full h-full" style={{ background: "#2a2a2a" }}>
                {alert.type === "critical" ? (
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 animate-pulse text-red-500" />
                ) : (
                  <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                )}
                <div>
                  <p className="text-[14px] font-semibold text-white/80">Rule Violated</p>
                  <p className="text-[12px] leading-relaxed text-white/35 mt-1">
                    {alert.text}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>
    </SpotlightCard>
  );
};

const mockPredictionData = [
  { time: "Nov", value: 38000 },
  { time: "Dec", value: 42000 },
  { time: "Jan", value: 40500 },
  { time: "Feb", value: 46000 },
  { time: "Mar", value: 45000 },
  { time: "Apr", value: 50000 },
  { time: "May", value: 54000, predict: 54000 },
  { time: "Jun", predict: 57500 },
  { time: "Jul", predict: 56000 },
  { time: "Aug", predict: 62000 },
  { time: "Sep", predict: 65000 },
  { time: "Oct", predict: 68000 },
];

const AIPredictionGrid = () => {
  const motionProfile = useMotionProfile();
  const { ref: chartViewportRef, hasEnteredView } = useVisibleOnce<HTMLDivElement>({
    rootMargin: CHART_TRIGGER_MARGIN,
    threshold: 0.01,
  });
  const shouldAnimateChart =
    motionProfile.chartAnimationsEnabled && hasEnteredView;
  const chartAnimationState = shouldAnimateChart ? "entered" : "idle";

  return (
    <SpotlightCard className="flex flex-col justify-between p-8 sm:p-10 md:col-span-3">
      <div className="z-10 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <div className="mb-2 flex items-center space-x-2 text-white">
            <span className="text-lg sm:text-xl font-semibold tracking-wider">AI Prediction</span>
          </div>
          <p className="text-white/60 max-w-lg">
            Forecast asset performance using advanced cross-chain AI trend modeling.
          </p>
        </div>
        <div className="flex bg-[#11141A] rounded-md p-1 border border-white/5">
          {["1M", "3M", "6M", "1Y", "ALL"].map((span) => (
            <button
              key={span}
              className={`text-[10px] sm:text-xs px-3 py-1.5 rounded-md font-semibold transition-all ${
                span === "6M"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {span}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={chartViewportRef}
        className="relative mt-4 h-80 w-full grow overflow-hidden"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockPredictionData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPredict" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1F26",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                padding: "12px 16px"
              }}
              itemStyle={{ fontWeight: "600", fontSize: "14px", color: "white", marginTop: "8px" }}
              labelStyle={{ color: "rgba(255,255,255,0.7)", marginBottom: "8px", fontSize: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "4px" }}
            />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              minTickGap={20}
              dy={10}
            />
            <YAxis
              domain={["auto", "auto"]}
              orientation="right"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val.toLocaleString()}`}
              dx={10}
              width={65}
            />
            <Area
              key={`historical-${chartAnimationState}`}
              type="monotone"
              dataKey="value"
              name="Historical"
              stroke="#22c55e"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 5, strokeWidth: 0, fill: "#22c55e" }}
              isAnimationActive={shouldAnimateChart}
            />
            <Area
              key={`prediction-${chartAnimationState}`}
              type="monotone"
              dataKey="predict"
              name="AI Prediction"
              stroke="#3b82f6"
              strokeWidth={3}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorPredict)"
              activeDot={{ r: 5, strokeWidth: 0, fill: "#3b82f6" }}
              isAnimationActive={shouldAnimateChart}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SpotlightCard>
  );
};

export default function BentoGrid() {
  return (
    <div className="mt-8 sm:mt-12 relative z-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <AIAnalysisGrid />
        <RiskAlertGrid />
        <AIPredictionGrid />
      </div>
    </div>
  );
}
