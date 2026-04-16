"use client";

import React, { useState, useEffect, memo, type CSSProperties, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
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

import { cn } from "@/lib/utils";

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

const DEFENDER_TILT = {
  rotateX: 43,
  rotateY: 7,
  rotateZ: -16,
  perspective: 1800,
  scale: 1,
  floatingCardDepth: 144,
  floatingCardDepthStep: 18,
} as const;

const dashboardThemeStyle = {
  "--vip-dashboard-surface": "rgb(30 30 30)",
  "--vip-dashboard-card-surface":
    "color-mix(in srgb, var(--vip-dashboard-surface) 97%, white 3%)",
} as CSSProperties;

const dashboardMaskImage =
  "radial-gradient(120% 100% at 20% 20%, black 54%, rgba(0, 0, 0, 0.88) 76%, transparent 92%)";

const dashboardShellStyle: CSSProperties = {
  transform: `rotateX(${DEFENDER_TILT.rotateX}deg) rotateY(${DEFENDER_TILT.rotateY}deg) rotateZ(${DEFENDER_TILT.rotateZ}deg) scale(${DEFENDER_TILT.scale})`,
  transformOrigin: "center center",
};

const dashboardFrameStyle: CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 10%, rgba(255, 255, 255, 0.04) 30%, transparent 55%)",
};

const dashboardChromeOverlayStyle: CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 10%, rgba(255, 255, 255, 0.04) 30%, transparent 55%)",
  maskImage: dashboardMaskImage,
  WebkitMaskImage: dashboardMaskImage,
};

const dashboardSurfaceStyle: CSSProperties = {
  background: "var(--vip-dashboard-surface)",
  perspective: `${DEFENDER_TILT.perspective}px`,
  perspectiveOrigin: "50% 50%",
  transformStyle: "preserve-3d",
};

const dashboardTopHighlightStyle: CSSProperties = {
  background:
    "radial-gradient(circle at 0% 0%, rgba(22, 199, 132, 0.12) 0%, rgba(22, 199, 132, 0.04) 40%, transparent 70%)",
};

const dashboardBottomRightFadeStyle: CSSProperties = {
  background:
    "radial-gradient(24% 26% at 95% 93%, rgba(8, 11, 18, 0.96) 0%, rgba(8, 11, 18, 0.82) 24%, rgba(8, 11, 18, 0.44) 50%, rgba(8, 11, 18, 0.14) 68%, rgba(8, 11, 18, 0) 82%)",
  maskImage: dashboardMaskImage,
  WebkitMaskImage: dashboardMaskImage,
};

const floatingCardBaseStyle: CSSProperties = {
  transformStyle: "preserve-3d",
  willChange: "transform",
  backfaceVisibility: "hidden",
  transition: "box-shadow 0.3s ease-out",
};

const preserve3DStyle: CSSProperties = {
  transformStyle: "preserve-3d",
};

const floatingCardSurfaceClassName =
  "h-full w-full overflow-visible rounded-lg ring-1 ring-white/[0.08]";

const floatingCardSurfaceStyle: CSSProperties = {
  background: "var(--vip-dashboard-card-surface)",
};

const floatingCardFloatStyles = {
  metricA: {
    animationDuration: "4.8s",
    animationDelay: "-0.8s",
  },
  metricB: {
    animationDuration: "5.6s",
    animationDelay: "0.45s",
    animationDirection: "reverse",
  },
  metricC: {
    animationDuration: "6.2s",
    animationDelay: "-1.4s",
  },
  metricD: {
    animationDuration: "5.1s",
    animationDelay: "1.15s",
    animationDirection: "alternate-reverse",
  },
  metricE: {
    animationDuration: "6.7s",
    animationDelay: "-2.1s",
  },
  panelA: {
    animationDelay: "-0.9s",
  },
  panelB: {
    animationDelay: "-2.4s",
  },
} satisfies Record<string, CSSProperties>;

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

