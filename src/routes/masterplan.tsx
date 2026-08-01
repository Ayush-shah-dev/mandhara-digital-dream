import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { ShowcasePanel } from "@/components/site/HoverShowcase";
import { Eyebrow, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/masterplan")({
  head: () => ({
    meta: [
      { title: "Mandhara Masterplan — Five Zones, One Landscape" },
      {
        name: "description",
        content:
          "Explore the Mandhara masterplan: NICQE, RIME, GEMINI, ORION and Sheen Lake across a hundred landscaped acres.",
      },
      { property: "og:title", content: "Mandhara Masterplan" },
      {
        property: "og:description",
        content: "An interactive look at the five zones that shape Mandhara.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Masterplan,
});

type Zone = {
  id: string;
  name: string;
  purpose: string;
  overview: string;
  features: string[];
  image: string;
  to: string;
  hash: string;
  linkLabel: string;
  x: number;
  y: number;
};

const ZONES: Zone[] = [
  {
    id: "nicqe",
    name: "NICQE",
    purpose: "Villa Enclave North",
    overview:
      "The first residential valley: wide plots stepping down toward the water, with the primary clubhouse at its centre.",
    features: ["Garden valley plots", "Clubhouse One", "Tree-lined avenue", "Children's green"],
    image: img.villaValley,
    to: "/villas",
    hash: "enclave",
    linkLabel: "Open the villa enclave",
    x: 26,
    y: 30,
  },
  {
    id: "rime",
    name: "RIME",
    purpose: "Villa Enclave South",
    overview:
      "Quieter, deeper into the canopy — designed for larger homes with private courtyards and long garden edges.",
    features: ["Courtyard villas", "Clubhouse Two", "Walking trail loop", "Orchard belt"],
    image: img.villaGarden,
    to: "/villas",
    hash: "construction",
    linkLabel: "See how they are built",
    x: 30,
    y: 68,
  },
  {
    id: "gemini",
    name: "GEMINI",
    purpose: "The Resort",
    overview:
      "Suites, spa, pools and dining arranged along the lake's northern shoulder, catching the morning light.",
    features: ["Presidential & Junior suites", "Spa and wellness", "Infinity pool", "Lakeside dining"],
    image: img.pool,
    to: "/resort",
    hash: "facilities",
    linkLabel: "Open resort facilities",
    x: 72,
    y: 32,
  },
  {
    id: "orion",
    name: "ORION",
    purpose: "Club & Events",
    overview:
      "Banquet halls, an open event ground and lawns sized for weddings, with independent access and parking.",
    features: ["Grand banquet", "Event ground", "Outdoor restaurant", "Bridal suites"],
    image: img.banquet,
    to: "/club",
    hash: "venues",
    linkLabel: "Open club venues",
    x: 74,
    y: 70,
  },
  {
    id: "sheen",
    name: "SHEEN LAKE",
    purpose: "The Heart",
    overview:
      "The still centre of Mandhara — five acres of water fed by monsoon channels, edged by an 8 km promenade.",
    features: ["Lake promenade", "Jetty & pavilion", "Birding decks", "Sunset steps"],
    image: img.promenade,
    to: "/amenities",
    hash: "",
    linkLabel: "Walk the lakeside",
    x: 50,
    y: 50,
  },
];

function Masterplan() {
  const router = useRouter();
  const [index, setIndex] = useState(4);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = ZONES[index]!;

  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);

  // Deep-link: read #zone-<id> on mount and keep the URL in sync with selection.
  useEffect(() => {
    const id = window.location.hash.replace("#zone-", "");
    const i = ZONES.findIndex((z) => z.id === id);
    if (i >= 0) setIndex(i);
  }, []);

  const select = useCallback(
    (i: number, focusMarker = false) => {
      setIndex(i);
      const next = `${window.location.pathname}#zone-${ZONES[i]!.id}`;
      window.history.replaceState(null, "", next);
      if (focusMarker) markerRefs.current[i]?.focus();
    },
    [],
  );

  const onMapKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((index + 1) % ZONES.length, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select((index - 1 + ZONES.length) % ZONES.length, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(ZONES.length - 1, true);
    }
  };

  const preview = hovered ? ZONES.find((z) => z.id === hovered)! : active;

  return (
    <>
      <PageHero
        eyebrow="Masterplan"
        title="Five zones. One continuous landscape."
        intro="Hover a marker for its tooltip, select it to read the detail, or use the arrow keys to move between zones. Every road, valley and shoreline was drawn from the existing contour."
        image={img.masterplan}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div
              role="group"
              aria-label="Mandhara masterplan zones. Use arrow keys to move between zones."
              onKeyDown={onMapKeyDown}
              className="group relative overflow-hidden rounded-4xl soft-shadow outline-none"
            >
              <img
                src={img.masterplan}
                alt="Mandhara masterplan aerial"
                loading="lazy"
                className="h-[36rem] w-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.012_60)]/55 to-transparent" />

              {/* connecting lines to the lake */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                {ZONES.slice(0, 4).map((z) => (
                  <motion.line
                    key={z.id}
                    x1={z.x}
                    y1={z.y}
                    x2={50}
                    y2={50}
                    stroke="oklch(0.673 0.093 85)"
                    strokeWidth={0.15}
                    strokeDasharray="1 1.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.55 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </svg>

              {ZONES.map((z, i) => {
                const on = active.id === z.id;
                const show = on || hovered === z.id;
                return (
                  <div
                    key={z.id}
                    style={{ left: `${z.x}%`, top: `${z.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <button
                      ref={(el) => {
                        markerRefs.current[i] = el;
                      }}
                      type="button"
                      tabIndex={on ? 0 : -1}
                      onClick={() => select(i)}
                      onMouseEnter={() => setHovered(z.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(z.id)}
                      onBlur={() => setHovered(null)}
                      aria-label={`${z.name} — ${z.purpose}`}
                      aria-current={on ? "true" : undefined}
                      aria-describedby={show ? `tip-${z.id}` : undefined}
                      className="block outline-none"
                    >
                      <span
                        className={`relative mx-auto grid h-12 w-12 place-items-center rounded-full border transition-all duration-500 ${
                          on
                            ? "scale-125 border-accent bg-accent/90"
                            : "border-white/60 bg-white/15 backdrop-blur-md hover:scale-110"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-white" />
                        <span className="shimmer absolute inset-0 rounded-full border border-accent/60" />
                      </span>
                      <span className="mt-2 block whitespace-nowrap text-center text-[0.55rem] uppercase tracking-[0.25em] text-white">
                        {z.name}
                      </span>
                    </button>

                    <AnimatePresence>
                      {show && (
                        <motion.div
                          id={`tip-${z.id}`}
                          role="tooltip"
                          initial={{ opacity: 0, y: 8, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-white/15 bg-[oklch(0.17_0.012_60)]/90 p-4 text-left backdrop-blur-xl"
                        >
                          <p className="text-[0.55rem] uppercase tracking-[0.3em] text-accent">
                            {z.purpose}
                          </p>
                          <p className="display mt-1 text-xl text-[oklch(0.97_0.01_84)]">{z.name}</p>
                          <p className="mt-2 text-[0.7rem] font-light leading-relaxed text-white/65">
                            {z.overview}
                          </p>
                          <p className="mt-3 text-[0.55rem] uppercase tracking-[0.25em] text-accent">
                            {z.linkLabel} →
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Keyboard focus / return controls */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => markerRefs.current[index]?.focus()}
                className="rounded-full border border-border px-6 py-3 text-[0.6rem] uppercase tracking-[0.25em] transition-colors duration-500 hover:border-primary hover:text-primary"
              >
                Focus the map
              </button>
              <button
                type="button"
                onClick={() =>
                  detailRef.current?.focus({ preventScroll: false })
                }
                className="rounded-full border border-border px-6 py-3 text-[0.6rem] uppercase tracking-[0.25em] transition-colors duration-500 hover:border-primary hover:text-primary"
              >
                Jump to zone detail
              </button>
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                ← → to move between zones
              </span>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`zone-${active.id}`}
              ref={detailRef}
              tabIndex={-1}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="self-center scroll-mt-32 outline-none"
            >
              <p className="eyebrow">{active.purpose}</p>
              <h2 className="display mt-4 text-5xl md:text-6xl">{active.name}</h2>
              <p className="mt-6 text-base font-light leading-relaxed text-muted-foreground">
                {active.overview}
              </p>
              <ul className="mt-8 space-y-3">
                {active.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-4 border-b border-border/70 pb-3 text-sm font-light"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={active.to}
                  hash={active.hash || undefined}
                  className="inline-flex rounded-full bg-primary px-7 py-3.5 text-[0.62rem] uppercase tracking-[0.25em] text-primary-foreground transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
                >
                  {active.linkLabel}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    void router.invalidate;
                    markerRefs.current[index]?.focus();
                  }}
                  className="inline-flex rounded-full border border-border px-7 py-3.5 text-[0.62rem] uppercase tracking-[0.25em] transition-colors duration-500 hover:border-primary hover:text-primary"
                >
                  Return to the map
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-28">
              <ShowcasePanel
                item={{
                  id: preview.id,
                  title: preview.name,
                  meta: preview.purpose,
                  image: preview.image,
                }}
                height="h-[30rem] md:h-[36rem]"
                index={ZONES.findIndex((z) => z.id === preview.id)}
                total={ZONES.length}
              />
            </div>
          </div>

          <div>
            <Eyebrow>Zone Index</Eyebrow>
            <SplitText text="Every zone, at a glance." className="display mb-8 mt-6 text-4xl md:text-6xl" />
            <ul>
              {ZONES.map((z, i) => {
                const on = preview.id === z.id;
                return (
                  <li key={z.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHovered(z.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(z.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => {
                        select(i);
                        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`group relative block w-full border-t py-7 text-left outline-none transition-colors duration-500 ${
                        on ? "border-primary/60" : "border-border"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 h-px bg-accent transition-all duration-700 ${
                          on ? "w-full" : "w-0"
                        }`}
                      />
                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <p className="text-[0.58rem] uppercase tracking-[0.3em] text-accent">
                            {z.purpose}
                          </p>
                          <h3
                            className={`display mt-2 text-3xl transition-all duration-500 ${
                              on ? "translate-x-1 text-primary" : ""
                            }`}
                          >
                            {z.name}
                          </h3>
                          <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                            {z.overview}
                          </p>
                        </div>
                        <span
                          className={`text-[0.6rem] uppercase tracking-[0.25em] transition-opacity duration-500 ${
                            on ? "opacity-100 text-primary" : "opacity-0"
                          }`}
                        >
                          View
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand
        title="See the plan on the ground."
        text="We'll walk the zone that interests you most, at the hour it looks best."
        label="Book a masterplan tour"
        image={img.masterplan}
        points={[
          ["NICQE & RIME", "354 villas, 2 clubhouses, 18 garden valleys"],
          ["GEMINI & ORION", "Resort suites, spa, banquets and event ground"],
          ["SHEEN LAKE", "5 acres of water, 8 km promenade, 5 islands"],
        ]}
      />
    </>
  );
}
