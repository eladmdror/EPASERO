import { cn } from '@/lib/utils'

/**
 * The standard section header used across every page: a small letter-spaced
 * Courier label, then a Cormorant display line. Part of the display line can be
 * italicised in brown via `accent` — see the About Us reference
 * ("Curating *Elevated Living*").
 */
type Props = {
  /** The Courier kicker, e.g. "About Us". Rendered as the h1. */
  label: string
  /** The Cormorant display line, e.g. "Curating". Rendered as the h2. */
  heading: string
  /** Optional trailing words of the heading, italicised in brand brown. */
  accent?: string
  /** Body copy below the heading. */
  body?: string
  /** Render light-on-dark (for use over imagery or the black footer). */
  invert?: boolean
  align?: 'left' | 'center'
  className?: string
}

/**
 * The hairline that strikes out from (or into) the section label.
 *
 * Purely decorative, so it is hidden from assistive tech. The draw itself is
 * CSS (`.dimension-rule` in globals.css) rather than a scroll observer, so that
 * it fails *visible* — see the note there.
 */
const DimensionRule = ({ invert, from = 'left' }: { invert: boolean; from?: 'left' | 'right' }) => (
  <span
    aria-hidden="true"
    className={cn(
      'dimension-rule h-px w-10 shrink-0 md:w-14',
      from === 'right' && 'dimension-rule--from-right',
      invert ? 'bg-brand-white/40' : 'bg-brand-brown/60',
    )}
  />
)

const SectionHeading = ({
  label,
  heading,
  accent,
  body,
  invert = false,
  align = 'left',
  className,
}: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {/* The brief calls this an "H1", but that names the *type style*, not the
          tag. Emitting a real <h1> per section would give the homepage six of
          them and wreck the page's heading outline for search engines. The one
          <h1> on each page is the hero; this eyebrow is a <p> that merely looks
          like the H1 style.

          The hairline beside it is the site's signature detail. Epasero build
          spaces from drawings, and a drawing annotates itself with a thin rule
          running out to a monospace note — which is exactly what this Courier
          eyebrow already was, unaccompanied. The rule draws itself in as the
          section arrives, the way a dimension line is struck across a plan.
          Centre-aligned headings get one on each side so the label still reads
          as a callout rather than a list item. */}
      <div className={cn('flex items-center gap-4', align === 'center' && 'justify-center')}>
        <DimensionRule invert={invert} />

        <p className={cn('h1-label', invert ? 'text-brand-white/80' : 'text-brand-brown')}>
          {label}
        </p>

        {align === 'center' ? <DimensionRule invert={invert} from="right" /> : null}
      </div>

      <h2 className={cn('h2-display', invert ? 'text-brand-white' : 'text-brand-black')}>
        {heading}
        {accent ? <span className="h2-accent"> {accent}</span> : null}
      </h2>

      {body ? (
        <p
          className={cn(
            'max-w-[680px] text-base leading-relaxed',
            align === 'center' && 'mx-auto',
            invert ? 'text-brand-white/70' : 'text-brand-muted',
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
