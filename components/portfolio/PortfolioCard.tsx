'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { PortfolioProject } from './types'
import PortfolioImageSlider from '../reuse/PortfolioImageSlider'
import { categoryLabels } from '@/data/data'

/**
 * The shared "box style" card. Spec §5.2 and §6.2 require the portfolio and
 * journal grids to reuse exactly this, so it stays generic.
 *
 * Radius is 8px (spec §1.3: 4–8px, no fully-rounded shapes) — the previous 32px
 * pill did not fit the brand.
 */
export default function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <Link href={`/portfolio/${project.slug}`} prefetch className="block h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="group rounded-brand-lg border-brand-line bg-brand-white hover:border-brand-brown/70 h-full overflow-hidden border transition-colors duration-300"
      >
        <div className="relative">
          <PortfolioImageSlider project={project} />
          <div className="rounded-brand bg-brand-white/90 absolute top-4 left-4 z-10 px-3 py-1.5 backdrop-blur-sm">
            <span className="h1-label text-brand-brown !text-[11px]">
              {categoryLabels[project.category]}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-6">
          <h3 className="h2-display text-brand-black group-hover:text-brand-brown !text-[24px] transition-colors duration-300">
            {project.title}
          </h3>

          <div className="flex items-center justify-between gap-4">
            <p className="text-brand-muted flex items-center gap-2 text-xs tracking-[0.08em] uppercase">
              <MapPin size={14} className="text-brand-brown shrink-0" />
              {project.location}
            </p>

            {/* The card was a dead-looking rectangle whose only hover feedback
                was a drop shadow — the cheapest signal available. The shadow is
                gone; this arrow slides in instead, so the card says "there is a
                page behind me" in the site's own line language. */}
            <span
              aria-hidden="true"
              className="text-brand-brown shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            >
              <svg width="22" height="8" viewBox="0 0 22 8" fill="none">
                <path
                  d="M0 4h20M17 1l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
