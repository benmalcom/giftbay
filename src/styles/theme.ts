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
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', 'gray.800')(props),
      lineHeight: 'base',
      ' > :last-child': {
        overflow: 'hidden',
        marginBottom: '-1px',
      },
    },
    input: {
      border: '2px solid gray.800',
    },
    '#__next': {
      height: '100%',
    },
    '*::placeholder': {
      color: mode('gray.500', 'whiteAlpha.400')(props),
      fontSize: '14px',
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
  }),
};

const fonts = {
  heading: `Mulish, "Helvetica Neue", Helvetica, Arial, sans-serif`,
  body: `Mulish, "Helvetica Neue", Helvetica, Arial, sans-serif`,
};

export const theme = extendTheme({
  fonts,
  styles,
  components: {
    Input: {
      baseStyle: {},
      // Credit: https://stackoverflow.com/questions/70809036/how-can-i-overwrite-styles-of-an-autofilled-input-when-using-chakra-ui
      variants: {
        backgroundFix: {
          field: {
            bg: 'gray.50',
            _hover: {
              border: '1px solid',
              borderColor: 'gray.300',
            },
            _focus: {
              border: '1px solid',
              borderColor: 'gray.300',
            },
          },
        },
      },
      defaultProps: {
        variant: 'backgroundFix',
      },
    },
    FormLabel: {
      baseStyle: {
        fontWeight: 400, // Normally, it is "semibold"
      },
    },
  },
});

export default theme;
