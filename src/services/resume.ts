import { ResumeData } from 'types/resume';
import { composeRequestConfig, createRequest } from './http';

export const generatePDF = async (resumeId: string) => {
  return await createRequest(
    composeRequestConfig({
      url: `/resumes/${resumeId}/generate-pdf`,
      method: 'get',
      responseType: 'arraybuffer',
    })
  );
};

export const updateResume = async (
  resumeId: string,
  payload: Partial<ResumeData>
) => {
  return await createRequest(
    composeRequestConfig({
      url: `/resumes/${resumeId}`,
      method: 'patch',
      payload,
    })
  );
};

export const deleteResume = async (resumeId: string) => {
  return await createRequest(
    composeRequestConfig({
      url: `/resumes/${resumeId}`,
      method: 'delete',
    })
  );
};

export const createResume = async (payload: Record<string, unknown>) => {
  return await createRequest(
    composeRequestConfig({
      url: '/resumes',
      method: 'post',
      payload,
    })
  );
};

export const getResumeById = async (
  resumeId: string,
  params: Record<string, string | boolean> | null,
  signal: AbortSignal
) => {
  return await createRequest(
    composeRequestConfig({
      url: `/resumes/${resumeId}`,
      method: 'get',
      params,
      signal,
    })
  );
};

export const getUserResumes = async (userId: string, signal: AbortSignal) => {
  return await createRequest(
    composeRequestConfig({
      url: '/resumes',
      method: 'get',
      params: { user: userId },
      signal,
    })
  );
};
