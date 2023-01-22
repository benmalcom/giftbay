import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import useResumeContext from 'hooks/useResumeContext';

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
        <Button size="sm" onClick={() => addSection()}>
          New Section
        </Button>
      </Flex>
    </Flex>
  );
};

export default Controls;
