import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  FormErrorMessage,
  Icon,
  AlertTitle,
  AlertDescription,
  Alert,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SiMinutemailer } from 'react-icons/si';
import * as yup from 'yup';
import { HeaderTags } from 'components/common';
import { Button } from 'components/common/Button';
import { sendPasswordResetEmail } from 'services/auth';

const schema = yup
  .object({
    email: yup
      .string()
      .required('This is required')
      .email('Must be a valid email'),
  })
  .required();
export const SendPasswordReset = () => {
  const [inFlight, setInFlight] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const onSubmit = (values: Record<string, string>) => {
    setIsEmailSent(false);
    setInFlight(true);
    sendPasswordResetEmail({
      ...values,
      redirectUrl: process.env.NEXT_PUBLIC_RESET_PASSWORD_REDIRECT,
    } as { email: string; redirectUrl: string })
      .then(() => setIsEmailSent(true))
      .catch(error => {
        setIsEmailSent(false);
        toast.error(error);
      })
      .finally(() => setInFlight(false));
  };
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Login`} />

      <Container
        maxW="lg"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <Stack spacing="8">
          {isEmailSent ? (
            <Alert
              variant="subtle"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
              height="250px"
              w={{ base: '95%', sm: 'auto' }}
              mx="auto"
              bg="gray.50"
              shadow="sm"
            >
              <Icon
                as={SiMinutemailer}
                boxSize="45px"
                mr={0}
                color="purple.400"
              />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Check your email
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                To reset your password, follow the instructions sent to your
                email.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                py={{ base: '7', sm: '8' }}
                px={{ base: '5', sm: '10' }}
                w={{ base: '95%', sm: 'auto' }}
                mx="auto"
                bg="white"
                boxShadow="base"
                borderRadius="xl"
              >
                <Stack spacing="6">
                  <Heading fontSize="2xl" fontWeight={600}>
                    Reset Password
                  </Heading>
                  <Stack spacing="5">
                    <FormControl isInvalid={Boolean(errors.email)}>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="Email address"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.email?.message &&
                          errors.email.message.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={inFlight}
                    >
                      Send Reset Link
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </form>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default SendPasswordReset;
