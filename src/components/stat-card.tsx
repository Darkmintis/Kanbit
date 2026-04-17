import { TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  subtext?: string;
};

export function StatCard({ label, value, change, trend, icon, subtext }: Readonly<StatCardProps>) {
  let changePillClass = "theme-surface-softer theme-muted theme-divider border";
  if (trend === "up") {
    changePillClass = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  } else if (trend === "down") {
    changePillClass = "bg-red-500/10 text-red-400 border border-red-500/20";
  }

  let trendIcon: React.ReactNode = null;
  if (trend === "up") {
    trendIcon = <TrendingUp size={12} strokeWidth={3} />;
  } else if (trend === "down") {
    trendIcon = <TrendingDown size={12} strokeWidth={3} />;
  }

  return (
    <div className="card theme-surface-soft group hover:border-teal-500/30 transition-all p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="theme-muted text-xs font-bold uppercase tracking-wide">{label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-extrabold tracking-tight">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${changePillClass}`}>
                {trendIcon}
                {Math.abs(change)}%
              </div>
            )}
          </div>
          {subtext && <p className="theme-muted mt-2 text-xs font-medium">{subtext}</p>}
        </div>
        {icon && (
          <div className="theme-divider theme-surface-softer shrink-0 rounded-xl border p-2.5 transition-colors group-hover:bg-white/10">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
