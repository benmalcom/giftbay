import { VStack } from '@chakra-ui/react';
import { HeaderTags } from 'components/common';
import { Hero, HowItWorks } from 'components/home';

const Home = () => {
  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Home`} />

      <VStack w="full" mt={0}>
        <Hero />
        <HowItWorks />
      </VStack>
    </>
  );
};

export default Home;
