import { ModalCloseButton } from '@chakra-ui/react';
import React from 'react';

// To use this modal close button, make the ModalContent position relative
const CustomModalCloseButton = () => (
  <ModalCloseButton
    outline="none"
    color="#ffffff"
    pos="absolute"
    borderRadius="50%"
    border="1px solid white"
    right={{ base: 0, md: -6 }}
    top={{ base: -7, md: -6 }}
    w="25px"
    h="25px"
    _active={{ outline: 'one', border: 'none' }}
  />
);

export default CustomModalCloseButton;
