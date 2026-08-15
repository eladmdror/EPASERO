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
    <Container>
      {/*
        This is the one moment on the page asking for a decision, and it was
        styled exactly like every other section — same type size, same rhythm,
        no weight. It now sits inside a hairline frame with real space around
        it, so it reads as a considered invitation rather than another band of
        text. The frame is a single 1px rule: the same drafting language as the
        dimension marks, not a box drawn for the sake of decoration.
      */}
      <div className="border-brand-brown/20 rounded-brand-lg mx-auto flex max-w-[900px] flex-col items-center gap-9 border px-6 py-14 text-center md:px-16 md:py-20">
        <SectionHeading
          label={CTA_SECTION.label}
          heading={CTA_SECTION.heading}
          body={CTA_SECTION.body}
          align="center"
          className="[&_h2]:!text-[clamp(32px,4.2vw,58px)]"
        />
        <ButtonLink href={CTA_SECTION.buttonHref} variant="primary" className="px-14 py-4">
          {CTA_SECTION.buttonLabel}
        </ButtonLink>
      </div>
    </Container>
  </section>
)

export default CtaSection
