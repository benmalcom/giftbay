import {
  Flex,
  Button,
  Heading,
  Divider,
  Stack,
  Badge,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import InputColor from 'react-input-color';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import useResumeContext from 'hooks/useResumeContext';
import { Candidate, ModalTriggerFunctionProps, ResumeType } from 'types/resume';
import { ModalManager as AddSectionModalManager } from './AddSectionModal';
import { ModalManager as CandidateInformationModalManager } from './CandidateInformationModal';

type ControlsProps = {
  onGenerate(): void;
  isGeneratingPDF?: boolean;
  setCandidate(values: Partial<Candidate>): void;
  resume: ResumeType;
};
export const Controls: React.FC<ControlsProps> = ({
  onGenerate,
  isGeneratingPDF,
  setCandidate,
  resume,
}) => {
  const { addSection, updateResumeSettings } = useResumeContext();
  const generatePDF = useIsPDFGeneratePage();

  if (generatePDF) return null;
  return (
    <Stack
      boxSizing="border-box"
      p={4}
      boxShadow="md"
      bg="white"
      w="300px"
      h="fit-content"
      position="static"
      spacing={7}
    >
      <Stack spacing={3}>
        <Heading as="h5" size="sm" color="muted">
          Actions{' '}
        </Heading>
        <Divider />
        <Flex w="full" justify="space-around">
          <CandidateInformationModalManager
            onSave={values => setCandidate(values)}
            initialValues={resume.candidate}
            triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
              <Button
                size="sm"
                colorScheme="gray"
                {...rest}
                onClick={() => trigger()}
              >
                Candidate Bio
              </Button>
            )}
          />

          <Button size="sm" onClick={onGenerate} isLoading={isGeneratingPDF}>
            <AiFillFilePdf color="red" style={{ marginRight: '2px' }} />
            Generate PDF
          </Button>
        </Flex>
      </Stack>
      <Stack spacing={4}>
        <Heading as="h5" size="sm">
          Sections
        </Heading>
        <Divider />

        <Stack direction="row">
          {resume.sections.map(section => (
            <Badge key={section.id} textTransform="capitalize">
              {section.name}
            </Badge>
          ))}
        </Stack>
        <AddSectionModalManager
          onSave={values => addSection(values.name)}
          triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
            <Button
              size="sm"
              colorScheme="teal"
              {...rest}
              onClick={() => trigger()}
            >
              New Section
            </Button>
          )}
        />
      </Stack>

      <Stack spacing={4}>
        <Heading as="h5" size="sm">
          Settings
        </Heading>
        <Divider />
        <Flex align="center">
          <Text mr={3}>Accent Color: </Text>
          <InputColor
            initialValue={resume.settings.colors.accent}
            onChange={color =>
              updateResumeSettings({
                colors: { ...resume.settings.colors, accent: color.hex },
              })
            }
            placement="right"
          />
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Controls;
