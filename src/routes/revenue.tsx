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
        <div className="mt-16 rounded-[2rem] border border-accent/15 bg-[linear-gradient(145deg,rgba(255,231,193,.08),rgba(20,7,4,.18))] p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,.8)] md:p-8">
          <div className="flex gap-4">
            <div className="flex h-72 flex-col justify-between pb-10 pt-1 text-[10px] tracking-[0.18em] text-white/40">
              {[100, 75, 50, 25, 0].map((value) => <span key={value}>{value}%</span>)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="relative h-72">
                <div className="absolute inset-x-0 top-0 h-px bg-accent/15" />
                <div className="absolute inset-x-0 top-1/4 h-px bg-accent/10" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-accent/10" />
                <div className="absolute inset-x-0 top-3/4 h-px bg-accent/10" />
                <div className="absolute inset-x-0 bottom-10 h-px bg-accent/30" />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-[calc(100%-2.5rem)] w-full overflow-visible">
                  <defs>
                    <linearGradient id="occupancy-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#f1c994" stopOpacity=".3" />
                      <stop offset="1" stopColor="#f1c994" stopOpacity="0" />
                    </linearGradient>
                    <filter id="occupancy-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <motion.path
                    d="M 4 58 L 27 42 L 50 29 L 73 17 L 96 6 L 96 100 L 4 100 Z"
                    fill="url(#occupancy-fill)"
                    className="text-accent"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.path
                    d="M 4 58 L 27 42 L 50 29 L 73 17 L 96 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    className="text-accent"
                    filter="url(#occupancy-glow)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {BARS.map(([label, value], i) => {
                    const x = 4 + i * 23;
                    const y = 100 - value;
                    return <g key={label} className="text-accent" filter="url(#occupancy-glow)"><circle cx={x} cy={y} r="3.4" fill="#f1c994" fillOpacity=".16" /><circle cx={x} cy={y} r="1.6" fill="#f1c994" /></g>;
                  })}
                </svg>
                <div className="absolute inset-x-0 bottom-0 flex justify-between text-center">
                  {BARS.map(([label, value]) => <div key={label} className="flex w-1/5 flex-col gap-2"><span className="label text-white/60">{label}</span><span className="display text-xl text-accent md:text-2xl">{value}%</span></div>)}
                </div>
              </div>
            </div>
          </div>
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
{/* 
      <CtaBand
        title="Ask for the numbers."
        text="We'll share the full model, term sheet and current inventory over a call or on site."
        label="Request the model"
      /> */}
    </>
  );
}
