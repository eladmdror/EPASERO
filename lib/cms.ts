import { client, urlForImage } from '@/sanity/client'
import { isSanityConfigured } from '@/sanity/env'
import { portfolioProjects as localProjects } from '@/data/data'
import { publishedFaqCategories as localFaqCategories } from '@/data/faqs'
import type { PortfolioProject } from '@/components/portfolio/types'
import type { FaqCategory } from '@/data/faqs'

/**
 * The single place the site asks for content.
 *
 * Every function here returns the same shape whether the answer came from the
 * CMS or from the files in `data/`. That is deliberate: the site went live
 * before the CMS existed, so nothing downstream is allowed to care which one is
 * answering. If Sanity is unconfigured, unreachable, or returns nothing, the
 * caller still gets the content that is on the site today.
 *
 * The fallback is not just for the migration window — it is the failure mode.
 * A CMS outage should never blank the portfolio of a live business.
 */

/** How long a CMS response is reused before being refetched. */
const REVALIDATE = 60

/** Category order on the FAQ page — mirrors the service order in spec §4.4. */
const FAQ_CATEGORY_ORDER = [
  'Interior Design',
  'Renovation & Fit-Out',
  'Architectural Design',
  'Interior Styling',
  'Landscaping',
]

type SanityImage = { asset?: { _ref?: string }; alt?: string }

type SanityProject = {
  title: string
  slug: { current: string }
  location: string
  category: PortfolioProject['category']
  images?: SanityImage[]
  area?: string
  description?: string
  specifications?: { icon: string; label: string; value: string }[]
  features?: string[]
  materials?: string
}

/**
 * Shape a CMS project into exactly what the existing components expect, so no
 * component had to change to gain CMS support.
 */
function toPortfolioProject(doc: SanityProject, index: number): PortfolioProject {
  const images = (doc.images ?? [])
    .map(img => {
      const url = urlForImage(img)?.width(1200).url()
      return url ? { src: url, alt: img.alt ?? doc.title } : null
    })
    .filter((i): i is { src: string; alt: string } => i !== null)

  return {
    id: doc.slug.current || String(index),
    title: doc.title,
    slug: doc.slug.current,
    location: doc.location,
    category: doc.category,
    images,
    property: {
      // Never rendered — see the note in PropertyHero. Kept only to satisfy the
      // existing type, and deliberately absent from the CMS schema so an editor
      // cannot introduce one.
      price: '',
      area: doc.area ?? '',
      details: {
        description: doc.description ?? '',
        specifications: doc.specifications ?? [],
        features: doc.features ?? [],
        materials: doc.materials ?? '',
        amenitiesColumns: { left: [], right: [] },
      },
    },
  }
}

/** All portfolio projects, CMS first, local files as the fallback. */
export async function getProjects(): Promise<PortfolioProject[]> {
  if (!isSanityConfigured || !client) return localProjects

  try {
    const docs = await client.fetch<SanityProject[]>(
      `*[_type == "project" && defined(slug.current)] | order(coalesce(order, 9999) asc, title asc){
        title, slug, location, category, images, area, description, specifications, features, materials
      }`,
      {},
      { next: { revalidate: REVALIDATE, tags: ['project'] } },
    )
    // An empty CMS during migration must not blank the live portfolio.
    if (!docs || docs.length === 0) return localProjects
    return docs.map(toPortfolioProject)
  } catch {
    return localProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  const all = await getProjects()
  return all.find(p => p.slug === slug)
}

/** FAQs grouped by service line, in the site's fixed category order. */
export async function getFaqCategories(): Promise<FaqCategory[]> {
  if (!isSanityConfigured || !client) return localFaqCategories

  try {
    const rows = await client.fetch<{ question: string; answer: string; category: string }[]>(
      `*[_type == "faq" && defined(answer) && answer != ""] | order(coalesce(order, 9999) asc){
        question, answer, category
      }`,
      {},
      { next: { revalidate: REVALIDATE, tags: ['faq'] } },
    )
    if (!rows || rows.length === 0) return localFaqCategories

    const grouped = new Map<string, { question: string; answer: string }[]>()
    for (const row of rows) {
      const list = grouped.get(row.category) ?? []
      list.push({ question: row.question, answer: row.answer })
      grouped.set(row.category, list)
    }

    // Known categories first in the site's order, then anything an editor adds.
    const known = FAQ_CATEGORY_ORDER.filter(c => grouped.has(c))
    const extra = [...grouped.keys()].filter(c => !FAQ_CATEGORY_ORDER.includes(c)).sort()

    return [...known, ...extra].map(title => ({ title, faqs: grouped.get(title) ?? [] }))
  } catch {
    return localFaqCategories
  }
}

export type JournalPost = {
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  coverImage: { src: string; alt: string } | null
  body?: unknown
}

/**
 * Journal posts. Unlike projects and FAQs there is no local fallback, because
 * there is no local blog content — an empty list simply means nothing has been
 * written yet, and the page says so.
 */
export async function getPosts(): Promise<JournalPost[]> {
  if (!isSanityConfigured || !client) return []

  try {
    const docs = await client.fetch<
      { title: string; slug: { current: string }; publishedAt: string; excerpt: string; coverImage?: SanityImage }[]
    >(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){
        title, slug, publishedAt, excerpt, coverImage
      }`,
      {},
      { next: { revalidate: REVALIDATE, tags: ['post'] } },
    )
    return (docs ?? []).map(d => ({
      title: d.title,
      slug: d.slug.current,
      publishedAt: d.publishedAt,
      excerpt: d.excerpt,
      coverImage: d.coverImage
        ? {
            src: urlForImage(d.coverImage)?.width(1200).url() ?? '',
            alt: d.coverImage.alt ?? d.title,
          }
        : null,
    }))
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<(JournalPost & { body: unknown }) | null> {
  if (!isSanityConfigured || !client) return null

  try {
    const doc = await client.fetch<{
      title: string
      slug: { current: string }
      publishedAt: string
      excerpt: string
      coverImage?: SanityImage
      body: unknown
    } | null>(
      `*[_type == "post" && slug.current == $slug][0]{ title, slug, publishedAt, excerpt, coverImage, body }`,
      { slug },
      { next: { revalidate: REVALIDATE, tags: ['post'] } },
    )
    if (!doc) return null
    return {
      title: doc.title,
      slug: doc.slug.current,
      publishedAt: doc.publishedAt,
      excerpt: doc.excerpt,
      coverImage: doc.coverImage
        ? {
            src: urlForImage(doc.coverImage)?.width(1600).url() ?? '',
            alt: doc.coverImage.alt ?? doc.title,
          }
        : null,
      body: doc.body,
    }
  } catch {
    return null
  }
}
