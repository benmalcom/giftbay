import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { TESTIMONIALS } from 'components/home/data';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

const Testimonials = () => (
  <Flex w="full" bg="white" justifyContent="center">
    <Container py={16} maxW="7xl" h="full" as={VStack}>
      <VStack w={{ base: '100%', md: '80%', lg: '60%' }} spacing={6} mb="50px">
        <Heading as="h5" size="sm" color="purple.500" textTransform="uppercase">
          People Love Us
        </Heading>
        <Heading as="h3" size="lg" textAlign="center">
          You're in good company{' '}
        </Heading>
        <Box>
          <Text fontSize="md" fontWeight={400} textAlign="center">
            We have been working with clients around the world. See why over
            3,000+ amazing customers use {process.env.NEXT_PUBLIC_APP_NAME} to
            manage their social media content!
          </Text>
        </Box>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: 10, md: 4, lg: 10 }}
      >
        {TESTIMONIALS.map((TESTIMONIAL, index) => (
          <Testimonial key={index}>
            <TestimonialContent>
              <TestimonialHeading>{TESTIMONIAL.heading}</TestimonialHeading>
              <TestimonialText>{TESTIMONIAL.body}</TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={TESTIMONIAL.person.avatar}
              name={TESTIMONIAL.person.name}
              title={TESTIMONIAL.person.title}
            />
          </Testimonial>
        ))}
      </Stack>
    </Container>
  </Flex>
);

export default Testimonials;
