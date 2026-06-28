"use client";

type RatingBar = {
  star: number;
  pct: number;
};

type RatingDistributionProps = {
  distribution: RatingBar[];
  ratings: number;
};

const STAR_COLORS: Record<number, string> = {
  5: "bg-emerald-500",
  4: "bg-green-500",
  3: "bg-amber-500",
  2: "bg-orange-500",
  1: "bg-red-500",
};

export function RatingDistribution({ distribution, ratings }: Readonly<RatingDistributionProps>) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight">Rating Distribution</h3>
        <p className="theme-muted mt-1 text-sm">Breakdown of {ratings.toLocaleString()} total ratings</p>
      </div>

      <div className="flex-1 flex flex-col gap-3 justify-center">
        {distribution.map(({ star, pct }) => (
          <div key={star} className="flex items-center gap-3">
            <span className="text-sm font-bold w-6 text-right shrink-0">{star}</span>
            <div className="flex-1 h-6 rounded-lg overflow-hidden theme-surface-softer">
              <div
                className={`h-full rounded-lg transition-all duration-700 ease-out ${STAR_COLORS[star]}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm font-semibold w-14 text-right shrink-0 tabular-nums">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
