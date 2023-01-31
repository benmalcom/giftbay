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
  Skeleton,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import ResumePDF from 'components/resume/ResumePDF';
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
  const [resumeData, setResumeData] = useState<ResumeData[]>([]);

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

  console.log('resumeData ', resumeData);

  const fetchResumes = useCallback(
    (abortSignal: AbortSignal) => {
      setInGetFlight(true);
      getUserResumes(user.id, abortSignal)
        .then(response => setResumeData(response?.data.results))
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
        <Flex mb={7} align="center">
          <Text mr={1}>Welcome,</Text>
          <Heading as="h5" size="sm" fontWeight={500}>
            {user.name}.
          </Heading>
        </Flex>

        <Alert status="warning" variant="left-accent">
          <AlertIcon />
          Create new Resumes. Re-use old ones.
        </Alert>
        <Flex mt={10} gridGap={10}>
          <VStack
            onClick={onCreateResume}
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            as="a"
            border="1px dashed teal"
            borderRadius={3}
            h="300px"
            w="250px"
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
                <AiOutlinePlus size={50} fontWeight={400} color="gray" />
                <Text fontSize="lg" fontWeight={500} color="blackAlpha.700">
                  Blank Resume
                </Text>
              </>
            )}
          </VStack>
          <Flex>
            {resumeData
              ?.filter(item => item.fileContents)
              .map(data => {
                return (
                  <Skeleton isLoaded={!inGetFlight} key={data.id}>
                    <ResumePDF resumeData={data} />
                  </Skeleton>
                );
              })}
          </Flex>
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
