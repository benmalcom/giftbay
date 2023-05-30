import { createRequest } from './http';

export const uploadFile = async (payload: FormData) => {
  return await createRequest({
    url: '/media',
    payload,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
