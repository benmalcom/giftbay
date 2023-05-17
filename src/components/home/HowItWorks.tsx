import {
  Button,
  Flex,
  Heading,
  Highlight,
  Image,
  Text,
  Container,
} from '@chakra-ui/react';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';

const HowItWorks = () => (
  <Flex
    w="full"
    minH="500px"
    bg="white"
    shadow="base"
    borderBottom="1px solid #ddd"
    my="20px"
  >
    <Container py={1.5} maxW="7xl" h="full" alignItems="center">
      <Flex justify="space-between" align="center" h="full"></Flex>
    </Container>
  </Flex>
);

export default HowItWorks;
