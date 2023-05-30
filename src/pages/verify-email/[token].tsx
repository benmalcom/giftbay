import {
  Container,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
  Spinner,
  Stack,
  Alert,
  Icon,
  AlertTitle,
  AlertDescription,
  Button,
  Flex,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiErrorCircle } from 'react-icons/bi';
import { BsCheckCircle, BsEmojiSmileUpsideDown } from 'react-icons/bs';
import { verifyEmail } from 'services/auth';

export const VerifyEmail = () => {
  const [inFlight, setInFlight] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const headingSize = useBreakpointValue({ base: 'xs', md: 'md' });

  const { token } = router.query;

  const handleEmailVerification = useCallback(() => {
    setInFlight(true);
    verifyEmail(token as string)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => {})
      .catch(error => {
        toast.error(error.message);
        setError(error);
      })
      .finally(() => {
        setInFlight(false);
      });
  }, [token]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!token) throw new Error('No verification token');
    handleEmailVerification();
  }, [handleEmailVerification, router.isReady, token]);

  const getUIState = () => {
    if (inFlight) {
      return (
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={headingSize} fontSize="3xl" fontWeight={500} mb={3}>
            Hey there,
          </Heading>

          <Heading size={headingSize} fontWeight={400}>
            We're verifying your email
          </Heading>
          <Flex justify="center" columnGap={2}>
            <Spinner size="md" color="purple.500" />
            <Text color="muted" mb={4}>
              Please wait
            </Text>
          </Flex>
        </Stack>
      );
    }

    if (error) {
      return (
        <VStack spacing={6}>
          <Alert
            colorScheme="red"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            height="250px"
            w={{ base: '95%', sm: '400px' }}
            mx="auto"
            bg="gray.50"
            shadow="sm"
          >
            <Icon as={BiErrorCircle} boxSize="40px" mr={0} color="red.400" />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Verification error!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              There was an error with the verification process.
            </AlertDescription>
            <Link href="/login" passHref>
              <Button
                isLoading={inFlight}
                w="80%"
                size="md"
                textDecoration="none"
                cursor="pointer"
                onClick={handleEmailVerification}
                colorScheme="red"
                variant="outline"
                mt={5}
              >
                Try again
              </Button>
            </Link>
          </Alert>
        </VStack>
      );
    }

    return (
      <VStack spacing={6}>
        <Alert
          variant="subtle"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          height="250px"
          w={{ base: '95%', sm: '400px' }}
          mx="auto"
          bg="gray.50"
          shadow="sm"
        >
          <Icon as={BsCheckCircle} boxSize="40px" mr={0} color="purple.400" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Verification successful!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            You can now sign in with your account.
          </AlertDescription>
          <Link href="/login" passHref>
            <Button
              w="80%"
              as="a"
              size="md"
              textDecoration="none"
              cursor="pointer"
              mt={5}
              colorScheme="purple"
            >
              Sign in
            </Button>
          </Link>
        </Alert>
      </VStack>
    );
  };

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">{getUIState()}</Stack>
      </Stack>
    </Container>
  );
};

export default VerifyEmail;
