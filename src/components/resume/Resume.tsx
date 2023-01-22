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
  addSection(): void;
  updateSection(section: SectionType): void;
  removeSection(id: string): void;
};
export const Resume: React.FC<ResumeProps> = ({
  resume,
  removeSection,
  updateSection,
  addSection,
  setCandidate,
}) => {
  useEffect(() => {
    if (!resume) return;
  }, [resume]);

  return (
    <Flex
      flexDir="column"
      boxSizing="border-box"
      w="950px"
      p="0.5in"
      boxShadow="sm"
      bg="white"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      <EditableLabel
        displayNode={Heading}
        text={resume!.candidate?.name}
        onChange={value => setCandidate({ name: value })}
        displayNodeProps={{
          fontSize: '24pt',
          color: '#84210c',
        }}
      />
      <EditableLabel
        displayNode={Text}
        text={resume!.candidate?.headline}
        onChange={value => setCandidate({ headline: value })}
        displayNodeProps={{
          fontSize: '14pt',
          fontWeight: 500,
          color: '#717276',
        }}
      />
      <ContactsAndLinks
        onSave={values => setCandidate({ contactsAndLinks: values })}
        contactsAndLinks={resume!.candidate?.contactsAndLinks}
      />
      {resume.sections.map(section => (
        <Section
          key={section.id}
          section={section}
          removeSection={removeSection}
          updateSection={updateSection}
          addSection={addSection}
        />
      ))}
    </Flex>
  );
};

export default Resume;
