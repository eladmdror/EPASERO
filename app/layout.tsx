import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import FloatingWhatsApp from '@/components/whatsapp/FloatingWhatsApp'
import BackToTop from '@/components/back-to-top/BackToTop'
import MotionProvider from '@/components/motion/MotionProvider'
import LeadCaptureModal from '@/components/lead-capture/LeadCaptureModal'

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
          <Header />
          {children}
          <Footer />
          <FloatingWhatsApp />
          <BackToTop />
          <LeadCaptureModal />
        </MotionProvider>
      </body>
    </html>
  )
}
