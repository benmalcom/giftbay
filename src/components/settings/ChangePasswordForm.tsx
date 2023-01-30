import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { PasswordInput } from 'components/form';

export type ChangePasswordFormData = {
  oldPassword: string;
  password: string;
  retypePassword: string;
};

type FormProps = {
  onSave(values: ChangePasswordFormData): void;
  loading?: boolean;
};

const schema = yup
  .object({
    oldPassword: yup
      .string()
      .required('Please enter your current password.')
      .min(8, 'Your password is too short, must be at least 8 chars'),
    password: yup
      .string()
      .required('Please enter your new password.')
      .min(8, 'New password is too short, must be at least 8 chars.'),
    retypePassword: yup
      .string()
      .required('Please retype your new password.')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  })
  .required();

const ChangePasswordForm: React.FC<FormProps> = ({ onSave, loading }) => {
  const {
    register,
    handleSubmit: handleSubmit,
    formState: { errors: errors = {} },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: Record<string, unknown>) => {
    onSave(values as ChangePasswordFormData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        pb={{ base: '4', sm: '8' }}
        bg={useBreakpointValue({
          base: 'transparent',
          sm: 'bg-surface',
        })}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isInvalid={Boolean(errors.oldPassword)}>
              <FormLabel htmlFor="oldPassword">Current Password</FormLabel>
              <PasswordInput
                id="oldPassword"
                {...register('oldPassword')}
                placeholder="Enter current password"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.oldPassword?.message &&
                  errors.oldPassword.message.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">New Password</FormLabel>
              <PasswordInput
                id="password"
                {...register('password')}
                placeholder="Enter new password"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.oldPassword?.message &&
                  errors.oldPassword.message.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.retypePassword)}>
              <FormLabel htmlFor="retypePassword">New Password</FormLabel>
              <PasswordInput
                id="retypePassword"
                {...register('retypePassword')}
                placeholder="Re-type new password"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.retypePassword?.message &&
                  errors.retypePassword.message.toString()}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing="1" direction="row" justifyContent="end">
            <Button type="submit" colorScheme="teal" isLoading={loading}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};

export default ChangePasswordForm;
