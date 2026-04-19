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
  "--vip-dashboard-surface": "var(--background)",
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
    "radial-gradient(38% 42% at 102% 94%, hsl(222, 20%, 4%) 0%, hsl(222, 20%, 4%) 8%, hsl(222, 20%, 4%, 0.98) 16%, hsl(222, 20%, 4%, 0.92) 26%, hsl(222, 20%, 4%, 0.82) 38%, hsl(222, 20%, 4%, 0.65) 52%, hsl(222, 20%, 4%, 0.38) 68%, hsl(222, 20%, 4%, 0.12) 84%, transparent 100%)",
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
      id="guardrails"
      className="pt-16 pb-16 md:pt-24 md:pb-24 relative z-1"
      style={dashboardThemeStyle}
    >
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Trading Journal Section Header */}
          <div className="mb-28">
            <div className="max-w-2xl">
              <p className="text-white font-medium">
                Performance <span className="text-primary">Tracking</span>
              </p>
              <h2 className="mt-4 text-white text-2xl sm:text-3xl lg:text-[40px]">
                Trading Journal
              </h2>
              <p className="mt-6 text-base md:text-lg text-muted/60">
                Track your portfolio performance, analyze win rates, and monitor stop-loss triggers with real-time insights.
              </p>
            </div>
          </div>

          {/* VIP Profile Dashboard */}
          <div className="relative mx-auto max-w-[1240px] px-6 pb-10 sm:px-10 lg:px-16 mb-20">
            <div className="origin-top scale-[0.78] -mb-[22%] sm:mb-0 sm:scale-100">
              <div className="relative mx-auto w-full max-w-lg pb-12 md:[perspective:1200px]" style={{ top: "-2rem", marginBottom: "-2rem" } as CSSProperties}>

                {/* Main VIP Card */}
                <div
                  className="relative overflow-hidden rounded-xl bg-white/[0.03] backdrop-blur-sm md:[transform:rotateX(4deg)_rotateY(-2deg)]"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 8px 30px" } as CSSProperties}
                >
                  {/* Gradient Background */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: "radial-gradient(circle at 78% 12%, rgba(239, 68, 68, 0.12), transparent 34%), radial-gradient(circle at 22% 78%, rgba(248, 113, 113, 0.06), transparent 42%)"
                    } as CSSProperties}
                  />

                  {/* Header */}
                  <div className="relative flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-block size-2 rounded-full bg-primary" />
                      <span className="text-sm font-semibold text-white/80">Portfolio Distribution</span>
                    </div>
                    <span className="text-xs font-medium text-white/40">Total: $243.6K</span>
                  </div>

                  {/* Card Content - Pie Chart */}
                  <div className="relative p-5">
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-[240px]">
                        <ResponsiveContainer width="100%" height={240}>
                          <PieChart>
                            <Pie
                              data={allocationData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={95}
                              paddingAngle={3}
                              cornerRadius={8}
                              dataKey="value"
                              stroke="none"
                            >
                              {allocationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} opacity={0.9} stroke="none" />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                background: "rgba(26, 26, 26, 0.95)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                fontSize: "14px",
                              }}
                              itemStyle={{ color: "#fff" }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Asset Legend */}
                    <div className="mt-5 space-y-2.5">
                      {allocationData.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="size-2.5 shrink-0 rounded-full"
                              style={{ background: asset.color } as CSSProperties}
                            />
                            <span className="text-sm text-white/70 font-medium">{asset.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-white/90 tabular-nums">{asset.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Fade Layer */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
                    style={{
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 30%, transparent 100%)"
                    } as CSSProperties}
                  />
                </div>

                {/* Floating Card 1 - Stop Loss (Right) */}
                <div
                  className="vip-float-layer pointer-events-none absolute -top-4 -right-4 z-20 hidden md:block md:w-52 md:-right-28 lg:-right-40"
                  style={{
                    animation: "8.4s ease-in-out -1.8s infinite normal none running vip-float",
                    willChange: "transform",
                    "--vip-float-x": "-4px",
                    "--vip-float-y": "-10px",
                  } as CSSProperties}
                >
                  <div
                    className="w-full rounded-lg bg-red-500/[0.05] ring-1 ring-red-400/[0.12] backdrop-blur-md p-3"
                    style={{
                      transform: "rotateX(3deg) rotateY(-5deg) skewY(-1deg) translateZ(20px)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
                    } as CSSProperties}
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <svg className="size-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M12 9v4m0 0v4m0-4h4m-4 0H8" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <span className="text-xs font-medium text-white/40">Stop Loss Active</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-semibold text-red-400">-5.2%</span>
                      <span className="text-xs text-white/30">trigger</span>
                    </div>
                    <div className="mt-2 text-xs text-white/25">BTC: -3.8% · ETH: -6.5%</div>
                  </div>
                </div>

                {/* Floating Card 2 - Win Rate (Left) */}
                <div
                  className="vip-float-layer pointer-events-none absolute top-20 z-20 hidden md:block md:w-52 md:-left-28 lg:-left-40"
                  style={{
                    animation: "9.2s ease-in-out -4.1s infinite normal none running vip-float",
                    willChange: "transform",
                    "--vip-float-x": "6px",
                    "--vip-float-y": "8px",
                  } as CSSProperties}
                >
                  <div
                    className="w-full rounded-lg bg-primary/[0.05] ring-1 ring-primary/[0.12] backdrop-blur-md p-3"
                    style={{
                      transform: "rotateX(2deg) rotateY(4deg) skewY(0.5deg) translateZ(15px)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
                    } as CSSProperties}
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <svg className="size-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="text-xs font-medium text-white/40">Win Rate</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-semibold text-primary">68.4%</span>
                      <span className="text-xs text-white/30">success</span>
                    </div>
                    <div className="mt-2 flex gap-2 text-xs">
                      <span className="text-white/25">32 wins</span>
                      <span className="text-white/15">·</span>
                      <span className="text-white/25">15 losses</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
              </div>
            </div>
          </div>

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
              </div>
            </div>

            {/* Bottom Fade Layer */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-72 z-10"
              style={{
                background: "linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 85%, transparent 15%) 25%, color-mix(in srgb, var(--background) 50%, transparent 50%) 50%, transparent 100%)"
              } as CSSProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VIPDashboard;
