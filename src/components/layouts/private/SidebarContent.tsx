import {
  BoxProps,
  CloseButton,
  Flex,
  Icon,
  Link as ChakraLink,
  StyleProps,
  LinkProps as ChakraLinkProps,
  Avatar,
  VStack,
  Text,
  MenuButton,
  MenuList,
  useColorModeValue,
  Divider,
  MenuItem,
  Menu,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import React from 'react';
import { IconType } from 'react-icons';
import { BsChevronRight } from 'react-icons/bs';
import { Logo } from 'components/common';
import { FlexColumn } from 'components/common/MotionContainers';
import { AppLinkItems, UserLinkItems } from 'components/layouts/utils';
import { User } from 'types/user';
import { APP_BASE_URL } from 'utils/constants';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  user: User;
}

const SidebarContent = ({ onClose, user, ...rest }: SidebarProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    signOut({ callbackUrl: APP_BASE_URL });
  };
  return (
    <FlexColumn
      boxSizing="border-box"
      transition="3s ease"
      bg="white"
      borderRight="1px double"
      borderColor="rgba(0, 0, 0, .1)"
      w={{ base: 'full', xl: '260px' }}
      h="full"
      shadow="sm"
      {...rest}
    >
      <Flex
        h="70px"
        alignItems="center"
        justifyContent={{ base: 'space-between', lg: 'center' }}
        borderBottom="1px solid"
        borderColor="gray.200"
        mx={{ base: 8, xl: 'none' }}
        boxSizing="border-box"
      >
        <Logo />
        <CloseButton display={{ base: 'flex', xl: 'none' }} onClick={onClose} />
      </Flex>
      <FlexColumn flex={1}>
        <FlexColumn w="full" rowGap={1}>
          {AppLinkItems.map(link => (
            <Link href={link.path} key={link.name}>
              <NavItem
                icon={link.icon}
                fontWeight={500}
                isActive={router.asPath === link.path}
              >
                {link.name}
              </NavItem>
            </Link>
          ))}
        </FlexColumn>

        <FlexColumn
          w="full"
          rowGap={1}
          borderTop="1px solid"
          borderColor="gray.200"
          boxSizing="border-box"
          mt={5}
          pt={5}
        >
          {UserLinkItems.map(link => (
            <Link href={link.path} key={link.name}>
              <NavItem
                icon={link.icon}
                fontWeight={500}
                isActive={router.asPath === link.path}
              >
                {link.name}
              </NavItem>
            </Link>
          ))}
        </FlexColumn>
      </FlexColumn>
      <Flex
        h="70px"
        alignItems="center"
        borderTop="1px solid"
        borderColor="gray.200"
        boxSizing="border-box"
        bg="gray.100"
      >
        <Flex flex={1} justify="center" py={4}>
          <Avatar size={'sm'} name={user.name} src={user.avatarUrl} />
          <VStack
            alignItems="flex-start"
            spacing="1px"
            ml="2"
            alignSelf="flex-start"
          >
            <Text fontSize="sm" fontWeight={500} mt="-4px" noOfLines={1}>
              {user.name}
            </Text>
            <Text fontSize="xs" color="gray.600" noOfLines={1}>
              {user.email}{' '}
            </Text>
          </VStack>
        </Flex>
        <Menu placement="right-start">
          <MenuButton
            transition="all 0.3s"
            _focus={{ boxShadow: 'none' }}
            height="full"
            borderLeft="1px solid"
            borderColor="gray.300"
          >
            <Flex
              h="full"
              width="25px"
              align="center"
              justify="center"
              cursor="pointer"
            >
              <Icon as={BsChevronRight} />
            </Flex>
          </MenuButton>
          <MenuList
            mb={5}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <VStack
              alignItems="flex-start"
              spacing="1px"
              p={3}
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
            <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </FlexColumn>
  );
};

export default SidebarContent;

interface NavItemProps extends ChakraLinkProps {
  icon: IconType;
  children: React.ReactNode;
  isActive: boolean;
}
const NavItem = ({ icon, children, isActive, ...rest }: NavItemProps) => {
  const activeStyles: StyleProps = {
    bg: 'purple.500',
    color: 'white',
    borderLeft: '3px solid',
    borderLeftColor: 'purple.900',
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
  };
  const hoverStyles: StyleProps = {
    bg: 'transparent',
    color: 'purple.600',
    border: 'none',
  };
  return (
    <ChakraLink
      display="flex"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      alignItems="center"
      p="4"
      mx={4}
      role="group"
      cursor="pointer"
      _hover={!isActive ? hoverStyles : undefined}
      sx={isActive ? activeStyles : undefined}
      boxSizing="border-box"
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'purple.500',
          }}
          as={icon}
        />
      )}
      {children}
    </ChakraLink>
  );
};
