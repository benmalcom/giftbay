import { CircularProgress, Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const PageSpinner = (props: FlexProps) => (
  <Flex {...props} w="full" justify="center">
    <CircularProgress isIndeterminate color="purple.300" mt="50px" />
  </Flex>
);

export default PageSpinner;
