import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Eyebrow, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/revenue")({
  head: () => ({
    meta: [
      { title: "Revenue Sharing at Mandhara — Own, Operate, Earn" },
      {
        name: "description",
        content:
          "How the Mandhara revenue-sharing model works: villa ownership, professional hospitality management and shared resort revenue.",
      },
      { property: "og:title", content: "Revenue Sharing at Mandhara" },
      {
        property: "og:description",
        content: "Own a villa, place it in the managed pool, and share in resort revenue.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Revenue,
});

const STEPS = [
  ["Own", "You hold clear title to the villa and its land. Registration in your name, always."],
  ["Enrol", "Opt the villa into the hospitality pool for a defined term, or keep it private."],
  ["Operate", "Mandhara's resort team handles bookings, housekeeping, upkeep and guest service."],
  ["Earn", "Room revenue is pooled and shared, settled quarterly with a transparent statement."],
  ["Use", "Owner nights are reserved for you each year, including peak-season allocation."],
] as const;

const BARS = [
  ["Year 1", 42],
  ["Year 2", 58],
  ["Year 3", 71],
  ["Year 4", 83],
  ["Year 5", 94],
] as const;

function Revenue() {
  return (
    <>
      <PageHero
        eyebrow="Revenue Sharing"
        title="A villa that earns its keep."
        intro="Hospitality-managed ownership: your home stays yours, and works as part of the resort when you're away."
        image={img.suite}
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div>
            <Eyebrow>The Model</Eyebrow>
            <SplitText
              text="Five steps, no fine print."
              className="display mt-8 text-4xl md:text-6xl"
            />
          </div>
          <Reveal delay={0.1}>
            <ol className="space-y-0">
              {STEPS.map(([t, d], i) => (
                <li key={t} className="grid gap-3 border-t border-border py-8 md:grid-cols-[4rem_1fr]">
                  <span className="label text-primary">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="display text-3xl">{t}</h3>
                    <p className="mt-2 body-copy text-muted-foreground">
                      {d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-secondary text-[oklch(0.96_0.01_84)]">
        <p className="eyebrow text-accent">Illustrative Occupancy</p>
        <SplitText
          text="Ramp-up across the first five years."
          className="display mt-6 text-4xl md:text-6xl"
        />
        <div className="mt-16 flex h-72 items-end gap-4 md:gap-10">
          {BARS.map(([label, v], i) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-4">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${v}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-t-2xl bg-gradient-to-t from-accent/40 to-accent"
              />
              <span className="label text-white/60">
                {label}
              </span>
              <span className="display text-2xl text-accent">{v}%</span>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-xl text-xs font-light leading-relaxed text-white/50">
          Indicative only. Occupancy and revenue vary with season, inventory and market
          conditions; final terms are set out in the management agreement.
        </p>
      </Section>

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Professional upkeep", "Housekeeping, maintenance and landscaping handled by the resort team."],
            ["Transparent reporting", "Quarterly statements with occupancy, rate and share breakdown."],
            ["Owner privileges", "Reserved nights, spa credits and priority at club venues."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-card p-8 soft-shadow">
                <h3 className="card-title display text-2xl">{t}</h3>
                <p className="card-copy mt-3 text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Ask for the numbers."
        text="We'll share the full model, term sheet and current inventory over a call or on site."
        label="Request the model"
      />
    </>
  );
}
