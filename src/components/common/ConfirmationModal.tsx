import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalFooter,
  Text,
  ButtonProps,
  usePrevious,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

type ConfirmationModalProps = {
  onProceed(): void;
  onClose(): void;
  message?: string;
  isOpen: boolean;
  proceedButtonProps?: ButtonProps;
  isProcessing?: boolean;
  closeAfterProcessing?: boolean;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onProceed,
  message,
  onClose,
  isOpen,
  closeAfterProcessing,
  isProcessing,
  proceedButtonProps,
}) => {
  const prevIsProcessing = usePrevious(isProcessing);

  useEffect(() => {
    if (prevIsProcessing && !isProcessing) {
      if (closeAfterProcessing) onClose();
    }
  }, [closeAfterProcessing, isProcessing, onClose, prevIsProcessing]);

  const handleProceed = () => {
    onProceed();
    if (closeAfterProcessing && !isProcessing) onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={0}>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">
              {message ?? 'Are you sure you want to proceed?'}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleProceed}
              {...proceedButtonProps}
              isLoading={isProcessing}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

type ModalManagerProps = Omit<ConfirmationModalProps, 'onClose' | 'isOpen'> & {
  triggerFunc({ trigger }: { trigger(): void }): React.ReactNode;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  triggerFunc,
  ...rest
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <ConfirmationModal isOpen={isOpen} onClose={onToggle} {...rest} />
      {triggerFunc({
        trigger: onToggle,
      })}
    </>
  );
};
