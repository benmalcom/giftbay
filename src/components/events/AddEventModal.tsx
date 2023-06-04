import { CalendarIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
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
  VStack,
  Text,
  usePrevious,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { isEqual, sample } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import { FaTimesCircle } from 'react-icons/fa';
import Select from 'react-select';
import { DropzoneInPlace } from 'components/common';
import { CustomModalCloseButton } from 'components/common/Button';
import {
  parseEventFormValues,
  useEventFormSchema,
} from 'components/events/utils';
import { useFileUpload } from 'hooks/index';
import { EventComponentProps, EventFormValues } from 'types/event';
import {
  CURRENCIES,
  EVENT_CARD_COLORS,
  EVENT_CATEGORIES,
} from 'utils/constants';
import { removePreviewFromUploadedFiles } from 'utils/functions';

type CommonProps = Pick<
  EventComponentProps,
  'onCreate' | 'onUpdate' | 'loading'
> & {
  initialValues?: Partial<EventFormValues>;
};
type FormProps = CommonProps & {
  isOpen: boolean;
  onClose(): void;
};

const keys = Object.keys(EVENT_CARD_COLORS);
const key = sample(keys)!;
const CARD_COLOR = EVENT_CARD_COLORS[key];

const STEPS = 3;
const AddEventModal: React.FC<FormProps> = ({
  initialValues,
  onCreate,
  onUpdate,
  isOpen,
  onClose,
  loading,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const schema = useEventFormSchema({ step: currentStep });
  const [progress, setProgress] = useState(0);
  const [isBannerLoaded, setBannerLoaded] = useState(false);

  const {
    loading: inUploadFlight,
    url: coverPhotoUrl,
    error: uploadError,
    uploadFile,
  } = useFileUpload();

  const LAST_STEP = STEPS;
  const FIRST_STEP = 1;
  const isLastStep = currentStep === LAST_STEP;
  const isFirstStep = currentStep === FIRST_STEP;

  const defaultValues: Partial<EventFormValues> = {
    isPublic: true,
    date: new Date(),
    backgroundColor: CARD_COLOR.value,
    foregroundColor: CARD_COLOR.complement,
    ...initialValues,
  };

  useEffect(() => {
    setProgress((currentStep / STEPS) * 100);
  }, [currentStep]);

  const onSubmitForm = (values: Record<string, unknown>) => {
    if (isLastStep) {
      const payload = parseEventFormValues(values as EventFormValues);
      const closeModal = () => onClose();
      if (payload?.id) {
        onUpdate(payload.id, values, closeModal);
      } else {
        onCreate(values, closeModal);
      }
    } else {
      setCurrentStep(current => (current < LAST_STEP ? current + 1 : current));
    }
  };

  const onPreviousStep = () => {
    setCurrentStep(current => (current > FIRST_STEP ? current - 1 : current));
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors = {} },
    watch,
    setValue,
    reset,
  } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const formValues = watch();

  const handleCoverPhotoUpload = async (files: File[]) =>
    uploadFile(removePreviewFromUploadedFiles(files)[0]);

  const prevCoverPhotoUrl = usePrevious(coverPhotoUrl);
  useEffect(() => {
    if (coverPhotoUrl && !isEqual(prevCoverPhotoUrl, coverPhotoUrl)) {
      setValue('coverPhotoUrl', coverPhotoUrl);
    }
  }, [coverPhotoUrl, prevCoverPhotoUrl, setValue]);

  useEffect(() => {
    if (uploadError) console.log('Upload error ', uploadError);
  }, [uploadError]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent w={{ base: '98%', md: 'full' }}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalHeader fontSize="lg">
              A little info on your Special Occasion
            </ModalHeader>
            <CustomModalCloseButton />

            <ModalBody>
              <Progress
                colorScheme="purple"
                hasStripe
                value={progress}
                mb="30px"
                isAnimated
                borderRadius={3}
                size="sm"
              />
              <Box
                pb={{ base: '4', sm: '4' }}
                bg={useBreakpointValue({
                  base: 'transparent',
                  sm: 'bg-surface',
                })}
                borderRadius={{ base: 'none', sm: 'xl' }}
              >
                <Stack spacing="6">
                  {currentStep === 1 && (
                    <>
                      <FormControl isInvalid={Boolean(errors.name)}>
                        <FormLabel htmlFor="name">Purpose</FormLabel>
                        <FormHelperText mb={2}>
                          What's the purpose of this occasion? Your special
                          birthday or baby shower?
                        </FormHelperText>
                        <Input
                          id="name"
                          type="text"
                          {...register('name')}
                          placeholder="E.g my special birthday wishlist"
                          errorBorderColor="red.300"
                        />
                        <Flex
                          align="flex-start"
                          justify={
                            errors?.name?.message ? 'space-between' : 'end'
                          }
                        >
                          <FormErrorMessage>
                            {errors?.name?.message &&
                              errors.name.message.toString()}
                          </FormErrorMessage>
                          <Text textAlign="right" fontSize="sm">
                            {formValues?.name?.length || 0}/40
                          </Text>
                        </Flex>
                      </FormControl>

                      <FormControl
                        isInvalid={Boolean(errors.category)}
                        zIndex={3}
                      >
                        <FormLabel htmlFor="category">Kind of event</FormLabel>
                        <FormHelperText mb={2}>
                          What category of events does your special moment fall
                          in?
                        </FormHelperText>
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              instanceId="category"
                              placeholder="Select category..."
                              isClearable
                              options={EVENT_CATEGORIES}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  height: '40px',
                                  width: '100%',
                                  borderRadius: '7px',
                                  borderWidth: '2px',
                                  boxShadow:
                                    state.isFocused || state.menuIsOpen
                                      ? 'none'
                                      : undefined,
                                  borderColor: errors?.currency
                                    ? 'red'
                                    : undefined,
                                }),
                                placeholder: baseStyles => ({
                                  ...baseStyles,
                                  fontSize: '16px',
                                }),
                              }}
                            />
                          )}
                          name="category"
                        />
                        <FormErrorMessage>
                          {errors?.category?.message &&
                            errors.category.message.toString()}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={Boolean(errors.date)}>
                        <FormLabel htmlFor="date">Date</FormLabel>
                        <FormHelperText mb={2}>
                          What date is this special occasion?
                        </FormHelperText>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <InputGroup size="md" zIndex={2}>
                              <SingleDatepicker
                                name="date"
                                onDateChange={date => onChange(date)}
                                date={value as Date}
                                propsConfigs={{
                                  inputProps: {
                                    placeholder: 'Choose date...',
                                    borderRight: 'none',
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                  },
                                }}
                              />
                              <InputRightAddon
                                border="1px solid"
                                borderColor="gray.200"
                                borderLeft="none"
                              >
                                <CalendarIcon />
                              </InputRightAddon>
                            </InputGroup>
                          )}
                          name="date"
                        />
                        <FormErrorMessage>
                          {errors?.date?.message &&
                            errors.date.message.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <FormControl isInvalid={Boolean(errors.name)}>
                        <FormLabel htmlFor="name">Description</FormLabel>
                        <FormHelperText mb={2}>
                          Supply a little detail about this, it will be shown to
                          users subscribing to your registry.
                        </FormHelperText>
                        <Textarea
                          id="description"
                          {...register('description')}
                          placeholder="A little information on this special moment"
                          errorBorderColor="red.300"
                          rows={4}
                        />
                        <FormErrorMessage>
                          {errors?.description?.message &&
                            errors.description.message.toString()}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={Boolean(errors.currency)}
                        zIndex={3}
                      >
                        <FormLabel htmlFor="category" fontWeight={400}>
                          Preferred currency
                        </FormLabel>
                        <FormHelperText mb={2}>
                          In what currency will you be receiving cash gifts?
                        </FormHelperText>
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              instanceId="currency"
                              placeholder="Select..."
                              name="currency"
                              isClearable
                              options={CURRENCIES}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  height: '40px',
                                  width: '100%',
                                  borderRadius: '7px',
                                  borderWidth: '2px',
                                  boxShadow:
                                    state.isFocused || state.menuIsOpen
                                      ? 'none'
                                      : undefined,
                                  borderColor: errors?.currency
                                    ? 'red'
                                    : undefined,
                                }),
                                placeholder: baseStyles => ({
                                  ...baseStyles,
                                  fontSize: '16px',
                                }),
                              }}
                            />
                          )}
                          name="currency"
                        />
                        <FormErrorMessage>
                          {errors?.currency?.message &&
                            errors.currency.message.toString()}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.isPublic)}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <Checkbox
                              isChecked={value}
                              onChange={onChange}
                              name={name}
                              colorScheme="purple"
                            >
                              Display publicly?
                            </Checkbox>
                          )}
                          name="isPublic"
                        />
                      </FormControl>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <FormControl>
                        {formValues.coverPhotoUrl ? (
                          <Flex
                            h="130px"
                            w="full"
                            pos="relative"
                            bg="white"
                            rounded="md"
                            p="1px"
                            shadow="md"
                            borderRadius="4px"
                            border="1px solid"
                            borderColor="gray.200"
                          >
                            <Image
                              w="full"
                              h="full"
                              objectFit="cover"
                              borderRadius="inherit"
                              filter="brightness(80%)"
                              alt="Banner image"
                              src={formValues.coverPhotoUrl}
                              onLoad={() => setBannerLoaded(true)}
                              onEnded={() => setBannerLoaded(false)}
                            />
                            {isBannerLoaded && (
                              <Icon
                                as={FaTimesCircle}
                                color="red"
                                pos="absolute"
                                top={1}
                                right={1}
                                onClick={() => setValue('coverPhotoUrl', '')}
                                cursor="pointer"
                              />
                            )}
                          </Flex>
                        ) : (
                          <>
                            <FormHelperText mb={2}>
                              Upload a cover photo for your registry page, if
                              none we'll use our default.
                            </FormHelperText>
                            <DropzoneInPlace
                              loading={inUploadFlight}
                              onUpload={files =>
                                files.length > 0 &&
                                handleCoverPhotoUpload(files)
                              }
                              flexWrapperProps={{
                                w: '100%',
                                h: '130px',
                              }}
                              dropPlaceholder={
                                <VStack>
                                  <Icon
                                    as={BsImage}
                                    boxSize="2em"
                                    color="purple.500"
                                  />
                                  <Text textAlign="center" fontSize="sm">
                                    Select photo or Drag file here
                                  </Text>
                                </VStack>
                              }
                            />
                          </>
                        )}
                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.thankYouNote)}>
                        <FormLabel htmlFor="name">Thank you note</FormLabel>
                        <FormHelperText mb={2}>
                          Would you like to thank anyone who gives towards this?
                          Type the message below.
                        </FormHelperText>
                        <Textarea
                          id="thankYouNote"
                          {...register('thankYouNote')}
                          placeholder={`Enter "thank you" message`}
                          errorBorderColor="red.300"
                          rows={4}
                        />
                        <FormErrorMessage>
                          {errors?.thankYouNote?.message &&
                            errors.thankYouNote.message.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    </>
                  )}
                </Stack>
              </Box>
            </ModalBody>
            <ModalFooter>
              {!isFirstStep && (
                <Button
                  colorScheme="white"
                  color="gray.800"
                  border="1px solid"
                  borderColor="gray.200"
                  mr={3}
                  onClick={onPreviousStep}
                >
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                colorScheme="purple"
                isLoading={
                  loading.create ||
                  (!!formValues?.id && loading[`update_${formValues.id}`])
                }
              >
                {isLastStep ? 'Submit' : 'Continue'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

type ModalManagerProps = CommonProps & {
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  triggerFunc,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      {isOpen && (
        <AddEventModal isOpen={isOpen} onClose={onToggle} {...props} />
      )}
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};
