import { Stack } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';

type LayoutProps = {
  children: React.ReactNode;
};
export const EditorLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Stack w="full" align="center">
      <NavBar />
      {children}
    </Stack>
  );
};

export default EditorLayout;
