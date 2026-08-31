import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { Cursor } from "../components/site/Cursor";
import { SmoothScroll } from "../components/site/SmoothScroll";
import { Loader } from "../components/site/Loader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-8xl text-primary">404</h1>
        <h2 className="mt-4 text-xl font-light">This path leads elsewhere</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for isn't part of Mandhara yet.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn-pill btn-label bg-primary text-primary-foreground"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-3xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-pill btn-label bg-primary text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn-pill btn-label border border-border"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mandhara — Three Experiences. One Destination." },
      {
        name: "description",
        content:
          "Mandhara is a luxury destination of villas, resort and celebration, shaped around water, trees and golden light.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@200;300;400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Curtain({ pathname }: { pathname: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={pathname}
        className="pointer-events-none fixed inset-0 z-[95] origin-bottom bg-secondary"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </AnimatePresence>
  );
}

function FloatingContact() {
  return (
    <a
      href="https://wa.me/917878005555"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[70] grid h-14 w-14 place-items-center rounded-full bg-secondary text-[oklch(0.96_0.01_84)] shadow-[0_20px_60px_-20px_rgba(0,0,0,.5)] transition-transform duration-500 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.82-.11-.42-.11-.96-.29-1.65-.59-2.9-1.25-4.79-4.17-4.94-4.37-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36l.55.01c.18 0 .41-.07.64.49.24.57.82 1.99.89 2.13.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.29.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.17-.19.69-.8.87-1.08.18-.29.36-.24.61-.14.24.09 1.55.73 1.82.86.26.14.44.21.5.33.07.11.07.66-.17 1.34Z" />
      </svg>
    </a>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("mandhara-entered") === "1") setLoaded(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <Cursor />
      {!loaded && (
        <Loader
          onDone={() => {
            sessionStorage.setItem("mandhara-entered", "1");
            setLoaded(true);
          }}
        />
      )}
      <Curtain pathname={pathname} />
      <Nav />
      <main className="noise min-h-screen">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </QueryClientProvider>
  );
}
