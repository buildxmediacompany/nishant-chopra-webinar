"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Seats shown on first paint, before the slow countdown begins. */
const START_SEATS = 7;
/** One seat "sells" every 5 minutes until the real (admin) count is reached. */
const TICK_MS = 5 * 60 * 1000;

/**
 * Renders the admin's seats-left copy with a simulated live tick: the first
 * number in the string starts at START_SEATS and counts down one every 5 minutes
 * to the real value, then holds.
 *
 * variant="default"  — two-line stacked (Filling Fast + blinking seats) for the
 *                      hero CtaBanner on desktop.
 * variant="compact"  — single inline line (blinking dot + "Only N Seats Left!")
 *                      for use inside the mobile CTA badge pill where the
 *                      "Filling Fast" label is already rendered beside it.
 */
export function SeatsLeftTicker({
  text,
  className,
  variant = "default",
}: {
  text: string;
  className?: string;
  variant?: "default" | "compact" | "banner";
}) {
  const match = text.match(/\d+/);
  const finalN = match ? parseInt(match[0], 10) : null;
  const start = finalN != null ? Math.max(finalN, START_SEATS) : null;

  const [n, setN] = useState(start ?? 0);

  useEffect(() => {
    if (finalN == null || start == null) return;
    let cur = start;
    setN(cur);
    const iv = setInterval(() => {
      cur -= 1;
      setN(cur);
      if (cur <= finalN) clearInterval(iv);
    }, TICK_MS);
    return () => clearInterval(iv);
  }, [finalN, start]);

  /** Live dot (no blink — parent wrapper handles it) */
  const Dot = () => (
    <span
      aria-hidden="true"
      className="size-1.5 shrink-0 rounded-full bg-sindoor shadow-[0_0_6px_2px_rgba(194,59,51,0.7)]"
    />
  );

  if (variant === "compact") {
    return (
      <span className={cn("inline-flex animate-[blink_1s_step-start_infinite] items-center gap-1.5", className)}>
        <Dot />
        <span className="font-utility text-[11px] font-bold uppercase tracking-wide text-sindoor">
          Only {n} Seats Left!
        </span>
      </span>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-between rounded-xl border border-sindoor/30 bg-sindoor/10 px-4 py-2.5 shadow-[0_0_16px_0px_rgba(194,59,51,0.18)]",
          className
        )}
      >
        {/* Left — Filling Fast */}
        <span className="font-utility text-sm font-black uppercase tracking-widest text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
          🔥 Filling Fast
        </span>

        {/* Divider */}
        <span aria-hidden="true" className="mx-3 h-4 w-px shrink-0 bg-sindoor/40" />

        {/* Right — blinking seats sentence */}
        <span className="inline-flex animate-[blink_1s_step-start_infinite] items-center gap-2">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-sindoor shadow-[0_0_8px_3px_rgba(194,59,51,0.8)]"
          />
          <span className="font-utility text-sm font-bold uppercase tracking-wide text-sindoor drop-shadow-[0_0_6px_rgba(194,59,51,0.6)]">
            Only {n} Seats Left!
          </span>
        </span>
      </div>
    );
  }

  // default — two-line stacked layout (desktop hero)
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {/* Line 1 — "FILLING FAST 🔥" */}
      <span className="font-utility text-[11px] font-black uppercase tracking-widest text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]">
        Filling Fast 🔥
      </span>

      {/* Line 2 — whole sentence blinks together */}
      <span className="inline-flex animate-[blink_1s_step-start_infinite] items-center gap-1.5">
        <Dot />
        <span className="font-utility text-[11px] font-bold uppercase tracking-wide text-sindoor drop-shadow-[0_0_4px_rgba(194,59,51,0.5)]">
          Only {n} Seats Left!
        </span>
      </span>
    </div>
  );
}
