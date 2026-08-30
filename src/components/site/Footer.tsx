import { Link } from "@tanstack/react-router";
import { Atmosphere } from "./Atmosphere";
import { Emblem } from "./Emblem";
import { NAV_LINKS } from "./nav-links";
import { Reveal } from "./primitives";
import { CONTACT, DEVELOPER, LOCATION } from "@/lib/project";

export function Footer() {
  return (
    <footer className="brand-gradient-deep relative overflow-hidden px-2 py-3 md:px-12">
      <Atmosphere density={26} />
      <div className="relative mx-auto grid w-full max-w-7xl gap-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <Reveal className="space-y-0">
          <Emblem size={180} plain />
          {/* <p className="max-w-xs text-sm text-white/70">
            Three experiences. One destination. Mandhara is a living landscape of
            villas, resort and celebration, shaped around water, trees and light.
          </p> */}
          <address className="text-sm not-italic leading-relaxed text-white/70">
            {LOCATION.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-6 mt-4 label text-accent/80">Explore</p>
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
          <p className="mb-6 mt-4 label text-accent/80">Connect</p>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <a href={CONTACT.phoneHref} className="link-underline">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="link-underline">
                {CONTACT.email}
              </a>
            </li>
          </ul>
          <dl className="grid mt-4 gap-x-10 gap-y-4 text-xs font-light text-white/55 sm:grid-cols-1">
          <div>
            <dt className="label text-white/40">DEVELOPER</dt>
            <dd className="mt-2">{DEVELOPER}</dd>
          </div>
          {/* <div>
            <dt className="label text-white/40">
              RERA registration
            </dt>
            <dd className="mt-2">To be confirmed</dd>
          </div> */}
        </dl>
        </Reveal>
      </div>

      {/*
        Indian real-estate marketing sites must carry RERA registration and
        promoter disclosure. TODO(client legal): replace the placeholders below
        with the registered project name, RERA number and approvals wording.
        See CLIENT-QUERIES.md — do not publish this page with the placeholders
        still visible.
      */}
      <div className="relative mx-auto mt-5 w-full max-w-7xl border-t border-white/15 pt-3">
        
        <p className="max-w-7xl text-xs font-light leading-relaxed text-white/45">
          All imagery is indicative. Plans, areas, specifications and amenities are
          subject to change and to the approvals in force. Nothing on this site constitutes an offer or a contract. Pricing, payment terms and possession
          dates are not published here.
        </p>
        <div className="mt-6 flex flex-col gap-3 label text-white/45 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Mandhara</span>
          <span>Villas · Resort · Club</span>
        </div>
      </div>
    </footer>
  );
}
