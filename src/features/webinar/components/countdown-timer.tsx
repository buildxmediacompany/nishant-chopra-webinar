"use client";

import { useEffect, useState } from "react";

function getRemaining(targetAt: string) {
  const diff = Math.max(0, new Date(targetAt).getTime() - Date.now());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

/** Ticking hours:minutes:seconds countdown to the webinar's countdownTargetAt. */
export function CountdownTimer({ targetAt }: { targetAt: string }) {
  const [remaining, setRemaining] = useState(() => getRemaining(targetAt));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(targetAt)), 1000);
    return () => clearInterval(id);
  }, [targetAt]);

  const units = [
    { label: "Hrs", value: remaining.hours },
    { label: "Min", value: remaining.minutes },
    { label: "Sec", value: remaining.seconds },
  ];

  return (
    <div className="flex items-center gap-2" role="timer" aria-live="off">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="font-utility text-xl font-semibold tabular-nums leading-none text-cream">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="font-utility text-[10px] uppercase tracking-wider text-cream-faint">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-marigold/50 -mt-3">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
