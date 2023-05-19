import { Flex, Heading, Text, VStack, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import { Button } from 'components/common/Button';

const Attractions = () => (
  <Flex
    w="full"
    h={{ base: 'fit-content', xl: '580px' }}
    flexDir={{ base: 'column', xl: 'row' }}
  >
    <VStack
      w={{ base: '100%', xl: '55%' }}
      alignItems="center"
      justifyContent="center"
      h="full"
      bg="white"
    >
      <Image
        src="/images/devices3.jpg"
        alt="Device responsiveness"
        w="full"
        h="100%"
      />
    </VStack>
    <VStack
      bgGradient="linear(to-r, purple.500, purple.400)"
      py={{ base: '40px', xl: '20px' }}
      px={{ base: '30px', xl: '80px' }}
      h="full"
      justifyContent="center"
      alignItems="flex-start"
      w={{ base: '100%', xl: '45%' }}
      spacing={10}
    >
      <VStack spacing={5} alignItems={{ base: 'flex-start', xl: 'center' }}>
        <Heading as="h2" size="xl" color="white">
          Fastest way to host and share your wishlist with loved ones.
        </Heading>
        <Text fontSize="md" fontWeight={500} color="white">
          Experience the ease, simplicity, and seamless approach to creating a
          gift registry with {process.env.NEXT_PUBLIC_APP_NAME}. Be up and
          running in minutes with a few basic details and watch as your wishlist
          comes to life.
        </Text>
      </VStack>
      <Link href="/register" passHref>
        <Button
          leftIcon={<CiCirclePlus size={30} />}
          as="a"
          textDecoration="none"
          cursor="pointer"
          borderRadius="30px"
          size="lg"
          w="fit-content"
          variant="light"
        >
          Get started
        </Button>
      </Link>
    </VStack>
  </Flex>
);

export default Attractions;
