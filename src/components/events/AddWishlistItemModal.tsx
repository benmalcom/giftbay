import { CloseIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
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
  usePrevious,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import { DropzoneInPlace } from 'components/common';
import {
  Button as CustomButton,
  CustomModalCloseButton,
} from 'components/common/Button';
import {
  getWishlistFormSchema,
  parseWishlistFormValues,
} from 'components/events/utils';
import useFileUpload from 'hooks/useFileUpload';
import { WishlistFormPayload, WishlistFormValues } from 'types/wishlist';
import { GIFT_FORMAT } from 'utils/constants';
import { removePreviewFromUploadedFiles } from 'utils/functions';

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

  const {
    loading: inUploadFlight,
    url: imageUrl,
    error: uploadError,
    uploadFile,
  } = useFileUpload();

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

  const prevImageUrl = usePrevious(imageUrl);
  useEffect(() => {
    if (imageUrl && !isEqual(prevImageUrl, imageUrl)) {
      setValue('imageUrl', imageUrl);
    }
  }, [setValue, imageUrl, prevImageUrl]);

  useEffect(() => {
    if (uploadError) console.log('Upload error ', uploadError);
  }, [uploadError]);

  const handleImageUpload = async (files: File[]) =>
    uploadFile(removePreviewFromUploadedFiles(files)[0]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant="subtle"
      colorScheme="purple"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent w={{ base: '98%', md: 'full' }} pos="relative">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <ModalHeader fontSize="xl" color="gray.500" px={5}>
            Wishlist Item
          </ModalHeader>
          <CustomModalCloseButton />

          <ModalBody pb={5} px={5}>
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
                    <FormHelperText fontSize={{ base: 'xs' }} mb={1}>
                      Or the cost equivalent of the item
                    </FormHelperText>
                    <InputGroup>
                      <InputLeftAddon border="1px solid" borderColor="gray.200">
                        {preferredCurrency}
                      </InputLeftAddon>
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
                    <Box
                      w="100"
                      h="150px"
                      pos="relative"
                      bg="white"
                      p="1px"
                      shadow="md"
                      borderRadius="4px"
                      border="1px solid"
                      borderColor="gray.200"
                    >
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
                      onUpload={files =>
                        files.length > 0 && handleImageUpload(files)
                      }
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
