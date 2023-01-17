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
import NavBar from './NavBar';

export const EditorLayout = () => {
  return (
    <Stack spacing="8">
      <NavBar />
    </Stack>
  );
};

export default EditorLayout;
