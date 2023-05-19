import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: Record<string, unknown>) => ({
    'html, body': {
      height: '100%',
      width: '100%',
    },
    body: {
      margin: 0,
      padding: 0,
      fontFamily: `'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', 'gray.800')(props),
      lineHeight: 'base',
      ' > :last-child': {
        overflow: 'hidden',
        marginBottom: '-1px',
      },
    },
    '#__next': {
      height: '100%',
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
  }),
};

const fonts = {
  heading: `'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
  body: `'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
};

export const theme = extendTheme({
  fonts,
  styles,
});

export default theme;
