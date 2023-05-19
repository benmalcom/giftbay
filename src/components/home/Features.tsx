import { Flex, Heading, Text, Container, VStack, Box } from '@chakra-ui/react';
import { FEATURES } from './data';

const Features = () => (
  <Flex w="full" minH="500px" py="70px" bg="purple.50">
    <Container py={1.5} maxW="7xl" h="full" alignItems="center">
      <VStack>
        <VStack
          w={{ base: '100%', md: '80%', lg: '60%' }}
          alignItems="center"
          spacing={6}
          mb="50px"
        >
          <Heading
            as="h5"
            size="sm"
            color="purple.500"
            textTransform="uppercase"
          >
            Features
          </Heading>
          <Heading as="h3" size="lg" textAlign="center">
            Why choose us?
          </Heading>
          <Box>
            <Text fontSize="md" fontWeight={400} textAlign="center">
              Because you deserve the best! Choose us for gift registry
              excellence, make your celebrations extraordinary. Immerse yourself
              in a world of unparalleled selection, effortless simplicity,
              unwavering customer satisfaction, and exquisite attention to
              detail, as we transform your special moments into unforgettable
              memories.
            </Text>
          </Box>
        </VStack>
        <Flex
          align="center"
          justify={{
            base: 'space-between',
            md: 'space-around',
            lg: 'space-around',
          }}
          flexDir={{
            base: 'column',
            md: 'row',
          }}
          gap="20px"
          w="100%"
          flexWrap="wrap"
        >
          {FEATURES.map((item, index) => (
            <VStack
              key={index}
              w={{ base: '320px', md: '48%', lg: '400px' }}
              h={{ base: '300px', md: '200px', lg: '200px' }}
              boxShadow="sm"
              bg="white"
              justifyContent="center"
              p="25px"
              position="relative"
            >
              <Flex
                w="35px"
                h="35px"
                align="center"
                justify="center"
                bg="purple.500"
                boxShadow="md"
                position="absolute"
                left={0}
                top={0}
              >
                <Text fontSize="lxl" fontWeight={700} color="white">
                  {index + 1}
                </Text>
              </Flex>
              <Text
                fontSize={{ base: 'xl', md: 'md', lg: 'xl' }}
                fontWeight={600}
                textAlign="center"
                color="gray.600"
              >
                {item.heading}
              </Text>
              <Text fontSize="sm" textAlign="center">
                {item.body}
              </Text>
            </VStack>
          ))}
        </Flex>
      </VStack>
    </Container>
  </Flex>
);

export default Features;
