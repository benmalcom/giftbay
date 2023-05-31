import {
  Container,
  Heading,
  VStack,
  Stack,
  Alert,
  Icon,
  AlertTitle,
  AlertDescription,
  Button,
  Flex,
  Progress,
  Text,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { FaRegThumbsUp } from 'react-icons/fa';
import { PageSpinner } from 'components/common';
import { verifyEmail } from 'services/auth';

export const VerifyEmail = () => {
  const [inFlight, setInFlight] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const { token } = router.query;

  const handleEmailVerification = useCallback(() => {
    setIsEmailSent(false);
    setInFlight(true);
    verifyEmail(token as string)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => setIsEmailSent(true))
      .catch(error => {
        setIsEmailSent(false);
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
          <Heading fontSize="3xl" fontWeight={500} mb={2}>
            Hey there,
          </Heading>

          <Text fontSize="lg">We're verifying your email. Please wait...</Text>
          <Flex justify="center" columnGap={2}>
            <Progress size="sm" isIndeterminate colorScheme="purple" w="full" />
          </Flex>
        </Stack>
      );
    }

    if (isEmailSent) {
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
            <Icon as={FaRegThumbsUp} boxSize="40px" mr={0} color="purple.400" />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Verification successful!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              You can now sign into your account.
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
              {error?.message
                ? error.message
                : 'There was an error with the verification process'}
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

    return <PageSpinner />;
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
