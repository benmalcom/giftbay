import axios, { AxiosRequestConfig } from 'axios';
import { isEmpty } from 'lodash';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
// Default config options
const defaultOptions: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
  timeout: 3000,
};

// Create instance
const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  async (config: ComposeRequestType) => {
    const session = (await getSession()) as Session;
    if (session?.accessToken) {
      // eslint-disable-next-line
      if (config.headers) {
        config.headers['x-access-token'] = session?.accessToken;
      } else {
        config.headers = { 'x-access-token': session?.accessToken };
      }
    }
    return config;
  },
  error => Promise.reject(error)
);
// Add a response interceptor
instance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      if (error.code === 'ECONNABORTED')
        throw new Error('Network timeout, please try again');
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      error.message =
        'This request is taking too long, please check your network';
      throw error;
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
);
export default instance;

export const createRequest = (config: AxiosRequestConfig) => instance(config);

type ComposeRequestType = AxiosRequestConfig & {
  payload?: object;
};
export const composeRequestConfig = (config: ComposeRequestType) => {
  const { method = 'get', payload, params, headers, ...rest } = config;
  const requestConfig: ComposeRequestType = { method, ...rest };
  if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
    requestConfig.data = payload;
  }
  if (params && !isEmpty(params)) {
    requestConfig.params = params;
  }
  // Remove cached requests
  if (method === 'get') {
    if (requestConfig.params) {
      requestConfig.params.t = new Date().getTime();
    } else {
      requestConfig.params = { t: new Date().getTime() };
    }
  }
  if (headers) {
    requestConfig.headers = headers;
  }
  return requestConfig;
};
