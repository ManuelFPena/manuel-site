"use client";

import { useEffect, useRef } from "react";

/* Palette and layout taken from Field Study (visual_compositions/sketch.js). */
const BG: [number, number, number] = [250, 240, 217];
const COLS: [number, number, number][] = [
  [225, 189, 109],
  [104, 42, 42],
  [242, 27, 95],
  [82, 121, 111],
  [196, 160, 110],
  [180, 89, 73],
];
const PANEL_BG = "#0c0907";
const ORANGE = "#ff6820";
const DIM = "#504840";
const LIGHT = "#cdc3b6";
const KNOBS = ["SPEED", "TIME", "H.PASS", "L.PASS"];
/** Step pattern for the mini sequencer row (from the sequencer's groove preset rhythm). */
const STEPS = [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1];
const STEP_COLS = ["#e05a6a", "#d9a94a", "#42b38a", "#3aa7a0", "#8f6cf0"];

/** Small, fast value noise: smooth enough for a flow field. */
function makeNoise(seed = 7) {
  const p = new Uint8Array(512);
  let s = seed;
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 256; i++) p[i + 256] = p[i];
  const fade = (t: number) => t * t * (3 - 2 * t);
  const h = (x: number, y: number) => p[p[x & 255] + (y & 255)] / 255;
  return (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = fade(x - xi), yf = fade(y - yi);
    const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}

/**
 * A live miniature of Field Study for the project card: particles drift through a
 * flow field around six turning reels, above the dark tape-deck panel whose knobs
 * move and whose step row plays. Runs only while visible; still for reduced motion.
 */
