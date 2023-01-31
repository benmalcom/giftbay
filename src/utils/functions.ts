import { ResumeData, ResumeType } from 'types/resume';

export function objectToBase64(obj: Record<string, unknown>) {
  const jsonString = JSON.stringify(obj);
  return Buffer.from(jsonString).toString('base64');
}

export function objFromBase64(base64String: string) {
  const jsonString = Buffer.from(base64String, 'base64').toString();
  return JSON.parse(jsonString);
}

export function exportResumeTypeToResumeData(
  userId: string,
  resume: ResumeType
): Partial<ResumeData> {
  return {
    user: userId,
    contents: objectToBase64(resume),
  };
}

export function arrayBufferToBase64(buf: Uint8Array) {
  return Buffer.from(buf).toString('base64');
}
export function base64ToArrayBuffer(str: string) {
  return new Uint8Array(Buffer.from(str, 'base64'));
}
