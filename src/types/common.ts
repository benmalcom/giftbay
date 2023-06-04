export type DynamicObject = { [key: string]: string | number };

export type CurrencyType = {
  label: string;
  value: string;
  symbol: string;
  code: string;
};

export type UploadedFile = File & {
  preview?: string;
};

export type AppConfig = {
  layoutOrientation: 'vertical' | 'horizontal';
  pageTitle?: string;
};
