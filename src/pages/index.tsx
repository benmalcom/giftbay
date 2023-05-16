import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Highlight,
} from '@chakra-ui/react';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import { HeaderTags } from 'components/common';

const Home = () => {
  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Home`} />

      <Flex w="full" h="calc(100vh - 70px)" mt={0} bg="#e2f0f1">
        <Flex
          h="full"
          w={{ sm: '95%', lg: '100%' }}
          mx="auto"
          align={{ sm: 'unset', xl: 'center' }}
          flexDir={{ base: 'column', lg: 'row' }}
        >
          <Flex
            gap={10}
            flexDir="column"
            p={{ base: '40px 25px', md: 50, '2xl': 100 }}
            w={{ sm: '100%', xl: '50%' }}
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
            <Text lineHeight="120%" fontSize="l" color="gray.700">
              Create a personalized Gift Registry for your special occasions and
              get the perfect presents every time: Your special occasions should
              be all about you, and our gift registry is here to make that
              happen.
            </Text>
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
          </Flex>
          <Flex
            w={{ base: '100%', lg: '50%' }}
            h="full"
            align="center"
            justify="center"
            flexWrap="wrap"
          >
            <Flex
              w="75%"
              h="70%"
              bg="white"
              borderRadius="50%"
              align="center"
              justify="center"
              borderColor="pink.300"
              borderWidth="30px"
              borderStyle="double"
              // transform="skew(-0.06turn, 0deg)"
              boxShadow="sm"
              // background={`url(/images/wl5.jpg) no-repeat center center fixed`}
              // backgroundSize="cover"
            >
              <Image
                src="/images/img.avif"
                alt="Dan Abramov"
                w="100%"
                h="100%"
                borderRadius="inherit"
                objectFit="contain"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