type FloatingDashboardCardProps = {
  children: ReactNode;
  custom: number;
  shadow: string;
  containerClassName?: string;
  surfaceClassName?: string;
  floatClassName?: string;
  floatStyle?: CSSProperties;
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

const floating3DVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
    z: 0,
    rotateY: -4,
    rotateX: -2
  },
  show: (custom: number) => ({
    opacity: 1,
    x: 0,
    z:
      DEFENDER_TILT.floatingCardDepth +
      (custom % 3) * DEFENDER_TILT.floatingCardDepthStep,
    rotateY: custom * 1.25,
    rotateX: custom % 2 === 0 ? -1.5 : -0.5,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      z: { duration: 0.6, ease: "easeOut" },
      rotateY: { duration: 0.7, ease: "easeOut" }
    }
  }),
  exit: {
    opacity: 0,
    z: 0,
    transition: { duration: 0.3 }
  }
};

const FloatingDashboardCard = memo(({
  children,
  custom,
  shadow,
  containerClassName,
  surfaceClassName,
  floatClassName,
  floatStyle,
}: FloatingDashboardCardProps) => (
  <motion.div
    custom={custom}
    variants={floating3DVariants}
    className={cn("w-full", containerClassName)}
    style={{ ...floatingCardBaseStyle, boxShadow: shadow }}
  >
    <div
      className={cn(
        floatingCardSurfaceClassName,
        surfaceClassName,
        floatClassName
      )}
      style={{ ...floatingCardSurfaceStyle, ...floatStyle }}
    >
      {children}
    </div>
  </motion.div>
));

