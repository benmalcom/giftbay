import { Box, Button, Flex, Heading, Highlight, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import Carousel from './Carousel';

const carouselImages = [
  '/images/carousel/img.jpg',
  '/images/carousel/img2.jpg',
  '/images/carousel/img3.jpg',
  '/images/carousel/img4.jpg',
  '/images/carousel/img5.jpg',
  '/images/carousel/img6.jpg',
  '/images/carousel/img7.jpg',
  '/images/carousel/img8.jpg',
  '/images/carousel/img9.jpg',
  '/images/carousel/img10.jpg',
  '/images/carousel/img11.jpg',
  '/images/carousel/img.avif',
];
const Hero = () => (
  <Flex
    h={{ sm: 'fit-content', '2xl': '70.5vh' }}
    w="100%"
    mx="auto"
    align={{ sm: 'unset', xl: 'center' }}
    flexDir={{ base: 'column', lg: 'row' }}
    bg="purple.50"
    shadow="sm"
  >
    <Flex
      gap={4}
      flexDir="column"
      p={{ base: '60px 25px 45px 25px', md: 50, '2xl': 100 }}
      w={{ base: '100%', lg: '60%', xl: '50%' }}
      mx="auto"
    >
      <Heading
        as="h2"
        size={{ base: 'xl', md: '2xl' }}
        color="#2f2f2f"
        textTransform="capitalize"
        lineHeight={{ sm: 1.3, md: '200%', '2xl': '125%' }}
        fontWeight={500}
      >
        <Highlight
          query="gift registry"
          styles={{
            rounded: 'full',
            color: 'purple.500',
          }}
        >
          The gift registry you need.
        </Highlight>
      </Heading>
      <Text lineHeight="150%" fontSize="l" color="gray.700" fontWeight={500}>
        Create a personalized Gift Registry for your special occasions and get
        the perfect presents every time. Your special occasions should be all
        about you, and our gift registry is here to make that happen.
      </Text>
      <Box mt={6}>
        <Link href="/register" passHref>
          <Button
            leftIcon={<CiCirclePlus size={30} />}
            as="a"
            textDecoration="none"
            cursor="pointer"
            borderRadius="30px"
            colorScheme="purple"
            size="lg"
            w="fit-content"
          >
            Get started
          </Button>
        </Link>
      </Box>
    </Flex>
    <Flex
      p={{ base: '40px 25px', md: 50, '2xl': 90 }}
      w={{ base: '100%', lg: '50%' }}
      h="full"
      align={{ base: 'center', '2xl': 'center' }}
      justify="center"
      flexWrap="wrap"
    >
      <Flex
        w={{ base: '100%', md: '75%', lg: '100%', xl: '79%' }}
        h={{ base: '330px', md: '500px', lg: '100%', xl: '100%' }}
        bg="white"
        borderRadius="50%"
        align="center"
        justify="center"
        // transform="skew(-0.06turn, 0deg)"
        boxShadow="sm"
        // background={`url(/images/wl5.jpg) no-repeat center center fixed`}
        // backgroundSize="cover"
      >
        <Flex
          w="90%"
          h="90%"
          borderRadius="inherit"
          borderWidth="10px"
          borderColor="pink.200"
          borderStyle="solid"
        >
          <Carousel images={carouselImages} />
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);

export default Hero;
