"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Download, AlertCircle, BarChart3, Star, Tag, RotateCw } from "lucide-react";
import { DashboardChart } from "@/components/dashboard-chart";
import { StatCard } from "@/components/stat-card";
import { LoadingSpinner } from "@/components/loading";
import { ErrorAlert } from "@/components/error-states";
import type { DashboardData } from "@/lib/appstore-api";

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
        const response = await fetch(`/api/apps?appId=${encodeURIComponent(appId)}`);

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
      <div className="page-shell container-shell py-24 min-h-screen flex items-center justify-center">
        <div className="card p-12 text-center max-w-lg mx-auto w-full">
          <div className="theme-surface-soft mx-auto flex h-16 w-16 items-center justify-center rounded-full border mb-6">
            <AlertCircle className="h-8 w-8 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">No App Selected</h1>
          <p className="theme-muted mb-8">Search for an app on the home page to view its analytics.</p>
          <Link href="/" className="shiny-button inline-flex py-3 px-8 rounded-xl font-bold text-white">
            Go to Search
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-shell container-shell py-16 min-h-screen">
        <div className="mb-10">
          <div className="theme-surface-soft mb-3 h-10 w-1/3 rounded-xl loading-pulse" />
          <div className="theme-surface-soft h-5 w-1/4 rounded-lg loading-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            "metric-downloads",
            "metric-rating",
            "metric-price",
            "metric-status",
          ].map((skeletonId) => (
            <div key={skeletonId} className="card theme-surface-soft p-6 h-32 loading-pulse" />
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[2.5fr_1fr]">
          <div className="card theme-surface-soft p-6 h-96 loading-pulse" />
          <div className="card theme-surface-soft p-6 h-96 loading-pulse" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="page-shell container-shell py-24 min-h-screen flex flex-col items-center justify-center">
        <ErrorAlert title="Error" message={error || "Could not load info"} />
        <Link href="/" className="mt-6 shiny-button py-3 px-6 rounded-xl font-bold">Try Another Search</Link>
      </div>
    );
  }

  const playScore = 100 - data.riskScore;
  let riskTextClass = "text-red-400";
  let riskBarClass = "from-red-400 to-red-500";
  if (data.riskScore < 30) {
    riskTextClass = "text-emerald-400";
    riskBarClass = "from-emerald-400 to-emerald-500";
  } else if (data.riskScore < 60) {
    riskTextClass = "text-amber-400";
    riskBarClass = "from-amber-400 to-amber-500";
  }

  return (
    <div className="page-shell container-shell py-16 min-h-screen">
      {/* Header */}
      <div className="mb-10 fade-in flex flex-col sm:flex-row items-start gap-6">
        <Image
          src={data.icon}
          alt={data.appName}
          width={96}
          height={96}
          unoptimized
          className="theme-divider w-24 h-24 rounded-2xl shadow-xl border"
        />
        <div className="flex-1">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-teal-400">
            <BarChart3 size={14} className="stroke-[2.5px]" />
            <span className="text-xs font-bold uppercase tracking-wider">Analytics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{data.appName}</h1>
          <p className="theme-muted mt-2 text-lg">
            {data.developer} • {data.genre}
          </p>
          <div className="theme-muted mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-1"><span className="font-medium">Version:</span> {data.version || "Varies with device"}</span>
            <span className="flex items-center gap-1"><span className="font-medium">Released:</span> {data.released || "Unknown"}</span>
            <span className="flex items-center gap-1"><span className="font-medium">Updated:</span> {data.updatedTimeAgo || "Recently"}</span>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 fade-in">
        <StatCard
          label="Exact Downloads"
          value={data.totalDownloads.toLocaleString()}
          icon={<Download size={20} className="text-teal-400" />}
        />
        <StatCard
          label="Rating"
          value={(data.score || 0).toFixed(1)}
          icon={<Star size={20} className="text-amber-400 fill-amber-400" />}
          subtext={`${(data.reviews || 0).toLocaleString()} reviews`}
        />
        <StatCard
          label="Price"
          value={data.priceText}
          icon={<Tag size={20} className="text-green-400" />}
        />
        <StatCard
          label="Status"
          value={data.recentChanges ? "Active" : "Stable"}
          icon={<RotateCw size={20} className="text-blue-400" />}
        />
      </div>

      {/* Chart & Insights */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[2.5fr_1fr] fade-in" style={{ animationDelay: '100ms' }}>
        <div className="card theme-surface-soft p-6">
           <DashboardChart points={data.points} />
        </div>

        {/* Insights Panel */}
        <div className="card theme-surface-soft p-6 flex flex-col">
          <h2 className="text-xl font-bold tracking-tight">Key Insights</h2>
          <div className="mt-6 flex-1 space-y-4">
            {data.insights.map((insight, idx) => (
              <div
                key={`${insight}-${idx}`}
                className="theme-surface-softer theme-divider rounded-xl border p-4 text-sm font-medium leading-relaxed"
              >
                {insight}
              </div>
            ))}
          </div>

          {/* Health/Velocity Score */}
          <div className="mt-8 rounded-2xl glass-panel p-5">
            <div className="flex items-center justify-between">
              <span className="font-bold">Play Score</span>
              <span className={`text-xl font-extrabold ${riskTextClass}`}>
                {playScore}
                <span className="theme-muted text-sm">/100</span>
              </span>
            </div>
            <div className="theme-surface-softer mt-4 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out bg-linear-to-r ${
                  riskBarClass
                }`}
                style={{ width: `${playScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="page-shell container-shell py-12 min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
