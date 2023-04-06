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
  FormErrorMessage,
  Textarea,
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
  text: string;
};

const schema = yup
  .object({
    text: yup
      .string()
      .required('This is required')
      .typeError('Must be a valid text'),
  })
  .required();

const AddBulletedListModal: React.FC<FormProps> = ({
  onSave,
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors = {} },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: Record<string, string | number>) => {
    onSave(values as FormValuesType);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
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
                  <FormControl isRequired isInvalid={Boolean(errors.text)}>
                    <FormLabel htmlFor="text">
                      Paste the list copied from ChatGPT
                    </FormLabel>
                    <Textarea
                      {...register('text')}
                      placeholder="List copied from ChatGPT here"
                      errorBorderColor="red.300"
                      rows={10}
                    />
                    <FormErrorMessage>
                      {errors?.text?.message && errors.text.message.toString()}
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
      <AddBulletedListModal
        isOpen={isOpen}
        onClose={onToggle}
        onSave={onSave}
      />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};
