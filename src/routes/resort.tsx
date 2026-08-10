import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { HoverShowcase, type ShowcaseItem } from "@/components/site/HoverShowcase";
import { Eyebrow, MaskedImage, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";
import { RESORT } from "@/lib/project";

export const Route = createFileRoute("/resort")({
  head: () => ({
    meta: [
      { title: "Rime — The Resort at Mandhara" },
      {
        name: "description",
        content:
          `${RESORT.suites} suites across Presidential, Standard and Junior categories, with spa, pool, gym and dining at Rime, the Mandhara resort.`,
      },
      { property: "og:title", content: "The Resort at Mandhara" },
      {
        property: "og:description",
        content: "Suites, spa, pool and dining at Rime, the resort zone of Mandhara.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resort,
});

/**
 * The brochure names three suite categories (p.2) and the p.14 key-map shows
 * three outlooks alongside the lawn-facing villas. Room-level descriptions —
 * plunge pools, soaking tubs, bedroom counts — were invented and are not
 * published. TODO(client): supply real suite copy. See CLIENT-QUERIES.md.
 */
const SUITES = [
  {
    name: "Presidential Suite",
    text: "The largest of the three categories at Rime.",
    image: img.suite,
  },
  {
    name: "Standard Suite",
    text: "The core of the sixty-key inventory.",
    image: img.villa,
  },
  {
    name: "Junior Suite",
    text: "The compact category, in the same architecture and finish.",
    image: img.pool,
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
    title: "Lakeside & Promenade",
    meta: "1 km",
    text: "Guided dawn lake walks and birding decks along the kilometre of promenade that rings Sheen Lake.",
    image: img.promenade,
  },
];

function Resort() {
  return (
    <>
      <PageHero
        eyebrow="The Resort"
        title="Rime — a retreat that happens to be next door."
        intro={`Wellness, dining and ${RESORT.suites} suites gathered in the Rime zone — open to guests, and to residents who never have to travel for it.`}
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
              <p className="mt-8 max-w-md body-copy text-muted-foreground">
                The spa is built half a level below grade, so the treatment rooms open
                onto a water channel and the noise of the day disappears at the door.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Eyebrow>Suites</Eyebrow>
        <SplitText
          text={`${RESORT.suites} suites, three categories.`}
          className="display mt-6 text-4xl md:text-6xl"
        />
        <p className="mt-6 max-w-xl body-copy text-muted-foreground">
          {RESORT.suites} suites across {RESORT.categories.join(", ")} categories,
          including {RESORT.outlooks.join(", ")} suite options.
        </p>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
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
                <div className="p-8 md:p-10">
                  <h3 className="card-title display text-3xl">{s.name}</h3>
                  <p className="card-copy mt-3 text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="facilities" className="scroll-mt-24">
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
              <p className="mb-4 label text-muted-foreground">
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
          [
            "Suites",
            `${RESORT.suites} across ${RESORT.categories.join(", ")} categories, with ${RESORT.outlooks.join(", ")} options`,
          ],
          ["Included", "Spa access, dawn lake walk, estate breakfast"],
          ["Best months", "October to February, book early"],
        ]}
      />
    </>
  );
}
