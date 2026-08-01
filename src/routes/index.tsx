import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { Emblem, logoUrl } from "@/components/site/Emblem";
import {
  Eyebrow,
  Magnetic,
  MaskedImage,
  Reveal,
  Section,
  SplitText,
  TiltCard,
} from "@/components/site/primitives";
import { CtaBand } from "@/components/site/PageHero";
import { img } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mandhara — Three Experiences. One Destination." },
      {
        name: "description",
        content:
          "Mandhara is a 100-acre luxury destination: 354 villas, a wellness resort and a celebration club, woven around Sheen Lake, gardens and golden light.",
      },
      { property: "og:title", content: "Mandhara — Three Experiences. One Destination." },
      {
        property: "og:description",
        content:
          "Villas, resort and club set within 100 acres of water, trees and warm light. Experience Mandhara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const EXPERIENCES = [
  {
    n: "01",
    title: "Villa Enclave",
    text: "354 private villas along garden valleys and tree-lined roads, with two clubhouses at their heart.",
    image: img.villa,
    to: "/villas",
  },
  {
    n: "02",
    title: "The Resort",
    text: "A wellness retreat of suites, spa, pools and quiet terraces facing the water.",
    image: img.resort,
    to: "/resort",
  },
  {
    n: "03",
    title: "Club & Events",
    text: "Banquets, lawns and an event ground shaped for weddings that people remember for decades.",
    image: img.club,
    to: "/club",
  },
] as const;

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative h-[100svh] overflow-hidden">
      <motion.img
        src={img.hero}
        alt="Aerial view of Mandhara at golden hour"
        style={{ scale, y }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.17_0.012_60)]/55 via-transparent to-[oklch(0.17_0.012_60)]/80" />
      <Atmosphere density={38} />

      <motion.div
        style={{ opacity: fade }}
        className="relative flex h-full flex-col items-center justify-center px-6 text-center text-[oklch(0.97_0.01_84)]"
      >
        <motion.img
          src={logoUrl}
          alt="Mandhara"
          initial={{ scale: 0.18, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 w-44 md:w-56"
        />
        <SplitText
          as="h1"
          text="Three Experiences."
          className="display text-4xl md:text-7xl"
          delay={0.4}
        />
        <SplitText
          as="p"
          text="One Destination."
          className="display text-4xl text-accent md:text-7xl"
          delay={0.7}
        />
        <SplitText as="p" text="Mandhara." className="display text-4xl md:text-7xl" delay={1} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Link
              to="/about"
              className="inline-flex rounded-full bg-primary px-8 py-4 text-[0.68rem] uppercase tracking-[0.25em] text-primary-foreground transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
            >
              Explore Mandhara
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/masterplan"
              className="inline-flex rounded-full border border-white/40 px-8 py-4 text-[0.68rem] uppercase tracking-[0.25em] backdrop-blur-md transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              View Masterplan
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-white/40 px-8 py-4 text-[0.68rem] uppercase tracking-[0.25em] backdrop-blur-md transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              Book Experience
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[oklch(0.95_0.01_84)]"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/60">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-6 bg-accent"
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />

      {/* Introduction */}
      <Section className="bg-background">
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div>
            <Eyebrow>The Destination</Eyebrow>
            <SplitText
              text="A hundred acres that behave like one continuous garden."
              className="display mt-8 text-4xl md:text-6xl"
            />
            <MaskedImage
              src={img.canopy}
              alt="Retained canopy over the Mandhara estate"
              className="mt-10 h-[24rem] md:h-[28rem]"
              parallax={40}
            />
            <Reveal delay={0.2}>
              <p className="mt-5 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                <span className="inline-block h-px w-8 bg-accent/60" />
                Not a single mature tree was felled
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="space-y-6 self-end text-base font-light leading-relaxed text-muted-foreground">
            <p>
              Mandhara is not a project you visit once. It is a landscape you return
              to — a lake that changes colour by the hour, roads that curve because
              the trees were here first, and architecture that keeps its voice low.
            </p>
            <p>
              Three worlds share one address: a villa enclave to live in, a resort to
              retreat into, and a club where celebrations become family history.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                ["100+", "Acres"],
                ["354", "Villas"],
                ["3", "Experiences"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="display text-4xl text-primary md:text-5xl">{n}</p>
                  <p className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Master vision */}
      <section className="relative overflow-hidden">
        <div className="relative h-[70vh] md:h-[90vh]">
          <MaskedImage
            src={img.lake}
            alt="Sheen Lake at sunrise"
            className="h-full rounded-none"
            parallax={80}
          />
          <div className="absolute inset-0 bg-[oklch(0.17_0.012_60)]/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <SplitText
              text="Design that defers to the land."
              className="display max-w-3xl text-4xl text-[oklch(0.97_0.01_84)] md:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/70">
                Five acres of water, eighteen garden valleys and an eight-kilometre
                promenade — drawn from the contour survey, not over it.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
                {[
                  ["5 acres", "Sheen Lake"],
                  ["18", "Garden valleys"],
                  ["8 km", "Promenade"],
                ].map(([n, l]) => (
                  <div key={l} className="text-[oklch(0.97_0.01_84)]">
                    <p className="display text-3xl text-accent md:text-4xl">{n}</p>
                    <p className="mt-1 text-[0.58rem] uppercase tracking-[0.28em] text-white/60">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <Link
                    to="/masterplan"
                    className="inline-flex rounded-full bg-accent px-8 py-4 text-[0.66rem] uppercase tracking-[0.25em] text-accent-foreground transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                  >
                    Explore the five zones
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    to="/gallery"
                    className="inline-flex rounded-full border border-white/45 px-8 py-4 text-[0.66rem] uppercase tracking-[0.25em] text-[oklch(0.97_0.01_84)] backdrop-blur-md transition-colors duration-500 hover:border-accent hover:text-accent"
                  >
                    See the gallery
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Three experiences */}
      <Section>
        <Eyebrow>Three Experiences</Eyebrow>
        <SplitText
          text="Live. Retreat. Celebrate."
          className="display mt-8 max-w-3xl text-5xl md:text-7xl"
        />
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.12}>
              <TiltCard>
                <Link to={e.to} className="group block">
                  <div className="overflow-hidden rounded-3xl">
                    <img
                      src={e.image}
                      alt={e.title}
                      loading="lazy"
                      className="h-[26rem] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-6 text-[0.62rem] uppercase tracking-[0.3em] text-accent">{e.n}</p>
                  <h3 className="display mt-2 text-3xl">{e.title}</h3>
                  <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
                    {e.text}
                  </p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Nature philosophy */}
      <Section className="bg-muted/40">
        <HoverShowcase
          items={NATURE}
          side="left"
          height="h-[30rem] md:h-[36rem]"
          columns="lg:grid-cols-[1fr_1fr]"
          header={
            <>
              <Eyebrow>Nature Philosophy</Eyebrow>
              <SplitText
                text="We built around the trees, not through them."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              />
              <p className="mb-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                Every road follows an existing contour. Every valley remains a valley.
                Hover or tab a principle to watch the landscape answer.
              </p>
            </>
          }
        />
      </Section>

      {/* Arrival */}
      <section className="relative h-[80vh] overflow-hidden">
        <MaskedImage src={img.arrival} alt="The arrival gateway" className="h-full rounded-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.17_0.012_60)]/85 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div className="mx-auto w-full max-w-7xl text-[oklch(0.97_0.01_84)]">
            <p className="eyebrow text-accent">The Arrival</p>
            <SplitText
              text="The moment the gate opens."
              className="display mt-6 max-w-2xl text-4xl md:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-white/70">
                Fountains, illuminated sculptures and a tree-lined drive that slows you
                down on purpose. Arrival at Mandhara is a sequence, not a gate.
              </p>
              <Magnetic>
                <Link
                  to="/arrival"
                  className="mt-8 inline-flex rounded-full border border-accent/70 px-8 py-4 text-[0.66rem] uppercase tracking-[0.25em] text-accent transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
                >
                  Take the drive
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Masterplan preview */}
      <Section>
        <div className="grid items-center gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <div>
            <Eyebrow>Masterplan</Eyebrow>
            <SplitText text="Five zones. One rhythm." className="display mt-8 text-4xl md:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-8 text-base font-light leading-relaxed text-muted-foreground">
                NICQE, RIME, GEMINI, ORION and Sheen Lake — each zone carries its own
                purpose, yet reads as one landscape from the air.
              </p>
              <Magnetic>
                <Link
                  to="/masterplan"
                  className="mt-8 inline-flex rounded-full bg-secondary px-8 py-4 text-[0.66rem] uppercase tracking-[0.25em] text-secondary-foreground transition-colors duration-500 hover:bg-primary"
                >
                  Explore the masterplan
                </Link>
              </Magnetic>
            </Reveal>
          </div>
          <MaskedImage src={img.masterplan} alt="Mandhara masterplan" className="h-[32rem]" />
        </div>
      </Section>

      {/* Amenities preview marquee */}
      <section className="overflow-hidden bg-secondary py-24 text-[oklch(0.96_0.01_84)]">
        <div className="mx-auto mb-12 w-full max-w-7xl px-6 md:px-12">
          <p className="eyebrow text-accent">Amenities</p>
          <SplitText text="Fourteen worlds within one." className="display mt-6 text-4xl md:text-6xl" />
        </div>
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 gap-16">
              {[
                "Spa",
                "Restaurant",
                "Swimming Pool",
                "Sheen Lake",
                "Sports",
                "Garden",
                "Club",
                "Walking Trail",
                "Kids Area",
                "Outdoor Lawn",
                "Banquet",
                "Wellness",
                "Meditation",
                "God's Garden",
              ].map((a) => (
                <span key={a} className="display text-4xl text-white/40 md:text-6xl">
                  {a}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
        <div className="mx-auto mt-14 w-full max-w-7xl px-6 md:px-12">
          <Magnetic>
            <Link
              to="/amenities"
              className="inline-flex rounded-full bg-accent px-8 py-4 text-[0.66rem] uppercase tracking-[0.25em] text-accent-foreground transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              Enter the amenities journey
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* Investment */}
      <Section>
        <HoverShowcase
          items={REVENUE}
          side="left"
          height="h-[28rem] md:h-[34rem]"
          columns="lg:grid-cols-[1fr_1fr]"
          header={
            <>
              <Eyebrow>Revenue Sharing</Eyebrow>
              <SplitText
                text="Ownership that works while you rest."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              />
              <p className="mb-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                Keep the villa private, or place it in the managed hospitality pool and
                share in resort revenue. Hover each step to see it.
              </p>
            </>
          }
          footer={
            <div className="mt-10">
              <Magnetic>
                <Link
                  to="/revenue"
                  className="inline-flex rounded-full border border-primary/50 px-8 py-4 text-[0.66rem] uppercase tracking-[0.25em] text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                >
                  See the model
                </Link>
              </Magnetic>
            </div>
          }
        />
      </Section>

      {/* Gallery strip */}
      <Section className="bg-muted/40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <SplitText text="Chapters in light." className="display mt-6 text-4xl md:text-6xl" />
          </div>
          <Link
            to="/gallery"
            className="link-underline text-[0.66rem] uppercase tracking-[0.25em] text-primary"
          >
            View all
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[img.suite, img.dining, img.spa, img.club].map((s, i) => (
            <Reveal key={s} delay={i * 0.08}>
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={s}
                  alt="Mandhara"
                  loading="lazy"
                  className="h-72 w-full object-cover transition-transform duration-[1.4s] hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="grid gap-16 md:grid-cols-3">
          {[
            [
              "We came for a site visit and stayed for lunch by the lake. That decided it.",
              "Villa owner, Enclave 2",
            ],
            [
              "Our wedding lawn faced the water at sunset. Guests still talk about the light.",
              "Celebration at the Club",
            ],
            [
              "The revenue model was explained in one page. No surprises since.",
              "Investor, Resort pool",
            ],
          ].map(([q, a], i) => (
            <Reveal key={a} delay={i * 0.1}>
              <p className="display text-2xl leading-snug md:text-3xl">“{q}”</p>
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                {a}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section className="bg-secondary text-[oklch(0.96_0.01_84)]">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">Location</p>
            <SplitText text="Far enough. Close enough." className="display mt-6 text-4xl md:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-white/70">
                A drive that leaves the city behind without leaving it out of reach.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-y-8">
            {[
              ["Airport", "55 min"],
              ["Expressway", "12 min"],
              ["Schools", "20 min"],
              ["Hospitals", "18 min"],
            ].map(([a, b], i) => (
              <Reveal key={a} delay={i * 0.08}>
                <p className="display text-4xl text-accent">{b}</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-white/60">{a}</p>
              </Reveal>
            ))}
            <Link
              to="/location"
              className="link-underline col-span-2 text-[0.66rem] uppercase tracking-[0.25em] text-accent"
            >
              Open the map
            </Link>
          </div>
        </div>
      </Section>

      <Section className="text-center">
        <Reveal className="flex flex-col items-center">
          <Emblem size={150} />
          <SplitText
            text="Come see the light at five in the evening."
            className="display mt-10 max-w-3xl text-4xl md:text-6xl"
          />
        </Reveal>
      </Section>

      <CtaBand
        title="Plan your visit to Mandhara."
        text="Private tours across the enclave, resort and club — mornings for the lake, evenings for the lawns."
        label="Book a site visit"
      />
    </>
  );
}
