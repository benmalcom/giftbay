import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode, useContext } from 'react';
import { UserContext } from 'contexts/UserProvider';
import NavBar from './NavBar';
import SidebarContent from './SidebarContent';

const VerticalLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useContext(UserContext);

  return (
    <Flex h="100vh" w="full">
      <SidebarContent
        user={user!}
        onClose={onClose}
        display={{ base: 'none', xl: 'flex' }}
      />
      <Flex h="full" w="f" flex={1} flexDir="column">
        <NavBar
          onClose={onClose}
          isOpen={isOpen}
          onOpen={onOpen}
          layoutOrientation="vertical"
          user={user!}
        />
        <Box
          p={{ base: '25px 5px', md: '20px' }}
          flex={1}
          boxSizing="border-box"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default VerticalLayout;
