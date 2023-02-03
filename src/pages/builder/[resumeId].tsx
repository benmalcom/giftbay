import { Flex } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { PageSpinner } from 'components/index';
import { Resume, Controls } from 'components/resume';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import useResumeContext from 'hooks/useResumeContext';
import useResumeDownload from 'hooks/useResumeDownload';
import { generatePDF, getResumeById, updateResume } from 'services/resume';
import { ResumeData } from 'types/resume';
import { objectToBase64, objFromBase64 } from 'utils/functions';
import { withAuthServerSideProps } from 'utils/serverSideProps';

export const Builder = () => {
  const {
    resume,
    updateSection,
    setCandidate,
    removeSection,
    setResume,
    addSection,
    updateResumeSettings,
  } = useResumeContext();
  const isGeneratePDFPage = useIsPDFGeneratePage();
  const [inGetFlight, setInGetFlight] = useState(true);
  const router = useRouter();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSavingResume, setIsSavingResume] = useState(false);
  const { downloadResume } = useResumeDownload();
  const { resumeId } = router.query;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchResume(signal);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const fetchResume = useCallback(
    (abortSignal: AbortSignal) => {
      setInGetFlight(true);
      const { resumeId } = router.query;
      getResumeById(resumeId as string, abortSignal)
        .then(({ data }: AxiosResponse<ResumeData>) => {
          if (data.contents) {
            const resume = objFromBase64(data.contents);
            setResume(resume);
          }
        })
        .catch(err => {
          console.log('err ', err);
        })
        .finally(() => setInGetFlight(false));
    },
    [router.query, setResume]
  );

  console.log('resume ', resume);

  const onGenerate = () => {
    setIsGeneratingPDF(true);
    updateResume(resumeId as string, {
      contents: objectToBase64(resume),
    })
      .then(({ data }) => {
        if (data.contents) {
          const resume = objFromBase64(data.contents);
          setResume(resume);
        }
        return generatePDF(data.id);
      })
      .then(({ data }) => {
        downloadResume(data, 'resume');
      })
      .catch(err => console.log('Error ', err))
      .finally(() => setIsGeneratingPDF(false));
  };

  const onSaveResume = () => {
    setIsSavingResume(true);
    updateResume(resumeId as string, {
      contents: objectToBase64(resume),
    })
      .then(({ data }) => {
        if (data.contents) {
          const resume = objFromBase64(data.contents);
          setResume(resume);
        }
      })
      .catch(err => console.log('Error ', err))
      .finally(() => setIsSavingResume(false));
  };

  if (inGetFlight) return <PageSpinner />;

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
          addSection={addSection}
          updateResumeSettings={updateResumeSettings}
          onSaveResume={onSaveResume}
          isSavingResume={isSavingResume}
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

export default Builder;

export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Edit Resume',
    },
  };
});
