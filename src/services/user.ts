import { UserDetailsFormData } from 'components/settings/UserDetailsForm';
import { createRequest } from './http';

export const updateUserDetails = async (
  userId: string | undefined,
  payload: Partial<UserDetailsFormData>
) => {
  return await createRequest({
    url: `/users/${userId}`,
    payload,
    method: 'patch',
  });
};

export const getUser = async (userId: string, signal: AbortSignal) => {
  return await createRequest({
    url: `/users/${userId}`,
    method: 'get',
    signal,
  });
};
