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

export type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
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
  achievements: Achievement[];
  scoutingNotes: string[];
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
  free: boolean;
  maxInstalls: number;
  updated: number;
  editorsChoice: boolean;
  adSupported: boolean;
  offersIAP: boolean;
  genre: string;
  released: string;
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
      blurb: "Star rating strength — the crowd’s verdict.",
    },
    {
      id: "voice",
      label: "Voice",
      value: voice,
      blurb: "Written review volume — how loud users talk.",
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

function achievements(input: ScoreInput, playScore: number): Achievement[] {
  const daysSinceUpdate = input.updated
    ? Math.floor((Date.now() - input.updated) / (1000 * 60 * 60 * 24))
    : 999;
  const daysSinceRelease = input.released
    ? Math.floor((Date.now() - new Date(input.released).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return [
    {
      id: "editors",
      name: "Editor’s Pick",
      description: "Marked as Editor’s Choice on Google Play.",
      unlocked: input.editorsChoice,
      rarity: "legendary",
    },
    {
      id: "five_star_aura",
      name: "Five-Star Aura",
      description: "Average rating of 4.5 or higher.",
      unlocked: (input.score || 0) >= 4.5,
      rarity: "epic",
    },
    {
      id: "crowd_favorite",
      name: "Crowd Favorite",
      description: "Over 100K ratings collected.",
      unlocked: (input.ratings || 0) >= 100_000,
      rarity: "rare",
    },
    {
      id: "viral_scale",
      name: "Viral Scale",
      description: "Crossed 10M+ estimated installs.",
      unlocked: (input.maxInstalls || 0) >= 10_000_000,
      rarity: "legendary",
    },
    {
      id: "million_club",
      name: "Million Club",
      description: "Hit 1M+ estimated installs.",
      unlocked: (input.maxInstalls || 0) >= 1_000_000,
      rarity: "epic",
    },
    {
      id: "active_forge",
      name: "Active Forge",
      description: "Updated within the last 30 days.",
      unlocked: daysSinceUpdate <= 30,
      rarity: "rare",
    },
    {
      id: "changelog",
      name: "Patch Notes Live",
      description: "Public changelog available on the listing.",
      unlocked: Boolean(input.recentChanges?.trim()),
      rarity: "common",
    },
    {
      id: "free_wave",
      name: "Open Gate",
      description: "Free to download — maximum reach stance.",
      unlocked: input.free,
      rarity: "common",
    },
    {
      id: "premium_gate",
      name: "Premium Gate",
      description: "Paid download model on Play Store.",
      unlocked: !input.free,
      rarity: "rare",
    },
    {
      id: "coin_shop",
      name: "Coin Shop",
      description: "Offers in-app purchases.",
      unlocked: input.offersIAP,
      rarity: "common",
    },
    {
      id: "ad_arena",
      name: "Ad Arena",
      description: "Listing shows ad support.",
      unlocked: input.adSupported,
      rarity: "common",
    },
    {
      id: "veteran",
      name: "Veteran Build",
      description: "On the store for 3+ years.",
      unlocked: daysSinceRelease >= 365 * 3,
      rarity: "epic",
    },
    {
      id: "score_ace",
      name: "Score Ace",
      description: "Play Score of 80 or higher.",
      unlocked: playScore >= 80,
      rarity: "epic",
    },
  ];
}

function scoutingNotes(input: ScoreInput, profile: Omit<GameProfile, "scoutingNotes">): string[] {
  const notes: string[] = [];
  const tier = TIER_META[profile.tier];

  notes.push(
    `Scouted as ${tier.label} Lv.${profile.level} — ${profile.title}.`,
  );

  if ((input.score || 0) >= 4.5) {
    notes.push("Reputation is elite: users are handing out top marks.");
  } else if ((input.score || 0) >= 4.0) {
    notes.push("Solid reputation board — room to push into five-star territory.");
  } else if ((input.score || 0) >= 3.5) {
    notes.push("Mid-pack reputation. Quality or UX wins would move the needle.");
  } else {
    notes.push("Reputation is under pressure — ratings are dragging the power curve.");
  }

  if ((input.maxInstalls || 0) >= 10_000_000) {
    notes.push("Reach is massive. This listing already plays in the big leagues.");
  } else if ((input.maxInstalls || 0) >= 1_000_000) {
    notes.push("Strong install base — past the hardest growth wall for most apps.");
  } else if ((input.maxInstalls || 0) >= 100_000) {
    notes.push("Healthy traction. Next boss fight: the million-install gate.");
  } else {
    notes.push("Still early on the reach ladder — discovery and retention are the quest.");
  }

  const daysSinceUpdate = input.updated
    ? Math.floor((Date.now() - input.updated) / (1000 * 60 * 60 * 24))
    : 999;
  if (daysSinceUpdate <= 30) {
    notes.push("Freshness buff is active — recent patches keep the listing warm.");
  } else if (daysSinceUpdate <= 90) {
    notes.push("Updates are cooling off. A patch drop would restore Freshness XP.");
  } else {
    notes.push("Stale forge detected — long gap since the last public update.");
  }

  const unlocked = profile.achievements.filter((a) => a.unlocked).length;
  notes.push(
    `${unlocked}/${profile.achievements.length} badges unlocked from public Play signals.`,
  );

  return notes;
}

export function buildGameProfile(input: ScoreInput): GameProfile {
  const playScore = computePlayScore(input);
  const tier = tierFromSignals(playScore, input.maxInstalls || 0);
  const { level, xpProgress } = levelFromSignals(playScore, input.maxInstalls || 0);
  const className = classFromGenre(input.genre);
  const power = powerStats(input);
  const badges = achievements(input, playScore);

  const base = {
    level,
    xpProgress,
    tier,
    tierLabel: TIER_META[tier].label,
    title: titleFor(tier, className, playScore),
    className,
    playScore,
    powerStats: power,
    achievements: badges,
  };

  return {
    ...base,
    scoutingNotes: scoutingNotes(input, base),
  };
}

export function formatInstalls(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return n.toLocaleString();
}
