import { pick } from 'lodash';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { createRequest } from './http';

export const loginOrRegister = async (
  credentials: Record<string, string> | undefined
) => {
  const isRegister = !!credentials && 'isRegister' in credentials;
  const inputFields = ['email', 'password'];
  if (isRegister) inputFields.push('name', 'redirectUrl');
  const payload = pick(credentials, inputFields);
  // Add redirectUrl here because it is reserved for next-auth
  /* if (isRegister) {
    payload.redirectUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${process.env.NEXT_PUBLIC_VERIFY_REDIRECT}`;*/
  return await createRequest({
    url: isRegister ? '/auth/signup' : '/auth/login',
    payload,
    method: 'post',
  });
};

export const refreshAccessToken = async (tokenObject: {
  refreshToken: string;
}) => {
  console.log('Refreshing token...');
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
      error: null,
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
    url: '/verify-email',
    payload: { token },
    method: 'post',
  });
};

export const sendPasswordResetEmail = async (
  payload: Record<string, string>
) => {
  return await createRequest({
    url: '/send-forgot-password-email',
    payload,
    method: 'post',
  });
};

export const resetPassword = async (payload: Record<string, string>) => {
  return await createRequest({
    url: '/auth/reset-password',
    payload,
    method: 'put',
  });
};

export const resendVerificationLink = async (
  payload: Record<string, string>
) => {
  return await createRequest({
    url: '/auth/resend-verification-link',
    payload,
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
