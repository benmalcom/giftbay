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
    <Box as="section" bg="bg-surface">
      <Container py={{ base: '16', md: '24' }} mt={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '8', md: '10' }}>
          <Stack spacing={{ base: '4', md: '5' }} align="center">
            <Heading
              size={useBreakpointValue({
                md: 'md',
                lg: 'lg',
                xl: 'xl',
                '2xl': '2xl',
              })}
            >
              Resume Utils
            </Heading>
            <Text
              color="muted"
              maxW="2xl"
              textAlign="center"
              fontSize={{
                md: 'md',
                lg: 'lg',
                xl: 'xl',
              }}
            >
              A GUI to quickly edit your resume and generate a PDF format for
              it. Only works with one resume format for now.
            </Text>
          </Stack>
          <Stack
            spacing="3"
            direction={{ base: 'column', sm: 'row' }}
            justify="center"
          >
            <Link href="/login" passHref>
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
