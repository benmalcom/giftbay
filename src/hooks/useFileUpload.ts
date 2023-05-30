import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { uploadFile } from 'services/media';

const useFileUpload = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doUpload = (file: File) => {
    if (!file) {
      throw new Error('No file uploaded');
    }
    setLoading(true);
    const payload = new FormData();
    payload.append('file', file);
    uploadFile(payload)
      .then((response: AxiosResponse<{ file: { url: string; key: string } }>) =>
        setUrl(response.data.file.url)
      )
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  };

  return { url, loading, error, uploadFile: doUpload };
};

export default useFileUpload;