FloatingDashboardCard.displayName = "FloatingDashboardCard";

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
    style={preserve3DStyle}
  >
    <motion.div
      variants={itemVariantsLeft}
      className="flex flex-col gap-4"
      style={preserve3DStyle}
    >
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

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 md:gap-3"
        style={preserve3DStyle}
      >
        <FloatingDashboardCard
          custom={0}
          shadow="0 8px 24px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float"
          floatStyle={floatingCardFloatStyles.metricA}
        >
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
        </FloatingDashboardCard>
        <FloatingDashboardCard
          custom={1}
          shadow="0 14px 36px rgba(0, 0, 0, 0.25), 0 8px 18px rgba(0, 0, 0, 0.18)"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float-delayed"
          floatStyle={floatingCardFloatStyles.metricB}
        >
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Cost Basis</span>
          <span className="text-white/80 font-bold text-sm md:text-base leading-none">$250,578.95</span>
        </FloatingDashboardCard>
        <FloatingDashboardCard
          custom={2}
          shadow="0 17px 42px rgba(0, 0, 0, 0.3), 0 10px 21px rgba(0, 0, 0, 0.21)"
          containerClassName="col-span-2 md:col-span-1"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float-delayed-2"
          floatStyle={floatingCardFloatStyles.metricC}
        >
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
        </FloatingDashboardCard>
        <FloatingDashboardCard
          custom={3}
          shadow="0 20px 48px rgba(0, 0, 0, 0.35), 0 12px 24px rgba(0, 0, 0, 0.24)"
          containerClassName="hidden md:flex"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float-delayed-3"
          floatStyle={floatingCardFloatStyles.metricD}
        >
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Sharpe Ratio</span>
          <span className="text-[#16c784] font-bold text-sm md:text-base leading-none">4.19</span>
          <div className="mt-2 pt-1">
            <span className="bg-[#16c784]/15 text-[#16c784] text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-sm">Excellent</span>
          </div>
        </FloatingDashboardCard>
        <FloatingDashboardCard
          custom={4}
          shadow="0 23px 54px rgba(0, 0, 0, 0.4), 0 14px 27px rgba(0, 0, 0, 0.27)"
          containerClassName="hidden md:flex"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float-delayed-4"
          floatStyle={floatingCardFloatStyles.metricE}
        >
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
        </FloatingDashboardCard>
      </div>
    </motion.div>

    <motion.div
      variants={itemVariantsLeft}
      className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3"
      style={preserve3DStyle}
    >
      <FloatingDashboardCard
        custom={5}
        shadow="0 26px 60px rgba(0, 0, 0, 0.45), 0 16px 30px rgba(0, 0, 0, 0.3)"
        containerClassName="lg:col-span-1"
        surfaceClassName="p-4 flex h-full flex-col justify-between"
        floatClassName="animate-panel-float-a"
        floatStyle={floatingCardFloatStyles.panelA}
      >
        <div className="mb-2">
          <div className="text-white/90 font-bold text-sm tracking-wide">Allocation</div>
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
      </FloatingDashboardCard>

      <FloatingDashboardCard
        custom={6}
        shadow="0 29px 66px rgba(0, 0, 0, 0.5), 0 18px 33px rgba(0, 0, 0, 0.33)"
        containerClassName="lg:col-span-3"
        surfaceClassName="p-4 flex h-full flex-col"
        floatClassName="animate-panel-float-b"
        floatStyle={floatingCardFloatStyles.panelB}
      >
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
            gradientId="portfolioGradientPerf"
            strokeColor="#16c784"
          />
        </div>
      </FloatingDashboardCard>
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
    style={preserve3DStyle}
  >
    <motion.div
      variants={itemVariantsRight}
      className="flex flex-col gap-4"
      style={preserve3DStyle}
    >
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

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 md:gap-3"
        style={preserve3DStyle}
      >
        <FloatingDashboardCard
          custom={0}
          shadow="0 8px 24px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float"
          floatStyle={floatingCardFloatStyles.metricA}
        >
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">30-Day Volatility</span>
          <span className="text-[#ea3943] font-bold text-sm md:text-base leading-none">42.5%</span>
          <div className="mt-2 pt-1">
            <div className="bg-[#ea3943]/15 text-[#ea3943] text-[10px] font-medium px-2 py-0.5 rounded-full w-fit flex items-center">
              Target &lt; 35%
            </div>
          </div>
        </FloatingDashboardCard>
        <FloatingDashboardCard
          custom={1}
          shadow="0 14px 36px rgba(0, 0, 0, 0.25), 0 8px 18px rgba(0, 0, 0, 0.18)"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float-delayed"
          floatStyle={floatingCardFloatStyles.metricB}
        >
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Portfolio Beta</span>
          <span className="text-white/80 font-bold text-sm md:text-base leading-none">1.15</span>
        </FloatingDashboardCard>
        <FloatingDashboardCard
          custom={2}
          shadow="0 17px 42px rgba(0, 0, 0, 0.3), 0 10px 21px rgba(0, 0, 0, 0.21)"
          containerClassName="col-span-2 md:col-span-1"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float-delayed-2"
          floatStyle={floatingCardFloatStyles.metricC}
        >
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-2">Stress Test (BTC -20%)</span>
          <div className="flex flex-col gap-1.5 mt-2 pt-1">
            <div className="flex justify-between items-center text-[11px] leading-none">
              <span className="text-white/40">Est. Impact</span>
              <span className="text-[#ea3943] font-medium">-$26,500</span>
            </div>
            <div className="flex justify-between items-center text-[11px] leading-none">
              <span className="text-white/40">Liquidation Risk</span>
              <span className="text-[#16c784] font-medium">Safe</span>
            </div>
          </div>
        </FloatingDashboardCard>
        <FloatingDashboardCard
          custom={3}
          shadow="0 20px 48px rgba(0, 0, 0, 0.35), 0 12px 24px rgba(0, 0, 0, 0.24)"
          containerClassName="hidden md:flex"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float-delayed-3"
          floatStyle={floatingCardFloatStyles.metricD}
        >
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Concentration Risk</span>
          <span className="text-[#f3ba2f] font-bold text-sm md:text-base leading-none">73.9% BTC</span>
          <div className="mt-2 pt-1">
            <span className="bg-[#f3ba2f]/15 text-[#f3ba2f] text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-sm">Warning</span>
          </div>
        </FloatingDashboardCard>
        <FloatingDashboardCard
          custom={4}
          shadow="0 23px 54px rgba(0, 0, 0, 0.4), 0 14px 27px rgba(0, 0, 0, 0.27)"
          containerClassName="hidden md:flex"
          surfaceClassName="p-3 flex flex-col justify-start"
          floatClassName="animate-dramatic-float-delayed-4"
          floatStyle={floatingCardFloatStyles.metricE}
        >
          <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Sharpe Ratio</span>
          <span className="text-[#16c784] font-bold text-sm md:text-base leading-none">4.19</span>
          <div className="mt-2 pt-1">
            <span className="bg-[#16c784]/15 text-[#16c784] text-[9px] flex items-center gap-1 font-medium px-1.5 py-0.5 rounded-sm">
              Excellent
            </span>
          </div>
        </FloatingDashboardCard>
      </div>
    </motion.div>

    <motion.div
      variants={itemVariantsRight}
      className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3"
      style={preserve3DStyle}
    >
      <FloatingDashboardCard
        custom={5}
        shadow="0 26px 60px rgba(0, 0, 0, 0.45), 0 16px 30px rgba(0, 0, 0, 0.3)"
        containerClassName="lg:col-span-1"
        surfaceClassName="p-4 flex h-full flex-col justify-between"
        floatClassName="animate-panel-float-a"
        floatStyle={floatingCardFloatStyles.panelA}
      >
        <div className="mb-2">
          <div className="text-white/90 font-bold text-sm tracking-wide">Risk Contribution</div>
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
      </FloatingDashboardCard>

      <FloatingDashboardCard
        custom={6}
        shadow="0 29px 66px rgba(0, 0, 0, 0.5), 0 18px 33px rgba(0, 0, 0, 0.33)"
        containerClassName="lg:col-span-3"
        surfaceClassName="p-4 flex h-full flex-col"
        floatClassName="animate-panel-float-b"
        floatStyle={floatingCardFloatStyles.panelB}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
          <div>
            <div className="text-white/90 font-bold text-xs sm:text-sm mb-0.5 tracking-wide">Risk Exposure (VaR)</div>
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
            chartKey="risk-exposure"
            data={mockRiskData}
            gradientId="portfolioGradientRisk"
            strokeColor="#ea3943"
          />
        </div>
      </FloatingDashboardCard>
    </motion.div>
  </motion.div>
));

