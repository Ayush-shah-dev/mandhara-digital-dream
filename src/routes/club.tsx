import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Eyebrow, MaskedImage, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/club")({
  head: () => ({
    meta: [
      { title: "Club & Events at Mandhara — A Wedding Destination" },
      {
        name: "description",
        content:
          "Banquet halls, an open event ground and lakeside lawns built for weddings and celebrations at Mandhara.",
      },
      { property: "og:title", content: "Club & Events at Mandhara" },
      {
        property: "og:description",
        content: "Banquets, lawns and an event ground shaped for unforgettable celebrations.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Club,
});

const VENUES = [
  ["Grand Banquet", "900 guests", "Column-free hall with a 9 m ceiling and private foyer."],
  ["Event Ground", "2,500 guests", "Open ground with independent access, staging and parking."],
  ["Lakeside Lawn", "600 guests", "Sunset ceremonies with water on three sides."],
  ["Outdoor Restaurant", "180 guests", "Intimate dinners under the old rain trees."],
] as const;

const CALENDAR = [
  ["Nov – Feb", "Wedding season", "Cool evenings, clear skies, peak demand."],
  ["Mar – May", "Corporate & offsites", "Early-morning programmes and shaded lawns."],
  ["Jun – Sep", "Monsoon celebrations", "Covered banquet, dramatic light over the lake."],
  ["Oct", "Festival calendar", "Estate-wide lighting and cultural evenings."],
] as const;

function Club() {
  return (
    <>
      <PageHero
        eyebrow="Club & Events"
        title="Where celebrations become family history."
        intro="Four venues, one landscape, and a hospitality team that has already thought about the things you haven't."
        image={img.club}
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div>
            <Eyebrow>Venues</Eyebrow>
            <SplitText
              text="Room for two hundred, or two thousand."
              className="display mt-8 text-4xl md:text-6xl"
            />
          </div>
          <Reveal delay={0.1}>
            <div className="space-y-0">
              {VENUES.map(([n, c, d]) => (
                <div key={n} className="grid gap-2 border-t border-border py-8 md:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="display text-3xl">{n}</h3>
                    <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                      {d}
                    </p>
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-accent md:self-center">
                    {c}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
          <MaskedImage src={img.club} alt="Wedding lawn at dusk" className="h-[36rem]" />
          <div>
            <Eyebrow>Wedding Stories</Eyebrow>
            <SplitText
              text="Three days, one estate, zero logistics."
              className="display mt-8 text-4xl md:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-base font-light leading-relaxed text-muted-foreground">
                Guests stay at the resort, ceremonies move between lawn and lake, and
                the banquet takes the night. Nobody drives anywhere in between.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  ["120", "Resort keys"],
                  ["4", "Venues"],
                  ["1", "Planner"],
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
        </div>
      </Section>

      <Section>
        <Eyebrow>Calendar</Eyebrow>
        <SplitText text="The estate through the year." className="display mt-6 text-4xl md:text-6xl" />
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {CALENDAR.map(([m, t, d], i) => (
            <Reveal key={m} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-card p-8 soft-shadow transition-transform duration-700 hover:-translate-y-2">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-accent">{m}</p>
                <h3 className="display mt-3 text-2xl">{t}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Hold a date at Mandhara."
        text="Send us the season and the guest count — we'll come back with venues and a walkthrough slot."
        label="Check availability"
      />
    </>
  );
}
