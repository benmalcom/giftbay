import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
  Spinner,
  Stack,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Logo } from 'components/index';
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
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="fit-content"
          py={5}
        >
          <AlertTitle mb={1} fontSize="lg">
            Verification error!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            There was an error with the verification process.
          </AlertDescription>
          <Button
            isLoading={inFlight}
            w="80%"
            as="a"
            colorScheme="red"
            size="md"
            textDecoration="none"
            cursor="pointer"
            mt={5}
            onClick={handleEmailVerification}
          >
            Try again
          </Button>
        </Alert>
      );
    }

    return (
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="fit-content"
        py={5}
      >
        <AlertTitle mb={1} fontSize="lg">
          Verification successful!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          You can now sign in with your account.
        </AlertDescription>
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
      </Alert>
    );
  };

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          {getUIState()}
        </Stack>
      </Stack>
    </Container>
  );
};

export default VerifyEmail;
