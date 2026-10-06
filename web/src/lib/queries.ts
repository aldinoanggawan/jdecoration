import { defineQuery } from 'groq';
import type { SETTINGS_QUERY_RESULT } from '../sanity.types';
import { sanity } from './sanity';

export const SETTINGS_QUERY = defineQuery(
  `*[_id == "siteSettings"][0]{ businessName, whatsappNumber, about, instagramUrl }`,
);

let settings: Promise<SETTINGS_QUERY_RESULT | undefined>;

export const getSettings = () => (settings ??= sanity.fetch(SETTINGS_QUERY));
