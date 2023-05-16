import { Container, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { HeaderTags } from 'components/common';
import { User } from 'types/user';
import { withAuthServerSideProps } from 'utils/serverSideProps';

type OverviewProps = {
  user: User;
};
const Overview: React.FC<OverviewProps> = () => {
  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Overview`} />

      <Flex flex={1}>
        <Container
          py={{ base: '8', md: '12' }}
          mt={{ base: '8', md: '12' }}
          maxW="5xl"
        >
          <Stack mt={10} gridGap={8} direction="column">
            Overview
          </Stack>
        </Container>
      </Flex>
    </>
  );
};

export default Overview;

export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Overview',
    },
  };
});
