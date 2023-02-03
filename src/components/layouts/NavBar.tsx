import {
  Flex,
  Box,
  Container,
  useColorModeValue,
  Button,
  IconButton,
  HStack,
  ButtonGroup,
} from '@chakra-ui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import Logo from 'components/Logo';
import useIsPDFGeneratePage from 'hooks/useIsPDFGeneratePage';
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
  const boxShadow = useColorModeValue('sm', 'sm-dark');
  const isGeneratePDF = useIsPDFGeneratePage();

  const handleLogOut = async () => {
    signOut({ callbackUrl: APP_BASE_URL });
    await logOutUser();
  };

  if (isGeneratePDF) return null;

  const isAuthenticated = Boolean(user);

  return (
    <Box as="section" w="full">
      <Box as="nav" bg="white" w="full" boxShadow={boxShadow}>
        <Container py={{ base: '4', lg: '5' }} maxW="7xl">
          <HStack spacing="10" justify="space-between">
            <Link href={isAuthenticated ? '/overview' : '/'} passHref>
              <a>
                <Logo />
              </a>
            </Link>
            {isAuthenticated ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8" mr={5}>
                  <Link href="/overview" passHref key="/overview">
                    <Button as="a" textDecoration="none">
                      Home
                    </Button>
                  </Link>
                  {links
                    .filter(item => item.visible)
                    .map(item => (
                      <Link href={item.path} passHref key={item.path}>
                        <Button as="a" textDecoration="none">
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
              <Flex justify="end">
                <ButtonGroup variant="link" spacing="8">
                  <Link href="/login" passHref>
                    <Button as="a" textDecoration="none">
                      Sign In
                    </Button>
                  </Link>
                </ButtonGroup>
              </Flex>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default NavBar;
