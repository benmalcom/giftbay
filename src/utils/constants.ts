const appBaseUrl =
  process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_BASE_URL;

export const APP_BASE_URL = appBaseUrl;

export const pdfPageSizes = {
  US: ['8.5in', '11in'],
  EUROPE: ['210mm', '297mm'],
  A4: ['8.27in', '11.7in'],
};

export const MAXIMUM_RESUME_LIMIT = 5;
