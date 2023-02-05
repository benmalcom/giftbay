import { pick } from 'lodash';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { createRequest } from './http';

export const loginOrRegister = async <C>(
  credentials: Record<keyof C, string> | undefined
) => {
  const isRegister = !!credentials && 'isRegister' in credentials;
  const inputFields = ['email', 'password', 'verifyRedirectUrl'];
  if (isRegister) inputFields.push('name');
  const payload = pick(credentials, inputFields);
  return await createRequest({
    url: isRegister ? '/auth/register' : '/auth/login',
    payload,
    method: 'post',
  });
};

export const refreshAccessToken = async (tokenObject: {
  refreshToken: string;
}) => {
  try {
    // Get a new set of tokens with a refreshToken
    const { data } = await createRequest({
      url: '/auth/refresh-tokens',
      method: 'post',
      payload: {
        refreshToken: tokenObject.refreshToken,
      },
    });

    return {
      ...tokenObject,
      accessToken: data.access.token,
      accessTokenExpiry: new Date(data.access.expires).getTime(),
      refreshToken: data.refresh.token ?? tokenObject.refreshToken,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const verifyEmail = async (token: string) => {
  return await createRequest({
    url: '/auth/verify-email',
    params: { token },
    method: 'post',
  });
};

export const logOutUser = async () => {
  const session = (await getSession()) as Session;

  return await createRequest({
    url: '/auth/logout',
    payload: { refreshToken: session?.refreshToken },
    method: 'post',
  });
};
