import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import useResumeContext from 'hooks/useResumeContext';
import { ModalTriggerFunctionProps } from 'types/resume';
import { ModalManager as AddSectionModalManager } from './AddSectionModal';

type ControlsProps = {
  onGenerate(): void;
};
export const Controls: React.FC<ControlsProps> = ({ onGenerate }) => {
  const { addSection } = useResumeContext();
  const generatePDF = useIsPDFGeneratePage();
  if (generatePDF) return null;
  return (
    <Flex
      boxSizing="border-box"
      w="950px"
      my={8}
      p={4}
      boxShadow="md"
      bg="white"
      justify="space-between"
    >
      <Flex>
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
      </Flex>
      <Button size="sm" onClick={onGenerate}>
        <AiFillFilePdf color="red" style={{ marginRight: '2px' }} />
        Generate PDF
      </Button>
    </Flex>
  );
};

export default Controls;
