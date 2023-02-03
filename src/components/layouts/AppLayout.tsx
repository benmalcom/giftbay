import { Stack } from '@chakra-ui/react';
import React from 'react';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import NavBar from './NavBar';

type LayoutProps = {
  children: React.ReactNode;
};
export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const generatePDF = useIsPDFGeneratePage();
  return (
    <Stack w="full" align="center">
      {!generatePDF && <NavBar />}
      {children}
    </Stack>
  );
};

export default AppLayout;
