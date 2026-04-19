"use client";
import React, { memo } from "react";
import { motion, Variants } from "framer-motion";
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

import { useMotionProfile } from "@/hooks/useMotionProfile";

const mockPerformanceData = [
  { time: "7:00 AM", value: 238100 },
  { time: "10:00 AM", value: 240500 },
  { time: "1:00 PM", value: 239200 },
  { time: "4:00 PM", value: 241800 },
  { time: "7:00 PM", value: 240200 },
  { time: "10:00 PM", value: 242900 },
  { time: "1:14 AM", value: 243623 },
];

const allocationData = [
  { name: "BTC", value: 73.9, color: "#16c784" },
  { name: "BNB", value: 9.1, color: "#627eea" },
  { name: "ETH", value: 8.4, color: "#f3ba2f" },
  { name: "USDC", value: 4.1, color: "#2775ca" },
  { name: "USDT", value: 3.5, color: "#26a17b" },
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
  isAnimationActive: boolean;
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
};

const itemVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const DashboardAreaChart = memo(({
  chartKey,
  data,
  gradientId,
  strokeColor,
  isAnimationActive,
}: DashboardAreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 10 }}>
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
        <Area
          key={chartKey}
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
          activeDot={{ r: 4, strokeWidth: 0, fill: strokeColor }}
          isAnimationActive={isAnimationActive}
          animationBegin={0}
          animationDuration={500}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

DashboardAreaChart.displayName = 'DashboardAreaChart';

const PortfolioView = memo(() => {
  const motionProfile = useMotionProfile();
  const shouldAnimateCharts = motionProfile.chartAnimationsEnabled;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
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
        <div className="bg-white/[0.02] rounded-lg p-3 flex flex-col justify-start ring-1 ring-white/[0.05]">
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">All-time Profit</span>
          <span className="text-[#ea3943] font-bold text-sm md:text-base leading-none">-$6,955.83</span>
          <div className="mt-2 pt-1">
            <div className="bg-[#ea3943]/15 text-[#ea3943] text-[10px] font-medium px-2 py-0.5 rounded-full w-fit flex items-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              2.78%
            </div>
          </div>
        </div>
        {/* Metric 2 */}
        <div className="bg-white/[0.02] rounded-lg p-3 flex flex-col justify-start ring-1 ring-white/[0.05]">
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Cost Basis</span>
          <span className="text-white/80 font-bold text-sm md:text-base leading-none">$250,578.95</span>
        </div>
        {/* Metric 3 */}
        <div className="bg-white/[0.02] rounded-lg p-3 flex flex-col justify-start ring-1 ring-white/[0.05] col-span-2 md:col-span-1">
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-2">24h Performance</span>
          <div className="flex flex-col gap-1.5 mt-2 pt-1">
            <div className="flex justify-between items-center text-[11px] leading-none">
              <span className="text-white/40">Best <span className="text-white/70">BNB</span></span>
              <span className="text-[#16c784] font-medium">+2.19%</span>
            </div>
            <div className="flex justify-between items-center text-[11px] leading-none">
              <span className="text-white/40">Worst <span className="text-white/70">QTUM</span></span>
              <span className="text-white/70 font-medium">+0.00%</span>
            </div>
          </div>
        </div>
        {/* Metric 4 */}
        <div className="bg-white/[0.02] rounded-lg p-3 flex flex-col justify-start ring-1 ring-white/[0.05] hidden md:flex">
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Sharpe Ratio</span>
          <span className="text-[#16c784] font-bold text-sm md:text-base leading-none">4.19</span>
          <div className="mt-2 pt-1">
            <span className="bg-[#16c784]/15 text-[#16c784] text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-sm">Excellent</span>
          </div>
        </div>
        {/* Metric 5 */}
        <div className="bg-white/[0.02] rounded-lg p-3 flex flex-col justify-start ring-1 ring-white/[0.05] hidden md:flex">
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Max Drawdown</span>
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
      <div className="bg-white/[0.02] rounded-lg p-4 flex flex-col ring-1 ring-white/[0.05] lg:col-span-1 justify-between overflow-visible">
        <div className="mb-2">
          <div className="text-white/90 font-bold text-sm tracking-wide">Allocation</div>
        </div>

        <div className="w-full relative h-40 md:h-[180px] my-auto">
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
                isAnimationActive={shouldAnimateCharts}
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
      <div className="bg-white/[0.02] rounded-lg p-4 flex flex-col ring-1 ring-white/[0.05] lg:col-span-3">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
          <div>
            <div className="text-white/90 font-bold text-xs sm:text-sm mb-0.5 tracking-wide">Portfolio Performance</div>
          </div>
          <div className="flex bg-white/[0.03] rounded-md p-1 ring-1 ring-white/[0.04]">
            {chartTimeRanges.map((span) => (
              <button
                key={span}
                className={`text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md font-semibold transition-all ${
                  span === "24H"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/40 hover:text-white/80 hover:bg-white/5"
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
            isAnimationActive={shouldAnimateCharts}
          />
        </div>
      </div>
      
    </motion.div>
  </motion.div>
  );
});

PortfolioView.displayName = 'PortfolioView';

const CryptoDashboard = () => {
  return (
    <div className="relative z-20 w-full max-w-6xl mx-auto mt-8 md:mt-24 mb-16 px-3 md:px-4">
      {/* Laser glow overlay from flow hitting top of dashboard */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-[#16c784]/20 blur-[80px] rounded-[100%] pointer-events-none mix-blend-screen" />
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[25%] h-16 bg-[#16c784]/40 blur-[40px] rounded-[100%] pointer-events-none mix-blend-screen" />

      {/* The Dashboard Container with Skew */}
      <div className="relative">
        {/* Main dashboard */}
        <div
          className="relative overflow-hidden rounded-2xl border-t-2 border-t-[#16c784]/60 p-px md:[transform:rotateX(12deg)_rotateY(-2deg)_scale(0.98)] md:[transform-origin:center_top]"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 10%, rgba(255, 255, 255, 0.03) 30%, transparent 55%)",
            maskImage:
              "radial-gradient(120% 100% at 20% 20%, black 54%, rgba(0, 0, 0, 0.88) 76%, transparent 92%)",
            WebkitMaskImage:
              "radial-gradient(120% 100% at 20% 20%, black 54%, rgba(0, 0, 0, 0.88) 76%, transparent 92%)",
          }}
        >
          <div
            className="relative rounded-[15px] p-3 md:p-6 grid overflow-hidden min-h-[460px] md:min-h-[400px]"
            style={{ background: "#11141A" }}
          >
            {/* Top highlight glow */}
            <div
              className="pointer-events-none absolute top-0 left-0 size-80"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, rgba(22, 199, 132, 0.12) 0%, rgba(22, 199, 132, 0.04) 40%, transparent 70%)",
              }}
            />

            <PortfolioView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboard;
