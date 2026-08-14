import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Container from '@/components/container/Container'
import CtaSection from '@/components/cta/CtaSection'
import { getPostBySlug, getPosts } from '@/lib/cms'
import { urlForImage } from '@/sanity/client'

/**
 * A single journal article — spec §6.5, which asks that these pages look like
 * the project pages and support uploaded photos.
 *
 * Rendering is deliberately narrow (max 720px) rather than the site's usual
 * 1316px: long-form prose is only readable at roughly 65–75 characters a line.
 */

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage ? [post.coverImage.src] : undefined,
    },
  }
}

/**
 * How the editor's formatting is rendered. Headings map to the site's display
 * serif; images the editor drops mid-article are rendered full-width with their
 * caption. No `h1` is offered in the editor, so the article headline below stays
 * the page's only one.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-brand-muted mb-6 text-base leading-[1.8]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="h2-display text-brand-black mt-12 mb-4 !text-[30px]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-brand-black mt-8 mb-3 text-lg font-semibold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-brand-brown text-brand-black my-8 border-l-2 pl-6 text-lg italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-brand-muted mb-6 list-disc space-y-2 pl-6 text-base leading-[1.8]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-brand-muted mb-6 list-decimal space-y-2 pl-6 text-base leading-[1.8]">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-brown underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value)?.width(1400).url()
      if (!src) return null
      return (
        <figure className="my-10">
          <div className="rounded-brand-lg relative aspect-[16/10] overflow-hidden">
            <Image src={src} alt={value?.alt ?? ''} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" />
          </div>
          {value?.caption ? (
            <figcaption className="text-brand-muted mt-3 text-center text-xs">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return notFound()

  return (
    <main>
      <article>
        <header className="pt-32 pb-10 md:pt-40">
          <Container className="flex max-w-[720px] flex-col gap-5">
            <time dateTime={post.publishedAt} className="h1-label text-brand-brown">
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <h1 className="h2-display text-brand-black">{post.title}</h1>
            <p className="text-brand-muted text-lg leading-relaxed">{post.excerpt}</p>
          </Container>
        </header>

        {post.coverImage ? (
          <Container className="max-w-[1100px]">
            <div className="rounded-brand-lg relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </Container>
        ) : null}

        <div className="pb-section md:pb-section-lg pt-12">
          <Container className="max-w-[720px]">
            <PortableText value={post.body as never} components={components} />
          </Container>
        </div>
      </article>

      <CtaSection />
    </main>
  )
}
