import type { Metadata } from 'next'
import Container from '@/components/container/Container'
import FaqAccordion from '@/components/faqs/FaqAccordion'
import CtaSection from '@/components/cta/CtaSection'
import { getFaqCategories } from '@/lib/cms'

/**
 * Spec §7 — deliberately clean, no hero. Kept out of the main navigation
 * (reachable from the footer only), which is what §7 asks for.
 *
 * It is, however, indexable. §7's "hidden" refers to navigation placement; these
 * 54 answers are the strongest search content on the site — they answer the
 * exact questions people type before hiring a fit-out contractor in Dubai — and
 * hiding them from search would waste the asset. Add `robots: { index: false }`
 * here to reverse that.
 */
export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers on interior design, renovation and fit-out, architectural design, styling, and landscaping in Dubai — costs, timelines, permits, and process.',
}

export default async function FaqsPage() {
  const categories = await getFaqCategories()
  const publishedFaqCount = categories.reduce((n, c) => n + c.faqs.length, 0)

  return (
    <main>
      <section className="pb-section md:pb-section-lg pt-32 md:pt-40">
        <Container className="flex max-w-[900px] flex-col gap-12">
          <div className="flex flex-col gap-3">
            <h1 className="h2-display text-brand-black">Frequently Asked Questions</h1>
            {publishedFaqCount > 0 ? (
              <p className="text-brand-muted max-w-[620px] text-base leading-relaxed">
                Costs, timelines, approvals, and process — answered across the five disciplines we
                practise. If your question is not here, it is worth a direct conversation.
              </p>
            ) : null}
          </div>

          {publishedFaqCount > 0 ? (
            <FaqAccordion categories={categories} />
          ) : (
            <p className="text-brand-muted">
              Answers are being finalised and will be published shortly.
            </p>
          )}
        </Container>
      </section>

      <CtaSection />
    </main>
  )
}
