import Link from "next/link";
import { Radar } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
          <div className="site-header-brand-icon flex h-9 w-9 items-center justify-center rounded-xl border shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <Radar size={18} />
          </div>
          <div>
            <h1 className="site-header-title text-base font-extrabold tracking-tight">AppRadar</h1>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {[
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="site-header-nav-link transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
