import { Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';
import SubscriptionForm from './SubscriptionForm';

const NewsLetter = () => (
  <Container
    maxW="7xl"
    alignItems="center"
    as={Flex}
    //bg="#fc7b54"
    // bg="#31bacd"
    bg="cyan.400"
    h={{ base: 'fit-content', xl: '220px' }}
    rounded="lg"
    shadow="lg"
    mx="auto"
  >
    <Flex
      w="full"
      flexDir={{ base: 'column', lg: 'row' }}
      my={5}
      alignItems="center"
    >
      <VStack
        py={{ base: '40px', xl: '20px' }}
        px={{ base: '30px', xl: '70px' }}
        h="full"
        justifyContent="center"
        alignItems="center"
        w={{ base: '100%', xl: '50%' }}
        spacing={4}
      >
        <Heading as="h3" size="lg" color="white" textAlign="center">
          Stay in the loop{' '}
        </Heading>
        <Text fontSize="md" fontWeight={500} color="white" textAlign="center">
          Subscribe to our newsletter for exclusive updates on exciting new
          features and enhancements coming to our gift registry platform.
        </Text>
      </VStack>
      <VStack
        w={{ base: '100%', xl: '50%' }}
        alignItems="center"
        justifyContent="center"
        h="full"
      >
        <SubscriptionForm />
      </VStack>
    </Flex>
  </Container>
);

export default NewsLetter;
