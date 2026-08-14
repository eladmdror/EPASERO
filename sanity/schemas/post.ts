import { defineField, defineType } from 'sanity'

/**
 * A journal post — spec §4.8 and §6 ("Design & Build Journal").
 *
 * This was deferred during the original build because there was nowhere to
 * write or upload images. That is exactly what the CMS solves, so it lands now.
 *
 * The body is Portable Text with inline images, because §6.5 asks that article
 * pages "should be able to upload photos".
 */
export const post = defineType({
  name: 'post',
  title: 'Journal Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Click Generate. Avoid changing it once the post is published.',
      options: { source: 'title', maxLength: 96 },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      description:
        'Posts dated in the future stay hidden until that moment, so you can write ahead.',
      initialValue: () => new Date().toISOString(),
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description:
        'One or two sentences. Shown on the journal list and used by Google and social previews.',
      validation: rule => rule.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Describe this photo',
          type: 'string',
          validation: rule => rule.required(),
        },
      ],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Article',
      type: 'array',
      description: 'Write here. Use the image button to drop photos into the article.',
      of: [
        {
          type: 'block',
          // Deliberately no H1: the page already renders the headline as its
          // single <h1>, and a second one would break the heading outline.
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullets', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'Address' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Describe this photo',
              type: 'string',
              validation: rule => rule.required(),
            },
            { name: 'caption', title: 'Caption (optional)', type: 'string' },
          ],
        },
      ],
      validation: rule => rule.required(),
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? new Date(subtitle).toDateString() : 'No date',
      media,
    }),
  },
})
