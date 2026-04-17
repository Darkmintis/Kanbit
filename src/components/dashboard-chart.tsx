"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = {
  day: string;
  downloads: number;
};

type DashboardChartProps = {
  points: Point[];
};

export function DashboardChart({ points }: DashboardChartProps) {
  const [timeframe, setTimeframe] = useState<7 | 30 | 90>(30);

  const displayPoints = points.slice(-timeframe);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white">Download Trend</h3>
          <p className="mt-1 text-sm text-neutral-400">Estimated daily downloads over {timeframe} days</p>
        </div>
        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10 w-fit">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeframe(days as 7 | 30 | 90)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                timeframe === days ? "bg-white/10 text-white shadow-sm" : "text-neutral-500 hover:text-white"
              }`}
            >
              {days}D
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px] w-full flex-1">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <LineChart data={displayPoints} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
            <XAxis 
              dataKey="day" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: '#737373', fontWeight: 500 }} 
              dy={10}
              minTickGap={20}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: '#737373', fontWeight: 500 }} 
              dx={-10}
              tickFormatter={(val) => {
                if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
                if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
                return val;
              }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', borderRadius: '12px', border: '1px solid #262626', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.5)', fontWeight: 600, padding: '12px' }}
              itemStyle={{ color: '#2dd4bf', fontWeight: 700 }}
              labelStyle={{ color: '#a3a3a3', fontWeight: 600, marginBottom: '4px' }}
            />
            <Line
              type="monotone"
              dataKey="downloads"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#0ea5e9', stroke: '#121212', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
