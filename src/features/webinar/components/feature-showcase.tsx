"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FeatureGlyph, Waveform, DriftingNotes } from "./vocal-motifs";
import { PointerSpotlight } from "./pointer-spotlight";

type Feature = { id: string; title: string; description: string; iconName: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/** One editorial card. Alternates side; lifts 6px; glows behind on hover. */
function FeatureCard({
  feature,
  index,
  reversed,
  onSeen,
  seen,
}: {
  feature: Feature;
  index: number;
  reversed: boolean;
  onSeen: (i: number) => void;
  seen: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (inView) onSeen(index);
  }, [inView, index, onSeen]);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn(
        "group relative isolate grid items-center gap-6 rounded-2xl bg-stage-raised/60 p-7 shadow-soft",
        "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1.5 hover:shadow-raised",
        "sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-9",
        reversed && "sm:grid-flow-dense"
      )}
    >
      {/* Radial glow that only exists while this card is hovered. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(60%_70%_at_50%_0%,var(--color-marigold-dim),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        className={cn(
          "flex flex-col items-center gap-4",
          reversed && "sm:col-start-2"
        )}
      >
        <div className="flex size-16 items-center justify-center rounded-2xl bg-marigold-dim">
          <FeatureGlyph
            name={feature.iconName}
            className="size-8 text-marigold [animation:float-y_4s_ease-in-out_infinite] motion-reduce:animate-none"
          />
        </div>
        {/* Waveform stays still until the card is hovered. */}
        <Waveform bars={9} animate="hover" className="h-5 w-16" />
      </div>

      <div className={cn(reversed && "sm:col-start-1 sm:row-start-1 sm:text-right")}>
        <motion.h3
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
          className="font-display text-xl font-semibold leading-snug text-cream sm:text-2xl"
        >
          {feature.title}
        </motion.h3>

        {/* Divider grows left→right (right→left on reversed rows). */}
        <motion.div
          aria-hidden
          initial={reduced ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className={cn(
            "mt-4 h-px w-20 bg-gradient-to-r from-marigold to-transparent",
            reversed ? "origin-right sm:ml-auto sm:bg-gradient-to-l" : "origin-left"
          )}
        />

        {/* Description fades in just after the title. */}
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.45, ease: EASE, delay: 0.28 }}
          className="mt-4 font-body text-[15px] leading-relaxed text-cream-dim"
        >
          {feature.description}
        </motion.p>
      </div>

      {/* Scroll progress: the rail lights up once this item has been seen. */}
      <span
        aria-hidden
        className={cn(
          "absolute -left-px top-8 hidden h-[calc(100%-4rem)] w-0.5 rounded-full transition-colors duration-500 lg:block",
          seen ? "bg-marigold/50" : "bg-stage-line"
        )}
      />
    </motion.div>
  );
}

export function FeatureShowcase({ features }: { features: Feature[] }) {
  const [seenCount, setSeenCount] = useState(0);

  const markSeen = (i: number) => setSeenCount((c) => Math.max(c, i + 1));

  if (features.length === 0) return null;

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28">
      {/* Ambient: notes drifting up, and a spotlight tracking the cursor. */}
      <DriftingNotes />
      <PointerSpotlight />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-utility text-sm font-semibold uppercase tracking-[0.22em] text-marigold">
            Built for real singers
          </p>
          {/* One gold sweep across the heading as it enters. */}
          <h2 className="gold-sweep mt-3 font-display text-[1.75rem] font-semibold leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
            Why This Workshop Is a Game-Changer
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-6">
          {features.map((f, i) => (
            <FeatureCard
              key={f.id}
              feature={f}
              index={i}
              reversed={i % 2 === 1}
              onSeen={markSeen}
              seen={i < seenCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
