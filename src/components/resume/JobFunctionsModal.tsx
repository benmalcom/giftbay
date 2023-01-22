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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormProps = {
  onSave(values: FormValuesType): void;
  isOpen: boolean;
  onClose(): void;
};

type FormValuesType = {
  count: number;
};

const schema = yup
  .object({
    count: yup
      .number()
      .required('Count is required')
      .typeError('Must be a valid number')
      .min(1, 'Must be at least one job responsibility'),
  })
  .required();

const JobFunctions: React.FC<FormProps> = ({ onSave, isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { count: 3 },
  });

  const onSubmit = (values: FormValuesType) => {
    onSave(values);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Responsibilities</ModalHeader>
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
                    <FormControl isRequired isInvalid={Boolean(errors.count)}>
                      <FormLabel htmlFor="count">Count</FormLabel>
                      <Input
                        id="count"
                        type="number"
                        {...register('count')}
                        placeholder="E.g 3"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.count?.message &&
                          errors.count.message.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <Stack spacing="1" direction="row" justifyContent="end">
                    <Button colorScheme="gray" mr={3} onClick={onClose}>
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
  onSave(values: FormValuesType): void;
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  onSave,
  triggerFunc,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <JobFunctions isOpen={isOpen} onClose={onToggle} onSave={onSave} />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};
