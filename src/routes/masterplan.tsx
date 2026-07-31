import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
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
    x: 74,
    y: 70,
  },
  {
    id: "sheen",
    name: "SHEEN LAKE",
    purpose: "The Heart",
    overview:
      "The still centre of Mandhara — fed by monsoon channels, edged by a promenade, visible from nearly every zone.",
    features: ["Lake promenade", "Jetty & pavilion", "Birding decks", "Sunset steps"],
    x: 50,
    y: 50,
  },
];

function Masterplan() {
  const [active, setActive] = useState<Zone>(ZONES[4]!);

  return (
    <>
      <PageHero
        eyebrow="Masterplan"
        title="Five zones. One continuous landscape."
        intro="Hover a marker to feel the zone, select it to read the detail. Every road, valley and shoreline was drawn from the existing contour."
        image={img.masterplan}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="group relative overflow-hidden rounded-4xl soft-shadow">
              <img
                src={img.masterplan}
                alt="Mandhara masterplan aerial"
                loading="lazy"
                className="h-[36rem] w-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.012_60)]/45 to-transparent" />
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActive(z)}
                  style={{ left: `${z.x}%`, top: `${z.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  aria-label={z.name}
                >
                  <span
                    className={`relative grid h-12 w-12 place-items-center rounded-full border transition-all duration-500 ${
                      active.id === z.id
                        ? "scale-125 border-accent bg-accent/90"
                        : "border-white/60 bg-white/15 backdrop-blur-md hover:scale-110"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                    <span className="shimmer absolute inset-0 rounded-full border border-accent/60" />
                  </span>
                  <span className="mt-2 block whitespace-nowrap text-[0.55rem] uppercase tracking-[0.25em] text-white">
                    {z.name}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="self-center"
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
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Eyebrow>Zone Index</Eyebrow>
        <SplitText text="Every zone, at a glance." className="display mt-6 text-4xl md:text-6xl" />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ZONES.map((z, i) => (
            <Reveal key={z.id} delay={i * 0.06}>
              <button
                onClick={() => setActive(z)}
                className="h-full w-full rounded-3xl bg-card p-8 text-left soft-shadow transition-transform duration-700 hover:-translate-y-2"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-accent">{z.purpose}</p>
                <h3 className="display mt-3 text-3xl">{z.name}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                  {z.overview}
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="See the plan on the ground."
        text="We'll walk the zone that interests you most, at the hour it looks best."
        label="Book a masterplan tour"
      />
    </>
  );
}
