import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { HoverShowcase, type ShowcaseItem } from "@/components/site/HoverShowcase";
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

const VENUES: ShowcaseItem[] = [
  {
    id: "banquet",
    title: "Grand Banquet",
    meta: "900 guests",
    text: "Two pillarless halls of 10,000 sq ft each, 9 m ceilings, pre-function lounges and custom staging.",
    image: img.banquet,
  },
  {
    id: "ground",
    title: "Event Ground",
    meta: "2,500 guests",
    text: "Open ground with independent access, festival staging, valet parking and a 4,000-strong Garba night record.",
    image: img.eventGround,
  },
  {
    id: "lawn",
    title: "Lakeside Lawn",
    meta: "600 guests",
    text: "Sunset ceremonies with water on three sides, string lighting and a draped mandap deck.",
    image: img.lawn,
  },
  {
    id: "restaurant",
    title: "Outdoor Restaurant",
    meta: "180 guests",
    text: "Intimate dinners under the old rain trees, with the boutique kitchen serving straight to the lawn.",
    image: img.dining,
  },
  {
    id: "pavilion",
    title: "Pavilion Club",
    meta: "Members",
    text: "The social heart: indoor games, multi-purpose halls, bridal suites and wedding rooms for the party.",
    image: img.clubhouse,
  },
];

const CALENDAR = [
  {
    id: "winter",
    months: "Nov – Feb",
    title: "Wedding season",
    text: "Cool evenings, clear skies, peak demand across both banquets and the lakeside lawn.",
    image: img.lawn,
  },
  {
    id: "spring",
    months: "Mar – May",
    title: "Corporate & offsites",
    text: "Early-morning programmes, shaded lawns and resort keys for the whole delegation.",
    image: img.clubhouse,
  },
  {
    id: "monsoon",
    months: "Jun – Sep",
    title: "Monsoon celebrations",
    text: "Covered banquet halls and dramatic light over the lake for indoor-outdoor events.",
    image: img.banquet,
  },
  {
    id: "festival",
    months: "Oct",
    title: "Festival calendar",
    text: "Estate-wide lighting, live concerts at the amphitheatre and 4,000-person Garba nights.",
    image: img.eventGround,
  },
] as const;

function Club() {
  return (
    <>
      <PageHero
        eyebrow="Club & Events"
        title="Where celebrations become family history."
        intro="Five venues, one landscape, and a hospitality team that has already thought about the things you haven't."
        image={img.club}
      />

      <Section>
        <HoverShowcase
          items={VENUES}
          side="left"
          height="h-[32rem] md:h-[40rem]"
          columns="lg:grid-cols-[1fr_1.05fr]"
          header={
            <>
              <Eyebrow>Venues</Eyebrow>
              <SplitText
                text="Room for two hundred, or four thousand."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              />
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Hover or tab a venue to see it set
              </p>
            </>
          }
        />
      </Section>

      <Section className="bg-muted/40">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
          <MaskedImage src={img.lawn} alt="Wedding lawn at dusk" className="h-[36rem]" />
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
                  ["5", "Venues"],
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
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CALENDAR.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -12 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full overflow-hidden rounded-3xl bg-card soft-shadow"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.012_60)]/80 to-transparent" />
                  <span className="absolute inset-x-0 bottom-4 px-6 text-[0.6rem] uppercase tracking-[0.3em] text-accent">
                    {c.months}
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-full" />
                </div>
                <div className="p-7">
                  <h3 className="display text-2xl transition-colors duration-500 group-hover:text-primary">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Hold a date at Mandhara."
        text="Send us the season and the guest count — we'll come back with venues, layouts and a walkthrough slot."
        label="Check availability"
        image={img.banquet}
        points={[
          ["Banquets", "2 pillarless halls, 10,000 sq ft each"],
          ["Stay", "120 resort keys plus bridal suites"],
          ["Services", "Planners, catering, décor, valet, AV"],
        ]}
      />
    </>
  );
}
