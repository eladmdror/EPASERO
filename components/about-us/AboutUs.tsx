'use client'

import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { motion } from 'framer-motion'
import Container from '@/components/container/Container'
import SectionHeading from '@/components/ui/SectionHeading'

/** Spec §4.3 — this copy is verbatim from the brief and must not be reworded. */
const PARAGRAPHS = [
  'Founded in Dubai in 2022, Epasero Contracting was born from the recognition that the existing standard was no longer enough. Conventional renovation and fit-out approaches failed to meet the expectations of modern clients, those who seek spaces with deeper character, elevated quality, and a distinctly contemporary perspective.',
  'Where design meets custom-made functionality, Epasero Contracting was created to unite two essential worlds into one seamless vision: crafting exceptional luxury environments without ever compromising on comfort, practicality, or tailored living. We bring a profound understanding of how people truly live, translating these insights into refined forms and effortless functionality. Moving beyond repetitive solutions, we create spaces that feel timeless, designed to outlast trends rather than follow them.',
  'Designing spaces where even the most ordinary routines feel exceptional, because at Epasero Contracting we understand that true luxury is felt in the small, everyday moments, not only in grand statements.',
  'Today, we deliver bespoke interiors, renovation, fit-out, and landscaping projects across Dubai, from private villas and apartments to refined commercial spaces. Every project is crafted to feel impeccable, enduring, and distinctly personal.',
  'What truly defines Epasero Contracting is its people. Our team is composed of seasoned professionals who share an uncompromising commitment to precision, craftsmanship, and excellence. When clients choose Epasero Contracting, they partner with a team dedicated to bringing their vision to life, at the highest possible standards.',
]

const PRINCIPLES = ['Always Bespoke', 'Uncompromising Craft', 'Total Transparency']

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const AboutUs = () => (
  <section id="about" className="bg-brand-white py-section md:py-section-lg scroll-mt-24">
    <Container className="flex flex-col gap-16">
      <SectionHeading label="About Us" heading="Curating" accent="Elevated Living" />

      {/*
        Two columns of equal-weight grey text either side of a square photo read
        as a brochure. The first paragraph is the thesis of the whole company,
        so it is set as one — large, in the display serif, running the full
        measure — and the remaining four follow beneath it in two columns as
        body copy. That gives the section a beginning instead of a flat start,
        and the photograph a reason to sit where it does.
      */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="h2-display text-brand-black max-w-[1000px] !text-[clamp(21px,2.3vw,30px)] !leading-[1.45] !tracking-normal"
      >
        {PARAGRAPHS[0]}
      </motion.p>

      <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col gap-5"
        >
          {PARAGRAPHS.slice(1).map((text, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="prose-body !text-[15.5px]"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-brand-lg relative min-h-[440px] overflow-hidden md:min-h-full"
        >
          <Image
            src="/about-us-team_up2.webp"
            alt="The Epasero team at work in Dubai"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Principles — spec §4.3 */}
      <div className="flex flex-col gap-8">
        <h3 className="h2-display text-brand-black !text-[clamp(24px,2.4vw,32px)]">
          The Principles Behind Every Project
        </h3>

        {/* Set in the display face rather than as a small mono label — these are
            the three promises the company makes, not metadata. The rule above
            each one is the site's dimension mark, tying them to the section
            headings. */}
        <div className="grid gap-px sm:grid-cols-3 bg-brand-line">
          {PRINCIPLES.map((principle, i) => (
            <motion.div
              key={principle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
              className="bg-brand-white flex flex-col gap-4 px-7 py-9"
            >
              <span aria-hidden="true" className="dimension-rule bg-brand-brown/60 h-px w-10" />
              <span className="h2-display text-brand-black !text-[clamp(19px,1.6vw,23px)]">
                {principle}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trusted By — developer logos */}
      <div className="flex flex-col gap-8">
        <h3 className="h1-label text-brand-muted">Trusted By</h3>
        <Marquee autoFill speed={30} gradient gradientColor="white" className="flex items-center">
          {Array.from({ length: 8 }, (_, i) => (
            <Image
              key={i}
              src={`/brand-logos/${i + 1}.webp`}
              alt=""
              width={118}
              height={30}
              className="mx-6 h-[30px] w-[90px] object-contain opacity-60 md:mx-10 md:w-[118px]"
            />
          ))}
        </Marquee>
      </div>
    </Container>
  </section>
)

export default AboutUs
