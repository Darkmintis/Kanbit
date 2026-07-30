import Link from "next/link";
import { Radar } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
          <div className="site-header-brand-icon flex h-9 w-9 items-center justify-center rounded-lg border">
            <Radar size={18} />
          </div>
          <div>
            <h1 className="site-header-title text-base font-bold tracking-tight">AppRadar</h1>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/about" className="site-header-nav-link transition-colors">
              About
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
