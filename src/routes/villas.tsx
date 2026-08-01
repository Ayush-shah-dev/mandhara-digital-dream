import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { HoverShowcase, type ShowcaseItem } from "@/components/site/HoverShowcase";
import { Eyebrow, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/villas")({
  head: () => ({
    meta: [
      { title: "Villa Enclave — 354 Villas at Mandhara" },
      {
        name: "description",
        content:
          "354 private villas, two clubhouses, garden valleys and tree-lined roads. Explore villa types, plot sizes and interiors at Mandhara.",
      },
      { property: "og:title", content: "Mandhara Villa Enclave" },
      {
        property: "og:description",
        content: "354 villas across garden valleys, with two clubhouses at their heart.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Villas,
});

const TYPES: ShowcaseItem[] = [
  {
    id: "valley",
    title: "Valley Villa",
    meta: "3 BHK + study",
    text: "The garden-valley plan: a single storey stepping down with the contour, front lawn and rear service court.",
    image: img.villaValley,
    details: [
      ["Plot", "2,400 sq ft"],
      ["Built-up", "2,850 sq ft"],
      ["Layout", "3 BHK + study"],
    ],
  },
  {
    id: "garden",
    title: "Garden Villa",
    meta: "4 BHK + court",
    text: "Rooms wrap a private courtyard with a water bowl, timber screens and a double-height living volume.",
    image: img.villaGarden,
    details: [
      ["Plot", "3,600 sq ft"],
      ["Built-up", "4,100 sq ft"],
      ["Layout", "4 BHK + court"],
    ],
  },
  {
    id: "lake",
    title: "Lake Villa",
    meta: "4 BHK + pool",
    text: "The waterfront plan: private pool deck, full-width glazing to Sheen Lake and an upper sunset terrace.",
    image: img.villaLake,
    details: [
      ["Plot", "5,400 sq ft"],
      ["Built-up", "6,200 sq ft"],
      ["Layout", "4 BHK + pool"],
    ],
  },
  {
    id: "plan",
    title: "Plot & Layout Logic",
    meta: "How it fits",
    text: "Every plot is drawn from the contour survey: parking absorbed on-plot, service lane behind, no two homes facing each other.",
    image: img.planDrawing,
    details: [
      ["Setbacks", "3 m green edge"],
      ["Parking", "2 cars on plot"],
      ["Access", "Rear service lane"],
    ],
  },
];

const CONSTRUCTION: ShowcaseItem[] = [
  {
    id: "facade",
    title: "Stone and lime facades",
    meta: "Material",
    text: "Load-bearing stone with lime plaster — surfaces that weather warmer with each monsoon instead of fading.",
    image: img.facade,
  },
  {
    id: "overhang",
    title: "Deep overhangs",
    meta: "Climate",
    text: "Roof projections sized for monsoon rain and summer sun, so windows stay open through the year.",
    image: img.build,
  },
  {
    id: "ventilation",
    title: "Cross-ventilated plans",
    meta: "Comfort",
    text: "Every habitable room has two openings; mechanical cooling is a fallback, not the default.",
    image: img.villaGarden,
  },
  {
    id: "water",
    title: "Rain harvesting on every plot",
    meta: "Water",
    text: "Roof and surface runoff is recharged on plot, with the overflow channelled back to Sheen Lake.",
    image: img.lake,
  },
  {
    id: "future",
    title: "Solar-ready, EV-ready",
    meta: "Services",
    text: "Roofs pre-conduited for panels and porches wired for chargers, so retrofits never break a wall.",
    image: img.villaValley,
  },
];

function Compare() {
  const [pos, setPos] = useState(55);
  return (
    <div className="relative overflow-hidden rounded-4xl soft-shadow">
      <img src={img.villa} alt="Villa at night" loading="lazy" className="h-[34rem] w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={img.garden}
          alt="Villa gardens by day"
          loading="lazy"
          className="h-[34rem] w-[100vw] max-w-none object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-accent"
        style={{ left: `${pos}%` }}
      />
      <input
        type="range"
        min={5}
        max={95}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare day and night"
        className="absolute inset-x-0 bottom-8 mx-auto w-2/3 accent-[oklch(0.673_0.093_85)]"
      />
      <div className="pointer-events-none absolute left-6 top-6 text-[0.6rem] uppercase tracking-[0.3em] text-white/80">
        Day
      </div>
      <div className="pointer-events-none absolute right-6 top-6 text-[0.6rem] uppercase tracking-[0.3em] text-white/80">
        Night
      </div>
    </div>
  );
}

function Villas() {
  return (
    <>
      <PageHero
        eyebrow="Villa Enclave"
        title="354 villas, and not one of them in a row."
        intro="Homes arranged along garden valleys, each with a private edge of green and a short walk to one of two clubhouses."
        image={img.villa}
      />

      <Section>
        <HoverShowcase
          items={TYPES}
          side="left"
          height="h-[32rem] md:h-[40rem]"
          columns="lg:grid-cols-[1fr_1.1fr]"
          header={
            <>
              <Eyebrow>The Enclave</Eyebrow>
              <SplitText
                text="Three plans. Endless orientation."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              />
              <p className="mb-4 max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
                Roads follow the valleys, so no home looks directly into another. Hover or
                tab a villa type to see the plot, built-up area and layout come alive.
              </p>
            </>
          }
          footer={
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                ["354", "Villas"],
                ["2", "Clubhouses"],
                ["18", "Garden valleys"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="display text-4xl text-primary">{n}</p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.25em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          }
        />
      </Section>

      <Section className="bg-muted/40">
        <Eyebrow>Day / Night</Eyebrow>
        <SplitText text="The same villa, twelve hours apart." className="display mb-12 mt-6 text-4xl md:text-6xl" />
        <Reveal>
          <Compare />
        </Reveal>
      </Section>

      <Section className="bg-secondary text-[oklch(0.96_0.01_84)]">
        <HoverShowcase
          items={CONSTRUCTION}
          side="right"
          tone="dark"
          height="h-[32rem] md:h-[38rem]"
          columns="lg:grid-cols-[1.05fr_1fr]"
          header={
            <>
              <p className="eyebrow text-accent">Construction Philosophy</p>
              <SplitText
                text="Built to weather, not to shine."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              />
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
                Hover or tab a principle to see it built
              </p>
            </>
          }
        />
      </Section>

      <CtaBand
        title="Choose your valley."
        text="Plot availability moves quickly across NICQE and RIME. We'll walk you through what's open."
        label="Request availability"
        image={img.villaLake}
        points={[
          ["Valley Villa", "2,400 sq ft plot · 3 BHK + study"],
          ["Garden Villa", "3,600 sq ft plot · 4 BHK + court"],
          ["Lake Villa", "5,400 sq ft plot · 4 BHK + pool"],
        ]}
      />
    </>
  );
}
