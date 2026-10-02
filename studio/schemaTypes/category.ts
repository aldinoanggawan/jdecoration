import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category name',
      description: 'For example: Birthday, Wedding, Corporate',
      type: 'string',
      validation: (rule) => rule.required().error('Give the category a name.'),
    }),
  ],
})
