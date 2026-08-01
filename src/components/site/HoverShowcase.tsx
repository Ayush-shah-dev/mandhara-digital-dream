import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export type ShowcaseItem = {
  id: string;
  title: string;
  meta?: string;
  text?: string;
  image: string;
  caption?: string;
  details?: readonly (readonly [string, string])[];
};

/**
 * Cinematic image panel driven by hover / keyboard focus on an adjacent list.
 * Works on light and dark (forest green) sections.
 */
export function ShowcasePanel({
  item,
  height = "h-[34rem]",
  className,
  index,
  total,
}: {
  item: ShowcaseItem;
  height?: string;
  className?: string;
  index?: number;
  total?: number;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-4xl soft-shadow ${height} ${className ?? ""}`}
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={item.id}
          src={item.image}
          alt={item.title}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.18, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1.02, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
          transition={{ duration: 1, ease }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.012_60)]/80 via-[oklch(0.17_0.012_60)]/10 to-transparent" />

      <motion.span
        key={`${item.id}-sweep`}
        initial={{ x: "-110%" }}
        animate={{ x: "115%" }}
        transition={{ duration: 1.2, ease }}
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-accent">
              {item.meta ?? item.caption ?? "Mandhara"}
            </p>
            <p className="display mt-2 text-3xl text-[oklch(0.97_0.01_84)]">{item.title}</p>
          </motion.div>
        </AnimatePresence>

        {typeof index === "number" && typeof total === "number" && (
          <div className="mt-6 flex items-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`h-px transition-all duration-700 ${
                  i === index ? "w-10 bg-accent" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function HoverShowcase({
  items,
  side = "left",
  tone = "light",
  height = "h-[34rem]",
  header,
  footer,
  columns = "md:grid-cols-2",
}: {
  items: readonly ShowcaseItem[];
  side?: "left" | "right";
  tone?: "light" | "dark";
  height?: string;
  header?: ReactNode;
  footer?: ReactNode;
  columns?: string;
}) {
  const [index, setIndex] = useState(0);
  const active = items[index] ?? items[0]!;
  const dark = tone === "dark";

  const panel = (
    <div className={side === "right" ? "md:order-2" : ""}>
      <div className="md:sticky md:top-28">
        <ShowcasePanel item={active} height={height} index={index} total={items.length} />
      </div>
    </div>
  );

  const list = (
    <div className={side === "right" ? "md:order-1" : ""}>
      {header}
      <ul className="mt-2">
        {items.map((it, i) => {
          const on = i === index;
          return (
            <li key={it.id}>
              <button
                type="button"
                onMouseEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
                onClick={() => setIndex(i)}
                aria-pressed={on}
                className={`group relative block w-full border-t py-6 text-left outline-none transition-colors duration-500 ${
                  dark ? "border-white/15" : "border-border"
                } ${on ? (dark ? "border-accent/70" : "border-primary/60") : ""}`}
              >
                <span
                  className={`absolute left-0 top-0 h-px bg-accent transition-all duration-700 ${
                    on ? "w-full" : "w-0"
                  }`}
                />
                <div className="flex items-start gap-5">
                  <span
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500 ${
                      on ? "scale-150 bg-accent" : dark ? "bg-white/30" : "bg-muted-foreground/40"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3
                        className={`display text-2xl transition-all duration-500 md:text-3xl ${
                          on ? (dark ? "text-accent" : "text-primary") : ""
                        } ${on ? "translate-x-1" : ""}`}
                      >
                        {it.title}
                      </h3>
                      {it.meta && (
                        <span className="text-[0.62rem] uppercase tracking-[0.25em] text-accent">
                          {it.meta}
                        </span>
                      )}
                    </div>
                    {it.text && (
                      <p
                        className={`mt-2 max-w-lg text-sm font-light leading-relaxed ${
                          dark ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {it.text}
                      </p>
                    )}
                    {it.details && (
                      <motion.dl
                        initial={false}
                        animate={{ opacity: on ? 1 : 0.5 }}
                        className="mt-4 grid gap-3 sm:grid-cols-3"
                      >
                        {it.details.map(([k, v]) => (
                          <div key={k}>
                            <dt
                              className={`text-[0.55rem] uppercase tracking-[0.25em] ${
                                dark ? "text-white/45" : "text-muted-foreground"
                              }`}
                            >
                              {k}
                            </dt>
                            <dd className="mt-1 text-sm font-light">{v}</dd>
                          </div>
                        ))}
                      </motion.dl>
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      {footer}
    </div>
  );

  return (
    <div className={`grid gap-12 ${columns} md:gap-20`}>
      {side === "left" ? (
        <>
          {panel}
          {list}
        </>
      ) : (
        <>
          {list}
          {panel}
        </>
      )}
    </div>
  );
}
