import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useBreakpointValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { pick } from 'lodash';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type UserDetailsFormData = {
  name: string;
  summary: string;
  linkedIn: string;
  github?: string;
};

type FormProps = {
  onSave(values: UserDetailsFormData): void;
  initialValues: Partial<UserDetailsFormData>;
  loading?: boolean;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required('This i required')
      .required('Your email is required'),
    linkedIn: yup
      .string()
      .typeError('Input format is invalid')
      .url('Must be a valid linked in url'),
    github: yup
      .string()
      .typeError('Input format is invalid')
      .url('Must be a valid linked in url'),
  })
  .required();

const UserDetailsForm: React.FC<FormProps> = ({
  initialValues,
  onSave,
  loading,
}) => {
  const {
    register,
    handleSubmit: handleSubmit,
    formState: { errors: errors = {} },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: Record<string, string>) => {
    onSave(values as UserDetailsFormData);
  };

  useEffect(() => {
    reset(pick(initialValues, ['name', 'summary', 'linkedIn', 'github']));
  }, [initialValues, reset]);

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
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                {...register('name')}
                placeholder="Enter full name"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.name?.message && errors.name.message.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.summary)}>
              <FormLabel htmlFor="name">Profile/Summary</FormLabel>
              <Textarea
                {...register('summary')}
                placeholder="Enter brief summary about you"
                errorBorderColor="red.300"
                rows={4}
              />
              <FormErrorMessage>
                {errors?.summary?.message && errors.summary.message.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.linkedIn)}>
              <FormLabel htmlFor="linkedIn">LinkedIn</FormLabel>
              <Input
                id="linkedIn"
                type="text"
                {...register('linkedIn')}
                placeholder="LinkedIn url"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.linkedIn?.message &&
                  errors.linkedIn.message.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.github)}>
              <FormLabel htmlFor="github">Github</FormLabel>
              <Input
                id="github"
                type="text"
                {...register('github')}
                placeholder="Github link"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.github?.message && errors.github.message.toString()}
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

export default UserDetailsForm;
