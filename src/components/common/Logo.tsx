/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Heading, Highlight } from '@chakra-ui/react';

export const Logo = () => {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Gift Bay';
  // const logoText = appName.match(/\b(\w)/g)!.join('');

  return (
    /* <Flex align="center" columnGap="1">
      <Flex
        borderRadius="50%"
        w="3.438rem"
        h="3.438rem"
        p={1}
        align="center"
        justify="center"
        border="1px solid #FF0080"
        bg="pink.100"
      >
        {/!*      <Heading
        as="h5"
        size="md"
        color="white"
        userSelect="none"
        textShadow="#FF0080 2px 5px 10px"
        sx={{
          textTransform: 'lowercase',
          '&:first-letter': {
            textTransform: 'uppercase',
          },
        }}
      >
        {logoText}
      </Heading>*!/}
        <TfiGift size={20} color="#FF0080" />
      </Flex>
      <Heading
        as="h6"
        size="sm"
        userSelect="none"
        color="#FF0080"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        {appName}
      </Heading>
    </Flex>*/

    <Heading as="h5" size="md" userSelect="none" color="subtle">
      <Highlight
        query={['Gift', '.']}
        styles={{
          color: 'purple.600',
        }}
      >
        {`${appName}.`}
      </Highlight>
    </Heading>
  );
};

export default Logo;