export function FieldStudyThumb() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current, cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const noise = makeNoise();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, PH = 0, dpr = 1;
    let parts: { x: number; y: number; c: number; v: number }[] = [];
    let reels: { x: number; y: number; c: number; r: number }[] = [];
    let frame = 0, raf = 0, visible = true;

    const setup = () => {
      const rect = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      PH = Math.round(H * 0.17);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const effH = H - PH;
      reels = [];
      for (let r = 0; r < 2; r++)
        for (let c = 0; c < 3; c++)
          reels.push({ x: W * (0.18 + c * 0.32), y: effH * (0.27 + r * 0.46), c: r * 3 + c, r: Math.min(W, H) * 0.075 });
      const n = Math.round((W * effH) / 420);
      parts = Array.from({ length: n }, (_, i) => ({ x: Math.random() * W, y: Math.random() * effH, c: i % COLS.length, v: 0.4 + Math.random() * 0.8 }));
      ctx.fillStyle = `rgb(${BG.join(",")})`;
      ctx.fillRect(0, 0, W, H);
    };

    const drawField = () => {
      const effH = H - PH;
      const t = frame * 0.004;
      // Fade previous frame: the trails.
      ctx.fillStyle = `rgba(${BG.join(",")},0.08)`;
      ctx.fillRect(0, 0, W, effH);

      // Reels: nested, slowly turning rectangles with a soft core.
      reels.forEach((rl, i) => {
        const [r, g, b] = COLS[rl.c % COLS.length];
        ctx.save();
        ctx.translate(rl.x, rl.y);
        ctx.rotate(Math.sin(t * 0.7 + i) * 0.35 + (i % 2 ? 0.2 : -0.2));
        ctx.strokeStyle = `rgba(${r},${g},${b},0.22)`;
        ctx.lineWidth = 1;
        for (let k = 0; k < 3; k++) {
          const s = rl.r * (1.5 - k * 0.38);
          ctx.strokeRect(-s, -s * 0.72, s * 2, s * 1.44);
        }
        const pulse = 1 + Math.sin(t * 3 + i) * 0.15;
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, rl.r * 0.55 * pulse);
        grd.addColorStop(0, `rgba(${r},${g},${b},0.45)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(0, 0, rl.r * 0.55 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.arc(0, 0, 1.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Particles follow the flow field, with a light pull toward their reel.
      parts.forEach((p) => {
        const a = noise(p.x * 0.012, p.y * 0.012 + t) * Math.PI * 4;
        const rl = reels[p.c % reels.length];
        const dx = rl.x - p.x, dy = rl.y - p.y;
        const d = Math.hypot(dx, dy) + 1;
        p.x += Math.cos(a) * p.v + (dx / d) * 0.12;
        p.y += Math.sin(a) * p.v + (dy / d) * 0.12;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > effH || Math.random() < 0.002) {
          p.x = Math.random() * W;
          p.y = Math.random() * effH;
        }
        const [r, g, b] = COLS[p.c];
        ctx.fillStyle = `rgba(${r},${g},${b},0.55)`;
        ctx.fillRect(p.x, p.y, 1.4, 1.4);
      });
    };

    const drawPanel = () => {
      const y0 = H - PH;
      const t = frame * 0.02;
      ctx.fillStyle = PANEL_BG;
      ctx.fillRect(0, y0, W, PH);
      ctx.fillStyle = ORANGE;
      ctx.fillRect(0, y0, W, 1);

      const kr = PH * 0.24;
      const cy = y0 + PH * 0.56;
      const xs = [0.2, 0.38, 0.8, 0.94].map((f) => W * f - (f > 0.5 ? kr : 0));
      ctx.font = `${Math.max(7, PH * 0.11)}px ui-monospace, Menlo, monospace`;
      ctx.textAlign = "center";
      KNOBS.forEach((label, i) => {
        const x = xs[i];
        const v = 0.5 + 0.45 * Math.sin(t * (0.6 + i * 0.17) + i * 1.7);
        const a0 = (3 * Math.PI) / 4, a1 = (9 * Math.PI) / 4;
        ctx.lineWidth = Math.max(1.5, kr * 0.16);
        ctx.strokeStyle = DIM;
        ctx.beginPath();
        ctx.arc(x, cy, kr, a0, a1);
        ctx.stroke();
        ctx.strokeStyle = ORANGE;
        ctx.beginPath();
        ctx.arc(x, cy, kr, a0, a0 + (a1 - a0) * v);
        ctx.stroke();
        ctx.fillStyle = "#1c1814";
        ctx.beginPath();
        ctx.arc(x, cy, kr * 0.72, 0, Math.PI * 2);
        ctx.fill();
        const ang = a0 + (a1 - a0) * v;
        ctx.fillStyle = ORANGE;
        ctx.beginPath();
        ctx.arc(x + Math.cos(ang) * kr * 0.48, cy + Math.sin(ang) * kr * 0.48, Math.max(1.2, kr * 0.11), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = LIGHT;
        ctx.fillText(label, x, y0 + PH * 0.2);
      });

      // Mini step row, as in the sequencer: a playhead walks 16 steps.
      const n = STEPS.length;
      const sw = W * 0.018, gap = W * 0.006;
      const rowW = n * sw + (n - 1) * gap;
      const sx = W * 0.59 - rowW / 2;
      const sy = cy - sw / 2;
      const head = Math.floor(frame / 9) % n;
      for (let i = 0; i < n; i++) {
        const on = STEPS[i] === 1;
        ctx.fillStyle = i === head ? "#ffffff" : on ? STEP_COLS[i % STEP_COLS.length] : "#221d18";
        ctx.globalAlpha = i === head ? 0.95 : on ? 0.85 : 1;
        ctx.fillRect(sx + i * (sw + gap), sy, sw, sw);
      }
      ctx.globalAlpha = 1;
    };

    const vignette = () => {
      const effH = H - PH;
      const g = ctx.createRadialGradient(W / 2, effH / 2, effH * 0.2, W / 2, effH / 2, effH * 1.05);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(7,4,2,0.28)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, effH);
    };

    const tick = () => {
      frame++;
      drawField();
      // Vignette lightly every few frames so it builds into the trails without darkening fully.
      if (frame % 6 === 0) vignette();
      drawPanel();
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    };

    setup();
    if (reduced) {
      for (let i = 0; i < 220; i++) {
        frame++;
        drawField();
      }
      drawPanel();
    } else {
      raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      const { width } = el.getBoundingClientRect();
      if (Math.abs(width - W) > 2) setup();
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrap}
      role="img"
      aria-label="Visual instruments: a live sketch of particles flowing around six reels above a tape-deck panel with knobs and a step row"
      className="relative aspect-[4/3] w-full overflow-hidden bg-[#faf0d9]"
    >
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <span className="absolute right-3 top-3 rounded-full border border-[#682a2a]/60 bg-[#faf0d9]/70 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-[#682a2a] sm:right-4 sm:top-4">
        Live
      </span>
    </div>
  );
}
