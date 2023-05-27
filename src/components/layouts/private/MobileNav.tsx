import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { Logo } from 'components/common';
import { APP_BASE_URL } from 'utils/constants';
import { logOutUser } from '../../../services/auth';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const handleLogOut = async () => {
    signOut({ callbackUrl: APP_BASE_URL });
    await logOutUser();
  };
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="full"
      w="full"
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box display={{ base: 'flex', md: 'none' }}>
        <Logo />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
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
              <Link href="/src/pages/profile" passHref>
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link href="/src/pages/settings" passHref>
                <MenuItem>Settings</MenuItem>
              </Link>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;