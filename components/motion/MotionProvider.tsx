'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Site-wide motion policy.
 *
 * `reducedMotion="user"` makes framer-motion follow the visitor's OS setting:
 * transform and layout animation is dropped, plain opacity is kept. That is the
 * behaviour we want — a visitor who asked for less motion still sees content
 * appear, it simply does not travel across the screen.
 *
 * This exists as its own client component because `app/layout.tsx` is a server
 * component and `MotionConfig` uses context, so it cannot be imported there
 * directly.
 *
 * CSS-driven motion is covered separately by the `prefers-reduced-motion` block
 * in `app/globals.css`.
 */
const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
)

export default MotionProvider
