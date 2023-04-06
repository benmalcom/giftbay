import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  useBreakpointValue,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  usePrevious,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { JobRoleType } from 'types/resume';

type FormProps = {
  onSave(values: JobRoleType): void;
  initialValues?: Partial<JobRoleType>;
  isOpen: boolean;
  onClose(): void;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required('Role name is required')
      .min(2, 'Name must be at least 2 characters'),
    company: yup
      .string()
      .required('Company name is required')
      .min(2, 'Name must be at least 2 characters'),
    location: yup
      .string()
      .required('Company location is required')
      .min(2, 'Name must be at least 2 characters'),
    duration: yup
      .string()
      .required('Employment duration is required')
      .min(14, 'Name must be at least 14 characters'),
    isInline: yup.boolean(),
  })
  .required();

const JobRoleModal: React.FC<FormProps> = ({
  initialValues,
  onSave,
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { isInline: false, ...(initialValues || {}) },
  });

  const prevInitialValues = usePrevious(initialValues);
  useEffect(() => {
    if (prevInitialValues !== initialValues) reset(initialValues);
  }, [initialValues, prevInitialValues, reset]);

  const onSubmit = (values: Record<string, unknown>) => {
    onSave(values as JobRoleType);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                      <FormLabel htmlFor="name">Role Name</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        {...register('name')}
                        placeholder="E.g Senior Software Engineer"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.name?.message &&
                          errors.name.message.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.company)}>
                      <FormLabel htmlFor="company">Company Name</FormLabel>
                      <Input
                        id="company"
                        type="text"
                        {...register('company')}
                        placeholder="E.g Facebook"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.company?.message &&
                          errors.company.message.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.location)}>
                      <FormLabel htmlFor="location">Location</FormLabel>
                      <Input
                        id="location"
                        type="text"
                        {...register('location')}
                        placeholder="E.g San Francisco, CA"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.name?.message &&
                          errors.name.message.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.duration)}>
                      <FormLabel htmlFor="duration">Duration</FormLabel>
                      <Input
                        id="duration"
                        type="text"
                        {...register('duration')}
                        placeholder="E.g 05/2022 - 01/2023"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.duration?.message &&
                          errors.duration.message.toString()}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Checkbox
                              id="isInline"
                              onChange={onChange}
                              checked={!!value}
                              onBlur={onBlur}
                              colorScheme="teal"
                            >
                              Single Line?
                            </Checkbox>
                          )}
                          name="isInline"
                        />
                      </FormLabel>
                    </FormControl>
                  </Stack>
                  <Stack spacing="1" direction="row" justifyContent="end">
                    <Button colorScheme="gray" mr={3} onClick={handleClose}>
                      Close
                    </Button>
                    <Button type="submit" colorScheme="teal">
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

type ModalManagerProps = {
  onSave(values: JobRoleType): void;
  initialValues?: Partial<JobRoleType>;
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  onSave,
  initialValues,
  triggerFunc,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <JobRoleModal
        isOpen={isOpen}
        onClose={onToggle}
        onSave={onSave}
        initialValues={initialValues}
      />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};
