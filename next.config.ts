import type { NextConfig } from 'next'

/**
 * The site previously used `output: 'export'` (a fully static build). That is
 * incompatible with the contact form, the HubSpot lead proxy, and the Google
 * Reviews integration — all of which need a server so API keys stay off the
 * client. On Vercel these run as serverless functions.
 *
 * Dropping the export also re-enables Next's image optimizer, so `unoptimized`
 * is no longer needed either.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,

  /**
   * Photos uploaded through the Studio are served from Sanity's CDN, and
   * `next/image` refuses any host not listed here — it rejects the whole image
   * with "Invalid src prop" rather than degrading, so without this entry every
   * portfolio photo is a blank box.
   *
   * Scoped to this project's asset path rather than all of cdn.sanity.io, so a
   * different Sanity project cannot be proxied through this site's optimizer.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/bbec9q7g/**',
      },
    ],
  },
}

export default nextConfig
