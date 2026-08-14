import { createClient, type SanityClient } from 'next-sanity'
import createImageUrlBuilder, { type SanityImageSource } from '@sanity/image-url'
import { apiVersion, dataset, projectId, isSanityConfigured } from './env'

/**
 * Read-only Sanity client.
 *
 * `null` when the CMS is not configured, so callers must handle its absence —
 * which is what keeps the site running on local content until the switchover.
 *
 * `useCdn: true` serves from Sanity's edge cache. Combined with the `revalidate`
 * on each fetch in `lib/cms.ts`, an editor's change appears within a minute
 * without a redeploy.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null

/**
 * Build a URL for a Sanity image. Returns null when unconfigured or when the
 * image is missing, so callers fall back rather than rendering a broken `src`.
 */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!builder || !source) return null
  return builder.image(source).auto('format').fit('max')
}
