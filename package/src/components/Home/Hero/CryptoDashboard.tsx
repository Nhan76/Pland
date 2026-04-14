"use client";
import React from "react";
import { motion } from "framer-motion";
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

const allocationData = [
  { name: "BTC", value: 73.9, color: "#16c784" },
  { name: "BNB", value: 9.1, color: "#627eea" },
  { name: "ETH", value: 8.4, color: "#f3ba2f" },
  { name: "USDC", value: 4.1, color: "#2775ca" },
  { name: "USDT", value: 3.5, color: "#26a17b" },
];

const CryptoDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative z-20 w-full max-w-6xl mx-auto mt-4 md:mt-10 mb-16 px-4"
    >
      {/* Laser glow overlay from flow hitting top of dashboard */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-[#16c784]/20 blur-[80px] rounded-[100%] pointer-events-none mix-blend-screen" />
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[25%] h-16 bg-[#16c784]/40 blur-[40px] rounded-[100%] pointer-events-none mix-blend-screen" />

      {/* The Dashboard Container */}
      <div
        className="relative bg-[#11141A]/90 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-4 md:p-6 flex flex-col gap-6"
        style={{
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
        }}
      >
        {/* Laser Impact Core */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[10%] max-w-[120px] h-[3px] bg-[#fff] shadow-[0_0_30px_6px_#16c784] z-20 rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] max-w-[300px] h-[2px] bg-[#16c784] shadow-[0_0_15px_3px_#16c784] z-20 rounded-full" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#16c784] to-transparent opacity-50" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-bold text-white tracking-tight">Main Portfolio</h2>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-white/70 text-xs font-medium">Show charts</span>
              <div className="w-8 h-4 bg-[#16c784] rounded-full p-0.5 cursor-pointer flex items-center shadow-inner">
                <div className="w-3 h-3 bg-[#11141A] rounded-full translate-x-4 shadow-sm"></div>
              </div>
            </div>
            <button className="bg-[#16c784] hover:bg-[#12a96f] text-black font-semibold py-1.5 px-4 rounded-lg transition-colors text-xs flex items-center gap-1.5 shadow-lg shadow-[#16c784]/20">
              <span className="text-base leading-none">+</span> Create portfolio
            </button>
          </div>
        </div>

        {/* Total Value & Metrics Row */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Total Portfolio Value</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">$243,623.12</span>
              <span className="text-[#ea3943] font-medium text-xs flex items-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
                2.78%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Metric 1 */}
            <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5">
              <span className="text-white/60 text-[11px] font-medium mb-1">All-time Profit</span>
              <span className="text-[#ea3943] font-bold text-base leading-none">-$6,955.83</span>
              <div className="mt-auto pt-2">
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
              <span className="text-white font-bold text-base leading-none">$250,578.95</span>
            </div>
            {/* Metric 3 */}
            <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5 col-span-2 md:col-span-1">
              <span className="text-white/60 text-[11px] font-medium mb-2">24h Performance</span>
              <div className="flex flex-col gap-1.5 mt-auto">
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
            <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5">
              <span className="text-white/60 text-[11px] font-medium mb-1">Sharpe Ratio</span>
              <span className="text-[#16c784] font-bold text-base leading-none">4.19</span>
              <div className="mt-auto pt-2">
                <span className="bg-[#16c784]/20 text-[#16c784] text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">Excellent</span>
              </div>
            </div>
            {/* Metric 5 */}
            <div className="bg-[#1A1F26] rounded-xl p-3 flex flex-col justify-start border border-white/5 hidden md:flex">
              <span className="text-white/60 text-[11px] font-medium mb-1">Max Drawdown</span>
              <span className="text-[#ea3943] font-bold text-base leading-none">-15.76%</span>
              <div className="mt-auto pt-2">
                <span className="text-[#f3ba2f] text-[9px] flex items-center gap-1 font-medium">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Not recovered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid: Allocation & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          
          {/* Allocation Card */}
          <div className="bg-[#1A1F26] rounded-xl p-4 flex flex-col border border-white/5 lg:col-span-1">
            <div className="mb-3">
              <div className="text-white font-bold text-sm">Allocation</div>
            </div>
            
            <div className="h-[100px] w-full relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    innerRadius={35}
                    outerRadius={50}
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

            <div className="flex flex-col gap-1.5 flex-1 pr-1">
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
                <div className="text-white font-bold text-sm mb-0.5">Portfolio Performance</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-white leading-none">$243.6K</span>
                  <span className="text-[#16c784] text-[10px] font-bold bg-[#16c784]/10 px-1.5 py-0.5 rounded-md">+2.20% (+$5.2K)</span>
                </div>
              </div>
              <div className="flex bg-[#11141A] rounded-md p-1 border border-white/5">
                {["24H", "7D", "30D", "90D", "ALL"].map((span) => (
                  <button
                    key={span}
                    className={`text-[10px] px-2.5 py-1 rounded-md font-semibold transition-all ${
                      span === "1D" || span === "24H"
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {span}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full relative min-h-[160px] md:min-h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPerformanceData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cmcGradientPerf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16c784" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#16c784" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1F26",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                      padding: "8px"
                    }}
                    itemStyle={{ color: "#fff", fontWeight: "600", fontSize: "11px" }}
                    labelStyle={{ color: "rgba(255,255,255,0.5)", marginBottom: "2px", fontSize: "9px" }}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="rgba(255,255,255,0.05)"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={20}
                    dy={5}
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    orientation="right"
                    stroke="rgba(255,255,255,0.05)"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `$${val.toLocaleString()}`}
                    dx={5}
                    width={50}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#16c784"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#cmcGradientPerf)"
                    activeDot={{ r: 4, strokeWidth: 0, fill: "#16c784" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoDashboard;
