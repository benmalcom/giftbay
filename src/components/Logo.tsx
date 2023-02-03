import { Box, Heading } from '@chakra-ui/react';

export const Logo = () => {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Resume Pond';
  const logoText = appName.match(/\b(\w)/g)!.join('');

  return (
    <Box borderRadius="50%" border="1px solid teal" p={1}>
      <Heading as="h3" size="lg" color="teal" userSelect="none">
        {logoText}
      </Heading>
    </Box>
  );
};

export default Logo;
