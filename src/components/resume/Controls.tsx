import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import useResumeContext from 'hooks/useResumeContext';
import { ModalTriggerFunctionProps } from 'types/resume';
import { ModalManager as AddSectionModalManager } from './AddSectionModal';

export const Controls = () => {
  const { addSection } = useResumeContext();
  return (
    <Flex
      boxSizing="border-box"
      w="950px"
      my={8}
      p={4}
      boxShadow="md"
      bg="white"
    >
      <Flex>
        <AddSectionModalManager
          onSave={values => addSection(values.name)}
          triggerFunc={(props: ModalTriggerFunctionProps) => (
            <Button size="sm" {...props} onClick={() => props.trigger()}>
              New Section
            </Button>
          )}
        />
      </Flex>
    </Flex>
  );
};

export default Controls;
