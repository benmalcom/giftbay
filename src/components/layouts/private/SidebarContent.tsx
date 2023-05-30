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
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { Logo } from 'components/common';
import { FlexColumn } from 'components/common/MotionContainers';
import { AppLinkItems, UserLinkItems } from 'components/layouts/utils';
import { User } from 'types/user';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  user: User;
}

const SidebarContent = ({ onClose, user, ...rest }: SidebarProps) => {
  return (
    <FlexColumn
      boxSizing="border-box"
      transition="3s ease"
      bg="gray.50"
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
      <FlexColumn mt={5} flex={1}>
        <FlexColumn w="full" rowGap={1} mt={5}>
          {AppLinkItems.map(link => (
            <Link href={link.path} key={link.name}>
              <NavItem icon={link.icon} fontWeight={500}>
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
              <NavItem icon={link.icon} fontWeight={500}>
                {link.name}
              </NavItem>
            </Link>
          ))}
        </FlexColumn>
      </FlexColumn>
      <FlexColumn
        h="70px"
        alignItems="center"
        borderTop="1px solid"
        borderColor="gray.200"
        boxSizing="border-box"
        p={4}
        bg="gray.100"
      >
        <Flex>
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
      </FlexColumn>
    </FlexColumn>
  );
};

export default SidebarContent;

interface NavItemProps extends ChakraLinkProps {
  icon: IconType;
  children: React.ReactNode;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  const activeHoverStyles: StyleProps = {
    bg: 'purple.100',
    color: 'purple.600',
    borderLeft: '2px solid',
    borderLeftColor: 'purple.600',
  };
  return (
    <ChakraLink
      display="flex"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      alignItems="center"
      p="4"
      mx="4"
      role="group"
      cursor="pointer"
      _hover={activeHoverStyles}
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
