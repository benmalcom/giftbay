import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  Link as ChakraLink,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from 'next/link';
import { signIn, SignInOptions } from 'next-auth/react';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { HeaderTags } from 'components/common';
import { Button } from 'components/common/Button';
import { PasswordInput } from 'components/forms';

const schema = yup
  .object({
    email: yup
      .string()
      .required('This is required')
      .email('Must be a valid email'),
    password: yup
      .string()
      .required('This is required')
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        `Password must be at least 8 characters, \n With at least 1 letter and 1 number`
      ),
    confirmPassword: yup
      .string()
      .required('Enter password confirmation')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    name: yup
      .string()
      .required('This is required')
      .min(2, 'Name must be at least 2 characters'),
  })
  .required();
export const Register = () => {
  const [inFlight, setInFlight] = useState(false);
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors = {} },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: SignInOptions | undefined) => {
    setInFlight(true);
    setShowVerifyMessage(false);
    signIn('credentials', {
      ...values,
      redirect: false,
      isRegister: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    }) // @ts-ignore
      .then(async ({ error }) => {
        if (error) throw error;
        reset();
        setShowVerifyMessage(true);
      })
      .catch(error => {
        toast.error(error);
        setShowVerifyMessage(false);
      })
      .finally(() => {
        setInFlight(false);
      });
  };

  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Register`} />
      <Container
        maxW="lg"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <Stack spacing="8">
          {showVerifyMessage && (
            <Alert status="success">
              <AlertIcon />
              Success! A verification email has been sent to{' '}
              {getValues()?.email || 'you'}. Please check your inbox.
            </Alert>
          )}
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading
                size={useBreakpointValue({ base: 'xs', md: 'sm', lg: 'lg' })}
              >
                Sign up for an account
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Already have an account?</Text>
                <Link href="/login" passHref>
                  <ChakraLink
                    color="purple.500"
                    size="lg"
                    textDecoration="none"
                    cursor="pointer"
                  >
                    Sign in
                  </ChakraLink>
                </Link>
              </HStack>
            </Stack>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              py={{ base: '4', sm: '8' }}
              px={{ base: '4', sm: '10' }}
              w={{ base: '95%', sm: 'auto' }}
              mx="auto"
              bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
              boxShadow="md"
              borderRadius={{ base: 'none', sm: 'xl' }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl isInvalid={Boolean(errors.email)}>
                    <FormLabel htmlFor="email">Email</FormLabel>
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
                  <FormControl isInvalid={Boolean(errors.password)}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <PasswordInput
                      id="password"
                      errorBorderColor="red.300"
                      {...register('password')}
                      placeholder="Password"
                    />
                    <FormErrorMessage>
                      {errors?.password?.message &&
                        errors.password.message.toString()}
                    </FormErrorMessage>
                  </FormControl>{' '}
                  <FormControl isInvalid={Boolean(errors.confirmPassword)}>
                    <FormLabel htmlFor="passwordConfirm">
                      Confirm Password
                    </FormLabel>
                    <PasswordInput
                      id="passwordConfirm"
                      errorBorderColor="red.300"
                      {...register('confirmPassword')}
                      placeholder="Confirm Password"
                    />
                    <FormErrorMessage>
                      {errors?.confirmPassword?.message &&
                        errors.confirmPassword.message.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.name)}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      {...register('name')}
                      placeholder="Your name"
                      errorBorderColor="red.300"
                    />
                    <FormErrorMessage>
                      {errors?.name?.message && errors.name.message.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button type="submit" variant="primary" isLoading={inFlight}>
                    Sign up
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
export default Register;
