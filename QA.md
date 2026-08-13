# QA Report: Epasero Contracting — 2026-07-29

URL: https://www.epaserocontracting.com | Pages audited: 5 templates / 37 routes

## Summary

The site is functionally sound. Every route returns 200, every internal link and
image resolves, there are no console errors, and the code is clean — both API
routes handle network failure, there is no `dangerouslySetInnerHTML`, no
hardcoded secrets, and no stray logging. The contact form is properly built with
real visible labels on all five fields.

Findings cluster almost entirely in **mobile touch targets and accessibility**,
not in logic. The most serious is the mobile menu button at 24×24px — the primary
navigation control on phones, at roughly a quarter of the recommended area.

**Sweep 1** found 12 issues. **Sweep 2** (post-fix re-verification plus interaction
testing) found 4 more that only surface when you actually click: the tap-to-call
and mailto links, the detail-page slider arrows, and two form-accessibility gaps.
All 16 are fixed and re-verified in the browser.

Undersized touch targets, measured at 375px: **home 0, portfolio 0, contact 0,
FAQs 0, project detail 0** — down from 11, 39, 13, 2 and 2 respectively.

## Findings

### Critical
_None._

### High

- [x] **Pagination arrows have no accessible name** — `components/portfolio/Pagination.tsx` — the previous/next buttons contain only an SVG, so a screen reader announces them as "button". → Added `aria-label`.
- [x] **Mobile menu button is 24×24px** — `components/header/Header.tsx` — WCAG 2.5.5 asks for 44×44. This is the only way to reach navigation on a phone. → Padded to a 44×44 tap area.

### Medium

- [x] **Header "Let's Connect" is 32px tall on mobile** — `components/header/Header.tsx` — the primary CTA, below the 44px minimum. → `min-h-11`.
- [x] **Social icons are 18×18px** — `components/ui/SocialIcons.tsx` — in both the header and the footer. → Padded to 44×44 while keeping the glyph size.
- [x] **Portfolio slider arrows are 32×32px** — `components/reuse/PortfolioImageSlider.tsx` — and unlike on desktop they are permanently visible on mobile. → 44×44.
- [x] **Two of four category filters sit off-screen on mobile with no affordance** — `components/portfolio/Portfolio.tsx` — the row scrolls, but the scrollbar is deliberately hidden and nothing indicates more content, so "Fit Out Projects" and "Styling" are easy to miss entirely. → Added a fade edge.
- [x] **Category filter rows are 29px tall** — same file. → `min-h-11`.
- [x] **Footer quick links are 17px tall** — `components/footer/Footer.tsx`. → Padded.

### Found in sweep 2 (only visible once you interact)

- [x] **Tap-to-call and mailto links are 17px tall** — `app/contact/page.tsx` — the two highest-intent actions on the contact page. → `min-h-11`.
- [x] **Pagination page numbers are 32px** — `components/portfolio/Pagination.tsx` — missed on the first pass because they are separate from the arrows. → 44×44, plus `aria-label` and `aria-current="page"`.
- [x] **Project-detail slider arrows are 40×40** — `components/property-hero/PropertyHero.tsx` — a different slider from the card one, so the earlier fix did not cover it. → 44×44.
- [x] **Form errors are not announced, and focus does not move to them** — `components/contact/ContactForm.tsx` — submitting an incomplete form rendered five visible errors but left focus on the button, and no error was linked to its field, so a screen reader announced none of them. → Focus moves to the first invalid field; every field gains `aria-invalid` and `aria-describedby`; every error gains `role="alert"`. Verified in-browser: all five `aria-describedby` values resolve to a real element.

### Low

- [x] **No brand focus style** — the site relies on the browser default ring. Not a WCAG failure (verified: no global `outline: none` reset, so focus *is* visible), but inconsistent with the brand. → Added a shared `:focus-visible` ring.
- [ ] **11px text on portfolio category badges** — below the 12px comfortable minimum. Deliberate as a small-caps label; left as-is.
- [ ] **JS payload ≈ 1.2 MB** — Swiper, framer-motion, Lottie and react-icons together. Worth revisiting if Core Web Vitals suffer; not a defect.

## Verified as NOT issues

Checked and dismissed, recorded so they are not re-raised:

- **Hero headline "missing"** — appeared absent in a screenshot; it was mid-scroll behind the fixed header. `opacity: 1`, renders correctly.
- **Category filters "unreachable"** — the parent has `overflow-x: auto`; confirmed scrollable to 235px.
- **Contrast failures on the hero** — the checker cannot sample a photographic `<img>` behind text and defaulted to white. Legible in practice.
- **Focus never visible** — programmatic `.focus()` does not trigger `:focus-visible`; a real Tab press does.
- **`target="_blank"` without `rel`** — all three carry `rel="noopener noreferrer"` on the following line.

## What's Good

- Contact form: five fields, all with real visible labels, correct input types, 46px heights, server-side validation, and honest error states.
- API routes degrade gracefully — reviews returns `[]` and the section hides itself rather than breaking.
- Single `<h1>` per page, no skipped heading levels, no duplicate IDs, every image has alt text.
- The lead-capture popup refuses to open unless the PDF it promises actually exists.
