import 'styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import theme from 'styles/theme';
import { toastOptions } from 'styles/toaster';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={toastOptions}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
