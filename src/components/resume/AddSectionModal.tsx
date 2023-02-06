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
  initialValues?: FormValuesType;
};

type FormValuesType = {
  name: string;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required('Section name is required')
      .min(2, 'Must be at least two characters long'),
  })
  .required();

const AddSectionModal: React.FC<FormProps> = ({
  onSave,
  isOpen,
  onClose,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: FormValuesType) => {
    onSave(values);
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
          <ModalHeader>Section</ModalHeader>
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
                    <FormControl isRequired isInvalid={Boolean(errors.name)}>
                      <FormLabel htmlFor="count">Name</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        {...register('name')}
                        placeholder="Section name"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.name?.message &&
                          errors.name.message.toString()}
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
  initialValues?: FormValuesType;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  onSave,
  triggerFunc,
  initialValues,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <AddSectionModal
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
