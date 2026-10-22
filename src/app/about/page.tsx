import { CheckCircle, Info } from "lucide-react";

export const metadata = {
  title: "About Kanbit | Gamified Play Store Scout",
  description:
    "How Kanbit scrapes public Google Play signals and turns them into game-style app profiles.",
  alternates: { canonical: "https://darkmintis.dev/kanbit/about/" },
};

export default function AboutPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold">About Kanbit</h1>
        <p className="theme-muted mt-4 text-lg">
          Kanbit is a free Play Store scout: we scrape public listing data and present it like a
          game profile so apps feel memorable - not like another dull spreadsheet.
        </p>

        <div className="hud-panel mt-12 p-8">
          <h2 className="text-2xl font-bold">Mission</h2>
          <p className="theme-muted mt-4 leading-relaxed">
            Make public app intelligence fun and useful. No accounts. No AI bills. Just hosting plus
            a scraper that turns installs, ratings, and listing signals into tiers, XP, and listing
            stats.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { title: "Lock", desc: "Search any Play Store app name or package ID" },
              { title: "Scrape", desc: "We pull public listing signals from Google Play" },
              { title: "Level Up", desc: "Stats become tiers, power bars, and listing signals" },
            ].map((step, i) => (
              <div key={step.title} className="hud-panel p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary font-display font-bold text-[#0a0f08]">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-bold">{step.title}</h3>
                </div>
                <p className="theme-muted mt-3 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-info-panel mt-12 rounded-xl border p-6">
          <div className="flex gap-3">
            <Info className="about-info-icon h-6 w-6 shrink-0" />
            <div>
              <h3 className="about-info-text font-semibold">About the data</h3>
              <p className="about-info-text mt-2 text-sm leading-relaxed">
                Kanbit uses <strong>public Play Store signals only</strong>. We do not access
                private Google Play Console data. Install totals and daily pace are estimates.
                Treat everything as directional - not official analytics.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold">What you get</h2>
          <ul className="mt-8 space-y-4">
            {[
              "Rarity tier + level from installs and ratings",
              "Power board: Reach, Reputation, Voice, Freshness, Stickiness",
              "Listing stats: free/paid, ads, in-app purchases, release date",
              "Star breakdown and Play Score",
              "No sign-up, no AI cost - hosting only",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                <span className="theme-muted">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="accent-surface hud-panel mt-12 p-8">
          <h2 className="text-2xl font-bold">Who built this?</h2>
          <p className="theme-muted mt-4 leading-relaxed">
            Kanbit is built by{" "}
            <a
              href="https://darkmintis.dev"
              className="about-accent-link font-semibold hover:underline"
            >
              Darkmintis
            </a>
            - tools that feel good to use.
          </p>
        </div>
      </div>
    </div>
  );
}
