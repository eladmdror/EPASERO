'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Back-to-top control, present on every page.
 *
 * Deliberately *not* circular: spec §1.3 asks for 4–8px rounding and no fully
 * circular shapes, and grants the floating WhatsApp button the single explicit
 * exception. Keeping this one square-with-rounded-corners also stops it reading
 * as a second WhatsApp button.
 *
 * It stacks directly above the WhatsApp button rather than beside it, so spec
 * §2's "must not be hidden by any other element" still holds, and it is smaller
 * (44px vs 56px) so the primary contact CTA stays visually dominant. 44px is
 * also the minimum comfortable touch target.
 */

/** Roughly one viewport — far enough that the page is clearly worth scrolling back up. */
const SHOW_AFTER_PX = 600

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    // `html { scroll-behavior: smooth }` is set globally, so an explicit 'auto'
    // is the only way to honour a reduced-motion preference here.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      // Hidden from the tab order and from screen readers while off-screen,
      // so it never becomes a focus trap at the top of a page.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        'rounded-brand-lg bg-brand-black text-brand-white hover:bg-brand-brown',
        'fixed right-6 bottom-[92px] z-[9998] flex h-11 w-11 items-center justify-center',
        'shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300',
        'focus-visible:ring-brand-brown focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <ArrowUp size={20} />
    </button>
  )
}

export default BackToTop
