import { cn } from "@/lib/utils";
import { DynamicIcon } from "./icon-map";

/**
 * Bespoke, subject-grounded graphics — the vocal motif family. Pure SVG/CSS,
 * no deps, server-renderable. Animation falls still under prefers-reduced-motion
 * via the global transition/animation kill in globals.css.
 */

/** Equalizer bars = "the voice". Staggered scaleY loop; heights vary per bar. */
export function Waveform({
  bars = 20,
  className,
  barClassName,
  /** "hover" keeps the bars still until an ancestor `.group` is hovered. */
  animate = "always",
}: {
  bars?: number;
  className?: string;
  barClassName?: string;
  animate?: "always" | "hover";
}) {
  return (
    <div
      className={cn("flex items-center justify-center gap-[3px]", className)}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => {
        // Smooth pseudo-random silhouette so it reads as a real waveform.
        const height = 30 + Math.round(70 * Math.abs(Math.sin(i * 1.1 + 0.5)));
        return (
          <span
            key={i}
            className={cn(
              "block w-[3px] shrink-0 origin-center rounded-full bg-marigold/70",
              animate === "hover" &&
                "[animation-play-state:paused] group-hover:[animation-play-state:running]",
              barClassName
            )}
            style={{
              height: `${height}%`,
              animation: "eq 1.1s ease-in-out infinite",
              animationDelay: `${(i % 7) * 0.11}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/** The sur ladder (Sa Re Ga Ma Pa) rising — learning to reach the high notes. */
export function SurLadder({ className }: { className?: string }) {
  const notes = ["Sa", "Re", "Ga", "Ma", "Pa"];
  const points = notes.map((label, i) => ({
    label,
    x: 14 + i * 24,
    y: 138 - i * 28,
  }));
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 128 152"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="var(--color-marigold)"
        strokeWidth="1.5"
        strokeOpacity="0.45"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      {points.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="var(--color-marigold)" />
          <text
            x={p.x}
            y={p.y - 11}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-utility)"
            fill="var(--color-marigold-soft)"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── Feature line-art ─────────────────────────────────────────────────────
   Bespoke glyphs for the "Why" bento. All share viewBox 0 0 40 40, stroke
   currentColor at one weight — so the parent's text-marigold + size-* control
   color and size exactly like a lucide icon. Unmatched names fall back to
   the admin-picked lucide icon (FeatureGlyph). */

type GlyphProps = { className?: string };

const svgBase = {
  viewBox: "0 0 40 40",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Beamed note pair + up-chevron = reaching the high notes. */
function GlyphHighNotes({ className }: GlyphProps) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <circle cx="12" cy="29" r="3.5" />
      <circle cx="25" cy="26" r="3.5" />
      <path d="M15.5 29V13l13-3v16" />
      <path d="M30 15l4-4 4 4" />
    </svg>
  );
}

/** Equalizer bars = the voice. */
function GlyphWaves({ className }: GlyphProps) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M9 23v-6M16 27V13M23 30V10M30 25v-8M35 22v-4" />
    </svg>
  );
}

/** Microphone. */
function GlyphMic({ className }: GlyphProps) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <rect x="15" y="6" width="10" height="17" rx="5" />
      <path d="M11 19a9 9 0 0 0 18 0" />
      <path d="M20 28v6M14 34h12" />
    </svg>
  );
}

/** Rising line with an arrowhead = fast progress / growth. */
function GlyphGrowth({ className }: GlyphProps) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M7 30l10-10 6 6 10-11" />
      <path d="M27 15h6v6" />
    </svg>
  );
}

/** Calendar with a check = a structured plan / results by day 7. */
function GlyphCalendar({ className }: GlyphProps) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <rect x="7" y="9" width="26" height="24" rx="3" />
      <path d="M7 16h26M14 6v6M26 6v6" />
      <path d="M15 24l3.5 3.5L26 20" />
    </svg>
  );
}

/** Shield with a check = confidence / no more throat strain. */
function GlyphShield({ className }: GlyphProps) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M20 6l12 5v8c0 7-6 12-12 14-6-2-12-7-12-14v-8z" />
      <path d="M15 20l3.5 3.5L26 16" />
    </svg>
  );
}

function resolveGlyphKey(name: string): string {
  const n = name.toLowerCase();
  if (/mic/.test(n)) return "mic";
  if (/wave|audio|music|radio|theater/.test(n)) return "waves";
  if (/trend|arrowup|narrowwide|star|spark|guitar/.test(n)) return "highnotes";
  if (/sprout|seed|leaf|grow|heart|shower/.test(n)) return "growth";
  if (/calendar|check2|list|clock|question/.test(n)) return "calendar";
  if (/shield|guard|lock|award|graduation|alert/.test(n)) return "shield";
  return "lucide";
}

/** Bespoke vocal glyph when the icon name maps to one, else the lucide icon. */
export function FeatureGlyph({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  switch (resolveGlyphKey(name)) {
    case "mic":
      return <GlyphMic className={className} />;
    case "waves":
      return <GlyphWaves className={className} />;
    case "highnotes":
      return <GlyphHighNotes className={className} />;
    case "growth":
      return <GlyphGrowth className={className} />;
    case "calendar":
      return <GlyphCalendar className={className} />;
    case "shield":
      return <GlyphShield className={className} />;
    default:
      return <DynamicIcon name={name} className={className} />;
  }
}

/** A single eighth/quarter note glyph. */
function NoteGlyph({ variant, className }: { variant: 0 | 1; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {variant === 0 ? (
        <path d="M9 18a3 3 0 1 1-2-2.83V4l10-2v3L9 6.8V18z" />
      ) : (
        <path d="M8 17a2.5 2.5 0 1 1-1.7-2.37V3h1.7v14zm8 2a2.5 2.5 0 1 1-1.7-2.37V5H16v14zM8 3h8v2H8V3z" />
      )}
    </svg>
  );
}

// Deterministic scatter — hardcoded so server and client markup match exactly
// (a Math.random() here would hydrate-mismatch).
const NOTES_UP = [
  { left: "6%", delay: 0, dur: 15, size: 20, variant: 0 as const },
  { left: "19%", delay: 5.5, dur: 18, size: 14, variant: 1 as const },
  { left: "33%", delay: 2.4, dur: 16, size: 17, variant: 0 as const },
  { left: "48%", delay: 8.2, dur: 20, size: 13, variant: 1 as const },
  { left: "62%", delay: 1.2, dur: 17, size: 22, variant: 0 as const },
  { left: "77%", delay: 6.8, dur: 19, size: 15, variant: 1 as const },
  { left: "91%", delay: 3.6, dur: 16, size: 18, variant: 0 as const },
];

// Offset from the rising set's columns, so falling notes never trace the same
// vertical line as a rising one.
const NOTES_DOWN = [
  { left: "12%", delay: 4.1, dur: 19, size: 16, variant: 1 as const },
  { left: "27%", delay: 9.3, dur: 17, size: 21, variant: 0 as const },
  { left: "41%", delay: 1.8, dur: 21, size: 13, variant: 1 as const },
  { left: "56%", delay: 6.2, dur: 16, size: 18, variant: 0 as const },
  { left: "70%", delay: 3.0, dur: 20, size: 15, variant: 1 as const },
  { left: "85%", delay: 7.7, dur: 18, size: 19, variant: 0 as const },
];

// Scattered across the full box rather than anchored to an edge. Positions are
// eyeballed to avoid clustering and to leave the optical centre (where headline
// copy sits) sparser than the margins.
//
// dx/dy are the wander vector, and the loop alternates — each note sinks along
// it and rises back forever. dy is always positive so every note falls rather
// than bobbing in a random direction; the travel is long enough (44–78px) to
// register as motion at a glance, while the sideways drift stays small so they
// read as sinking, not sliding.
const NOTES_SCATTER = [
  { top: "6%", left: "9%", size: 18, dur: 11, delay: 0, dx: "14px", dy: "62px", r: "14deg", variant: 0 as const },
  { top: "14%", left: "88%", size: 15, dur: 13, delay: 1.6, dx: "-18px", dy: "48px", r: "-16deg", variant: 1 as const },
  { top: "4%", left: "62%", size: 13, dur: 15, delay: 3.1, dx: "-11px", dy: "70px", r: "12deg", variant: 1 as const },
  { top: "24%", left: "4%", size: 21, dur: 12, delay: 2.4, dx: "17px", dy: "55px", r: "-13deg", variant: 1 as const },
  { top: "29%", left: "94%", size: 17, dur: 14, delay: 4.2, dx: "-15px", dy: "66px", r: "15deg", variant: 0 as const },
  { top: "42%", left: "13%", size: 14, dur: 16, delay: 1.1, dx: "20px", dy: "44px", r: "-11deg", variant: 0 as const },
  { top: "50%", left: "81%", size: 20, dur: 12, delay: 3.5, dx: "-13px", dy: "72px", r: "17deg", variant: 1 as const },
  { top: "36%", left: "48%", size: 12, dur: 17, delay: 5.3, dx: "10px", dy: "50px", r: "-14deg", variant: 0 as const },
  { top: "64%", left: "6%", size: 16, dur: 13, delay: 4.7, dx: "16px", dy: "58px", r: "13deg", variant: 1 as const },
  { top: "70%", left: "91%", size: 19, dur: 15, delay: 1.9, dx: "-19px", dy: "46px", r: "-15deg", variant: 0 as const },
  { top: "78%", left: "35%", size: 14, dur: 11, delay: 5.8, dx: "12px", dy: "78px", r: "16deg", variant: 1 as const },
  { top: "84%", left: "70%", size: 17, dur: 14, delay: 2.7, dx: "-16px", dy: "52px", r: "-12deg", variant: 0 as const },
];

/**
 * Musical notes drifting behind a section at 5–10% opacity. Purely ambient:
 * aria-hidden, pointer-events-none, and stilled by the global reduced-motion
 * rule.
 *
 * `direction` picks how they travel — "up" rises from the bottom, "down" falls
 * from the top, "both" does each with non-overlapping columns, and "scatter"
 * strews them across the whole box, each wandering a short loop in place.
 */
export function DriftingNotes({
  className,
  direction = "up",
}: {
  className?: string;
  direction?: "up" | "down" | "both" | "scatter";
}) {
  const rising = direction === "up" || direction === "both";
  const falling = direction === "down" || direction === "both";

  if (direction === "scatter") {
    return (
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      >
        {NOTES_SCATTER.map((n, i) => (
          <span
            key={`scatter-${i}`}
            className="absolute block text-marigold opacity-[0.16]"
            style={
              {
                top: n.top,
                left: n.left,
                width: n.size,
                height: n.size,
                "--dx": n.dx,
                "--dy": n.dy,
                "--r": n.r,
                animation: `note-wander ${n.dur}s ease-in-out ${n.delay}s infinite alternate`,
              } as React.CSSProperties
            }
          >
            <NoteGlyph variant={n.variant} className="size-full" />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {rising &&
        NOTES_UP.map((n, i) => (
          <span
            key={`up-${i}`}
            className="absolute bottom-0 block text-marigold opacity-[0.07]"
            style={{
              left: n.left,
              width: n.size,
              height: n.size,
              animation: `note-drift ${n.dur}s linear ${n.delay}s infinite`,
            }}
          >
            <NoteGlyph variant={n.variant} className="size-full" />
          </span>
        ))}
      {falling &&
        NOTES_DOWN.map((n, i) => (
          <span
            key={`down-${i}`}
            className="absolute top-0 block text-marigold opacity-[0.07]"
            style={{
              left: n.left,
              width: n.size,
              height: n.size,
              animation: `note-drift-down ${n.dur}s linear ${n.delay}s infinite`,
            }}
          >
            <NoteGlyph variant={n.variant} className="size-full" />
          </span>
        ))}
    </div>
  );
}
