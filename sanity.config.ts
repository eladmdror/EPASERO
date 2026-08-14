'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'

/**
 * The editing dashboard, served at /studio on the live domain.
 *
 * Hosting it inside the site (rather than as a separate app) means the editor
 * signs in at epaserocontracting.com/studio — one address to remember, no
 * separate deployment to keep in step.
 *
 * The structure below is hand-ordered rather than left to Sanity's default
 * alphabetical list, so the sidebar reads in the order the work actually
 * happens: projects first, then journal, then FAQs.
 */
export default defineConfig({
  name: 'epasero',
  title: 'Epasero Contracting',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Website content')
          .items([
            S.documentTypeListItem('project').title('Portfolio Projects'),
            S.documentTypeListItem('post').title('Journal Posts'),
            S.documentTypeListItem('faq').title('FAQs'),
          ]),
    }),
    // Query playground — useful for debugging, harmless for an editor.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
