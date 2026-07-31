import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { CtaBand } from "@/components/site/PageHero";
import { Magnetic, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Amenities at Mandhara — Fourteen Worlds, One Journey" },
      {
        name: "description",
        content:
          "Spa, restaurant, pool, lake, sports, gardens, club, trails, kids area, lawns, banquet, wellness, meditation and God's Garden — an immersive scroll through Mandhara's amenities.",
      },
      { property: "og:title", content: "Amenities at Mandhara" },
      {
        property: "og:description",
        content: "An immersive scrolling journey through fourteen amenities at Mandhara.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Amenities,
});

type Amenity = {
  name: string;
  line: string;
  text: string;
  stat: [string, string];
  image: string;
  tint: string;
  leaf?: boolean;
};

const AMENITIES: Amenity[] = [
  {
    name: "Spa",
    line: "Half a level below the world.",
    text: "Six treatment rooms opening onto a water channel, with steam, cold plunge and a silent lounge.",
    stat: ["6", "Treatment rooms"],
    image: img.spa,
    tint: "oklch(0.42 0.09 45)",
  },
  {
    name: "Restaurant",
    line: "Wood fire, long tables, late evenings.",
    text: "Estate produce cooked over open flame, served under rain trees strung with lanterns.",
    stat: ["180", "Covers"],
    image: img.dining,
    tint: "oklch(0.36 0.07 55)",
  },
  {
    name: "Swimming Pool",
    line: "Thirty metres facing the sunset.",
    text: "An infinity edge that drops toward the canopy, with a shaded shallow deck for afternoons.",
    stat: ["30 m", "Infinity edge"],
    image: img.resort,
    tint: "oklch(0.42 0.06 220)",
  },
  {
    name: "Sheen Lake",
    line: "The still centre.",
    text: "A promenade, a jetty and a pavilion — plus birding decks that fill up before sunrise.",
    stat: ["11", "Acres of water"],
    image: img.lake,
    tint: "oklch(0.40 0.08 70)",
    leaf: true,
  },
  {
    name: "Sports",
    line: "Play, then swim, then eat.",
    text: "Tennis, badminton, a half-court and a cricket net, all under floodlights.",
    stat: ["5", "Courts"],
    image: img.garden,
    tint: "oklch(0.34 0.07 150)",
  },
  {
    name: "Garden",
    line: "Seasonal, deliberate, native.",
    text: "Planting keyed to bloom in sequence, so something is always in flower somewhere.",
    stat: ["70+", "Native species"],
    image: img.garden,
    tint: "oklch(0.33 0.07 145)",
    leaf: true,
  },
  {
    name: "Club",
    line: "Two houses, one enclave.",
    text: "Lounges, a reading room, indoor games and a café that opens onto the pool deck.",
    stat: ["2", "Clubhouses"],
    image: img.villa,
    tint: "oklch(0.32 0.05 60)",
  },
  {
    name: "Walking Trail",
    line: "Four kilometres without a road crossing.",
    text: "A continuous loop through valleys, orchard and lakefront, lit low for evening walks.",
    stat: ["4 km", "Loop"],
    image: img.garden,
    tint: "oklch(0.36 0.06 140)",
    leaf: true,
  },
  {
    name: "Kids Area",
    line: "Built for scraped knees.",
    text: "Natural play — timber structures, sand, water channels and a shaded parents' deck.",
    stat: ["1.2", "Acres"],
    image: img.garden,
    tint: "oklch(0.44 0.09 85)",
  },
  {
    name: "Outdoor Lawn",
    line: "Where the estate gathers.",
    text: "Open green for concerts, festivals, film nights and Sunday markets.",
    stat: ["600", "Guests"],
    image: img.club,
    tint: "oklch(0.38 0.08 50)",
  },
  {
    name: "Banquet",
    line: "Column-free, nine metres tall.",
    text: "A hall that takes a full wedding without a single sightline compromised.",
    stat: ["900", "Guests"],
    image: img.club,
    tint: "oklch(0.34 0.08 40)",
  },
  {
    name: "Wellness",
    line: "Strength, breath, recovery.",
    text: "Gym, yoga deck and recovery suite, with dawn lake walks led by the resort team.",
    stat: ["24/7", "Access"],
    image: img.suite,
    tint: "oklch(0.36 0.05 100)",
  },
  {
    name: "Meditation",
    line: "A room with almost nothing in it.",
    text: "A stone pavilion with a single oculus, oriented to the sunrise over the water.",
    stat: ["1", "Oculus"],
    image: img.garden,
    tint: "oklch(0.30 0.04 130)",
  },
  {
    name: "God's Garden",
    line: "The quietest acre at Mandhara.",
    text: "A grove around a shrine, with stone seating, still water and evening lamps.",
    stat: ["1", "Sacred grove"],
    image: img.lake,
    tint: "oklch(0.35 0.08 65)",
    leaf: true,
  },
];

function Panel({ a, index }: { a: Amenity; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[110svh] overflow-hidden">
      <motion.img
        src={a.image}
        alt={a.name}
        loading="lazy"
        style={{ scale, y }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ background: `linear-gradient(180deg, ${a.tint}, oklch(0.17 0.012 60))`, opacity: 0.72 }}
      />
      <Atmosphere density={a.leaf ? 24 : 30} leaf={a.leaf ?? false} />

      <motion.div
        style={{ opacity }}
        className="relative flex h-full items-center px-6 md:px-12"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 text-[oklch(0.97_0.01_84)] md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.4em] text-accent">
              <span className="inline-block h-px w-10 bg-accent/60" />
              {String(index + 1).padStart(2, "0")} · {a.name}
            </p>
            <SplitText text={a.line} className="display mt-8 text-5xl md:text-8xl" />
            <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/75">
              {a.text}
            </p>
          </div>
          <div className="shrink-0 rounded-3xl glass px-8 py-6 text-center">
            <p className="display text-5xl text-accent">{a.stat[0]}</p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-white/70">
              {a.stat[1]}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Amenities() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <motion.div
        style={{ width }}
        className="fixed left-0 top-0 z-[75] h-[2px] bg-accent"
        aria-hidden="true"
      />

      <header className="relative grid h-[92svh] place-items-center overflow-hidden bg-night px-6 text-center text-[oklch(0.97_0.01_84)]">
        <Atmosphere density={40} />
        <div className="relative">
          <p className="eyebrow text-accent">Amenities</p>
          <SplitText
            text="Fourteen worlds. Keep scrolling."
            className="display mt-8 text-5xl md:text-8xl"
          />
          <p className="mx-auto mt-8 max-w-md text-sm font-light leading-relaxed text-white/60">
            Each amenity arrives with its own light, its own air and its own pace.
            Let the page take you through them.
          </p>
          <Magnetic>
            <a
              href="#spa"
              className="mt-10 inline-flex rounded-full border border-accent/60 px-8 py-4 text-[0.66rem] uppercase tracking-[0.25em] text-accent"
            >
              Begin the journey
            </a>
          </Magnetic>
        </div>
      </header>

      <div id="spa">
        {AMENITIES.map((a, i) => (
          <Panel key={a.name} a={a} index={i} />
        ))}
      </div>

      <CtaBand
        title="Experience them in one afternoon."
        text="Spa at three, lake at five, dinner under the trees. We'll set the sequence."
        label="Plan the afternoon"
      />
    </>
  );
}
