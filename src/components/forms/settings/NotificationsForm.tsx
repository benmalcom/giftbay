import {
  Button,
  Checkbox,
  FormControl,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type ChangePasswordFormValues = {
  oldPassword: string;
  password: string;
  retypePassword: string;
};

type FormProps = {
  onSave(values: Record<string, boolean>): void;
  loading?: boolean;
};

const schema = yup
  .object({
    eventCreateNotification: yup.bool(),
    giftFulfilmentNotification: yup.bool(),
  })
  .required();

const NotificationsForm: React.FC<FormProps> = ({ onSave, loading }) => {
  const { handleSubmit: handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: Record<string, boolean>) => {
    onSave(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing="6"
        w={{ base: '95%', sm: '350px', lg: '450px', xl: '550px' }}
        bg="white"
        p={8}
        shadow="base"
        borderRadius="md"
        mx="auto"
      >
        <Heading as="h4" size="md" fontWeight={500}>
          Notification Settings
        </Heading>
        <Stack spacing="5">
          <FormControl>
            <Controller
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Checkbox
                  isChecked={value}
                  onChange={onChange}
                  name={name}
                  colorScheme="purple"
                >
                  Notify me when I create a wishlist
                </Checkbox>
              )}
              name="eventCreateNotification"
            />
          </FormControl>
          <FormControl>
            <Controller
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Checkbox
                  isChecked={value}
                  onChange={onChange}
                  name={name}
                  colorScheme="purple"
                >
                  Notify me when someone pays for a gift
                </Checkbox>
              )}
              name="giftFulfilmentNotification"
            />
          </FormControl>
        </Stack>
        <Stack spacing="1" direction="row">
          <Button type="submit" colorScheme="purple" isLoading={loading}>
            Save
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default NotificationsForm;
