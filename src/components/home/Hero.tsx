import {
  Box,
  Button,
  Flex,
  FlexProps,
  Heading,
  Highlight,
  Icon,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { AiFillCheckCircle } from 'react-icons/ai';
import { CiCirclePlus } from 'react-icons/ci';
import { FlexColumn } from 'components/common/MotionContainers';
import Carousel from './Carousel';

const carouselImages = [
  '/images/carousel/img.avif',
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
];

type HeroColorStyle = {
  hero: FlexProps;
  carouselContainer: FlexProps;
  carouselContainerInner: FlexProps;
};

const heroColorStyles: HeroColorStyle[] = [
  {
    hero: {
      borderBottom: 'none',
      borderBottomColor: 'unset',
      bg: 'purple.50',
    },
    carouselContainer: {
      borderRadius: '50%',
    },
    carouselContainerInner: {
      borderColor: 'pink.200',
    },
  },

  {
    hero: {
      borderBottom: '1px solid',
      borderBottomColor: 'gray.200',
      bg: 'gray.50',
    },
    carouselContainer: {
      borderRadius: '5%',
    },
    carouselContainerInner: {
      borderColor: 'purple.200',
    },
  },
];

const heroColorStyle = heroColorStyles[1];

const miniFeatures = [
  'Customize your wishlist to reflect your style and interests',
  'Manage your registry with ease and make changes as needed',
  'Allow friends and family to contribute together towards larger gifts',
  'Easily track and express gratitude for gifts received',
];

const Hero = () => (
  <Flex
    h={{ sm: 'fit-content', '2xl': '70.5vh' }}
    w="100%"
    mx="auto"
    align={{ sm: 'unset', xl: 'center' }}
    flexDir={{ base: 'column', lg: 'row' }}
    shadow="sm"
    {...heroColorStyle.hero}
  >
    <Flex
      gap={4}
      flexDir="column"
      p={{ base: '60px 25px 45px 25px', md: 50, '2xl': 100 }}
      w={{ base: '100%', lg: '50%', xl: '50%' }}
      mx="auto"
    >
      <Heading
        fontSize={{ base: '3xl', xl: '5xl' }}
        color="#2f2f2f"
        lineHeight={{ sm: 1.3, md: '120%', '2xl': '125%' }}
        fontWeight={500}
      >
        <Highlight
          query="gift registry"
          styles={{
            rounded: 'full',
            color: 'purple.500',
          }}
        >
          Your perfect gift registry
        </Highlight>
      </Heading>
      <Text
        lineHeight="150%"
        fontSize={{ base: 'sm', lg: 'md', xl: 'lg' }}
        color="#394455"
      >
        Create a personalized gift registry for your special occasions and get
        the perfect presents every time. Your special occasions should be all
        about you, we're here to make that happen.
      </Text>
      <FlexColumn rowGap={3} mt={3}>
        {miniFeatures.map((feature, index) => (
          <Flex w="full" key={index} align="center" columnGap={2}>
            <Icon as={AiFillCheckCircle} color="#805AD5" />
            <Text
              fontWeight={{ base: 600, lg: 700 }}
              textTransform="uppercase"
              fontSize={{ base: 'xs', md: 'sm' }}
            >
              {feature}
            </Text>
          </Flex>
        ))}
      </FlexColumn>
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
      w={{ base: '100%', lg: '50%', xl: '50%' }}
      h="full"
      align={{ base: 'center', '2xl': 'center' }}
      justify="center"
      flexWrap="wrap"
    >
      <Flex
        w={{ base: '100%', md: '75%', lg: '100%', xl: '79%' }}
        h={{ base: '330px', md: '500px', lg: '100%', xl: '100%' }}
        bg="white"
        align="center"
        justify="center"
        // transform="skew(-0.06turn, 0deg)"
        boxShadow="sm"
        // background={`url(/images/wl5.jpg) no-repeat center center fixed`}
        // backgroundSize="cover"
        {...heroColorStyle.carouselContainer}
      >
        <Flex
          w="90%"
          h="90%"
          borderRadius="inherit"
          borderWidth="7px"
          borderStyle="solid"
          {...heroColorStyle.carouselContainerInner}
        >
          <Carousel images={carouselImages} />
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);

export default Hero;
