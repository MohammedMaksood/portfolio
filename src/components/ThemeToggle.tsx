"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/**
 * Floats bottom-right on its own now that there is no navigation bar to
 * hold it. Small and quiet, but the light theme is unreachable without it.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme");
    setTheme(stored === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Storage can be unavailable; the theme still applies for this visit. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Switch theme"
      }
      className="fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-line bg-surface text-text-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-text"
    >
      {theme === "dark" ? (
        <Sun size={15} strokeWidth={1.5} />
      ) : (
        <Moon size={15} strokeWidth={1.5} />
      )}
    </button>
  );
}
