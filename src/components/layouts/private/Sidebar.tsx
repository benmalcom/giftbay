import {
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  Icon,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { FiCompass, FiHome, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { Logo } from 'components/common';

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
      border="1px double"
      borderColor="gray.200"
      w={{ base: 'full', lg: '260px' }}
      h="full"
      {...rest}
      shadow="lg"
    >
      <Flex
        h="70px"
        alignItems="center"
        mx="8"
        justifyContent={{ base: 'space-between', lg: 'center' }}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Logo />
        <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>
      <Stack mt={5}>
        {LinkItems.map(link => (
          <Link href={link.path} key={link.name}>
            <NavItem icon={link.icon} fontWeight={500}>
              {link.name}
            </NavItem>
          </Link>
        ))}
      </Stack>
    </Flex>
  );
};

export default SidebarContent;

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <ChakraLink
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'purple.100',
          color: 'purple.600',
          borderLeft: '2px solid',
          borderLeftColor: 'purple.600',
        }}
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
      </Flex>
    </ChakraLink>
  );
};
