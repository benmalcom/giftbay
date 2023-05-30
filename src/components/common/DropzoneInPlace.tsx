import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FlexProps,
  Image,
  Skeleton,
  Text,
  usePrevious,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadedFile } from 'types/common';

type MyDropzoneProps = {
  onUpload(files: UploadedFile[]): void;
  showPreview?: boolean;
  loading?: boolean;
  maxFiles?: number;
  dropPlaceholder?: React.ReactNode;
  flexWrapperProps?: FlexProps;
};

const DropzoneInPlace: React.FC<MyDropzoneProps> = ({
  onUpload,
  showPreview,
  loading,
  maxFiles,
  dropPlaceholder,
  flexWrapperProps,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const prevFiles = usePrevious(files);
  useEffect(() => {
    if (!isEqual(prevFiles, files)) onUpload(files);
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => file.preview && URL.revokeObjectURL(file.preview));
    };
  }, [files, onUpload, prevFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: showPreview ? URL.createObjectURL(file) : '',
          })
        )
      );
    },
  });

  const handleRemove = (index: number) =>
    setFiles(files => files.filter((val, i) => i !== index));

  return (
    <Flex
      {...flexWrapperProps}
      align="center"
      justify="center"
      color="gray.700"
      cursor="pointer"
      borderRadius={flexWrapperProps?.borderRadius ?? '3px'}
      p="5px"
      pos="relative"
      bg="gray.50"
      border="1px dashed"
      borderColor="purple.400"
      boxSizing="border-box"
      {...getRootProps()}
    >
      {loading ? (
        <Skeleton h="full" w="full" borderRadius="inherit" />
      ) : files?.length > 0 ? (
        <Box
          w="full"
          h="full"
          border="1px solid"
          borderColor="gray.100"
          pos="relative"
          borderRadius="inherit"
          onClick={e => e.stopPropagation()}
        >
          <CloseIcon
            pos="absolute"
            top={-4}
            right={-5}
            color="red.400"
            boxSize="0.7em"
            cursor="pointer"
            onClick={() => handleRemove(0)}
          />
          <Image
            w="full"
            h="full"
            src={files[0].preview}
            alt={`Image preview`}
            borderRadius="inherit"
          />
        </Box>
      ) : (
        <>
          <input {...getInputProps()} />
          {dropPlaceholder ?? (
            <Flex
              cursor="pointer"
              overflow="hidden"
              whiteSpace="nowrap"
              align="center"
              justify="center"
              w="full"
              h="full"
            >
              <Text fontSize="sm">
                Drag 'n' drop some files here, or click to select files
              </Text>
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default DropzoneInPlace;
