import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'bpknwk44',
  dataset: 'production',
  apiVersion: '2026-10-01',
  useCdn: false,
});
