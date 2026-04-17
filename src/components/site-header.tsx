import Link from "next/link";
import { Radar } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)] border border-teal-500/30">
            <Radar size={18} />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white">AppRadar</h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-neutral-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
