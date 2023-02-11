import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { verifyEmail } from '../services/auth';

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
          <Heading size={headingSize}>Verifying your email</Heading>
          <VStack spacing="1" justify="center">
            <Text color="muted" mb={4}>
              Please wait
            </Text>
            <Spinner size="md" color="teal" />
          </VStack>
        </Stack>
      );
    }

    if (error) {
      return (
        <VStack spacing={6}>
          <VStack>
            <Text fontSize="lg" fontWeight={500}>
              Verification error!
            </Text>
            <Text mt={0}>
              There was an error with the verification process.
            </Text>
          </VStack>
          <Button
            isLoading={inFlight}
            w="80%"
            colorScheme="red"
            size="md"
            textDecoration="none"
            cursor="pointer"
            onClick={handleEmailVerification}
          >
            Try again
          </Button>
        </VStack>
      );
    }

    return (
      <VStack spacing={6}>
        <VStack>
          <Text fontSize="lg" fontWeight={500}>
            Verification successful!
          </Text>
          <Text mt={0}>You can now sign in with your account.</Text>
        </VStack>
        <Link href="/login" passHref>
          <Button
            w="80%"
            as="a"
            colorScheme="teal"
            size="md"
            textDecoration="none"
            cursor="pointer"
            mt={5}
          >
            Sign in
          </Button>
        </Link>
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
