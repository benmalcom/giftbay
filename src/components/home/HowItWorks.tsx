import { Flex, Heading, Text, Container, VStack, Box } from '@chakra-ui/react';
import { HOW_IT_WORKS, HIW_ICON_PROPS } from './data';

const HowItWorks = () => (
  <Flex w="full" minH="500px" bg="white" py="70px">
    <Container py={1.5} maxW="7xl" h="full" alignItems="center">
      <VStack>
        <VStack
          w={{ base: '100%', md: '80%', lg: '60%' }}
          alignItems="center"
          spacing={5}
          mb="70px"
        >
          <Heading
            as="h5"
            size="sm"
            color="purple.500"
            textTransform="uppercase"
          >
            How it works
          </Heading>
          <Heading as="h3" size="lg" textAlign="center">
            Step into the world of gift registry magic.
          </Heading>
          <Box bg="gray.50" p={5} boxShadow="sm">
            <Text fontSize="md" fontWeight={400} textAlign="center">
              Unleash the power of gift registry bliss: embark on a seamless
              journey from wishlist to wow, empowering you to effortlessly
              create, share, and celebrate your special moments with
              unparalleled ease and joy.
            </Text>
          </Box>
        </VStack>
        <Flex
          align="center"
          justify={{
            base: 'space-around',
            md: 'space-between',
            lg: 'space-around',
          }}
          flexDir={{
            base: 'column',
            md: 'row',
          }}
          gap={{
            base: 10,
            md: 'unset',
          }}
          w="100%"
        >
          {HOW_IT_WORKS.map((item, index) => (
            <VStack
              key={index}
              w={{ base: '300px', md: '32%', lg: '300px' }}
              h={{ base: '300px', md: '250px', lg: '300px' }}
              // boxShadow="md"
              // bg="#ecfdd8"
              border="1px solid gray.100"
              borderRadius={20}
              justifyContent="center"
              p="25px"
            >
              <Flex
                w="60px"
                h="60px"
                borderRadius="8px"
                align="center"
                justify="center"
                bg="purple.50"
                boxShadow="sm"
              >
                <item.Icon {...HIW_ICON_PROPS} />
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

export default HowItWorks;
