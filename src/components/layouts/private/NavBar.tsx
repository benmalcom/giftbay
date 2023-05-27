import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Container,
  Button,
  HStack,
  ButtonGroup,
  useDisclosure,
  Box,
  useColorModeValue,
  CloseButton,
  BoxProps,
  FlexProps,
  Icon,
  Drawer,
  DrawerContent,
  Link as ChakraLink,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Text,
  IconButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Logo } from 'components/common';
import { logOutUser } from 'services/auth';
import { User } from 'types/user';
import { APP_BASE_URL } from 'utils/constants';
import SidebarContent from './SidebarContent';

type NavBarProps = {
  user?: User;
  onClose(): void;
  onOpen(): void;
  isOpen: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ user, onClose, isOpen, onOpen }) => {
  const handleLogOut = async () => {
    signOut({ callbackUrl: APP_BASE_URL });
    await logOutUser();
  };
  const router = useRouter();

  return (
    <>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent bg="gray.50">
          <SidebarContent onClose={onClose} bg="transparent" />
        </DrawerContent>
      </Drawer>
      <Flex
        w="full"
        minH="70px"
        maxH="70px"
        borderBottom="1px solid"
        borderBottomColor="rgba(0, 0, 0, .1)"
        as="nav"
        align="center"
        px={5}
        bg="gray.50"
        shadow="sm"
      >
        <Flex
          as="nav"
          justify={{ base: 'space-between', xl: 'end' }}
          align="center"
          w="full"
          h="full"
          columnGap={5}
        >
          {/* Display mobile menu button until large devices*/}
          <Flex
            align="center"
            h="full"
            columnGap={3}
            display={{ base: 'flex', xl: 'none' }}
          >
            <IconButton
              onClick={onOpen}
              variant="outline"
              aria-label="open menu"
              icon={<FiMenu />}
            />
            <Logo />
          </Flex>
          <Flex alignItems="center" h="full">
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack align="flex-start">
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                    alignSelf="flex-start"
                  >
                    <Text fontSize="sm" fontWeight={500} mt="-4px">
                      Justina Clark
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      User
                    </Text>
                  </VStack>
                  <IconButton
                    size="xs"
                    icon={<ChevronDownIcon fontSize="lg" />}
                    display={{ base: 'none', md: 'flex' }}
                    aria-label="dropdown-icon"
                  />
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <Link href="/profile" passHref>
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link href="/settings" passHref>
                  <MenuItem>Settings</MenuItem>
                </Link>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
