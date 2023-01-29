import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ResumeContextProvider } from 'components/contexts/ResumeContext';
import { Resume, Controls } from 'components/resume';
import resumeSample from 'data/resume.json';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import useResumeContext from 'hooks/useResumeContext';
import { generatePDF } from 'services/resume';
import { ResumeType } from 'types/resume';
import { withAuthServerSideProps } from 'utils/serverSideProps';

export const Builder = () => {
  const { resume, updateSection, setCandidate, removeSection } =
    useResumeContext();
  const router = useRouter();
  const isGeneratePDF = useIsPDFGeneratePage();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const onGenerate = () => {
    setIsGeneratingPDF(true);
    const { resumeId } = router.query;
    generatePDF(resumeId as string)
      .then(({ data }) => {
        const blob = new Blob([data as unknown as BlobPart], {
          type: 'application/pdf',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `file-${+new Date()}.pdf`;
        link.click();
        window.URL.revokeObjectURL(data as unknown as string);
        link.remove();
      })
      .catch(err => console.log('Error ', err))
      .finally(() => setIsGeneratingPDF(false));
  };

  return (
    <VStack
      spacing={4}
      width={isGeneratePDF ? 'full' : '950px'}
      height="max-content"
      boxSizing="border-box"
      margin="0 auto"
    >
      <Controls onGenerate={onGenerate} isGeneratingPDF={isGeneratingPDF} />
      <Resume
        resume={resume}
        updateSection={updateSection}
        setCandidate={setCandidate}
        removeSection={removeSection}
      />
    </VStack>
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
