"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Crosshair, MessageSquare, CalendarDays, Star, Users } from "lucide-react";
import { AppProfileHero } from "@/components/app-profile-hero";
import { PowerStats } from "@/components/power-stats";
import { AchievementGrid } from "@/components/achievement-grid";
import { RatingDistribution } from "@/components/rating-distribution";
import { LoadingSpinner } from "@/components/loading";
import { ErrorAlert } from "@/components/error-states";
import { formatInstalls } from "@/lib/gamification";
import { API_BASE } from "@/lib/api";
import type { DashboardData } from "@/lib/appstore-api";

function MetricTile({
  label,
  value,
  subtext,
  icon,
  delay,
}: Readonly<{
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  delay: number;
}>) {
  return (
    <div
      className="hud-panel fade-in p-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          {label}
        </p>
        <div className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-primary)]">
          {icon}
        </div>
      </div>
      <p className="font-hud text-3xl font-bold tracking-tight">{value}</p>
      <p className="theme-muted mt-1.5 text-xs">{subtext}</p>
    </div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const appId = searchParams.get("appId") || "";
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!appId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE}/apps?appId=${encodeURIComponent(appId)}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appId]);

  if (!appId) {
    return (
      <div className="page-shell container-shell flex min-h-screen items-center justify-center py-24">
        <div className="hud-panel w-full max-w-lg p-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-primary)]">
            <Crosshair className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">No Target Locked</h1>
          <p className="theme-muted mb-8 mt-2">
            Search an app from the lobby to open its scout profile.
          </p>
          <Link href="/" className="shiny-button inline-flex rounded-xl px-8 py-3">
            Back to Lobby
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-shell container-shell min-h-screen py-16">
        <div className="hud-panel mb-8 h-52 loading-pulse" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="hud-panel h-28 loading-pulse" />
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="hud-panel h-80 loading-pulse" />
          <div className="hud-panel h-80 loading-pulse" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="page-shell container-shell flex min-h-screen flex-col items-center justify-center py-24">
        <ErrorAlert title="Scout failed" message={error || "Could not load this app"} />
        <Link href="/" className="shiny-button mt-6 rounded-xl px-6 py-3">
          Try Another Target
        </Link>
      </div>
    );
  }

  const { game } = data;

  return (
    <div className="page-shell container-shell min-h-screen py-10 sm:py-14">
      <AppProfileHero
        appName={data.appName}
        icon={data.icon}
        developer={data.developer}
        genre={data.genre}
        version={data.version}
        released={data.released}
        updatedTimeAgo={data.updatedTimeAgo}
        contentRating={data.contentRating}
        priceText={data.priceText}
        installsLabel={data.installs}
        totalDownloads={data.totalDownloads}
        score={data.score}
        ratings={data.ratings}
        game={game}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile
          label="Install Power"
          value={formatInstalls(data.totalDownloads)}
          subtext={`Play band: ${data.installs}`}
          icon={<Users size={16} />}
          delay={40}
        />
        <MetricTile
          label="Reputation"
          value={(data.score || 0).toFixed(1)}
          subtext={`${(data.ratings || 0).toLocaleString()} ratings`}
          icon={<Star size={16} />}
          delay={80}
        />
        <MetricTile
          label="Daily Pace"
          value={formatInstalls(data.estimatedDailyDownloads)}
          subtext="Lifetime avg from public install estimate"
          icon={<CalendarDays size={16} />}
          delay={120}
        />
        <MetricTile
          label="Review Voice"
          value={`${data.reviewEngagementRate}%`}
          subtext={`${(data.reviews || 0).toLocaleString()} written reviews`}
          icon={<MessageSquare size={16} />}
          delay={160}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="fade-in stagger-1">
          <PowerStats stats={game.powerStats} />
        </div>
        <div className="fade-in stagger-2">
          {data.ratingDistribution.length > 0 ? (
            <RatingDistribution distribution={data.ratingDistribution} ratings={data.ratings} />
          ) : (
            <div className="hud-panel flex h-full items-center justify-center p-8">
              <p className="theme-muted text-sm font-medium">No rating breakdown available</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 fade-in stagger-3">
        <div className="hud-panel p-6 sm:p-7">
          <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Scout Log
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Mission Briefing</h2>
          <p className="theme-muted mt-1 text-sm">
            Rule-based readouts from scraped public listing data - no AI.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {game.scoutingNotes.map((note, idx) => (
              <li
                key={`${note}-${idx}`}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--surface-softer)] p-4 text-sm leading-relaxed"
              >
                <span className="mr-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
                  #{idx + 1}
                </span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 fade-in stagger-4">
        <AchievementGrid achievements={game.achievements} />
      </div>

      <p className="theme-muted mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed">
        Estimates only. Kanbit scrapes public Google Play pages and turns them into a game-style
        profile. Not official Play Console analytics.
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="page-shell container-shell flex min-h-screen items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
