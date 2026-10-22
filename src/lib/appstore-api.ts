import gplay from "google-play-scraper";
import axios from "axios";
import { buildGameProfile, type GameProfile } from "@/lib/gamification";

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
  free: boolean;
  editorsChoice: boolean;
  adSupported: boolean;
  offersIAP: boolean;
  histogram: RatingHistogram;
  ratingDistribution: { star: number; pct: number }[];
  estimatedDailyDownloads: number;
  reviewEngagementRate: number;
  riskScore: number;
  game: GameProfile;
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

  try {
    const url = `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps&hl=en&gl=us`;
    const resp = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const appIds = extractAppIds(resp.data);
    if (appIds.length === 0) throw new Error("No app IDs found");

    const details = await Promise.allSettled(appIds.map((id) => gplay.app({ appId: id })));

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

  try {
    const directApp = await gplay.app({ appId: query });
    return [
      {
        title: directApp.title,
        appId: directApp.appId,
        icon: directApp.icon,
        developer: directApp.developer,
        scoreText: directApp.scoreText,
      },
    ];
  } catch {
    return [];
  }
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

export async function getDashboardData(appId: string): Promise<DashboardData | null> {
  try {
    const appInfo = await gplay.app({ appId });
    const editorsChoice = !!(appInfo as unknown as Record<string, unknown>).editorsChoice;

    const game = buildGameProfile({
      score: appInfo.score,
      ratings: appInfo.ratings,
      reviews: appInfo.reviews,
      recentChanges: appInfo.recentChanges,
      maxInstalls: appInfo.maxInstalls,
      updated: appInfo.updated,
      genre: appInfo.genre || "Unknown",
    });

    const histogram: RatingHistogram = {
      star1: appInfo.histogram?.[1] || 0,
      star2: appInfo.histogram?.[2] || 0,
      star3: appInfo.histogram?.[3] || 0,
      star4: appInfo.histogram?.[4] || 0,
      star5: appInfo.histogram?.[5] || 0,
    };

    const totalRatings =
      histogram.star1 + histogram.star2 + histogram.star3 + histogram.star4 + histogram.star5;
    const ratingDistribution =
      totalRatings > 0
        ? [5, 4, 3, 2, 1].map((star) => {
            const count = histogram[`star${star}` as keyof RatingHistogram];
            return { star, pct: Math.round((count / totalRatings) * 100) };
          })
        : [];

    const daysSinceRelease = appInfo.released
      ? Math.max(
          1,
          Math.floor(
            (Date.now() - new Date(appInfo.released).getTime()) / (1000 * 60 * 60 * 24),
          ),
        )
      : 1;
    const estimatedDailyDownloads = Math.round((appInfo.maxInstalls || 0) / daysSinceRelease);

    const reviewEngagementRate =
      appInfo.ratings > 0 ? Math.round((appInfo.reviews / appInfo.ratings) * 100) : 0;

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
      free: !!appInfo.free,
      editorsChoice,
      adSupported: !!appInfo.adSupported,
      offersIAP: !!appInfo.offersIAP,
      histogram,
      ratingDistribution,
      estimatedDailyDownloads,
      reviewEngagementRate,
      riskScore: 100 - game.playScore,
      game,
    };
  } catch (error) {
    console.error("Dashboard error:", error);
    return null;
  }
}
