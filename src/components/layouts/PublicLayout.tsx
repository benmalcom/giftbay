import { Flex } from '@chakra-ui/react';
import React from 'react';
import { User } from 'types/user';
import Footer from './Footer';
import NavBar from './NavBar';

type LayoutProps = {
  children: React.ReactNode;
  user?: User;
};
export const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex w="full" h="full" align="center" flexDir="column">
      <NavBar />
      <Flex flex={1} w="full">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default PublicLayout;
