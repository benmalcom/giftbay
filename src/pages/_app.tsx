import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RefreshTokenHandler } from 'components';
import { ResumeContextProvider } from 'components/contexts/ResumeContext';
import { NavBar } from 'components/layouts';
import resumeSample from 'data/resume.json';
import theme from 'styles/theme';
import { toastOptions } from 'styles/toaster';
import 'styles/override.scss';
import { ResumeType } from 'types/resume';

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Layout?: React.FC<any>;
};

type AppPropsWithLayout = AppProps<Record<string, Session>> & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [interval, setInterval] = useState(0);
  const Layout = Component.Layout ?? React.Fragment;
  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={toastOptions}
      />
      <SessionProvider session={pageProps.session} refetchInterval={interval}>
        <ResumeContextProvider initialResume={resumeSample as ResumeType}>
          <NavBar />
          <Layout>
            <Component {...pageProps} />
            <RefreshTokenHandler setInterval={setInterval} />
          </Layout>
        </ResumeContextProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
