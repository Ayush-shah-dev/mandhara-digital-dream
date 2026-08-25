import { createFileRoute, Link } from "@tanstack/react-router";
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
  /** Centroid of `shape`, in percent — tooltip/marker anchor and hub-line endpoint. */
  x: number;
  y: number;
  /** Zone boundary as [x%, y%] pairs against the masterplan image, clockwise. */
  shape: [number, number][];
};

const NICQE_FACTS = { ...NICQE, villas: VILLAS.nicqe };

/**
 * Zone roles come straight from the brochure masterplan (p.2). RIME is the
 * resort and GEMINI is the club/event space — the reverse of what this page
 * shipped with, which sent visitors looking for the wedding venue into resort
 * suite content and vice versa. ORION is the revenue-sharing villa enclave, not
 * an events venue.
 *
 * The x/y/shape values below are traced from the client's annotated aerial
 * (brochure masterplan with the five zone outlines drawn on it), registered
 * against this page's own masterplan image via shared landmarks — the lake,
 * the cricket ground, the clubhouse/pool cluster, and the spine road. That
 * source draws one boundary for the whole Nicqe+Orion villa sweep with no
 * line between them (Orion's 54 villas vs. Nicqe's 294 — see VILLAS), so the
 * split here is an estimate along the internal loop road, not a traced edge;
 * nudge `orion`/`nicqe` if it reads wrong against the real plot lines.
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
    x: 32.01,
    y: 18.46,
    shape: [
      [22.21, 0.2],
      [28.3, 0.2],
      [31.34, 4.53],
      [33.37, 9.93],
      [36.41, 5.55],
      [43, 7.45],
      [46.04, 11.82],
      [50.61, 5.99],
      [56.19, 9.64],
      [60.24, 16.93],
      [62.78, 21.61],
      [60.75, 27.88],
      [55.68, 29.78],
      [49.59, 28.91],
      [44.02, 27.15],
      [38.95, 28.91],
      [34.38, 26.42],
      [29.82, 35.91],
      [24.75, 38.83],
      [19.17, 38.54],
      [14.6, 37.08],
      [10.55, 34.16],
      [7.51, 29.34],
      [6.29, 22.04],
      [7.3, 16.2],
      [9.03, 11.09],
      [11.56, 6.42],
      [15.11, 2.63],
      [18.66, 0.2],
    ],
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
    x: 30.12,
    y: 37.54,
    shape: [
      [38.95, 24.96],
      [42.49, 27.88],
      [43.2, 32.99],
      [42.8, 38.83],
      [40.97, 43.94],
      [38.44, 48.32],
      [35.7, 52.7],
      [32.35, 53.43],
      [28.8, 52.26],
      [25.25, 49.34],
      [21.91, 45.4],
      [19.17, 40.29],
      [17.44, 35.18],
      [16.43, 30.07],
      [17.44, 26.42],
      [21.2, 24.96],
      [26.77, 24.53],
      [32.86, 24.23],
    ],
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
    x: 67.98,
    y: 37.6,
    shape: [
      [43, 43.21],
      [43, 37.37],
      [43.2, 32.99],
      [43, 28.61],
      [40.97, 25.69],
      [38.95, 24.96],
      [43, 25.69],
      [48.07, 24.96],
      [53.14, 19.85],
      [57.71, 15.47],
      [63.29, 11.82],
      [70.39, 14.01],
      [77.48, 18.39],
      [83.57, 22.77],
      [89.66, 27.88],
      [94.73, 32.99],
      [97.26, 36.64],
      [98.28, 40.29],
      [97.26, 46.13],
      [95.74, 51.97],
      [95.74, 56.35],
      [92.7, 62.92],
      [87.63, 68.76],
      [81.54, 63.65],
      [74.44, 60],
      [66.33, 55.62],
      [58.22, 51.24],
      [50.1, 46.86],
      [43, 43.21],
    ],
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
    x: 62.33,
    y: 62.22,
    shape: [
      [43, 43.21],
      [50.1, 46.86],
      [58.22, 51.24],
      [66.33, 55.62],
      [74.44, 60],
      [81.54, 63.65],
      [87.63, 68.76],
      [80.53, 74.6],
      [73.43, 79.71],
      [66.33, 84.09],
      [61.76, 87.01],
      [63.29, 68.76],
      [60.24, 62.92],
      [55.68, 58.54],
      [50.1, 55.62],
      [44.02, 53.87],
      [43, 43.21],
    ],
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
    x: 31.77,
    y: 71.54,
    shape: [
      [21.91, 45.4],
      [16.63, 54.16],
      [13.59, 57.08],
      [11.05, 61.46],
      [9.33, 66.57],
      [8.32, 71.68],
      [8.01, 76.79],
      [8.32, 81.9],
      [9.33, 86.28],
      [11.05, 90.66],
      [13.59, 94.01],
      [17.14, 96.06],
      [21.7, 97.52],
      [27.79, 97.96],
      [33.87, 97.66],
      [39.96, 96.06],
      [45.54, 92.85],
      [50.61, 88.47],
      [54.67, 84.09],
      [58.22, 78.98],
      [61.26, 73.87],
      [63.29, 68.76],
      [60.24, 62.92],
      [55.68, 58.54],
      [50.1, 55.62],
      [44.02, 53.87],
      [40.97, 43.94],
      [38.44, 48.32],
      [35.7, 52.7],
      [32.35, 53.43],
      [28.8, 52.26],
      [25.25, 49.34],
    ],
  },
];

/**
 * Sits inside the Nicqe/Orion sweep with no boundary of its own in the source
 * reference — shown as a static label to match, not a clickable zone.
 */
