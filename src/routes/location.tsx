import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Eyebrow, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";
import { LOCATION } from "@/lib/project";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — Mandhara at Lothal, Gujarat" },
      {
        name: "description",
        content:
          "Mandhara is at Lothal Greens, Bhurkhi, Lothal. 382230, Javaraj, Road, Gundi, Lothal, Gujarat 382230 — 14 km from NH 47, 16 km from the Ahmedabad–Dholera Expressway and about 10 km from the Lothal Archaeological Site Museum.",
      },
      { property: "og:title", content: "Location — Mandhara at Lothal, Gujarat" },
      {
        property: "og:description",
        content:
          "Near Bagodara, off the Rajkot–Ahmedabad highway, beside the Lothal heritage site.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Location,
});

const { addressLines, nearestTown, map, nearby } = LOCATION;

/*
 * TODO(client): airport, hospital and school distances for the Lothal site are
 * not in the brochure. The figures that used to sit on this page were written
 * for a Bengaluru location and have been removed rather than re-guessed. Add
 * them here once the client supplies real numbers. See CLIENT-QUERIES.md.
 */

const MAP_SRC =
  `https://www.openstreetmap.org/export/embed.html?bbox=${map.bbox.join("%2C")}` +
  `&layer=mapnik&marker=${map.lat}%2C${map.lon}`;

function Location() {
  return (
    <>
      <PageHero
        eyebrow="Location"
        title="Beside Lothal, off the Ahmedabad road."
        intro={`Lothal Greens, Bhurkhi, Lothal. 382230, Javaraj, Road, Gundi, Lothal, Gujarat 382230 — a short run from ${nearestTown}, the Rajkot–Ahmedabad highway and the Ahmedabad–Dholera Expressway.`}
        image={img.hero}
        size="compact"
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <div>
            <Eyebrow>Nearby</Eyebrow>
            <SplitText text="What is around it." className="display mt-8 text-4xl md:text-6xl" />
            <Reveal delay={0.15}>
              <address className="mt-10 not-italic body-copy text-muted-foreground">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-6 max-w-xs body-copy text-muted-foreground">
                The Lothal dockyard — one of the principal excavated cities of the Indus Valley
                Civilisation — is the estate&rsquo;s nearest landmark, roughly ten kilometres away.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div>
              {nearby.map(([n, t, d]) => (
                <div
                  key={n}
                  className="group grid gap-2 border-t border-border py-7 transition-colors duration-500 hover:border-primary md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <h3 className="display text-2xl transition-colors duration-500 group-hover:text-primary">
                      {n}
                    </h3>
                    <p className="mt-1 max-w-md body-copy text-muted-foreground">{d}</p>
                  </div>
                  <p className="label text-primary md:self-center">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Reveal>
          <figure>
            <div className="overflow-hidden rounded-4xl soft-shadow">
              <iframe
                title="Map of Mandhara near Lothal, Gujarat"
                src={MAP_SRC}
                className="h-[32rem] w-full border-0"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-5 body-copy text-muted-foreground">
              {addressLines.join(", ")} — near {nearestTown}, off the Bagodara–Vataman Road.
            </figcaption>
          </figure>
        </Reveal>
      </Section>

    </>
  );
}
