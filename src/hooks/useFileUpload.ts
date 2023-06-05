import { useState } from 'react';
import { uploadFile } from 'services/media';

type FormDataOptions = {
  resourceType: 'Event' | 'Gift' | 'User';
  resourceId?: string;
  oldUrl?: string;
};

const useFileUpload = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doUpload = (file: File, options?: FormDataOptions) => {
    if (!file) {
      throw new Error('No file uploaded');
    }
    setLoading(true);
    const payload = new FormData();
    payload.append('file', file);
    if (
      options &&
      options.oldUrl &&
      options.resourceId &&
      options.resourceType
    ) {
      Object.entries(options).forEach(([key, value]) => {
        payload.append(key, value);
      });
    }
    uploadFile(payload)
      .then(response =>
        setUrl((response as unknown as { file: { url: string } }).file.url)
      )
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  };
  return { url, loading, error, uploadFile: doUpload };
};

export default useFileUpload;
