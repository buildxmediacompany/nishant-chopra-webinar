"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Confetti
───────────────────────────────────────────────────────────── */
interface Particle {
  x: number; y: number; vx: number; vy: number;
  color: string; rotation: number; rotationSpeed: number;
  size: number; shape: "rect" | "circle" | "star"; opacity: number;
}
const COLORS = ["#e8a93b","#f4c766","#c23b33","#f3e9dd","#4ade80","#60a5fa","#f472b6","#a78bfa","#fb923c","#facc15"];
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function mkParticle(w: number): Particle {
  return {
    x: rnd(0, w), y: rnd(-200, -10),
    vx: rnd(-3, 3), vy: rnd(2, 6),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: rnd(0, Math.PI * 2), rotationSpeed: rnd(-0.1, 0.1),
    size: rnd(7, 15),
    shape: (["rect","circle","star"] as const)[Math.floor(Math.random() * 3)],
    opacity: 1,
  };
}

function drawStar(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r) : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
  }
  ctx.closePath();
}

function ConfettiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf: number, particles: Particle[] = [], frame = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 180; i++) {
      const p = mkParticle(canvas.width);
      p.y = rnd(-400, canvas.height * 0.5); p.vy = rnd(1, 5);
      particles.push(p);
    }
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame < 500 && Math.random() < 0.55) particles.push(mkParticle(canvas.width));
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotationSpeed; p.vy += 0.07;
        if (p.y > canvas.height + 20) p.opacity -= 0.04;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.fillStyle = p.color;
        if (p.shape === "rect") ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
        else if (p.shape === "circle") { ctx.beginPath(); ctx.arc(0,0,p.size/2.5,0,Math.PI*2); ctx.fill(); }
        else { drawStar(ctx, p.size/2); ctx.fill(); }
        ctx.restore();
      }
      particles = particles.filter(p => p.opacity > 0);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:50 }} />;
}

/* ─────────────────────────────────────────────────────────────
   Progress bar — compact, clean, mobile-safe
   Label + small "25% left" chip on one row, then the bar
───────────────────────────────────────────────────────────── */
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => { const t = setTimeout(() => setPct(75), 350); return () => clearTimeout(t); }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* Row: label + 25% chip */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px", gap:"8px", flexWrap:"wrap" }}>
        <span style={{ fontFamily:"var(--font-body)", fontSize:"0.85rem", color:"var(--color-cream-dim)", lineHeight:1.3 }}>
          You are <strong style={{ color:"var(--color-marigold-soft)" }}>almost there</strong> — join the WhatsApp community for workshop access
        </span>
        {/* 25% left chip */}
        <span style={{
          flexShrink: 0,
          background: "rgba(194,59,51,0.15)",
          border: "1.5px solid rgba(194,59,51,0.6)",
          borderRadius: "999px",
          padding: "3px 10px",
          fontFamily: "var(--font-utility)",
          fontWeight: 700,
          fontSize: "0.78rem",
          letterSpacing: "0.05em",
          color: "#f87171",
          whiteSpace: "nowrap",
        }}>
          25% left
        </span>
      </div>

      {/* Bar track */}
      <div style={{
        height: "28px",
        borderRadius: "9999px",
        background: "rgba(243,233,221,0.07)",
        border: "1px solid rgba(232,169,59,0.2)",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Fill */}
        <div style={{
          height: "100%",
          width: `${pct}%`,
          borderRadius: "9999px",
          background: "linear-gradient(90deg,#c23b33 0%,#e8a93b 60%,#f4c766 100%)",
          transition: "width 1.8s cubic-bezier(0.22,1,0.36,1)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "12px",
        }}>
          {/* shimmer */}
          <span style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.25) 50%,transparent 80%)",
            animation: "barShimmer 2s linear infinite",
          }} />
          {/* 75% label pinned right inside filled area */}
          <span style={{
            position: "relative",
            fontFamily: "var(--font-utility)",
            fontWeight: 800,
            fontSize: "0.8rem",
            color: "#1b0f12",
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
            opacity: pct > 0 ? 1 : 0,
            transition: "opacity 0.5s 1s",
          }}>
            75% ✓
          </span>
        </div>
      </div>

      {/* Step labels */}
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:"7px", fontFamily:"var(--font-body)", fontSize:"0.72rem" }}>
        <span style={{ color:"var(--color-marigold)" }}>✔ Registered</span>
        <span style={{ color:"var(--color-cream-faint)" }}>Join WhatsApp → 100% 🎯</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Urgency banner
