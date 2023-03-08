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

export function downloadResume(fileUrl: string, fileName?: string) {
  if (!fileUrl) return;
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName ? `${fileName}.pdf` : `file-${+new Date()}.pdf`;
  link.click();
  link.remove();
}

export function isBlankResume(resume: ResumeType) {
  return (
    !resume?.candidate?.name &&
    !resume?.candidate?.headline &&
    !resume?.candidate?.contactsAndLinks?.linkedIn &&
    !resume?.candidate?.contactsAndLinks?.email &&
    !resume?.sections?.length
  );
}

export function isResumePDFReady(resume: ResumeType) {
  return (
    !!resume?.candidate.name &&
    !!resume?.candidate?.headline &&
    !!resume?.candidate?.contactsAndLinks?.linkedIn &&
    !!resume?.candidate?.contactsAndLinks?.email &&
    resume?.sections?.length > 1
  );
}

export function formatResumeFilename(resume: ResumeType, fileName?: string) {
  const ownerName = resume.candidate.name.replaceAll(' ', '_');
  const suffix = resume.candidate.headline.match(/\b(\w)/g)?.join('');
  let resumeFilename = `${ownerName}_Resume_${suffix}`;
  if (fileName) resumeFilename += `_${fileName}`;
  return resumeFilename;
}

// Generate from server, should be used inside component
/*
const onGenerate = () => {
  setIsGeneratingPDF(true);
  generatePDF(resumeId as string)
    .then(({ data }) => {
      downloadResume(data, fileName ?? 'resume');
      setIsGeneratingPDF(false);
      setIsSavingResume(true);
      return updateResume(resumeId as string, {
        contents: objectToBase64(resume),
        fileContents: arrayBufferToBase64(data),
      });
    })
    .then(() => setIsSavingResume(false))
    .catch(err => {
      toast.error(err.message);
      setIsGeneratingPDF(false);
      setIsSavingResume(false);
    });
};
*/
