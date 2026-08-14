'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Container from '@/components/container/Container'

/**
 * Spec §5.1, §6.1, §8.1 — the Portfolio, Journal and Contact heroes must all
 * match the homepage hero's style and placement, so they share this component.
 *
 * QA 2026-08-14 raised the heading slightly on every page, and removed the
 * bottom-right caption ("Design & Build Journal — Notes from the practice" and
 * its siblings). The caption prop is gone rather than merely unused, so it
 * cannot be reintroduced on one page and reappear across all three.
 */
type Props = {
  /** Rendered in the homepage hero's typeface and weight. */
  heading: string
  image: string
}

const PageHero = ({ heading, image }: Props) => (
  <section className="relative h-[70vh] max-h-[720px] min-h-[480px] w-full overflow-hidden">
    <Image
      src={image}
      alt=""
      fill
      priority
      quality={90}
      sizes="100vw"
      className="object-cover object-center"
    />

    <div className="absolute inset-0 bg-[#796853] opacity-50 mix-blend-multiply" />

    <Container className="relative flex h-full flex-col justify-end pt-24 pb-28 md:pb-32">
      <motion.h1
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-brand-white max-w-[900px] text-[40px] leading-[1.05] font-bold tracking-[-1.92px] uppercase md:text-[64px] lg:text-[80px]"
      >
        {heading}
      </motion.h1>

    </Container>
  </section>
)

export default PageHero
