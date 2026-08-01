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
  image,
  points = [
    ["Private tour", "90 – 120 minutes, on the estate"],
    ["Best hours", "7–9 am for the lake, 5–7 pm for the lawns"],
    ["Pickup", "Airport or city car, on request"],
  ],
}: {
  title: string;
  text: string;
  to?: string;
  label?: string;
  image?: string;
  points?: readonly (readonly [string, string])[];
}) {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-4xl bg-secondary text-[oklch(0.96_0.01_84)]">
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-20 lg:block"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/70" />

        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-accent/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative grid gap-12 px-8 py-20 md:px-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.4em] text-accent">
              <span className="inline-block h-px w-10 bg-accent/60" />
              Next step
            </p>
            <SplitText text={title} className="display text-4xl md:text-6xl" />
            <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-white/70">{text}</p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {points.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-white/15 pt-4"
                >
                  <dt className="text-[0.58rem] uppercase tracking-[0.28em] text-accent">{k}</dt>
                  <dd className="mt-2 text-xs font-light leading-relaxed text-white/70">{v}</dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col justify-end gap-6 lg:items-end">
            <Magnetic>
              <Link
                to={to}
                className="inline-flex rounded-full bg-accent px-9 py-4 text-[0.7rem] uppercase tracking-[0.25em] text-accent-foreground transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
              >
                {label}
              </Link>
            </Magnetic>
            <div className="text-sm font-light text-white/70 lg:text-right">
              <a href="tel:+919000000000" className="link-underline block hover:text-accent">
                +91 90000 00000
              </a>
              <a href="mailto:visit@mandhara.in" className="link-underline block hover:text-accent">
                visit@mandhara.in
              </a>
              <p className="mt-3 text-xs text-white/45">Site office open daily, 9 am – 7 pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

