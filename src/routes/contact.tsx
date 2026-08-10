import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Emblem } from "@/components/site/Emblem";
import { Eyebrow, Magnetic, Reveal, Section, SplitText } from "@/components/site/primitives";
import { submitEnquiry } from "@/lib/enquiry";
import { CONTACT, LOCATION } from "@/lib/project";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Mandhara — Book a Site Visit" },
      {
        name: "description",
        content: `Book a private site visit to Mandhara at Lothal, Gujarat. Call or WhatsApp ${CONTACT.phoneDisplay}, or send an enquiry.`,
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

const FIELDS = [
  { id: "name", label: "Your name", type: "text", required: true },
  { id: "phone", label: "Phone", type: "tel", required: true },
  { id: "email", label: "Email", type: "email", required: true },
] as const;

type Status = "idle" | "sending" | "sent" | "error";

function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("sending");
    try {
      await submitEnquiry({
        data: {
          name: values["name"] ?? "",
          phone: values["phone"] ?? "",
          email: values["email"] ?? "",
          message: values["message"] ?? "",
        },
      });
      setStatus("sent");
      form.reset();
    } catch (error) {
      // Never report a success we did not get — a lost lead on a project at this
      // price point is expensive. Show the fallback instead.
      console.error(error);
      setStatus("error");
    }
  }

  const label =
    status === "sending"
      ? "Sending…"
      : status === "sent"
        ? "Thank you — we'll call you"
        : "Request a visit";

  return (
    <>
      {/*
        This was a 60svh gradient panel holding an eyebrow and four words, with
        drifting particles in the empty space below them — a full-bleed hero
        doing no work before the form the visitor actually came for. Contact is
        a task page, so it gets a page-header band sized to its own content:
        eyebrow, a real title, and one supporting line. No fixed viewport
        height, no decorative fill standing in for content.
      */}
      <header className="brand-gradient relative overflow-hidden px-6 pb-14 pt-36 md:px-12 md:pb-16 md:pt-40">
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="label mb-5 flex items-center gap-3 text-accent">
            <span className="inline-block h-px w-10 bg-accent/70" />
            Contact
          </p>
          <SplitText
            as="h1"
            text="Book a site visit."
            className="display max-w-3xl text-4xl md:text-6xl"
          />
          <p className="body-copy mt-5 max-w-xl text-white/80">
            Tell us when you are travelling and what you would like to see. Visits run
            about two hours across the enclaves, the resort and the lawns.
          </p>
        </div>
      </header>

      <Section>
        <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-24">
          <div>
            <Eyebrow>Send an enquiry</Eyebrow>
            <Reveal delay={0.1}>
              <form className="mt-10 space-y-6" onSubmit={onSubmit}>
                {FIELDS.map((f) => (
                  <div key={f.id} className="relative">
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required={f.required}
                      placeholder=" "
                      className="peer w-full border-b border-border bg-transparent pb-3 pt-6 text-[1.0625rem] outline-none transition-colors duration-500 focus:border-primary"
                    />
                    <label
                      htmlFor={f.id}
                      className="pointer-events-none absolute left-0 top-6 text-[1.0625rem] text-muted-foreground transition-all duration-500 peer-focus:top-0 peer-focus:text-[0.8125rem] peer-focus:font-medium peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.8125rem] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em]"
                    >
                      {f.label}
                    </label>
                  </div>
                ))}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder=" "
                    className="peer w-full resize-none border-b border-border bg-transparent pb-3 pt-6 text-[1.0625rem] outline-none transition-colors duration-500 focus:border-primary"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-0 top-6 text-[1.0625rem] text-muted-foreground transition-all duration-500 peer-focus:top-0 peer-focus:text-[0.8125rem] peer-focus:font-medium peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.8125rem] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em]"
                  >
                    What would you like to see?
                  </label>
                </div>

                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-4 btn-pill btn-label bg-primary text-primary-foreground transition-colors duration-500 hover:bg-deep disabled:opacity-60"
                  >
                    {label}
                  </button>
                </Magnetic>

                <p aria-live="polite" className="body-copy text-muted-foreground">
                  {status === "sent" && (
                    <>
                      Your request is with the team. For an immediate response, WhatsApp us on{" "}
                      {CONTACT.phoneDisplay}.
                    </>
                  )}
                  {status === "error" && (
                    <span className="text-destructive">
                      We could not send that just now. Please call or WhatsApp{" "}
                      <a href={CONTACT.phoneHref} className="link-underline">
                        {CONTACT.phoneDisplay}
                      </a>{" "}
                      or email{" "}
                      <a href={CONTACT.emailHref} className="link-underline">
                        {CONTACT.email}
                      </a>
                      .
                    </span>
                  )}
                </p>
              </form>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="space-y-10">
            <div>
              <p className="label text-muted-foreground">
                Call or WhatsApp
              </p>
              <a href={CONTACT.phoneHref} className="display link-underline mt-3 block text-4xl">
                {CONTACT.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="label text-muted-foreground">
                Email
              </p>
              <a href={CONTACT.emailHref} className="display link-underline mt-3 block text-3xl">
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className="label text-muted-foreground">
                Site address
              </p>
              <address className="mt-3 not-italic text-base font-light text-muted-foreground">
                {LOCATION.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            {/* Site-office visiting hours were not sourced and have been removed.
                TODO(client): confirm real hours. See CLIENT-QUERIES.md. */}
            <Emblem size={130} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
