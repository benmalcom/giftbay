import {
  Flex,
  Button,
  Heading,
  Divider,
  Stack,
  Badge,
  Text,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillFilePdf, AiOutlineUser } from 'react-icons/ai';
import InputColor from 'react-input-color';
import { ResumeContextType } from 'components/contexts';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import { ModalTriggerFunctionProps } from 'types/resume';
import { isBlankResume, isResumePDFReady } from 'utils/functions';
import { ModalManager as AddSectionModalManager } from './AddSectionModal';
import { ModalManager as CandidateInformationModalManager } from './CandidateInformationModal';

type ControlsProps = Pick<
  ResumeContextType,
  'resume' | 'addSection' | 'updateResumeSettings' | 'setCandidate'
> & {
  onGenerate(): void;
  onSaveResume(): void;
  isGeneratingPDF?: boolean;
  isSavingResume?: boolean;
  isActiveControls?: boolean;
  toggleControls(): void;
  onChangeFileName(e: React.FormEvent<HTMLInputElement>): void;
  fileName: string;
};
export const Controls: React.FC<ControlsProps> = ({
  onGenerate,
  isGeneratingPDF,
  setCandidate,
  resume,
  addSection,
  updateResumeSettings,
  onSaveResume,
  isSavingResume,
  onChangeFileName,
  fileName,
  isActiveControls,
  toggleControls,
}) => {
  const generatePDF = useIsPDFGeneratePage();
  const isReadyForPDF = isResumePDFReady(resume);
  const isResumeBlank = isBlankResume(resume);

  if (generatePDF) return null;

  return (
    <Stack
      boxSizing="border-box"
      p={4}
      boxShadow="md"
      bg="white"
      w="300px"
      h="fit-content"
      position="sticky"
      top="80px"
      spacing={7}
      zIndex={5}
      display="block"
      sx={{
        '@media (min-width: 1025px) and (max-width: 1280px) and (min-width: 1281px)':
          {
            display: 'block',
          },
        '@media (min-width: 768px) and (max-width: 1024px)': {
          display: isActiveControls ? 'block' : 'none',
          left: 1,
          top: 0,
          position: 'absolute',
          boxShadow: 'var(--chakra-shadows-lg)',
        },
      }}
    >
      <Stack spacing={3}>
        <Heading as="h5" size="sm" color="muted">
          Actions{' '}
        </Heading>
        <Divider />
        <Flex w="full" justify={isReadyForPDF ? 'space-around' : 'flex-start'}>
          <Button
            size="sm"
            colorScheme="teal"
            onClick={onSaveResume}
            isDisabled={isSavingResume || isResumeBlank}
          >
            {isSavingResume ? 'Saving...' : 'Save changes'}
          </Button>

          {isReadyForPDF && (
            <Button size="sm" onClick={onGenerate} isLoading={isGeneratingPDF}>
              <AiFillFilePdf color="red" style={{ marginRight: '2px' }} />
              Generate PDF
            </Button>
          )}
        </Flex>
      </Stack>
      <Stack spacing={3}>
        <Heading as="h5" size="sm" color="muted">
          Candidate
        </Heading>
        <Divider />
        <Flex w="full" columnGap={3}>
          <CandidateInformationModalManager
            onSave={values => setCandidate(values)}
            initialValues={resume.candidate}
            triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
              <Button
                size="sm"
                colorScheme="gray"
                {...rest}
                onClick={() => trigger()}
                leftIcon={<AiOutlineUser />}
              >
                Update Bio
              </Button>
            )}
          />
        </Flex>
      </Stack>
      <Stack spacing={4}>
        <Heading as="h5" size="sm">
          Sections
        </Heading>
        <Divider />

        <Flex gap={3} flexWrap="wrap">
          {resume.sections.map(section => (
            <Badge key={section.id} textTransform="capitalize" py={0.5}>
              {section.name}
            </Badge>
          ))}
        </Flex>
        <AddSectionModalManager
          onSave={values => addSection(values.name)}
          initialValues={undefined}
          triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
            <Button
              size="sm"
              colorScheme="orange"
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
        </Flex>{' '}
        <Stack>
          <Text mr={3}>File name: </Text>
          <Input
            placeholder="Resume file name (optional)"
            onChange={onChangeFileName}
            value={fileName}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Controls;
