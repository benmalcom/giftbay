import { Flex, Heading, Text, Container, VStack, Box } from '@chakra-ui/react';

const Attractions = () => (
  <Flex w="full" minH="100px" bg="purple.500" shadow="base" py="20px">
    <Container py={1.5} maxW="7xl" h="full" alignItems="center">
      <VStack>
        <VStack
          w={{ base: '100%', md: '80%', lg: '60%' }}
          alignItems="center"
          spacing={2}
        >
          <Heading as="h3" size="lg" textAlign="center" color="white">
            Seamless gift registry mastery
          </Heading>
          <Box p={5} boxShadow="sm">
            <Text
              fontSize="md"
              fontWeight={400}
              textAlign="center"
              color="white"
            >
              Experience the unparalleled power of our gift registry platform,
              where effortless wishlist creation, seamless sharing, and
              unforgettable celebrations combine to deliver extraordinary
              moments of pure delight and lasting memories.
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Container>
  </Flex>
);

export default Attractions;
