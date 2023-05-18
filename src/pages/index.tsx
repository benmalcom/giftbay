import { VStack } from '@chakra-ui/react';
import { HeaderTags } from 'components/common';
import { Hero, HowItWorks, Attractions, Features } from 'components/home';

const Home = () => {
  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Home`} />

      <VStack w="full" mt={0}>
        <Hero />
        <HowItWorks />
        <Attractions />
        <Features />
      </VStack>
    </>
  );
};

export default Home;
