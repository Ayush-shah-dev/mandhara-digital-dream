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
import { HoverShowcase, type ShowcaseItem } from "@/components/site/HoverShowcase";
import { img } from "@/lib/images";
import { LAKE, LOCATION, NICQE, VILLAS } from "@/lib/project";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mandhara — Three Experiences. One Destination." },
      {
        name: "description",
        content: `Mandhara is a luxury destination near Lothal, Gujarat: ${VILLAS.total} villas, a wellness resort and a celebration club, woven around Sheen Lake, gardens and golden light.`,
      },
      { property: "og:title", content: "Mandhara — Three Experiences. One Destination." },
      {
        property: "og:description",
        content:
          "Villas, resort and club set around water, trees and warm light. Experience Mandhara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const NATURE: readonly ShowcaseItem[] = [
  {
    id: "canopy",
    title: "Built around the canopy",
    meta: "Canopy",
    text: "Roads bend around old rain trees; the survey mapped each trunk before a single line was drawn.",
    image: img.canopy,
  },
  {
    id: "valleys",
    title: `${NICQE.gardenValleys} garden valleys`,
    meta: "Landform",
    text: "The natural undulation became gardens rather than being levelled into plots.",
    image: img.garden,
  },
  {
    id: "water",
    title: "Water returned to the lake",
    meta: "Sheen Lake",
    text: `Monsoon channels feed ${LAKE.acres} acres of water, with ${LAKE.aerators} aerators keeping it moving.`,
    image: img.lake,
  },
  {
    id: "bloom",
    title: "Seasonal bloom calendar",
    meta: "Planting",
    text: "Species chosen so something is always flowering, month after month.",
    image: img.blooms,
  },
] as const;

const REVENUE: readonly ShowcaseItem[] = [
  {
    id: "own",
    title: "Own",
    meta: "Step 01",
    text: "Buy the plot and villa outright — freehold, registered, and yours to use whenever you wish.",
    image: img.villaLake,
  },
  {
    id: "operate",
    title: "Operate",
    meta: "Step 02",
    text: "Hand the keys to the resort team. Housekeeping, maintenance and guests are managed end to end.",
    image: img.suite,
  },
  {
    id: "earn",
    title: "Earn",
    meta: "Step 03",
    text: "Share in the room revenue your villa generates, with transparent statements each quarter.",
    image: img.resort,
  },
] as const;

/** Only landmarks the brochure actually gives a distance for. Airport, school
 *  and hospital times are unknown for the Lothal site — see CLIENT-QUERIES.md. */
const PROXIMITY: readonly ShowcaseItem[] = [
  {
    id: "lothal",
    title: "Archaeological Site Museum, Lothal",
    meta: LOCATION.nearby[0][1],
    text: LOCATION.nearby[0][2],
    image: img.arch,
  },
  {
    id: "nh47",
    title: "NH 47 — Rajkot–Ahmedabad Highway",
    meta: LOCATION.nearby[1][1],
    text: LOCATION.nearby[1][2],
    image: img.expressway,
  },
  {
    id: "expressway",
    title: "Ahmedabad–Dholera Expressway",
    meta: LOCATION.nearby[2][1],
    text: LOCATION.nearby[2][2],
    image: img.build,
  },
  {
    id: "temple",
    title: "Ganapatipura Ganpati Mandir",
    meta: LOCATION.nearby[3][1],
    text: LOCATION.nearby[3][2],
    image: img.mandir,
  },
] as const;

