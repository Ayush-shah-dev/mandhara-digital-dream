/**
 * Single source of truth for every factual figure published on the site.
 *
 * Rule: if a number appears in more than one place, it lives here — the audit
 * found the same stat drifting between pages (5 acres vs 11 acres for the lake,
 * 8 km vs 4 km for the lakeside path). Import from here instead of retyping.
 *
 * Every value below is sourced from the project brochure; the page reference is
 * noted alongside. Anything the brochure does not state is deliberately absent —
 * see CLIENT-QUERIES.md for the open list. Do not add a figure here without a
 * source.
 */

/** Villa enclave counts — brochure p.2, p.5 and the 348-row Area Sheet. */
export const VILLAS = {
  /** 294 (NICQE) + 54 (ORION) */
  total: 348,
  nicqe: 294,
  orion: 54,
} as const;

/** NICQE enclave amenities — brochure p.2 ("294 Villas – 2 club houses – 15 garden valleys"). */
export const NICQE = {
  clubhouses: 2,
  /** Brochure headline says 15 valleys and names 15; its body copy says "eighteen".
   *  We publish 15 — the number the brochure can actually name. See CLIENT-QUERIES.md. */
  gardenValleys: 15,
} as const;

/** Sheen Lake — brochure p.21 "Lakeside Living". */
export const LAKE = {
  acres: 6,
  islands: 5,
  promenadeKm: 1,
  aerators: 8,
} as const;

/** Signature Resort — brochure p.14. */
export const RESORT = {
  suites: 60,
  /** Brochure text names three categories; the p.14 key-map shows three physical
   *  outlooks. Both are stated together rather than merged into an invented list. */
  categories: ["Presidential", "Standard", "Junior"] as const,
  outlooks: ["Lawn-Facing", "Island-Facing", "Swimming Pool"] as const,
} as const;

/** Club & event space — brochure p.17, p.20. Capacities are NOT in the brochure. */
export const CLUB = {
  banquetSqFt: "10,000 sq.ft",
} as const;

/** Site address and verified distances — brochure back cover and location spread. */
export const LOCATION = {
  addressLines: [
    "Lothal Greens, Bhurkhi, Lothal. 382230",
    "Javaraj, Road, Gundi, Lothal, Gujarat 382230",
  ],
  nearestTown: "Bagodara",
  /** Approximate centre of the Lothal / Bagodara area, for the embedded map. */
  map: {
    lat: 22.5217,
    lon: 72.2492,
    /** west, south, east, north */
    bbox: [72.05, 22.35, 72.45, 22.7] as const,
  },
  nearby: [
    [
      "Archaeological Site Museum, Lothal",
      "~10 km",
      "The excavated Indus Valley dockyard and its museum, on the doorstep.",
    ],
    ["NH 47 — Rajkot–Ahmedabad Highway", "14 km", "Reached via the Bagodara–Vataman Road."],
    [
      "Ahmedabad–Dholera Expressway",
      "16 km",
      "The corridor linking Ahmedabad to the Dholera investment region.",
    ],
    [
      "Ganapatipura Ganpati Mandir",
      "~19 km",
      "A long-standing pilgrimage temple in the surrounding countryside.",
    ],
  ] as const,
} as const;

/**
 * One contact identity for the whole site. The brief supplies this WhatsApp
 * number; the email domain is still unconfirmed against the brochure's
 * www.mandhara.com — see CLIENT-QUERIES.md.
 */
export const CONTACT = {
  phoneDisplay: "+91 78780 05555",
  phoneHref: "tel:+91 7878005555",
  whatsapp: "https://wa.me/917878005555",
  email: "hello@mandhara.in",
  emailHref: "mailto:hello@mandhara.in",
} as const;

/** Legal entity named in the brochure. */
export const DEVELOPER = "Vaani Global Infra";
  