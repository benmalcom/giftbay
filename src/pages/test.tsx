import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import * as React from 'react';
import { useState } from 'react';
import { EditableLabel } from 'components/form';

export const VerifyEmail = () => {
  const [text, setText] = useState('hello');

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <EditableLabel
          isEditable={true}
          displayNode={Text}
          text={text}
          onChange={value => setText(value)}
          showRemoveButton
          onRemove={() => setText('')}
          displayNodeProps={{
            sx: {
              fontSize: '14pt',
              fontWeight: 400,
              '@media print': {
                fontSize: '13pt',
              },
            },
          }}
        />
      </Stack>
    </Container>
  );
};

export default VerifyEmail;
