# Mandhara — Product Documentation

> **What this document is.** A complete, source-derived specification of the Mandhara
> digital product: what the destination is, every piece of property data the site
> currently asserts, how that data is structured in code, and what is missing or
> contradictory. Every figure below is traceable to a file and line in this repository.
>
> **Source of truth.** The website has no CMS and no database. All content is hardcoded
> as TypeScript literals inside route files. This document is therefore a *mirror* of
> the code, not an upstream brief. Where the code and the original brief
> ([README.md](README.md)) disagree, both are recorded.
>
> **Status:** derived from `main` @ `8c877cb` plus uncommitted working-tree changes.
> **Last reviewed:** 10 August 2026.

---

## Table of contents

1. [Product overview](#1-product-overview)
2. [Positioning, brand and tone](#2-positioning-brand-and-tone)
3. [Audiences and jobs to be done](#3-audiences-and-jobs-to-be-done)
4. [Product architecture — the three experiences](#4-product-architecture--the-three-experiences)
5. [Master fact sheet — estate-level data](#5-master-fact-sheet--estate-level-data)
6. [The masterplan — five named zones](#6-the-masterplan--five-named-zones)
7. [Product 1 — Villa Enclave](#7-product-1--villa-enclave)
8. [Product 2 — The Resort](#8-product-2--the-resort)
9. [Product 3 — Club & Events](#9-product-3--club--events)
10. [Amenities catalogue — all fourteen](#10-amenities-catalogue--all-fourteen)
11. [Commercial model — revenue sharing](#11-commercial-model--revenue-sharing)
12. [The arrival experience](#12-the-arrival-experience)
13. [Location and connectivity](#13-location-and-connectivity)
14. [Gallery and media inventory](#14-gallery-and-media-inventory)
15. [Contact, lead funnel and site-visit offer](#15-contact-lead-funnel-and-site-visit-offer)
16. [Information architecture — page by page](#16-information-architecture--page-by-page)
17. [Design system](#17-design-system)
18. [Technical architecture](#18-technical-architecture)
19. [Content ownership map — where every fact lives](#19-content-ownership-map--where-every-fact-lives)
20. [Data integrity register — conflicts and gaps](#20-data-integrity-register--conflicts-and-gaps)
21. [Launch blockers — content the site does not yet have](#21-launch-blockers--content-the-site-does-not-yet-have)
22. [Brief vs. build — delivered and not delivered](#22-brief-vs-build--delivered-and-not-delivered)
23. [Appendices](#23-appendices)

---

## 1. Product overview

**Mandhara** is a single, integrated luxury real-estate and hospitality destination in
India, sold through this website as one address containing three distinct products.
The site's own one-line definition — repeated in the loader, the hero, the nav overlay
and the footer — is:

> **Three Experiences. One Destination.**

| Attribute | Value |
|---|---|
| Product type | Integrated destination estate — residential + hospitality + events |
| Land parcel | **100+ acres**, single contiguous estate |
| Residential inventory | **354 villas** across two enclaves |
| Hospitality inventory | Resort with **120 keys**, spa, pools, dining |
| Events inventory | **5 venues**, up to **2,500** guests outdoors / **900** indoors |
| Central landscape feature | **Sheen Lake**, fed by monsoon channels |
| Revenue models | (a) outright villa sale; (b) villa purchase enrolled into a managed hospitality pool with **quarterly** revenue share |
| Primary CTA | *Book a private site visit* |
| Secondary CTAs | Request villa availability · Check event-date availability · Request the revenue model · Enquire about a resort stay |
| Live deployment | `https://mandhara-digital-dream.lovable.app` |

### What kind of website this is

A **cinematic brochure site**, not a transactional portal. There is no search, no
inventory filtering, no unit-level availability, no price display, no login, no booking
engine, no payment. The entire funnel converges on a phone number, a WhatsApp link, an
email address and one contact form.

The experience is deliberately slow and scroll-driven: a 5.2-second particle loader
precedes the home page, every section reveals on scroll, and two pages
(`/amenities`, `/arrival`) are built as continuous scroll narratives rather than as
conventional content pages.

---

## 2. Positioning, brand and tone

### Stated benchmarks
Aman Resorts · Six Senses · Four Seasons · Apple · Bentley Residences · Bugatti
Residences · Zaha Hadid Architects · Awwwards Site of the Day.

### Brand feeling
Luxury · Nature · Calm · Timeless · Warm · Minimal · Premium.

### The core narrative argument
The site does not lead with square footage or price. It leads with **restraint**:

- *"We built around the trees, not through them."* — home, Nature Philosophy
- *"Not a single mature tree was felled."* — home, Introduction
- *"Design that defers to the land."* — home, Master Vision
- *"Built to weather, not to shine."* — villas, Construction Philosophy
- *"Luxury here is quiet, slow and outdoors."* — about, Philosophy
- *"We measured success in canopy retained, in metres of shaded walkway, in the number
  of evenings a family chooses to eat outside."* — about

### The three-part value proposition

1. **Live** — a villa in a low-density enclave where roads follow contours and no two
   homes face each other.
2. **Retreat** — a full resort on the doorstep, so residents get holiday-grade service
   daily without travelling for it.
3. **Celebrate** — venues large enough to host a three-day wedding with every guest
   housed on the estate and nobody driving between venues.

The connective claim, from [about.tsx](src/routes/about.tsx): *"the resort team also
cares for the enclave's clubhouses, so residents live with service standards usually
reserved for holidays."*

### Voice
Short declaratives. Sensory and time-anchored rather than superlative — *"Come see the
light at five in the evening"*, *"The gate lighting comes on at 6:20"*, *"7–9 am for the
lake, 5–7 pm for the lawns"*. Numbers appear sparingly and are always attached to a
physical consequence.

---

## 3. Audiences and jobs to be done

The structure implies four visitors, each with a dedicated entry point and CTA.

| # | Audience | Entry pages | Job to be done | CTA served |
|---|---|---|---|---|
| 1 | **Second-home / primary-home buyer** | `/villas`, `/masterplan`, `/amenities` | Understand plot sizes, layouts, density, build quality and daily life | *Request availability* |
| 2 | **Yield-seeking investor** | `/revenue`, `/resort` | Understand ownership + management structure, payout cadence, realistic occupancy | *Request the model / Ask for the numbers* |
| 3 | **Wedding or event client** | `/club`, `/gallery` | Match guest count to venue, check seasonality, confirm on-site accommodation | *Check availability / Hold a date* |
| 4 | **Resort guest** | `/resort`, `/amenities`, `/location` | Decide on a stay — used as a soft entry into audience 1 | *Enquire about a stay* |

Audience 4 is explicitly framed as a funnel into audience 1:
> *"Resort stays are open to prospective residents — arrive Friday, walk the estate
> Saturday."* — [resort.tsx](src/routes/resort.tsx)

---

## 4. Product architecture — the three experiences

A first-class data structure on the home page,
[index.tsx:61-83](src/routes/index.tsx#L61-L83):

| # | Experience | Description as written | Route |
|---|---|---|---|
| **01** | **Villa Enclave** | "354 private villas along garden valleys and tree-lined roads, with two clubhouses at their heart." | `/villas` |
| **02** | **The Resort** | "A wellness retreat of suites, spa, pools and quiet terraces facing the water." | `/resort` |
| **03** | **Club & Events** | "Banquets, lawns and an event ground shaped for weddings that people remember for decades." | `/club` |

Mapped onto the five masterplan zones:

```text
Villa Enclave  ──►  NICQE  (north)   +  RIME  (south)
The Resort     ──►  GEMINI (lake's northern shoulder)
Club & Events  ──►  ORION  (independent access + parking)
                    SHEEN LAKE  ──►  shared centre, belongs to all three
```

---

## 5. Master fact sheet — estate-level data

Every estate-wide figure the site asserts, with its canonical source.

| Figure | Value | Source |
|---|---|---|
| Total land area | **100+ acres** | [index.tsx:220](src/routes/index.tsx#L220), [about.tsx:102](src/routes/about.tsx#L102), meta descriptions |
| Villas | **354** | [index.tsx:221](src/routes/index.tsx#L221), [villas.tsx:186](src/routes/villas.tsx#L186), page `<title>` |
| Experiences | **3** | [index.tsx:222](src/routes/index.tsx#L222) |
| Masterplan zones | **5** | [masterplan.tsx:44-129](src/routes/masterplan.tsx#L44-L129) |
| Sheen Lake — water area | **5 acres** | [index.tsx:258](src/routes/index.tsx#L258), [about.tsx:104](src/routes/about.tsx#L104), [masterplan.tsx:118](src/routes/masterplan.tsx#L118) |
| Sheen Lake — water area *(conflicting)* | **11 acres** | [amenities.tsx:69](src/routes/amenities.tsx#L69) |
| Garden valleys | **18** | [index.tsx:259](src/routes/index.tsx#L259), [villas.tsx:188](src/routes/villas.tsx#L188), [about.tsx:103](src/routes/about.tsx#L103) |
| Lake promenade | **8 km** | [index.tsx:260](src/routes/index.tsx#L260), [resort.tsx:80](src/routes/resort.tsx#L80) |
| Walking trail loop | **4 km** | [amenities.tsx:103](src/routes/amenities.tsx#L103) |
| Islands in the lake | **5** | [masterplan.tsx:441](src/routes/masterplan.tsx#L441) — single mention |
| Clubhouses | **2** ("Clubhouse One", "Clubhouse Two") | [villas.tsx:187](src/routes/villas.tsx#L187), [masterplan.tsx:52,66](src/routes/masterplan.tsx#L52) |
| Amenities | **14** | [amenities.tsx:38-155](src/routes/amenities.tsx#L38-L155) |
| Resort keys | **120** | [club.tsx:145](src/routes/club.tsx#L145) |
| Event venues | **5** | [club.tsx:146](src/routes/club.tsx#L146) |
| Native plant species | **70+** | [amenities.tsx:86](src/routes/amenities.tsx#L86) |
| Mature trees felled | **0** | [index.tsx:200](src/routes/index.tsx#L200) |
| Wedding planners assigned | **1** per event | [club.tsx:147](src/routes/club.tsx#L147) |

### Landscape and environmental claims

| Claim | Detail | Source |
|---|---|---|
| Tree survey preceded design | "the survey mapped each trunk before a single line was drawn" | home, Nature Philosophy |
| Roads follow contours | "Every road follows an existing contour. Every valley remains a valley." | home |
| Landform preserved | "The natural undulation became gardens rather than being levelled into plots." | home |
| Water strategy | "Monsoon channels feed five acres of water at the centre of the estate." | home |
| On-plot recharge | Roof + surface runoff recharged on plot, overflow channelled back to Sheen Lake | villas, Construction |
| Bloom calendar | "Species chosen so something is always flowering, month after month" | home / amenities |
| Avenue planting | **200 metres** of trees "planted before the first drawing" | [arrival.tsx:36](src/routes/arrival.tsx#L36) |

---

## 6. The masterplan — five named zones

Zones are modelled as a typed `Zone[]` in
[masterplan.tsx:31-129](src/routes/masterplan.tsx#L31-L129). Each carries an id, a
display name, a purpose label, an overview paragraph, four features, a hero image,
hotspot coordinates as a percentage of the aerial frame, and a cross-link (with hash)
into its detail page.

### Zone schema

```ts
type Zone = {
  id: string;          // "nicqe" — also the deep-link: /masterplan#zone-nicqe
  name: string;        // "NICQE"
  purpose: string;     // "Villa Enclave North"
  overview: string;    // paragraph shown in tooltip + detail pane
  features: string[];  // exactly 4 per zone
  image: string;
  to: string;          // detail route
  hash: string;        // section anchor within that route
  linkLabel: string;   // CTA copy
  x: number;           // hotspot X, % of image width
  y: number;           // hotspot Y, % of image height
};
```

### The five zones

| Zone | Purpose | Pin (x%, y%) | Features | Deep link | CTA |
|---|---|---|---|---|---|
| **NICQE** | Villa Enclave North | 26, 30 | Garden valley plots · Clubhouse One · Tree-lined avenue · Children's green | `/villas#enclave` | "Open the villa enclave" |
| **RIME** | Villa Enclave South | 30, 68 | Courtyard villas · Clubhouse Two · Walking trail loop · Orchard belt | `/villas#construction` | "See how they are built" |
| **GEMINI** | The Resort | 72, 32 | Presidential & Junior suites · Spa and wellness · Infinity pool · Lakeside dining | `/resort#facilities` | "Open resort facilities" |
| **ORION** | Club & Events | 74, 70 | Grand banquet · Event ground · Outdoor restaurant · Bridal suites | `/club#venues` | "Open club venues" |
| **SHEEN LAKE** | The Heart | 50, 50 | Lake promenade · Jetty & pavilion · Birding decks · Sunset steps | `/amenities` | "Walk the lakeside" |

### Zone overviews, verbatim

- **NICQE** — "The first residential valley: wide plots stepping down toward the water,
  with the primary clubhouse at its centre."
- **RIME** — "Quieter, deeper into the canopy — designed for larger homes with private
  courtyards and long garden edges."
- **GEMINI** — "Suites, spa, pools and dining arranged along the lake's northern
  shoulder, catching the morning light."
- **ORION** — "Banquet halls, an open event ground and lawns sized for weddings, with
  independent access and parking."
- **SHEEN LAKE** — "The still centre of Mandhara — five acres of water fed by monsoon
  channels, edged by an 8 km promenade."

### Masterplan interaction model

| Behaviour | Implementation |
|---|---|
| Default selection | `SHEEN LAKE` (index 4) |
| Hover | Tooltip card with purpose, name, overview and CTA label |
| Click | Selects the zone, swaps the detail pane, rewrites the URL hash via `history.replaceState` |
| Keyboard | `←`/`↑` previous, `→`/`↓` next, `Home` first, `End` last — wrapping, with roving `tabIndex` |
| Deep link | `/masterplan#zone-<id>` read on mount |
| Connecting lines | Animated dashed SVG lines from the four outer zones into the lake at centre |
| Secondary index | A "Zone Index" list below the map, hover-synced with a sticky preview panel |
| A11y | `role="group"` with an instructional `aria-label`, `role="tooltip"`, `aria-current`, `aria-describedby`, plus "Focus the map" / "Jump to zone detail" skip buttons |

---

## 7. Product 1 — Villa Enclave

Route: `/villas` · Zones: NICQE + RIME · Page title: *"Villa Enclave — 354 Villas at Mandhara"*
Headline: **"354 villas, and not one of them in a row."**

### Enclave-level figures

| Metric | Value |
|---|---|
| Villas | **354** |
| Clubhouses | **2** |
| Garden valleys | **18** |

### Villa types — full specification

Source: [villas.tsx:31-79](src/routes/villas.tsx#L31-L79)

| | **Valley Villa** | **Garden Villa** | **Lake Villa** |
|---|---|---|---|
| Layout | 3 BHK + study | 4 BHK + court | 4 BHK + pool |
| Plot area | **2,400 sq ft** | **3,600 sq ft** | **5,400 sq ft** |
| Built-up area | **2,850 sq ft** | **4,100 sq ft** | **6,200 sq ft** |
| Ratio (built : plot) | 1.19 | 1.14 | 1.15 |
| Positioning | The garden-valley plan | The courtyard plan | The waterfront plan |
| Key features | Single storey stepping down with the contour; front lawn; rear service court | Rooms wrap a private courtyard with a water bowl, timber screens, double-height living volume | Private pool deck; full-width glazing to Sheen Lake; upper sunset terrace |
| Zone affinity | NICQE (implied) | RIME (implied) | Lake edge (implied) |

> **Note.** Zone affinity is *implied* by copy, never stated as data. There is no
> per-zone or per-type unit count anywhere in the site — 354 villas are never
> distributed across the three plans or the two enclaves.

### Plot and layout logic

Presented as a fourth showcase card, "Plot & Layout Logic":

| Rule | Value |
|---|---|
| Setbacks | **3 m green edge** |
| Parking | **2 cars**, absorbed on-plot |
| Access | Rear service lane |
| Orientation rule | "No two homes facing each other" |
| Derivation | "Every plot is drawn from the contour survey" |

### Construction philosophy

Source: [villas.tsx:81-118](src/routes/villas.tsx#L81-L118). Section headline:
**"Built to weather, not to shine."**

| Principle | Category | Specification |
|---|---|---|
| Stone and lime facades | Material | Load-bearing stone with lime plaster — "surfaces that weather warmer with each monsoon instead of fading" |
| Deep overhangs | Climate | Roof projections sized for monsoon rain and summer sun, so windows stay open year-round |
| Cross-ventilated plans | Comfort | Every habitable room has **two openings**; mechanical cooling is "a fallback, not the default" |
| Rain harvesting on every plot | Water | Roof and surface runoff recharged on plot; overflow channelled back to Sheen Lake |
| Solar-ready, EV-ready | Services | Roofs pre-conduited for panels; porches wired for chargers, "so retrofits never break a wall" |

### Page-level interactions

- **Day/Night comparison slider** — a range input wipes a daytime garden image over a
  night villa image, with Day/Night labels and a gold seam line
  ([villas.tsx:120-155](src/routes/villas.tsx#L120-L155)).
- **HoverShowcase** on villa types, with per-item detail rows rendering plot, built-up
  and layout as a spec table on hover/focus.
- **Anchors** — `#enclave` and `#construction`, both targeted from the masterplan.

### Closing CTA
*"Choose your valley."* — "Plot availability moves quickly across NICQE and RIME. We'll
walk you through what's open." → *Request availability*.

---

## 8. Product 2 — The Resort

Route: `/resort` · Zone: GEMINI · Title: *"The Resort at Mandhara — Suites, Spa and Lakeside Wellness"*
Headline: **"A retreat that happens to be next door."**

Positioning: open to outside guests **and** to residents "who never have to travel for it."

### Accommodation

Two suite types are described in full ([resort.tsx:31-42](src/routes/resort.tsx#L31-L42)):

| Suite | Specification |
|---|---|
| **Presidential Suite** | Two bedrooms, private plunge pool, wraparound deck over the water |
| **Junior Suite** | A single volume opening entirely to the canopy, with a stone soaking tub |

The closing CTA names **four** categories — "Presidential, island-facing, pool and
junior" — of which only two have descriptions. Total inventory is given elsewhere as
**120 resort keys** ([club.tsx:145](src/routes/club.tsx#L145)).

### Facilities

Source: [resort.tsx:42-88](src/routes/resort.tsx#L42-L88)

| Facility | Headline metric | Detail |
|---|---|---|
| **Spa & Wellness** | **6 treatment rooms** | Steam, sauna, outdoor cold plunge; built half a level below grade so rooms open onto a water channel |
| **Swimming Pool** | **30 metres** | Infinity edge facing the sunset, plus a shaded family shallow |
| **Gymnasium** | **Opens 5 am** | Full strength and cardio floor opening to a shaded terrace and yoga deck |
| **Boutique Restaurant** | Wood fire | Wood-fire kitchen using estate-orchard produce; dinner served outdoors |
| **Library Bar** | Quiet room | "Quiet corners, long pours, and no television anywhere in the room" |
| **Lakeside & Trails** | **8 km** | Guided dawn lake walks, birding decks, a floating bar, the promenade loop |

### Operating facts

| Fact | Value |
|---|---|
| Outdoor dining season | **9 months of the year** |
| Best months to stay | **October to February** |
| Included with a stay | Spa access, dawn lake walk, estate breakfast |
| Suggested visit pattern | "Arrive Friday, walk the estate Saturday" |
| Anchor | `#facilities` (targeted from GEMINI on the masterplan) |

---

## 9. Product 3 — Club & Events

Route: `/club` · Zone: ORION · Title: *"Club & Events at Mandhara — A Wedding Destination"*
Headline: **"Where celebrations become family history."**
Section headline: **"Room for two hundred, or four thousand."**

### Venue matrix — the most quantified data on the site

Source: [club.tsx:31-72](src/routes/club.tsx#L31-L72)

| Venue | Capacity | Specification |
|---|---|---|
| **Grand Banquet** | **900 guests** | **2 pillarless halls × 10,000 sq ft each**; **9 m ceilings**; pre-function lounges; custom staging |
| **Event Ground** | **2,500 guests** | Independent access, festival staging, valet parking; **4,000-strong Garba night record** |
| **Lakeside Lawn** | **600 guests** | Sunset ceremonies with water on three sides; string lighting; draped mandap deck |
| **Outdoor Restaurant** | **180 guests** | Intimate dinners under the old rain trees; boutique kitchen serves straight to the lawn |
| **Pavilion Club** | Members | Indoor games, multi-purpose halls, bridal suites, wedding rooms for the party |

Derived totals: **20,000 sq ft** of pillarless banquet space; peak recorded attendance
**4,000** on the event ground (above its stated 2,500 capacity — see
[§20](#20-data-integrity-register--conflicts-and-gaps)).

### Wedding proposition

| Metric | Value |
|---|---|
| Resort keys available to a wedding party | **120** |
| Venues | **5** |
| Planners assigned | **1** |

> *"Guests stay at the resort, ceremonies move between lawn and lake, and the banquet
> takes the night. Nobody drives anywhere in between."*
> — "Three days, one estate, zero logistics."

Services listed: planners, catering, décor, valet, AV. Plus bridal suites.

### Seasonality calendar

Source: [club.tsx:74-104](src/routes/club.tsx#L74-L104)

| Months | Season | Demand profile |
|---|---|---|
| **Nov – Feb** | Wedding season | Cool evenings, clear skies; **peak demand** across both banquets and the lakeside lawn |
| **Mar – May** | Corporate & offsites | Early-morning programmes, shaded lawns, resort keys for the whole delegation |
| **Jun – Sep** | Monsoon celebrations | Covered banquet halls; dramatic light over the lake; indoor-outdoor events |
| **Oct** | Festival calendar | Estate-wide lighting, live concerts at the amphitheatre, **4,000-person Garba nights** |

> The **amphitheatre** is named only here and appears nowhere in the masterplan,
> amenities or venue list.

### Closing CTA
*"Hold a date at Mandhara."* — "Send us the season and the guest count — we'll come back
with venues, layouts and a walkthrough slot." → *Check availability*.

---

## 10. Amenities catalogue — all fourteen

Route: `/amenities` · Title: *"Amenities at Mandhara — Fourteen Worlds, One Journey"*
Headline: **"Fourteen worlds. Keep scrolling."**

This page is built as an immersive scroll journey, not a card grid: each amenity is a
full-viewport panel (`110svh`) with its own parallax image, its own colour tint, its own
particle atmosphere and a single glass stat tile.

### The fourteen

Source: [amenities.tsx:38-155](src/routes/amenities.tsx#L38-L155)

| # | Amenity | Stat | Tagline | Detail |
|---|---|---|---|---|
| 01 | **Spa** | **6** treatment rooms | "Half a level below the world." | Rooms open onto a water channel; steam, cold plunge, silent lounge |
| 02 | **Restaurant** | **180** covers | "Wood fire, long tables, late evenings." | Estate produce over open flame, under lantern-strung rain trees |
| 03 | **Swimming Pool** | **30 m** infinity edge | "Thirty metres facing the sunset." | Edge drops toward the canopy; shaded shallow deck |
| 04 | **Sheen Lake** | **11** acres of water | "The still centre." | Promenade, jetty, pavilion, birding decks |
| 05 | **Sports** | **5** courts | "Play, then swim, then eat." | Tennis, badminton, half-court, cricket net — all floodlit |
| 06 | **Garden** | **70+** native species | "Seasonal, deliberate, native." | Planting keyed to bloom in sequence |
| 07 | **Club** | **2** clubhouses | "Two houses, one enclave." | Lounges, reading room, indoor games, café onto the pool deck |
| 08 | **Walking Trail** | **4 km** loop | "Four kilometres without a road crossing." | Valleys, orchard, lakefront; lit low for evening walks |
| 09 | **Kids Area** | **1.2** acres | "Built for scraped knees." | Timber structures, sand, water channels, shaded parents' deck |
| 10 | **Outdoor Lawn** | **600** guests | "Where the estate gathers." | Concerts, festivals, film nights, Sunday markets |
| 11 | **Banquet** | **900** guests | "Column-free, nine metres tall." | Takes a full wedding with no sightline compromised |
| 12 | **Wellness** | **24/7** access | "Strength, breath, recovery." | Gym, yoga deck, recovery suite, dawn lake walks |
| 13 | **Meditation** | **1** oculus | "A room with almost nothing in it." | Stone pavilion oriented to sunrise over the water |
| 14 | **God's Garden** | **1** sacred grove | "The quietest acre at Mandhara." | Grove around a shrine; stone seating, still water, evening lamps |

The same fourteen names scroll as an infinite marquee on the home page
([index.tsx:389-404](src/routes/index.tsx#L389-L404)), there listed as "Sheen Lake"
rather than "Lake".

### Panel mechanics

| Element | Behaviour |
|---|---|
| Panel height | `110svh` each — ~15.4 viewport heights of scroll for the full page |
| Image | Parallax `y` −60 → +60 px, scale 1.25 → 1.0 as the panel crosses the viewport |
| Copy | Fades in and out on a `[0, 0.25, 0.75, 1]` opacity curve |
| Tint | Per-amenity `oklch` gradient at 72% opacity, `mix-blend-multiply`, into night |
| Atmosphere | Canvas particles; density 24 with `leaf: true` (Sheen Lake, Garden, Walking Trail, God's Garden), else 30 |
| Progress | A fixed 2 px gold scroll-progress bar pinned to the top of the viewport |
| Numbering | Auto-padded `01 · Spa` … `14 · God's Garden` |

---

## 11. Commercial model — revenue sharing

Route: `/revenue` · Title: *"Revenue Sharing at Mandhara — Own, Operate, Earn"*
Headline: **"A villa that earns its keep."**
Framing: *"Hospitality-managed ownership: your home stays yours, and works as part of
the resort when you're away."*

### The five-step model

Source: [revenue.tsx:31-39](src/routes/revenue.tsx#L31-L39). Section headline:
**"Five steps, no fine print."**

| Step | Name | Commitment made |
|---|---|---|
| **01** | **Own** | "You hold clear title to the villa and its land. Registration in your name, always." |
| **02** | **Enrol** | "Opt the villa into the hospitality pool for a defined term, or keep it private." |
| **03** | **Operate** | "Mandhara's resort team handles bookings, housekeeping, upkeep and guest service." |
| **04** | **Earn** | "Room revenue is pooled and shared, settled quarterly with a transparent statement." |
| **05** | **Use** | "Owner nights are reserved for you each year, including peak-season allocation." |

> The home page presents an abbreviated **three**-step version of the same model —
> Own → Operate → Earn ([index.tsx:50-54](src/routes/index.tsx#L50-L54)) — dropping
> Enrol and Use.

### Structural characteristics

| Dimension | As stated |
|---|---|
| Title | Freehold, registered in the buyer's name |
| Enrolment | Optional, for a defined term; owners may stay fully private |
| Operator | Mandhara's own resort team (not a third-party brand) |
| Pooling | Revenue is **pooled** across enrolled villas, not per-unit |
| Basis | **Room revenue** (not net profit, not gross estate revenue) |
| Settlement cadence | **Quarterly** |
| Reporting | Statement with occupancy, rate and share breakdown |
| Owner usage | Reserved nights each year, **including peak season** |
| Owner perks | Spa credits, priority at club venues |
| Governing document | "the management agreement" |

### Illustrative occupancy ramp

Source: [revenue.tsx:41-47](src/routes/revenue.tsx#L41-L47). Rendered as an animated
bar chart under the heading *"Ramp-up across the first five years."*

| Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|
| **42%** | **58%** | **71%** | **83%** | **94%** |

Disclaimer, verbatim:
> *"Indicative only. Occupancy and revenue vary with season, inventory and market
> conditions; final terms are set out in the management agreement."*

### Owner benefits (three cards)

1. **Professional upkeep** — housekeeping, maintenance and landscaping by the resort team.
2. **Transparent reporting** — quarterly statements with occupancy, rate and share breakdown.
3. **Owner privileges** — reserved nights, spa credits, priority at club venues.

### What the model does **not** disclose

No revenue **split percentage**. No management fee. No minimum enrolment term. No ADR
or RevPAR assumption behind the occupancy curve. No capital cost, no yield figure, no
worked example. The page closes by directing this to a conversation: *"Ask for the
numbers … We'll share the full model, term sheet and current inventory over a call or
on site."*

---

## 12. The arrival experience

Route: `/arrival` · Title: *"The Arrival Experience at Mandhara"*
Headline: **"The drive in is part of the address."**

A scroll-driven drive-through: a sticky full-viewport image zooms 1.05 → 1.45 and dims
0.35 → 0.75 while an SVG car icon travels from −10% to 88% across a horizontal rail
("Scroll to drive"). Six glass beat-cards scroll over the top.

| Beat | Name | Copy |
|---|---|---|
| **01** | The Turn | "You leave the highway and the noise stops within fifty metres." |
| **02** | The Gate | "Stone piers open as you approach; the road narrows and slows you down." |
| **03** | The Fountains | "Water on both flanks, catching the last of the light." |
| **04** | The Sculptures | "Elephants in stone, lit from below, marking the threshold." |
| **05** | The Avenue | "Two hundred metres of trees, planted before the first drawing." |
| **06** | The Gazebo | "The road opens, the lake appears, and you're already here." |

Hard operational fact: **gate lighting comes on at 6:20** — the CTA advises arriving a
few minutes before, for a dusk drive.

Home-page teaser copy: *"Fountains, illuminated sculptures and a tree-lined drive that
slows you down on purpose. Arrival at Mandhara is a sequence, not a gate."*

---

## 13. Location and connectivity

Route: `/location` · Title: *"Location — Getting to Mandhara"*
Headline: **"Far enough for quiet. Close enough for everything."**

### Drive times

Source: [location.tsx:26-34](src/routes/location.tsx#L26-L34)

| Destination | Drive time | Note |
|---|---|---|
| **International Airport** | **55 min** | "Direct expressway run, no city crossing." |
| **Expressway Exit** | **12 min** | "A clean, signal-free approach to the gate." |
| **Schools** | **20 min** | "Three international curricula within a short drive." |
| **Hospitals** | **18 min** | "Multi-speciality care with 24/7 emergency." |
| **Heritage Town** | **35 min** | "Weekend markets, temples and old streets." |
| **Hill Viewpoint** | **40 min** | "Sunrise drives that are worth the alarm." |

The first four are duplicated as a hover showcase on the home page
([index.tsx:54-59](src/routes/index.tsx#L54-L59)) with slightly different phrasing —
"A clean expressway run — arrive from a flight without a second transfer."

### The map

An OpenStreetMap `<iframe>` with bounding box `77.30, 12.75 → 77.80, 13.15`
([location.tsx:80](src/routes/location.tsx#L80)). That box covers a region **south and
east of Bengaluru, Karnataka**. There is **no marker, no pin, no address and no place
name** anywhere on the site — the map is effectively a placeholder.

### Travel service
*"We'll send a car."* — site visits include pickup from the airport or the city, by
arrangement.

---

## 14. Gallery and media inventory

Route: `/gallery` · Title: *"Gallery — Mandhara in Light"*
Headline: **"Mandhara, frame by frame."**

Masonry columns (1 / 2 / 3 responsive), filter chips, click-to-lightbox.

### Filters
`All` · `Estate` · `Villas` · `Resort` · `Nature` · `Celebrations`

### The eleven items

| # | Label | Tag | Aspect |
|---|---|---|---|
| 1 | Golden hour over the estate | Estate | tall |
| 2 | Villa courtyard at dusk | Villas | standard |
| 3 | Infinity pool at sunset | Resort | tall |
| 4 | Sheen Lake at sunrise | Nature | standard |
| 5 | Wedding lawn | Celebrations | standard |
| 6 | Spa treatment room | Resort | tall |
| 7 | Walking trail | Nature | standard |
| 8 | Outdoor restaurant | Resort | standard |
| 9 | Drone view of the masterplan | Estate | tall |
| 10 | Interior, morning light | Villas | standard |
| 11 | The arrival gate | Estate | standard |

Filter distribution: Estate 3 · Resort 3 · Villas 2 · Nature 2 · Celebrations 1.

### Asset library

**28 JPG images** in [src/assets/](src/assets/), plus a Lovable-hosted logo PNG
(109 KB, `mandhara-logo.png`). Full list in [Appendix A](#appendix-a--asset-inventory).

**There are no videos on the site** — no `<video>` element and no `.mp4` asset exists,
despite the brief calling for drone video, autoplay clips and a 360° villa preview.

---

## 15. Contact, lead funnel and site-visit offer

Route: `/contact` · Title: *"Contact Mandhara — Book a Site Visit"*
Headline: **"Come and see it."**

### Contact details (canonical)

| Channel | Value | Where it appears |
|---|---|---|
| Phone | **+91 89503 60990** (`tel:+918950360990`) | Nav overlay, footer, contact page |
| WhatsApp | `https://wa.me/918950360990` | Footer; referenced in the contact form's success state |
| Email | **experience@mandhara.in** | Nav overlay, footer, contact page |
| Visiting hours | **Daily, 9:00 – 19:00** — "evening slots recommended" | Contact page |

### Conflicting placeholder contact details

The shared `CtaBand` component — which renders at the bottom of **every one of the
12 pages** — carries a different, clearly placeholder identity
([PageHero.tsx:142-149](src/components/site/PageHero.tsx#L142-L149)):

| Channel | Placeholder value |
|---|---|
| Phone | **+91 90000 00000** |
| Email | **visit@mandhara.in** |
| Hours | "Site office open daily, 9 am – 7 pm" |

This is the single highest-priority content defect on the site. See [§20](#20-data-integrity-register--conflicts-and-gaps).

### The site-visit offer

| Attribute | Value |
|---|---|
| Duration | **90 – 120 minutes** (described elsewhere as "about two hours") |
| Best hours | **7–9 am** for the lake · **5–7 pm** for the lawns |
| Recommended hour | "Five in the evening" — "that is the hour the lake turns gold" |
| Pickup | Airport or city car, on request |
| Character | "Private and unhurried" |
| Suggested itinerary | Sheen Lake and promenade at sunrise → NICQE and RIME valleys on foot → resort lunch, spa walk-through, club lawns |
| Amenity itinerary | "Spa at three, lake at five, dinner under the trees" |

### The form

Fields: **Name**, **Phone**, **Email** (all `required`), plus a free-text
*"What would you like to see?"*. On submit it calls `preventDefault()` and sets a local
`sent` boolean — **the data goes nowhere.** No API route, no email service, no CRM, no
validation library, no spam protection, no consent checkbox. Success state reads:
"Your request is noted. For an immediate response, WhatsApp us on +91 89503 60990."

### CTA inventory by page

| Page | CTA title | Button |
|---|---|---|
| `/` | "Plan your visit to Mandhara." | Book a site visit |
| `/about` | "Walk the story in person." | Arrange a visit |
| `/masterplan` | "See the plan on the ground." | Book a masterplan tour |
| `/villas` | "Choose your valley." | Request availability |
| `/resort` | "Stay a night before you decide." | Enquire about a stay |
| `/club` | "Hold a date at Mandhara." | Check availability |
| `/amenities` | "Experience them in one afternoon." | Plan the afternoon |
| `/arrival` | "Do the drive at dusk." | Book the drive |
| `/revenue` | "Ask for the numbers." | Request the model |
| `/gallery` | "Photographs undersell the light." | Book a visit |
| `/location` | "We'll send a car." | Arrange pickup |
| Nav (global) | — | Book a Visit |

All twelve route to `/contact`.

---

## 16. Information architecture — page by page

### Global navigation

`NAV_LINKS` in [Nav.tsx:7-19](src/components/site/Nav.tsx#L7-L19) — 11 entries, in order:

| # | Label | Route |
|---|---|---|
| 01 | The Story | `/about` |
| 02 | Masterplan | `/masterplan` |
| 03 | Villa Enclave | `/villas` |
| 04 | Resort | `/resort` |
| 05 | Club & Events | `/club` |
| 06 | Amenities | `/amenities` |
| 07 | Arrival | `/arrival` |
| 08 | Revenue Sharing | `/revenue` |
| 09 | Gallery | `/gallery` |
| 10 | Location | `/location` |
| 11 | Contact | `/contact` |

Desktop shows the **first five** inline; all eleven live in a full-screen overlay menu
that wipes open with a `clip-path` curtain and staggers each link in. The header is
transparent above 80 px of scroll and switches to a glass bar below it. The footer
renders all eleven in a two-column "Explore" list.

### `/` — Home (16 sections)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | Full-bleed aerial, parallax scale 1.05→1.3, logo scales in from 0.18, three split-text lines, three CTAs (Explore Mandhara / View Masterplan / Book Experience), animated scroll indicator |
| 2 | **Introduction** | "A hundred acres that behave like one continuous garden." + stat row **100+ Acres · 354 Villas · 3 Experiences** |
| 3 | **Master Vision** | Full-bleed lake, "Design that defers to the land." + **5 acres Sheen Lake · 18 Garden valleys · 8 km Promenade** |
| 4 | **Three Experiences** | "Live. Retreat. Celebrate." — three tilt cards |
| 5 | **Nature Philosophy** | Hover showcase, 4 principles (canopy, valleys, water, bloom calendar) |
| 6 | **Arrival** | "The moment the gate opens." → `/arrival` |
| 7 | **Masterplan preview** | "Five zones. One rhythm." — names all five zones |
| 8 | **Amenities marquee** | Infinite scrolling list of the 14 amenity names on forest green |
| 9 | **Investment** | Hover showcase, 3-step Own / Operate / Earn → `/revenue` |
| 10 | **Gallery strip** | Four images → `/gallery` |
| 11 | **Testimonials** | Three quotes |
| 12 | **Location** | Dark hover showcase, 4 proximity items, pulsing locus marker |
| 13 | **Closing** | Emblem + "Come see the light at five in the evening." |
| 14 | **CtaBand** | "Plan your visit to Mandhara." |

#### Testimonials (verbatim, unattributed)

| Quote | Attribution |
|---|---|
| "We came for a site visit and stayed for lunch by the lake. That decided it." | Villa owner, Enclave 2 |
| "Our wedding lawn faced the water at sunset. Guests still talk about the light." | Celebration at the Club |
| "The revenue model was explained in one page. No surprises since." | Investor, Resort pool |

### `/about` — The Story

Headline: **"A destination written by its own landscape."**
Philosophy block: "Luxury here is quiet, slow and outdoors." + stat row
**100+ Acres · 18 Garden valleys · 5 acres Lake**.

Five-chapter timeline ([about.tsx:31-71](src/routes/about.tsx#L31-L71)):

| Chapter | Title | Content |
|---|---|---|
| 01 — Before | **The Land** | "A hundred acres of undulating ground, a natural depression that became Sheen Lake, and a canopy nobody wanted to lose." |
| 02 — Intent | **The Idea** | "Not a colony. A destination — where residents, guests and celebrations share one landscape without crowding each other." |
| 03 — Drawing | **The Plan** | "Five zones drawn along the contours, roads bent around old trees, water returned to the lake." |
| 04 — Making | **The Build** | "Low-rise, stone, timber and lime. Materials that weather instead of fade." |
| 05 — Today | **The Life** | "Mornings on the trail, afternoons at the spa, evenings on the lawn. The estate has a daily rhythm now." |

> Chapter 05 asserts the estate is **operational today**. No completion date, phase or
> handover milestone is given anywhere.

### Remaining routes

| Route | Covered in |
|---|---|
| `/masterplan` | [§6](#6-the-masterplan--five-named-zones) |
| `/villas` | [§7](#7-product-1--villa-enclave) |
| `/resort` | [§8](#8-product-2--the-resort) |
| `/club` | [§9](#9-product-3--club--events) |
| `/amenities` | [§10](#10-amenities-catalogue--all-fourteen) |
| `/revenue` | [§11](#11-commercial-model--revenue-sharing) |
| `/arrival` | [§12](#12-the-arrival-experience) |
| `/location` | [§13](#13-location-and-connectivity) |
| `/gallery` | [§14](#14-gallery-and-media-inventory) |
| `/contact` | [§15](#15-contact-lead-funnel-and-site-visit-offer) |

### Error states

- **404** — "This path leads elsewhere" / "The page you're looking for isn't part of
  Mandhara yet." + Return home.
- **Error boundary** — "This page didn't load" + Try again / Go home; reports to
  Lovable's error pipeline.

---

## 17. Design system

### Colour tokens

Defined as `oklch` custom properties in [styles.css](src/styles.css).

| Token | Role | Value | Brief's hex |
|---|---|---|---|
| `--background` | Warm Ivory | `oklch(0.966 0.008 84)` | `#F8F5F0` |
| `--foreground` / `--ink` | Charcoal | `oklch(0.294 0 0)` | `#2B2B2B` |
| `--primary` | Burnt Terracotta | `oklch(0.507 0.132 47)` | `#A64B1A` |
| `--secondary` / `--color-forest` | Forest Green | `oklch(0.331 0.045 159)` | `#254534` |
| `--accent` / `--color-gold` | Antique Gold | `oklch(0.673 0.093 85)` | `#B89146` |
| `--sand` | Sand | `oklch(0.915 0.018 78)` | — |
| `--night` | Night | `oklch(0.17 0.012 60)` | — |

A `.dark` palette exists but no theme toggle is wired up.

### Typography

| Role | Family | Weight |
|---|---|---|
| Display / headings | **Cormorant Garamond** (fallback Georgia, serif) | 300, `line-height: 0.95`, `letter-spacing: -0.02em` |
| Body / UI | **Jost** (fallback system sans) | 300, `letter-spacing: 0.01em` |
| Eyebrow | Jost | `0.7rem`, `letter-spacing: 0.4em`, uppercase, terracotta |

### Radii and shadows

Radius scale from `--radius: 1rem` up to `--radius-4xl` (= 1rem + 44px ≈ 3.75rem) —
rounded corners everywhere, per the brief. Two shadow tokens: `--shadow-soft`
(30/80 px, ink-based) and `--shadow-lift` (40/120 px, primary-based).

### Custom utilities

`eyebrow` · `display` · `glass` (22 px blur + 140% saturate + gold hairline border) ·
`soft-shadow` · `noise` (inline SVG fractal-noise overlay) · `link-underline`
(right-to-left scaleX wipe, 0.55 s) · `tilt-card`.

### Motion language

Signature easing is `cubic-bezier(0.16, 1, 0.3, 1)` used almost universally. Image hover
zooms run **1.4–1.6 s**; colour transitions **0.5 s**; section reveals **0.8–1.2 s**.

### Component primitives

[primitives.tsx](src/components/site/primitives.tsx)

| Component | Purpose |
|---|---|
| `Reveal` | Scroll-triggered fade + rise wrapper |
| `SplitText` | Per-word/letter staggered heading reveal |
| `MaskedImage` | Clip-path mask reveal with parallax offset |
| `Magnetic` | Cursor-attracted button wrapper |
| `TiltCard` | 3D pointer tilt |
| `Eyebrow`, `Section` | Layout/typography helpers |

[Other site components](src/components/site/)

| Component | Purpose |
|---|---|
| `Loader` | 5.2 s entry: 260 gold canvas particles converge into the mark, an SVG circle draws itself over 2.8 s, dawn gradient floods at 3.4 s, three lines at 1.5/2.7/3.9 s, dissolve at 5.2 s |
| `Emblem` | Self-drawing golden SVG roundel (r=92 / r=80, dash 580) |
| `Atmosphere` | Canvas dust/leaf particle field with mouse parallax, capped density, **disabled under `prefers-reduced-motion`** |
| `Cursor` | Custom cursor |
| `SmoothScroll` | Lenis, dynamically imported, reset on every route change |
| `Nav` / `Footer` | Global chrome |
| `PageHero` | Shared cinematic page opener (86 vh, parallax, eyebrow + split title + intro) |
| `CtaBand` | Shared closing CTA with three key/value points and contact block |
| `HoverShowcase` / `ShowcasePanel` | The site's signature pattern: a hover/focus-synced list beside a large image panel, used on 6 pages |

`HoverShowcase` is the most reused content component. Its item shape:

```ts
type ShowcaseItem = {
  id: string;
  title: string;
  meta: string;                       // small label, e.g. "3 BHK + study" or "55 min"
  text?: string;
  image: string;
  details?: [string, string][];       // spec rows, e.g. ["Plot", "2,400 sq ft"]
};
```

---

## 18. Technical architecture

| Layer | Choice |
|---|---|
| Framework | **TanStack Start** + **TanStack Router** (file-based routes, generated [routeTree.gen.ts](src/routeTree.gen.ts)) |
| UI | **React 19.2** |
| Build | **Vite 8** via `@lovable.dev/vite-tanstack-config` |
| Server | **Nitro 3 beta**, Cloudflare as default target (`.wrangler` present) |
| SSR entry | [src/server.ts](src/server.ts) — wraps TanStack's server entry to catch h3-swallowed 500s and render a readable error page |
| Styling | **Tailwind CSS 4.2** (CSS-first `@theme`, `@utility`) |
| Animation | **Framer Motion 12.43** |
| Smooth scroll | **Lenis 1.3.25** (dynamic import) |
| Data layer | **TanStack Query 5** (installed, currently unused for content) |
| Component library | **shadcn/ui** — 47 Radix-based components in [src/components/ui/](src/components/ui/) |
| Forms | react-hook-form + zod + @hookform/resolvers (installed, **not used** by the contact form) |
| Package manager | **Bun** (`bun.lock`, `bunfig.toml`) |
| Platform | **Lovable** — commits on `main` sync back to the editor; do not rewrite published history ([AGENTS.md](AGENTS.md)) |

### Scripts

| Command | Action |
|---|---|
| `bun dev` / `npm run dev` | Vite dev server |
| `build` / `build:dev` | Production / development-mode build |
| `preview` | Preview the build |
| `lint` | ESLint 9 (flat config, typescript-eslint, react-hooks, prettier) |
| `format` | Prettier |

### Dependency observations

- **GSAP 3.15 is installed but never imported** — zero usages across `src/`. All motion
  is Framer Motion, plain CSS or raw canvas. The brief specified GSAP throughout.
- **Three.js is not installed at all**, despite the brief asking for WebGL/Three.js
  particles. The particle work in `Loader` and `Atmosphere` is 2D canvas.
- **Recharts** is pulled in only by the unused shadcn `ui/chart.tsx`; the revenue chart
  is hand-built with Framer Motion divs.
- Roughly 40 of the 47 shadcn components are unused by any route.

### SEO

Per-route `head()` with `<title>`, description, `og:title`, `og:description`, `og:type`
and `twitter:card` — all 12 routes covered. [public/robots.txt](public/robots.txt)
explicitly allows Googlebot, Bingbot, Twitterbot, facebookexternalhit and `*`.
**No `og:image`, no canonical URLs, no `LocalBusiness`/`Residence` JSON-LD, no sitemap.**

### Accessibility notes

Good: masterplan keyboard navigation with roving tabindex and ARIA roles; hover
showcases are focus-driven as well as hover-driven; `Atmosphere` honours
`prefers-reduced-motion`; images carry alt text; decorative images are `aria-hidden`.

Gaps: the loader blocks content for 5.2 s with no skip; `prefers-reduced-motion` is not
honoured by the loader, page transitions or parallax; the nav hamburger keeps
`aria-label="Open menu"` when open; the gallery lightbox has no focus trap, no close
button and no Escape handler; the range-input day/night slider has no textual
alternative.

---

## 19. Content ownership map — where every fact lives

To change a number, edit these files. There is no other source.

| Content domain | File | Structure |
|---|---|---|
| Estate stat rows, testimonials, home showcases | [src/routes/index.tsx](src/routes/index.tsx) | `NATURE`, `REVENUE`, `PROXIMITY`, `EXPERIENCES` consts + inline stat arrays |
| Brand story timeline | [src/routes/about.tsx](src/routes/about.tsx) | `TIMELINE: ShowcaseItem[]` |
| Zones, hotspots, zone features | [src/routes/masterplan.tsx](src/routes/masterplan.tsx) | `ZONES: Zone[]` |
| Villa types, plot data, construction | [src/routes/villas.tsx](src/routes/villas.tsx) | `TYPES`, `CONSTRUCTION` |
| Suites, resort facilities | [src/routes/resort.tsx](src/routes/resort.tsx) | `SUITES`, `FACILITIES` |
| Venues, capacities, seasonality | [src/routes/club.tsx](src/routes/club.tsx) | `VENUES`, `CALENDAR` |
| 14 amenities + stats | [src/routes/amenities.tsx](src/routes/amenities.tsx) | `AMENITIES: Amenity[]` |
| Revenue steps + occupancy | [src/routes/revenue.tsx](src/routes/revenue.tsx) | `STEPS`, `BARS` |
| Arrival beats | [src/routes/arrival.tsx](src/routes/arrival.tsx) | `BEATS` |
| Drive times + map bbox | [src/routes/location.tsx](src/routes/location.tsx) | `NEARBY` |
| Gallery items + filters | [src/routes/gallery.tsx](src/routes/gallery.tsx) | `ITEMS`, `FILTERS` |
| Canonical phone/email/hours | [src/routes/contact.tsx](src/routes/contact.tsx), [Nav.tsx](src/components/site/Nav.tsx), [Footer.tsx](src/components/site/Footer.tsx) | inline JSX |
| **Placeholder phone/email** | [PageHero.tsx](src/components/site/PageHero.tsx) | `CtaBand` default block |
| Default CTA points | [PageHero.tsx](src/components/site/PageHero.tsx) | `points` default param |
| Loader lines + timing | [Loader.tsx](src/components/site/Loader.tsx) | `LINES` + `setTimeout` table |
| Navigation labels | [Nav.tsx](src/components/site/Nav.tsx) | `NAV_LINKS` |
| Image registry | [src/lib/images.ts](src/lib/images.ts) | `img` object, 28 entries |

---

## 20. Data integrity register — conflicts and gaps

Ordered by severity. Each is a real defect in the shipped content.

### P0 — must fix before any traffic

| # | Issue | Detail | Fix |
|---|---|---|---|
| 1 | **Placeholder phone number on all 12 pages** | `CtaBand` defaults to **+91 90000 00000** and **visit@mandhara.in**, contradicting the real +91 89503 60990 / experience@mandhara.in in the nav, footer and contact page. Also states hours 9 am–7 pm vs the contact page's 9:00–19:00 (equivalent, but stated twice). | Replace the defaults in [PageHero.tsx:142-149](src/components/site/PageHero.tsx#L142-L149); better, hoist contact details into one `src/lib/contact.ts` and import everywhere. |
| 2 | **The contact form discards every lead** | Submit handler only sets local state. Three required fields and a message are captured and thrown away. | Wire to an email service / CRM via a TanStack Start server function; add validation (zod is already installed) and a consent checkbox. |
| 3 | **No location, anywhere** | No address, city, state, pin code, district or map marker. The map iframe is a generic bbox around south-east Bengaluru. A buyer cannot tell what state the project is in. | Add the real address + a pinned map. |
| 4 | **No regulatory disclosure** | No RERA registration number, no promoter/developer name, no approvals, no disclaimer, no privacy policy, no terms. Mandatory for real-estate marketing in India. | Add a legal footer block and a RERA line on every inventory page. |

### P1 — factual contradictions

| # | Issue | Conflicting values | Location |
|---|---|---|---|
| 5 | **Sheen Lake area** | **5 acres** (home, about, masterplan ×2) vs **11 acres** (amenities) | [amenities.tsx:69](src/routes/amenities.tsx#L69) is the outlier |
| 6 | **Event ground capacity vs record** | Capacity **2,500** but the same card claims a **4,000-person** Garba night; the club calendar repeats 4,000 | [club.tsx:44-47](src/routes/club.tsx#L44-L47) |
| 7 | **Revenue model step count** | **5 steps** on `/revenue` (Own, Enrol, Operate, Earn, Use) vs **3 steps** on the home page (Own, Operate, Earn) | [index.tsx:50-54](src/routes/index.tsx#L50-L54) |
| 8 | **Lawn duplication** | "Lakeside Lawn — 600 guests" (club) and "Outdoor Lawn — 600 guests" (amenities) — same venue or two? | club vs amenities |
| 9 | **Banquet duplication** | Grand Banquet is described once as a venue (900 guests, 2 halls) and again as an amenity (900 guests, 9 m) with no cross-reference | club vs amenities |
| 10 | **Suite categories** | Two suites described in detail; the CTA names four ("Presidential, island-facing, pool and junior") | [resort.tsx:181](src/routes/resort.tsx#L181) |
| 11 | **Promenade vs trail** | **8 km** promenade and a **4 km** trail loop — same path? overlapping? | index/resort vs amenities |
| 12 | **Orphan facts** | "**5 islands**" appears exactly once and is never explained; the "**amphitheatre**" is named only in the October calendar entry and appears in no venue or masterplan list | [masterplan.tsx:441](src/routes/masterplan.tsx#L441), [club.tsx:101](src/routes/club.tsx#L101) |

### P2 — incompleteness

| # | Gap |
|---|---|
| 13 | **354 villas are never distributed** — no unit count per zone (NICQE vs RIME) and none per villa type. Three plans stand in for 354 homes. |
| 14 | **No pricing at all** — no price, price band, per-sq-ft rate, booking amount or payment plan on any page. |
| 15 | **No timeline** — no launch date, phase, construction status, possession or handover date. `/about` chapter 05 implies the estate is already operational; nothing confirms it. |
| 16 | **No maintenance/CAM data** — no association fee, clubhouse membership charge or upkeep cost for villa owners. |
| 17 | **Revenue model is unquantified** — no share percentage, management fee, minimum term, ADR/RevPAR assumption or worked yield example behind the 42→94% occupancy curve. |
| 18 | **Testimonials are anonymous** — no names, no photographs, no dates, no verifiable events. |
| 19 | **No developer identity** — no company, no leadership, no track record, no architect or landscape-architect credit, no hospitality-operator brand. |
| 20 | **No floor plans** — the brief called for animated floorplans and a 360° preview; the site ships one generic `plan-drawing.jpg`. |

### P3 — media and polish

| # | Issue |
|---|---|
| 21 | **Heavy image reuse.** `garden.jpg` stands in for Sports, Garden, Walking Trail **and** Meditation; `lake.jpg` for both Sheen Lake and God's Garden; `club.jpg` for both Outdoor Lawn and Banquet; `villa.jpg` for both the Junior Suite and the Club amenity. Nine of the fourteen amenity panels reuse an image from another panel. |
| 22 | **Zero video.** No drone film, no hero video, no autoplay clips — all specified in the brief. |
| 23 | **Gallery is thin** — 11 items across 6 filters; "Celebrations" has a single image. |
| 24 | **Masterplan hotspots are hardcoded percentages** against a photographic image; any replacement of `masterplan.jpg` silently misaligns all five pins. |
| 25 | **`og:image` missing on every route** — link previews will render blank. |

---

## 21. Launch blockers — content the site does not yet have

A checklist of everything required before this can operate as a real sales site.

**Legal and regulatory**
- [ ] RERA registration number + QR, per applicable state authority
- [ ] Promoter / developer legal entity name and registered address
- [ ] Approvals, land-title and encumbrance disclosure
- [ ] Disclaimer on artistic impressions ("images are indicative")
- [ ] Privacy policy + terms of use + cookie notice
- [ ] Explicit consent checkbox on the enquiry form

**Commercial**
- [ ] Price or price band per villa type
- [ ] Booking amount and payment schedule
- [ ] Maintenance / CAM / clubhouse charges
- [ ] Revenue-share percentage, management fee, minimum enrolment term
- [ ] Term-sheet download (gated)

**Inventory**
- [ ] Unit counts per zone and per villa type (totalling 354)
- [ ] Availability status per phase
- [ ] Floor plans per type — plan, elevation, section
- [ ] Specification sheet — flooring, fittings, kitchen, sanitary, electrical

**Location**
- [ ] Full address, district, state, pin code
- [ ] Pinned interactive map + directions link
- [ ] Named landmarks instead of generic "Schools" / "Hospitals"

**Trust**
- [ ] Developer profile and delivered-project track record
- [ ] Architect, landscape architect and hospitality-operator credits
- [ ] Attributed testimonials with names and dates
- [ ] Press coverage or awards

**Operations**
- [ ] Lead capture wired to a CRM with source attribution
- [ ] Analytics + conversion tracking
- [ ] Brochure PDF download
- [ ] Resort booking link or enquiry routing

---

## 22. Brief vs. build — delivered and not delivered

Measured against [README.md](README.md).

### Delivered

Loader sequence with particles, self-drawing emblem, dawn transition and the three
lines · custom cursor · Lenis smooth scroll · magnetic buttons · 3D tilt cards ·
split-text reveals · masked image reveals · parallax throughout · glass morphing ·
noise texture · curtain-wipe nav overlay · canvas particle atmosphere with leaves ·
all 12 specified pages · the five named zones with an interactive, keyboard-navigable
map · 354 villas, 2 clubhouses, garden valleys · resort suites and facilities ·
club venues and capacities · the amenities scroll journey with all fourteen ·
the arrival drive-through with a moving car · revenue model with animated chart ·
Pinterest-style filterable gallery with lightbox · location page · contact page with
the brief's WhatsApp number · animated footer.

### Not delivered

| Brief item | Status |
|---|---|
| **GSAP** animations | Installed but never imported — Framer Motion used instead |
| **Three.js / WebGL** | Not installed; particles are 2D canvas |
| **Drone video hero**, ambient sound, autoplay clips | No video or audio anywhere |
| **Water ripple following cursor** | Not implemented |
| **Mega menu** with dropdowns | Replaced by a full-screen overlay |
| **Interactive masterplan zoom / pan** | Hover + click + keyboard only; no zoom or pan |
| **Animated roads, moving trees, flying birds, sun movement, fog, mist, light rays** | Not implemented |
| **Animated floorplans, 360° preview** | Not implemented; one static plan image |
| **Before/after day–night slider** | ✅ delivered on `/villas` (the one comparison feature that shipped) |
| **Animated event calendar** | Static four-card grid |
| **Per-amenity unique animation identity** | All fourteen share one panel treatment, differentiated only by tint and leaf density |
| **Gate opening, fountain animation, illuminated sculptures** | Static image + scrolling car icon |
| **Interactive map with animated route** | Static OSM iframe |
| **Floating contact button** | Not implemented |
| **Curtain page transitions between routes** | Only the nav overlay uses a curtain |
| **Interactive revenue infographic** | Static bar chart |

---

## 23. Appendices

### Appendix A — Asset inventory

28 JPGs in [src/assets/](src/assets/), registered in [src/lib/images.ts](src/lib/images.ts):

| Key | File | Used by |
|---|---|---|
| `hero` | hero-aerial.jpg | Home hero, Location hero, Gallery |
| `masterplan` | masterplan.jpg | Masterplan hero + map + CTA, Home, Gallery |
| `planDrawing` | plan-drawing.jpg | Villas (plot logic), About (The Plan) |
| `villa` | villa.jpg | Villas hero, Resort (Junior Suite), Amenities (Club), Gallery |
| `villaValley` | villa-valley.jpg | Valley Villa, NICQE, Construction (solar) |
| `villaGarden` | villa-garden.jpg | Garden Villa, RIME, Construction (ventilation) |
| `villaLake` | villa-lake.jpg | Lake Villa, Home (Own), Villas CTA |
| `facade` | facade.jpg | Construction (material) |
| `build` | build.jpg | Construction (overhangs), About (The Build), Home (hospitals) |
| `resort` | resort.jpg | Resort hero, Home (experience 02 + Earn), Amenities (pool), Gallery |
| `suite` | suite.jpg | Presidential Suite, Revenue hero, Home (Operate), Amenities (Wellness), Gallery |
| `spa` | spa.jpg | Resort spa, Amenities (Spa), Home strip, Gallery |
| `pool` | pool.jpg | Resort pool, GEMINI |
| `gym` | gym.jpg | Resort gym |
| `bar` | bar.jpg | Library Bar |
| `dining` | dining.jpg | Resort restaurant, Club outdoor restaurant, Amenities (Restaurant), Gallery |
| `club` | club.jpg | Club hero, Home (experience 03), Amenities (Outdoor Lawn **and** Banquet), Gallery |
| `clubhouse` | clubhouse.jpg | Pavilion Club, Club calendar (spring), Home (schools) |
| `banquet` | banquet.jpg | Grand Banquet, ORION, Club calendar (monsoon), Club CTA |
| `eventGround` | event-ground.jpg | Event Ground, Club calendar (festival) |
| `lawn` | lawn.jpg | Lakeside Lawn, Club calendar (winter), wedding-stories block |
| `lake` | lake.jpg | Home master vision, About hero, Amenities (Sheen Lake **and** God's Garden), Construction (water), Gallery |
| `promenade` | promenade.jpg | SHEEN LAKE, Resort trails, About (The Life) |
| `canopy` | canopy.jpg | Home intro + nature, About philosophy + The Land |
| `garden` | garden.jpg | Villas day/night, Amenities (Sports, Garden, Walking Trail, Meditation), Gallery |
| `blooms` | blooms.jpg | Home nature (bloom calendar) |
| `arrival` | arrival.jpg | Arrival page, Home arrival, Gallery |
| `expressway` | expressway.jpg | Home proximity (airport) |

Plus `mandhara-logo.png` — Lovable-hosted, 109,042 bytes, asset id
`414bdb3b-5e1d-4b8a-bf54-b3e12e5b7f4f`.

### Appendix B — Route and metadata table

| Route | `<title>` | Description |
|---|---|---|
| `/` | Mandhara — Three Experiences. One Destination. | "Mandhara is a 100-acre luxury destination: 354 villas, a wellness resort and a celebration club, woven around Sheen Lake, gardens and golden light." |
| `/about` | The Story of Mandhara — Land, Light and Hospitality | "How Mandhara began: a hundred acres of water and canopy shaped into villas, a resort and a celebration club." |
| `/masterplan` | Mandhara Masterplan — Five Zones, One Landscape | "Explore the Mandhara masterplan: NICQE, RIME, GEMINI, ORION and Sheen Lake across a hundred landscaped acres." |
| `/villas` | Villa Enclave — 354 Villas at Mandhara | "354 private villas, two clubhouses, garden valleys and tree-lined roads." |
| `/resort` | The Resort at Mandhara — Suites, Spa and Lakeside Wellness | "Presidential and junior suites, spa, pools, gym and lakeside dining." |
| `/club` | Club & Events at Mandhara — A Wedding Destination | "Banquet halls, an open event ground and lakeside lawns built for weddings." |
| `/amenities` | Amenities at Mandhara — Fourteen Worlds, One Journey | Lists all fourteen amenities. |
| `/arrival` | The Arrival Experience at Mandhara | "Drive through the Mandhara arrival sequence." |
| `/revenue` | Revenue Sharing at Mandhara — Own, Operate, Earn | "How the Mandhara revenue-sharing model works." |
| `/gallery` | Gallery — Mandhara in Light | "Photography from across Mandhara." |
| `/location` | Location — Getting to Mandhara | "Travel times to Mandhara from the airport, expressway, schools, hospitals." |
| `/contact` | Contact Mandhara — Book a Site Visit | "Book a private site visit. Call or WhatsApp +91 89503 60990." |

### Appendix C — Glossary

| Term | Meaning |
|---|---|
| **Mandhara** | The destination brand; the whole 100+ acre estate |
| **Sheen Lake** | The central water body; also masterplan zone 5 |
| **NICQE** | Villa Enclave North — zone 1 |
| **RIME** | Villa Enclave South — zone 2 |
| **GEMINI** | The Resort — zone 3 |
| **ORION** | Club & Events — zone 4 |
| **Garden valley** | A retained natural undulation kept as landscape rather than levelled into plots; 18 in total |
| **Clubhouse One / Two** | The two residents' clubhouses, in NICQE and RIME |
| **Pavilion Club** | The events-side members' club in ORION — distinct from the two residential clubhouses |
| **God's Garden** | A sacred grove and shrine; amenity 14 |
| **Promenade** | The 8 km lakeside walking edge |
| **Hospitality pool** | The managed rental pool a villa owner may enrol into |
| **Owner nights** | Reserved annual nights for an enrolled villa's owner, including peak season |

### Appendix D — Numeric index

Every property figure asserted on the site, alphabetically by unit.

**Area** — 100+ acres (estate) · 5 acres / 11 acres (lake, conflicting) · 1.2 acres (kids
area) · 1 acre (God's Garden, implied) · 10,000 sq ft × 2 (banquet halls) · 20,000 sq ft
(total banquet) · 2,400 / 3,600 / 5,400 sq ft (plots) · 2,850 / 4,100 / 6,200 sq ft
(built-up)

**Distance** — 8 km (promenade) · 4 km (trail loop) · 200 m (arrival avenue) · 50 m
(highway-to-silence) · 30 m (pool) · 9 m (banquet ceiling) · 3 m (plot green edge)

**Counts** — 354 villas · 18 garden valleys · 14 amenities · 5 zones · 5 venues ·
5 courts · 5 islands · 2 clubhouses · 2 banquet halls · 2 cars per plot · 6 spa rooms ·
70+ native species · 120 resort keys · 1 planner · 1 oculus

**Capacity** — 2,500 (event ground) · 4,000 (Garba record) · 900 (banquet) · 600
(lawn) · 180 (outdoor restaurant / restaurant covers)

**Time** — 55 / 40 / 35 / 20 / 18 / 12 min (drive times) · 90–120 min (site visit) ·
9:00–19:00 (visiting hours) · 5 am (gym) · 6:20 (gate lighting) · 7–9 am, 5–7 pm (best
hours) · 24/7 (wellness) · 9 months (outdoor dining) · Nov–Feb / Mar–May / Jun–Sep / Oct
(event seasons) · Oct–Feb (best stay months)

**Commercial** — 42 / 58 / 71 / 83 / 94 % (illustrative occupancy, years 1–5) ·
quarterly (settlement cadence)

---

*Generated from source. Every figure in this document is traceable to a file and line in
this repository; nothing has been inferred or supplied from outside the codebase.*
