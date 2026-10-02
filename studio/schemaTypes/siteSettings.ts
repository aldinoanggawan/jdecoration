import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business name',
      type: 'string',
      validation: (rule) => rule.required().error('Enter the business name.'),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      description: 'Digits only. Example: 081234567890',
      type: 'string',
      validation: (rule) => [
        rule.required().error('Enter the WhatsApp number.'),
        rule
          .regex(/^(?:\+?62|0)8\d{8,11}$/, {name: 'Indonesian mobile number'})
          .error('Use digits only, for example 081234567890.'),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About the business',
      description: 'A short paragraph shown on the website.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram link (optional)',
      type: 'url',
    }),
  ],
  preview: {prepare: () => ({title: 'Settings'})},
})
