export type DownloadPoint = {
  day: string;
  downloads: number;
};

export type DashboardData = {
  appName: string;
  packageName: string;
  totalDownloads: number;
  growthPercentage: number;
  avgDailyDownloads: number;
  points: DownloadPoint[];
  insights: string[];
};

function titleCase(value: string) {
  return value
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function checksum(input: string) {
  return Array.from(input).reduce((sum, char, idx) => sum + char.charCodeAt(0) * (idx + 1), 0);
}

export function getEstimatedDashboardData(query: string): DashboardData {
  const normalized = query.trim() || "com.example.app";
  const packageName = normalized.includes(".") ? normalized : `com.${normalized.toLowerCase().replace(/\s+/g, "")}.app`;
  const appName = titleCase(normalized.includes(".") ? normalized.split(".").at(-1) ?? "app" : normalized);

  const seed = checksum(packageName);
  const base = 1800 + (seed % 2400);

  const points: DownloadPoint[] = Array.from({ length: 14 }).map((_, index) => {
    const wave = Math.sin((index + 1) * 0.65) * 220;
    const trend = index * (28 + (seed % 11));
    const noise = ((seed + index * 97) % 180) - 90;
    const downloads = Math.max(300, Math.round(base + wave + trend + noise));

    return {
      day: `Day ${index + 1}`,
      downloads,
    };
  });

  const totalDownloads = points.reduce((acc, point) => acc + point.downloads, 0);
  const firstHalf = points.slice(0, 7).reduce((acc, point) => acc + point.downloads, 0);
  const secondHalf = points.slice(7).reduce((acc, point) => acc + point.downloads, 0);
  const growthPercentage = Number((((secondHalf - firstHalf) / Math.max(firstHalf, 1)) * 100).toFixed(1));
  const avgDailyDownloads = Math.round(totalDownloads / points.length);

  const peak = points.reduce((top, current) => (current.downloads > top.downloads ? current : top), points[0]);
  const insights = [
    `Growth spike detected around ${peak.day} with approximately ${peak.downloads.toLocaleString()} downloads.`,
    `Current trend indicates ${growthPercentage >= 0 ? "positive" : "negative"} momentum over the last two weeks.`,
    `Average daily volume is estimated near ${avgDailyDownloads.toLocaleString()} downloads.`,
  ];

  return {
    appName,
    packageName,
    totalDownloads,
    growthPercentage,
    avgDailyDownloads,
    points,
    insights,
  };
}
