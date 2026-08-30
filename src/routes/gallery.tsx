import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CtaBand } from "@/components/site/PageHero";
import { Eyebrow, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Mandhara in Light" },
      {
        name: "description",
        content:
          "Photography from across Mandhara: villas, resort, lake, gardens, celebrations and drone views of the estate.",
      },
      { property: "og:title", content: "Mandhara Gallery" },
      {
        property: "og:description",
        content: "Villas, resort, lake, gardens and celebrations across the Mandhara estate.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

const FILTERS = ["All", "Estate", "Villas", "Resort", "Nature", "Celebrations"] as const;

type Item = { src: string; tag: string; label: string; tall?: boolean };

const ITEMS: Item[] = [
  { src: img.hero, tag: "Estate", label: "Golden hour over the estate", tall: true },
  { src: img.villa, tag: "Villas", label: "Villa courtyard at dusk" },
  { src: img.resort, tag: "Resort", label: "Infinity pool at sunset", tall: true },
  { src: img.lake, tag: "Nature", label: "Sheen Lake at sunrise" },
  { src: img.club, tag: "Celebrations", label: "Wedding lawn" },
  { src: img.spa, tag: "Resort", label: "Spa treatment room", tall: true },
  { src: img.garden, tag: "Nature", label: "Walking trail" },
  { src: img.dining, tag: "Resort", label: "Outdoor restaurant" },
  { src: img.masterplan, tag: "Estate", label: "Drone view of the masterplan", tall: true },
  { src: img.suite, tag: "Villas", label: "Interior, morning light" },
  { src: img.arrival, tag: "Estate", label: "The arrival gate" },
];

function Gallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const shown = useMemo(
    () => ITEMS.filter((i) => filter === "All" || i.tag === filter),
    [filter],
  );

  return (
    <>
      <Section className="pt-40">
        <Eyebrow>Gallery</Eyebrow>
        <SplitText text="Mandhara, frame by frame." className="display mt-6 text-5xl md:text-8xl" />

        <div className="mt-14 flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn-pill btn-label border transition-all duration-500 ${
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/60 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {shown.map((item, i) => (
            <Reveal key={item.label} delay={(i % 6) * 0.05}>
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-3xl soft-shadow"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 ${
                    item.tall ? "h-[34rem]" : "h-[24rem]"
                  }`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.012_60)]/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="absolute bottom-6 left-6 translate-y-4 text-left label text-white opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.label}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {open !== null && shown[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[92] grid place-items-center bg-[oklch(0.17_0.012_60)]/95 p-6"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              src={shown[open].src}
              alt={shown[open].label}
              className="max-h-[86vh] w-auto rounded-3xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* <CtaBand
        title="Photographs undersell the light."
        text="Come at five in the evening and see the lake do what a camera can't hold."
        label="Book a visit"
      /> */}
    </>
  );
}
