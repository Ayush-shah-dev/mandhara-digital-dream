import { useEffect, useRef, useState } from "react";

/** Soft luxury cursor: a gold ring that lags behind the pointer and grows on interactive elements. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let target = 1;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as HTMLElement | null;
      target = el?.closest("a,button,[data-cursor]") ? 2.1 : 1;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.13;
      ry += (y - ry) * 0.13;
      scale += (target - scale) * 0.12;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-10 w-10 rounded-full border border-accent/60 mix-blend-multiply"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-primary"
      />
    </>
  );
}
