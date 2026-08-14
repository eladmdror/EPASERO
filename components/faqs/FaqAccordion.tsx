'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { FaqCategory } from '@/data/faqs'
import { cn } from '@/lib/utils'

/**
 * Spec §7 — questions with a brown index block and a dropdown answer.
 *
 * With 54 questions the flat list this used to render would be a wall. They are
 * grouped by service line instead, and numbering restarts within each group so
 * the index stays a position ("question 3 of Landscaping") rather than an
 * unhelpful running count up to 54.
 *
 * Open state is held once for the whole page rather than per category, so only
 * one answer is ever open at a time — the same behaviour as the Services and
 * Process accordions elsewhere on the site.
 */
const FaqAccordion = ({ categories }: { categories: FaqCategory[] }) => {
  const [openKey, setOpenKey] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-14">
      {categories.map(category => (
        <section key={category.title} className="flex flex-col gap-5">
          {/* The question count that sat beside each subtitle was removed at
              QA 2026-08-14; the heading now stands alone with no leftover gap. */}
          <h2 className="h2-display text-brand-black !text-[26px] md:!text-[30px]">
            {category.title}
          </h2>

          <ul className="flex flex-col gap-4">
            {category.faqs.map((faq, i) => {
              const key = `${category.title}-${i}`
              const isOpen = openKey === key
              const index = String(i + 1).padStart(2, '0')

              return (
                <li
                  key={faq.question}
                  className={cn(
                    'rounded-brand flex overflow-hidden border transition-colors duration-300',
                    isOpen ? 'border-brand-brown' : 'border-brand-line',
                  )}
                >
                  {/* Brown index block */}
                  <div className="bg-brand-brown flex w-12 shrink-0 items-center justify-center md:w-16">
                    <span className="h1-label text-brand-white !text-[11px]">{index}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="hover:text-brand-brown flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7"
                    >
                      <span className="text-brand-black text-sm font-semibold md:text-base">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={cn(
                          'text-brand-brown shrink-0 transition-transform duration-300',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-brand-muted max-w-[680px] px-5 pb-6 text-[15px] leading-relaxed md:px-7">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default FaqAccordion
