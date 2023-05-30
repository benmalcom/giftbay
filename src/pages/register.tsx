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
  Link as ChakraLink,
  FormErrorMessage,
  Alert,
  AlertTitle,
  AlertDescription,
  Icon,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from 'next/link';
import { signIn, SignInOptions } from 'next-auth/react';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsCheckCircle } from 'react-icons/bs';
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
    passwordConfirmation: yup
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
  const [regCompleted, setRegCompleted] = useState(false);

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
    setRegCompleted(false);
    signIn('credentials', {
      ...values,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${process.env.NEXT_PUBLIC_VERIFY_REDIRECT}`,
      redirect: false,
      isRegister: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    }) // @ts-ignore
      .then(async ({ error }) => {
        if (error) throw error;
        reset();
        setRegCompleted(true);
      })
      .catch(error => {
        toast.error(error);
        setRegCompleted(false);
      })
      .finally(() => {
        setInFlight(false);
      });
  };

  const userEmail = getValues()?.email;

  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Register`} />
      <Container
        maxW="lg"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <Stack spacing="8">
          {regCompleted ? (
            <Alert
              variant="subtle"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
              height="250px"
              w={{ base: '95%', sm: 'auto' }}
              mx="auto"
              bg="gray.50"
            >
              <Icon
                as={BsCheckCircle}
                boxSize="40px"
                mr={0}
                color="purple.400"
              />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Success!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                You have registered for your account.
              </AlertDescription>
              <AlertDescription maxWidth="sm">
                A verification email has been sent to{' '}
                {userEmail ? <strong>{userEmail}</strong> : 'you'}. Please check
                your email.
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
                boxShadow="md"
                borderRadius="xl"
              >
                <Stack spacing="6">
                  <Heading fontSize="2xl" fontWeight={600}>
                    Log in to your account
                  </Heading>
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
                    <FormControl
                      isInvalid={Boolean(errors.passwordConfirmation)}
                    >
                      <FormLabel htmlFor="passwordConfirmation">
                        Confirm Password
                      </FormLabel>
                      <PasswordInput
                        id="passwordConfirmation"
                        errorBorderColor="red.300"
                        {...register('passwordConfirmation')}
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
                        {errors?.name?.message &&
                          errors.name.message.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={inFlight}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <HStack mt={5} spacing="1" justify="center">
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
              </Box>
            </form>
          )}
        </Stack>
      </Container>
    </>
  );
};
export default Register;
