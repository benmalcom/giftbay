import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ResumeContextProvider } from 'components/contexts/ResumeContext';
import { NavBar } from 'components/layouts';
import blankResume from 'data/blankResume.json';
import theme from 'styles/theme';
import { toastOptions } from 'styles/toaster';
import 'styles/override.scss';
import { ResumeType } from 'types/resume';
import { User } from 'types/user';
import RefreshTokenHandler from 'components/RefreshTokenHandler';

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

  const Layout = Component.Layout ?? React.Fragment;
  useEffect(() => {
    setClientLoaded(true);
  }, []);

  React.useEffect(() => {
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

  if (!clientLoaded) return null;

  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={toastOptions}
      />
      <SessionProvider session={pageProps.session}>
        <ResumeContextProvider initialResume={blankResume as ResumeType}>
          <Flex flexDirection="column" height="100%">
            <NavBar user={pageProps?.user as unknown as User} />
            <Box flex={1}>
              <Layout>
                <Component {...pageProps} />
                <RefreshTokenHandler />
              </Layout>
            </Box>
          </Flex>
        </ResumeContextProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
