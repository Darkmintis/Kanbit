import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer-shell border-t">
      <div className="container-shell py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 pr-8">
            <h3 className="footer-title text-base font-extrabold tracking-tight">AppRadar</h3>
            <p className="theme-muted mt-4 max-w-sm text-sm font-medium leading-relaxed">
              Instant, powerful Google Play Store analytics right in your browser. Get smart insights, 
              growth trends, and understand the market in seconds without ever signing up.
            </p>
          </div>

          <div>
            <h4 className="footer-title mb-6 font-extrabold tracking-tight">Product</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/" className="footer-link transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="footer-link transition-colors">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title mb-6 font-extrabold tracking-tight">Legal & Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/terms" className="footer-link transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-link transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <a href="https://darkmintis.dev" className="footer-link transition-colors" target="_blank" rel="noopener noreferrer">Portfolio</a>
              </li>
              <li>
                <a href="https://github.com/Darkmintis" className="footer-link transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="theme-divider mt-16 w-full border-t pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="theme-muted text-sm font-medium">
            &copy; {new Date().getFullYear()} AppRadar. All analytics are estimated from public signals.
          </p>
        </div>
      </div>
    </footer>
  );
}
