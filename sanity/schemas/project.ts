import { defineField, defineType } from 'sanity'

/**
 * A portfolio project.
 *
 * Mirrors the shape in `data/data.ts` so the migration is lossless. Two fields
 * from that file are deliberately absent:
 *
 * - `price` — Elad decided on 2026-07-29 that prices are never shown. Leaving it
 *   out of the CMS entirely means nobody can add one by accident.
 * - `amenitiesColumns` — the template's blocks were shared across unrelated
 *   projects and one quoted a fee in Mexican pesos. Not worth carrying over.
 *
 * `features` IS here, because Elad asked for it: write real ones per project and
 * they appear on that project's page.
 */
export const project = defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project name',
      type: 'string',
      description: 'e.g. "4 Bedroom Villa". Shown on the card and as the page heading.',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description:
        'The end of the page link. Click Generate. Changing this on a published project breaks any existing link to it.',
      options: { source: 'title', maxLength: 96 },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Meadows, Dubai". Shown under the project name.',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Decides which filter tab the project appears under.',
      options: {
        list: [
          { title: 'Design Projects', value: 'design' },
          { title: 'Fit Out Projects', value: 'fitout' },
          { title: 'Styling', value: 'styling' },
        ],
        layout: 'radio',
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      description:
        'The first photo is the one shown on the portfolio card. Drag to reorder. Every photo needs a description for screen readers and search engines.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Describe this photo',
              type: 'string',
              description: 'e.g. "Living room with floor-to-ceiling windows"',
              validation: rule => rule.required(),
            },
          ],
        },
      ],
      validation: rule => rule.required().min(1),
    }),
    defineField({
      name: 'area',
      title: 'Size',
      type: 'string',
      description: 'e.g. "550 M²"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'The opening paragraph on the project page.',
    }),
    defineField({
      name: 'specifications',
      title: 'Details',
      type: 'array',
      description: 'The list with icons — property type, size, year, developer.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Property type', value: 'type' },
                  { title: 'Size', value: 'size' },
                  { title: 'Year built', value: 'year' },
                  { title: 'Developer', value: 'developer' },
                ],
              },
              validation: rule => rule.required(),
            },
            { name: 'label', title: 'Label', type: 'string', validation: rule => rule.required() },
            { name: 'value', title: 'Value', type: 'string', validation: rule => rule.required() },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Project highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Bullet points specific to THIS project. Leave empty rather than repeating another project — the page hides this section when it is blank.',
    }),
    defineField({
      name: 'materials',
      title: 'Materials & finishes',
      type: 'text',
      rows: 4,
      description: 'The closing paragraph about materials.',
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers appear first on the portfolio page.',
    }),
  ],
  orderings: [
    { title: 'Position', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'images.0' },
  },
})
