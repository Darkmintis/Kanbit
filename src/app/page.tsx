"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  BarChart3,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
  ArrowRight,
  Loader2,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Real Growth Data",
    description: "Track estimated app momentum with analysis of public Play Store metrics.",
    color: "from-teal-500/20 to-emerald-500/10",
    textColor: "text-teal-400",
  },
  {
    icon: BarChart3,
    title: "Beautiful Charts",
    description: "Understand download behavior instantly with professional visualizations.",
    color: "from-blue-500/20 to-indigo-500/10",
    textColor: "text-blue-400",
  },
  {
    icon: Sparkles,
    title: "Smart Insights",
    description: "Get AI-powered recommendations on app health, growth opportunities, and risks.",
    color: "from-amber-500/20 to-orange-500/10",
    textColor: "text-amber-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Lightning-fast analytics powered by public data. No sign-ups needed.",
    color: "from-purple-500/20 to-pink-500/10",
    textColor: "text-purple-400",
  },
];

type SearchResult = {
  title: string;
  appId: string;
  icon: string;
  developer: string;
  scoreText: string;
};

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (appId: string) => {
    setLoading(true);
    router.push(`/dashboard?appId=${encodeURIComponent(appId)}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-teal-500/30">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/20 opacity-40 blur-[100px] mix-blend-screen" />

      {/* Hero Section */}
      <section className="container-shell py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 shadow-[0_0_15px_rgba(20,184,166,0.2)] backdrop-blur-md">
            <Sparkles size={14} className="text-teal-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Real Play Store Data
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8">
            Analyze any app at <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              lightning speed
            </span>
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-neutral-400 max-w-2xl mx-auto mb-10">
            AppRadar gives you instant, crystal-clear analytics on any Google Play Store app. See downloads,
            trends, pricing and smart insights instantly.
          </p>

          <div ref={searchRef} className="relative max-w-2xl mx-auto z-50">
            <div className="group flex flex-col gap-3 rounded-2xl glass-panel p-2 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-teal-500/50 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-teal-400 transition-colors" size={22} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  placeholder="Search app by name or package..."
                  className="w-full bg-transparent py-4 pl-12 pr-4 text-lg font-medium text-white placeholder:text-neutral-500 focus:outline-none"
                />
              </div>
              <button
                disabled={loading}
                className="flex h-14 items-center justify-center gap-2 rounded-xl gradient-primary px-8 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
              </button>
            </div>

            {/* Results Dropdown */}
            {showResults && isSearching && (
              <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl glass-dropdown p-8 text-center fade-in flex flex-col items-center justify-center">
                <Loader2 size={24} className="animate-spin text-teal-500 mb-2" />
                <p className="text-sm font-medium text-neutral-400">Searching...</p>
              </div>
            )}
            
            {showResults && !isSearching && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl glass-dropdown overflow-hidden flex flex-col fade-in">
                {results.map((app) => (
                  <button
                    key={app.appId}
                    onClick={() => handleSelect(app.appId)}
                    className="flex text-left items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                    <img src={app.icon} alt={app.title} className="w-12 h-12 rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white truncate">{app.title}</div>
                      <div className="text-sm text-neutral-400 truncate">{app.developer}</div>
                    </div>
                    <div className="text-sm font-semibold flex items-center gap-1 text-teal-400">
                      ★ {app.scoreText || "N/A"}
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {showResults && !isSearching && query.length >= 2 && results.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl glass-dropdown p-6 text-center fade-in">
                <p className="text-neutral-400">No app found.</p>
              </div>
            )}
          </div>

          <p className="mt-6 px-2 text-sm font-medium text-neutral-500">
            Try: <span className="text-teal-400 cursor-pointer" onClick={() => setQuery("Spotify")}>Spotify</span> • <span className="text-teal-400 cursor-pointer" onClick={() => setQuery("Instagram")}>Instagram</span> • <span className="text-teal-400 cursor-pointer" onClick={() => setQuery("TikTok")}>TikTok</span>
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container-shell py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Powerful Analytics</h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            Comprehensive app intelligence designed for developers, marketers, and researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description, color, textColor }, idx) => (
            <div
              key={title}
              className="card p-6 fade-in relative overflow-hidden group hover:bg-white/[0.02]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${color} p-3 ${textColor} mb-4 border border-white/5`}>
                <Icon size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2">{title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
