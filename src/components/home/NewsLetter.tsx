import { Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';
import NewsLetterForm from './NewsLetterForm';

const NewsLetter = () => (
  <Flex
    w="full"
    minH={{ base: '500px', md: '400px' }}
    bg="gray.100"
    alignItems={{ base: 'unset', lg: 'center' }}
  >
    <Container
      maxW="7xl"
      alignItems="center"
      as={Flex}
      h={{ base: 'fit-content', xl: '220px' }}
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
          <Heading as="h3" size="lg" textAlign="center">
            Stay in the loop{' '}
          </Heading>
          <Text
            fontSize="md"
            fontWeight={500}
            color="gray.600"
            textAlign="center"
          >
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
          <NewsLetterForm />
        </VStack>
      </Flex>
    </Container>
  </Flex>
);

export default NewsLetter;
