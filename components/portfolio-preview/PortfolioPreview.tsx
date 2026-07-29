import Container from '@/components/container/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import PortfolioCard from '@/components/portfolio/PortfolioCard'
import { portfolioProjects } from '@/data/data'

/** Spec §4.6 — homepage portfolio teaser. Full list lives on /portfolio. */
const PortfolioPreview = () => {
  const featured = portfolioProjects.slice(0, 6)

  return (
    <section id="portfolio" className="py-section md:py-section-lg scroll-mt-24 bg-[#faf8f7]">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          label="Our Portfolio"
          heading="Spaces That"
          accent="Define Themselves"
          body="A curated body of work across Dubai, encompassing private residences and commercial environments. Each project is conceived as a distinct architectural expression, shaped through context, materiality, and a disciplined design language."
        />

        {/*
          `grid-cols-1` is load-bearing, not decoration. Without an explicit
          column at the base breakpoint the cards land in an *implicit* `auto`
          column, which has no upper bound — the Swiper inside each card then
          measures that unbounded width and sizes its slides to the browser's
          maximum CSS length (2^25 px), blowing the whole page out sideways on
          every viewport below `md`.
        */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map(project => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonLink href="/portfolio" variant="outline" className="px-10 py-4">
            View All Projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}

export default PortfolioPreview
