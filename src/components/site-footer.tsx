import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer-shell border-t">
      <div className="container-shell py-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pr-8 lg:col-span-2">
            <h3 className="footer-title text-base font-bold tracking-tight">AppRadar</h3>
            <p className="theme-muted mt-4 max-w-sm text-sm font-medium leading-relaxed">
              Gamified Google Play scouting from public store signals. Lock an app, unlock tiers,
              power stats, and badges — no account, no AI.
            </p>
          </div>

          <div>
            <h4 className="footer-title mb-5 font-bold tracking-tight">Product</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/" className="footer-link transition-colors">
                  Lobby
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title mb-5 font-bold tracking-tight">Legal</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/terms" className="footer-link transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-link transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="theme-divider mt-12 flex w-full flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="theme-muted text-sm font-medium">
            &copy; {new Date().getFullYear()} AppRadar. Estimates from public Play signals only.
          </p>
          <a
            href="https://darkmintis.dev"
            className="footer-link inline-flex items-center gap-2 text-sm font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built by <span className="text-[var(--color-primary)]">Darkmintis</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
