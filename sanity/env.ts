/**
 * Sanity connection details.
 *
 * Everything here is optional on purpose. The site is live and taking enquiries,
 * so it must not depend on the CMS being reachable — until `NEXT_PUBLIC_SANITY_PROJECT_ID`
 * is set, `lib/cms.ts` serves the existing content from `data/`, and the site
 * behaves exactly as it does today.
 *
 * To connect: set NEXT_PUBLIC_SANITY_PROJECT_ID in Vercel and redeploy.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01'

/** True once a project ID exists — the single switch between CMS and local files. */
export const isSanityConfigured = projectId.length > 0
