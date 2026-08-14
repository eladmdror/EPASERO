'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import FloatingWhatsApp from '@/components/whatsapp/FloatingWhatsApp'
import BackToTop from '@/components/back-to-top/BackToTop'
import LeadCaptureModal from '@/components/lead-capture/LeadCaptureModal'

/**
 * The site's furniture: header, footer, and the floating controls.
 *
 * Everything here is hidden inside /studio. The editing dashboard is a
 * full-screen application, and wrapping it in the marketing site's header,
 * footer and WhatsApp button would both look wrong and cover its own controls.
 *
 * Done with a pathname check rather than Next.js route groups because the
 * alternative was moving every existing page into an `(site)` directory — a
 * large, risky move on a site that is live and taking enquiries, in exchange
 * for no visible difference.
 */
const SiteChrome = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) return <>{children}</>

  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
      <LeadCaptureModal />
    </>
  )
}

export default SiteChrome
