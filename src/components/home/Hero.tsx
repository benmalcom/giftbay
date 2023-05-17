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
  '/images/carousel/img11.jpg',
  '/images/carousel/img12.jpg',
  '/images/carousel/img13.jpg',
  '/images/carousel/img.avif',
];
const Hero = () => (
  <Flex
    h={{ sm: 'fit-content', '2xl': 'calc(100vh - 70px)' }}
    w="100%"
    mx="auto"
    align={{ sm: 'unset', xl: 'center' }}
    flexDir={{ base: 'column', lg: 'row' }}
    bg="#e2f0f1"
    shadow="base"
  >
    <Flex
      gap={4}
      flexDir="column"
      p={{ base: '40px 25px', md: 50, '2xl': 100 }}
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
            color: 'teal.500',
          }}
        >
          The gift registry you need.
        </Highlight>
      </Heading>
      <Text lineHeight="120%" fontSize="l" color="gray.700" fontWeight={500}>
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
            colorScheme="teal"
            size="lg"
            w="fit-content"
          >
            Get started
          </Button>
        </Link>
      </Box>
    </Flex>
    <Flex
      p={{ base: '40px 25px', md: 50, '2xl': 100 }}
      w={{ base: '100%', lg: '50%' }}
      h="full"
      align={{ base: 'center', '2xl': 'center' }}
      justify="center"
      flexWrap="wrap"
    >
      <Flex
        w={{ base: '100%', md: '65%', lg: '100%', xl: '85%' }}
        h={{ base: '330px', md: '500px', lg: '100%', xl: '80%' }}
        bg="white"
        borderRadius="50%"
        align="center"
        justify="center"
        borderColor="pink.200"
        borderWidth="30px"
        borderStyle="double"
        // transform="skew(-0.06turn, 0deg)"
        boxShadow="sm"
        // background={`url(/images/wl5.jpg) no-repeat center center fixed`}
        // backgroundSize="cover"
      >
        <Carousel images={carouselImages} />
      </Flex>
    </Flex>
  </Flex>
);

export default Hero;
