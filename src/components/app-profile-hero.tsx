"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TIER_META, formatInstalls, type GameProfile } from "@/lib/gamification";

type AppProfileHeroProps = {
  appName: string;
  packageName: string;
  icon: string;
  developer: string;
  genre: string;
  version: string;
  released: string;
  updatedTimeAgo: string;
  contentRating: string;
  priceText: string;
  installsLabel: string;
  totalDownloads: number;
  score: number;
  ratings: number;
  game: GameProfile;
};

export function AppProfileHero({
  appName,
  packageName,
  icon,
  developer,
  genre,
  version,
  released,
  updatedTimeAgo,
  contentRating,
  priceText,
  installsLabel,
  totalDownloads,
  score,
  ratings,
  game,
}: Readonly<AppProfileHeroProps>) {
  const [displayScore, setDisplayScore] = useState(0);
  const [logoError, setLogoError] = useState(false);
  const logo = logoError
    ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/app-default.svg`
    : icon;
  const tier = TIER_META[game.tier];
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (game.playScore / 100) * circumference;
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${encodeURIComponent(packageName)}`;

  useEffect(() => {
    let frame = 0;
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(game.playScore * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [game.playScore]);

  return (
    <section className="hud-panel fade-in overflow-visible p-6 sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${appName} on Google Play`}
          title="Open on Google Play"
          className="relative mx-auto block float-soft shrink-0 rounded-3xl lg:mx-0"
        >
          <div
            className="absolute -inset-3 rounded-[1.75rem] opacity-70 blur-xl"
            style={{ background: tier.glow }}
          />
          <div
            className="relative rounded-3xl border-2 p-1.5"
            style={{ borderColor: tier.color }}
          >
            <Image
              src={logo}
              alt={appName}
              width={120}
              height={120}
              unoptimized
              onError={() => setLogoError(true)}
              className="h-[7.5rem] w-[7.5rem] rounded-[1.15rem] bg-[var(--color-surface)]"
            />
          </div>
          <div
            className="tier-chip absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap shadow-lg"
            style={{ color: tier.color }}
          >
            {tier.label}
          </div>
        </a>

        <div className="min-w-0 flex-1 text-center lg:text-left">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="estimated-badge">Public Play signals</span>
            <span className="font-display rounded-md border border-[var(--color-border)] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
              {game.className}
            </span>
            <span className="font-display rounded-md border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Lv.{game.level}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Open ${appName} on Google Play`}
              className="transition-colors hover:text-[var(--color-primary)] focus-visible:text-[var(--color-primary)] focus-visible:outline-none"
            >
              {appName}
            </a>
          </h1>
          <p className="theme-muted mt-2 text-base sm:text-lg">
            {developer} · {genre} · {priceText}
          </p>
          <p className="mt-2 font-display text-sm font-semibold tracking-wide text-[var(--color-primary)]">
            {game.title}
          </p>

          <div className="theme-muted mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm lg:justify-start">
            <span>Build {version}</span>
            <span>Released {released}</span>
            <span>Patched {updatedTimeAgo}</span>
            <span>{contentRating}</span>
            <span>Band {installsLabel}</span>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-display font-bold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                Level XP
              </span>
              <span className="font-hud font-bold">{game.xpProgress}%</span>
            </div>
            <div className="xp-track">
              <div className="xp-fill" style={{ width: `${game.xpProgress}%` }} />
            </div>
          </div>
        </div>

        <div className="mx-auto flex shrink-0 flex-col items-center gap-3 lg:mx-0">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="var(--hud-track)"
                strokeWidth="7"
              />
              <circle
                className="level-ring"
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke={tier.color}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-hud text-3xl font-bold tabular-nums" style={{ color: tier.color }}>
                {displayScore}
              </span>
              <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                Play Score
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="font-hud text-xl font-bold">{formatInstalls(totalDownloads)}</p>
            <p className="theme-muted text-xs">est. installs · ★ {score.toFixed(1)} ({ratings.toLocaleString()})</p>
          </div>
        </div>
      </div>
    </section>
  );
}
