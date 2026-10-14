import type { Package } from '../types/content';
import type { CardProps } from '../types/ui';
import { CARD_IMAGE_SRC_HEIGHT, CARD_IMAGE_SRC_WIDTH } from './images';
import { formatPrice } from './price';
import { packageHref } from './routes';
import { urlFor } from './sanity';

export const packageToCard = (
  pkg: Package,
  categorySlug: string,
): CardProps => {
  const cover = pkg.images?.[0];

  return {
    description: pkg.description,
    // Both dimensions + fit('crop') makes Sanity crop around the Studio hotspot
    imgSrc: cover
      ? urlFor(cover)
          .width(CARD_IMAGE_SRC_WIDTH)
          .height(CARD_IMAGE_SRC_HEIGHT)
          .fit('crop')
          .url()
      : '',
    list: ['Item 1', 'Item 2', 'Item 3', 'Item 4'], // TODO: update this after adding new schema in studio
    price: formatPrice(pkg.price, pkg.priceType),
    title: pkg.title,
    href: packageHref(categorySlug, pkg.slug),
  };
};
