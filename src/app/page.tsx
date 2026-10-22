"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { API_BASE } from "@/lib/api";
import {
  Crosshair,
  Search,
  Shield,
  Trophy,
  Zap,
  ArrowRight,
  Loader2,
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Tier & Level",
    description: "Every app gets a rarity tier and level from public installs and ratings.",
  },
  {
    icon: Shield,
    title: "Power Board",
    description: "Reach, Reputation, Voice, Freshness, Stickiness - XP bars you can read in a glance.",
  },
  {
    icon: Zap,
    title: "Zero Friction",
    description: "Scraped Play Store signals only. No sign-up. No AI. Hosting is the only cost.",
  },
];

type SearchResult = {
  title: string;
  appId: string;
  icon: string;
  developer: string;
  scoreText: string;
};

const quickApps = [
  { name: "Blink", packageName: "com.darkmintis.blink" },
  { name: "Spotify", packageName: "com.spotify.music" },
  { name: "Instagram", packageName: "com.instagram.android" },
];

const DEFAULT_APP_LOGO = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/app-default.svg`;
const QUICK_APP_ICON_CACHE = "kanbit-quick-app-icons";
const QUICK_APP_ICON_CACHE_MONTH = "kanbit-quick-app-icons-month";

type QuickAppIconMap = Record<string, string>;

type AppLogoProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

function AppLogo({ src, alt, size = 48, className = "" }: Readonly<AppLogoProps>) {
  const [hasError, setHasError] = useState(false);
  const logoSrc = hasError ? DEFAULT_APP_LOGO : src || DEFAULT_APP_LOGO;

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      loading="eager"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quickAppIcons, setQuickAppIcons] = useState<QuickAppIconMap>({});
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
    if (!query || query.length < 2) return;

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
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

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const cachedMonth = globalThis.localStorage.getItem(QUICK_APP_ICON_CACHE_MONTH);
    const cachedIcons = globalThis.localStorage.getItem(QUICK_APP_ICON_CACHE);
    if (cachedMonth === currentMonth && cachedIcons) {
      try {
        const parsed = JSON.parse(cachedIcons) as QuickAppIconMap;
        setQuickAppIcons(parsed);
        return;
      } catch {
        globalThis.localStorage.removeItem(QUICK_APP_ICON_CACHE);
      }
    }

    const fetchIcons = async () => {
      const entries = await Promise.all(
        quickApps.map(async (app) => {
          try {
            const res = await fetch(`${API_BASE}/apps?appId=${encodeURIComponent(app.packageName)}`);
            if (!res.ok) return [app.packageName, DEFAULT_APP_LOGO] as const;
            const data = await res.json();
            return [app.packageName, data.icon || DEFAULT_APP_LOGO] as const;
          } catch {
            return [app.packageName, DEFAULT_APP_LOGO] as const;
          }
        }),
      );

      const nextIcons = Object.fromEntries(entries) as QuickAppIconMap;
      setQuickAppIcons(nextIcons);
      globalThis.localStorage.setItem(QUICK_APP_ICON_CACHE, JSON.stringify(nextIcons));
      globalThis.localStorage.setItem(QUICK_APP_ICON_CACHE_MONTH, currentMonth);
    };

    void fetchIcons();
  }, []);

  const handleSelect = (appId: string) => {
    setLoading(true);
    router.push(`/dashboard?appId=${encodeURIComponent(appId)}`);
  };

  const handleSubmit = () => {
    if (results[0]) {
      handleSelect(results[0].appId);
      return;
    }
    const trimmed = query.trim();
    if (trimmed.includes(".")) {
      handleSelect(trimmed);
    }
  };

  return (
    <div className="page-shell relative min-h-screen overflow-hidden selection:bg-[var(--color-primary)]/30">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 -translate-x-1/2">
        <div className="hero-radar scan-pulse" />
      </div>

      <section className="container-shell relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center py-16 sm:py-20">
        <div className="mx-auto w-full max-w-3xl text-center fade-in">
          <p className="font-display mb-5 inline-flex items-center gap-2 rounded-md border border-[var(--color-primary)]/35 bg-[var(--color-primary)]/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            <Crosshair size={14} />
            Play Store Scout
          </p>

          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            Kanbit
          </h1>

          <p className="theme-muted mx-auto mt-5 max-w-xl text-lg leading-relaxed sm:text-xl">
            Lock any Google Play app. We scrape public signals and turn them into a game profile -
            tiers, XP, and listing stats.
          </p>

          <div ref={searchRef} className="relative z-50 mx-auto mt-10 max-w-2xl">
            <div className="group flex flex-col gap-3 rounded-2xl glass-panel p-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] transition-colors group-focus-within:text-[var(--color-primary)]"
                  size={20}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    const nextQuery = e.target.value;
                    setQuery(nextQuery);
                    if (!nextQuery || nextQuery.length < 2) {
                      setResults([]);
                      setIsSearching(false);
                    }
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Search app name or package ID…"
                  className="theme-input w-full bg-transparent py-4 pl-12 pr-4 text-lg font-medium focus:outline-none"
                  aria-label="Search Play Store apps"
                />
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="shiny-button flex h-14 items-center justify-center gap-2 rounded-xl px-7 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Scout <ArrowRight size={18} /></>}
              </button>
            </div>

            {showResults && isSearching && (
              <div className="absolute left-0 right-0 top-full mt-3 flex flex-col items-center justify-center rounded-2xl glass-dropdown p-8 fade-in">
                <Loader2 size={22} className="mb-2 animate-spin text-[var(--color-primary)]" />
                <p className="theme-muted text-sm font-medium">Scanning Play Store…</p>
              </div>
            )}

            {showResults && !isSearching && results.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 flex flex-col overflow-hidden rounded-2xl glass-dropdown fade-in">
                {results.map((app) => (
                  <button
                    key={app.appId}
                    type="button"
                    onClick={() => handleSelect(app.appId)}
                    className="theme-list-row flex items-center gap-4 border-b px-4 py-3.5 text-left transition-all last:border-0"
                  >
                    <AppLogo
                      key={app.icon}
                      src={app.icon}
                      alt={app.title}
                      className="h-12 w-12 shrink-0 rounded-xl ring-1 ring-[var(--color-border)]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-bold">{app.title}</div>
                      <div className="theme-muted truncate text-sm">{app.developer}</div>
                    </div>
                    <div className="font-hud text-sm font-bold text-[var(--color-accent)]">
                      ★ {app.scoreText || "N/A"}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showResults && !isSearching && query.length >= 2 && results.length === 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 rounded-2xl glass-dropdown p-6 text-center fade-in">
                <p className="theme-muted font-medium">No targets found for “{query}”</p>
              </div>
            )}
          </div>

          <div className="mt-10">
            <p className="font-display mb-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Quick Targets
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {quickApps.map((app) => (
                <button
                  key={app.packageName}
                  type="button"
                  onClick={() => handleSelect(app.packageName)}
                  className="hud-panel flex flex-col items-center gap-2 p-4 text-center transition hover:border-[var(--color-primary)]/45"
                >
                  <AppLogo
                    key={`${app.packageName}-${quickAppIcons[app.packageName] || "default"}`}
                    src={quickAppIcons[app.packageName] || DEFAULT_APP_LOGO}
                    alt={`${app.name} icon`}
                    className="h-12 w-12 rounded-xl"
                  />
                  <span className="font-display text-sm font-bold">{app.name}</span>
                  <span className="theme-muted text-[0.7rem]">{app.packageName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell border-t border-[var(--color-border)] py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Stats that feel like a run
          </h2>
          <p className="theme-muted mt-3 text-base sm:text-lg">
            Same public Play data - presented like a character sheet so people actually want to
            explore.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={title}
              className="hud-panel fade-in p-6"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="mb-4 inline-flex rounded-lg border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 p-2.5 text-[var(--color-primary)]">
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
              <p className="theme-muted mt-2 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell border-t border-[var(--color-border)] py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            About Kanbit
          </h2>
          <p className="theme-muted mt-3 leading-7">
            Kanbit is a free Google Play Store scout. Search any app by name or package ID and see
            public listing signals - installs, rating, release date, update activity, ads, and
            in-app purchases - presented as a readable game-style profile with tiers, XP, and Store
            Signals.
          </p>
          <p className="theme-muted mt-3 leading-7">
            It is built for Android developers, ASO researchers, and anyone comparing apps without
            signing up. Kanbit uses public Play Store data only and does not require an account.
            Explore more Android projects on{" "}
            <a
              className="text-[var(--color-primary)] underline underline-offset-2"
              href="https://darkmintis.dev/android-apps/"
            >
              Darkmintis
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
