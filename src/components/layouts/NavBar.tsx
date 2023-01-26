import {
  Flex,
  Box,
  Container,
  useColorModeValue,
  Button,
  IconButton,
  useBreakpointValue,
  HStack,
  ButtonGroup,
} from '@chakra-ui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import Logo from 'components/Logo';
import { logOutUser } from 'services/auth';
import { APP_BASE_URL } from 'utils/constants';

const links = [
  { name: 'History', path: '/history' },
  { name: 'Settings', path: '/settings' },
];

const NavBar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const handleLogOut = async () => {
    signOut({ callbackUrl: APP_BASE_URL });
    await logOutUser();
  };
  return (
    <Box as="section" w="full">
      <Box
        as="nav"
        bg="white"
        w="full"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
      >
        <Container py={{ base: '4', lg: '5' }} maxW="7xl">
          <HStack spacing="10" justify="space-between">
            <Logo />
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                  {links.map(item => (
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
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default NavBar;
