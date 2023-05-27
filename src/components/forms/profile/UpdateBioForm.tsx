import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  usePrevious,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import * as yup from 'yup';
import { DropzoneInPlace } from 'components/common';
import { useFileUpload } from 'hooks';
import { User } from 'types/user';
import { getUserFullName } from 'utils/functions';

export type UpdateBioFormValues = {
  firstName: string;
  lastName: string;
  mobile?: string;
};

type FormProps = {
  onSave(values: UpdateBioFormValues): void;
  initialValues?: User;
  loading?: boolean;
};

const schema = yup
  .object({
    firstName: yup
      .string()
      .typeError('This is required')
      .required('First name is required'),
    lastName: yup
      .string()
      .typeError('This is required')
      .required('First name is required'),
    mobile: yup
      .string()
      .typeError('This is required')
      .required('Your mobile number is required'),
    avatarUrl: yup.string().notRequired(),
  })
  .required();

const UpdateBioForm: React.FC<FormProps> = ({
  initialValues,
  onSave,
  loading,
}) => {
  const [isUploadView, setUploadView] = useState(false);
  const {
    loading: inUploadFlight,
    url: avatarUrl,
    error: uploadError,
    uploadFile,
  } = useFileUpload();
  const {
    register,
    handleSubmit: handleSubmit,
    formState: { errors: errors = {} },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const formValues = watch();

  const prevAvatarUrl = usePrevious(avatarUrl);
  useEffect(() => {
    if (
      (!prevAvatarUrl && avatarUrl) ||
      (prevAvatarUrl && avatarUrl && prevAvatarUrl !== avatarUrl)
    ) {
      setValue('avatarUrl', avatarUrl);
      setUploadView(false);
    }
  }, [avatarUrl, prevAvatarUrl, setValue]);

  const onSubmit = (values: Record<string, unknown>) => {
    onSave(values as UpdateBioFormValues);
  };

  useEffect(() => {
    reset(
      pick(initialValues, [
        'firstName',
        'lastName',
        'mobile',
        'avatarUrl',
        'id',
      ])
    );
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing="6"
        w={{ base: '95%', sm: '350px', lg: '450px', xl: '550px' }}
        bg="white"
        p={8}
        shadow="base"
        borderRadius="md"
        mx="auto"
      >
        <Heading as="h4" size="md" fontWeight={500}>
          Update Bio/Avatar
        </Heading>
        <Flex
          w="full"
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'center', sm: 'flex-start' }}
          columnGap={5}
        >
          <VStack spacing={3} w={{ base: 'full', lg: '30%' }} mb={10}>
            {isUploadView ? (
              <>
                <DropzoneInPlace
                  loading={inUploadFlight}
                  showPreview
                  onUpload={files => files.length > 0 && uploadFile(files[0])}
                  flexWrapperProps={{
                    w: '130px',
                    h: '120px',
                  }}
                  dropPlaceholder={
                    <VStack>
                      <Icon as={BsImage} boxSize="2em" color="purple.500" />
                      <Text textAlign="center" fontSize="sm">
                        Select photo here
                      </Text>
                    </VStack>
                  }
                />
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => setUploadView(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Avatar
                  size="2xl"
                  name={getUserFullName(formValues)}
                  src={formValues.avatarUrl}
                />
                <Button size="sm" onClick={() => setUploadView(true)}>
                  Upload Avatar
                </Button>
              </>
            )}
          </VStack>

          <Stack flex={1} w={{ base: 'full', lg: '70%' }} spacing="5">
            <FormControl isInvalid={Boolean(errors.firstName)}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                type="text"
                {...register('firstName')}
                placeholder="Enter first name"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.firstName?.message &&
                  errors.firstName.message.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.lastName)}>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <Input
                id="lastName"
                type="text"
                {...register('lastName')}
                placeholder="Last name"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.lastName?.message &&
                  errors.lastName.message.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.mobile)}>
              <FormLabel htmlFor="github">Mobile</FormLabel>
              <Input
                id="github"
                type="text"
                {...register('mobile')}
                placeholder="Mobile number"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.mobile?.message && errors.mobile.message.toString()}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </Flex>

        <Stack spacing="1" direction="row">
          <Button type="submit" colorScheme="purple" isLoading={loading}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UpdateBioForm;
