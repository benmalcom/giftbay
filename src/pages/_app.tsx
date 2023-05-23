import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PageSpinner } from 'components/common';
import { MainLayout } from 'components/layouts';
import RefreshTokenHandler from 'components/RefreshTokenHandler';
import theme from 'styles/theme';
import { toastOptions } from 'styles/toaster';
import { User } from 'types/user';
import 'components/events/EventCardDropdownMenu.css';

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

  const Layout = Component.Layout ?? MainLayout;
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

      <SessionProvider session={pageProps.session}>
        <Layout user={pageProps?.user as unknown as User}>
          <Component {...pageProps} />
          <RefreshTokenHandler />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
