import { VStack } from '@chakra-ui/react';
import { HeaderTags } from 'components/common';
import {
  Hero,
  HowItWorks,
  Attractions,
  Features,
  Testimonials,
  NewsLetter,
} from 'components/home';

const Home = () => {
  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Home`} />

      <VStack w="full" spacing={0}>
        <Hero />
        <HowItWorks />
        <Attractions />
        <Features />
        <Testimonials />
        <NewsLetter />
      </VStack>
    </>
  );
};

export default Home;
