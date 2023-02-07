/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import {
  Heading,
  Text,
  Flex,
  PopoverTrigger,
  Button,
  PopoverHeader,
  PopoverCloseButton,
  PopoverContent,
  PopoverBody,
  Portal,
  Popover,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { ResumeContextType } from 'components/contexts';
import { EditableLabel } from 'components/form';
import { ModalManager as CandidateInformationModalManager } from 'components/resume/CandidateInformationModal';
import ContactsAndLinks from 'components/resume/ContactsAndLinks';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import { ModalTriggerFunctionProps } from 'types/resume';
import { isBlankResume } from 'utils/functions';
import Section from './Section';

export const Resume: React.FC<
  Pick<
    ResumeContextType,
    'resume' | 'removeSection' | 'updateSection' | 'setCandidate'
  >
> = ({ resume, removeSection, updateSection, setCandidate }) => {
  const isGeneratePDF = useIsPDFGeneratePage();
  const initRef = useRef();

  const hasName = !!resume!.candidate?.name;
  const hasHeadline = !!resume!.candidate?.headline;
  const hasSummary = !!resume!.candidate?.summary;
  const hasContactsAndLinks = !!resume!.candidate?.contactsAndLinks;
  const isResumeBlank = isBlankResume(resume);

  return (
    <Flex
      width={isGeneratePDF ? 'full' : '950px'}
      id="resume"
      zIndex={4}
      sx={{
        '@media screen, print': {
          height: 'fit-content',
          flexDir: 'column',
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
        },
        '@media screen': {
          boxShadow:
            '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        '@media screen and (max-width: 834px)': {
          width: '100%',
        },
      }}
      p={isResumeBlank ? '10px' : '40px 48px'}
    >
      {isResumeBlank ? (
        <Alert status="warning">
          <AlertIcon />
          Start building up your resume. Use the controls section on the left to
          flesh up your resume.
        </Alert>
      ) : (
        <>
          <Popover
            closeOnBlur={false}
            placement="left"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            initialFocusRef={initRef}
          >
            {({ onClose }) => (
              <>
                <PopoverTrigger>
                  <Button
                    size="xs"
                    mr="10px"
                    top="0"
                    right="-10px"
                    position="absolute"
                    borderRadius={0}
                    display="none"
                  >
                    <AiOutlineMenu />
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverHeader>Candidate Information</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody py="10px">
                      <CandidateInformationModalManager
                        triggerFunc={({
                          trigger,
                          ...rest
                        }: ModalTriggerFunctionProps) => (
                          <Button
                            className="candidate-ctas"
                            size="xs"
                            {...rest}
                            onClick={() => {
                              trigger();
                              onClose();
                            }}
                            mr="10px"
                          >
                            Job Role
                          </Button>
                        )}
                        onSave={() => console.log('')}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>

          {hasName && (
            <EditableLabel
              displayNode={Heading}
              text={resume!.candidate?.name}
              onChange={value => setCandidate({ name: value })}
              showRemoveButton
              onRemove={() => setCandidate({ name: '' })}
              displayNodeProps={{
                sx: {
                  fontSize: '24pt',
                  color: resume.settings.colors.accent,
                  marginBottom: '6px',
                  fontWeight: 400,
                  fontFamily: 'Verdana, Ariel',
                  '@media print': {
                    fontSize: '21pt',
                  },
                },
              }}
            />
          )}
          {hasHeadline && (
            <EditableLabel
              displayNode={Text}
              text={resume!.candidate?.headline}
              onChange={value => setCandidate({ headline: value })}
              showRemoveButton
              onRemove={() => setCandidate({ headline: '' })}
              displayNodeProps={{
                sx: {
                  fontSize: '13pt',
                  fontWeight: 400,
                  color: resume.settings.colors.candidateHeadline,
                  '@media print': {
                    fontSize: '12pt',
                  },
                },
              }}
            />
          )}
          {hasContactsAndLinks && (
            <ContactsAndLinks
              onSave={values => setCandidate({ contactsAndLinks: values })}
              contactsAndLinks={resume!.candidate?.contactsAndLinks}
              showRemoveButton
              onRemove={() => setCandidate({ contactsAndLinks: undefined })}
              color={resume.settings.colors.candidateContactsAndLinks}
            />
          )}
          {hasSummary && (
            <EditableLabel
              displayNode={Text}
              text={resume!.candidate?.summary}
              onChange={value => setCandidate({ summary: value })}
              showRemoveButton
              onRemove={() => setCandidate({ summary: '' })}
              displayNodeProps={{
                sx: {
                  margin: '10pt 0',
                  fontWeight: 400,
                  fontSize: '11.5pt',
                  color: resume.settings.colors.common,
                  '@media print': {
                    fontSize: '11pt',
                  },
                },
              }}
            />
          )}
          {resume.sections.map(section => (
            <Section
              settings={resume.settings}
              key={section.id}
              section={section}
              removeSection={removeSection}
              updateSection={updateSection}
            />
          ))}
        </>
      )}
    </Flex>
  );
};

Resume.displayName = 'Resume';

export default Resume;
