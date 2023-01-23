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
import { ContactsAndLinksType } from 'types/resume';

type FormProps = {
  onSave(values: ContactsAndLinksType): void;
  initialValues: Partial<ContactsAndLinksType>;
  isOpen: boolean;
  onClose(): void;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Your email is required'),
    linkedIn: yup
      .string()
      .required('This i required')
      .url('Must be a valid linked in url'),
    github: yup
      .string()
      .required('This i required')
      .url('Must be a valid linked in url'),
  })
  .required();

const ContactsAndLinksModal: React.FC<FormProps> = ({
  initialValues,
  onSave,
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: Record<string, unknown>) => {
    onSave(values as ContactsAndLinksType);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contacts and Links</ModalHeader>
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
                    <FormControl isInvalid={Boolean(errors.email)}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        id="email"
                        type="text"
                        {...register('email')}
                        placeholder="Email address"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.email?.message &&
                          errors.email.message.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.linkedIn)}>
                      <FormLabel htmlFor="linkedIn">LinkedIn</FormLabel>
                      <Input
                        id="linkedIn"
                        type="text"
                        {...register('linkedIn')}
                        placeholder="Linked in url"
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
                        {errors?.github?.message &&
                          errors.github.message.toString()}
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
  onSave(values: ContactsAndLinksType): void;
  initialValues: Partial<ContactsAndLinksType>;
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
      <ContactsAndLinksModal
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
