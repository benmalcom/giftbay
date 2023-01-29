import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { createResume, getUserResumes } from 'services/resume';
import { ResumeData } from 'types/resume';
import { User } from 'types/user';
import { withAuthServerSideProps } from 'utils/serverSideProps';

type OverviewProps = {
  user: User;
};
const Overview: React.FC<OverviewProps> = ({ user }) => {
  const [inCreateFlight, setInCreateFlight] = useState(false);
  const [inGetFlight, setInGetFlight] = useState(false);

  const onCreateResume = () => {
    setInCreateFlight(true);
    createResume({ user: user.id })
      .then(({ data }: AxiosResponse<ResumeData>) =>
        Router.push(`/builder/${data.id}`)
      )
      .catch(err => {
        console.log('err ', err);
      })
      .finally(() => setInCreateFlight(false));
  };

  const fetchResumes = useCallback(
    (abortSignal: AbortSignal) => {
      setInGetFlight(true);
      getUserResumes(user.id, abortSignal)
        .then(response => {
          console.log('response ', response);
        })
        .catch(err => {
          console.log('err ', err);
        })
        .finally(() => setInGetFlight(false));
    },
    [user.id]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchResumes(signal);
    return () => {
      controller.abort();
    };
  }, [fetchResumes]);

  return (
    <Box as="section" bg="#F7FAFC">
      <Container
        py={{ base: '8', md: '12' }}
        mt={{ base: '8', md: '12' }}
        maxW="5xl"
      >
        <Heading as="h4" size="md" mb={7} fontWeight={500}>
          Welcome, {user.name}.
        </Heading>
        <Alert status="success" variant="subtle">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
        <Flex mt={10}>
          <VStack
            onClick={onCreateResume}
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            as="a"
            border="1px dashed gray"
            borderRadius={3}
            h="300px"
            w="300px"
            justify="center"
            cursor={inCreateFlight ? 'default' : 'pointer'}
            _hover={{
              boxShadow:
                '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }}
          >
            {inCreateFlight ? (
              <Spinner size="xl" />
            ) : (
              <>
                <AiOutlinePlus
                  size={50}
                  fontWeight={400}
                  color="blackAlpha.700"
                />
                <Text fontSize="lg" fontWeight={500} color="blackAlpha.700">
                  Blank Resume
                </Text>
              </>
            )}
          </VStack>
        </Flex>
      </Container>
    </Box>
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
