# Mandhara — open questions for the client

Everything on this list was **removed from or left out of the live site** because
the brochure does not support it. None of it has been replaced with a guess. Each
item names the file it affects so it can be put back once a real answer exists.

Canonical figures live in [`src/lib/project.ts`](src/lib/project.ts) — add
confirmed values there rather than typing them into a page.

---

## 1. Blocking before launch

| # | Question | Why it blocks | Where it lands |
|---|---|---|---|
| 1.1 | **RERA registration number, registered project name and approvals wording.** | Indian real-estate marketing sites must carry these. The footer currently shows "To be confirmed" placeholders. | `src/components/site/Footer.tsx` |
| 1.2 | **Is the canonical brand "Mandhara", "Mandhara by Lothal", or "Mandhara by Lothal Greens"?** The brochure back cover says one thing and the About section another. | Affects every page title, meta tag and the location copy. | all `head()` blocks |
| 1.3 | **Where should contact-form enquiries go?** Set `CONTACT_WEBHOOK_URL` in the deployment environment to any JSON-POST endpoint (Formspree, CRM webhook, serverless mailer). | Until it is set the form fails loudly and shows the phone/email fallback. It no longer reports a false success — but no lead is captured either. | `src/lib/enquiry.ts` |
| 1.4 | **Is `experience@mandhara.in` the right address?** The brochure prints `www.mandhara.com`. | One identity is now used site-wide; if the domain is wrong it is wrong in eleven places at once. | `src/lib/project.ts` → `CONTACT` |

## 2. Figures removed as unsourced

Every one of these was on the live site as a confident number. None appears in
the brochure.

| Claim that was live | Status | File |
|---|---|---|
| "100+ acres" total estate area | Removed — total acreage is stated nowhere | `index.tsx`, `about.tsx`, `gallery.tsx` meta |
| "0 mature trees felled" | **Removed as a priority.** An unverifiable environmental zero is a legal and reputational risk if untrue. | `index.tsx` |
| Grand Banquet "900 guests", "2 pillarless halls", "9 m ceilings" | Removed. Brochure gives one 10,000 sq.ft facility with a pre-function lounge and bridal suite, and no capacity. | `club.tsx`, `amenities.tsx` |
| Event Ground "2,500 guests" | Removed — described qualitatively only | `club.tsx` |
| Lakeside Lawn / Outdoor Lawn "600 guests" | Removed, **and the duplicate venue resolved**: these were the same thing under two names. Now one "Celebration Lawns". Confirm whether there are in fact two distinct lawns. | `club.tsx`, `amenities.tsx` |
| Outdoor Restaurant "180 guests" | Removed | `club.tsx` |
| Sports "5 courts: tennis, badminton, half-court, cricket net, floodlit" | Removed — the brochure's Sports Area copy is purely descriptive. **Need a real facility list.** | `amenities.tsx` |
| "70+ native species" | Removed | `amenities.tsx` |
| Spa "6 treatment rooms", pool "30 m", restaurant "180 covers", kids area "1.2 acres" | Removed | `amenities.tsx`, `resort.tsx` |
| "4,000-person Garba nights" | Removed | `club.tsx` |
| Site office hours "daily 9 am – 7 pm" | Removed | `contact.tsx` |
| Airport 55 min, expressway 12 min, schools 20 min, hospitals 18 min, heritage town 35 min, hill viewpoint 40 min | Removed — these were written for a **Bengaluru** location. **Real airport/hospital/school distances for the Lothal site are still needed.** | `location.tsx`, `index.tsx` |

## 3. Content removed pending a source

| # | What | Detail |
|---|---|---|
| 3.1 | **Construction philosophy** — load-bearing stone, lime plaster, deep overhangs, cross-ventilation, on-plot rain harvesting, solar/EV-ready roofs. | Not in the brochure. If it comes from another real document, say which and it goes back in. If it was invented, it stays out. `villas.tsx` |
| 3.2 | **Plot & layout logic** — 3 m green setbacks, two cars on plot, rear service lane, "no two homes facing each other". | Same as above. `villas.tsx` |
| 3.3 | **Resort suite room descriptions** — plunge pools, soaking tubs, bedroom counts, wraparound decks. | Invented at room level. The three categories and three outlooks the brochure names are published; the room detail is not. `resort.tsx` |
| 3.4 | **Testimonials.** | Three anonymous quotes ("Villa owner, Enclave 2") were removed — unattributed quotes read as fabricated social proof. Need real, named, permissioned quotes. `index.tsx` |
| 3.5 | **Villa room schedules.** | Room-by-room tables per configuration are referenced in the Website Content Brief §6 but that document is not in this repo. Supply it and they go into `villas.tsx`. |

## 4. Contradictions in the brochure itself

| # | Contradiction | What the site does |
|---|---|---|
| 4.1 | Garden valleys: the headline says **"15 Valleys"** and names fifteen; the body copy says **"eighteen"**. | Publishes **15** — the number the brochure can actually name. Please confirm which is right. |
| 4.2 | Resort suites: the text names Presidential / Standard / Junior; the p.14 key-map separately shows Island-Facing / Swimming Pool / Lawn-Facing. | Publishes both, as categories and outlooks, without merging them into an invented four-item list. Confirm the real taxonomy. |
| 4.3 | The 348-row Area Sheet does not tag which plot belongs to which zone or villa type. | Plot-to-type mapping cannot be derived from the brochure. **Needed before the Area Sheet can be made filterable.** |
| 4.4 | The 800 sq.yd villa reportedly also has 2 BHK and 3 BHK units not shown in the brochure. | Not published. Need floor plans. |

## 5. Production / assets

| # | Item |
|---|---|
| 5.1 | **Photography.** `garden.jpg` currently stands in for four different amenities, and the imagery throughout is placeholder stock, not the brochure's resort-editorial photography. Needs a real shoot or licensed stock before launch. |
| 5.2 | **Video.** The brief calls for cinematic drone footage on the hero; there is none. |
| 5.3 | **Masterplan aerial.** The zone pins on `/masterplan` are positioned from the brochure's *described* layout (Sheen Lake north-west, Gemini centre-west, Nicqe and Orion east, Rime south). They have **not** been checked against the real aerial plate — please verify against brochure p.2. |
| 5.4 | **Pricing, payment terms and possession dates.** Not published anywhere. Confirm whether they should be. |
