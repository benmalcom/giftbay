export const APP_BASE_URL =
  process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_BASE_URL;

export const EVENT_CARD_COLORS = {
  white: {
    value: '#ffffff',
    complement: '#121314',
  },
  black: {
    value: '#1a1a1a',
    complement: '#ffffff',
  },
  red: {
    value: '#ff0d40',
    complement: '#ffffff',
  },
  pink: {
    value: '#ff0db3',
    complement: '#ffffff',
  },
  purple: {
    value: '#7f2ee6',
    complement: '#ffffff',
  },
  grey: {
    value: '#f1f1f1',
    complement: '#060607',
  },
  yellow: {
    value: '#ffca0f',
    complement: '#0f161b',
  },
} as {
  [key: string]: {
    value: string;
    complement: string;
  };
};

export const EVENT_CATEGORIES: { value: string; label: string }[] = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'bridal_shower', label: 'Bridal Shower' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'baby_shower', label: 'Baby Shower' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'valentine', label: 'Valentine' },
  { value: 'hangouts_meetups', label: 'Hangouts/Meetups' },
  { value: 'recreation', label: 'Recreation' },
  { value: 'others', label: 'Others' },
];

export const GIFT_FORMAT = [
  { label: 'Cash', value: 'cash' },
  { label: 'Product & Services', value: 'product_services' },
  { label: 'Vouchers & Gift cards', value: 'vouchers_gift_cards' },
];

export const CURRENCIES = [
  { label: '₦ - Nigerian Naira', value: 'naira', symbol: '₦', code: 'NGN' },
  { label: '$ - Dollars', value: 'dollar', symbol: '$', code: 'USD' },
  { label: '£ - Pounds', value: 'pound', symbol: '£', code: 'GBP' },
  { label: '€ - Euro', value: 'euro', symbol: '€', code: 'EUR' },
];
