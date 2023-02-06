import { useEffect, useState } from 'react';
import { base64ToArrayBuffer } from 'utils/functions';

function usePDFObjectUrl(fileContents: string) {
  const [fileUrl, setFileUrl] = useState<string | undefined>();

  useEffect(() => {
    if (!fileContents) return;
    if (fileUrl) return;
    const arrayBuffer = base64ToArrayBuffer(fileContents).buffer;
    const blob = new Blob([arrayBuffer as unknown as BlobPart], {
      type: 'application/pdf',
    });
    setFileUrl(URL.createObjectURL(blob));
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileContents, fileUrl]);

  return fileUrl;
}
export default usePDFObjectUrl;
