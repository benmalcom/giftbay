const appBaseUrl =
  process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_BASE_URL;

export const APP_BASE_URL = appBaseUrl;

export const CARD_COLORS = {
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
};
