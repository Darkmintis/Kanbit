# Kanbit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

**Kanbit** is a free, gamified Google Play Store scout. Search any app, scrape public listing signals, and unlock a game-style profile: rarity tiers, levels, power XP bars, listing stats, and a scout briefing.

No accounts. No AI. No paywall. Hosting (and optional ads) is the only cost.

**Live demo:** [darkmintis.dev/kanbit](https://darkmintis.dev/kanbit) · Built by [Darkmintis](https://darkmintis.dev)

> Not affiliated with Google. Not the commercial ASO product “App Radar.” Estimates only — not official Play Console data.

## Features

- Search by app name or package ID
- Tier & level from installs + ratings (Rookie → Mythic)
- Power board: Reach, Reputation, Voice, Freshness, Stickiness
- Listing stats: free/paid, ad support, in-app purchases, release date
- Star breakdown + composite Play Score
- Daily pace and review engagement readouts
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
git clone https://github.com/Darkmintis/Kanbit.git
cd Kanbit
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
├── app/                 # Routes, layout
│   ├── dashboard/       # Gamified app profile
│   └── ...
├── components/          # UI (hero, power stats, shell)
├── lib/
│   ├── appstore-api.ts  # Scrape + dashboard payload
│   └── gamification.ts  # Tiers, XP, scout notes
└── (netlify/functions)  # Deployed serverless API (apps, search)
```

## API

Hosted as Netlify Functions (`/kanbit/api/*` → `/.netlify/functions/*`).

### `GET /kanbit/api/search?q=`

Returns `{ results: AppSearchResult[] }` from a public Play Store search scrape.

### `GET /kanbit/api/apps?appId=`

Returns the full dashboard payload, including `game` (tier, level, powerStats, scoutingNotes).

## How scoring works

- **Play Score** — heuristic from rating, ratings volume, reviews, changelog, update freshness, and install band
- **Tier / level** — derived from Play Score + estimated installs
- **Daily pace** — lifetime install estimate ÷ days since release (directional only)

## Honest limits

- Scraping can break if Google changes HTML or rate-limits requests
- Install numbers are Play Store bands / estimates, not Console truth
- Self-hosting at scale may need caching and rate limits (not included yet)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Bug reports and PRs are welcome.

## License

[MIT](LICENSE) © Darkmintis
