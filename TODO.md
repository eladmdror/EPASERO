# Outstanding — blocked on assets, content, or credentials

The redesign in `Epasero Contracting Website Updates.docx` is implemented. These items
cannot be completed until the listed input is supplied.

## Missing assets

The brief names four images that were never attached. Each currently falls back to an
existing image; swapping them is a one-line `src` change in the file listed.

| Named in brief | Used by | Currently showing |
|---|---|---|
| `Hero Image` | `components/hero/Hero.tsx` | `/hero-bg.webp` |
| `Portfolio Hero Image` | `app/portfolio/page.tsx` | `/hero-portfolio-bg.webp` |
| `Contact Us Image` | `app/contact/page.tsx` | `/hero-portfolio-bg.webp` |
| `Blogs Hero Image` | — | Journal page not built (deferred) |
| "3 images from the catalogue" | `components/lead-capture/LeadCaptureModal.tsx` | one portfolio image |

## Missing content

- **`Interior Design Guide` (PDF)** — the asset the lead-capture popup gives away. The
  download is wired to `/guides/interior-design-guide-2026.pdf`; drop the file there and
  it works. **Until then the popup collects a lead and then 404s on the download.**
- **`Updated List of Projects`** — which portfolio projects to add and remove. All 32
  existing projects are still live in `data/data.ts`.

- **Per-project copy in `data/data.ts`.** An audit of the 32 entries found fields that
  were never rewritten from the template. These are **hidden on the site rather than
  published**, because showing them would put false statements on a live business site:

  | Field | State | Where |
  |---|---|---|
  | `features` | **All 32 projects share one identical list.** The Veterinary Clinic and the Villa Landscape both claim "4 private bedrooms with large windows and natural light." | Hidden by `lib/content.ts` |
  | `price` | **All 32 are `$8,500,000`.** | Never rendered — `PropertyHero` |
  | `amenitiesColumns` | 14 distinct blocks across 32 projects, so most are shared between unrelated projects; one still quotes "Maintenance fee: $6,500 MXN" — Mexican pesos, on a Dubai site. | Never rendered — `PropertyDetails` |

  **Decided by Elad, 2026-07-29:**

  - **`price` — never show it.** Settled, not pending. It stays out of the UI permanently,
    so the identical `$8,500,000` across all 32 entries no longer matters. Do not add a
    price display to `PropertyHero` or `PropertyDetails` without asking him again.
  - **`features` — yes, show them.** The UI is built and live (the "Project Highlights"
    block in `PropertyDetails`). It is waiting only on copy: `lib/content.ts` hides any
    list two or more projects share, so writing genuine features for one project makes them
    appear on that project's page immediately, with no code change. The rest stay hidden
    until theirs are written.
  - **`amenitiesColumns`** — still undecided and still unrendered. Needs the MXN reference
    removed and the blocks rewritten per project before it is worth a decision.
- ~~**`Frequently Asked Questions`**~~ — **received 2026-07-29** ("0. FAQs.docx"). All 54
  answers across 5 service lines are live in `data/faqs.ts`, generated verbatim from the
  document. They quote real AED figures and make regulatory claims about Dubai Municipality
  and NOC approvals, so treat them as Epasero's authored copy — do not paraphrase or
  "improve" them. Changes must come from Epasero.

  Note `/faqs` is now **indexable**. §7's "hidden" was read as navigation placement, not
  search: these answers target exactly what people search before hiring a Dubai fit-out
  contractor, and are the strongest SEO asset on the site. Re-add `robots: { index: false }`
  in `app/faqs/page.tsx` to reverse.
- **`Epasero_Website_Layout_Mockup.html` / `epasero-article.html`** — referenced in the
  brief as `file:///C:/Users/Lenovo/Downloads/...`, a path on someone else's Windows
  machine. Not available.

## Missing credentials

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` + `CONTACT_FROM` — **the contact form cannot send email without these.**
  Sign up at resend.com and verify `epaserocontracting.com` as a sending domain.
- `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` — for live Google reviews in Client Stories.
  The section hides itself until both are set, so nothing breaks in the meantime.

  ⚠️ The brief's "Google Place ID" section pasted the source of Google's *Place ID Finder*
  demo page instead of an actual Place ID. The key in that snippet (`AIzaSyA6my…`) is
  Google's public documentation key — it is not yours and must not be used. Get the real
  Place ID from https://developers.google.com/maps/documentation/places/web-service/place-id
  and create your own restricted key in Google Cloud.

## Deferred by decision

- **Journal / blog** (brief §4.8, §6) — skipped for now; needs a CMS with image upload.
  When it lands, add "Design & Build Journal" to `FOOTER_LINKS` in `lib/site.ts`.

## Deviations from the brief (deliberate)

- **Segoe UI is not self-hosted.** It is Windows-only and Microsoft-licensed, so it cannot
  legally be served as a webfont and does not exist on macOS/iOS/Android. The stack in
  `globals.css` leads with Segoe UI (Windows users see the intended face) and falls back to
  near-identical neutral sans-serifs elsewhere.
- **Section titles are not `<h1>` tags.** The brief's "H1 – Section Titles" describes a type
  *style*. Emitting a real `<h1>` per section would put six of them on the homepage and
  break the heading outline for search engines. Each page has exactly one `<h1>` (the hero);
  section labels use the `.h1-label` class and look identical.

- **Social icons leave the nav between 768px and 1023px.** Spec §4.1 asks for the hamburger
  below 768px, so the links must be visible at 768. Measured, the full bar needs 820px
  (logo 112 + links 294 + icons 112 + button 134 + padding and gaps). Dropping only the
  icons in that band brings it to 676px and fits. §4.1 explicitly permits moving the icons
  ("feel free to play around and see the best placement"); they return at 1024px, sit in the
  hamburger below 768px, and are in the footer on every page.

- **"Design & Build Journal" is absent from the footer links.** §4.10 lists it, but the
  journal page is deferred, and a footer link to a 404 is worse than no link. Add it to
  `FOOTER_LINKS` in `lib/site.ts` the day the page ships.

## Popup safety guard

The lead-capture popup will not open unless `public/guides/interior-design-guide-2026.pdf`
actually exists (it does a HEAD request before showing). This prevents it from taking a real
prospect's name, email and phone, pushing them to HubSpot, and then handing back a 404.

Drop the guide PDF at that exact path and the popup enables itself — no code change needed.
