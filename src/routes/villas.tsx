import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { HoverShowcase, type ShowcaseItem } from "@/components/site/HoverShowcase";
import { Eyebrow, Magnetic, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";
import { NICQE, VILLAS } from "@/lib/project";

export const Route = createFileRoute("/villas")({
  head: () => ({
    meta: [
      { title: `Villa Enclave — ${VILLAS.total} Villas at Mandhara` },
      {
        name: "description",
        content: `${VILLAS.total} private villas across two enclaves: ${VILLAS.nicqe} in Nicqe with two clubhouses and ${NICQE.gardenValleys} garden valleys, and ${VILLAS.orion} revenue-sharing villas in Orion. Explore configurations and plot sizes.`,
      },
      { property: "og:title", content: "Mandhara Villa Enclave" },
      {
        property: "og:description",
        content: `${VILLAS.total} villas across the Nicqe and Orion enclaves.`,
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Villas,
});

/**
 * The real product line, from the brochure floor plans and the Area Sheet.
 * Plot sizes are in square yards — the unit the brochure and the Area Sheet use.
 *
 * TODO(client): room-by-room schedules and dimensions per configuration are not
 * published here yet. Pull them from the Mandhara Website Content Brief (§6)
 * once its figures have been signed off — do not paraphrase them from the
 * floor-plan images. See CLIENT-QUERIES.md.
 */
const TYPES: ShowcaseItem[] = [
  {
    id: "quinox",
    title: "Quinox",
    meta: "1 BHK",
    text: "The entry configuration in the enclave, on a four-hundred-square-yard plot.",
    image: img.quinox,
    details: [
      ["Configuration", "1 BHK"],
      ["Plot", "400 sq. yd"],
    ],
  },
  {
    id: "orion-villa",
    title: "Orion",
    meta: "2 BHK",
    text: "A two-bedroom plan on the same four-hundred-square-yard plot. This is the villa model: the Orion enclave elsewhere on this page is a different thing that shares the name.",
    image: img.orion,
    details: [
      ["Configuration", "2 BHK"],
      ["Plot", "400 sq. yd"],
    ],
  },
  {
    id: "revenue-villa",
    title: "Revenue Sharing Villa",
    meta: "2 BHK · investment",
    text: "The hospitality-managed product: a two-bedroom villa with a private swimming pool, deck and courtyard, run by the resort team when you are away.",
    image: img.rshare,
    details: [
      ["Configuration", "2 BHK"],
      ["Plot", "400 sq. yd"],
      ["Includes", "Private pool, deck, courtyard"],
    ],
  },
  {
    id: "equinox-3",
    title: "Equinox",
    meta: "3 BHK",
    text: "The three-bedroom plan, on a six-hundred-square-yard plot.",
    image: img.equinox,
    details: [
      ["Configuration", "3 BHK"],
      ["Plot", "600 sq. yd"],
    ],
  },
  {
    id: "equinox-4",
    title: "Equinox",
    meta: "4 BHK",
    text: "The largest plot in the enclave, at eight hundred square yards, drawn in two distinct four-bedroom layouts.",
    image: img.equinox2,
    details: [
      ["Configuration", "4 BHK"],
      ["Plot", "800 sq. yd"],
      ["Layouts", "Two variants"],
    ],
  },
];

function Compare() {
  const [pos, setPos] = useState(55);
  return (
    <div className="relative overflow-hidden rounded-4xl soft-shadow">
      <img
        src={img.blacknigga}
        alt="Villa at night"
        loading="lazy"
        className="h-[34rem] w-full object-cover"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={img.whitenigga}
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
        className="absolute inset-x-0 bottom-8 mx-auto w-2/3 accent-[var(--brand-primary)]"
      />
      <div className="pointer-events-none absolute left-6 top-6 label text-white/80">
        Day
      </div>
      <div className="pointer-events-none absolute right-6 top-6 label text-white/80">
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
        title={`${VILLAS.total} villas, across two enclaves.`}
        intro={`${VILLAS.nicqe} homes in Nicqe, along garden valleys and around two clubhouses of its own — and ${VILLAS.orion} revenue-sharing homes in Orion, managed by the resort.`}
        image={img.villa}
      />

      {/* NICQE — the main residential enclave. Brochure p.2, p.5. */}
      <Section id="nicqe" className="scroll-mt-24">
        <HoverShowcase
          items={TYPES}
          side="left"
          height="h-[32rem] md:h-[40rem]"
          columns="lg:grid-cols-[1fr_1.1fr]"
          header={
            <>
              <Eyebrow>Nicqe: The Enclave</Eyebrow>
              {/* <SplitText
                text="Five configurations. One landscape."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              /> */}
              <p className="mb-4 mt-8 max-w-lg body-copy text-muted-foreground">
                Homes run from a single-bedroom Quinox on four hundred square yards to a
                four-bedroom Equinox on eight hundred. Hover or tab a configuration to see its plot
                and layout.
              </p>
            </>
          }
          footer={
            <>
              <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                  [String(VILLAS.nicqe), "Villas in Nicqe"],
                  [String(NICQE.clubhouses), "Clubhouses in Nicqe"],
                  [String(NICQE.gardenValleys), "Garden valleys in Nicqe"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="display tabular text-5xl text-primary md:text-6xl">{n}</p>
                    <p className="label mt-3 text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-lg text-xs font-light leading-relaxed text-muted-foreground">
                The two clubhouses and the garden valleys belong to Nicqe. Orion villas have access
                to the club amenities rather than a clubhouse of their own.
              </p>
            </>
          }
        />
      </Section>

      {/* ORION — the revenue-sharing enclave. Brochure p.2. */}
      <Section id="orion" className="scroll-mt-24 bg-muted/40">
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div>
            <Eyebrow>Orion : Revenue Sharing</Eyebrow>
            {/* <SplitText
              text="Fifty-four villas that work while you are away."
              className="display mt-8 text-4xl md:text-6xl"
            /> */}
          </div>
          <Reveal delay={0.1} className="space-y-8">
            <p className="body-copy text-muted-foreground">
              Orion is the investment enclave. The villa is yours outright; the resort team runs it
              as part of the hospitality inventory when you are not using it, and you share in what
              it earns.
            </p>
            <ul className="space-y-0">
              {[
                [`${VILLAS.orion} Villas`, "A separate enclave within the masterplan."],
                [
                  "Access to Club Amenities",
                  "Orion owners use the estate's club facilities rather than a dedicated clubhouse.",
                ],
                [
                  "Managed by Resort",
                  "Bookings, housekeeping and upkeep are handled by the resort operation.",
                ],
              ].map(([t, d]) => (
                <li key={t} className="border-t border-border py-6">
                  <h3 className="card-title display text-2xl">{t}</h3>
                  <p className="card-copy mt-2 text-muted-foreground">
                    {d}
                  </p>
                </li>
              ))}
            </ul>
            <Magnetic>
              <Link
                to="/revenue"
                className="btn-pill btn-label bg-primary text-primary-foreground transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
              >
                See the revenue-sharing model
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Eyebrow>Day / Night</Eyebrow>
        {/* <SplitText
          text="The same villa, twelve hours apart."
          className="display mb-12 mt-6 text-4xl md:text-6xl"
        /> */}
        <Reveal>
          <Compare />
        </Reveal>
      </Section>

      {/*
        A "Construction Philosophy" section used to sit here — load-bearing stone,
        lime plaster, deep overhangs, on-plot rain harvesting, solar/EV-ready
        services — alongside a "Plot & Layout Logic" card claiming 3 m setbacks,
        two cars on plot and a rear service lane. None of it appears in the
        brochure and no other source has been produced, so it is not published.
        Restore it only against a document the client confirms. See CLIENT-QUERIES.md.
      */}

      {/* <CtaBand
        title="Choose your configuration."
        text={`Availability moves across both enclaves. Tell us the configuration and we'll come back with what is open on the ${VILLAS.total}-plot Area Sheet.`}
        label="Request availability"
        image={img.villaLake}
        points={[
          ["Quinox / Orion", "1 and 2 BHK · 400 sq. yd plots"],
          ["Equinox", "3 BHK on 600 sq. yd · 4 BHK on 800 sq. yd"],
          ["Revenue Sharing", "2 BHK · 400 sq. yd · private pool, deck, courtyard"],
        ]}
      /> */}
    </>
  );
}
