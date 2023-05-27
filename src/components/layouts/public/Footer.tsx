import {
  ButtonGroup,
  Container,
  IconButton,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <Box
    w="full"
    minH="70px"
    boxSizing="border-box"
    bg="white"
    borderTop="1px solid #CBD5E0"
  >
    <Container as="footer" role="contentinfo" maxW="7xl" h="full">
      <Flex
        gap={{ base: '4', md: '5' }}
        justify="space-between"
        align="center"
        h="full"
      >
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Gift Bay. All rights reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="Instagram"
            colorScheme="pink"
            icon={<FaInstagram fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
            colorScheme="twitter"
          />
        </ButtonGroup>
      </Flex>
    </Container>
  </Box>
);

export default Footer;
