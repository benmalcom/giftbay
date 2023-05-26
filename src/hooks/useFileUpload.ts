import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { uploadImage } from 'services/media';

const useFileUpload = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = (file: File) => {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const payload = new FormData();
    payload.append('file', file);
    uploadImage(payload)
      .then((response: AxiosResponse<{ url: string }>) =>
        setUrl(response.data.url)
      )
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  };

  return { url, loading, error, uploadFile };
};

export default useFileUpload;
