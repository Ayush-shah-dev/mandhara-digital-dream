import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Eyebrow, MaskedImage, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Story of Mandhara — Land, Light and Hospitality" },
      {
        name: "description",
        content:
          "How Mandhara began: a hundred acres of water and canopy shaped into villas, a resort and a celebration club.",
      },
      { property: "og:title", content: "The Story of Mandhara" },
      {
        property: "og:description",
        content: "Land, light and hospitality — the philosophy behind Mandhara.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const TIMELINE = [
  ["The Land", "A hundred acres of undulating ground, a natural depression that became Sheen Lake, and a canopy nobody wanted to lose."],
  ["The Idea", "Not a colony. A destination — where residents, guests and celebrations share one landscape without crowding each other."],
  ["The Plan", "Five zones drawn along the contours, roads bent around old trees, water returned to the lake."],
  ["The Build", "Low-rise, stone, timber and lime. Materials that weather instead of fade."],
  ["The Life", "Mornings on the trail, afternoons at the spa, evenings on the lawn. The estate has a daily rhythm now."],
] as const;

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Mandhara"
        title="A destination written by its own landscape."
        intro="Mandhara began with a decision to build less and preserve more — and to let hospitality, not density, define value."
        image={img.lake}
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div>
            <Eyebrow>Philosophy</Eyebrow>
            <SplitText
              text="Luxury here is quiet, slow and outdoors."
              className="display mt-8 text-4xl md:text-6xl"
            />
          </div>
          <Reveal delay={0.1} className="space-y-6 text-base font-light leading-relaxed text-muted-foreground">
            <p>
              We measured success in canopy retained, in metres of shaded walkway, in
              the number of evenings a family chooses to eat outside. Architecture keeps
              a low profile so the land stays the protagonist.
            </p>
            <p>
              Hospitality runs through everything — the resort team also cares for the
              enclave's clubhouses, so residents live with service standards usually
              reserved for holidays.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Eyebrow>Timeline</Eyebrow>
        <div className="mt-16 space-y-0">
          {TIMELINE.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="grid gap-6 border-t border-border py-10 md:grid-cols-[8rem_1fr_1.2fr] md:gap-12">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                  0{i + 1}
                </span>
                <h3 className="display text-3xl md:text-4xl">{t}</h3>
                <p className="max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
                  {d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <MaskedImage src={img.villa} alt="Villa architecture" className="h-[30rem]" />
          <MaskedImage src={img.spa} alt="Spa interior" className="h-[30rem] md:mt-20" />
          <MaskedImage src={img.dining} alt="Outdoor dining" className="h-[30rem]" />
        </div>
      </Section>

      <CtaBand
        title="Walk the story in person."
        text="A guided visit takes about two hours — the lake, the enclave, the resort and the lawns."
        label="Arrange a visit"
      />
    </>
  );
}
