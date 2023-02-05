/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillFilePdf, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { Document, Page, pdfjs } from 'react-pdf';
import usePDFObjectUrl from 'hooks/usePDFObjectUrl';
import { ResumeData } from 'types/resume';
dayjs.extend(relativeTime);

type ResumePDFProps = {
  resumeData: ResumeData;
  onCreateResume(payload: Record<string, unknown>): void;
  inCreateFlight?: boolean;
  onDeleteResume(resumeId: string): void;
  inDeleteFlight?: boolean;
};

const ResumePDF: React.FC<ResumePDFProps> = ({
  resumeData,
  inCreateFlight,
  onCreateResume,
  onDeleteResume,
  inDeleteFlight,
}) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [, setNumPages] = useState(null);

  // @ts-ignore: Ignore Type
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const fileUrl = usePDFObjectUrl(resumeData.fileContents!);

  const onDuplicate = () => {
    onCreateResume({
      contents: resumeData.contents,
      fileContents: resumeData.fileContents,
    });
  };

  return (
    <Flex role="group" boxShadow="md" position="relative" zIndex={1}>
      <Box
        w="100%"
        h="100%"
        position="absolute"
        zIndex={2}
        bg="rgba(0, 0, 0, 0.5)"
        display="none"
        _groupHover={{ display: 'block' }}
      />
      <Flex
        display="none"
        _groupHover={{ display: 'flex' }}
        w="100%"
        h="100%"
        flexDir="column"
        position="absolute"
        align="center"
        justify="center"
        zIndex={3}
        py={5}
        rowGap={4}
      >
        <Flex gap={2}>
          <Button
            size="sm"
            onClick={onDuplicate}
            isLoading={inCreateFlight}
            cursor="pointer"
          >
            <AiFillFilePdf color="red" style={{ marginRight: '2px' }} />
            Duplicate
          </Button>

          <Link href={`/builder/${resumeData.id}`}>
            <Button as="a" size="sm" colorScheme="orange" cursor="pointer">
              <AiOutlineEdit />
            </Button>
          </Link>
          <Button
            as="a"
            size="sm"
            colorScheme="red"
            isLoading={inDeleteFlight}
            onClick={() => onDeleteResume(resumeData.id)}
            cursor="pointer"
          >
            <AiFillDelete color="white" />
          </Button>
        </Flex>
        <Flex>
          <Text color="white" fontSize="13px" fontWeight={600} mr={1}>
            Last edited:
          </Text>{' '}
          <Text color="white" fontSize="13px" fontWeight={500}>
            {dayjs(resumeData.updatedAt).fromNow()}
          </Text>
        </Flex>
      </Flex>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={1}
          height={300}
          scale={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </Flex>
  );
};

export default ResumePDF;
