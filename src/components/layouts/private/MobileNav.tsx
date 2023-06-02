import {
  Avatar,
  Box,
  Divider,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { RxDropdownMenu } from 'react-icons/rx';
import { Logo } from 'components/common';
import { UserLinkItems } from 'components/layouts/utils';
import { User } from 'types/user';
import { APP_BASE_URL } from 'utils/constants';

interface MobileProps extends FlexProps {
  onOpen: () => void;
  user: User;
}
const MobileNav = ({ onOpen, user, ...rest }: MobileProps) => {
  const handleLogOut = async () => {
    signOut({ callbackUrl: APP_BASE_URL });
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
          <Menu placement="bottom-end">
            <MenuButton transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <Flex align="center" maxW="200px" px={3} columnGap={1}>
                <Avatar size={'sm'} src={user.avatarUrl} name={user.name} />
                <Icon
                  boxSize="1.4em"
                  as={RxDropdownMenu}
                  aria-label="dropdown-icon"
                />
              </Flex>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              mt={3}
            >
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                px={3}
                py={3}
                alignSelf="flex-start"
              >
                <Text fontSize="sm" fontWeight={500} mt="-4px" noOfLines={1}>
                  {user.name}
                </Text>
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  {user.email}
                </Text>
              </VStack>
              <Divider />
              {UserLinkItems.map((link, index) => (
                <Link key={index} href={link.path} passHref>
                  <MenuItem>{link.name}</MenuItem>
                </Link>
              ))}
              <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
