import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import Portfolio from '@/components/portfolio/Portfolio'
import CtaSection from '@/components/cta/CtaSection'
import { getProjects } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'A curated body of work across Dubai — private residences, villas, and commercial environments by Epasero Contracting.',
}

/**
 * Spec §5. The hero image should be the supplied "Portfolio Hero Image"; until
 * that arrives this reuses the existing portfolio background.
 */
const PortfolioPage = async () => {
  const projects = await getProjects()

  return (
  <main>
    <PageHero
      heading="Spaces That Define Themselves"
      image="/hero-portfolio-bg.webp"
    />
    <Portfolio projects={projects} />
    <CtaSection />
    </main>
  )
}

export default PortfolioPage
