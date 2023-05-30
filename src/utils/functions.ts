import { UploadedFile } from 'types/common';

export const removePreviewFromUploadedFiles = (
  items: UploadedFile[]
): File[] => {
  const files = Array.from(items);
  files.forEach(file => delete file.preview);
  return files;
};
