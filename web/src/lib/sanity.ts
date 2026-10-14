import { createClient } from '@sanity/client';
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';

export const sanity = createClient({
  projectId: 'bpknwk44',
  dataset: 'production',
  apiVersion: '2026-10-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(sanity);

export const urlFor = (source: SanityImageSource) =>
  builder.image(source).auto('format');
