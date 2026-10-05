import {defineArrayMember, defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons/Package'

type PackageParent = {title?: string; priceType?: string}

export const packageItemType = defineType({
  name: 'packageItem',
  title: 'Package',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Photos',
      description:
        'Drag to reorder. The first photo is the cover. Tap a photo to set its focus point.',
      type: 'array',
      options: {layout: 'grid'},
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      validation: (rule) => rule.min(1).error('Add at least one photo.'),
    }),
    defineField({
      name: 'title',
      title: 'Package name',
      description: 'For example: Package 1, Custom Package',
      type: 'string',
      validation: (rule) => [
        rule.required().error('Give the package a name.'),
        rule.max(60).warning('Shorter names look better on the website (60 characters max).'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      description: 'Tap "Generate" after typing the package name.',
      type: 'slug',
      options: {
        source: (_doc, {parent}) => (parent as PackageParent | undefined)?.title ?? '',
        maxLength: 80,
        // Disable Sanity's default check, which would compare against packages in
        // OTHER categories too. Uniqueness within a category is checked on the
        // category's `packages` array instead.
        isUnique: () => true,
      },
      validation: (rule) => rule.required().error('Tap "Generate" to create the web address.'),
    }),
    defineField({
      name: 'priceType',
      title: 'How to show the price',
      type: 'string',
      options: {
        list: [
          {title: 'Starting from (e.g. "From IDR1.500.000")', value: 'from'},
          {title: 'Fixed price', value: 'fixed'},
          {title: 'Custom – ask via WhatsApp', value: 'custom'},
        ],
        layout: 'radio',
      },
      initialValue: 'from',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (IDR)',
      description: 'Digits only, no "IDR" and no dots. Example: 1500000',
      type: 'number',
      hidden: ({parent}) => (parent as PackageParent | undefined)?.priceType === 'custom',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as PackageParent | undefined
          if (parent?.priceType === 'custom') return true
          if (typeof value !== 'number') return 'Enter the price.'
          return (Number.isInteger(value) && value > 0) || 'Use digits only, for example 1500000.'
        }),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      description: '2–3 sentences: what is included, setup size, theme.',
      type: 'text',
      rows: 4,
      validation: (rule) => [
        rule.required().error('Add a short description.'),
        rule.max(300).warning('Keep it under 300 characters so it fits nicely on the card.'),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Show on website',
      description: 'Turn off to hide this package without deleting it.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price',
      priceType: 'priceType',
      isActive: 'isActive',
    },
    prepare({title, media, price, priceType, isActive}) {
      const priceLabel =
        priceType === 'custom'
          ? 'Custom'
          : typeof price === 'number'
            ? `${priceType === 'from' ? 'From ' : ''}IDR${price.toLocaleString('id-ID')}`
            : 'No price yet'
      return {
        title: title || 'Untitled package',
        subtitle: `${priceLabel}${isActive === false ? ' · Hidden' : ''}`,
        media,
      }
    },
  },
})
