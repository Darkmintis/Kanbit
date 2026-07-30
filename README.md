# AppRadar – Gamified Play Store Scout

AppRadar scrapes **public Google Play Store signals** and turns them into a game-style app profile: rarity tiers, levels, power XP bars, achievements, and a scout briefing.

No accounts. No AI. Hosting is the only cost.

## Features

- **Search** any Play Store app by name or package ID
- **Tier & Level** from installs + ratings (Rookie → Mythic)
- **Power Board** - Reach, Reputation, Voice, Freshness, Stickiness
- **Badge Vault** - achievements unlocked from listing signals
- **Star Breakdown** + composite **Play Score**
- **Scout Log** - rule-based briefing (not AI)
- Dark / light theme, responsive layout

## Data Source

All analytics come from **public Google Play listing data** via scraping.

We do **not**:
- Access private Google Play Console data
- Use AI / LLM APIs
- Require sign-up

Install totals and daily pace are **estimates**. Treat them as directional, not official.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- `google-play-scraper` + Axios
- Lucide icons

## Local Development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Production

```bash
npm run build
npm run lint
npm start
```

## API

### `GET /api/search?q=`

Returns `{ results: AppSearchResult[] }` from Play Store search scrape.

### `GET /api/apps?appId=`

Returns full dashboard payload including `game` profile (tier, level, powerStats, achievements, scoutingNotes).

## Honest limits

- Scraping can break if Google changes HTML / blocks requests
- Download “daily pace” is lifetime installs ÷ days since release
- Play Score and badges are heuristics on public fields

## License

Private project (`"private": true`). Built by [Darkmintis](https://darkmintis.dev).
