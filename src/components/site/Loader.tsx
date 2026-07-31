import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { logoUrl } from "./Emblem";

const LINES = ["Three Experiences.", "One Destination.", "Welcome to Mandhara."];

/**
 * Cinematic entry: particles coalesce into the Mandhara mark, the golden
 * emblem draws itself, then dawn light floods the screen and dissolves.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [line, setLine] = useState(0);
  const [dawn, setDawn] = useState(false);
  const [gone, setGone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t: number[] = [];
    t.push(window.setTimeout(() => setLine(1), 1500));
    t.push(window.setTimeout(() => setLine(2), 2700));
    t.push(window.setTimeout(() => setLine(3), 3900));
    t.push(window.setTimeout(() => setDawn(true), 3400));
    t.push(
      window.setTimeout(() => {
        setGone(true);
        onDone();
      }, 5200),
    );
    return () => t.forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const cx = () => window.innerWidth / 2;
    const cy = () => window.innerHeight / 2;
    const N = 260;
    const parts = Array.from({ length: N }, (_, i) => {
      const ang = (i / N) * Math.PI * 2 + Math.random();
      const rad = 110 + Math.random() * 30;
      return {
        x: cx() + Math.cos(ang) * (400 + Math.random() * 500),
        y: cy() + Math.sin(ang) * (400 + Math.random() * 500),
        tx: cx() + Math.cos(ang) * rad,
        ty: cy() + Math.sin(ang) * rad,
        r: 0.6 + Math.random() * 1.6,
      };
    });
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 2200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const s of parts) {
        const x = s.x + (s.tx - s.x) * e;
        const y = s.y + (s.ty - s.y) * e;
        ctx.globalAlpha = 0.25 + 0.6 * e;
        ctx.fillStyle = "rgba(184,145,70,1)";
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-night"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: dawn ? 1 : 0,
              background: dawn
                ? "radial-gradient(90% 70% at 50% 75%, oklch(0.62 0.14 55) 0%, oklch(0.36 0.08 45) 45%, oklch(0.17 0.012 60) 100%)"
                : "transparent",
            }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

          <div className="relative flex flex-col items-center gap-10 px-6 text-center">
            <div className="relative grid h-56 w-56 place-items-center">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-accent">
                <circle
                  cx="100"
                  cy="100"
                  r="86"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="541"
                  strokeDashoffset="541"
                  style={{ animation: "draw 2.8s cubic-bezier(.16,1,.3,1) .4s forwards" }}
                />
              </svg>
              <motion.img
                src={logoUrl}
                alt="Mandhara"
                initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-40 drop-shadow-[0_0_45px_rgba(184,145,70,0.55)] invert-0 brightness-125"
              />
            </div>

            <div className="h-10">
              <AnimatePresence mode="wait">
                {line > 0 && line <= LINES.length && (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="display text-2xl text-[oklch(0.95_0.02_84)] md:text-4xl"
                  >
                    {LINES[line - 1]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
