import {
  Flex,
  Drawer,
  DrawerContent,
  IconButton,
  Icon,
  Box,
  ButtonGroup,
  Button,
  HStack,
  Container,
} from '@chakra-ui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React from 'react';
import { AiOutlinePoweroff, AiOutlineBell } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { Logo } from 'components/common';
import MobileNav from 'components/layouts/private/MobileNav';
import { AppLinkItems } from 'components/layouts/utils';
import { logOutUser } from 'services/auth';
import { User } from 'types/user';
import { APP_BASE_URL } from 'utils/constants';
import SidebarContent from './SidebarContent';

type NavBarProps = {
  user: User;
  onClose(): void;
  onOpen(): void;
  isOpen: boolean;
  layoutOrientation: 'vertical' | 'horizontal';
};

const NavBar: React.FC<NavBarProps> = ({
  onClose,
  isOpen,
  onOpen,
  layoutOrientation,
  user,
}) => {
  const handleLogOut = async () => {
    signOut({ callbackUrl: APP_BASE_URL });
    await logOutUser();
  };

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
      {layoutOrientation === 'vertical' ? (
        <VerticalNavbar onOpen={onOpen} onLogout={handleLogOut} />
      ) : (
        <HorizontalNavbar onOpen={onOpen} user={user} />
      )}
    </>
  );
};

export default NavBar;

type NavBarVariantProps = {
  onOpen(): void;
  onLogout(): void;
};

type HorizontalNavbarProps = Pick<NavBarVariantProps, 'onOpen'> & {
  user: User;
};

const HorizontalNavbar: React.FC<HorizontalNavbarProps> = ({
  onOpen,
  user,
}) => (
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
    <Flex as="nav" w="full" h="full" align="center">
      <Container py={1.5} maxW="7xl" h="full" alignItems="center">
        <Flex justify="space-between" align="center" h="full" columnGap={20}>
          <Box display={{ base: 'none', md: 'block' }}>
            <Link href="/" passHref>
              <a>
                <Logo />
              </a>
            </Link>
          </Box>
          <Flex justify="space-between" flex="1">
            <ButtonGroup
              variant="link"
              spacing="8"
              mr={5}
              display={{ base: 'none', md: 'flex' }}
            >
              {AppLinkItems.filter(item => item.visible).map(item => (
                <Link href={item.path} passHref key={item.path}>
                  <Button
                    leftIcon={<item.icon />}
                    as="a"
                    textDecoration="none"
                    fontSize="15px"
                    fontWeight={400}
                    color="#666"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </ButtonGroup>

            <HStack spacing="3" w={{ base: 'full', md: 'fit-content' }}>
              <MobileNav onOpen={onOpen} user={user} />
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  </Flex>
);

type VerticalNavbarProps = NavBarVariantProps;
const VerticalNavbar: React.FC<VerticalNavbarProps> = ({
  onOpen,
  onLogout,
}) => (
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
      <Flex alignItems="center" h="full" columnGap={4}>
        <Icon boxSize="1.2em" as={AiOutlineBell} color="gray.500" />
        <IconButton
          size="md"
          icon={<AiOutlinePoweroff fontSize="2xl" />}
          aria-label="dropdown-icon"
          onClick={onLogout}
          color="red"
          title="Logout"
        />
      </Flex>
    </Flex>
  </Flex>
);
