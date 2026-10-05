import {defineArrayMember, defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

type PackageValue = {slug?: {current?: string}}

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  orderings: [orderRankOrdering],
  fields: [
    // Hidden field that powers drag-to-reorder in the Categories list
    orderRankField({type: 'category'}),

    defineField({
      name: 'title',
      title: 'Category name',
      description: 'For example: Birthday / Dessert Table',
      type: 'string',
      validation: (rule) => rule.required().error('Give the category a name.'),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      description: 'Tap "Generate" after typing the category name.',
      type: 'slug',
      options: {source: 'title', maxLength: 80},
      validation: (rule) => rule.required().error('Tap "Generate" to create the web address.'),
    }),
    defineField({
      name: 'packages',
      title: 'Packages',
      description: 'Drag to reorder. Tap a package to edit it.',
      type: 'array',
      of: [defineArrayMember({type: 'packageItem'})],
      validation: (rule) =>
        rule.custom((items: PackageValue[] | undefined) => {
          const slugs = (items ?? [])
            .map((item) => item.slug?.current)
            .filter((slug): slug is string => Boolean(slug))
          const duplicate = slugs.find((slug, i) => slugs.indexOf(slug) !== i)
          return duplicate
            ? `Two packages have the same web address "${duplicate}". Rename one and tap Generate again.`
            : true
        }),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'packages.0.images.0'},
  },
})