RiskView.displayName = 'RiskView';

const VIPDashboard = () => {

  return (
    <section
      className="pt-16 pb-16 md:pt-24 md:pb-24 relative z-1"
      style={dashboardThemeStyle}
    >
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="max-w-2xl mb-12">
            <p className="text-white font-medium">
              Portfolio <span className="text-primary">Defense</span>
            </p>
            <h2 className="mt-4 text-white text-2xl sm:text-3xl lg:text-[40px]">
              Multi-dimensional risk guardrails
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted/60">
              PLAND enforces discipline through automated risk controls and concentration limits to protect your portfolio from compounding losses.
            </p>
          </div>

          {/* Dashboard Container */}
          <div className="relative">
            {/* Outer container with skew and mask */}
            <div
              className="relative rounded-2xl"
              style={dashboardShellStyle}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl border border-white/[0.08]"
                style={dashboardChromeOverlayStyle}
              />
              {/* Inner container with gradient border */}
              <div
                className="relative overflow-visible rounded-xl p-px"
                style={dashboardFrameStyle}
              >
                <div
                  className="relative grid min-h-[460px] overflow-visible rounded-[11px] p-4 sm:p-6 md:min-h-[400px] md:p-8"
                  style={dashboardSurfaceStyle}
                >
                  {/* Top highlight */}
                  <div
                    className="pointer-events-none absolute top-0 left-0 size-80 z-0"
                    style={dashboardTopHighlightStyle}
                  />

                  <div className="relative z-0">
                    <PortfolioView />
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-px rounded-[11px] z-20"
                  style={dashboardBottomRightFadeStyle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VIPDashboard;
