import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillFilePdf, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { Document, Page, pdfjs } from 'react-pdf';
import usePDFObjectUrl from 'hooks/usePDFObjectUrl';
import { ResumeData } from 'types/resume';

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
    <Flex
      role="group"
      boxShadow="md"
      w="fit-content"
      position="relative"
      zIndex={1}
      _hover={{
        cursor: 'pointer',
      }}
    >
      <Box
        w="100%"
        h="100%"
        position="absolute"
        zIndex={2}
        bg="rgba(0, 0, 0, 0.4)"
        display="none"
        _groupHover={{ display: 'block' }}
      />
      <Flex
        display="none"
        _groupHover={{ display: 'flex' }}
        w="100%"
        h="100%"
        flexDir="column"
      >
        <Flex
          position="absolute"
          transform="translate(-50%, -50%)"
          left="50%"
          top="50%"
          zIndex={3}
          gap={2}
        >
          <Button size="sm" onClick={onDuplicate} isLoading={inCreateFlight}>
            <AiFillFilePdf color="red" style={{ marginRight: '2px' }} />
            Duplicate
          </Button>

          <Link href={`/builder/${resumeData.id}`}>
            <Button as="a" size="sm" colorScheme="orange">
              <AiOutlineEdit />
            </Button>
          </Link>
          <Button
            as="a"
            size="sm"
            colorScheme="red"
            isLoading={inDeleteFlight}
            onClick={() => onDeleteResume(resumeData.id)}
          >
            <AiFillDelete color="white" />
          </Button>
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
