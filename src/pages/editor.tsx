import { Container, VStack } from '@chakra-ui/react';
import React from 'react';
import { EditorLayout } from 'components/layouts';
import { Resume, Controls } from 'components/resume';
import { ResumeContextProvider } from 'components/ResumeContext';
import resumeSample from 'data/resume.json';
import useResumeContext from 'hooks/useResumeContext';
import { withAuthServerSideProps } from 'utils/serverSideProps';

export const Editor = () => {
  const { resume, updateSection, setCandidate, removeSection } =
    useResumeContext();

  return (
    <Container
      maxW="7xl"
      px={{ base: '0', sm: '8' }}
      h="fit-content"
      justifyContent="center"
    >
      <Resume
        resume={resume}
        updateSection={updateSection}
        setCandidate={setCandidate}
        removeSection={removeSection}
      />
    </Container>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

const EnhancedEditorLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <EditorLayout>
      <ResumeContextProvider initialResume={resumeSample}>
        <VStack spacing={4}>
          <Controls />
          {children}
        </VStack>
      </ResumeContextProvider>
    </EditorLayout>
  );
};

Editor.Layout = EnhancedEditorLayout;
export default Editor;

export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Edit Resume',
    },
  };
});
