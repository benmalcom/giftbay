import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RefreshTokenHandler } from 'components';
import { ResumeContextProvider } from 'components/contexts/ResumeContext';
import { NavBar } from 'components/layouts';
import blankResume from 'data/blankResume.json';
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
  const [interval, setInterval] = useState(0);
  const [clientLoaded, setClientLoaded] = useState(false);

  const Layout = Component.Layout ?? React.Fragment;
  useEffect(() => {
    setClientLoaded(true);
  }, []);

  if (!clientLoaded) return null;

  console.log('pageProps ', pageProps);

  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={toastOptions}
      />
      <SessionProvider session={pageProps.session} refetchInterval={interval}>
        <ResumeContextProvider initialResume={blankResume as ResumeType}>
          <Flex flexDirection="column" height="100%">
            <NavBar user={pageProps?.user as unknown as User} />
            <Box flex={1}>
              <Layout>
                <Component {...pageProps} />
                <RefreshTokenHandler setInterval={setInterval} />
              </Layout>
            </Box>
          </Flex>
        </ResumeContextProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
