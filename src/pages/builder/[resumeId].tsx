import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Flex, IconProps, useDisclosure } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HeaderTags, PageSpinner } from 'components/common';
import { Resume, Controls } from 'components/resume';
import blankResume from 'data/blankResume.json';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import useResumeContext from 'hooks/useResumeContext';
import useResumeDownload from 'hooks/useResumeDownload';
import { generatePDF, getResumeById, updateResume } from 'services/resume';
import { ResumeData } from 'types/resume';
import {
  arrayBufferToBase64,
  objectToBase64,
  objFromBase64,
} from 'utils/functions';
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
  const [fileName, setFileName] = useState('');
  const { downloadResume } = useResumeDownload();
  const { isOpen: isActiveControls, onToggle: toggleControls } =
    useDisclosure();
  const { resumeId } = router.query;

  const fetchResume = useCallback(
    (abortSignal: AbortSignal) => {
      setInGetFlight(true);
      // @ts-ignore: Make it undefined for loading purpose
      setResume(undefined);
      const { resumeId } = router.query;
      getResumeById(
        resumeId as string,
        isGeneratePDFPage ? { forPDFGen: true } : null,
        abortSignal
      )
        .then(({ data }: AxiosResponse<ResumeData>) => {
          if (data.contents) {
            const resume = objFromBase64(data.contents);
            setResume(resume);
          } else {
            setResume(blankResume);
          }
        })
        .catch(err => {
          err?.code !== 'ERR_CANCELED' && console.log('err ', err);
        })
        .finally(() => setInGetFlight(false));
    },
    [isGeneratePDFPage, router.query, setResume]
  );

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchResume(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  const onGenerate = () => {
    setIsGeneratingPDF(true);
    generatePDF(resumeId as string)
      .then(({ data }) => {
        downloadResume(data, fileName ?? 'resume');
        setIsGeneratingPDF(false);
        setIsSavingResume(true);
        return updateResume(resumeId as string, {
          contents: objectToBase64(resume),
          fileContents: arrayBufferToBase64(data),
        });
      })
      .then(() => setIsSavingResume(false))
      .catch(err => {
        toast.error(err.message);
        setIsGeneratingPDF(false);
        setIsSavingResume(false);
      });
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

  const onChangeFileName = (e: React.FormEvent<HTMLInputElement>) =>
    setFileName(e.currentTarget.value);

  if (inGetFlight || !resume) return <PageSpinner />;

  const mobileControlsIconStyles = {
    position: 'absolute',
    left: 4,
    top: 4,
    cursor: 'pointer',
    display: 'none',
    onClick: toggleControls,
    sx: {
      '@media (min-width: 768px) and (max-width: 1024px)': {
        display: 'block',
      },
    },
  } as IconProps;

  return (
    <>
      <HeaderTags
        title={`${process.env.NEXT_PUBLIC_APP_NAME} - ${resume.candidate?.name} Resume builder`.trim()}
      />

      <Flex
        gap={isGeneratePDFPage ? undefined : 3}
        justify="center"
        position="relative"
      >
        {isActiveControls ? (
          <CloseIcon
            {...mobileControlsIconStyles}
            fontSize="20px"
            color="red.800"
          />
        ) : (
          <HamburgerIcon {...mobileControlsIconStyles} fontSize="30px" />
        )}
        <Flex
          position="relative"
          gap={4}
          height="max-content"
          boxSizing="border-box"
          my={isGeneratePDFPage ? undefined : 14}
        >
          <Controls
            isActiveControls={isActiveControls}
            toggleControls={toggleControls}
            fileName={fileName}
            onChangeFileName={onChangeFileName}
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
    </>
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
