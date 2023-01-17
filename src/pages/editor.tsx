import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Link as ChakraLink,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { EditorLayout } from 'components/layouts';
import { withAuthServerSideProps } from 'utils/serverSideProps';

export const Editor = () => {
  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      Editor
    </Container>
  );
};

Editor.Layout = EditorLayout;
export default Editor;

export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Edit Resume',
    },
  };
});
