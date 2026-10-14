import type { CATEGORIES_QUERY_RESULT } from '../sanity.types';

export type Category = CATEGORIES_QUERY_RESULT[number];
export type Package = Category['packages'][number];
export type PriceType = Package['priceType'];
