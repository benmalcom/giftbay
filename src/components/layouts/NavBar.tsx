import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  useDisclosure,
  Stack,
  Link as ChakraLink,
  Text,
  Heading,
  Container,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  IconButton,
  Avatar,
  useBreakpointValue,
  HStack,
  ButtonGroup,
} from '@chakra-ui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FiMenu } from 'react-icons/fi';
import Logo from 'components/Logo';
import { APP_BASE_URL } from 'utils/constants';
import { logOutUser } from '../../services/auth';

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
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box
        as="nav"
        bg="bg-surface"
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
                      <Button as="a">{item.name}</Button>
                    </Link>
                  ))}
                </ButtonGroup>
                <HStack spacing="3">
                  <Button colorScheme="teal" onClick={handleLogOut}>
                    Logout
                  </Button>
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
