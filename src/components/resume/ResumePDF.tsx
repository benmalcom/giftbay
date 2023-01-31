import { Box, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillFilePdf, AiOutlineEdit } from 'react-icons/ai';
import { Document, Page, pdfjs } from 'react-pdf';
import usePDFObjectUrl from 'hooks/usePDFObjectUrl';
import { ResumeData } from 'types/resume';

type ResumePDFProps = {
  resumeData: ResumeData;
  onCreateResume(payload: Record<string, unknown>): void;
  inCreateFlight?: boolean;
};

const ResumePDF: React.FC<ResumePDFProps> = ({
  resumeData,
  inCreateFlight,
  onCreateResume,
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
        position="absolute"
        display="none"
        transform="translate(-50%, -50%)"
        left="50%"
        top="50%"
        zIndex={3}
        _groupHover={{ display: 'flex' }}
        justify="center"
      >
        <Button
          size="sm"
          m={1}
          onClick={onDuplicate}
          isLoading={inCreateFlight}
        >
          <AiFillFilePdf color="red" style={{ marginRight: '2px' }} />
          Duplicate
        </Button>

        <Link href={`/builder/${resumeData.id}`}>
          <Button as="a" size="sm" m={1} colorScheme="orange">
            <AiOutlineEdit style={{ marginRight: '2px' }} />
            Edit
          </Button>
        </Link>
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
