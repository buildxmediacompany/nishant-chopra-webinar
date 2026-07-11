"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Simulated live-signup social proof — a small card that pops in above the
 * mobile CTA bar cycling through "<name> from <city> registered N min ago".
 * Purely a nudge; no real data. Names/cities/minutes are a fixed list so the
 * server and first client render match (no hydration mismatch), and the
 * rotation only starts in an effect.
 */
const SIGNUPS = [
  { name: "Priya S.", city: "Mumbai", mins: 2 },
  { name: "Rahul M.", city: "Delhi", mins: 4 },
  { name: "Ananya R.", city: "Pune", mins: 6 },
  { name: "Arjun K.", city: "Bangalore", mins: 3 },
  { name: "Sneha P.", city: "Jaipur", mins: 8 },
  { name: "Vikram N.", city: "Hyderabad", mins: 5 },
  { name: "Neha G.", city: "Kolkata", mins: 7 },
  { name: "Karan D.", city: "Chandigarh", mins: 9 },
  { name: "Meera J.", city: "Ahmedabad", mins: 4 },
  { name: "Rohan T.", city: "Lucknow", mins: 11 },
];

const GRADIENTS = [
  "from-[#f7d489] to-[#c2843b]",
  "from-[#e8a93b] to-[#a8541f]",
  "from-[#c23b33] to-[#7a241f]",
  "from-[#f4c766] to-[#b7802a]",
  "from-[#e0895a] to-[#9c4a2c]",
];

export function RegistrationToast({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideId: ReturnType<typeof setTimeout>;
    const show = () => {
      setVisible(true);
      clearTimeout(hideId);
      hideId = setTimeout(() => setVisible(false), 4200);
    };
    const start = setTimeout(show, 1200);
    const iv = setInterval(() => {
      setIdx((i) => (i + 1) % SIGNUPS.length);
      show();
    }, 6500);
    return () => {
      clearTimeout(start);
      clearTimeout(hideId);
      clearInterval(iv);
    };
  }, []);

  const s = SIGNUPS[idx];
  const initial = s.name.charAt(0);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className
      )}
    >
      <div className="flex w-full items-center gap-3 rounded-xl border border-stage-line bg-stage-raised/95 p-2.5 shadow-raised backdrop-blur">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-utility text-sm font-bold text-ink/80",
            GRADIENTS[idx % GRADIENTS.length]
          )}
        >
          {initial}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate font-body text-xs text-cream">
            <b className="font-semibold">{s.name}</b> from {s.city}
          </span>
          <span className="block font-body text-[11px] text-cream-faint">
            registered {s.mins} min ago
          </span>
        </span>
        <span className="relative ml-0.5 flex size-2 shrink-0">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34d399] opacity-70" />
          <span className="relative inline-flex size-2 rounded-full bg-[#34d399]" />
        </span>
      </div>
    </div>
  );
}
