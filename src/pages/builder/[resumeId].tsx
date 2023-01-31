import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ResumeContextProvider } from 'components/contexts/ResumeContext';
import { Resume, Controls } from 'components/resume';
import resumeSample from 'data/resume.json';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import useResumeContext from 'hooks/useResumeContext';
import { generatePDF, updateResume } from 'services/resume';
import { ResumeType } from 'types/resume';
import { arrayBufferToBase64, objectToBase64 } from 'utils/functions';
import { withAuthServerSideProps } from 'utils/serverSideProps';

export const Builder = () => {
  const { resume, updateSection, setCandidate, removeSection } =
    useResumeContext();
  const isGeneratePDFPage = useIsPDFGeneratePage();
  const router = useRouter();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    return () => {
      const { resumeId } = router.query;
      updateResume(resumeId as string, {
        contents: objectToBase64(resume),
      });
    };
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const onGenerate = () => {
    setIsGeneratingPDF(true);
    const { resumeId } = router.query;
    generatePDF(resumeId as string)
      .then(({ data }) => {
        console.log('data ', data);
        const blob = new Blob([data as unknown as BlobPart], {
          type: 'application/pdf',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `file-${+new Date()}.pdf`;
        link.click();
        window.URL.revokeObjectURL(data as unknown as string);
        link.remove();
        return updateResume(resumeId as string, {
          contents: objectToBase64(resume),
          fileContents: arrayBufferToBase64(data),
        });
      })
      .then(() => console.log('Success'))
      .catch(err => console.log('Error ', err))
      .finally(() => setIsGeneratingPDF(false));
  };

  return (
    <Flex gap={isGeneratePDFPage ? undefined : 3} justify="center">
      <Flex
        gap={4}
        height="max-content"
        boxSizing="border-box"
        my={isGeneratePDFPage ? undefined : 14}
      >
        <Controls
          onGenerate={onGenerate}
          isGeneratingPDF={isGeneratingPDF}
          setCandidate={setCandidate}
          resume={resume}
        />
        <Resume
          resume={resume}
          updateSection={updateSection}
          setCandidate={setCandidate}
          removeSection={removeSection}
        />
      </Flex>
    </Flex>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

const EnhancedBuilderLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ResumeContextProvider initialResume={resumeSample as ResumeType}>
      {children}
    </ResumeContextProvider>
  );
};

Builder.Layout = EnhancedBuilderLayout;
export default Builder;

export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Edit Resume',
    },
  };
});
