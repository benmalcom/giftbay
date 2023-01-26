import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