const LAGOON_LABEL = { name: "LAGOON", purpose: "Club Area", x: 61.76, y: 47.88 };

function Masterplan() {
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

  const select = useCallback((i: number, focusMarker = false) => {
    setIndex(i);
    const next = `${window.location.pathname}#zone-${ZONES[i]!.id}`;
    window.history.replaceState(null, "", next);
    if (focusMarker) markerRefs.current[i]?.focus();
  }, []);

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
        intro="Hover any zone for its tooltip, click it to read the detail, or use the arrow keys to move between zones. Every road, valley and shoreline was drawn from the existing contour."
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
              {/*
                aspect-[] pinned to the photo's own ratio (1425x1024), not a fixed
                height + object-cover — the zone shapes below are traced in the
                photo's own percent space, and object-cover would crop the image
                to fill an arbitrary box while the SVG overlay stretches to fill
                that same box uncropped, drifting the two apart whenever the
                container's ratio doesn't match the photo's.
              */}
              <img
                src={img.masterplan}
                alt="Mandhara masterplan aerial"
                loading="lazy"
                className="aspect-[1425/1024] w-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.012_60)]/55 to-transparent" />

              {/* zone hotspots — the traced plot boundary is the hit area, not just the marker */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {ZONES.map((z, i) => {
                  // Hover/focus only — the map shouldn't keep the initial or
                  // last-clicked zone permanently lit; that's the detail panel's job.
                  const show = hovered === z.id;
                  return (
                    <polygon
                      key={z.id}
                      points={z.shape.map(([px, py]) => `${px},${py}`).join(" ")}
                      onClick={() => select(i)}
                      onMouseEnter={() => setHovered(z.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        pointerEvents: "all",
                        cursor: "pointer",
                        fill: "var(--brand-glow)",
                        fillOpacity: show ? 0.18 : 0,
                        stroke: "var(--brand-glow)",
                        strokeOpacity: show ? 0.7 : 0,
                        strokeWidth: 0.3,
                        vectorEffect: "non-scaling-stroke",
                        transition: "fill-opacity 500ms ease, stroke-opacity 500ms ease",
                      }}
                    />
                  );
                })}
              </svg>

              {ZONES.map((z, i) => {
                // `on` only governs which marker is the roving tabindex target and
                // which one screen readers hear as current — not what's visually lit.
                // The visible highlight is hover/focus only (`show`), so the map never
                // looks permanently "stuck" on the zone the detail panel happens to show.
                const on = active.id === z.id;
                const show = hovered === z.id;
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
                      className={`block whitespace-nowrap rounded-full border px-3 py-1 outline-none backdrop-blur-md transition-colors duration-500 ${
                        show
                          ? "border-accent/60 bg-[oklch(0.17_0.012_60)]/85"
                          : "border-white/15 bg-[oklch(0.17_0.012_60)]/70 hover:border-white/30"
                      }`}
                    >
                      <span className={`label ${show ? "text-accent" : "text-white"}`}>
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
                          <p className="label text-accent">{z.purpose}</p>
                          <p className="display mt-1 text-xl text-[oklch(0.97_0.01_84)]">
                            {z.name}
                          </p>
                          <p className="mt-2 text-[0.7rem] font-light leading-relaxed text-white/65">
                            {z.overview}
                          </p>
                          <p className="mt-3 label text-accent">{z.linkLabel} →</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Lagoon Club Area sits inside the Nicqe/Orion sweep with no boundary
                  of its own in the source reference, so it's a static label, not a zone. */}
              <div
                aria-hidden="true"
                style={{ left: `${LAGOON_LABEL.x}%`, top: `${LAGOON_LABEL.y}%` }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[oklch(0.17_0.012_60)]/70 px-3 py-1 backdrop-blur-md"
              >
                <span className="label text-accent">{LAGOON_LABEL.name}</span>
                <span className="label ml-1.5 text-white/70">{LAGOON_LABEL.purpose}</span>
              </div>
            </div>

            {/* Jump to zone detail only does anything once the map and detail panel
                are no longer side by side — hidden at lg, where they already are. */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => detailRef.current?.focus({ preventScroll: false })}
                className="btn-pill btn-label border border-border transition-colors duration-500 hover:border-primary hover:text-primary lg:hidden"
              >
                Jump to zone detail
              </button>
              <span className="label text-muted-foreground">← → to move between zones</span>
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
              <p className="mt-6 body-copy text-muted-foreground">{active.overview}</p>
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
                  onClick={() => markerRefs.current[index]?.focus()}
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
            <SplitText
              text="Every zone, at a glance."
              className="display mb-8 mt-6 text-4xl md:text-6xl"
            />
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
                          <p className="label text-primary">{z.purpose}</p>
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
