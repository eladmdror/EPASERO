import { defineField, defineType } from 'sanity'

/**
 * An FAQ entry, grouped by service line.
 *
 * These answers quote real AED figures and make claims about Dubai Municipality
 * and NOC approvals, so the descriptions below are written as a warning to
 * whoever is editing: this is regulated commercial copy, not marketing filler.
 */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'Phrase it the way a customer would search for it.',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 6,
      description:
        '⚠️ Several answers quote prices in AED and describe Dubai Municipality / NOC approval rules. Do not change figures or regulatory claims without checking they are still accurate — this page is public and customers rely on it.',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Service line',
      type: 'string',
      description: 'Which heading this question appears under on the FAQ page.',
      options: {
        list: [
          { title: 'Interior Design', value: 'Interior Design' },
          { title: 'Renovation & Fit-Out', value: 'Renovation & Fit-Out' },
          { title: 'Architectural Design', value: 'Architectural Design' },
          { title: 'Interior Styling', value: 'Interior Styling' },
          { title: 'Landscaping', value: 'Landscaping' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers appear first within the service line.',
    }),
  ],
  orderings: [
    {
      title: 'Service line, then position',
      name: 'grouped',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: { select: { title: 'question', subtitle: 'category' } },
})
