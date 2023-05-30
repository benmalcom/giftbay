import { Flex } from '@chakra-ui/react';
import React from 'react';

const SubHeader = () => {
  return (
    <Flex
      w="full"
      minH="30px"
      borderBottom="1px solid"
      borderBottomColor="rgba(0, 0, 0, .1)"
      as="nav"
      align="center"
      px={5}
      bg="gray.50"
      shadow="sm"
    ></Flex>
  );
};

export default SubHeader;
