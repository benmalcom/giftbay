import {
  Alert,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { HeaderTags } from 'components/common';

const Home = () => {
  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Home`} />
      <Flex
        bg="#f7f7f7"
        /*        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundImage={`url(/images/unsplash6.jpg)`}
        height="100%"*/
      >
        <Container alignItems="flex-start" mt={36}>
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
                {process.env.NEXT_PUBLIC_APP_NAME}
              </Heading>
              <Alert
                status="success"
                textAlign="center"
                mb="2px"
                fontSize={{
                  md: 'lg',
                  lg: 'lg',
                  xl: 'xl',
                }}
              >
                Build, edit or generate your resume in PDF format.
              </Alert>
              <Text maxW="2xl" textAlign="center" fontSize="md">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
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
      </Flex>
    </>
  );
};

export default Home;
