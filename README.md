# Kanbit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

**Kanbit** is a free, gamified Google Play Store scout. Search any app, scrape public listing signals, and unlock a game-style profile: rarity tiers, levels, power XP bars, achievements, and a scout briefing.

No accounts. No AI. No paywall. Hosting (and optional ads) is the only cost.

**Live demo:** [appradar-stats.vercel.app](https://appradar-stats.vercel.app/) · Built by [Darkmintis](https://darkmintis.dev)

> Not affiliated with Google. Not the commercial ASO product “App Radar.” Estimates only — not official Play Console data.

## Features

- Search by app name or package ID
- Tier & level from installs + ratings (Rookie → Mythic)
- Power board: Reach, Reputation, Voice, Freshness, Stickiness
- Badge vault with XP rewards and rarity colors
- Star breakdown + composite Play Score
- Rule-based scout log (not AI)
- Dark / light theme

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Lucide |
| Data | `google-play-scraper` + Play Store HTML search |
| Language | TypeScript (strict) |

## Quick start

```bash
git clone https://github.com/Darkmintis/AppRadar.git
cd AppRadar
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
npm start       # serve production build
```

No environment variables are required for the core app.

## Project structure

```
src/
├── app/                 # Routes, layout, API
│   ├── api/apps/        # GET /api/apps?appId=
│   ├── api/search/      # GET /api/search?q=
│   ├── dashboard/       # Gamified app profile
│   └── ...
├── components/          # UI (hero, power stats, badges, shell)
└── lib/
    ├── appstore-api.ts  # Scrape + dashboard payload
    └── gamification.ts  # Tiers, XP, achievements, scout notes
```

## API

### `GET /api/search?q=`

Returns `{ results: AppSearchResult[] }` from a public Play Store search scrape.

### `GET /api/apps?appId=`

Returns the full dashboard payload, including `game` (tier, level, powerStats, achievements, scoutingNotes).

## How scoring works

- **Play Score** — heuristic from rating, ratings volume, reviews, changelog, update freshness, and install band
- **Tier / level** — derived from Play Score + estimated installs
- **Achievements** — unlocked from public listing flags (Editor’s Choice, free/paid, IAP, ads, update age, etc.)
- **Daily pace** — lifetime install estimate ÷ days since release (directional only)

## Honest limits

- Scraping can break if Google changes HTML or rate-limits requests
- Install numbers are Play Store bands / estimates, not Console truth
- Self-hosting at scale may need caching and rate limits (not included yet)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Bug reports and PRs are welcome.

## License

[MIT](LICENSE) © Darkmintis
