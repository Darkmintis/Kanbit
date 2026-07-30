type RatingBar = {
  star: number;
  pct: number;
};

type RatingDistributionProps = {
  distribution: RatingBar[];
  ratings: number;
};

const STAR_COLORS: Record<number, string> = {
  5: "linear-gradient(90deg, #a3e635, #65a30d)",
  4: "linear-gradient(90deg, #84cc16, #4d7c0f)",
  3: "linear-gradient(90deg, #fbbf24, #d97706)",
  2: "linear-gradient(90deg, #fb923c, #ea580c)",
  1: "linear-gradient(90deg, #f87171, #dc2626)",
};

export function RatingDistribution({ distribution, ratings }: Readonly<RatingDistributionProps>) {
  return (
    <div className="hud-panel flex h-full w-full flex-col p-6 sm:p-7">
      <div className="mb-6">
        <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
          Crowd Vote
        </p>
        <h3 className="mt-1 text-2xl font-bold tracking-tight">Star Breakdown</h3>
        <p className="theme-muted mt-1 text-sm">
          {ratings.toLocaleString()} public ratings on the listing
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3">
        {distribution.map(({ star, pct }, idx) => (
          <div key={star} className="flex items-center gap-3 fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
            <span className="font-hud w-5 shrink-0 text-right text-sm font-bold">{star}</span>
            <div className="xp-track h-3 flex-1">
              <div
                className="power-fill"
                style={{
                  width: `${pct}%`,
                  background: STAR_COLORS[star],
                  animationDelay: `${idx * 70}ms`,
                }}
              />
            </div>
            <span className="font-hud w-12 shrink-0 text-right text-sm font-bold tabular-nums">
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
