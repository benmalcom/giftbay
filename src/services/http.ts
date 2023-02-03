import axios, { AxiosRequestConfig } from 'axios';
import { isEmpty } from 'lodash';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { APP_BASE_URL } from 'utils/constants';
// Default config options
const defaultOptions: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
  timeout: 10000,
};

// Create instance
const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const session = (await getSession()) as Session;
    if (session?.accessToken) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.headers.Authorization = `Bearer ${session?.accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.code === 'ECONNABORTED')
        throw new Error('Network timeout, please try again');
      else if (error.code === 'ERR_CANCELED') {
        return;
      } else if (error.response.status === 401) {
        signOut({ callbackUrl: `${APP_BASE_URL}/login` });
        toast.error('Session expired! Please login.');
        return;
      } else if (error.response.status === 403) {
        throw new Error('You are not authorized to perform this operation');
      }
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    }
    // Do nothing for canceled requests
    else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw new Error(
        'This request is taking too long, please check your network'
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
);
export default instance;

interface ComposeRequestType extends AxiosRequestConfig {
  payload?: object;
  headers?: Record<string, string>;
}

export const composeRequestConfig = (config: ComposeRequestType) => {
  const { method = 'get', payload, params, headers, ...rest } = config;
  const requestConfig: ComposeRequestType = { method, ...rest };
  if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
    requestConfig.data = payload;
  }
  if (params && !isEmpty(params)) {
    requestConfig.params = params;
  }

  if (headers) {
    requestConfig.headers = headers;
  }
  return requestConfig;
};

export const createRequest = (config: ComposeRequestType) =>
  instance(composeRequestConfig(config));
