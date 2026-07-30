import type { Achievement } from "@/lib/gamification";
import { Lock, Trophy } from "lucide-react";

const RARITY_STYLE: Record<Achievement["rarity"], string> = {
  common: "border-[var(--color-border)] text-[var(--color-text-muted)]",
  rare: "border-sky-500/40 text-sky-400",
  epic: "border-amber-500/45 text-amber-400",
  legendary: "border-[var(--color-primary)]/50 text-[var(--color-primary)]",
};

type AchievementGridProps = {
  achievements: Achievement[];
};

export function AchievementGrid({ achievements }: Readonly<AchievementGridProps>) {
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="hud-panel p-6 sm:p-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Badge Vault
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Achievements</h2>
          <p className="theme-muted mt-1 text-sm">
            Unlocked from real Play Store listing signals.
          </p>
        </div>
        <div className="font-hud rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm font-bold">
          {unlocked}
          <span className="theme-muted font-medium"> / {achievements.length}</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((badge, idx) => (
          <div
            key={badge.id}
            className={`achievement-tile fade-in rounded-xl border p-4 ${
              badge.unlocked ? "unlocked" : "locked"
            } ${RARITY_STYLE[badge.rarity]}`}
            style={{
              animationDelay: `${idx * 40}ms`,
              background: badge.unlocked
                ? "color-mix(in srgb, currentColor 8%, var(--color-surface-elevated))"
                : "var(--surface-softer)",
            }}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              {badge.unlocked ? <Trophy size={16} /> : <Lock size={16} />}
              <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.14em]">
                {badge.rarity}
              </span>
            </div>
            <p className="font-display text-sm font-bold tracking-tight text-[var(--color-heading)]">
              {badge.name}
            </p>
            <p className="theme-muted mt-1 text-xs leading-relaxed">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
