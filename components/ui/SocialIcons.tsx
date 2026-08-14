import { FaInstagram, FaTiktok, FaFacebookF, FaLinkedinIn } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { SOCIAL_LINKS } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Spec §1.3 requires every icon on the site — social and WhatsApp — to come from
 * a single family with the same visual weight. All five (including the floating
 * WhatsApp button) are Font Awesome 6 brand glyphs for exactly that reason.
 */
const ICONS: Record<string, IconType> = {
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  Facebook: FaFacebookF,
  LinkedIn: FaLinkedinIn,
}

/** Instagram's brand pink. Used only where the icon stands alone and must be recognisable. */
const INSTAGRAM_PINK = '#E1306C'

type Props = {
  /** Light-on-dark, for the black footer and over hero imagery. */
  invert?: boolean
  size?: number
  className?: string
  /**
   * Restrict to specific platforms. The header shows Instagram only (QA
   * 2026-08-14); the footer still carries all four.
   */
  only?: string[]
  /** Render each icon in its own brand colour rather than the site's black/white. */
  brandColour?: boolean
}

const SocialIcons = ({ invert = false, size = 16, className, only, brandColour }: Props) => {
  const links = only ? SOCIAL_LINKS.filter(l => only.includes(l.label)) : SOCIAL_LINKS

  return (
    // Negative margins keep the row visually the same width as before while each
    // link gets a real 44×44 touch target — the glyphs alone were 16–18px, well
    // under the WCAG 2.5.5 minimum, and they sit in both the header and footer.
    <ul className={cn('-mx-2 flex items-center', className)}>
      {links.map(({ label, href }) => {
        const Icon = ICONS[label]
        const useBrand = brandColour && label === 'Instagram'

        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              // The brand colour is applied inline rather than as a class so the
              // hover rule below cannot silently override it.
              style={useBrand ? { color: INSTAGRAM_PINK } : undefined}
              className={cn(
                'flex h-11 w-11 items-center justify-center transition-opacity duration-300',
                useBrand
                  ? 'hover:opacity-70'
                  : invert
                    ? 'text-brand-white/70 hover:text-brand-brown transition-colors'
                    : 'text-brand-black hover:text-brand-brown transition-colors',
              )}
            >
              <Icon size={size} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialIcons
