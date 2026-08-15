'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Container from '@/components/container/Container'
import { motion, useInView } from 'framer-motion'
import { ButtonLink } from '@/components/ui/Button'

/**
 * Blur-and-fade reveal. Renders a plain div so callers choose their own heading
 * tag — it used to hardcode <h2>, which left the homepage with no <h1> at all.
 */
export const BlurIn = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Spec §4.2 — headline is exactly "We Create the Feeling of Living", keeping the
 * staggered placement.
 *
 * Set in Cormorant (option B, chosen 2026-08-14). It previously used the body
 * sans, which made the hero the one element on the page not speaking the site's
 * own voice — a visible seam between a sans headline and an entirely serif page
 * beneath it. Wording and capitalisation are unchanged, as the QA round asked;
 * only the face differs. The inline style is deliberate: `--font-display` is
 * declared on `body` rather than in `@theme`, so no Tailwind `font-*` utility
 * exists for it (see the note in globals.css).
 *
 * The spec asks to try brand black or brown for the headline. Both are illegible
 * against the current dark photograph, so this stays white until the supplied
 * "Hero Image" arrives — at which point it is a one-line change.
 */
const Hero = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Wait out the intro animation on a first visit; reveal immediately on
    // subsequent ones. Always going through a timer (rather than setting state
    // synchronously here) avoids a cascading re-render.
    const delay = sessionStorage.getItem('loaderShown') ? 0 : 3500
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen max-h-[871px] w-full overflow-hidden md:max-h-[900px]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/hero-bg.webp"
          alt="A contemporary Epasero interior in Dubai"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="hero-drift object-cover object-left md:object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[#796853] opacity-50 mix-blend-multiply" />

      {/* The headline stays mounted rather than being gated behind `visible`.
          Gating it meant the server-rendered homepage contained no <h1> at all,
          so crawlers saw a page with no headline. It is revealed by animating
          opacity once the intro loader has finished. */}
      <Container className="relative flex h-full flex-col justify-between pt-[130px] pb-[100px] md:pt-[157px]">
        <motion.h1
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={visible ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-brand-white text-[42px] leading-[1.02] font-semibold tracking-[-0.01em] uppercase max-md:max-w-[550px] md:text-[56px] lg:text-[88px]"
        >
          <span className="block md:mb-[11px]">We Create</span>
          <span className="block text-center md:mb-[11px] md:ml-[103px] md:text-left">
            the Feeling
          </span>
          <span className="ml-[117px] block max-md:text-right md:ml-[415px]">of Living</span>
        </motion.h1>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* QA 2026-08-14: a way into the portfolio straight from the hero.
              `invert` keeps it legible over the photograph, where the standard
              brown fill would sink into the background. */}
          <motion.div
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={visible ? { filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.15 }}
          >
            <ButtonLink href="/portfolio" variant="invert" className="px-8 py-4">
              Discover Our Work
            </ButtonLink>
          </motion.div>

          <motion.p
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={visible ? { filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="text-brand-white text-base font-bold uppercase max-lg:hidden lg:text-right"
          >
            Spaces that reflect your story, <br /> built to last.
          </motion.p>
        </div>
      </Container>
    </section>
  )
}

export default Hero
