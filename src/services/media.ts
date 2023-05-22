import { createRequest } from './http';

export const uploadImage = async (payload: FormData) => {
  return await createRequest({
    url: '/media',
    payload,
    method: 'post',
  });
};
