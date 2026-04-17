"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Download, TrendingUp, AlertCircle, BarChart3, Star, Tag, RotateCw } from "lucide-react";
import { DashboardChart } from "@/components/dashboard-chart";
import { StatCard } from "@/components/stat-card";
import { LoadingSpinner, LoadingCard } from "@/components/loading";
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
      <div className="container-shell py-24 min-h-screen bg-black flex items-center justify-center">
        <div className="card p-12 text-center max-w-lg mx-auto w-full">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-6">
            <AlertCircle className="h-8 w-8 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white mb-2">No App Selected</h1>
          <p className="text-neutral-400 mb-8">Search for an app on the home page to view its analytics.</p>
          <Link href="/" className="shiny-button inline-flex py-3 px-8 rounded-xl font-bold text-white">
            Go to Search
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-shell py-16 min-h-screen bg-black">
        <div className="mb-10">
          <div className="mb-3 h-10 w-1/3 rounded-xl bg-white/5 loading-pulse" />
          <div className="h-5 w-1/4 rounded-lg bg-white/5 loading-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-6 h-32 bg-white/5 border-white/5 loading-pulse" />
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[2.5fr_1fr]">
          <div className="card p-6 h-96 bg-white/5 border-white/5 loading-pulse" />
          <div className="card p-6 h-96 bg-white/5 border-white/5 loading-pulse" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container-shell py-24 min-h-screen bg-black flex flex-col items-center justify-center">
        <ErrorAlert title="Error" message={error || "Could not load info"} />
        <Link href="/" className="mt-6 shiny-button py-3 px-6 rounded-xl font-bold">Try Another Search</Link>
      </div>
    );
  }

  return (
    <div className="container-shell py-16 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="mb-10 fade-in flex flex-col sm:flex-row items-start gap-6">
        <img src={data.icon} alt={data.appName} className="w-24 h-24 rounded-2xl shadow-xl border border-white/10" />
        <div className="flex-1">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-teal-400">
            <BarChart3 size={14} className="stroke-[2.5px]" />
            <span className="text-xs font-bold uppercase tracking-wider">Analytics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{data.appName}</h1>
          <p className="mt-2 text-lg text-neutral-400">
            {data.developer} • {data.genre}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
            <span className="flex items-center gap-1"><span className="text-neutral-400 font-medium">Version:</span> {data.version || "Varies with device"}</span>
            <span className="flex items-center gap-1"><span className="text-neutral-400 font-medium">Released:</span> {data.released || "Unknown"}</span>
            <span className="flex items-center gap-1"><span className="text-neutral-400 font-medium">Updated:</span> {data.updatedTimeAgo || "Recently"}</span>
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
        <div className="card p-6 border-white/10 bg-white/[0.02]">
           <DashboardChart points={data.points} />
        </div>

        {/* Insights Panel */}
        <div className="card p-6 border-white/10 bg-white/[0.02] flex flex-col">
          <h2 className="text-xl font-bold tracking-tight">Key Insights</h2>
          <div className="mt-6 flex-1 space-y-4">
            {data.insights.map((insight, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-medium leading-relaxed text-neutral-300"
              >
                {insight}
              </div>
            ))}
          </div>

          {/* Health/Velocity Score */}
          <div className="mt-8 rounded-2xl glass-panel p-5">
            <div className="flex items-center justify-between">
              <span className="font-bold">Play Score</span>
              <span className={`text-xl font-extrabold ${
                  data.riskScore < 30 ? "text-emerald-400" : data.riskScore < 60 ? "text-amber-400" : "text-red-400"
                }`}>
                {100 - data.riskScore}
                <span className="text-sm text-neutral-500">/100</span>
              </span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                  data.riskScore < 30 ? "from-emerald-400 to-emerald-500" : data.riskScore < 60 ? "from-amber-400 to-amber-500" : "from-red-400 to-red-500"
                }`}
                style={{ width: `${100 - data.riskScore}%` }}
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
      <div className="container-shell py-12 min-h-screen bg-black flex justify-center items-center">
        <LoadingSpinner />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
