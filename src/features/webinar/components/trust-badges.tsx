import {
  Award,
  BadgeCheck,
  Infinity as InfinityIcon,
  LifeBuoy,
  Star,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  check: BadgeCheck,
  star: Star,
  trophy: Trophy,
  users: Users,
  infinity: InfinityIcon,
  support: LifeBuoy,
  award: Award,
  video: Video,
} as const;

export type BadgeIcon = keyof typeof ICONS;

/**
 * A gold ribbon medallion — the client's reference badge style, rebuilt as SVG
 * so it scales, themes, and needs no raster asset. Gold rim + ribbon tails, a
 * dark stage-toned face, and a lucide glyph centered in it.
 */
export function TrustBadge({
  icon,
  label,
  className,
}: {
  icon: BadgeIcon;
  label: string;
  className?: string;
}) {
  // Gradient ids must be unique per rendered badge; derive from the label so
  // this stays a server component (no useId hook).
  const gid = `${icon}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const Icon = ICONS[icon];

  return (
    <li className={cn("flex w-28 flex-col items-center text-center", className)}>
      <div className="relative size-20">
        <svg viewBox="0 0 80 96" className="size-full" aria-hidden="true">
          <defs>
            {/* Angled gold so the rim reads as metal, not a flat ring. */}
            <linearGradient id={`rim-${gid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f7d489" />
              <stop offset="38%" stopColor="#e8a93b" />
              <stop offset="62%" stopColor="#b7802a" />
              <stop offset="100%" stopColor="#f4c766" />
            </linearGradient>
            <linearGradient id={`ribbon-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8a93b" />
              <stop offset="100%" stopColor="#a86f22" />
            </linearGradient>
          </defs>

          {/* Ribbon tails, tucked behind the medallion. */}
          <path d="M27 58L18 92l12-7 6 6 3-27z" fill={`url(#ribbon-${gid})`} />
          <path d="M53 58l9 34-12-7-6 6-3-27z" fill={`url(#ribbon-${gid})`} />

          {/* Rim, inner bevel, dark face. */}
          <circle cx="40" cy="36" r="32" fill={`url(#rim-${gid})`} />
          <circle cx="40" cy="36" r="27" fill="#2a171b" opacity="0.35" />
          <circle cx="40" cy="36" r="25" fill={`url(#rim-${gid})`} opacity="0.55" />
          <circle cx="40" cy="36" r="22" fill="#1b0f12" />
        </svg>

        {/* Glyph centered on the medallion face. */}
        <span className="pointer-events-none absolute inset-x-0 top-[16%] flex h-[46%] items-center justify-center">
          <Icon className="size-7 text-marigold-soft" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>

      <span className="mt-2 font-utility text-xs font-semibold uppercase leading-tight tracking-wide text-cream-dim">
        {label}
      </span>
    </li>
  );
}

/** A row of medallions. Renders nothing when there's nothing to show. */
export function TrustBadges({
  badges,
  className,
}: {
  badges: { icon: BadgeIcon; label: string }[];
  className?: string;
}) {
  if (badges.length === 0) return null;
  return (
    <ul
      className={cn(
        "flex flex-wrap items-start justify-center gap-x-6 gap-y-6 sm:gap-x-10",
        className
      )}
    >
      {badges.map((b) => (
        <TrustBadge key={b.label} icon={b.icon} label={b.label} />
      ))}
    </ul>
  );
}
