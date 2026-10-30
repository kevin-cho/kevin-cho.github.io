"use client";

import { FaMoon, FaSun } from "react-icons/fa";

declare global {
  interface Window {
    // Defined by ThemeScript in the root layout
    __setPreferredTheme: (theme: "light" | "dark") => void;
  }
}

const buttonClass =
  "size-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-current dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50";

/**
 * Light/dark toggle, like react.dev's: both buttons are always rendered and
 * CSS shows the right one, so it's correct on the very first paint.
 */
export function ThemeToggle() {
  return (
    <>
      {/* Shown in light mode */}
      <button
        type="button"
        aria-label="Use dark mode"
        title="Use dark mode"
        onClick={() => window.__setPreferredTheme("dark")}
        className={`flex dark:hidden ${buttonClass}`}
      >
        <FaMoon aria-hidden className="size-4" />
      </button>
      {/* Shown in dark mode */}
      <button
        type="button"
        aria-label="Use light mode"
        title="Use light mode"
        onClick={() => window.__setPreferredTheme("light")}
        className={`hidden dark:flex ${buttonClass}`}
      >
        <FaSun aria-hidden className="size-4" />
      </button>
    </>
  );
}
