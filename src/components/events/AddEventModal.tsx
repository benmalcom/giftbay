import { CalendarIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaTimesCircle } from 'react-icons/fa';
import { Select } from 'components/common/Select';
import {
  parseEventFormPayload,
  useEventFormSchema,
} from 'components/events/utils';
import { EventFormPayload, EventFormValues, EventType } from 'types/event';
import { EVENT_CATEGORIES } from 'utils/constants';
import EventDropZone from './EventDropZone';
import { uploadImage } from '../../services/media';

type FormProps = {
  onSave(values: EventFormPayload): void;
  initialValues?: Partial<EventType>;
  isOpen: boolean;
  onClose(): void;
  loading?: boolean;
};

const STEPS = 3;
const AddEventModal: React.FC<FormProps> = ({
  initialValues,
  onSave,
  isOpen,
  onClose,
  loading,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const schema = useEventFormSchema({ step: currentStep });
  const [progress, setProgress] = useState(0);
  const [isBannerLoaded, setBannerLoaded] = useState(false);
  const [inUploadFlight, setInUploadFlight] = useState(false);

  const LAST_STEP = STEPS;
  const FIRST_STEP = 1;
  const isLastStep = currentStep === LAST_STEP;
  const isFirstStep = currentStep === FIRST_STEP;

  console.log('inUploadFlight ', inUploadFlight);

  const defaultValues = {
    isPublic: true,
    date: new Date(),
    ...initialValues,
  };

  useEffect(() => {
    setProgress((currentStep / STEPS) * 100);
  }, [currentStep]);

  const onSubmitForm = (values: Record<string, unknown>) => {
    if (isLastStep) {
      const payload = parseEventFormPayload(values as EventFormValues);
      onSave(payload);
      onClose();
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
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const formValues = watch();

  const handleCoverPhotoUpload = async (files: File[]) => {
    if (!files.length) {
      setValue('coverPhoto', undefined);
      return;
    }
    setInUploadFlight(true);
    const file = files[0];
    const payload = new FormData();
    payload.append('type', 'banner');
    payload.append('file', file);
    try {
      const { data } = await uploadImage(payload);
      setValue('coverPhoto', data?.file?.url);
      toast.success('Cover photo uploaded');
    } catch (e: any) {
      toast.error(e.message ?? 'Unable to upload cover photo');
    } finally {
      setInUploadFlight(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalHeader fontSize="lg">
              A little info on your Special Occasion
            </ModalHeader>
            <ModalCloseButton outline="none" _active={{ outline: 'one' }} />
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
                        <FormErrorMessage>
                          {errors?.name?.message &&
                            errors.name.message.toString()}
                        </FormErrorMessage>
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
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              placeholder="Select category..."
                              name="category"
                              isClearable
                              onChange={onChange}
                              onBlur={onBlur}
                              options={EVENT_CATEGORIES}
                              value={value}
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
                                onDateChange={date => {
                                  setValue('date', date);
                                  onChange(date);
                                }}
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
                              <InputRightAddon>
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
                          Describe in detail what this is about, it will be
                          shown to users subscribing to your registry.
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
                      <FormControl isInvalid={Boolean(errors.isPublic)}>
                        <FormHelperText mb={2}>
                          Should we display this in our public registry?
                        </FormHelperText>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <Checkbox
                              isChecked={value}
                              onChange={onChange}
                              name={name}
                              colorScheme="purple"
                            >
                              Make it public
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
                        {formValues.coverPhoto ? (
                          <Flex
                            h="90px"
                            w="full"
                            pos="relative"
                            bg="white"
                            rounded="md"
                            border="1px solid"
                            borderColor="gray.300"
                            p="1px"
                          >
                            <Image
                              w="full"
                              h="full"
                              objectFit="cover"
                              borderRadius="inherit"
                              filter="brightness(80%)"
                              alt="Banner image"
                              src={formValues.coverPhoto}
                              onLoad={() => setBannerLoaded(true)}
                            />
                            {isBannerLoaded && (
                              <Icon
                                as={FaTimesCircle}
                                color="red"
                                pos="absolute"
                                top={1}
                                right={1}
                                onClick={() => setValue('coverPhoto', '')}
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
                            <EventDropZone
                              showPreview
                              onUpload={handleCoverPhotoUpload}
                              maxFiles={1}
                              loading={inUploadFlight}
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
            <ModalFooter borderTop="1px solid" borderColor="gray.200">
              {!isFirstStep && (
                <Button colorScheme="gray" mr={3} onClick={onPreviousStep}>
                  Previous
                </Button>
              )}
              <Button type="submit" colorScheme="purple" isLoading={loading}>
                {isLastStep ? 'Submit' : 'Continue'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

type ModalManagerProps = {
  onSave(values: EventFormPayload): void;
  initialValues?: Partial<EventType>;
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
      <AddEventModal
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
