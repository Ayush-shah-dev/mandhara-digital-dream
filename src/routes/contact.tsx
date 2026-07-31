import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { Emblem } from "@/components/site/Emblem";
import { Eyebrow, Magnetic, Reveal, Section, SplitText } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Mandhara — Book a Site Visit" },
      {
        name: "description",
        content:
          "Book a private site visit to Mandhara. Call or WhatsApp +91 89503 60990, or send an enquiry.",
      },
      { property: "og:title", content: "Contact Mandhara" },
      {
        property: "og:description",
        content: "Book a private site visit across the villa enclave, resort and club.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <header className="relative grid h-[60svh] place-items-center overflow-hidden bg-secondary px-6 text-center text-[oklch(0.97_0.01_84)]">
        <Atmosphere density={26} />
        <div className="relative">
          <p className="eyebrow text-accent">Contact</p>
          <SplitText text="Come and see it." className="display mt-6 text-5xl md:text-8xl" />
        </div>
      </header>

      <Section>
        <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-24">
          <div>
            <Eyebrow>Book a site visit</Eyebrow>
            <Reveal delay={0.1}>
              <form
                className="mt-10 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                {[
                  { id: "name", label: "Your name", type: "text" },
                  { id: "phone", label: "Phone", type: "tel" },
                  { id: "email", label: "Email", type: "email" },
                ].map((f) => (
                  <div key={f.id} className="relative">
                    <input
                      id={f.id}
                      type={f.type}
                      required
                      placeholder=" "
                      className="peer w-full border-b border-border bg-transparent pb-3 pt-6 text-base outline-none transition-colors duration-500 focus:border-primary"
                    />
                    <label
                      htmlFor={f.id}
                      className="pointer-events-none absolute left-0 top-6 text-sm text-muted-foreground transition-all duration-500 peer-focus:top-0 peer-focus:text-[0.62rem] peer-focus:uppercase peer-focus:tracking-[0.25em] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.62rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.25em]"
                    >
                      {f.label}
                    </label>
                  </div>
                ))}
                <div className="relative">
                  <textarea
                    id="message"
                    rows={3}
                    placeholder=" "
                    className="peer w-full resize-none border-b border-border bg-transparent pb-3 pt-6 text-base outline-none transition-colors duration-500 focus:border-primary"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-0 top-6 text-sm text-muted-foreground transition-all duration-500 peer-focus:top-0 peer-focus:text-[0.62rem] peer-focus:uppercase peer-focus:tracking-[0.25em] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.62rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.25em]"
                  >
                    What would you like to see?
                  </label>
                </div>

                <Magnetic>
                  <button
                    type="submit"
                    className="mt-4 inline-flex rounded-full bg-primary px-9 py-4 text-[0.66rem] uppercase tracking-[0.25em] text-primary-foreground transition-colors duration-500 hover:bg-secondary"
                  >
                    {sent ? "Thank you — we'll call you" : "Request a visit"}
                  </button>
                </Magnetic>
                {sent && (
                  <p className="text-sm font-light text-muted-foreground">
                    Your request is noted. For an immediate response, WhatsApp us on
                    +91 89503 60990.
                  </p>
                )}
              </form>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="space-y-10">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                Call or WhatsApp
              </p>
              <a href="tel:+918950360990" className="display link-underline mt-3 block text-4xl">
                +91 89503 60990
              </a>
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                Email
              </p>
              <a
                href="mailto:experience@mandhara.in"
                className="display link-underline mt-3 block text-3xl"
              >
                experience@mandhara.in
              </a>
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                Visiting hours
              </p>
              <p className="mt-3 text-base font-light text-muted-foreground">
                Daily, 9:00 – 19:00. Evening slots recommended.
              </p>
            </div>
            <Emblem size={130} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
