import { Flex, useDisclosure } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from 'contexts/UserProvider';
import NavBar from './NavBar';

type LayoutProps = {
  children: React.ReactNode;
};
export const HorizontalLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useContext(UserContext);

  return (
    <Flex w="full" h="full" align="center" flexDir="column">
      <NavBar
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        layoutOrientation="horizontal"
        user={user!}
      />
      <Flex flex={1} w="full" mb={{ base: '50px', md: '30px' }}>
        {children}
      </Flex>
    </Flex>
  );
};

export default HorizontalLayout;
