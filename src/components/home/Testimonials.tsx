import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

const Testimonials = () => {
  return (
    <Flex
      w="full"
      justifyContent="center"
      bg="white"
      alignItems="center"
      h={{ base: '700px', md: '600px' }}
    >
      <Container maxW="7xl" as={VStack}>
        <VStack w={{ base: '100%', md: '80%', lg: '60%' }} spacing={6}>
          <Heading
            as="h5"
            size="sm"
            color="purple.500"
            textTransform="uppercase"
          >
            People Love Us
          </Heading>
          <Heading as="h3" size="lg" textAlign="center">
            What people say about us
          </Heading>
        </VStack>
        <Stack
          py={8}
          px={4}
          spacing={{ base: 8, md: 10 }}
          align={'center'}
          direction={'column'}
        >
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            textAlign={'center'}
            maxW={'3xl'}
          >
            We had an incredible experience using{' '}
            {process.env.NEXT_PUBLIC_APP_NAME} and were impressed they made such
            a big difference in only three weeks. Our team is so grateful for
            the wonderful improvements they made and their ability to get
            familiar with the product concept so quickly.
          </Text>
          <Box textAlign={'center'}>
            <Avatar
              src={
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
              }
              mb={2}
            />

            <Text fontWeight={600}>Jenny Wilson</Text>
            <Text
              fontSize={'sm'}
              color={useColorModeValue('gray.400', 'gray.400')}
            >
              Entrepreneur
            </Text>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Testimonials;
