import {
  Flex,
  Container,
  Button,
  IconButton,
  HStack,
  ButtonGroup,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import React from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { Logo } from 'components/common';
import { logOutUser } from 'services/auth';
import { User } from 'types/user';
import { APP_BASE_URL } from 'utils/constants';

const links = [
  { name: 'History', path: '/history', visible: false },
  { name: 'Settings', path: '/settings', visible: true },
];

type NavBarProps = {
  user?: User;
};

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const router = useRouter();
  const handleLogOut = async () => {
    signOut({ callbackUrl: APP_BASE_URL });
    await logOutUser();
  };

  const isAuthenticated = Boolean(user);
  const isHomepage = router.pathname === '/';
  const wrapperBg = isHomepage ? 'purple.50' : 'white';
  const wrapperBorder = isHomepage ? 'none' : '1px solid #ddd';
  const containerBorder = isHomepage ? '1px solid #ddd' : 'none';

  return (
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
          <Flex justify="space-between" align="center" h="full">
            <Link href={isAuthenticated ? '/overview' : '/'} passHref>
              <a>
                <Logo />
              </a>
            </Link>
            {isAuthenticated ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8" mr={5}>
                  <Link href="/overview" passHref key="/overview">
                    <Button
                      as="a"
                      textDecoration="none"
                      fontSize="15px"
                      fontWeight={400}
                      color="#666"
                    >
                      Home
                    </Button>
                  </Link>
                  {links
                    .filter(item => item.visible)
                    .map(item => (
                      <Link href={item.path} passHref key={item.path}>
                        <Button
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
                <HStack spacing="3">
                  <IconButton
                    title="Logout"
                    colorScheme="red"
                    onClick={handleLogOut}
                    variant="ghost"
                    icon={<AiOutlinePoweroff fontSize="1.25rem" />}
                    aria-label="Open Menu"
                  />
                </HStack>
              </Flex>
            ) : (
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
            )}
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};

export default NavBar;
