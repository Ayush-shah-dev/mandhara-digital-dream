import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { HoverShowcase, type ShowcaseItem } from "@/components/site/HoverShowcase";
import { Eyebrow, MaskedImage, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";
import { DEVELOPER, LAKE, NICQE, VILLAS } from "@/lib/project";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Story of Mandhara — Land, Light and Hospitality" },
      {
        name: "description",
        content:
          "How Mandhara began: water and canopy near Lothal, Gujarat, shaped into villas, a resort and a celebration club.",
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

const TIMELINE: ShowcaseItem[] = [
  {
    id: "land",
    title: "The Land",
    meta: "01 — Before",
    text: `Undulating ground near Lothal, a natural depression that became the ${LAKE.acres}-acre Sheen Lake, and a canopy nobody wanted to lose.`,
    image: img.canopy,
  },
  {
    id: "idea",
    title: "The Idea",
    meta: "02 — Intent",
    text: "Not a colony. A destination — where residents, guests and celebrations share one landscape without crowding each other.",
    image: img.lake,
  },
  {
    id: "plan",
    title: "The Plan",
    meta: "03 — Drawing",
    text: "Five zones drawn along the contours, roads bent around old trees, water returned to the lake.",
    image: img.planDrawing,
  },
  {
    id: "build",
    title: "The Build",
    meta: "04 — Making",
    text: "Low-rise, stone, timber and lime. Materials that weather instead of fade.",
    image: img.build,
  },
  {
    id: "life",
    title: "The Life",
    meta: "05 — Today",
    text: "Mornings on the trail, afternoons at the spa, evenings on the lawn. The estate has a daily rhythm now.",
    image: img.promenade,
  },
];

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
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
          <MaskedImage
            src={img.canopy}
            alt="Retained canopy across the Mandhara estate"
            className="h-[36rem]"
          />
          <div>
            <Eyebrow>Philosophy</Eyebrow>
            <SplitText
              text="Luxury here is quiet, slow and outdoors."
              className="display mt-8 text-4xl md:text-6xl"
            />
            <Reveal delay={0.1} className="mt-8">
              <p className="body-copy text-muted-foreground">
                We measured success in canopy retained, in metres of shaded walkway, in
                the number of evenings a family chooses to eat outside. Architecture
                keeps a low profile so the land stays the protagonist.
              </p>
              <p className="body-copy mt-6 text-muted-foreground">
                Hospitality runs through everything — the resort team also cares for the
                enclave's clubhouses, so residents live with service standards usually
                reserved for holidays.
              </p>
              <p className="lead mt-14 max-w-lg text-foreground">
                Mandhara is developed by {DEVELOPER}.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-10">
                {[
                  [String(VILLAS.total), "Villas"],
                  [String(NICQE.gardenValleys), "Garden valleys"],
                  [`${LAKE.acres} acres`, "Sheen Lake"],
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

      <Section className="bg-muted/40">
        <HoverShowcase
          items={TIMELINE}
          side="left"
          height="h-[32rem] md:h-[38rem]"
          columns="lg:grid-cols-[1fr_1.05fr]"
          header={
            <>
              <Eyebrow>Timeline</Eyebrow>
              <SplitText
                text="Five chapters, one estate."
                className="display mb-6 mt-6 text-4xl md:text-6xl"
              />
              <p className="mb-4 label text-muted-foreground">
                Hover or tab through a chapter to see it
              </p>
            </>
          }
        />
      </Section>

      <CtaBand
        title="Walk the story in person."
        text="A guided visit takes about two hours — the lake, the enclave, the resort and the lawns."
        label="Arrange a visit"
        image={img.promenade}
        points={[
          ["Chapter one", "Sheen Lake and the promenade at sunrise"],
          ["Chapter two", "The Nicqe and Orion villa enclaves on foot"],
          ["Chapter three", "Lunch at Rime, then the Gemini club lawns"],
        ]}
      />
    </>
  );
}
