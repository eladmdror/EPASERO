'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '@/components/container/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

/**
 * Spec §4.5 — four cards in a row. Clicking one opens a panel *below the whole
 * row*, spanning all four columns, rather than expanding the card in place.
 */
const STEPS = [
  {
    label: '01 / The Brief',
    summary: 'Understanding Precedes Design',
    detail:
      'The process begins with an in-depth dialogue, centred on lifestyle, spatial expectations, and long-term vision. This stage establishes the intellectual and emotional framework of the project.',
  },
  {
    label: '02 / The Design',
    summary: 'Custom-made Design',
    detail:
      'Concepts are translated into detailed visualisations, material studies, and spatial compositions. Each element is custom-made, developed through a process of careful refinement to achieve resolution at both macro and micro levels.',
  },
  {
    label: '03 / The Build',
    summary: 'Executed with Precision',
    detail:
      'Construction is approached as a direct continuation of the design process. Craftsmanship, coordination, and technical accuracy remain central throughout.',
  },
  {
    label: '04 / The Handover',
    summary: 'Delivered as Intended',
    detail:
      'The completed space reflects a precise translation of concept into reality. Nothing is adjusted at the end; it arrives resolved, considered, and complete.',
  },
]

const HowWeWork = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = openIndex === null ? null : STEPS[openIndex]

  return (
    <section id="process" className="bg-brand-white py-section md:py-section-lg scroll-mt-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          label="Our Process"
          heading="Defined by"
          accent="Precision"
          body="A structured methodology shaped by clarity of thought and disciplined execution."
        />

        <div className="flex flex-col">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const isOpen = openIndex === i

              return (
                <button
                  key={step.label}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={cn(
                    'btn-sweep group rounded-brand border-brand-line flex flex-col gap-4 border p-7 text-left',
                    '[--btn-sweep-colour:var(--color-brand-brown)]',
                    isOpen
                      ? 'border-brand-brown bg-brand-brown text-brand-white'
                      : 'text-brand-black hover:border-brand-brown hover:text-brand-white',
                  )}
                >
                  {/* These four genuinely are a sequence, so the numeral earns
                      its prominence — it is the one place on the site where a
                      number carries information rather than decoration. */}
                  <span
                    className={cn(
                      'flex items-baseline gap-3 transition-colors duration-300',
                      isOpen ? 'text-brand-white' : 'text-brand-brown group-hover:text-brand-white',
                    )}
                  >
                    <span className="font-label text-[30px] leading-none font-bold tracking-tight">
                      {step.label.split(' / ')[0]}
                    </span>
                    <span className="h1-label opacity-70">{step.label.split(' / ')[1]}</span>
                  </span>

                  <span className="h2-display !text-[clamp(20px,1.7vw,25px)]">{step.summary}</span>
                </button>
              )
            })}
          </div>

          {/* The expanded panel spans the full row. */}
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key={openIndex}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="rounded-brand border-brand-line mt-4 border bg-[#faf8f7] p-8">
                  <p className="h1-label text-brand-brown mb-3">{open.label}</p>
                  <p className="prose-body max-w-[1040px]">{open.detail}</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

export default HowWeWork
