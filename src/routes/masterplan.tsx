import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { ShowcasePanel } from "@/components/site/HoverShowcase";
import { Eyebrow, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";
import { CLUB, LAKE, NICQE, VILLAS } from "@/lib/project";

export const Route = createFileRoute("/masterplan")({
  head: () => ({
    meta: [
      { title: "Mandhara Masterplan — Five Zones, One Landscape" },
      {
        name: "description",
        content:
          "Explore the Mandhara masterplan: the Nicqe and Orion villa enclaves, the Rime resort, the Gemini club and event space, and Sheen Lake at the centre.",
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
  secondary?: { to: string; label: string };
  x: number;
  y: number;
};

const NICQE_FACTS = { ...NICQE, villas: VILLAS.nicqe };

/**
 * Zone roles come straight from the brochure masterplan (p.2). RIME is the
 * resort and GEMINI is the club/event space — the reverse of what this page
 * shipped with, which sent visitors looking for the wedding venue into resort
 * suite content and vice versa. ORION is the revenue-sharing villa enclave, not
 * an events venue.
 *
 * TODO(client): the x/y pin positions below follow the brochure's described
 * layout — Sheen Lake north-west, Gemini centre-west, Nicqe and Orion sweeping
 * east, Rime south — but have not been checked against the real aerial plate.
 * Confirm against the brochure masterplan image before launch.
 */
const ZONES: Zone[] = [
  {
    id: "sheen",
    name: "SHEEN LAKE",
    purpose: "The Heart",
    overview:
      "The still centre of Mandhara — six acres of water with five landscaped islands, held by a kilometre of promenade.",
    features: [
      `${LAKE.acres} acres of water`,
      `${LAKE.islands} landscaped islands`,
      `${LAKE.promenadeKm} km promenade`,
      `${LAKE.aerators} water aerators`,
    ],
    image: img.promenade,
    to: "/amenities",
    hash: "",
    linkLabel: "Walk the lakeside",
    x: 24,
    y: 26,
  },
  {
    id: "gemini",
    name: "GEMINI",
    purpose: "Club & Event Space",
    overview:
      "The celebration side of the estate: the event ground, the banquet hall, the celebration lawns and the Pavilion Club, with their own access and parking.",
    features: [
      "Event Ground",
      `Banquet Hall — ${CLUB.banquetSqFt}`,
      "Outdoor Restaurant",
      "Celebration Lawns",
      "Pavilion Club — cricket ground, pool, wedding rooms, gym",
    ],
    image: img.banquet,
    to: "/club",
    hash: "venues",
    linkLabel: "Open club venues",
    x: 36,
    y: 52,
  },
  {
    id: "nicqe",
    name: "NICQE",
    purpose: "Villa Enclave",
    overview:
      "The main residential enclave — villas set along garden valleys, with two clubhouses of its own at the centre.",
    features: [
      `${NICQE_FACTS.villas} Villas`,
      `${NICQE_FACTS.clubhouses} Clubhouses`,
      `${NICQE_FACTS.gardenValleys} Garden Valleys`,
    ],
    image: img.villaValley,
    to: "/villas",
    hash: "nicqe",
    linkLabel: "Open the villa enclave",
    x: 70,
    y: 34,
  },
  {
    id: "orion",
    name: "ORION",
    purpose: "Villa Enclave — Revenue Sharing",
    overview:
      "The investment product: villas owned outright but operated by the resort team, with access to the club amenities rather than a clubhouse of their own.",
    features: [
      `${VILLAS.orion} Villas`,
      "Access to Club Amenities",
      "Managed by Resort",
      "Revenue-sharing ownership",
    ],
    image: img.villaLake,
    to: "/villas",
    hash: "orion",
    linkLabel: "Open the revenue-sharing villas",
    secondary: { to: "/revenue", label: "See the revenue model" },
    x: 78,
    y: 58,
  },
  {
    id: "rime",
    name: "RIME",
    purpose: "The Resort",
    overview:
      "The retreat: wellness, dining, pool and suites gathered on the estate's southern edge, open to guests and residents alike.",
    features: [
      "Retreat & Wellness Center",
      "Gym & Indoor Games",
      "Boutique + Specialty Restaurant",
      "Swimming Pool",
      "Outdoor Event Lawn",
      "Presidential, Standard & Junior Suites",
    ],
    image: img.resort,
    to: "/resort",
    hash: "facilities",
    linkLabel: "Open resort facilities",
    x: 48,
    y: 78,
  },
];

/** Sheen Lake is the hub every other zone reads from on the map. */
const HUB = ZONES[0]!;

function Masterplan() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
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
                {ZONES.filter((z) => z.id !== HUB.id).map((z) => (
                  <motion.line
                    key={z.id}
                    x1={z.x}
                    y1={z.y}
                    x2={HUB.x}
                    y2={HUB.y}
                    stroke="var(--brand-glow)"
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
                      <span className="mt-2 block whitespace-nowrap text-center label text-white">
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
                          <p className="label text-accent">
                            {z.purpose}
                          </p>
                          <p className="display mt-1 text-xl text-[oklch(0.97_0.01_84)]">{z.name}</p>
                          <p className="mt-2 text-[0.7rem] font-light leading-relaxed text-white/65">
                            {z.overview}
                          </p>
                          <p className="mt-3 label text-accent">
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
                className="btn-pill btn-label border border-border transition-colors duration-500 hover:border-primary hover:text-primary"
              >
                Focus the map
              </button>
              <button
                type="button"
                onClick={() =>
                  detailRef.current?.focus({ preventScroll: false })
                }
                className="btn-pill btn-label border border-border transition-colors duration-500 hover:border-primary hover:text-primary"
              >
                Jump to zone detail
              </button>
              <span className="label text-muted-foreground">
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
              <p className="mt-6 body-copy text-muted-foreground">
                {active.overview}
              </p>
              <ul className="mt-8 space-y-3">
                {active.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-4 border-b border-border/70 pb-3 body-copy"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={active.to}
                  {...(active.hash ? { hash: active.hash } : {})}
                  className="btn-pill btn-label bg-primary text-primary-foreground transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
                >
                  {active.linkLabel}
                </Link>
                {active.secondary && (
                  <Link
                    to={active.secondary.to}
                    className="btn-pill btn-label border border-primary/50 text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                  >
                    {active.secondary.label}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    void router.invalidate;
                    markerRefs.current[index]?.focus();
                  }}
                  className="btn-pill btn-label border border-border transition-colors duration-500 hover:border-primary hover:text-primary"
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
                        className={`absolute left-0 top-0 h-px bg-primary transition-all duration-700 ${
                          on ? "w-full" : "w-0"
                        }`}
                      />
                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <p className="label text-primary">
                            {z.purpose}
                          </p>
                          <h3
                            className={`display mt-2 text-3xl transition-all duration-500 ${
                              on ? "translate-x-1 text-primary" : ""
                            }`}
                          >
                            {z.name}
                          </h3>
                          <p className="mt-2 max-w-md body-copy text-muted-foreground">
                            {z.overview}
                          </p>
                        </div>
                        <span
                          className={`label transition-opacity duration-500 ${
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
          [
            "NICQE & ORION",
            `${VILLAS.total} villas — ${VILLAS.nicqe} in Nicqe with ${NICQE.clubhouses} clubhouses and ${NICQE.gardenValleys} garden valleys, ${VILLAS.orion} revenue-sharing in Orion`,
          ],
          ["RIME & GEMINI", "The resort, and the club and event space"],
          [
            "SHEEN LAKE",
            `${LAKE.acres} acres of water, ${LAKE.islands} islands, ${LAKE.promenadeKm} km promenade`,
          ],
        ]}
      />
    </>
  );
}
