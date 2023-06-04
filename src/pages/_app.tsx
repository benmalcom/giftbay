import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PublicLayout } from 'components/layouts';
import RefreshTokenHandler from 'components/RefreshTokenHandler';
import AppConfigProvider from 'contexts/AppConfigProvider';
import UserProvider from 'contexts/UserProvider';
import theme from 'styles/theme';
import { toastOptions } from 'styles/toaster';
import 'components/events/EventCardDropdownMenu.css';

NProgress.configure({ showSpinner: false });

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

  const Layout = Component.Layout ?? PublicLayout;
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

  useEffect(() => {
    const loading = !clientLoaded || isGsspLoading;
    if (loading) NProgress.start();
    else NProgress.done();
  }, [clientLoaded, isGsspLoading]);

  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={toastOptions}
      />

      <SessionProvider session={pageProps.session}>
        <UserProvider>
          <AppConfigProvider
            {...{
              pageTitle: pageProps.pageTitle,
            }}
          >
            <Layout>
              <Component {...pageProps} />
              <RefreshTokenHandler />
            </Layout>
          </AppConfigProvider>
        </UserProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
