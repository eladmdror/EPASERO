'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/container/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import PortfolioCard from './PortfolioCard'
import Pagination from './Pagination'
import { PortfolioCategory, PortfolioCategoryTab } from './types'
import type { PortfolioProject } from './types'

const PROJECTS_PER_PAGE = 9

/**
 * Projects arrive as a prop rather than being imported here.
 *
 * This component is a client component; the content now comes from the CMS,
 * which is fetched on the server. Passing it down keeps the fetch on the server
 * and means this file works unchanged whether the data came from Sanity or from
 * `data/data.ts` — see `lib/cms.ts`.
 *
 * The category tabs are derived from the projects actually present, so counts
 * can never drift from what is rendered.
 */
export default function Portfolio({ projects }: { projects: PortfolioProject[] }) {
  const portfolioCategories: PortfolioCategoryTab[] = useMemo(
    () => [
      { id: 'all', label: 'All', count: projects.length },
      { id: 'design', label: 'Design Projects', count: projects.filter(p => p.category === 'design').length },
      { id: 'fitout', label: 'Fit Out Projects', count: projects.filter(p => p.category === 'fitout').length },
      { id: 'styling', label: 'Styling', count: projects.filter(p => p.category === 'styling').length },
    ],
    [projects],
  )

  const portfolioTopRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects
    }
    return projects.filter(project => project.category === activeCategory)
  }, [activeCategory, projects])

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  // Scroll back to the top of the grid when the page changes — but not on the
  // first render, which would yank a visitor arriving at /portfolio#something.
  // A ref, not state: this is a "have I run before" flag, and putting it in
  // state forced an extra render and an eslint suppression to go with it.
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    portfolioTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentPage])

  const handleCategoryChange = (category: PortfolioCategory) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <section ref={portfolioTopRef} className="w-full bg-white py-[120px]">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-11">
          <SectionHeading
            label="Our Portfolio"
            heading="Spaces That"
            accent="Define Themselves"
            body="From private residences in Dubai's most coveted addresses to distinguished commercial environments, each project is shaped by a singular design language, and finished to a standard that speaks for itself."
            align="center"
          />

          {/*
            The filter row scrolls horizontally on mobile, but its scrollbar is
            deliberately hidden — so with four categories, "Fit Out Projects"
            and "Styling" sat entirely off-screen with nothing to suggest they
            existed. The fade on the right edge is the affordance: it signals
            more content, and disappears at `md` where all four fit.
            `pointer-events-none` keeps it from blocking taps on the tabs under it.
          */}
          <div className="relative w-full">
            <div
              aria-hidden="true"
              className="from-brand-white pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent md:hidden"
            />
            <div className="mr-[-1rem] flex flex-col overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:mr-[0] md:w-auto md:flex-row md:items-end md:border-b md:border-[#a59e8c] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-6">
                {portfolioCategories.map((category: PortfolioCategoryTab) => {
                  const isActive = activeCategory === category.id

                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className="group relative flex min-h-11 cursor-pointer items-end pb-4 last:pr-4 md:last:pr-0"
                    >
                      <motion.p
                        initial={false}
                        animate={{
                          color: isActive ? '#000000' : '#9c5b4b',
                          opacity: isActive ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-base leading-[13.2px] font-medium whitespace-nowrap uppercase"
                      >
                        {category.label} ({category.count})
                      </motion.p>

                      {isActive && (
                        <motion.div
                          layoutId="activePortfolioTab"
                          className="absolute right-0 bottom-0 left-0 h-px bg-[#9c5b4b]"
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {!isActive && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 bottom-0 left-0 h-px origin-left bg-[#9c5b4b] opacity-30"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/*
          Three entrance animations used to be stacked here: this wrapper, a
          per-card wrapper with a 0.1s-per-index stagger, and the card's own
          scroll fade. The wrapper was the dangerous one — it held the entire
          grid at `opacity: 0` as a single block, so if that one animation
          failed to complete the whole portfolio was an empty 800px void with
          only the pagination showing.

          The card's own fade (spec §1.3: opacity 0→1, y 20→0, 0.6s ease) is
          kept and is now the only entrance animation, so a card can never be
          hidden by anything other than its own observer firing.

          `initial={false}` means the first paint is the settled state; the
          fade is reserved for genuine category/page changes.
        */}
        <div className="min-h-[800px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentProjects.map(project => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Container>
    </section>
  )
}
