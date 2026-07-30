"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "kanbit-theme";

function getInitialTheme(): Theme {
  if (globalThis.window === undefined) {
    return "dark";
  }

  const stored = globalThis.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  useEffect(() => {
    applyTheme(getInitialTheme());
  }, []);

  const handleToggle = () => {
    const currentTheme: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next: Theme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(next);
    globalThis.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-lg border transition"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Sun size={16} className="theme-toggle-sun" />
      <Moon size={16} className="theme-toggle-moon" />
    </button>
  );
}
