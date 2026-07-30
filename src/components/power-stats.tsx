"use client";

import { useEffect, useState } from "react";
import type { PowerStat } from "@/lib/gamification";

const FILL_COLORS: Record<string, string> = {
  reach: "linear-gradient(90deg, #38bdf8, #0ea5e9)",
  reputation: "linear-gradient(90deg, #fbbf24, #f59e0b)",
  voice: "linear-gradient(90deg, #fb7185, #e11d48)",
  freshness: "linear-gradient(90deg, #a3e635, #65a30d)",
  stickiness: "linear-gradient(90deg, #2dd4bf, #0d9488)",
};

type PowerStatsProps = {
  stats: PowerStat[];
};

export function PowerStats({ stats }: Readonly<PowerStatsProps>) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="hud-panel p-6 sm:p-7 h-full">
      <div className="mb-6">
        <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          Power Board
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight">Combat Stats</h2>
        <p className="theme-muted mt-1 text-sm">
          Five public signals turned into XP bars — not private Console data.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {stats.map((stat, idx) => (
          <div key={stat.id} className="fade-in" style={{ animationDelay: `${idx * 70}ms` }}>
            <div className="mb-1.5 flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wide">{stat.label}</p>
                <p className="theme-muted text-xs leading-snug">{stat.blurb}</p>
              </div>
              <span className="font-hud text-lg font-bold tabular-nums text-[var(--color-heading)]">
                {stat.value}
              </span>
            </div>
            <div className="xp-track">
              <div
                className="power-fill"
                style={{
                  width: ready ? `${stat.value}%` : "0%",
                  background: FILL_COLORS[stat.id] || FILL_COLORS.reach,
                  animationDelay: `${idx * 80}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
