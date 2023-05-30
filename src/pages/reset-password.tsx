import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { HeaderTags } from 'components/common';
import { Button } from 'components/common/Button';
import { PasswordInput } from 'components/forms';
import { resetPassword } from 'services/auth';

type FormValues = {
  password: string;
  passwordConfirmation: string;
};
const schema = yup
  .object({
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
  })
  .required();
export const ResetPassword = () => {
  const [inFlight, setInFlight] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const onSubmit = (values: Record<string, unknown>) => {
    setInFlight(true);
    resetPassword(values as FormValues)
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
      <HeaderTags
        title={`${process.env.NEXT_PUBLIC_APP_NAME} - Reset Password`}
      />

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
                  Reset Password{' '}
                </Heading>
                <Stack spacing="5">
                  <FormControl isInvalid={Boolean(errors.password)}>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <PasswordInput
                      errorBorderColor="red.300"
                      {...register('password')}
                      placeholder="Create new password"
                    />
                    <FormErrorMessage>
                      {errors?.password?.message &&
                        errors.password.message.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.passwordConfirmation)}>
                    <FormLabel htmlFor="passwordConfirmation">
                      Confirm Password
                    </FormLabel>
                    <PasswordInput
                      errorBorderColor="red.300"
                      {...register('passwordConfirmation')}
                      placeholder="Confirm new password"
                    />
                    <FormErrorMessage>
                      {errors?.passwordConfirmation?.message &&
                        errors.passwordConfirmation.message.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>

                <Stack spacing="6">
                  <Button type="submit" variant="primary" isLoading={inFlight}>
                    Reset Password
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

export default ResetPassword;
