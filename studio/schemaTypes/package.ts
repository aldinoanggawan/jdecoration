import {defineArrayMember, defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons/Package'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const packageType = defineType({
  name: 'package',
  title: 'Package',
  type: 'document',
  icon: PackageIcon,
  orderings: [orderRankOrdering],
  fields: [
    // Hidden field that powers drag-to-reorder in the Packages list
    orderRankField({type: 'package'}),

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
      options: {source: 'title', maxLength: 80},
      validation: (rule) => rule.required().error('Tap "Generate" to create the web address.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      options: {disableNew: true}, // categories are managed in their own list
      validation: (rule) => rule.required().error('Pick a category.'),
    }),
    defineField({
      name: 'priceType',
      title: 'How to show the price',
      type: 'string',
      options: {
        list: [
          {title: 'Starting from (e.g. "From RM1,200")', value: 'from'},
          {title: 'Fixed price', value: 'fixed'},
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
      validation: (rule) => [
        rule.required().error('Enter the price.'),
        rule.integer().positive().error('Use digits only, for example 1500000.'),
      ],
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
        typeof price === 'number'
          ? `${priceType === 'from' ? 'From ' : ''}IDR${price.toLocaleString('en-MY')}`
          : 'No price yet'
      return {
        title: title || 'Untitled package',
        subtitle: `${priceLabel}${isActive === false ? ' · Hidden' : ''}`,
        media,
      }
    },
  },
})
