import gplay from "google-play-scraper";
import axios from "axios";

export type AppSearchResult = {
  title: string;
  appId: string;
  icon: string;
  developer: string;
  scoreText: string;
};

export type RatingHistogram = {
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
};

export type DashboardData = {
  appName: string;
  packageName: string;
  icon: string;
  developer: string;
  developerEmail: string;
  developerWebsite: string;
  developerAddress: string;
  totalDownloads: number;
  installs: string;
  score: number;
  ratings: number;
  reviews: number;
  priceText: string;
  genre: string;
  recentChanges: string;
  version: string;
  released: string;
  updatedTimeAgo: string;
  contentRating: string;
  editorsChoice: boolean;
  adSupported: boolean;
  offersIAP: boolean;
  histogram: RatingHistogram;
  ratingDistribution: { star: number; pct: number }[];
  estimatedDailyDownloads: number;
  reviewEngagementRate: number;
  points: Array<{ day: string; downloads: number }>;
  insights: string[];
  riskScore: number;
};

function extractAppIds(html: string): string[] {
  const seen = new Set<string>();
  const regex = /href="\/store\/apps\/details\?id=([a-zA-Z0-9._-]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    seen.add(match[1]);
  }
  return Array.from(seen).slice(0, 5);
}

export async function searchApps(query: string): Promise<AppSearchResult[]> {
  if (!query || query.length < 2) return [];

  // Strategy 1: scrape Play Store search results
  try {
    const url = `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps&hl=en&gl=us`;
    const resp = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const appIds = extractAppIds(resp.data);
    if (appIds.length === 0) throw new Error("No app IDs found");

    const details = await Promise.allSettled(
      appIds.map(id => gplay.app({ appId: id }))
    );

    const results: AppSearchResult[] = [];
    for (const result of details) {
      if (result.status === "fulfilled") {
        const app = result.value;
        results.push({
          title: app.title,
          appId: app.appId,
          icon: app.icon,
          developer: app.developer,
          scoreText: app.scoreText,
        });
      }
    }
    if (results.length > 0) return results;
  } catch (error) {
    console.error("HTML search failed:", error);
  }

  // Strategy 2: treat query as a direct package name
  try {
    const directApp = await gplay.app({ appId: query });
    return [{
      title: directApp.title,
      appId: directApp.appId,
      icon: directApp.icon,
      developer: directApp.developer,
      scoreText: directApp.scoreText,
    }];
  } catch {
    return [];
  }
}

function generateRealisticTrend(baseInstalls: number): Array<{ day: string; downloads: number }> {
  const length = 90;
  const baseDaily = Math.max(10, Math.round(baseInstalls / 90));
  const trends = Array.from({ length }).map((_, i) => {
    const dayOfWeek = i % 7;
    const weekendMultiplier = dayOfWeek === 5 || dayOfWeek === 6 ? 1.08 : 0.96;
    const growthFactor = 1 + Math.sin((i / length) * Math.PI * 0.5) * 0.08;
    const noise = ((Math.sin(i * 1.7) * 0.5 + Math.cos(i * 0.3) * 0.5) * 0.06);
    const downloads = Math.round(baseDaily * weekendMultiplier * (1 + noise) * growthFactor);
    return {
      day: new Date(Date.now() - (length - i - 1) * 24 * 60 * 60 * 1000)
        .toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      downloads: Math.max(downloads, 0),
    };
  });

  return trends;
}

function cleanHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function getTimeAgo(timestamp: number) {
  if (!timestamp) return "Unknown";
  const days = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return `1 month ago`;
  return `${months} months ago`;
}

