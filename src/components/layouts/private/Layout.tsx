import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { Logo } from 'components/common';
import NavBar from './NavBar';
import SidebarContent from './Sidebar';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log('isOpen ', isOpen);
  return (
    <Flex h="100vh" w="full" shadow="xl">
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', lg: 'flex' }}
      />
      <Flex h="full" flex={1} justify="center">
        <NavBar onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      </Flex>
    </Flex>
  );
}
