import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Image,
  Skeleton,
  Text,
  usePrevious,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FlexColumn } from 'components/common/MotionContainers';

export interface UploadedFile extends File {
  preview: string;
}
type MyDropzoneProps = {
  onUpload(files: File[]): void;
  showPreview?: boolean;
  loading?: boolean;
  maxFiles?: number;
  dropPlaceholder?: React.ReactNode;
};
const MyDropzone: React.FC<MyDropzoneProps> = ({
  onUpload,
  showPreview,
  loading,
  maxFiles,
  dropPlaceholder,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const prevFiles = usePrevious(files);
  useEffect(() => {
    if (!isEqual(prevFiles, files)) onUpload(files);
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
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
    <FlexColumn w="full" h="full">
      <Flex
        w="full"
        h="full"
        minH="60px"
        minWidth="300px"
        align="center"
        justify="center"
        color="gray.700"
        cursor="pointer"
        borderRadius="3px"
        p="5px"
        pos="relative"
        bg="gray.50"
        border="1px dashed"
        borderColor="purple.400"
        boxSizing="border-box"
        {...getRootProps()}
      >
        {loading ? (
          <Skeleton h="full" w="full" />
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
      {files?.length > 0 && (
        <Flex gap={3} mt={3} w="full">
          {maxFiles === 1 ? (
            <Box
              w="full"
              h="100px"
              border="1px solid"
              borderColor="gray.100"
              pos="relative"
            >
              <CloseIcon
                pos="absolute"
                top={0}
                right={-3}
                color="red.400"
                boxSize="0.7em"
                cursor="pointer"
                onClick={() => handleRemove(0)}
              />
              <Image w="full" h="full" src={files[0].preview} alt={`Preview`} />
            </Box>
          ) : (
            files.map((file, index) => (
              <Box
                key={index}
                w="120px"
                h="80px"
                border="1px solid"
                borderColor="gray.100"
                pos="relative"
              >
                <CloseIcon
                  onClick={() => handleRemove(index)}
                  pos="absolute"
                  top={1}
                  right={1}
                  color="red.400"
                  boxSize="0.7em"
                  cursor="pointer"
                />
                <Image
                  w="full"
                  h="full"
                  src={file.preview}
                  alt={`Preview-${index + 1}`}
                />
              </Box>
            ))
          )}
        </Flex>
      )}
    </FlexColumn>
  );
};

export default MyDropzone;
