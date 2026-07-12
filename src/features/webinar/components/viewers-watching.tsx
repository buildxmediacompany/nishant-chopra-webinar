"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Simulated "N people watching now" live pill — a soft urgency cue. The count
 * random-walks around a base within a small band every few seconds. Starts at
 * the base on both server and client (no hydration mismatch); only fluctuates
 * in the effect.
 */
export function ViewersWatching({
  base = 87,
  className,
}: {
  base?: number;
  className?: string;
}) {
  const [n, setN] = useState(base);

  useEffect(() => {
    const iv = setInterval(() => {
      setN((c) => {
        const next = c + (Math.floor(Math.random() * 5) - 2); // -2..+2
        return Math.min(102, Math.max(base - 8, next));
      });
    }, 2800);
    return () => clearInterval(iv);
  }, [base]);

  const label = n > 100 ? "100+" : String(n);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-stage-line bg-stage-raised/70 px-3 py-1 font-utility text-xs font-medium text-cream-dim",
        className
      )}
    >
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34d399] opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-[#34d399]" />
      </span>
      <Eye className="size-3.5 text-marigold" />
      <span className="font-semibold text-cream">{label}</span> watching now
    </span>
  );
}
