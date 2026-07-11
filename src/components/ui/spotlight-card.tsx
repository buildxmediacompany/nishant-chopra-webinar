"use client";

import React, { useEffect, useRef, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  /** When true, ignores `size` and uses width/height or className. */
  customSize?: boolean;
  /** Adds perspective + preserve-3d so children can translateZ on hover. */
  enable3d?: boolean;
}

// Hue bases. `orange` lands on the marigold gold, `red` on the sindoor
// vermilion — the two brand accents.
const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "orange",
  size = "md",
  width,
  height,
  customSize = false,
  enable3d = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const setVar = (name: string, value: string) =>
      card.style.setProperty(name, value);

    // Coordinates are card-relative, so the spotlight only ever exists inside
    // the card's own box — never in the viewport band above or beside it.
    const syncPointer = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setVar("--x", x.toFixed(2));
      setVar("--y", y.toFixed(2));
      setVar("--xp", (x / rect.width).toFixed(3));
      setVar("--yp", (y / rect.height).toFixed(3));
    };

    const activate = (e: PointerEvent) => {
      syncPointer(e);
      setVar("--active", "1");
    };
    const deactivate = () => setVar("--active", "0");

    card.addEventListener("pointerenter", activate);
    card.addEventListener("pointermove", syncPointer);
    card.addEventListener("pointerleave", deactivate);
    card.addEventListener("pointercancel", deactivate);

    return () => {
      card.removeEventListener("pointerenter", activate);
      card.removeEventListener("pointermove", syncPointer);
      card.removeEventListener("pointerleave", deactivate);
      card.removeEventListener("pointercancel", deactivate);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => (customSize ? "" : sizeMap[size]);

  const getInlineStyles = () => {
    const baseStyles: Record<string, string | number> = {
      "--base": base,
      "--spread": spread,
      "--radius": "14",
      "--border": "3",
      "--backdrop": "hsl(0 0% 60% / 0.12)",
      "--backup-border": "var(--backdrop)",
      "--size": "200",
      "--active": "0",
      "--outer": "var(--active)",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / calc(var(--bg-spot-opacity, 0.1) * var(--active))), transparent
      )`,
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize: "100% 100%",
      backgroundPosition: "0 0",
      backgroundOrigin: "border-box",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
      // pan-y lets vertical page scroll pass through on touch devices (mouse
      // pointermove that drives the glow is unaffected by touch-action).
      touchAction: "pan-y",
    };

    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles as React.CSSProperties;
  };

  // `--active` is registered so it animates — the glow fades on enter/leave
  // instead of snapping. Pseudo boxes sit one border-width outside the card,
  // so their gradient centre is shifted back by that amount to stay under the
  // cursor.
  const beforeAfterStyles = `
    @property --active {
      syntax: "<number>";
      inherits: true;
      initial-value: 0;
    }

    [data-glow] {
      transition: --active 200ms ease-out;
    }

    @media (prefers-reduced-motion: reduce) {
      [data-glow] { transition: none; }
    }

    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-origin: border-box;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }

    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px + var(--border-size))
        calc(var(--y, 0) * 1px + var(--border-size)),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / calc(var(--border-spot-opacity, 1) * var(--active))), transparent 100%
      );
      filter: brightness(2);
    }

    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px + var(--border-size))
        calc(var(--y, 0) * 1px + var(--border-size)),
        hsl(0 100% 100% / calc(var(--border-light-opacity, 1) * var(--active))), transparent 100%
      );
    }

    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }

    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          ${enable3d ? "[perspective:1000px] [transform-style:preserve-3d]" : ""}
          group
          rounded-2xl
          relative
          shadow-[0_1rem_2rem_-1rem_black]
          backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard };
