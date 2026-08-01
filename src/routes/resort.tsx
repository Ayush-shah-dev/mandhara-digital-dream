import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { HoverShowcase, type ShowcaseItem } from "@/components/site/HoverShowcase";
import { Eyebrow, MaskedImage, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/resort")({
  head: () => ({
    meta: [
      { title: "The Resort at Mandhara — Suites, Spa and Lakeside Wellness" },
      {
        name: "description",
        content:
          "Presidential and junior suites, spa, pools, gym and lakeside dining at the Mandhara resort.",
      },
      { property: "og:title", content: "The Resort at Mandhara" },
      {
        property: "og:description",
        content: "Suites, spa, pools and lakeside dining, held inside a hundred green acres.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resort,
});

const SUITES = [
  {
    name: "Presidential Suite",
    text: "Two bedrooms, private plunge pool and a wraparound deck over the water.",
    image: img.suite,
  },
  {
    name: "Junior Suite",
    text: "A single volume opening entirely to the canopy, with a stone soaking tub.",
    image: img.villa,
  },
] as const;

const FACILITIES: ShowcaseItem[] = [
  {
    id: "spa",
    title: "Spa & Wellness",
    meta: "Six rooms",
    text: "Six treatment rooms, steam and sauna, and an outdoor cold plunge half a level below grade.",
    image: img.spa,
  },
  {
    id: "pool",
    title: "Swimming Pool",
    meta: "30 metres",
    text: "A 30-metre infinity edge facing the sunset, with a shaded family shallow.",
    image: img.pool,
  },
  {
    id: "gym",
    title: "Gymnasium",
    meta: "Open 5 am",
    text: "Full strength and cardio floor opening to a shaded terrace and yoga deck.",
    image: img.gym,
  },
  {
    id: "dining",
    title: "Boutique Restaurant",
    meta: "Wood fire",
    text: "Wood-fire kitchen with produce from the estate orchard, and dinner served outdoors.",
    image: img.dining,
  },
  {
    id: "bar",
    title: "Library Bar",
    meta: "Quiet room",
    text: "Quiet corners, long pours, and no television anywhere in the room.",
    image: img.bar,
  },
  {
    id: "lake",
    title: "Lakeside & Trails",
    meta: "8 km",
    text: "Guided dawn lake walks, birding decks, a floating bar and the promenade loop.",
    image: img.promenade,
  },
];

function Resort() {
  return (
    <>
      <PageHero
        eyebrow="The Resort"
        title="A retreat that happens to be next door."
        intro="Wellness, dining and suites arranged along the lake's northern shoulder — open to guests, and to residents who never have to travel for it."
        image={img.resort}
      />

      <Section>
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
          <MaskedImage src={img.spa} alt="Resort spa" className="h-[34rem]" />
          <div>
            <Eyebrow>Wellness</Eyebrow>
            <SplitText
              text="Water, heat, silence, repeat."
              className="display mt-8 text-4xl md:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-base font-light leading-relaxed text-muted-foreground">
                The spa is built half a level below grade, so the treatment rooms open
                onto a water channel and the noise of the day disappears at the door.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Eyebrow>Suites</Eyebrow>
        <SplitText text="Rooms with an unhurried view." className="display mt-6 text-4xl md:text-6xl" />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {SUITES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.12}>
              <div className="group overflow-hidden rounded-4xl bg-card soft-shadow">
                <div className="overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="h-[26rem] w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                  />
                </div>
                <div className="p-10">
                  <h3 className="display text-3xl">{s.name}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <HoverShowcase
          items={FACILITIES}
          side="left"
          height="h-[32rem] md:h-[38rem]"
          columns="lg:grid-cols-[1fr_1.05fr]"
          header={
            <>
              <Eyebrow>Facilities</Eyebrow>
              <SplitText
                text="Everything, within a walk."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              />
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Hover or tab a facility to preview it
              </p>
            </>
          }
        />
      </Section>

      <section className="relative h-[70vh] overflow-hidden">
        <MaskedImage src={img.dining} alt="Lakeside dining" className="h-full rounded-none" />
        <div className="absolute inset-0 bg-[oklch(0.17_0.012_60)]/45" />
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <SplitText
            text="Dinner outdoors, nine months of the year."
            className="display max-w-3xl text-4xl text-[oklch(0.97_0.01_84)] md:text-6xl"
          />
        </div>
      </section>

      <CtaBand
        title="Stay a night before you decide."
        text="Resort stays are open to prospective residents — arrive Friday, walk the estate Saturday."
        label="Enquire about a stay"
        image={img.suite}
        points={[
          ["Suites", "Presidential, island-facing, pool and junior"],
          ["Included", "Spa access, dawn lake walk, estate breakfast"],
          ["Best months", "October to February, book early"],
        ]}
      />
    </>
  );
}
