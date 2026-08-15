import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Buttons & CTAs — spec §1.1: Segoe UI, uppercase, 0.1em tracking, weight 600.
 *
 * Every variant shares one gesture: the fill sweeps up from the bottom edge on
 * hover (`.btn-sweep`, defined in globals.css) rather than swapping colour.
 * Epasero apply finishes to surfaces for a living, so a button that fills the
 * way a coat goes on says something true about them; a colour swap says
 * nothing. Using the same motion everywhere makes it read as a system.
 *
 * `min-h-11` keeps every button at the 44px minimum touch target.
 */
const base =
  'btn-sweep group inline-flex min-h-11 items-center justify-center gap-3 rounded-brand px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none'

const variants = {
  /** Brand brown fill. The sweep is the darker shade, so it reads as depth. */
  primary:
    'bg-brand-brown text-brand-white [--btn-sweep-colour:var(--color-brand-brown-dark)]',
  /** Outlined; fills brown. */
  outline:
    'border border-brand-brown text-brand-brown hover:text-brand-white [--btn-sweep-colour:var(--color-brand-brown)]',
  /** For use on dark/photographic backgrounds. */
  invert:
    'border border-brand-white/70 text-brand-white hover:border-brand-white hover:text-brand-black [--btn-sweep-colour:var(--color-brand-white)]',
  /** White fill, black text — the lead-capture DOWNLOAD button (spec §3.2). */
  light:
    'bg-brand-white text-brand-black border border-brand-black hover:text-brand-white [--btn-sweep-colour:var(--color-brand-black)]',
} as const

type Variant = keyof typeof variants

export const buttonClasses = (variant: Variant = 'primary', className?: string) =>
  cn(base, variants[variant], className)

type ButtonLinkProps = {
  href: string
  variant?: Variant
  className?: string
  children: React.ReactNode
  external?: boolean
}

export const ButtonLink = ({
  href,
  variant = 'primary',
  className,
  children,
  external,
}: ButtonLinkProps) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses(variant, className)}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  )
}

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & { variant?: Variant }

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => (
  <button className={buttonClasses(variant, className)} {...props} />
)
