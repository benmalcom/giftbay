import { useEffect, useState } from 'react';

function useResumeDownload() {
  const [fileConfig, setFileConfig] = useState<
    | {
        fileContents: ArrayBuffer;
        fileName?: string;
      }
    | undefined
  >();

  useEffect(() => {
    if (!fileConfig?.fileContents) return;
    const blob = new Blob([fileConfig.fileContents as unknown as BlobPart], {
      type: 'application/pdf',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-chef/${
      fileConfig.fileName
    }-${new Date().getTime()}.pdf`;
    link.click();
    link.remove();
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [fileConfig]);

  /*
   * @function downloadResume
   * @param {ArrayBuffer} fileContents - A base64 encoded string
   * @param {string} fileName - Proposed name of the pdf file
   * @return {void}
   * */
  const downloadResume = (fileContents: ArrayBuffer, fileName: string) => {
    setFileConfig({
      fileContents,
      fileName,
    });
  };

  return { downloadResume };
}
export default useResumeDownload;
