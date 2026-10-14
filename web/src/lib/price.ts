import type { PriceType } from '../types/content';

export const formatPrice = (
  price: number | null,
  priceType: PriceType,
): string => {
  if (priceType === 'custom' || price === null) return 'Contact us for price';

  const amount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);

  return priceType === 'from' ? `From ${amount}` : amount;
};
