import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type SubHeaderProps = {
  children: ReactNode;
};
const SubHeader: React.FC<SubHeaderProps> = ({ children }) => {
  return (
    <Flex
      w="full"
      minH="30px"
      as="nav"
      align="center"
      p={2}
      bg="white"
      shadow="sm"
    >
      {children}
    </Flex>
  );
};

export default SubHeader;
