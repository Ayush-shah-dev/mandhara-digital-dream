import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Eyebrow, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — Getting to Mandhara" },
      {
        name: "description",
        content:
          "Travel times to Mandhara from the airport, expressway, schools, hospitals and nearby attractions.",
      },
      { property: "og:title", content: "Location — Getting to Mandhara" },
      {
        property: "og:description",
        content: "Far enough for quiet, close enough for everything else.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Location,
});

const NEARBY = [
  ["International Airport", "55 min", "Direct expressway run, no city crossing."],
  ["Expressway Exit", "12 min", "A clean, signal-free approach to the gate."],
  ["Schools", "20 min", "Three international curricula within a short drive."],
  ["Hospitals", "18 min", "Multi-speciality care with 24/7 emergency."],
  ["Heritage Town", "35 min", "Weekend markets, temples and old streets."],
  ["Hill Viewpoint", "40 min", "Sunrise drives that are worth the alarm."],
] as const;

function Location() {
  return (
    <>
      <PageHero
        eyebrow="Location"
        title="Far enough for quiet. Close enough for everything."
        intro="Mandhara sits off the expressway, with the airport under an hour away and the city out of earshot."
        image={img.hero}
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <div>
            <Eyebrow>Nearby</Eyebrow>
            <SplitText text="The map, in minutes." className="display mt-8 text-4xl md:text-6xl" />
          </div>
          <Reveal delay={0.1}>
            <div>
              {NEARBY.map(([n, t, d]) => (
                <div
                  key={n}
                  className="group grid gap-2 border-t border-border py-7 transition-colors duration-500 hover:border-primary md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <h3 className="display text-2xl transition-colors duration-500 group-hover:text-primary">
                      {n}
                    </h3>
                    <p className="mt-1 text-sm font-light text-muted-foreground">{d}</p>
                  </div>
                  <p className="text-[0.68rem] uppercase tracking-[0.25em] text-accent md:self-center">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Reveal>
          <div className="overflow-hidden rounded-4xl soft-shadow">
            <iframe
              title="Mandhara location map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.30%2C12.75%2C77.80%2C13.15&layer=mapnik"
              className="h-[32rem] w-full border-0"
              loading="lazy"
            />
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="We'll send a car."
        text="Site visits include pickup from the airport or the city, by arrangement."
        label="Arrange pickup"
      />
    </>
  );
}
