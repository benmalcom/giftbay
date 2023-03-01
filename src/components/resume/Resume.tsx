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
  AlertTitle,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { EditableLabel } from 'components/form';
import { ModalManager as CandidateInformationModalManager } from 'components/resume/CandidateInformationModal';
import ContactsAndLinks from 'components/resume/ContactsAndLinks';
import {
  Candidate,
  ModalTriggerFunctionProps,
  ResumeType,
  SectionType,
} from 'types/resume';
import { isBlankResume } from 'utils/functions';
import Section from './Section';

type ResumeProps = {
  isEditable?: boolean;
  resume: ResumeType;
  setCandidate?(candidate: Partial<Candidate>): void;
  updateSection?(section: SectionType): void;
  removeSection?(id: string): void;
};
export const Resume: React.FC<ResumeProps> = ({
  resume,
  removeSection,
  updateSection,
  setCandidate,
  isEditable = false,
}) => {
  const initRef = useRef();

  const hasName = !!resume!.candidate?.name;
  const hasHeadline = !!resume!.candidate?.headline;
  const hasContactsAndLinks = !!resume!.candidate?.contactsAndLinks;
  const isResumeBlank = isBlankResume(resume);

  return (
    <Flex
      width="950px"
      id="resume"
      zIndex={4}
      sx={{
        '@media screen, print': {
          height: 'fit-content',
          flexDir: 'column',
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          fontFamily: 'Arial, Helvetica, sans-serif',
        },
        '@media screen': {
          boxShadow:
            '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        '@media screen and (max-width: 834px)': {
          width: '100%',
        },
      }}
      p={isResumeBlank ? '10px' : '40px 60px'}
    >
      {isResumeBlank ? (
        <Alert status="warning" flexDir="column" py={5}>
          <Flex>
            <AlertIcon />
            <AlertTitle fontSize="lg">Resume is empty!</AlertTitle>
          </Flex>
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
              isEditable={isEditable}
              displayNode={Heading}
              text={resume!.candidate?.name}
              onChange={value => setCandidate?.({ name: value })}
              showRemoveButton
              onRemove={() => setCandidate?.({ name: '' })}
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
              isEditable={isEditable}
              displayNode={Text}
              text={resume!.candidate?.headline}
              onChange={value => setCandidate?.({ headline: value })}
              showRemoveButton
              onRemove={() => setCandidate?.({ headline: '' })}
              displayNodeProps={{
                sx: {
                  fontSize: '14pt',
                  fontWeight: 400,
                  color: resume.settings.colors.candidateHeadline,
                  '@media print': {
                    fontSize: '13pt',
                  },
                },
              }}
            />
          )}
          {hasContactsAndLinks && (
            <ContactsAndLinks
              isEditable={isEditable}
              onSave={values => setCandidate?.({ contactsAndLinks: values })}
              contactsAndLinks={resume!.candidate?.contactsAndLinks}
              showRemoveButton
              onRemove={() => setCandidate?.({ contactsAndLinks: undefined })}
              color={resume.settings.colors.candidateHeadline}
            />
          )}
          {resume.sections.map(section => (
            <Section
              isEditable={isEditable}
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
