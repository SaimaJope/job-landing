"use client";

import { useEffect, useRef } from "react";

type Orb = {
  bx: number; // base x as fraction of container
  by: number; // base y as fraction of container
  radius: number; // px
  color: [number, number, number];
  alpha: number;
  softness: number; // 0 = crisp (in focus), 1 = very soft (out of focus)
  ax: number; // float amplitude x
  ay: number; // float amplitude y
  speed: number;
  phase: number;
  depth: number; // parallax + repel strength
  ox: number; // live repel offset
  oy: number;
  sprite: HTMLCanvasElement | null;
};

type Dust = {
  bx: number;
  by: number;
  radius: number;
  alpha: number;
  drift: number;
  speed: number;
  phase: number;
  depth: number;
  ox: number;
  oy: number;
};

// Dark blue to deep purple family, like real out-of-focus city lights at night.
const PALETTE: Array<[number, number, number]> = [
  [0, 118, 178], // JOB blue, subdued
  [36, 96, 205], // blue
  [46, 66, 178], // deep indigo
  [78, 64, 198], // blue-violet
  [104, 58, 186], // deep purple
  [128, 62, 172], // violet
  [88, 44, 138], // darkest purple, depth layer
  [112, 200, 224], // cyan pinprick, rare
];

// Weighted pick: blue and indigo carry, purple gives depth, cyan only sparks.
const COLOR_WEIGHTS = [5, 4, 3, 3, 3, 2, 2, 1];

// deterministic PRNG so the composition is stable across reloads
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickColor(rng: () => number): [number, number, number] {
  const total = COLOR_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (let i = 0; i < PALETTE.length; i++) {
    r -= COLOR_WEIGHTS[i];
    if (r <= 0) return PALETTE[i];
  }
  return PALETTE[0];
}

function buildOrbs(compact: boolean): Orb[] {
  const rng = mulberry32(20260525);
  const COUNT = compact ? 28 : 34;
  const orbs: Orb[] = [];

  for (let i = 0; i < COUNT; i++) {
    const depth = rng(); // 0..1
    // closer (higher depth) = bigger and softer, but keep it calmer than glow blobs.
    const radius = 16 + Math.pow(depth, 1.6) * 150 + rng() * 16;
    const softness = 0.45 + depth * 0.5;
    // Real bokeh reads from layered transparent discs, not maximum brightness.
    const alpha = 0.22 - depth * 0.12 + rng() * 0.03;
    const lowerBand = rng() < 0.72;

    orbs.push({
      bx: rng(),
      by: lowerBand ? 0.48 + rng() * 0.46 : 0.18 + rng() * 0.5,
      radius,
      color: pickColor(rng),
      alpha,
      softness,
      ax: 6 + depth * 18,
      ay: 5 + depth * 14,
      speed: 0.025 + rng() * 0.04,
      phase: rng() * Math.PI * 2,
      depth: 0.18 + depth * 0.55,
      ox: 0,
      oy: 0,
      sprite: null,
    });
  }

  // a few small bright cores, like in-focus light points among the blur
  const SPARKS = compact ? 2 : 3;
  for (let i = 0; i < SPARKS; i++) {
    orbs.push({
      bx: 0.12 + rng() * 0.76,
      by: 0.16 + rng() * 0.55,
      radius: 5 + rng() * 6,
      color: [150, 205, 255],
      alpha: 0.5 + rng() * 0.18,
      softness: 0.16,
      ax: 4 + rng() * 6,
      ay: 3 + rng() * 5,
      speed: 0.02 + rng() * 0.03,
      phase: rng() * Math.PI * 2,
      depth: 0.5,
      ox: 0,
      oy: 0,
      sprite: null,
    });
  }
  return orbs;
}

