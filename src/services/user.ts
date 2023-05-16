import { UserDetailsFormData } from 'components/forms/settings/UserDetailsForm';
import { createRequest } from './http';

export const updateUser = async (
  userId: string,
  payload: Partial<UserDetailsFormData>,
  signal?: AbortSignal
) => {
  return await createRequest({
    url: `/users/${userId}`,
    payload,
    method: 'patch',
    signal,
  });
};

export const getUser = async (userId: string, signal?: AbortSignal) => {
  return await createRequest({
    url: `/users/${userId}`,
    method: 'get',
    signal,
  });
};
