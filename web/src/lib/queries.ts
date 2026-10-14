import { defineQuery } from 'groq';
import type {
  CATEGORIES_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
} from '../sanity.types';
import { sanity } from './sanity';

export const SETTINGS_QUERY = defineQuery(
  `*[_id == "siteSettings"][0]{ businessName, whatsappNumber, about, instagramUrl }`,
);

export const CATEGORIES_QUERY =
  defineQuery(`*[_type == "category" && defined(slug.current)] | order(orderRank) {
  title,
  "slug": slug.current,
  "packages": coalesce(packages[isActive != false && defined(slug.current)] {
    _key, title, "slug": slug.current, price, priceType, description,
    images[] { ..., "lqip": asset->metadata.lqip, "dimensions": asset->metadata.dimensions }
  }, [])
}`);

let settings: Promise<SETTINGS_QUERY_RESULT> | undefined;
let categories: Promise<CATEGORIES_QUERY_RESULT> | undefined;

export const getSettings = () => (settings ??= sanity.fetch(SETTINGS_QUERY));

export const getCategories = () =>
  (categories ??= sanity.fetch(CATEGORIES_QUERY));
