import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

interface UploadedFile extends File {
  preview: string;
}
type MyDropzoneProps = {
  onUpload(files: UploadedFile[]): void;
  showPreview?: boolean;
  loading?: boolean;
};
const MyDropzone: React.FC<MyDropzoneProps> = ({
  onUpload,
  showPreview,
  loading,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [fileInfo, setFileInfo] = useState<React.ReactNode | null | string>(
    null
  );

  useEffect(() => {
    if (files?.length) {
      const name = files[0].name;
      const info = name + (files.length > 1 ? ` + ${files.length - 1}` : '');
      setFileInfo(info);
    } else {
      setFileInfo(
        <Text fontSize="sm">
          Drag 'n' drop some files here, or click to select files
        </Text>
      );
    }

    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
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

  const hasFiles = files.length > 0;
  const isUploadDirty = hasFiles;

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFiles([]);
  };

  return (
    <Flex
      borderRadius="3px"
      minWidth="300px"
      p="5px 10px"
      pos="relative"
      justify="flex-end"
      w="full"
      minH="50px"
      h="full"
      bg="gray.50"
      border="1px dashed"
      borderColor="purple.400"
      boxSizing="border-box"
    >
      <Flex
        w="full"
        h="100%"
        align="center"
        justify="center"
        lineHeight="17px"
        color="gray.700"
        borderRadius="inherit"
        cursor="pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Flex
          flexDir={hasFiles ? 'row-reverse' : 'row'}
          mb={0}
          cursor="pointer"
          overflow="hidden"
          whiteSpace="nowrap"
          align="center"
          textOverflow="ellipsis"
        >
          {fileInfo}
        </Flex>
      </Flex>
      {isUploadDirty && !loading && (
        <Flex borderRadius="6px" align="center" justify="flex-end">
          <MdCancel onClick={handleCancel}>x</MdCancel>
        </Flex>
      )}
    </Flex>
  );
};

export default MyDropzone;