function buildDust(compact: boolean): Dust[] {
  const rng = mulberry32(20260526);
  const COUNT = compact ? 54 : 82;
  const dust: Dust[] = [];

  for (let i = 0; i < COUNT; i++) {
    const depth = 0.2 + rng() * 0.8;

    dust.push({
      bx: rng(),
      by: 0.14 + rng() * 0.72,
      radius: 0.35 + rng() * 1.25,
      alpha: 0.035 + rng() * 0.07,
      drift: 4 + rng() * 16,
      speed: 0.035 + rng() * 0.07,
      phase: rng() * Math.PI * 2,
      depth,
      ox: 0,
      oy: 0,
    });
  }

  return dust;
}

function clampA(a: number) {
  return Math.max(0, Math.min(1, a));
}

// A real bokeh disc: transparent body, subtle luminous rim and soft edge.
function makeSprite(orb: Orb): HTMLCanvasElement {
  const r = orb.radius;
  const size = Math.ceil(r * 2);
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return c;

  const [cr, cg, cb] = orb.color;
  const a = orb.alpha;
  const soft = orb.softness;
  const sharp = 1 - soft;

  // rim is only a faint lens shimmer; the disc body carries the light so the
  // result reads as out-of-focus glow instead of an outlined bubble.
  const rim = `rgba(${Math.round(cr + (255 - cr) * 0.35)}, ${Math.round(
    cg + (255 - cg) * 0.35,
  )}, ${Math.round(cb + (255 - cb) * 0.35)}, ${clampA(a * (0.3 + sharp * 0.22))})`;

  const body = `rgba(${cr}, ${cg}, ${cb}, ${clampA(a * (0.42 + sharp * 0.16))})`;
  const center = `rgba(${cr}, ${cg}, ${cb}, ${clampA(a * (0.36 + sharp * 0.12))})`;

  const rimPos = 0.68 + sharp * 0.14; // crisp -> rim nearer the edge
  const fade = Math.min(rimPos + 0.08 + soft * 0.2, 0.999);

  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, center);
  grad.addColorStop(rimPos * 0.8, body);
  grad.addColorStop(rimPos, rim);
  grad.addColorStop(fade, `rgba(${cr}, ${cg}, ${cb}, ${clampA(a * 0.12)})`);
  grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();
  return c;
}

