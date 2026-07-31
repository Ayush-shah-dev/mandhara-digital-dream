import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import {
  Eyebrow,
  MaskedImage,
  Reveal,
  Section,
  SplitText,
  TiltCard,
} from "@/components/site/primitives";
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

const TYPES = [
  { name: "Valley Villa", plot: "2,400 sq ft", built: "2,850 sq ft", beds: "3 BHK + study" },
  { name: "Garden Villa", plot: "3,600 sq ft", built: "4,100 sq ft", beds: "4 BHK + court" },
  { name: "Lake Villa", plot: "5,400 sq ft", built: "6,200 sq ft", beds: "4 BHK + pool" },
] as const;

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
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div>
            <Eyebrow>The Enclave</Eyebrow>
            <SplitText
              text="Privacy first, community second, traffic last."
              className="display mt-8 text-4xl md:text-6xl"
            />
          </div>
          <Reveal delay={0.1} className="space-y-6 text-base font-light leading-relaxed text-muted-foreground">
            <p>
              Roads follow the valleys, so no home looks directly into another. Parking
              is absorbed into each plot, service lanes run behind, and the walking
              trail links every cluster without crossing a road twice.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                ["354", "Villas"],
                ["2", "Clubhouses"],
                ["4 km", "Trails"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="display text-4xl text-primary">{n}</p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.25em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Eyebrow>Villa Types</Eyebrow>
        <SplitText text="Three plans. Endless orientation." className="display mt-6 text-4xl md:text-6xl" />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {TYPES.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <TiltCard className="h-full rounded-3xl bg-card p-10 soft-shadow">
                <h3 className="display text-3xl">{t.name}</h3>
                <dl className="mt-8 space-y-4 text-sm font-light">
                  {[
                    ["Plot", t.plot],
                    ["Built-up", t.built],
                    ["Layout", t.beds],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-border/70 pb-3">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Day / Night</Eyebrow>
        <SplitText text="The same villa, twelve hours apart." className="display mb-12 mt-6 text-4xl md:text-6xl" />
        <Reveal>
          <Compare />
        </Reveal>
      </Section>

      <Section className="bg-secondary text-[oklch(0.96_0.01_84)]">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <p className="eyebrow text-accent">Construction Philosophy</p>
            <SplitText
              text="Built to weather, not to shine."
              className="display mt-6 text-4xl md:text-6xl"
            />
            <Reveal delay={0.1}>
              <ul className="mt-10 space-y-4">
                {[
                  "Load-bearing stone and lime plaster facades",
                  "Deep overhangs for monsoon and summer sun",
                  "Cross-ventilated plans, minimal mechanical cooling",
                  "Rain harvesting on every plot",
                  "Solar-ready roofs and EV-ready porches",
                ].map((t) => (
                  <li key={t} className="flex gap-4 border-b border-white/15 pb-4 text-sm font-light text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <MaskedImage src={img.suite} alt="Villa interior" className="h-[34rem]" />
        </div>
      </Section>

      <CtaBand
        title="Choose your valley."
        text="Plot availability moves quickly across NICQE and RIME. We'll walk you through what's open."
        label="Request availability"
      />
    </>
  );
}
