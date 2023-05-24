import { AddIcon, CalendarIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  useBreakpointValue,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
  Button,
  Textarea,
  Checkbox,
  InputGroup,
  InputRightAddon,
  Progress,
  FormHelperText,
  Flex,
  Image,
  Icon,
  ButtonGroup,
  IconButton,
  VStack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsImage } from 'react-icons/bs';
import { DropzoneInPlace } from 'components/common';
import { Select } from 'components/common/Select';
import {
  getWishlistFormSchema,
  parseWishlistFormValues,
} from 'components/events/utils';
import { uploadImage } from 'services/media';
import { WishlistFormPayload, WishlistFormValues } from 'types/wishlist';
import { CURRENCIES, GIFT_FORMAT } from 'utils/constants';

type FormProps = {
  onSave(values: WishlistFormPayload): void;
  initialValues?: Partial<WishlistFormValues>;
  isOpen: boolean;
  onClose(): void;
  loading?: boolean;
};

const AddWishlistItemModal: React.FC<FormProps> = ({
  initialValues,
  onSave,
  isOpen,
  onClose,
  loading,
}) => {
  const [isBannerLoaded, setBannerLoaded] = useState(false);
  const [inUploadFlight, setInUploadFlight] = useState(false);

  const defaultValues = {
    allowPartialPayment: false,
    giftFormat: 'cash',
    quantity: 1,
    ...initialValues,
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors = {} },
    watch,
    setValue,
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(getWishlistFormSchema()),
  });
  const formValues = watch();

  const onSubmitForm = (values: Record<string, unknown>) => {
    const payload = parseWishlistFormValues(values as WishlistFormValues);
    onSave(payload);
    onClose();
  };

  const handleImageUpload = async (files: File[]) => {
    if (!files.length) {
      setValue('imageUrl', undefined);
      return;
    }
    setInUploadFlight(true);
    const file = files[0];
    const payload = new FormData();
    payload.append('type', 'banner');
    payload.append('file', file);
    try {
      const { data } = await uploadImage(payload);
      setValue('imageUrl', data?.file?.url);
      toast.success('Image uploaded');
    } catch (e: any) {
      toast.error(e.message ?? 'Unable to upload image');
    } finally {
      setInUploadFlight(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="subtle"
      colorScheme="purple"
    >
      <ModalOverlay />
      <ModalContent w={{ base: '98%', md: 'full' }}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <ModalHeader fontSize="xl" color="gray.500">
            Wishlist Item
          </ModalHeader>
          <ModalCloseButton
            outline="none"
            _active={{ outline: 'one', border: 'none' }}
          />
          <ModalBody pb={5}>
            <Stack spacing={4}>
              <Flex columnGap={3}>
                <FormControl
                  isInvalid={Boolean(errors.name)}
                  w={{ base: '100%', md: '60%' }}
                >
                  <FormLabel htmlFor="name" fontWeight={400}>
                    Name of item
                  </FormLabel>
                  <Input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="E.g my special birthday wishlist"
                    errorBorderColor="red.300"
                  />
                  <FormErrorMessage>
                    {errors?.name?.message && errors.name.message.toString()}
                  </FormErrorMessage>
                </FormControl>
                <Flex w={{ base: '100%', md: '40%' }}>
                  <FormControl isInvalid={Boolean(errors.amount)}>
                    <FormLabel htmlFor="amount" fontWeight={400}>
                      Cost
                    </FormLabel>
                    <Input
                      id="amount"
                      type="text"
                      {...register('amount')}
                      placeholder="How many of this?"
                      errorBorderColor="red.300"
                    />
                    <FormErrorMessage>
                      {errors?.name?.message && errors.name.message.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Flex>
              <Flex w="full" columnGap={3}>
                <Stack spacing={2} w={{ base: '100%', md: '60%' }}>
                  <FormControl isInvalid={Boolean(errors.giftFormat)}>
                    <FormLabel htmlFor="giftFormat" fontWeight={400}>
                      Mode of receipt
                    </FormLabel>
                    <ButtonGroup
                      size="sm"
                      isAttached
                      variant="outline"
                      w="full"
                    >
                      {GIFT_FORMAT.map((item, index) => (
                        <Button
                          w={item.value === 'cash' ? '30%' : '70%'}
                          onClick={() => setValue('giftFormat', item.value)}
                          key={index}
                          colorScheme="purple"
                          variant={
                            formValues.giftFormat === item.value
                              ? undefined
                              : 'outline'
                          }
                        >
                          {item.label}
                        </Button>
                      ))}
                    </ButtonGroup>
                    <FormErrorMessage>
                      {errors?.giftFormat?.message &&
                        errors.giftFormat.message.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Flex w={{ base: '100%', md: '40%' }} flex={1}>
                  <DropzoneInPlace
                    onUpload={handleImageUpload}
                    flexWrapperProps={{
                      w: '100%',
                    }}
                    dropPlaceholder={
                      <VStack>
                        <Icon as={BsImage} boxSize="2em" color="purple.500" />
                        <Text textAlign="center" fontSize="sm">
                          Got an image to upload?
                        </Text>
                      </VStack>
                    }
                  />
                </Flex>
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter borderTop="1px solid" borderColor="gray.200">
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="purple" isLoading={loading}>
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

type ModalManagerProps = {
  onSave(values: WishlistFormPayload): void;
  initialValues?: Partial<WishlistFormValues>;
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
      <AddWishlistItemModal
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
