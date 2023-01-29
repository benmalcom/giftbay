import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => {
  return (
    <Box as="section" bg="#F7FAFC">
      <Container py={{ base: '16', md: '24' }} mt={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '8', md: '10' }}>
          <Stack align="center" maxW="2xl">
            <Heading
              size={useBreakpointValue({
                md: 'md',
                lg: 'lg',
                xl: 'xl',
                '2xl': '2xl',
              })}
            >
              Resume Builder
            </Heading>
            <Text
              textAlign="center"
              mb="2px"
              fontWeight={500}
              fontSize={{
                md: 'lg',
                lg: 'lg',
                xl: 'xl',
              }}
            >
              Build, edit and generate your resume in PDF format.
            </Text>
            <Text color="muted" maxW="2xl" textAlign="center" fontSize="md">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </Text>
          </Stack>
          <Stack
            spacing="3"
            direction={{ base: 'column', sm: 'row' }}
            justify="center"
          >
            <Link href="/register" passHref>
              <Button
                as="a"
                colorScheme="teal"
                size="lg"
                textDecoration="none"
                cursor="pointer"
              >
                Get started
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
