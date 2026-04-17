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

export function DashboardChart({ points }: Readonly<DashboardChartProps>) {
  const [timeframe, setTimeframe] = useState<7 | 30 | 90>(30);

  const displayPoints = points.slice(-timeframe);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Download Trend</h3>
          <p className="theme-muted mt-1 text-sm">Estimated daily downloads over {timeframe} days</p>
        </div>
        <div className="chart-toggle flex rounded-lg p-1 border w-fit">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeframe(days as 7 | 30 | 90)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                timeframe === days ? "chart-toggle-btn-active shadow-sm" : "chart-toggle-btn"
              }`}
            >
              {days}D
            </button>
          ))}
        </div>
      </div>
      <div className="h-75 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <LineChart data={displayPoints} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid className="chart-grid" strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="day" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'var(--color-text-muted)', fontWeight: 500 }} 
              dy={10}
              minTickGap={20}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'var(--color-text-muted)', fontWeight: 500 }} 
              dx={-10}
              tickFormatter={(val) => {
                if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
                if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
                return val;
              }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--glass-dropdown-bg)', borderRadius: '12px', border: '1px solid var(--glass-dropdown-border)', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.35)', fontWeight: 600, padding: '12px' }}
              itemStyle={{ color: '#2dd4bf', fontWeight: 700 }}
              labelStyle={{ color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '4px' }}
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
