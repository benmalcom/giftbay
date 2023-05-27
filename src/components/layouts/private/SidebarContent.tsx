import {
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  Icon,
  Stack,
  Link as ChakraLink,
  StyleProps,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { FiCompass, FiHome, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { Logo } from 'components/common';
import { FlexColumn } from 'components/common/MotionContainers';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
  visible: boolean;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/home', visible: true },
  { name: 'Insights', icon: FiTrendingUp, path: '/insights', visible: true },
  { name: 'Explore', icon: FiCompass, path: '/events', visible: true },
  { name: 'Settings', icon: FiSettings, path: '/settings', visible: true },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Flex
      flexDir="column"
      transition="3s ease"
      bg="gray.50"
      borderRight="1px double"
      borderColor="gray.200"
      w={{ base: 'full', xl: '260px' }}
      h="full"
      shadow="md"
      {...rest}
    >
      <Flex
        h="70px"
        alignItems="center"
        justifyContent={{ base: 'space-between', lg: 'center' }}
        borderBottom="1px solid"
        borderColor="gray.200"
        mx={{ base: 8, xl: 'none' }}
      >
        <Logo />
        <CloseButton display={{ base: 'flex', xl: 'none' }} onClick={onClose} />
      </Flex>
      <FlexColumn mt={5} rowGap={1}>
        {LinkItems.map(link => (
          <Link href={link.path} key={link.name}>
            <NavItem icon={link.icon} fontWeight={500}>
              {link.name}
            </NavItem>
          </Link>
        ))}
      </FlexColumn>
    </Flex>
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
