import { VStack } from '@chakra-ui/react';
import React from 'react';
import { BuilderLayout } from 'components/layouts';
import { Resume, Controls } from 'components/resume';
import { ResumeContextProvider } from 'components/ResumeContext';
import resumeSample from 'data/resume.json';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import useResumeContext from 'hooks/useResumeContext';
import { generatePDF } from 'services/resume';
import { ResumeType } from 'types/resume';
import { withAuthServerSideProps } from 'utils/serverSideProps';

export const Builder = () => {
  const { resume, updateSection, setCandidate, removeSection } =
    useResumeContext();
  const isGeneratePDF = useIsPDFGeneratePage();

  const onGenerate = () => {
    generatePDF()
      .then(data => {
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
      .catch(err => console.log('Error ', err));
  };

  return (
    <VStack
      spacing={4}
      width={isGeneratePDF ? 'full' : '950px'}
      height="max-content"
      boxSizing="border-box"
    >
      <Controls onGenerate={onGenerate} />
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
    <BuilderLayout>
      <ResumeContextProvider initialResume={resumeSample as ResumeType}>
        {children}
      </ResumeContextProvider>
    </BuilderLayout>
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
