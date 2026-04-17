import { TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  subtext?: string;
};

export function StatCard({ label, value, change, trend, icon, subtext }: StatCardProps) {
  return (
    <div className="card group hover:border-teal-500/30 transition-all p-5 sm:p-6 bg-white/[0.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-neutral-400">{label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-extrabold tracking-tight text-white">{value}</p>
            {change !== undefined && (
              <div
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                  trend === "up"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : trend === "down"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-white/5 text-neutral-300 border border-white/10"
                }`}
              >
                {trend === "up" ? (
                  <TrendingUp size={12} strokeWidth={3} />
                ) : trend === "down" ? (
                  <TrendingDown size={12} strokeWidth={3} />
                ) : null}
                {Math.abs(change)}%
              </div>
            )}
          </div>
          {subtext && <p className="mt-2 text-xs font-medium text-neutral-500">{subtext}</p>}
        </div>
        {icon && (
          <div className="flex-shrink-0 rounded-xl border border-white/10 bg-white/5 p-2.5 transition-colors group-hover:bg-white/10">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
