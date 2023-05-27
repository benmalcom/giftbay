import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Select } from 'components/common/Select';
import BANKS from 'data/nigerianBanks.json';
import { Payout } from 'types/user';

export type FormValues = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

type FormProps = {
  onSave(values: FormValues): void;
  initialValues?: Payout;
  loading?: boolean;
};

const schema = yup
  .object({
    bankName: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required('This is required'),
    accountName: yup.string().required().typeError('This is required'),
    accountNumber: yup
      .string()
      .required('This is required')
      .typeError('Must be valid account number')
      .test(
        'accountNumberLen',
        'Must be a 10-digit account number ',
        val => val?.length === 10
      ),
  })
  .required();

const PayoutSettingsForm: React.FC<FormProps> = ({
  initialValues,
  onSave,
  loading,
}) => {
  const {
    register,
    handleSubmit: handleSubmit,
    formState: { errors: errors = {} },
    reset,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const formValues = watch();

  const onSubmit = (values: Record<string, unknown>) => {
    onSave(values as FormValues);
  };

  useEffect(() => {
    if (!initialValues) {
      reset();
      return;
    }
    const values = pick(initialValues, [
      'accountName',
      'accountNumber',
      'bankName',
    ]);
    reset(values);
  }, [initialValues, reset]);

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
          Payout Settings
        </Heading>
        <Stack spacing="5">
          <FormControl isInvalid={Boolean(errors.bankName)}>
            <FormLabel htmlFor="bankName">Select Bank Name</FormLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  placeholder="Select bank..."
                  name="category"
                  isClearable
                  onChange={onChange}
                  onBlur={onBlur}
                  options={BANKS.map(
                    ({
                      bankCode,
                      bankName,
                    }: {
                      bankCode: string;
                      bankName: string;
                    }) => ({
                      value: bankCode,
                      label: bankName,
                    })
                  )}
                  value={value}
                />
              )}
              name="bankName"
            />
            <FormErrorMessage>
              {errors?.bankName?.message && errors.bankName.message.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.accountName)}>
            <FormLabel htmlFor="accountName">Account Name</FormLabel>
            <Input
              id="accountName"
              type="text"
              {...register('accountName')}
              placeholder="Enter account name"
              errorBorderColor="red.300"
              isDisabled={!formValues.bankName}
            />
            <FormErrorMessage>
              {errors?.accountName?.message &&
                errors.accountName.message.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.accountNumber)}>
            <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
            <Input
              id="accountNumber"
              type="text"
              {...register('accountNumber')}
              placeholder="Enter account number"
              errorBorderColor="red.300"
              isDisabled={!formValues.bankName}
            />
            <FormErrorMessage>
              {errors?.accountNumber?.message &&
                errors.accountNumber.message.toString()}
            </FormErrorMessage>
          </FormControl>

          <Stack spacing="1" direction="row">
            <Button type="submit" colorScheme="purple" isLoading={loading}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

export default PayoutSettingsForm;
