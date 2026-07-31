import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  spin: number;
  rot: number;
};

/**
 * Lightweight canvas atmosphere: floating dust motes / leaves drifting on a
 * gentle breeze, with subtle mouse parallax. GPU-cheap, capped particle count.
 */
export function Atmosphere({
  density = 34,
  leaf = false,
  className,
}: {
  density?: number;
  leaf?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0, y: 0 };
    const parts: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      parts.length = 0;
      for (let i = 0; i < density; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: leaf ? 4 + Math.random() * 7 : 0.8 + Math.random() * 2.2,
          vx: 0.12 + Math.random() * 0.35,
          vy: leaf ? 0.18 + Math.random() * 0.35 : -0.05 - Math.random() * 0.18,
          a: 0.12 + Math.random() * 0.4,
          spin: (Math.random() - 0.5) * 0.02,
          rot: Math.random() * Math.PI,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx + mouse.x * 0.006;
        p.y += p.vy + mouse.y * 0.004 + (leaf ? Math.sin(p.rot) * 0.25 : 0);
        p.rot += p.spin;
        if (p.x > w + 20) p.x = -20;
        if (p.y > h + 20) p.y = -20;
        if (p.y < -20) p.y = h + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.a;
        if (leaf) {
          ctx.fillStyle = "rgba(37,69,52,0.55)";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 0.42, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(184,145,70,0.9)";
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX - window.innerWidth / 2;
      mouse.y = e.clientY - window.innerHeight / 2;
    };

    resize();
    seed();
    draw();
    window.addEventListener("resize", () => {
      resize();
      seed();
    });
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density, leaf]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
