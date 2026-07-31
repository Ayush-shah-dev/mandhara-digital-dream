import { Link } from "@tanstack/react-router";
import { Atmosphere } from "./Atmosphere";
import { Emblem } from "./Emblem";
import { NAV_LINKS } from "./Nav";
import { Reveal } from "./primitives";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-secondary px-6 py-24 text-[oklch(0.95_0.01_84)] md:px-12">
      <Atmosphere density={26} />
      <div className="relative mx-auto grid w-full max-w-7xl gap-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <Reveal className="space-y-8">
          <Emblem size={120} />
          <p className="max-w-xs text-sm font-light leading-relaxed text-white/70">
            Three experiences. One destination. Mandhara is a living landscape of
            villas, resort and celebration, shaped around water, trees and light.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-6 text-[0.65rem] uppercase tracking-[0.3em] text-accent/80">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/75">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mb-6 text-[0.65rem] uppercase tracking-[0.3em] text-accent/80">Connect</p>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <a href="tel:+918950360990" className="link-underline">
                +91 89503 60990
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/918950360990"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:experience@mandhara.in" className="link-underline">
                experience@mandhara.in
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-20 flex w-full max-w-7xl flex-col gap-3 border-t border-white/15 pt-8 text-[0.65rem] uppercase tracking-[0.25em] text-white/45 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Mandhara</span>
        <span>Villas · Resort · Club</span>
      </div>
    </footer>
  );
}
