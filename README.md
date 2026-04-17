# AppRadar – Google Play Store Analytics Dashboard

AppRadar is a modern, production-ready SaaS analytics dashboard that shows estimated Google Play Store installs, growth trends, ratings, and intelligent insights for any app.

## ✨ Features

### Dashboard Page
- **Download Analytics** – Total downloads with milion-scale formatting
- **Growth Metrics** – Track 30-day growth percentage with trend indicators  
- **Daily Averages** – Understand per-day download velocity
- **App Ratings** – View ratings, review counts, and health scores
- **Interactive Charts** – Beautiful Recharts-powered trend visualization
- **Smart Insights** – AI-powered recommendations for growth and risk
- **Health Scoring** – Visual health score (0-100) with color indicators

### Additional Pages
- **Home** – Beautiful landing page with CTA and feature highlights
- **About** – Comprehensive product info and creator background
- **Privacy Policy** – Full privacy and data handling practices
- **Terms of Service** – Legal terms with accuracy disclaimers

### Production Features  
- 🚀 **API-First** – Server-side API route for data fetching
- 💾 **Intelligent Caching** – 1-hour TTL for fetched data
- ⚡ **Fast Loading** – Suspense boundaries and skeleton loading
- 🎨 **Modern Design** – Tailwind-based SaaS aesthetic
- 📱 **Responsive** – Mobile-first design for all screens
- ♿ **Accessible** – Semantic HTML and ARIA labels
- 🔒 **Secure** – No sensitive data leakage, public signals only

## Data Source

All analytics are derived from **public Google Play Store signals only**. We do not:
- Access private Google Play Console data
- Store or transmit developer information  
- Make official claims about Google analytics

All metrics should be treated as **estimates for directional insights**, not official figures.

## Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Styling**: Tailwind CSS 4.1
- **Charting**: Recharts 3.2
- **HTTP**: Axios 1.7
- **Language**: TypeScript 5.9
- **Icons**: Lucide React
- **Deployment**: Vercel-optimized

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Production Build

```bash
# Build for production
npm run build

# Validate code quality
npm run lint

# Start production server
npm start
```

## Deployment to Vercel

This project is optimized for Vercel:

1. **Push to GitHub**
   ```bash
   git init && git add . && git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/appradar
   git branch -M main && git push -u origin main
   ```

2. **Import to Vercel**
   - Visit https://vercel.com/new
   - Connect your GitHub repo
   - Deploy with default settings

3. **Environment** (if needed)
   - No environment variables required for basic setup
   - Optional: Add analytics/monitoring

## API Routes

### GET /api/apps
Fetches estimated app analytics.

**Query Parameters:**
- `query` (string, required) – App name or package ID (2-128 chars)

**Response:**
```json
{
  "appName": "Spotify",
  "packageName": "com.spotify.music",
  "totalDownloads": 500000000,
  "growthPercentage": 12.4,
  "avgDailyDownloads": 1500000,
  "rating": 4.7,
  "reviews": 5000000,
  "points": [
    { "day": "Dec 1", "downloads": 1400000 },
    { "day": "Dec 2", "downloads": 1550000 }
  ],
  "insights": [...],
  "riskScore": 25
}
```

## File Structure

```
src/
├── app/
│   ├── (pages)
│   │   ├── page.tsx          # Home/landing
│   │   ├── about/
│   │   ├── dashboard/        # Analytics dashboard
│   │   ├── privacy/
│   │   └── terms/
│   ├── api/
│   │   └── apps/route.ts     # Analytics API
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── site-header.tsx       # Navigation
│   ├── site-footer.tsx       # Footer
│   ├── dashboard-chart.tsx   # Recharts wrapper
│   ├── stat-card.tsx         # Metric cards
│   ├── loading.tsx           # Skeleton loaders
│   └── error-states.tsx      # Error UI
└── lib/
    └── appstore-api.ts       # Analytics logic
```

## UI/UX Highlights

- **Color System**: Teal primary (#0f766e), amber accents
- **Typography**: Clean system fonts with proper hierarchy
- **Spacing**: Consistent 16px grid-based spacing
- **Animations**: Smooth 300ms transitions, fade-in effects
- **Icons**: Lucide React for consistent visual language
- **Cards**: Elevated shadows with hover effects
- **Forms**: Large touch targets, focus states for accessibility

## Performance

- **Build**: ~5 seconds (Turbopack)
- **Page Load**: <2s on 4G
- **API Response**: <1s with caching
- **Bundle Size**: Optimized for Vercel serverless

## Links

- Portfolio: https://darkmintis.dev
- GitHub: https://github.com/Darkmintis

## License

AppRadar is provided as-is for educational and commercial use.

---

**Made with ❤️ for app makers, makers, and analytics enthusiasts.**
