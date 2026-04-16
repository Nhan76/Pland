"use client";
import React, { useState, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

const mockPerformanceData = [
  { time: "7:00 AM", value: 238100 },
  { time: "10:00 AM", value: 240500 },
  { time: "1:00 PM", value: 239200 },
  { time: "4:00 PM", value: 241800 },
  { time: "7:00 PM", value: 240200 },
  { time: "10:00 PM", value: 242900 },
  { time: "1:14 AM", value: 243623 },
];

const mockRiskData = [
  { time: "7:00 AM", value: 11000 },
  { time: "10:00 AM", value: 11500 },
  { time: "1:00 PM", value: 10500 },
  { time: "4:00 PM", value: 12200 },
  { time: "7:00 PM", value: 11800 },
  { time: "10:00 PM", value: 12400 },
  { time: "1:14 AM", value: 12980 },
];

const allocationData = [
  { name: "BTC", value: 73.9, color: "#16c784" },
  { name: "BNB", value: 9.1, color: "#627eea" },
  { name: "ETH", value: 8.4, color: "#f3ba2f" },
  { name: "USDC", value: 4.1, color: "#2775ca" },
  { name: "USDT", value: 3.5, color: "#26a17b" },
];

const riskAllocationData = [
  { name: "BTC Risk", value: 52.4, color: "#ea3943" },
  { name: "Altcoins", value: 28.1, color: "#f3ba2f" },
  { name: "ETH Risk", value: 15.3, color: "#627eea" },
  { name: "Stables", value: 4.2, color: "#16c784" },
];

const chartTimeRanges = ["24H", "7D", "30D", "90D", "ALL"] as const;

const chartTooltipContentStyle = {
  backgroundColor: "#1A1F26",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
  padding: "8px",
};

const chartTooltipItemStyle = {
  color: "#fff",
  fontWeight: "600",
  fontSize: "11px",
};

const chartTooltipLabelStyle = {
  color: "rgba(255,255,255,0.5)",
  marginBottom: "2px",
  fontSize: "9px",
};

const chartXAxisProps = {
  dataKey: "time",
  stroke: "rgba(255,255,255,0.05)",
  tick: { fill: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 500 },
  tickLine: false,
  axisLine: false,
  minTickGap: 20,
  dy: 10,
  padding: { left: 10, right: 10 },
} as const;

const chartYAxisProps = {
  domain: ["auto", "auto"] as const,
  orientation: "right" as const,
  stroke: "rgba(255,255,255,0.05)",
  tick: { fill: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 500 },
  tickLine: false,
  axisLine: false,
  dx: 10,
  width: 55,
};

type ChartPoint = {
  time: string;
  value: number;
};

type DashboardAreaChartProps = {
  chartKey: string;
  data: ChartPoint[];
  gradientId: string;
  strokeColor: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const itemVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariantsRight: Variants = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const DashboardAreaChart = memo(({
  chartKey,
  data,
  gradientId,
  strokeColor,
}: DashboardAreaChartProps) => {
  const [animationInstance, setAnimationInstance] = useState(0);
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    setIsChartReady(false);

    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setAnimationInstance((current) => current + 1);
        setIsChartReady(true);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [chartKey]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        key={`${chartKey}-${animationInstance}`}
        data={data}
        margin={{ top: 5, right: 0, left: 0, bottom: 10 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity={0.2} />
            <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={chartTooltipContentStyle}
          itemStyle={chartTooltipItemStyle}
          labelStyle={chartTooltipLabelStyle}
        />
        <XAxis {...chartXAxisProps} />
        <YAxis
          {...chartYAxisProps}
          tickFormatter={(value: number | string) =>
            typeof value === "number" ? `$${value.toLocaleString()}` : String(value)
          }
        />
        {isChartReady ? (
          <Area
            key={`${chartKey}-area-${animationInstance}`}
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 4, strokeWidth: 0, fill: strokeColor }}
            isAnimationActive
            animationBegin={0}
            animationDuration={500}
            animationEasing="ease-out"
          />
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  );
});

DashboardAreaChart.displayName = 'DashboardAreaChart';

const PortfolioView = memo(() => (
  <motion.div
    key="portfolio"
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit="exit"
    className="flex flex-col gap-4 md:gap-6 col-start-1 row-start-1 w-full h-full"
  >
    {/* Total Value & Metrics Row */}
    <motion.div variants={itemVariantsLeft} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-white/50 text-[9px] font-bold uppercase tracking-widest mb-1">Total Portfolio Value</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl md:text-4xl font-bold text-white tracking-tight">$243,623.12</span>
          <span className="text-[#ea3943] font-medium text-xs flex items-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            2.78%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        {/* Metric 1 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5">
          <span className="text-white/60 text-[11px] font-medium mb-1">All-time Profit</span>
          <span className="text-[#ea3943] font-bold text-sm md:text-base leading-none">-$6,955.83</span>
          <div className="mt-2 pt-1">
            <div className="bg-[#ea3943]/20 text-[#ea3943] text-[10px] font-medium px-2 py-0.5 rounded-full w-fit flex items-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              2.78%
            </div>
          </div>
        </div>
        {/* Metric 2 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5">
          <span className="text-white/60 text-[11px] font-medium mb-1">Cost Basis</span>
          <span className="text-white font-bold text-sm md:text-base leading-none">$250,578.95</span>
        </div>
        {/* Metric 3 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5 col-span-2 md:col-span-1">
          <span className="text-white/60 text-[11px] font-medium mb-2">24h Performance</span>
          <div className="flex flex-col gap-1.5 mt-2 pt-1">
            <div className="flex justify-between items-center text-[11px] leading-none">
              <span className="text-white/50">Best <span className="text-white/80">BNB</span></span>
              <span className="text-[#16c784] font-medium">+2.19%</span>
            </div>
            <div className="flex justify-between items-center text-[11px] leading-none">
              <span className="text-white/50">Worst <span className="text-white/80">QTUM</span></span>
              <span className="text-white/80 font-medium">+0.00%</span>
            </div>
          </div>
        </div>
        {/* Metric 4 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5 hidden md:flex">
          <span className="text-white/60 text-[11px] font-medium mb-1">Sharpe Ratio</span>
          <span className="text-[#16c784] font-bold text-sm md:text-base leading-none">4.19</span>
          <div className="mt-2 pt-1">
            <span className="bg-[#16c784]/20 text-[#16c784] text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">Excellent</span>
          </div>
        </div>
        {/* Metric 5 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5 hidden md:flex">
          <span className="text-white/60 text-[11px] font-medium mb-1">Max Drawdown</span>
          <span className="text-[#ea3943] font-bold text-sm md:text-base leading-none">-15.76%</span>
          <div className="mt-2 pt-1">
            <span className="text-[#f3ba2f] text-[9px] flex items-center gap-1 font-medium">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Not recovered
            </span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Bottom Grid: Allocation & Charts */}
    <motion.div variants={itemVariantsLeft} className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3">
      
      {/* Allocation Card */}
      <div className="bg-[#1A1F26] rounded-xl p-4 flex flex-col border border-white/5 lg:col-span-1 justify-between">
        <div className="mb-2">
          <div className="text-white font-bold text-sm">Allocation</div>
        </div>
        
        <div className="w-full relative h-[140px] md:h-[180px] my-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                cornerRadius={2}
              >
                {allocationData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-2.5 pr-1 mb-2">
          {allocationData.map((asset, i) => (
            <div key={i} className="flex justify-between items-center text-[11px] font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }} />
                <span className="text-white/90">{asset.name}</span>
              </div>
              <span className="text-white/60">{asset.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart Card */}
      <div className="bg-[#1A1F26] rounded-xl p-4 flex flex-col border border-white/5 lg:col-span-3">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
          <div>
            <div className="text-white font-bold text-xs sm:text-sm mb-0.5">Portfolio Performance</div>
          </div>
          <div className="flex bg-[#11141A] rounded-md p-1 border border-white/5">
            {chartTimeRanges.map((span) => (
              <button
                key={span}
                className={`text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md font-semibold transition-all ${
                  span === "24H"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {span}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full relative min-h-[180px] md:min-h-[260px]">
          <DashboardAreaChart
            chartKey="portfolio-performance"
            data={mockPerformanceData}
            gradientId="cmcGradientPerf"
            strokeColor="#16c784"
          />
        </div>
      </div>
      
    </motion.div>
  </motion.div>
));

PortfolioView.displayName = 'PortfolioView';

const RiskView = memo(() => (
  <motion.div
    key="risk"
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit="exit"
    className="flex flex-col gap-4 md:gap-6 col-start-1 row-start-1 w-full h-full"
  >
    {/* Total Risk Row */}
    <motion.div variants={itemVariantsRight} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-white/50 text-[9px] font-bold uppercase tracking-widest mb-1">Value at Risk (95% Confidence)</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl md:text-4xl font-bold text-white tracking-tight">$12,980.00</span>
          <span className="text-[#ea3943] font-medium text-xs flex items-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            5.11%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        {/* Metric 1 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5">
          <span className="text-white/60 text-[11px] font-medium mb-1">30-Day Volatility</span>
          <span className="text-[#ea3943] font-bold text-sm md:text-base leading-none">42.5%</span>
          <div className="mt-2 pt-1">
            <div className="bg-[#ea3943]/20 text-[#ea3943] text-[10px] font-medium px-2 py-0.5 rounded-full w-fit flex items-center">
              Target &lt; 35%
            </div>
          </div>
        </div>
        {/* Metric 2 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5">
          <span className="text-white/60 text-[11px] font-medium mb-1">Portfolio Beta</span>
          <span className="text-white font-bold text-sm md:text-base leading-none">1.15</span>
        </div>
        {/* Metric 3 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5 col-span-2 md:col-span-1">
          <span className="text-white/60 text-[11px] font-medium mb-2">Stress Test (BTC -20%)</span>
          <div className="flex flex-col gap-1.5 mt-2 pt-1">
            <div className="flex justify-between items-center text-[11px] leading-none">
              <span className="text-white/50">Est. Impact</span>
              <span className="text-[#ea3943] font-medium">-$26,500</span>
            </div>
            <div className="flex justify-between items-center text-[11px] leading-none">
              <span className="text-white/50">Liquidation Risk</span>
              <span className="text-[#16c784] font-medium">Safe</span>
            </div>
          </div>
        </div>
        {/* Metric 4 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5 hidden md:flex">
          <span className="text-white/60 text-[11px] font-medium mb-1">Concentration Risk</span>
          <span className="text-[#f3ba2f] font-bold text-sm md:text-base leading-none">73.9% BTC</span>
          <div className="mt-2 pt-1">
            <span className="bg-[#f3ba2f]/20 text-[#f3ba2f] text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">Warning</span>
          </div>
        </div>
        {/* Metric 5 */}
        <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5 hidden md:flex">
          <span className="text-white/60 text-[11px] font-medium mb-1">Sharpe Ratio</span>
          <span className="text-[#16c784] font-bold text-sm md:text-base leading-none">4.19</span>
          <div className="mt-2 pt-1">
            <span className="bg-[#16c784]/20 text-[#16c784] text-[9px] flex items-center gap-1 font-medium px-1.5 py-0.5 rounded-sm">
              Excellent
            </span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Bottom Grid: Allocation & Charts */}
    <motion.div variants={itemVariantsRight} className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3">
      
      {/* Risk Contribution Card */}
      <div className="bg-[#1A1F26] rounded-xl p-4 flex flex-col border border-white/5 lg:col-span-1 justify-between">
        <div className="mb-2">
          <div className="text-white font-bold text-sm">Risk Contribution</div>
        </div>
        
        <div className="w-full relative h-[140px] md:h-[180px] my-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskAllocationData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                cornerRadius={2}
              >
                {riskAllocationData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-2.5 pr-1 mb-2">
          {/* Spacer to match the 5 items in PortfolioView and prevent layout shift */}
          <div className="flex justify-between items-center text-[11px] font-medium invisible" aria-hidden="true">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" />
              <span>spacer</span>
            </div>
            <span>0%</span>
          </div>
          {riskAllocationData.map((asset, i) => (
            <div key={i} className="flex justify-between items-center text-[11px] font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }} />
                <span className="text-white/90">{asset.name}</span>
              </div>
              <span className="text-white/60">{asset.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart Card */}
      <div className="bg-[#1A1F26] rounded-xl p-4 flex flex-col border border-white/5 lg:col-span-3">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
          <div>
            <div className="text-white font-bold text-xs sm:text-sm mb-0.5">Risk Exposure (VaR)</div>
          </div>
          <div className="flex bg-[#11141A] rounded-md p-1 border border-white/5">
            {chartTimeRanges.map((span) => (
              <button
                key={span}
                className={`text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md font-semibold transition-all ${
                  span === "24H"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {span}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full relative min-h-[180px] md:min-h-[260px]">
          <DashboardAreaChart
            chartKey="risk-exposure"
            data={mockRiskData}
            gradientId="cmcGradientRisk"
            strokeColor="#ea3943"
          />
        </div>
      </div>

    </motion.div>
  </motion.div>
));

RiskView.displayName = 'RiskView';

const CryptoDashboard = () => {
  const [view, setView] = useState<"portfolio" | "risk">("portfolio");
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (isHovered || isMobile) return;

    const interval = setInterval(() => {
      setView((prev) => (prev === "portfolio" ? "risk" : "portfolio"));
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered, isMobile]);

  return (
    <div className="relative z-20 w-full max-w-6xl mx-auto mt-8 md:mt-24 mb-16 px-3 md:px-4">
      {/* Laser glow overlay from flow hitting top of dashboard */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-[#16c784]/20 blur-[80px] rounded-[100%] pointer-events-none mix-blend-screen" />
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[25%] h-16 bg-[#16c784]/40 blur-[40px] rounded-[100%] pointer-events-none mix-blend-screen" />

      {/* The Dashboard Container */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative bg-[#11141A] border border-white/5 border-t-[#16c784]/50 rounded-3xl shadow-2xl p-3 md:p-6 grid overflow-hidden min-h-[460px] md:min-h-[400px]"
        style={{
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          {view === "portfolio" ? <PortfolioView /> : <RiskView />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CryptoDashboard;
