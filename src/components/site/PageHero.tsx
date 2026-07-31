import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Atmosphere } from "./Atmosphere";
import { Magnetic, SplitText } from "./primitives";

/** Cinematic page opener used by every inner page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.28]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <header ref={ref} className="relative flex h-[86vh] items-end overflow-hidden">
      <motion.img
        src={image}
        alt=""
        aria-hidden="true"
        style={{ scale, y }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.012_60)]/85 via-[oklch(0.17_0.012_60)]/25 to-[oklch(0.17_0.012_60)]/40" />
      <Atmosphere density={22} />
      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-24 text-[oklch(0.97_0.01_84)] md:px-12"
      >
        <p className="mb-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.4em] text-accent">
          <span className="inline-block h-px w-10 bg-accent/60" />
          {eyebrow}
        </p>
        <SplitText as="h1" text={title} className="display max-w-4xl text-5xl md:text-8xl" />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/75"
          >
            {intro}
          </motion.p>
        )}
        {children}
      </motion.div>
    </header>
  );
}

export function CtaBand({
  title,
  text,
  to = "/contact",
  label = "Book an Experience",
}: {
  title: string;
  text: string;
  to?: string;
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12">
      <div className="mx-auto grid w-full max-w-7xl items-end gap-10 rounded-4xl bg-secondary px-8 py-20 text-[oklch(0.96_0.01_84)] md:grid-cols-[1.4fr_1fr] md:px-16">
        <div>
          <SplitText text={title} className="display text-4xl md:text-6xl" />
          <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-white/70">{text}</p>
        </div>
        <div className="md:justify-self-end">
          <Magnetic>
            <Link
              to={to}
              className="inline-flex rounded-full bg-accent px-9 py-4 text-[0.7rem] uppercase tracking-[0.25em] text-accent-foreground transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              {label}
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
