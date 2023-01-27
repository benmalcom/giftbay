import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { NavBar } from 'components/layouts';
import theme from 'styles/theme';
import { toastOptions } from 'styles/toaster';
import 'styles/override.scss';

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Layout?: React.FC<any>;
};

type AppPropsWithLayout = AppProps<Record<string, never>> & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? React.Fragment;
  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={toastOptions}
      />
      <SessionProvider>
        <NavBar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
