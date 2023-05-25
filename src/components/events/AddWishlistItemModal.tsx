import { CloseIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
  Button,
  InputGroup,
  Flex,
  Image,
  Icon,
  ButtonGroup,
  VStack,
  Text,
  InputLeftAddon,
  FormHelperText,
  Box,
  Checkbox,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsImage } from 'react-icons/bs';
import { DropzoneInPlace } from 'components/common';
import { Button as CustomButton } from 'components/common/Button';
import {
  getWishlistFormSchema,
  parseWishlistFormValues,
} from 'components/events/utils';
import { uploadImage } from 'services/media';
import { WishlistFormPayload, WishlistFormValues } from 'types/wishlist';
import { GIFT_FORMAT } from 'utils/constants';

type FormProps = {
  onSave(values: WishlistFormPayload): void;
  initialValues?: Partial<WishlistFormValues>;
  isOpen: boolean;
  onClose(): void;
  loading?: boolean;
  preferredCurrency: string;
};

const AddWishlistItemModal: React.FC<FormProps> = ({
  initialValues,
  onSave,
  isOpen,
  onClose,
  loading,
  preferredCurrency,
}) => {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [inUploadFlight, setInUploadFlight] = useState(false);

  const defaultValues = {
    allowPartialPayments: false,
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
    clearErrors,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(getWishlistFormSchema()),
  });
  const formValues = watch();

  const onSubmitForm = (values: Record<string, unknown>) => {
    const payload = parseWishlistFormValues(values as WishlistFormValues);
    onSave(payload);
    handleClose();
  };

  const handleClose = () => {
    reset();
    clearErrors();
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
      setValue('imageUrl', undefined);
      setInUploadFlight(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
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
            <Stack spacing={5}>
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel htmlFor="name" fontWeight={400}>
                  Name of item
                </FormLabel>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="E.g Gold Wristwatch"
                  errorBorderColor="red.300"
                />
                <FormErrorMessage>
                  {errors?.name?.message && errors.name.message.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.giftFormat)} w="full">
                <FormLabel htmlFor="giftFormat" fontWeight={400}>
                  Mode of receipt
                </FormLabel>
                <ButtonGroup
                  size={{ base: 'xs', md: 'sm' }}
                  isAttached
                  w="full"
                >
                  {GIFT_FORMAT.map((item, index) => (
                    <Button
                      colorScheme="gray"
                      onClick={() => setValue('giftFormat', item.value)}
                      key={index}
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
              <Flex w="full" columnGap={3} align="center">
                <Stack w={{ base: '100%', md: '60%' }}>
                  <FormControl isInvalid={Boolean(errors.amount)} w="full">
                    <FormLabel htmlFor="amount" fontWeight={400}>
                      Amount
                    </FormLabel>
                    <FormHelperText mb={1}>
                      Or the cost equivalent of the item
                    </FormHelperText>
                    <InputGroup>
                      {/* eslint-disable-next-line react/no-children-prop */}
                      <InputLeftAddon children={preferredCurrency} />
                      <Input
                        id="amount"
                        type="number"
                        {...register('amount')}
                        placeholder="Cash worth"
                        errorBorderColor="red.300"
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors?.amount?.message &&
                        errors.amount.message.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.allowPartialPayments)}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Checkbox
                          isChecked={value}
                          onChange={onChange}
                          name={name}
                          colorScheme="purple"
                          size="sm"
                        >
                          Allow Contributions
                        </Checkbox>
                      )}
                      name="allowPartialPayments"
                    />
                  </FormControl>
                </Stack>
                <Flex w={{ base: '100%', md: '40%' }} h="100%">
                  {formValues.imageUrl ? (
                    <Box w="100" h="150px" pos="relative">
                      {isImageLoaded && (
                        <CloseIcon
                          pos="absolute"
                          top={-2}
                          right={-5}
                          color="red.400"
                          boxSize="0.7em"
                          cursor="pointer"
                          onClick={() => setValue('imageUrl', undefined)}
                        />
                      )}
                      <Image
                        w="full"
                        h="full"
                        src={formValues.imageUrl}
                        alt={`Image preview`}
                        onLoad={() => setImageLoaded(true)}
                      />
                    </Box>
                  ) : (
                    <DropzoneInPlace
                      loading={inUploadFlight}
                      showPreview
                      onUpload={handleImageUpload}
                      flexWrapperProps={{
                        w: '100%',
                        h: '150px',
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
                  )}
                </Flex>
              </Flex>
              <FormControl isInvalid={Boolean(errors.externalUrl)}>
                <FormLabel htmlFor="name" fontWeight={400}>
                  Link to item
                </FormLabel>
                <FormHelperText mb={1}>
                  Provide a link to item if this is an item to be purchased.
                  offline
                </FormHelperText>
                <Input
                  id="externalUrl"
                  type="text"
                  {...register('externalUrl')}
                  placeholder="E.g https://www.amazon.com/item/link-to-item"
                  errorBorderColor="red.300"
                />
                <FormErrorMessage>
                  {errors?.externalUrl?.message &&
                    errors.externalUrl.message.toString()}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose} w="50%">
              Cancel
            </Button>
            <CustomButton
              type="submit"
              colorScheme="primary"
              w="50%"
              isLoading={loading}
            >
              Submit
            </CustomButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

type ModalManagerProps = {
  preferredCurrency: string;
  onSave(values: WishlistFormPayload): void;
  initialValues?: Partial<WishlistFormValues>;
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  triggerFunc,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <AddWishlistItemModal isOpen={isOpen} onClose={onToggle} {...props} />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};
