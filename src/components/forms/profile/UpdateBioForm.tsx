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
import { isEqual, pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import * as yup from 'yup';
import { DropzoneInPlace } from 'components/common';
import { useFileUpload } from 'hooks';
import { UploadedFile } from 'types/common';
import { User } from 'types/user';
import { removePreviewFromUploadedFiles } from 'utils/functions';

export type UpdateBioFormValues = {
  name: string;
  mobile?: string;
  avatarUrl?: string;
};

type FormProps = {
  onSave(values: UpdateBioFormValues): void;
  initialValues?: Partial<User>;
  loading?: boolean;
};

const schema = yup
  .object({
    name: yup
      .string()
      .typeError('This is required')
      .required('Full name is required'),
    mobile: yup
      .string()
      .matches(
        /^(?:(?:(?:\+?234(?:h1)?|01)h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
        'Phone number format not correct'
      )
      .typeError('This is required')
      .required('This is required'),
    avatarUrl: yup.string().notRequired().nullable(),
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
    if (avatarUrl && !isEqual(prevAvatarUrl, avatarUrl)) {
      setValue('avatarUrl', avatarUrl);
      setUploadView(false);
    }
  }, [avatarUrl, prevAvatarUrl, setValue]);

  useEffect(() => {
    if (uploadError) console.log('Upload error ', uploadError);
  }, [uploadError]);

  const onSubmit = (values: Record<string, unknown>) =>
    onSave(values as UpdateBioFormValues);

  useEffect(() => {
    reset(pick(initialValues, ['name', 'mobile', 'avatarUrl', 'id']));
  }, [initialValues, reset]);

  const handleFileUpload = (items: UploadedFile[]) => {
    const files = removePreviewFromUploadedFiles(items);
    uploadFile(files[0], {
      resourceType: 'User',
      resourceId: formValues.id,
      oldUrl: formValues.avatarUrl,
    });
  };

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
                  onUpload={files =>
                    files.length > 0 && handleFileUpload(files)
                  }
                  flexWrapperProps={{
                    w: '130px',
                    h: '130px',
                    borderRadius: '100%',
                  }}
                  dropPlaceholder={
                    <VStack>
                      <Icon as={BsImage} boxSize="2em" color="purple.500" />
                      <Text textAlign="center" fontSize="sm">
                        Select photo
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
                  name={formValues.name}
                  src={formValues.avatarUrl}
                />
                <Button size="sm" onClick={() => setUploadView(true)}>
                  Upload Avatar
                </Button>
              </>
            )}
          </VStack>

          <Stack flex={1} w={{ base: 'full', lg: '70%' }} spacing="5">
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor="firstName">Full Name</FormLabel>
              <Input
                id="name"
                type="text"
                {...register('name')}
                placeholder="Enter full name"
                errorBorderColor="red.300"
              />
              <FormErrorMessage>
                {errors?.name?.message && errors.name.message.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.mobile)}>
              <FormLabel htmlFor="mobile">Mobile</FormLabel>
              <Input
                id="mobile"
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
