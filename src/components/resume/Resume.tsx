/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { Heading, Text, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { EditableLabel } from 'components/form';
import ContactsAndLinks from 'components/resume/ContactsAndLinks';
import { Candidate, ResumeType, SectionType } from 'types/resume';
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
  useEffect(() => {
    if (!resume) return;
  }, [resume]);

  const hasName = !!resume!.candidate?.name;
  const hasHeadline = !!resume!.candidate?.headline;
  const hasSummary = !!resume!.candidate?.summary;
  const hasContactsAndLinks = !!resume!.candidate?.contactsAndLinks;

  return (
    <Flex
      flexDir="column"
      boxSizing="border-box"
      w="950px"
      p="0.5in"
      boxShadow="sm"
      bg="white"
      fontFamily="Roboto, Arial, Helvetica, sans-serif"
    >
      {hasName && (
        <EditableLabel
          displayNode={Heading}
          text={resume!.candidate?.name}
          onChange={value => setCandidate({ name: value })}
          showRemoveButton
          onRemove={() => setCandidate({ name: '' })}
          displayNodeProps={{
            fontSize: '24pt',
            color: '#84210c',
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
            fontSize: '15pt',
            fontWeight: 400,
            color: '#717276',
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
      {resume.sections.map(section => (
        <Section
          key={section.id}
          section={section}
          removeSection={removeSection}
          updateSection={updateSection}
        />
      ))}
    </Flex>
  );
};

export default Resume;