const EXPERIENCES = [
  {
    n: "01",
    title: "Villa Enclave",
    text: `${VILLAS.total} private villas across two enclaves — ${VILLAS.nicqe} in Nicqe around two clubhouses, and ${VILLAS.orion} revenue-sharing homes in Orion.`,
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
        <div className="relative z-10 mb-10 grid translate-y-16 place-items-center isolate md:translate-y-20">
          <div
            className="pointer-events-none absolute h-[118%] w-[118%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,255,255,.26) 0%, rgba(248,245,240,.14) 42%, transparent 70%)",
              filter: "blur(9px)",
            }}
            aria-hidden="true"
          />
          <motion.img
            src={logoUrl}
            alt="Mandhara"
            initial={{ scale: 0.18, opacity: 0, filter: "brightness(0) invert(1) blur(10px)" }}
            animate={{ scale: 2, opacity: 1, filter: "brightness(0) invert(1) blur(0px)" }}
            transition={{ duration: 2.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-24 w-44 brightness-0 invert drop-shadow-[0_3px_10px_rgba(0,0,0,.55)] md:w-56"
          />
          <p className="relative z-10 mt-14 flex flex-wrap items-center justify-center gap-x-4 text-center font-serif text-[24px] tracking-[0.12em] text-white uppercase md:text-[28px]">
            <span>Resort</span>
            <span className="text-accent" aria-hidden="true">
              |
            </span>
            <span>Club &amp; Event Space</span>
            <span className="text-accent" aria-hidden="true">
              |
            </span>
            <span>Villa Enclave</span>
          </p>
        </div>
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
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Link
              to="/about"
              className="btn-pill btn-label bg-primary text-primary-foreground transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
            >
              Explore Mandhara
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/masterplan"
              className="btn-pill btn-label border border-white/40 backdrop-blur-md transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              View Masterplan
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/contact"
              className="btn-pill btn-label border border-white/40 backdrop-blur-md transition-colors duration-500 hover:border-accent hover:text-accent"
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
        <span className="label text-white/60">Scroll</span>
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
      <Section className="bg-background !pt-8 md:!pt-12">
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div>
            <Eyebrow>The Destination</Eyebrow>
            <MaskedImage
              src={img.canopy}
              alt="Retained canopy over the Mandhara estate"
              className="mt-6 h-[24rem] md:h-[28rem]"
              parallax={40}
            />
            {/* A "not a single mature tree was felled" claim sat here. It is not in
                the brochure, and an unverifiable environmental zero carries real
                exposure, so it is removed pending confirmation. */}
            {/* Tight to the image on purpose — the pairing is structural. The
                caption carries a claim, so it takes brand-tone contrast rather
                than the fine-print gray it had. */}
            <Reveal delay={0.2}>
              <p className="caption mt-5 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-primary/70" />
                Sheen Lake, {LAKE.acres} acres, at the centre of it
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="self-center">
            <p className="body-copy text-muted-foreground">
              Mandhara is not a project you visit once. It is a landscape you return to — a lake
              that changes colour by the hour, roads that curve because the trees were here first,
              and architecture that keeps its voice low.
            </p>
            <p className="lead mt-14 max-w-lg text-foreground">
              Three worlds share one address: a villa enclave to live in, a resort to retreat into,
              and a club where celebrations become family history.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-10">
              {[
                [String(VILLAS.total), "Villas"],
                [`${LAKE.acres} acres`, "Sheen Lake"],
                ["3", "Experiences"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="display tabular text-5xl text-primary md:text-6xl">{n}</p>
                  <p className="label mt-3 text-muted-foreground">{l}</p>
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
              <p className="mx-auto mt-6 max-w-xl body-copy text-white/70">
                Six acres of water, five landscaped islands and a kilometre of promenade — drawn
                from the contour survey, not over it.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
                {[
                  [`${LAKE.acres} acres`, "Sheen Lake"],
                  [String(LAKE.islands), "Landscaped islands"],
                  [`${LAKE.promenadeKm} km`, "Promenade"],
                ].map(([n, l]) => (
                  <div key={l} className="text-[oklch(0.97_0.01_84)]">
                    <p className="display text-3xl text-accent md:text-4xl">{n}</p>
                    <p className="mt-1 label text-white/60">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <Link
                    to="/masterplan"
                    className="btn-pill btn-label bg-accent text-accent-foreground transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                  >
                    Explore the five zones
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    to="/gallery"
                    className="btn-pill btn-label border border-white/45 text-[oklch(0.97_0.01_84)] backdrop-blur-md transition-colors duration-500 hover:border-accent hover:text-accent"
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
      <Section className="!pt-12">
        <Eyebrow>Three Experiences</Eyebrow>
        <div className="mt-6 grid gap-8 md:grid-cols-3 lg:gap-10">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.12}>
              <TiltCard className="rounded-3xl">
                <Link to={e.to} className="group relative block overflow-hidden rounded-3xl">
                  <img
                    src={e.image}
                    alt={e.title}
                    loading="lazy"
                    className="h-[30rem] w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_60)]/90 via-[oklch(0.12_0.02_60)]/20 to-transparent transition-opacity duration-700 group-hover:from-[oklch(0.12_0.02_60)]/95" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 md:p-8">
                    <p className="label text-accent">{e.n}</p>
                    <h3 className="display mt-3 text-3xl">{e.title}</h3>
                    <p className="card-copy mt-3 max-w-xs text-white/75">{e.text}</p>
                    <span className="mt-5 inline-block label text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Explore <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Nature philosophy */}
      <Section className="bg-muted/40">
        <HoverShowcase
          square={false}
          items={NATURE}
          side="left"
          height="h-[30rem] md:h-[36rem]"
          columns="lg:grid-cols-[1fr_1fr]"
          header={
            <>
              <Eyebrow>Nature Philosophy</Eyebrow>
              <SplitText
                text="We built around the trees, not through them."
                className="display mb-6 mt-6 text-4xl "
              />
              <p className="mb-4 max-w-md body-copy text-muted-foreground">
                Every road follows an existing contour. Every valley remains a valley. Hover or tab
                a principle to watch the landscape answer.
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
              <p className="mt-6 max-w-md body-copy text-white/70">
                Fountains, illuminated sculptures and a tree-lined drive that slows you down on
                purpose. Arrival at Mandhara is a sequence, not a gate.
              </p>
              <Magnetic>
                <Link
                  to="/arrival"
                  className="mt-8 btn-pill btn-label border border-accent/70 text-accent transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
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
            <SplitText
              text="Five zones. One rhythm."
              className="display mt-8 text-4xl md:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 body-copy text-muted-foreground">
                Nicqe and Orion for the villas, Rime for the resort, Gemini for the club and events,
                and Sheen Lake at the centre of all of it.
              </p>
              <Magnetic>
                <Link
                  to="/masterplan"
                  className="mt-8 btn-pill btn-label bg-secondary text-secondary-foreground transition-colors duration-500 hover:bg-primary"
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
      <section className="brand-gradient overflow-hidden py-24">
        <div className="mx-auto mb-12 w-full max-w-7xl px-6 md:px-12">
          <p className="eyebrow text-accent">Amenities</p>
          <SplitText
            text="Fourteen worlds within one."
            className="display mt-6 text-4xl md:text-6xl"
          />
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
                "Celebration Lawns",
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
              className="btn-pill btn-label bg-accent text-accent-foreground transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              Enter the amenities journey
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* Investment */}
      <Section>
        <HoverShowcase
          square={false}
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
              <p className="mb-4 max-w-md body-copy text-muted-foreground">
                Keep the villa private, or place it in the managed hospitality pool and share in
                resort revenue. Hover each step to see it.
              </p>
            </>
          }
          footer={
            <div className="mt-10">
              <Magnetic>
                <Link
                  to="/revenue"
                  className="btn-pill btn-label border border-primary/50 text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
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
          <Link to="/gallery" className="link-underline label text-primary">
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

      {/*
        Three anonymous testimonials sat here ("Villa owner, Enclave 2" and
        similar). Unattributed quotes read as invented social proof, so they are
        removed. Restore this section with real, named, permissioned quotes.
        See CLIENT-QUERIES.md.
      */}

      {/* Location */}
      <Section className="!py-12 bg-secondary text-[oklch(0.96_0.01_84)]">
        <HoverShowcase
          items={PROXIMITY}
          side="right"
          square={false}
          tone="dark"
          height="h-[30rem] md:h-[34rem]"
          columns="lg:grid-cols-[1fr_1fr]"
          header={
            <>
              <p className="eyebrow text-accent ">Location</p>
              <p className=" mb-2 mt-6 max-w-md body-copy text-white/70">
                A drive that leaves the city behind without leaving it out of reach. Hover a
                destination to see the road it takes.
              </p>
              <div className="mb-4 flex items-center gap-4">
                <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border border-accent/50">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <motion.span
                    className="absolute inset-0 rounded-full border border-accent/40"
                    animate={{ scale: [1, 1.1], opacity: [0.7, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                  />
                </span>
                <p className="label text-white/55">{LOCATION.addressLines.join(" · ")}</p>
              </div>
            </>
          }
          footer={
            <div className="mt-10">
              <Link to="/location" className="link-underline label text-accent">
                Open the full map
              </Link>
            </div>
          }
        />
      </Section>

      <Section className="text-center">
        <Reveal className="flex flex-col items-center">
          <Emblem size={300} />
          <SplitText
            text="Come see the light at five in the evening."
            className="display mt-0 max-w-3xl text-4xl md:text-6xl"
          />
          <p className="mt-4 max-w-xl body-copy text-muted-foreground">
            That is the hour the lake turns gold, the promenade fills and the lawns begin to smell
            of woodsmoke and jasmine. Visits are private and unhurried.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                to="/contact"
                className="btn-pill btn-label bg-primary text-primary-foreground transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
              >
                Book a private visit
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/gallery"
                className="btn-pill btn-label border border-border transition-colors duration-500 hover:border-primary hover:text-primary"
              >
                See it in pictures
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
