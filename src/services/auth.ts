import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { composeRequestConfig, createRequest } from './http';

export const verifyEmail = async (token: string) => {
  return await createRequest(
    composeRequestConfig({
      url: '/auth/verify-email',
      params: { token },
      method: 'post',
    })
  );
};

export const logOutUser = async () => {
  const session = (await getSession()) as Session;

  return await createRequest(
    composeRequestConfig({
      url: '/auth/logout',
      payload: { refreshToken: session.refreshToken },
      method: 'post',
    })
  );
};
