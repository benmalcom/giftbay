import { composeRequestConfig, createRequest } from './http';

export const generatePDF = async () => {
  return await createRequest(
    composeRequestConfig({
      url: '/resumes/generate-pdf',
      method: 'get',
      responseType: 'arraybuffer',
    })
  );
};
