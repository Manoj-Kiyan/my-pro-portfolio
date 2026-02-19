import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsItem',
  title: 'News & Ads', // This is what the client sees
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'image',
      title: 'Advertisement Image',
      type: 'image',
      options: {
        hotspot: true, // Important for responsive cropping
      },
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'priority',
      title: 'High Priority?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    }),
  ],
})