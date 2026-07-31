import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { logoUrl } from "./Emblem";
import { Magnetic } from "./primitives";

export const NAV_LINKS = [
  { to: "/about", label: "The Story" },
  { to: "/masterplan", label: "Masterplan" },
  { to: "/villas", label: "Villa Enclave" },
  { to: "/resort", label: "Resort" },
  { to: "/club", label: "Club & Events" },
  { to: "/amenities", label: "Amenities" },
  { to: "/arrival", label: "Arrival" },
  { to: "/revenue", label: "Revenue Sharing" },
  { to: "/gallery", label: "Gallery" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-700 ${
          solid ? "glass py-3 shadow-[0_10px_40px_-30px_rgba(0,0,0,.5)]" : "py-6"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-12">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Mandhara"
              className={`transition-all duration-700 ${solid ? "h-9" : "h-12"} w-auto object-contain`}
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.slice(0, 5).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="link-underline text-[0.72rem] uppercase tracking-[0.22em] text-foreground/80 hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic className="hidden md:inline-block">
              <Link
                to="/contact"
                className="rounded-full bg-primary px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-primary-foreground transition-colors duration-500 hover:bg-secondary"
              >
                Book a Visit
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="group flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-border/70"
            >
              <span
                className={`h-px w-5 bg-foreground transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-foreground transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[85] overflow-y-auto bg-secondary px-6 py-28 text-[oklch(0.96_0.01_84)] md:px-12"
          >
            <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr]">
              <ul className="space-y-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + i * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={l.to}
                      className="display group flex items-baseline gap-5 py-1 text-4xl transition-colors duration-500 hover:text-accent md:text-6xl"
                    >
                      <span className="font-sans text-[0.6rem] tracking-[0.3em] text-accent/70">
                        0{i + 1}
                      </span>
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-6 self-end border-t border-white/15 pt-8 text-sm font-light"
              >
                <p className="max-w-sm leading-relaxed text-white/70">
                  A 100-acre destination of villas, resort and celebration —
                  where nature sets the pace and hospitality carries the day.
                </p>
                <div className="space-y-1 text-white/85">
                  <a href="tel:+918950360990" className="link-underline block">
                    +91 89503 60990
                  </a>
                  <a href="mailto:experience@mandhara.in" className="link-underline block">
                    experience@mandhara.in
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
