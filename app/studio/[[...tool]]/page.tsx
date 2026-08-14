import type { Metadata, Viewport } from 'next'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { isSanityConfigured } from '@/sanity/env'

/**
 * The editing dashboard at /studio.
 *
 * Kept out of search results and out of the sitemap — it is a staff tool, not a
 * page. Access is controlled by Sanity's own login, not by hiding the URL.
 */
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Content Studio',
  robots: { index: false, follow: false },
}

// The Studio manages its own full-screen layout and needs the viewport untouched.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
}

export default function StudioPage() {
  // Without a project ID the Studio would crash on load. Explain the one
  // remaining step instead of showing a stack trace.
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="max-w-[520px] text-center">
          <h1 className="h2-display text-brand-black mb-4">Content Studio not connected yet</h1>
          <p className="text-brand-muted text-base leading-relaxed">
            The dashboard is built and ready. It needs one setting before it can open:
            <code className="bg-brand-line/50 mx-1 rounded px-1.5 py-0.5 text-sm">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>
            in the hosting environment variables.
          </p>
          <p className="text-brand-muted mt-4 text-sm leading-relaxed">
            The website itself is unaffected and continues to serve its existing content.
          </p>
        </div>
      </main>
    )
  }

  return <NextStudio config={config} />
}
