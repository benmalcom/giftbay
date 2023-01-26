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
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
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
import Section from './Section';

type ResumeProps = {
  resume: ResumeType;
  setCandidate(candidate: Partial<Candidate>): void;
  updateSection(section: SectionType): void;
  removeSection(id: string): void;
};
export const Resume: React.FC<ResumeProps> = ({
  resume,
  removeSection,
  updateSection,
  setCandidate,
}) => {
  const initRef = useRef();

  useEffect(() => {
    if (!resume) return;
  }, [resume]);

  const hasName = !!resume!.candidate?.name;
  const hasHeadline = !!resume!.candidate?.headline;
  const hasSummary = !!resume!.candidate?.summary;
  const hasContactsAndLinks = !!resume!.candidate?.contactsAndLinks;

  return (
    <Flex
      id="resume"
      sx={{
        '@media screen, print': {
          width: '100%',
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
      }}
      p="40px 48px"
    >
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
              fontSize: '15pt',
              fontWeight: 400,
              color: resume.settings.colors.common,
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
              fontSize: '20px',
              fontWeight: 400,
              color: resume.settings.colors.common,
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
    </Flex>
  );
};

Resume.displayName = 'Resume';

export default Resume;
