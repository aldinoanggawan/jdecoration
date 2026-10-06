import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'bpknwk44',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'ijlbj4w50zni1ejwzeca9zk3',
  },
  typegen: {
    path: '../web/src/**/*.{ts,tsx,js,jsx}', // where our queries live
    schema: 'schema.json', // from `sanity schema extract`
    generates: '../web/src/sanity.types.ts', // output straight into the web app
    overloadClientMethods: true,
  },
})
