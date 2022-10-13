const appBaseUrl =
  process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_BASE_URL;

export const APP_BASE_URL = appBaseUrl;

export const VERIFY_USER_REDIRECT_URL = `${appBaseUrl}/${process.env.NEXT_PUBLIC_VERIFY_USER_REDIRECT}`;
export const RESET_PASSWORD_REDIRECT_URL = `${appBaseUrl}/${process.env.NEXT_PUBLIC_RESET_PASSWORD_REDIRECT}`;
