import {
  Flex,
  Container,
  Button,
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
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { IconType } from 'react-icons';
import { FiHome, FiTrendingUp } from 'react-icons/fi';
import { Logo } from 'components/common';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
  visible: boolean;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/home', visible: true },
  { name: 'Registry', icon: FiTrendingUp, path: '/registry', visible: true },
];

const NavBar = () => {
  const router = useRouter();

  const { isOpen, onClose } = useDisclosure();

  const isHomepage = router.pathname === '/';
  const wrapperBg = isHomepage ? 'purple.50' : 'white';
  const wrapperBorder = isHomepage ? 'none' : '1px solid #ddd';
  const containerBorder = isHomepage ? '1px solid #ddd' : 'none';

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
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex
        w="full"
        minH="70px"
        maxH="70px"
        bg={wrapperBg}
        borderBottom={wrapperBorder}
        shadow="sm"
      >
        <Flex as="nav" w="full" h="full" align="center">
          <Container
            py={1.5}
            maxW="7xl"
            h="full"
            alignItems="center"
            bg="white"
            border={containerBorder}
          >
            <Flex
              justify="space-between"
              align="center"
              h="full"
              columnGap={20}
            >
              <Box display={{ base: 'none', md: 'block' }}>
                <Link href="/" passHref>
                  <a>
                    <Logo />
                  </a>
                </Link>
              </Box>

              <Flex justify="end" align="center" columnGap={5}>
                <Link href="/registry" passHref>
                  <a>Registry</a>
                </Link>
                <ButtonGroup variant="link" spacing="8">
                  <Link href="/login" passHref>
                    <Button
                      as="a"
                      variant="solid"
                      textDecoration="none"
                      borderRadius="30px"
                    >
                      Sign In
                    </Button>
                  </Link>
                </ButtonGroup>
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: '250px' }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <Link key={link.name} href={link.path} passHref>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </Link>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <ChakraLink
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};
