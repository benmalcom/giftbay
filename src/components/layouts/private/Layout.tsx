import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import SidebarContent from './SidebarContent';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex h="100vh" w="full">
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', xl: 'flex' }}
      />
      <Flex h="full" w="f" flex={1} flexDir="column">
        <NavBar onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
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
}
