import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { logoUrl } from "./Emblem";
import { Magnetic } from "./primitives";
import { CONTACT } from "@/lib/project";

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
        className={`fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-black/20 text-white backdrop-blur-[3px] transition-all duration-700 ${
          solid ? "glass py-3 shadow-[0_10px_40px_-30px_rgba(0,0,0,.5)]" : "py-6"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-12">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Mandhara"
              className={`origin-left scale-150 brightness-0 invert transition-all duration-700 ${solid ? "h-9" : "h-12"} w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,.7)]`}
            />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex xl:gap-12">
            {NAV_LINKS.slice(0, 5).map((l) => {
              const current = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={current ? "page" : undefined}
                  className={`nav-link relative transition-colors duration-500 hover:text-primary ${
                    current ? "text-accent" : "link-underline text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,.85)]"
                  }`}
                >
                  {l.label}
                  {current && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic className="hidden md:inline-block">
              <Link
                to="/contact"
                className="btn-pill btn-label bg-primary font-light text-primary-foreground hover:bg-deep"
              >
                Book a Visit
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="group flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-white/70 bg-black/10"
            >
              <span
                className={`h-px w-5 bg-white transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-white transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
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
                      <span className="nav-link text-accent/70">
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
                className="space-y-6 self-end border-t border-white/15 pt-8 body-copy"
              >
                <p className="max-w-sm leading-relaxed text-white/70">
                  A destination of villas, resort and celebration near Lothal,
                  Gujarat — where nature sets the pace and hospitality carries
                  the day.
                </p>
                <div className="space-y-1 text-white/85">
                  <a href={CONTACT.phoneHref} className="link-underline block">
                    {CONTACT.phoneDisplay}
                  </a>
                  <a href={CONTACT.emailHref} className="link-underline block">
                    {CONTACT.email}
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
