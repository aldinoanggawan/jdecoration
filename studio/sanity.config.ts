import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import CogIcon from '@sanity/icons/Cog'
import TagIcon from '@sanity/icons/Tag'

const singletonTypes = new Set(['siteSettings'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'jdecoration',

  projectId: 'bpknwk44',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'category',
              title: 'Categories',
              icon: TagIcon,
              S,
              context,
            }),
            S.divider(),
            S.listItem()
              .title('Settings')
              .id('siteSettings')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Settings'),
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Hide "Settings" from the global "Create new document" menu (it's a singleton)
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (prev, context) => {
      // Settings: no duplicate/delete/unpublish
      if (singletonTypes.has(context.schemaType)) {
        return prev.filter(({action}) => action && singletonActions.has(action))
      }
      // Categories: no delete — deleting a category would delete all its packages.
      // Hide packages with "Show on website" instead.
      if (context.schemaType === 'category') {
        return prev.filter(({action}) => action !== 'delete')
      }
      return prev
    },
  },
})
