import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

/**
 * Resolves an admin-picked icon name (stored as plain text, e.g. "Mic2")
 * to its lucide-react component. Falls back to Sparkles if the name is
 * missing or no longer exists in the icon set.
 */
export function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = (icons as unknown as Record<string, React.ComponentType<LucideProps>>)[
    name
  ];
  const Fallback = icons.Sparkles;
  const Comp = Icon ?? Fallback;
  return <Comp {...props} />;
}

/** A curated subset offered in the admin icon picker (kept short & on-theme). */
export const ICON_OPTIONS = [
  "Mic2",
  "AudioWaveform",
  "Music",
  "Music4",
  "TrendingUp",
  "MessageCircleQuestion",
  "ArrowUpNarrowWide",
  "Waves",
  "Sprout",
  "CalendarCheck2",
  "Radio",
  "ListChecks",
  "ShieldCheck",
  "Sparkle",
  "ShowerHead",
  "Theater",
  "Star",
  "AlertTriangle",
  "GraduationCap",
  "Guitar",
  "Gift",
  "Award",
  "Users",
  "Heart",
] as const;
