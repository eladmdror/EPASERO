import Container from '@/components/container/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { CTA_SECTION } from '@/lib/site'

/**
 * Spec §4.9 / §5.3 / §6.3 — identical on every page, so it lives in one place.
 *
 * QA 2026-08-14 asked for this to match the homepage "Our Portfolio" section
 * exactly, to lift it off the page. That is #faf8f7, taken from
 * PortfolioPreview rather than eyeballed, so the two cannot drift apart.
 */
const CtaSection = () => (
  <section className="py-section md:py-section-lg bg-[#faf8f7]">
    <Container className="flex flex-col items-center gap-8 text-center">
      <SectionHeading
        label={CTA_SECTION.label}
        heading={CTA_SECTION.heading}
        body={CTA_SECTION.body}
        align="center"
      />
      <ButtonLink href={CTA_SECTION.buttonHref} variant="primary" className="px-12 py-4">
        {CTA_SECTION.buttonLabel}
      </ButtonLink>
    </Container>
  </section>
)

export default CtaSection
