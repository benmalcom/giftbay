import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Link as ChakraLink,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, SignInOptions } from 'next-auth/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { PasswordInput } from 'components/form';
import { Logo } from 'components/index';

const schema = yup
  .object({
    email: yup
      .string()
      .required('This is required')
      .email('Must be a valid email'),
    password: yup
      .string()
      .required('This is required')
      .min(6, 'Password must be at least 6 characters'),
    remember_me: yup.boolean(),
  })
  .required();
export const Login = () => {
  const [inFlight, setInFlight] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const { dest } = router.query;

  const onSubmit = (values: SignInOptions | undefined) => {
    setInFlight(true);
    signIn('credentials', {
      ...values,
      callbackUrl:
        (dest as string) || `${process.env.NEXT_PUBLIC_APP_BASE_URL}/editor`,
      redirect: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    }) // @ts-ignore
      .then(async ({ url, error }) => {
        if (error) throw error;
        if (url) await router.push(url);
      })
      .catch(error => {
        toast.error(error);
      })
      .finally(() => setInFlight(false));
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors = {} },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading
              size={useBreakpointValue({ base: 'xs', md: 'sm', lg: 'lg' })}
            >
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Link href="/register" passHref>
                <ChakraLink
                  color="teal"
                  size="lg"
                  textDecoration="none"
                  cursor="pointer"
                >
                  Register
                </ChakraLink>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
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
                    {errors?.email?.message && errors.email.message.toString()}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <PasswordInput
                    errorBorderColor="red.300"
                    {...register('password')}
                    placeholder="Password"
                  />
                  <FormErrorMessage>
                    {errors?.password?.message &&
                      errors.password.message.toString()}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox
                      onChange={e => onChange(e)}
                      checked={!!value}
                      onBlur={() => onBlur()}
                    >
                      Remember me
                    </Checkbox>
                  )}
                  name="remember_me"
                />
                <Link href="/register" passHref>
                  <ChakraLink
                    color="teal"
                    size="lg"
                    textDecoration="none"
                    cursor="pointer"
                  >
                    Forgot password?
                  </ChakraLink>
                </Link>
              </HStack>
              <Stack spacing="6">
                <Button type="submit" colorScheme="teal" isLoading={inFlight}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default Login;