───────────────────────────────────────────────────────────── */
function UrgencyBanner() {
  return (
    <div style={{
      marginTop: "1rem",
      background: "linear-gradient(135deg,rgba(194,59,51,0.18),rgba(194,59,51,0.08))",
      border: "1.5px solid rgba(194,59,51,0.5)",
      borderRadius: "12px",
      padding: "0.75rem 1rem",
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
    }}>
      <span style={{
        flexShrink: 0, marginTop: "3px",
        width: "9px", height: "9px", borderRadius: "50%", background: "#c23b33",
        animation: "urgentPulse 1.4s ease-out infinite",
        display: "inline-block",
      }} />
      <p style={{ margin:0, fontFamily:"var(--font-body)", fontSize:"0.88rem", fontWeight:600, color:"#f3e9dd", lineHeight:1.45 }}>
        ⚡ Join now — workshop details &amp; Zoom link are{" "}
        <strong style={{ color:"#f4c766" }}>shared only inside the WhatsApp group</strong>
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function ThankYouPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @keyframes barShimmer { from{transform:translateX(-150%)} to{transform:translateX(200%)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounceIn { 0%{transform:scale(0.5);opacity:0} 65%{transform:scale(1.1);opacity:1} 100%{transform:scale(1)} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(232,169,59,0.55)} 70%{box-shadow:0 0 0 16px rgba(232,169,59,0)} 100%{box-shadow:0 0 0 0 rgba(232,169,59,0)} }
        @keyframes waBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-6px) scale(1.03)} }
        @keyframes urgentPulse { 0%{box-shadow:0 0 0 0 rgba(194,59,51,0.7)} 70%{box-shadow:0 0 0 8px rgba(194,59,51,0)} 100%{box-shadow:0 0 0 0 rgba(194,59,51,0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-14px) rotate(4deg)} }
      `}</style>

      {/* Confetti — z-50, above everything */}
      <ConfettiCanvas />

      {/* Page background */}
      <div style={{ position:"fixed", inset:0, background:"radial-gradient(ellipse 90% 55% at 50% 0%, rgba(232,169,59,0.13) 0%, transparent 65%), #1b0f12", zIndex:0 }} />

      {/* Subtle floating emojis — hidden on very small screens via opacity only */}
      {["🎉","🎊","🔥","🌟","🎵","💫"].map((em, i) => (
        <span key={i} aria-hidden style={{
          position:"fixed",
          fontSize:"1.4rem",
          top:`${10 + (i*14) % 75}%`,
          left: i % 2 === 0 ? `${1 + i}%` : undefined,
          right: i % 2 !== 0 ? `${1 + i}%` : undefined,
          pointerEvents:"none", zIndex:1, opacity:0.35,
          animation:`floatY ${4+i*0.8}s ease-in-out ${i*0.35}s infinite`,
        }}>{em}</span>
      ))}

      <main style={{
        position:"relative", zIndex:2,
        minHeight:"100vh",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"1.5rem 1rem",
      }}>
        <div style={{
          maxWidth:"520px", width:"100%",
          background:"var(--color-stage-raised)",
          border:"1px solid rgba(232,169,59,0.22)",
          borderRadius:"24px",
          padding:"clamp(1.5rem,5vw,2.75rem)",
          boxShadow:"0 32px 80px -24px rgba(0,0,0,0.9)",
          position:"relative", zIndex:10,
          animation: visible ? "fadeSlideUp 0.65s cubic-bezier(0.22,1,0.36,1) both" : "none",
        }}>

          {/* Gold check */}
          <div aria-hidden style={{
            width:"68px", height:"68px", borderRadius:"50%",
            background:"linear-gradient(135deg,#e8a93b,#f4c766)",
            display:"flex", alignItems:"center", justifyContent:"center",
            margin:"0 auto 1.25rem", fontSize:"2rem", color:"#1b0f12", fontWeight:900,
            animation:"bounceIn 0.75s cubic-bezier(0.22,1,0.36,1) 0.15s both, pulseRing 2.2s ease-out 1s infinite",
          }}>✓</div>

          {/* Headline */}
          <h1 style={{
            fontFamily:"var(--font-display)",
            fontSize:"clamp(1.65rem,5vw,2.4rem)",
            fontWeight:700, textAlign:"center", color:"var(--color-cream)",
            lineHeight:1.2, margin:"0 0 0.5rem",
          }}>You&apos;re Registered! 🎉</h1>

          <p style={{
            textAlign:"center", color:"var(--color-cream-dim)",
            fontFamily:"var(--font-body)", fontSize:"0.95rem",
            lineHeight:1.6, margin:"0 0 1.75rem",
          }}>
            Your seat is confirmed for the Live Vocal Masterclass with{" "}
            <strong style={{ color:"var(--color-marigold-soft)" }}>Nishant Chopra</strong>.
            {" "}Complete one last step below ↓
          </p>

          {/* Progress bar */}
          <div style={{ marginBottom:"1.75rem" }}>
            <ProgressBar />
          </div>

          {/* WhatsApp CTA */}
          <a
            id="whatsapp-community-cta"
            href="https://chat.whatsapp.com/FySthP6uomQ5Uolv9PpFC9?s=cl&p=a&ilr=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",
              width:"100%", padding:"1rem 1.25rem", borderRadius:"14px",
              background:"linear-gradient(135deg,#25d366 0%,#128c4e 100%)",
              color:"#fff", fontFamily:"var(--font-utility)", fontWeight:700,
              fontSize:"1rem", letterSpacing:"0.05em", textTransform:"uppercase",
              textDecoration:"none",
              boxShadow:"0 8px 28px -8px rgba(37,211,102,0.55)",
              animation:"waBounce 2.5s ease-in-out 1.6s infinite",
              transition:"filter 0.2s",
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.filter="brightness(1.1)"; el.style.animation="none"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.filter=""; el.style.animation="waBounce 2.5s ease-in-out 1.6s infinite"; }}
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
              <path d="M16 4C9.373 4 4 9.373 4 16c0 2.376.69 4.593 1.882 6.462L4 28l5.706-1.853A11.94 11.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 4 16 4Zm6.41 16.9c-.27.76-1.566 1.46-2.137 1.502-.543.04-1.056.255-3.552-.74-3.01-1.19-4.94-4.26-5.09-4.46-.148-.2-1.21-1.61-1.21-3.07s.762-2.175 1.032-2.473c.27-.298.59-.373.786-.373.197 0 .393.002.566.01.18.009.424-.068.663.505.248.594.843 2.054.917 2.204.074.15.124.326.025.525-.1.2-.15.324-.298.499-.148.175-.312.39-.446.523-.148.148-.302.308-.13.604.173.297.768 1.267 1.648 2.053 1.132 1.01 2.088 1.322 2.385 1.47.297.148.47.124.643-.074.173-.198.743-.866 1.04-1.164.297-.297.594-.247.99-.1.396.148 2.522 1.19 2.955 1.406.434.217.72.323.82.5.102.18.102.943-.167 1.704Z" fill="#fff"/>
            </svg>
            Join WhatsApp Community
          </a>

          {/* Urgency banner */}
          <UrgencyBanner />

          <hr style={{ border:"none", borderTop:"1px solid rgba(232,169,59,0.1)", margin:"1.5rem 0 1.1rem" }} />

          <p style={{ textAlign:"center", fontFamily:"var(--font-body)", fontSize:"0.8rem", color:"var(--color-cream-faint)" }}>
            Questions?{" "}
            <a href="/" style={{ color:"var(--color-marigold)", textDecoration:"underline" }}>Go back to homepage</a>
          </p>
        </div>
      </main>
    </>
  );
}
