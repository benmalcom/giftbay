import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const onSubmit = (values: Record<string, string>) => {
    setInFlight(true);
    sendPasswordResetEmail(values as { email: string })
      .then(response => toast.success(response.data.message))
      .catch(error => {
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
                  <Button type="submit" variant="primary" isLoading={inFlight}>
                    Send Reset Link
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Container>
    </>
  );
};

export default SendPasswordReset;
