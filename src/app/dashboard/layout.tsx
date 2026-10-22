import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "App Profile | Kanbit",
  description:
    "Public Google Play listing signals for a single app, presented as a Kanbit profile.",
  alternates: { canonical: "https://darkmintis.dev/kanbit/dashboard/" },
  robots: { index: false, follow: true },
};

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
