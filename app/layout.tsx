import type { Metadata } from 'next'
import { Cormorant_Garamond, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import MotionProvider from '@/components/motion/MotionProvider'
import SiteChrome from '@/components/layout/SiteChrome'

/**
 * Three faces, three jobs — chosen from what Epasero actually do rather than
 * from what luxury sites usually reach for.
 *
 * Cormorant Garamond (display) — the refinement. Unchanged: it is the brand.
 *
 * Archivo (body) — the engineering. Previously the body was a *system* stack,
 * which means it was never designed: Segoe UI on Windows, SF Pro on a Mac,
 * something else again on Android. That is 90% of the words on the site set in
 * whatever the visitor's OS happened to supply. Archivo is a grotesque drawn
 * for small sizes and dense setting; it is sturdy and technical rather than
 * warm, which suits a contractor, and it holds its shape against Cormorant's
 * very high contrast instead of dissolving next to it.
 *
 * IBM Plex Mono (labels) — the drafting. Replaces Courier New, which is a
 * crude digitisation of a 1955 typewriter and was sitting on every section
 * label. Plex Mono was drawn for an engineering company and carries exactly
 * the technical-annotation tone the dimension rules are reaching for, properly
 * drawn this time.
 *
 * Together they read as precision + engineering + refinement, which is the
 * business: we draw it, we build it, and it is beautiful.
 */
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://epaserocontracting.com'),
  title: {
    template: '%s | Epasero Contracting',
    default: 'Epasero Contracting',
  },
  description:
    'Epasero delivers bespoke interiors, renovation, fit-out, and landscaping projects across Dubai. Where design meets custom-made functionality.',
  openGraph: {
    images: ['/og-image.webp'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${archivo.variable} ${plexMono.variable} antialiased`}>
        <MotionProvider>
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
      </body>
    </html>
  )
}
