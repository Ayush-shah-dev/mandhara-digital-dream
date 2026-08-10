import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { CtaBand } from "@/components/site/PageHero";
import { Reveal, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/arrival")({
  head: () => ({
    meta: [
      { title: "The Arrival Experience at Mandhara" },
      {
        name: "description",
        content:
          "Drive through the Mandhara arrival sequence: the gate, the fountains, the illuminated sculptures and the avenue to the lake.",
      },
      { property: "og:title", content: "The Arrival Experience at Mandhara" },
      {
        property: "og:description",
        content: "A cinematic drive-through of Mandhara's signature arrival sequence.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Arrival,
});

const BEATS = [
  ["The Turn", "You leave the highway and the noise stops within fifty metres."],
  ["The Gate", "Stone piers open as you approach; the road narrows and slows you down."],
  ["The Fountains", "Water on both flanks, catching the last of the light."],
  ["The Sculptures", "Elephants in stone, lit from below, marking the threshold."],
  ["The Avenue", "Two hundred metres of trees, planted before the first drawing."],
  ["The Gazebo", "The road opens, the lake appears, and you're already here."],
] as const;

function Arrival() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const carX = useTransform(scrollYProgress, [0, 1], ["-10%", "88%"]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.05, 1.45]);
  const dim = useTransform(scrollYProgress, [0, 1], [0.35, 0.75]);

  return (
    <>
      <div ref={ref} className="relative">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.img
            src={img.arrival}
            alt="The arrival gateway at dusk"
            style={{ scale: zoom }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <motion.div
            style={{ opacity: dim }}
            className="absolute inset-0 bg-[oklch(0.17_0.012_60)]"
          />
          <Atmosphere density={30} />

          <div className="relative flex h-full flex-col justify-between px-6 py-28 md:px-12">
            <div className="mx-auto w-full max-w-7xl text-[oklch(0.97_0.01_84)]">
              <p className="eyebrow text-accent">Arrival Experience</p>
              <SplitText
                text="The drive in is part of the address."
                className="display mt-6 max-w-3xl text-4xl md:text-7xl"
              />
            </div>

            <div className="mx-auto w-full max-w-7xl">
              <div className="relative h-16">
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/25" />
                <motion.div style={{ left: carX }} className="absolute top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 64 24" className="h-8 w-20 fill-accent" aria-hidden="true">
                    <path d="M4 17c0-2 2-3 4-3h3c1-3 4-6 9-6h10c5 0 8 2 11 5l7 1c4 .5 6 2 6 4 0 1.5-1 2-3 2H8c-2 0-4-1-4-3Z" />
                    <circle cx="18" cy="20" r="3.2" className="fill-white/80" />
                    <circle cx="45" cy="20" r="3.2" className="fill-white/80" />
                  </svg>
                </motion.div>
              </div>
              <p className="mt-4 text-center label text-white/50">
                Scroll to drive
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-[100svh]">
          {BEATS.map(([t, d], i) => (
            <div key={t} className="grid h-[80svh] place-items-center px-6">
              <Reveal>
                <div className="max-w-xl rounded-4xl glass px-10 py-12 text-center">
                  <p className="label text-accent">
                    0{i + 1}
                  </p>
                  <h2 className="display mt-4 text-4xl md:text-5xl">{t}</h2>
                  <p className="mt-4 body-copy text-foreground/70">{d}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <CtaBand
        title="Do the drive at dusk."
        text="The gate lighting comes on at 6:20. Arrive a few minutes before."
        label="Book the drive"
      />
    </>
  );
}
