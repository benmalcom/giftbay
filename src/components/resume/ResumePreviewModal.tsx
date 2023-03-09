import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Button,
} from '@chakra-ui/react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { useSession } from 'next-auth/react';
import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { withDownloadCta } from 'components/resume/ResumeDownloadable';
import { ResumeType } from 'types/resume';
import { User } from 'types/user';

type ModalProps = {
  isOpen: boolean;
  onClose(): void;
  resume: ResumeType;
  user: User;
};

const ResumePreviewModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  resume,
  user,
}) => {
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const ResumeDownloadable = withDownloadCta();
  const onGenerate = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent pt={5} pb={10}>
          <ModalHeader>
            <Button
              onClick={onGenerate}
              leftIcon={<AiOutlineDownload color="teal" />}
            >
              Download
            </Button>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as={Flex} justifyContent="center">
            <ResumeDownloadable
              ref={pdfExportComponent}
              user={user}
              resume={resume}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

type ModalManagerProps = Pick<ModalProps, 'resume'> & {
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  triggerFunc,
  resume,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { data } = useSession();
  if (!data?.user) return null;
  return (
    <>
      <ResumePreviewModal
        isOpen={isOpen}
        onClose={onToggle}
        resume={resume}
        user={data.user}
      />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};
