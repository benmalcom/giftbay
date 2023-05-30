import { DynamicObject } from 'types/common';

export type ApiResponseError = {
  status: number;
  message: string;
};
export type ApiResponseMeta = {
  token?: string;
  error?: ApiResponseError;
  status_code: number;
  success: boolean;
};
export type ApiResponse = {
  data: {
    [key: string]: string | number | DynamicObject;
  };
  meta: ApiResponseMeta;
};
