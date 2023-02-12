import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  ChakraProvider,
  Flex,
  useMediaQuery,
  AlertIcon,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PageSpinner } from 'components/common';
import { ResumeContextProvider } from 'components/contexts/ResumeContext';
import { NavBar } from 'components/layouts';
import RefreshTokenHandler from 'components/RefreshTokenHandler';
import blankResume from 'data/blankResume.json';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
import theme from 'styles/theme';
import { toastOptions } from 'styles/toaster';
import 'styles/override.scss';
import { ResumeType } from 'types/resume';
import { User } from 'types/user';

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Layout?: React.FC<any>;
};

type AppPropsWithLayout = AppProps<Record<string, Session>> & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [clientLoaded, setClientLoaded] = useState(false);
  const [isGsspLoading, setIsGsspLoading] = useState(false);
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');
  const isGeneratePDFPage = useIsPDFGeneratePage();

  const Layout = Component.Layout ?? React.Fragment;
  useEffect(() => {
    setClientLoaded(true);
  }, []);

  useEffect(() => {
    const start = () => {
      setIsGsspLoading(true);
    };
    const end = () => {
      setIsGsspLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  if (!clientLoaded || isGsspLoading) return <PageSpinner />;
  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={toastOptions}
      />
      {!isLargerThan767 && !isGeneratePDFPage ? (
        <Alert status="error" flexDirection="column" w="96%" m="30px auto">
          <Flex>
            <AlertIcon />
            <AlertTitle>Mobile device not supported!</AlertTitle>
          </Flex>
          <AlertDescription>
            For a rich experience, you will only be able to access this
            application on a tablet, laptop or desktop.
          </AlertDescription>
        </Alert>
      ) : (
        <SessionProvider session={pageProps.session}>
          <ResumeContextProvider initialResume={blankResume as ResumeType}>
            <Flex flexDirection="column" height="100%">
              <NavBar user={pageProps?.user as unknown as User} />
              <Box flex={1} paddingTop={isGeneratePDFPage ? 0 : '65px'}>
                <Layout>
                  <Component {...pageProps} />
                  <RefreshTokenHandler />
                </Layout>
              </Box>
            </Flex>
          </ResumeContextProvider>
        </SessionProvider>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
