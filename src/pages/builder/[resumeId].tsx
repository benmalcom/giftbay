import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Alert,
  Flex,
  IconProps,
  useDisclosure,
  usePrevious,
} from '@chakra-ui/react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { AxiosResponse } from 'axios';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { HeaderTags, PageSpinner } from 'components/common';
import { Controls, ResumeDownloadable } from 'components/resume';
import blankResume from 'data/blankResume.json';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import useResumeContext from 'hooks/useResumeContext';
import { getResumeById, updateResume } from 'services/resume';
import { ResumeData } from 'types/resume';

import { User } from 'types/user';
import { objectToBase64, objFromBase64 } from 'utils/functions';
import { withAuthServerSideProps } from 'utils/serverSideProps';

type BuilderProps = {
  user: User;
};
export const Builder: React.FC<BuilderProps> = ({ user }) => {
  const {
    resume,
    setCandidate,
    setResume,
    addSection,
    updateResumeSettings,
    updateSection,
    removeSection,
  } = useResumeContext();
  const isGeneratePDFPage = useIsPDFGeneratePage();
  const [inGetFlight, setInGetFlight] = useState(true);
  const router = useRouter();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSavingResume, setIsSavingResume] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const { isOpen: isActiveControls, onToggle: toggleControls } =
    useDisclosure();
  const pdfExportComponent = React.useRef<PDFExport>(null);

  const { resumeId } = router.query;

  const prevResume = usePrevious(resume);

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
          setResumeName(data.name ?? '');
        })
        .catch(err => {
          err?.code !== 'ERR_CANCELED' && console.log('err ', err);
        })
        .finally(() => setInGetFlight(false));
    },
    [isGeneratePDFPage, router.query, setResume]
  );

  const onSaveResume = () => {
    setIsSavingResume(true);
    const payload: Partial<ResumeData> = {
      contents: objectToBase64(resume),
    };
    if (resumeName) payload.name = resumeName;
    updateResume(resumeId as string, payload)
      .then(({ data }) => {
        if (data.contents) {
          const resume = objFromBase64(data.contents);
          setResume(resume);
        }
      })
      .catch(err => console.log('Error ', err))
      .finally(() => setIsSavingResume(false));
  };

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
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
    setIsGeneratingPDF(false);
  };

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) =>
    setResumeName(e.currentTarget.value);

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

      <Flex gap={3} justify="center" position="relative">
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
          my={14}
        >
          <Controls
            isActiveControls={isActiveControls}
            toggleControls={toggleControls}
            resumeName={resumeName}
            onChangeName={onChangeName}
            onGenerate={onGenerate}
            isGeneratingPDF={isGeneratingPDF}
            setCandidate={setCandidate}
            resume={resume}
            addSection={addSection}
            updateResumeSettings={updateResumeSettings}
            onSaveResume={onSaveResume}
            isSavingResume={isSavingResume}
          />
          <Flex flexDir="column">
            {!!resume && !!prevResume && !isEqual(resume, prevResume) && (
              <Alert status="warning" flexDir="column" py={1}>
                Save your changes.
              </Alert>
            )}
            <ResumeDownloadable
              ref={pdfExportComponent}
              user={user}
              resume={resume}
              isEditable
              removeSection={removeSection}
              setCandidate={setCandidate}
              updateSection={updateSection}
              onSaveResume={onSaveResume}
            />
          </Flex>
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
