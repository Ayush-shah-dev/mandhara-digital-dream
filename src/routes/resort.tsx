import { createFileRoute } from "@tanstack/react-router";
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

const FACILITIES = [
  ["Spa", "Six treatment rooms, steam, and an outdoor cold plunge."],
  ["Swimming Pool", "A 30-metre infinity edge facing the sunset."],
  ["Gym", "Full strength and cardio floor, opening to a shaded terrace."],
  ["Wellness", "Yoga deck, sound therapy and guided lake walks at dawn."],
  ["Restaurant", "Wood-fire kitchen, produce from the estate orchard."],
  ["Library Bar", "Quiet corners, long pours, and no television."],
] as const;

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
        <Eyebrow>Facilities</Eyebrow>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FACILITIES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <TiltCard className="h-full rounded-3xl bg-card p-8 soft-shadow">
                <h3 className="display text-2xl">{t}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
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
      />
    </>
  );
}
