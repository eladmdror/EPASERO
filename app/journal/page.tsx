import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/container/Container'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import CtaSection from '@/components/cta/CtaSection'
import { getPosts } from '@/lib/cms'

/**
 * Spec §6 — "Design & Build Journal".
 *
 * Deferred during the original build because there was nowhere to write posts
 * or upload images; the CMS is what unblocked it.
 *
 * §4.8 asks that this stay out of the main navigation and the sitemap for now,
 * so it is reachable from the footer and excluded from `app/sitemap.ts`. Unlike
 * the FAQ page it is left `noindex` while empty — an index page with no
 * articles is not worth surfacing in search.
 */
export const metadata: Metadata = {
  title: 'Design & Build Journal',
  description:
    'Insight from within the practice. Articles on design, craft, and the discipline of building spaces that outlast the moment they were made in.',
}

export default async function JournalPage() {
  const posts = await getPosts()

  return (
    <main>
      <PageHero
        heading="Thinking Behind the Making"
        image="/hero-portfolio-bg.webp"
      />

      <section className="py-section md:py-section-lg bg-brand-white">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            label="Insights"
            heading="Design & Build"
            accent="Journal"
            body="Insight from within the practice. Articles on design, craft, and the discipline of building spaces that outlast the moment they were made in."
            align="center"
            bodyAlign="left"
          />

          {posts.length === 0 ? (
            <p className="text-brand-muted mx-auto max-w-[520px] text-center text-base leading-relaxed">
              The first articles are being written and will appear here shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <Link key={post.slug} href={`/journal/${post.slug}`} className="block h-full">
                  <article className="rounded-brand-lg border-brand-line bg-brand-white hover:border-brand-brown group h-full overflow-hidden border transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-[240px] overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage.src}
                          alt={post.coverImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="bg-brand-line h-full w-full" />
                      )}
                    </div>

                    <div className="flex flex-col gap-3 p-6">
                      <time
                        dateTime={post.publishedAt}
                        className="h1-label text-brand-brown !text-[11px]"
                      >
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>

                      <h2 className="h2-display text-brand-black group-hover:text-brand-brown !text-[22px] transition-colors duration-300">
                        {post.title}
                      </h2>

                      <p className="text-brand-muted text-sm leading-relaxed">{post.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaSection />
    </main>
  )
}
