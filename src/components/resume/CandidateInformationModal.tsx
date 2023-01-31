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
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Candidate } from 'types/resume';

type FormProps = {
  onSave(values: Candidate): void;
  initialValues?: Partial<Candidate>;
  isOpen: boolean;
  onClose(): void;
};

const schema = yup
  .object()
  .shape({
    contactsAndLinks: yup.object().shape({
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
    }),
    name: yup
      .string()
      .typeError('Must be valid characters')
      .required('Candidate name is required'),
    headline: yup
      .string()
      .typeError('Must be valid characters')
      .required('Candidate headline is required'),
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
    onSave(values as Candidate);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Candidate Information</ModalHeader>
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
                  {' '}
                  <Stack spacing="5">
                    <FormControl isInvalid={Boolean(errors.name)}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        {...register('name')}
                        placeholder="Candidate Name"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.name?.message &&
                          errors.name.message.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.headline)}>
                      <FormLabel htmlFor="headline">Headline</FormLabel>
                      <Input
                        id="headline"
                        type="text"
                        {...register('headline')}
                        placeholder="E.g Marketing Manager"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.headline?.message &&
                          errors.headline.message.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <Stack spacing="5">
                    <FormControl
                      isInvalid={Boolean(errors.contactsAndLinks?.email)}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        id="email"
                        type="text"
                        {...register('contactsAndLinks.email')}
                        placeholder="Email address"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.contactsAndLinks?.email?.message &&
                          errors.contactsAndLinks.email.message.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={Boolean(errors.contactsAndLinks?.linkedIn)}
                    >
                      <FormLabel htmlFor="linkedIn">LinkedIn</FormLabel>
                      <Input
                        id="linkedIn"
                        type="text"
                        {...register('contactsAndLinks.linkedIn')}
                        placeholder="Linked in url"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.contactsAndLinks?.linkedIn?.message &&
                          errors.contactsAndLinks.linkedIn.message.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={Boolean(errors.contactsAndLinks?.github)}
                    >
                      <FormLabel htmlFor="github">Github</FormLabel>
                      <Input
                        id="github"
                        type="text"
                        {...register('contactsAndLinks.github')}
                        placeholder="Github link"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.contactsAndLinks?.github?.message &&
                          errors.contactsAndLinks.github.message.toString()}
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
  onSave(values: Candidate): void;
  initialValues?: Partial<Candidate>;
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
