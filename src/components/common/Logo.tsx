/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Heading } from '@chakra-ui/react';

export const Logo = () => {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Resume Pond';
  const logoText = appName.match(/\b(\w)/g)!.join('');

  return (
    <Flex
      borderRadius="50%"
      w="3.438rem"
      h="3.438rem"
      border="1px solid teal"
      p={1}
      align="center"
      justify="center"
    >
      <Heading as="h3" size="lg" color="teal" userSelect="none">
        {logoText}
      </Heading>
    </Flex>
  );
};

export default Logo;