function calculatePlayScore(appInfo: {
  score: number;
  ratings: number;
  reviews: number;
  recentChanges: string;
  free: boolean;
  maxInstalls: number;
  updated: number;
}): { playScore: number; riskScore: number; insights: string[] } {
  const ratingScore = ((appInfo.score || 0) / 5) * 40;
  const engagementScore = Math.min(15, Math.log10(Math.max(1, appInfo.ratings || 0)) * 3);
  const reviewRatio = appInfo.reviews > 0 && appInfo.ratings > 0
    ? Math.min(10, (appInfo.reviews / appInfo.ratings) * 100) * 0.3
    : 0;
  const updatesScore = appInfo.recentChanges ? 15 : 0;
  const longevityScore = appInfo.updated
    ? Math.max(0, 10 - Math.floor((Date.now() - appInfo.updated) / (1000 * 60 * 60 * 24 * 30)) * 0.5)
    : 5;
  const installConfidence = Math.min(10, Math.log10(Math.max(1, appInfo.maxInstalls)) * 0.8);

  const playScore = Math.round(Math.min(100, ratingScore + engagementScore + reviewRatio + updatesScore + longevityScore + installConfidence));
  const riskScore = 100 - playScore;

  const insights: string[] = [];

  if (appInfo.recentChanges) {
    const cleaned = cleanHtml(appInfo.recentChanges);
    const lines = cleaned.split("\n").filter(Boolean);
    const preview = lines.length === 1 ? cleaned.slice(0, 120) : `${lines[0]}${lines.length > 1 ? ` (+${lines.length - 1} more changes)` : ""}`;
    insights.push(`Active development — ${preview}${cleaned.length > 120 && lines.length === 1 ? "..." : ""}`);
  } else {
    insights.push("No recent changelogs found. Development activity may be low.");
  }

  if ((appInfo.score || 0) >= 4.5) {
    insights.push("Exceptional user sentiment with consistently high ratings across the board.");
  } else if ((appInfo.score || 0) >= 4.0) {
    insights.push("Positive user ratings indicate a solid, well-received app experience.");
  } else if ((appInfo.score || 0) >= 3.5) {
    insights.push("Average ratings suggest room for improvement in user experience or performance.");
  } else {
    insights.push("Below-average ratings indicate potential quality or satisfaction concerns.");
  }

  const totalRatings = appInfo.ratings || 0;
  if (totalRatings > 1000000) {
    insights.push("Massive review volume signals strong market presence and established user trust.");
  } else if (totalRatings > 100000) {
    insights.push("Strong review volume demonstrates meaningful market traction and user engagement.");
  } else if (totalRatings > 10000) {
    insights.push("Moderate review count — the app has a growing but still developing user base.");
  } else {
    insights.push("Limited review volume suggests early-stage market presence or niche audience.");
  }

  if (appInfo.free) {
    insights.push("Free-to-download model maximizes potential reach and adoption rate.");
  } else {
    insights.push("Paid model may limit install volume but signals premium positioning.");
  }

  return { playScore, riskScore: Math.round(riskScore), insights };
}

export async function getDashboardData(appId: string): Promise<DashboardData | null> {
  try {
    const appInfo = await gplay.app({ appId });
    const points = generateRealisticTrend(appInfo.maxInstalls || 100000);

    const { riskScore, insights } = calculatePlayScore({
      score: appInfo.score,
      ratings: appInfo.ratings,
      reviews: appInfo.reviews,
      recentChanges: appInfo.recentChanges,
      free: appInfo.free,
      maxInstalls: appInfo.maxInstalls,
      updated: appInfo.updated,
    });

    const histogram: RatingHistogram = {
      star1: appInfo.histogram?.[1] || 0,
      star2: appInfo.histogram?.[2] || 0,
      star3: appInfo.histogram?.[3] || 0,
      star4: appInfo.histogram?.[4] || 0,
      star5: appInfo.histogram?.[5] || 0,
    };

    const totalRatings = histogram.star1 + histogram.star2 + histogram.star3 + histogram.star4 + histogram.star5;
    const ratingDistribution = totalRatings > 0
      ? [5, 4, 3, 2, 1].map((star) => {
          const count = histogram[`star${star}` as keyof RatingHistogram];
          return { star, pct: Math.round((count / totalRatings) * 100) };
        })
      : [];

    const daysSinceRelease = appInfo.released
      ? Math.max(1, Math.floor((Date.now() - new Date(appInfo.released).getTime()) / (1000 * 60 * 60 * 24)))
      : 1;
    const estimatedDailyDownloads = Math.round((appInfo.maxInstalls || 0) / daysSinceRelease);

    const reviewEngagementRate = appInfo.ratings > 0
      ? Math.round((appInfo.reviews / appInfo.ratings) * 100)
      : 0;

    return {
      appName: appInfo.title,
      packageName: appInfo.appId,
      icon: appInfo.icon,
      developer: appInfo.developer,
      developerEmail: appInfo.developerEmail || "",
      developerWebsite: appInfo.developerWebsite || "",
      developerAddress: appInfo.developerAddress || "",
      totalDownloads: appInfo.maxInstalls || 0,
      installs: appInfo.installs || "0",
      score: appInfo.score || 0,
      ratings: appInfo.ratings || 0,
      reviews: appInfo.reviews || 0,
      priceText: appInfo.priceText || (appInfo.free ? "Free" : "Paid"),
      genre: appInfo.genre || "Unknown",
      recentChanges: appInfo.recentChanges || "",
      version: appInfo.version || "Varies with device",
      released: appInfo.released || "Unknown",
      updatedTimeAgo: getTimeAgo(appInfo.updated),
      contentRating: appInfo.contentRating || "Unknown",
      editorsChoice: !!(appInfo as unknown as Record<string, unknown>).editorsChoice,
      adSupported: !!appInfo.adSupported,
      offersIAP: !!appInfo.offersIAP,
      histogram,
      ratingDistribution,
      estimatedDailyDownloads,
      reviewEngagementRate,
      points,
      insights,
      riskScore,
    };
  } catch (error) {
    console.error("Dashboard error:", error);
    return null;
  }
}
