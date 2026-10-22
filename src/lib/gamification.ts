export type TierId =
  | "rookie"
  | "contender"
  | "pro"
  | "elite"
  | "legend"
  | "mythic";

export type PowerStat = {
  id: string;
  label: string;
  value: number;
  blurb: string;
};

export type GameProfile = {
  level: number;
  xpProgress: number;
  tier: TierId;
  tierLabel: string;
  title: string;
  className: string;
  playScore: number;
  powerStats: PowerStat[];
};

export const TIER_META: Record<
  TierId,
  { label: string; rank: number; color: string; glow: string }
> = {
  rookie: { label: "Rookie", rank: 1, color: "#94a3b8", glow: "rgba(148,163,184,0.35)" },
  contender: { label: "Contender", rank: 2, color: "#34d399", glow: "rgba(52,211,153,0.35)" },
  pro: { label: "Pro", rank: 3, color: "#38bdf8", glow: "rgba(56,189,248,0.4)" },
  elite: { label: "Elite", rank: 4, color: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
  legend: { label: "Legend", rank: 5, color: "#f97316", glow: "rgba(249,115,22,0.45)" },
  mythic: { label: "Mythic", rank: 6, color: "#a3e635", glow: "rgba(163,230,53,0.5)" },
};

type ScoreInput = {
  score: number;
  ratings: number;
  reviews: number;
  recentChanges: string;
  maxInstalls: number;
  updated: number;
  genre: string;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.round(Math.min(max, Math.max(min, n)));
}

function computePlayScore(input: ScoreInput): number {
  const ratingScore = ((input.score || 0) / 5) * 40;
  const engagementScore = Math.min(15, Math.log10(Math.max(1, input.ratings || 0)) * 3);
  const reviewRatio =
    input.reviews > 0 && input.ratings > 0
      ? Math.min(10, (input.reviews / input.ratings) * 100) * 0.3
      : 0;
  const updatesScore = input.recentChanges ? 15 : 0;
  const longevityScore = input.updated
    ? Math.max(0, 10 - Math.floor((Date.now() - input.updated) / (1000 * 60 * 60 * 24 * 30)) * 0.5)
    : 5;
  const installConfidence = Math.min(10, Math.log10(Math.max(1, input.maxInstalls)) * 0.8);

  return clamp(
    ratingScore + engagementScore + reviewRatio + updatesScore + longevityScore + installConfidence,
  );
}

function tierFromSignals(playScore: number, installs: number): TierId {
  if (installs >= 100_000_000 && playScore >= 75) return "mythic";
  if (installs >= 10_000_000 && playScore >= 70) return "legend";
  if (installs >= 1_000_000 && playScore >= 65) return "elite";
  if (installs >= 100_000 && playScore >= 55) return "pro";
  if (installs >= 10_000 && playScore >= 45) return "contender";
  return "rookie";
}

function levelFromSignals(playScore: number, installs: number): { level: number; xpProgress: number } {
  const installXp = Math.min(60, Math.log10(Math.max(1, installs)) * 8);
  const raw = playScore * 0.55 + installXp;
  const level = Math.max(1, Math.min(99, Math.floor(raw)));
  const xpProgress = clamp((raw - level) * 100);
  return { level, xpProgress };
}

function classFromGenre(genre: string): string {
  const g = (genre || "").toLowerCase();
  if (g.includes("game")) return "Arena Fighter";
  if (g.includes("social") || g.includes("dating")) return "Networker";
  if (g.includes("finance") || g.includes("business")) return "Vault Keeper";
  if (g.includes("health") || g.includes("fitness")) return "Vitality Runner";
  if (g.includes("education") || g.includes("book")) return "Scholar";
  if (g.includes("music") || g.includes("entertainment") || g.includes("video")) return "Stage Act";
  if (g.includes("photo") || g.includes("art")) return "Creator";
  if (g.includes("tool") || g.includes("productivity") || g.includes("utility")) return "Utility Ace";
  if (g.includes("travel") || g.includes("map")) return "Pathfinder";
  if (g.includes("shopping") || g.includes("food")) return "Market Raider";
  if (g.includes("news") || g.includes("communication")) return "Signal Scout";
  return "App Operative";
}

function titleFor(tier: TierId, className: string, score: number): string {
  const vibe =
    score >= 85 ? "Ascendant" : score >= 70 ? "Seasoned" : score >= 55 ? "Rising" : "Emerging";
  return `${vibe} ${TIER_META[tier].label} · ${className}`;
}

function powerStats(input: ScoreInput): PowerStat[] {
  const daysSinceUpdate = input.updated
    ? Math.floor((Date.now() - input.updated) / (1000 * 60 * 60 * 24))
    : 365;
  const freshness = daysSinceUpdate <= 7 ? 95 : daysSinceUpdate <= 30 ? 80 : daysSinceUpdate <= 90 ? 55 : daysSinceUpdate <= 180 ? 30 : 12;
  const reach = clamp(Math.log10(Math.max(1, input.maxInstalls)) * 12.5);
  const reputation = clamp(((input.score || 0) / 5) * 100);
  const voice = clamp(Math.log10(Math.max(1, input.reviews || 0)) * 16);
  const stickiness =
    input.ratings > 0 ? clamp((input.reviews / input.ratings) * 220) : 10;

  return [
    {
      id: "reach",
      label: "Reach",
      value: reach,
      blurb: "How far the install base has scaled on Play Store.",
    },
    {
      id: "reputation",
      label: "Reputation",
      value: reputation,
      blurb: "Star rating strength - the crowd’s verdict.",
    },
    {
      id: "voice",
      label: "Voice",
      value: voice,
      blurb: "Written review volume - how loud users talk.",
    },
    {
      id: "freshness",
      label: "Freshness",
      value: freshness,
      blurb: "How recently the app shipped an update.",
    },
    {
      id: "stickiness",
      label: "Stickiness",
      value: stickiness,
      blurb: "Share of raters who left a written review.",
    },
  ];
}

export function buildGameProfile(input: ScoreInput): GameProfile {
  const playScore = computePlayScore(input);
  const tier = tierFromSignals(playScore, input.maxInstalls || 0);
  const { level, xpProgress } = levelFromSignals(playScore, input.maxInstalls || 0);
  const className = classFromGenre(input.genre);
  const power = powerStats(input);

  return {
    level,
    xpProgress,
    tier,
    tierLabel: TIER_META[tier].label,
    title: titleFor(tier, className, playScore),
    className,
    playScore,
    powerStats: power,
  };
}

export function formatInstalls(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return n.toLocaleString();
}
