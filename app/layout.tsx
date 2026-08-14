import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import MotionProvider from '@/components/motion/MotionProvider'
import SiteChrome from '@/components/layout/SiteChrome'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
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
      <body className={`${cormorant.variable} antialiased`}>
        <MotionProvider>
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
      </body>
    </html>
  )
}
