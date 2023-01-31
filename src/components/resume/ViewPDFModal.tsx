import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import usePDFObjectUrl from 'hooks/usePDFObjectUrl';

type ViewPDFModalProps = {
  fileContents: string;
  isOpen: boolean;
  onClose(): void;
};

const ViewPDFModal: React.FC<ViewPDFModalProps> = ({
  fileContents,
  isOpen,
  onClose,
}) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [, setNumPages] = useState(null);

  // @ts-ignore: Ignore Type
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const fileUrl = usePDFObjectUrl(fileContents!);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent justifyContent="center">
          <ModalCloseButton cursor="pointer" />
          <ModalBody>
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                pageNumber={1}
                scale={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

type ModalManagerProps = {
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
  fileContents: string;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  triggerFunc,
  fileContents,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <ViewPDFModal
        isOpen={isOpen}
        onClose={onToggle}
        fileContents={fileContents}
      />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};
