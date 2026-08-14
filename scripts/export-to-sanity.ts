/**
 * Turns the current site content into a file Sanity can import.
 *
 *   npx tsx scripts/export-to-sanity.ts
 *   npx sanity dataset import sanity-import.ndjson production --project <ID>
 *
 * Reads `data/data.ts` and `data/faqs.ts` — the same modules the site itself
 * uses — rather than re-parsing the files as text, so the export cannot drift
 * from what is actually published.
 *
 * Photos are referenced with Sanity's `_sanityAsset` syntax, which makes the
 * importer upload the local file and wire up the reference. That means the
 * images end up in Sanity's asset store rather than staying in `public/`, which
 * is the point: this project has already been through one 442 MB image cleanup.
 *
 * The export is idempotent. Document IDs are derived from slugs, so re-running
 * it updates the same documents instead of creating duplicates.
 */
import { writeFileSync } from 'node:fs'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { portfolioProjects } from '../data/data'
import { faqCategories } from '../data/faqs'

const PUBLIC_DIR = resolve(process.cwd(), 'public')
const OUT = resolve(process.cwd(), 'sanity-import.ndjson')

/** Sanity document IDs allow [a-zA-Z0-9._-], so slugs need sanitising. */
const safeId = (prefix: string, value: string) =>
  `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

const docs: Record<string, unknown>[] = []
const missingImages: string[] = []

// --- Projects --------------------------------------------------------------
portfolioProjects.forEach((project, index) => {
  const images = project.images
    .map(image => {
      const diskPath = resolve(PUBLIC_DIR, image.src.replace(/^\//, ''))
      if (!existsSync(diskPath)) {
        missingImages.push(image.src)
        return null
      }
      return {
        _type: 'image',
        _key: image.src.replace(/[^a-zA-Z0-9]/g, ''),
        _sanityAsset: `image@file://${diskPath}`,
        alt: image.alt,
      }
    })
    .filter(Boolean)

  const details = project.property.details

  docs.push({
    _id: safeId('project', project.slug),
    _type: 'project',
    title: project.title,
    slug: { _type: 'slug', current: project.slug },
    location: project.location,
    category: project.category,
    images,
    area: project.property.area,
    description: details.description,
    specifications: (details.specifications ?? []).map((spec, i) => ({
      _type: 'object',
      _key: `spec-${i}`,
      icon: spec.icon,
      label: spec.label,
      value: spec.value,
    })),
    // `features` is intentionally NOT exported. Every project in data.ts carries
    // the identical template list ("4 private bedrooms…", which the veterinary
    // clinic also claims). Importing it would spread that lie into the CMS and
    // make it look authored. The field exists in the schema, ready for real copy.
    materials: details.materials,
    order: index,
  })
})

// --- FAQs ------------------------------------------------------------------
faqCategories.forEach(category => {
  category.faqs.forEach((faq, i) => {
    if (!faq.answer.trim()) return
    docs.push({
      _id: safeId('faq', `${category.title}-${faq.question}`).slice(0, 120),
      _type: 'faq',
      question: faq.question,
      answer: faq.answer,
      category: category.title,
      order: i,
    })
  })
})

writeFileSync(OUT, docs.map(d => JSON.stringify(d)).join('\n') + '\n', 'utf8')

const projectCount = docs.filter(d => d._type === 'project').length
const faqCount = docs.filter(d => d._type === 'faq').length
const imageCount = docs
  .filter(d => d._type === 'project')
  .reduce((n, d) => n + ((d.images as unknown[]) ?? []).length, 0)

console.log(`Wrote ${OUT}`)
console.log(`  projects: ${projectCount}`)
console.log(`  faqs:     ${faqCount}`)
console.log(`  images:   ${imageCount}`)
if (missingImages.length) {
  console.warn(`\n  WARNING — ${missingImages.length} image(s) not found on disk and skipped:`)
  missingImages.slice(0, 10).forEach(p => console.warn(`    ${p}`))
}
