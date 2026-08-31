import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { HoverShowcase, type ShowcaseItem } from "@/components/site/HoverShowcase";
import { Eyebrow, MaskedImage, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";
import { CLUB, RESORT } from "@/lib/project";

export const Route = createFileRoute("/club")({
  head: () => ({
    meta: [
      { title: "Club & Events at Mandhara — A Wedding Destination" },
      {
        name: "description",
        content:
          "Gemini, the club and event zone at Mandhara: a 10,000 sq.ft banquet facility, an open event ground, celebration lawns and the Pavilion Club.",
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

/**
 * Gemini is the club and event zone (brochure p.2, p.17, p.20).
 *
 * TODO(client): no guest capacity is stated anywhere in the brochure for any of
 * these venues. The figures that used to appear here — 900, 2,500, 600, 180 —
 * were invented, as were the "two halls" and "9 m ceilings" details, and have
 * been removed. Supply real capacities. See CLIENT-QUERIES.md.
 */
const VENUES: ShowcaseItem[] = [
  {
    id: "banquet",
    title: "Grand Banquet & Event Facility",
    meta: CLUB.banquetSqFt,
    text: "A ten-thousand-square-foot banquet facility with a pre-function lounge and a bridal suite.",
    image: img.banquet,
  },
  {
    id: "ground",
    title: "Event Ground",
    meta: "Open air",
    text: "Open ground with independent access, sized for weddings, Garba nights, concerts and festivals.",
    image: img.eventGround,
  },
  {
    id: "lawn",
    title: "Celebration Lawns",
    meta: "Outdoor",
    text: "Open lawn for ceremonies and receptions, alongside the event ground.",
    image: img.lawn,
  },
  {
    id: "restaurant",
    title: "Outdoor Restaurant",
    meta: "Al fresco",
    text: "Dinners under the trees, with the kitchen serving straight onto the lawn.",
    image: img.dining,
  },
  {
    id: "pavilion",
    title: "Pavilion Club",
    meta: "Members",
    text: "Cricket ground, swimming pool, wedding rooms and gym, gathered in one building.",
    image: img.clubhouse,
  },
];

const CALENDAR = [
  {
    id: "winter",
    months: "Nov – Feb",
    title: "Wedding season",
    text: "Cool evenings, clear skies, peak demand across both banquets and the lakeside lawn.",
    image: img.clubhouse,
  },
  {
    id: "spring",
    months: "Mar – May",
    title: "Corporate & offsites",
    text: "Early-morning programmes, shaded lawns and resort keys for the whole delegation.",
    image: img.banquet,
  },
  {
    id: "monsoon",
    months: "Jun – Sep",
    title: "Monsoon celebrations",
    text: "Covered banquet halls and dramatic light over the lake for indoor-outdoor events.",
    image: img.eventGround,
  },
  {
    id: "festival",
    months: "Oct",
    title: "Festival calendar",
    text: "Estate-wide lighting, live concerts and Garba nights on the event ground.",
    image: img.lawn,
  },
] as const;

function Club() {
  return (
    <>
      <PageHero
        eyebrow="Gemini — Club & Events"
        title="Where celebrations become family history."
        intro="Five venues, one landscape, and a hospitality team that has already thought about the things you haven't."
        image={img.club}
        imageScale={[1, 1.52]}
      />

      <Section id="venues" className="scroll-mt-24">
        <HoverShowcase
          items={VENUES}
          square={false}
          side="left"
          height="h-[32rem] md:h-[40rem]"
          columns="lg:grid-cols-[1fr_1.05fr]"
          header={
            <>
              <Eyebrow>Venues</Eyebrow>
              {/* <SplitText
                text="Five venues, one landscape."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              /> */}
              <p className="mb-4 mt-4 label text-muted-foreground">
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
            {/* <SplitText
              text="Three days, one estate, zero logistics."
              className="display mt-8 text-4xl md:text-6xl"
            /> */}
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md body-copy text-muted-foreground">
                Guests stay at the resort, ceremonies move between lawn and lake, and
                the banquet takes the night. Nobody drives anywhere in between.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  [String(RESORT.suites), "Resort suites"],
                  ["5", "Venues"],
                  ["1", "Planner"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="display tabular text-5xl text-primary md:text-6xl">{n}</p>
                    <p className="label mt-3 text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>Calendar</Eyebrow>
        {/* <SplitText text="The estate through the year." className="display mt-6 text-4xl md:text-6xl" /> */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                  <span className="absolute inset-x-0 bottom-4 px-6 label text-accent">
                    {c.months}
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-full" />
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="card-title display text-2xl transition-colors duration-500 group-hover:text-primary">
                    {c.title}
                  </h3>
                  <p className="card-copy mt-3 text-muted-foreground">
                    {c.text}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* <CtaBand
        title="Hold a date at Mandhara."
        text="Send us the season and the guest count — we'll come back with venues, layouts and a walkthrough slot."
        label="Check availability"
        image={img.banquet}
        points={[
          ["Banquet", `${CLUB.banquetSqFt}, with pre-function lounge and bridal suite`],
          ["Stay", `${RESORT.suites} resort suites at Rime`],
          ["Services", "Planners, catering, décor, valet, AV"],
        ]}
      /> */}
    </>
  );
}
