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
import { ItemListType } from 'types/resume';

type FormProps = {
  onSave(values: ItemListType): void;
  initialValues?: Partial<ItemListType>;
  isOpen: boolean;
  onClose(): void;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .min(2, 'Must be at least 2 characters'),
    content: yup
      .string()
      .required('Comma separated list of items')
      .min(2, 'Name must be at least 2 characters'),
  })
  .required();

const ItemListModal: React.FC<FormProps> = ({
  initialValues,
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
    defaultValues: initialValues,
  });

  const onSubmit = (values: Record<string, unknown>) => {
    onSave(values as ItemListType);
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
          <ModalHeader>Inline List</ModalHeader>
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
                      <FormLabel htmlFor="name">List Name</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        {...register('name')}
                        placeholder="E.g Technical Skills"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.name?.message &&
                          errors.name.message.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.content)}>
                      <FormLabel htmlFor="content">
                        Comma Separated Items
                      </FormLabel>
                      <Textarea
                        id="content"
                        {...register('content')}
                        placeholder="E.g PHP, Javascript, React"
                        errorBorderColor="red.300"
                      />
                      <FormErrorMessage>
                        {errors?.content?.message &&
                          errors.content.message.toString()}
                      </FormErrorMessage>
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
  onSave(values: ItemListType): void;
  initialValues?: Partial<ItemListType>;
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
      <ItemListModal
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
