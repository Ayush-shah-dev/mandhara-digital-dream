import { createFileRoute } from "@tanstack/react-router";
import { Reveal, Section, SplitText } from "@/components/site/primitives";

export const Route = createFileRoute("/plot-viewer")({
  head: () => ({
    meta: [
      { title: "Plot Viewer — Explore Mandhara's Plots Interactively" },
      {
        name: "description",
        content:
          "Explore Mandhara's villa plots in an interactive plot viewer, mapped across the estate at Lothal, Gujarat.",
      },
      { property: "og:title", content: "Plot Viewer at Mandhara" },
      {
        property: "og:description",
        content:
          "An interactive, drone-mapped plot viewer for exploring villa plots across the estate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlotViewer,
});

const PLOT_VIEWER_URL = "https://spacer.land/QCrkR";

function PlotViewer() {
  return (
    <>
      {/*
        Task page, not a cinematic one — a page-header band sized to its own
        content, matching the Contact page's pattern, so the viewer below gets
        the room.
      */}
      <header className="brand-gradient relative overflow-hidden px-6 pb-10 pt-36 md:px-12 md:pb-12 md:pt-40">
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="label mb-5 flex items-center gap-3 text-accent">
            <span className="inline-block h-px w-10 bg-accent/70" />
            Plot Viewer
          </p>
          <SplitText
            as="h1"
            text="Walk the plots, from anywhere."
            className="display max-w-3xl text-4xl md:text-6xl"
          />
          <p className="body-copy mt-5 max-w-xl text-white/80">
            An interactive, drone-mapped view of the estate — pan across the layout, zoom into any
            plot, and see exactly where each one sits.
          </p>
        </div>
      </header>

      <Section className="pt-10 md:pt-12">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border soft-shadow">
            <iframe
              src={PLOT_VIEWER_URL}
              title="Mandhara interactive plot viewer"
              className="h-[85vh] min-h-[740px] w-full"
              loading="lazy"
              allow="fullscreen"
              allowFullScreen
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
