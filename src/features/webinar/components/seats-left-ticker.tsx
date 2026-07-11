"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Seats shown on first paint, before the slow countdown begins. */
const START_SEATS = 20;
/** One seat "sells" every 5 minutes until the real (admin) count is reached. */
const TICK_MS = 5 * 60 * 1000;

/**
 * Renders the admin's seats-left copy with a simulated live tick: the first
 * number in the string starts at 20 and counts down one every 5 minutes to
 * the real value, then holds. Keeps the admin's phrasing ("Filling Fast Only
 * N Seats Left") — we only swap the number. Red + blinking with a live dot.
 *
 * The initial render uses the start value on both server and client, so there
 * is no hydration mismatch; the countdown only runs in the effect.
 */
export function SeatsLeftTicker({
  text,
  className,
}: {
  text: string;
  className?: string;
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

  const display = finalN != null ? text.replace(/\d+/, String(n)) : text;

  return (
    <p
      className={cn(
        "inline-flex animate-pulse items-center gap-2 font-utility text-sm font-semibold uppercase tracking-wide text-sindoor",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full bg-sindoor shadow-[0_0_8px_2px_rgba(194,59,51,0.6)]"
      />
      {display}
    </p>
  );
}