function makeHalo(): HTMLCanvasElement {
  const r = 280;
  const size = r * 2;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, "rgba(120, 150, 255, 0.055)");
  grad.addColorStop(0.4, "rgba(0, 141, 200, 0.038)");
  grad.addColorStop(1, "rgba(0, 141, 200, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

export function BokehBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const compact = window.matchMedia("(max-width: 767px)").matches;
    const orbs = buildOrbs(compact);
    orbs.forEach((orb) => {
      orb.sprite = makeSprite(orb);
    });
    const halo = makeHalo();
    const dust = buildDust(compact);

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      width = wrap!.clientWidth;
      height = wrap!.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1 : 1.25);
      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
    }
    resize();

    const raw = { x: width / 2, y: height * 0.4 };
    const cur = { x: width / 2, y: height * 0.4 };
    let pointerActive = false;

    const REPEL_RADIUS = 280;
    const REPEL_FORCE = 24;
    const PARALLAX = 38;

    function draw(t: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = "#050810";
      ctx!.fillRect(0, 0, width, height);
      const base = ctx!.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, "rgba(0, 0, 0, 0.72)");
      base.addColorStop(0.42, "rgba(5, 8, 16, 0.2)");
      base.addColorStop(1, "rgba(58, 52, 160, 0.12)");
      ctx!.fillStyle = base;
      ctx!.fillRect(0, 0, width, height);

      cur.x += (raw.x - cur.x) * 0.07;
      cur.y += (raw.y - cur.y) * 0.07;

      const nx = cur.x / width - 0.5;
      const ny = cur.y / height - 0.5;

      ctx!.globalCompositeOperation = "lighter";

      if (pointerActive) ctx!.drawImage(halo, cur.x - 280, cur.y - 280);

      for (const orb of orbs) {
        if (!orb.sprite) continue;

        const floatX = Math.sin(t * orb.speed + orb.phase) * orb.ax;
        const floatY = Math.cos(t * orb.speed * 0.8 + orb.phase) * orb.ay;
        const px = -nx * orb.depth * PARALLAX;
        const py = -ny * orb.depth * PARALLAX;

        let x = orb.bx * width + floatX + px;
        let y = orb.by * height + floatY + py;

        let tox = 0;
        let toy = 0;
        if (pointerActive) {
          const dx = x - cur.x;
          const dy = y - cur.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const f = (1 - dist / REPEL_RADIUS) * REPEL_FORCE * orb.depth;
            tox = (dx / dist) * f;
            toy = (dy / dist) * f;
          }
        }
        orb.ox += (tox - orb.ox) * 0.08;
        orb.oy += (toy - orb.oy) * 0.08;
        x += orb.ox;
        y += orb.oy;

        ctx!.drawImage(orb.sprite, x - orb.radius, y - orb.radius);

        if (pointerActive) {
          const dist = Math.hypot(x - cur.x, y - cur.y);
          const glowR = orb.radius + 200;
          if (dist < glowR) {
            ctx!.globalAlpha = (1 - dist / glowR) * 0.22;
            ctx!.drawImage(orb.sprite, x - orb.radius, y - orb.radius);
            ctx!.globalAlpha = 1;
          }
        }
      }

      for (const particle of dust) {
        const floatX = Math.sin(t * particle.speed + particle.phase) * particle.drift;
        const floatY =
          Math.cos(t * particle.speed * 0.72 + particle.phase * 1.7) *
          particle.drift *
          0.55;
        let x = particle.bx * width + floatX - nx * particle.depth * 26;
        let y = particle.by * height + floatY - ny * particle.depth * 18;

        let tox = 0;
        let toy = 0;
        let hover = 0;

        if (pointerActive) {
          const dx = x - cur.x;
          const dy = y - cur.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 190 && dist > 0.01) {
            hover = 1 - dist / 190;
            const f = hover * 18 * particle.depth;
            tox = (dx / dist) * f;
            toy = (dy / dist) * f;
          }
        }

        particle.ox += (tox - particle.ox) * 0.09;
        particle.oy += (toy - particle.oy) * 0.09;
        x += particle.ox;
        y += particle.oy;

        const alpha = clampA(particle.alpha + hover * 0.11);
        const radius = particle.radius * (1 + hover * 1.5);

        ctx!.fillStyle = `rgba(190, 245, 255, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(x, y, radius, 0, Math.PI * 2);
        ctx!.fill();

        if (hover > 0.2) {
          ctx!.strokeStyle = `rgba(103, 232, 249, ${hover * 0.12})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(x, y, radius + hover * 5, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }

      ctx!.globalCompositeOperation = "source-over";
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const FRAME_MS = compact ? 1000 / 24 : 1000 / 30;
    let rafId = 0;
    let startTs = 0;
    let lastDrawTs = 0;
    let running = false;
    let inView = true;

    function loop(now: number) {
      if (!startTs) startTs = now;
      if (now - lastDrawTs >= FRAME_MS) {
        draw((now - startTs) / 1000);
        lastDrawTs = now;
      }
      rafId = requestAnimationFrame(loop);
    }
    function play() {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    }
    function pause() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function handlePointer(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      pointerActive = inside;
      if (inside) {
        raw.x = x;
        raw.y = y;
      }
    }

    function handleVisibility() {
      if (document.hidden || !inView) pause();
      else play();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(wrap);
    document.addEventListener("visibilitychange", handleVisibility);
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting;
              if (inView) {
                draw(startTs ? (performance.now() - startTs) / 1000 : 0);
                play();
              } else {
                pause();
              }
            },
            { rootMargin: "160px" },
          )
        : null;
    io?.observe(wrap);

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener("pointermove", handlePointer, { passive: true });
      draw(0);
      play();
    }

    return () => {
      pause();
      ro.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full opacity-85 saturate-[0.92]" />
      {/* keep the headline readable while the bokeh shows around it */}
      <div className="absolute inset-0 bg-[radial-gradient(58%_46%_at_50%_42%,rgba(5,8,16,0.68),transparent_74%)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background via-background/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/42 to-transparent" />
    </div>
  );
}
