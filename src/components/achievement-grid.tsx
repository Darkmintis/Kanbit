"use client";

import { useState } from "react";
import type { Achievement } from "@/lib/gamification";
import {
  Award,
  BadgeCheck,
  Coins,
  DoorOpen,
  Flame,
  Gem,
  Lock,
  Megaphone,
  ScrollText,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

type AchievementGridProps = {
  achievements: Achievement[];
};

type BadgeVisual = {
  Icon: LucideIcon;
  accent: string;
  glow: string;
  medal: string;
};

const BADGE_VISUALS: Record<string, BadgeVisual> = {
  editors: {
    Icon: BadgeCheck,
    accent: "#fde68a",
    glow: "rgba(250, 204, 21, 0.55)",
    medal: "linear-gradient(145deg, #fef08a 0%, #f59e0b 45%, #b45309 100%)",
  },
  five_star_aura: {
    Icon: Star,
    accent: "#fcd34d",
    glow: "rgba(251, 191, 36, 0.5)",
    medal: "linear-gradient(145deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)",
  },
  crowd_favorite: {
    Icon: Users,
    accent: "#7dd3fc",
    glow: "rgba(56, 189, 248, 0.5)",
    medal: "linear-gradient(145deg, #bae6fd 0%, #0ea5e9 50%, #0369a1 100%)",
  },
  viral_scale: {
    Icon: Flame,
    accent: "#fdba74",
    glow: "rgba(249, 115, 22, 0.55)",
    medal: "linear-gradient(145deg, #fed7aa 0%, #f97316 45%, #c2410c 100%)",
  },
  million_club: {
    Icon: Gem,
    accent: "#c4b5fd",
    glow: "rgba(167, 139, 250, 0.5)",
    medal: "linear-gradient(145deg, #ddd6fe 0%, #8b5cf6 50%, #6d28d9 100%)",
  },
  active_forge: {
    Icon: Flame,
    accent: "#fb7185",
    glow: "rgba(244, 63, 94, 0.45)",
    medal: "linear-gradient(145deg, #fecdd3 0%, #f43f5e 50%, #be123c 100%)",
  },
  changelog: {
    Icon: ScrollText,
    accent: "#86efac",
    glow: "rgba(74, 222, 128, 0.45)",
    medal: "linear-gradient(145deg, #bbf7d0 0%, #22c55e 50%, #15803d 100%)",
  },
  free_wave: {
    Icon: DoorOpen,
    accent: "#5eead4",
    glow: "rgba(45, 212, 191, 0.45)",
    medal: "linear-gradient(145deg, #99f6e4 0%, #14b8a6 50%, #0f766e 100%)",
  },
  premium_gate: {
    Icon: Award,
    accent: "#f9a8d4",
    glow: "rgba(236, 72, 153, 0.45)",
    medal: "linear-gradient(145deg, #fbcfe8 0%, #ec4899 50%, #be185d 100%)",
  },
  coin_shop: {
    Icon: Coins,
    accent: "#fde047",
    glow: "rgba(234, 179, 8, 0.5)",
    medal: "linear-gradient(145deg, #fef08a 0%, #eab308 50%, #a16207 100%)",
  },
  ad_arena: {
    Icon: Megaphone,
    accent: "#fdba74",
    glow: "rgba(251, 146, 60, 0.45)",
    medal: "linear-gradient(145deg, #fed7aa 0%, #fb923c 50%, #c2410c 100%)",
  },
  veteran: {
    Icon: Shield,
    accent: "#93c5fd",
    glow: "rgba(59, 130, 246, 0.5)",
    medal: "linear-gradient(145deg, #bfdbfe 0%, #3b82f6 50%, #1d4ed8 100%)",
  },
  score_ace: {
    Icon: Target,
    accent: "#bef264",
    glow: "rgba(163, 230, 53, 0.55)",
    medal: "linear-gradient(145deg, #d9f99d 0%, #84cc16 45%, #4d7c0f 100%)",
  },
};

const FALLBACK_VISUAL: BadgeVisual = {
  Icon: Sparkles,
  accent: "#a3e635",
  glow: "rgba(163, 230, 53, 0.4)",
  medal: "linear-gradient(145deg, #d9f99d 0%, #65a30d 100%)",
};

const RARITY_META: Record<
  Achievement["rarity"],
  { label: string; color: string; ring: string }
> = {
  common: {
    label: "Common",
    color: "#94a3b8",
    ring: "rgba(148, 163, 184, 0.55)",
  },
  rare: {
    label: "Rare",
    color: "#38bdf8",
    ring: "rgba(56, 189, 248, 0.65)",
  },
  epic: {
    label: "Epic",
    color: "#c084fc",
    ring: "rgba(192, 132, 252, 0.7)",
  },
  legendary: {
    label: "Legendary",
    color: "#fbbf24",
    ring: "rgba(251, 191, 36, 0.75)",
  },
};

export function AchievementGrid({ achievements }: Readonly<AchievementGridProps>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const unlocked = achievements.filter((a) => a.unlocked);
  const unlockedXp = unlocked.reduce((sum, a) => sum + a.xpReward, 0);
  const selected = achievements.find((a) => a.id === selectedId) ?? null;

  return (
    <div className="hud-panel p-6 sm:p-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Badge Vault
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Achievements</h2>
          <p className="theme-muted mt-1 text-sm">
            Tap a badge to inspect it. Colors mark rarity - unlocks come from public Play signals.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-hud rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm font-bold">
            {unlocked.length}
            <span className="theme-muted font-medium"> / {achievements.length}</span>
          </div>
          <div className="font-hud rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-3 py-1.5 text-sm font-bold text-[var(--color-accent)]">
            +{unlockedXp} XP
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((badge, idx) => {
          const visual = BADGE_VISUALS[badge.id] ?? FALLBACK_VISUAL;
          const rarity = RARITY_META[badge.rarity];
          const Icon = visual.Icon;
          const isSelected = selectedId === badge.id;

          return (
            <button
              key={badge.id}
              type="button"
              onClick={() => setSelectedId(isSelected ? null : badge.id)}
              className={`achievement-tile fade-in text-left ${
                badge.unlocked ? "unlocked" : "locked"
              } ${isSelected ? "is-selected" : ""}`}
              style={{
                animationDelay: `${idx * 40}ms`,
                ["--badge-glow" as string]: badge.unlocked ? visual.glow : "transparent",
                ["--badge-ring" as string]: rarity.ring,
                ["--badge-accent" as string]: visual.accent,
              }}
              aria-pressed={isSelected}
              aria-label={`${badge.name}, ${rarity.label}${badge.unlocked ? ", unlocked" : ", locked"}`}
            >
              <div className="achievement-tile-shine" aria-hidden />

              <div className="flex items-start gap-3">
                <div
                  className="achievement-medal"
                  style={{
                    background: badge.unlocked
                      ? visual.medal
                      : "linear-gradient(145deg, #64748b 0%, #334155 100%)",
                    boxShadow: badge.unlocked
                      ? `0 0 0 2px ${rarity.ring}, 0 8px 20px ${visual.glow}`
                      : "0 0 0 2px rgba(100,116,139,0.35)",
                  }}
                >
                  {badge.unlocked ? (
                    <Icon size={22} strokeWidth={2.4} className="text-[#0b1220] drop-shadow-sm" />
                  ) : (
                    <Lock size={18} className="text-slate-200/80" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                    <span
                      className="font-display rounded border px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.12em]"
                      style={{
                        color: rarity.color,
                        borderColor: rarity.ring,
                        background: `color-mix(in srgb, ${rarity.color} 14%, transparent)`,
                      }}
                    >
                      {rarity.label}
                    </span>
                    {badge.unlocked ? (
                      <span className="font-hud text-[0.7rem] font-bold text-[var(--color-accent)]">
                        +{badge.xpReward} XP
                      </span>
                    ) : (
                      <span className="font-display text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                        Locked
                      </span>
                    )}
                  </div>
                  <p className="font-display text-sm font-bold tracking-tight text-[var(--color-heading)]">
                    {badge.name}
                  </p>
                  <p className="theme-muted mt-1 text-xs leading-relaxed">{badge.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          className="achievement-inspect fade-in mt-5"
          style={{
            ["--inspect-glow" as string]: (BADGE_VISUALS[selected.id] ?? FALLBACK_VISUAL).glow,
            borderColor: RARITY_META[selected.rarity].ring,
          }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Sparkles size={16} style={{ color: RARITY_META[selected.rarity].color }} />
            <p className="font-display text-sm font-bold text-[var(--color-heading)]">
              Inspecting · {selected.name}
            </p>
            <span
              className="font-display rounded border px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.12em]"
              style={{
                color: RARITY_META[selected.rarity].color,
                borderColor: RARITY_META[selected.rarity].ring,
              }}
            >
              {RARITY_META[selected.rarity].label}
            </span>
          </div>
          <p className="theme-muted mt-2 text-sm leading-relaxed">
            {selected.unlocked
              ? `Unlocked - this badge is in the vault and worth +${selected.xpReward} XP toward the scout profile.`
              : `Still locked - hit the requirement on the Play listing to claim +${selected.xpReward} XP.`}
          </p>
        </div>
      )}
    </div>
  );
}
