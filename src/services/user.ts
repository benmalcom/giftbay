import { createRequest } from './http';

export const updateLoggedInUser = async (payload: Record<string, string>) => {
  return await createRequest({
    url: '/users/me',
    payload,
    method: 'put',
  });
};

export const getLoggedInUser = async (signal?: AbortSignal) => {
  return await createRequest({
    url: '/users/me',
    method: 'get',
    signal,
  });
};

export const changeLoggedInUserPassword = async (
  payload: Record<string, string>
) => {
  return await createRequest({
    url: '/change-password',
    payload,
    method: 'put',
  });
};

export const updateUserSettings = async (payload: Record<string, unknown>) => {
  return await createRequest({
    url: '/settings',
    payload,
    method: 'post',
  });
};
