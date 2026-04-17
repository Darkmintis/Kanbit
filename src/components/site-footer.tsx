import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-black text-white">
      <div className="container-shell py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 pr-8">
            <h3 className="text-base font-extrabold tracking-tight text-white">AppRadar</h3>
            <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-neutral-400">
              Instant, powerful Google Play Store analytics right in your browser. Get smart insights, 
              growth trends, and understand the market in seconds without ever signing up.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-extrabold tracking-tight text-white">Product</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/" className="text-neutral-400 transition-colors hover:text-teal-400">Home</Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-neutral-400 transition-colors hover:text-teal-400">Dashboard</Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 transition-colors hover:text-teal-400">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-extrabold tracking-tight text-white">Legal & Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/terms" className="text-neutral-400 transition-colors hover:text-teal-400">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-400 transition-colors hover:text-teal-400">Privacy Policy</Link>
              </li>
              <li>
                <a href="https://darkmintis.dev" className="text-neutral-400 transition-colors hover:text-teal-400" target="_blank" rel="noopener noreferrer">Portfolio</a>
              </li>
              <li>
                <a href="https://github.com/Darkmintis" className="text-neutral-400 transition-colors hover:text-teal-400" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 w-full border-t border-white/5 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-neutral-500">
            &copy; {new Date().getFullYear()} AppRadar. All analytics are estimated from public signals.
          </p>
        </div>
      </div>
    </footer>
  );
}
