import {
  Container,
  Flex,
  VStack,
  Text,
  Alert,
  Heading,
  Spinner,
  AspectRatio,
  Skeleton,
  AlertTitle,
  Stack,
  Button,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { HeaderTags } from 'components/common';
import ResumeCard from 'components/resume/ResumeCard';
import ResumeList from 'components/resume/ResumeList';
import { createResume, getUserResumes, deleteResume } from 'services/resume';
import { ResumeData } from 'types/resume';
import { User } from 'types/user';
import { MAXIMUM_RESUME_LIMIT } from 'utils/constants';
import { withAuthServerSideProps } from 'utils/serverSideProps';

type OverviewProps = {
  user: User;
};
const Overview: React.FC<OverviewProps> = ({ user }) => {
  const [inCreateFlight, setInCreateFlight] = useState(false);
  const [inGetFlight, setInGetFlight] = useState(false);
  const [inDeleteFlight, setInDeleteFlight] = useState(false);
  const [resumeDataList, setResumeDataList] = useState<ResumeData[]>([]);

  const onCreateResume = (payload?: Record<string, unknown>) => {
    setInCreateFlight(true);
    createResume({ user: user.id, ...payload })
      .then(({ data }: AxiosResponse<ResumeData>) =>
        Router.push(`/builder/${data.id}`)
      )
      .catch(err => toast.error('Create resume error!', err.message))
      .finally(() => setInCreateFlight(false));
  };

  const fetchResumes = useCallback(
    (abortSignal: AbortSignal) => {
      setInGetFlight(true);
      getUserResumes(user.id, abortSignal)
        .then(response => setResumeDataList(response?.data.docs))
        .catch(err => {
          err?.code !== 'ERR_CANCELED' && console.log('err ', err);
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

  const onDeleteResume = (resumeId: string) => {
    setInDeleteFlight(true);
    deleteResume(resumeId)
      .then(() => {
        setResumeDataList(currentList =>
          currentList.filter(item => item.id !== resumeId)
        );
        toast.success('Success!');
      })
      .catch(err => {
        toast.error('Delete error!', err.message);
      })
      .finally(() => setInDeleteFlight(false));
  };

  const hasReachedLimit = resumeDataList.length >= MAXIMUM_RESUME_LIMIT;

  return (
    <>
      <HeaderTags title={`${process.env.NEXT_PUBLIC_APP_NAME} - Overview`} />

      <Flex flex={1}>
        <Container
          py={{ base: '8', md: '12' }}
          mt={{ base: '8', md: '12' }}
          maxW="5xl"
        >
          <Flex mb={7} align="center">
            <Text mr={1}>Welcome,</Text>
            <Heading as="h4" size="md" fontWeight={500}>
              {user.name}.
            </Heading>
          </Flex>

          <Alert status="warning" flexDir="column" alignItems="flex-start">
            <AlertTitle fontSize="md">
              Create new Resumes. Reuse or duplicate old ones.
            </AlertTitle>{' '}
            <Text>
              Maximum number of resumes is {MAXIMUM_RESUME_LIMIT}. You can
              delete old ones to free up space.
            </Text>
            <Text>Hover over each resume item for call to actions.</Text>
          </Alert>
          <Stack mt={10} gridGap={8} direction="column">
            {!hasReachedLimit && (
              <Flex justify="end">
                <Button
                  leftIcon={<AiOutlinePlus fontWeight={400} color="white" />}
                  colorScheme="teal"
                  variant="solid"
                >
                  New Resume
                </Button>
              </Flex>
            )}
            {/*
            {!hasReachedLimit && (
              <VStack
                onClick={() => onCreateResume()}
                boxShadow="sm"
                bg="white"
                as="a"
                border="1px dashed teal"
                borderRadius={3}
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
                    <AiOutlinePlus size={50} fontWeight={400} color="teal" />
                    <Text fontSize="lg" fontWeight={500} color="blackAlpha.700">
                      New Resume
                    </Text>
                  </>
                )}
              </VStack>
            )}
*/}

            <ResumeList
              resumeDataList={resumeDataList}
              onCreateResume={onCreateResume}
              inCreateFlight={inCreateFlight}
              onDeleteResume={onDeleteResume}
              inDeleteFlight={inDeleteFlight}
              hasReachedLimit={hasReachedLimit}
              inGetFlight={inGetFlight}
            />

            {/*            {inGetFlight ? (
              <Flex gridGap={8}>
                {Array.from(new Array(3).keys()).map(item => (
                  <Skeleton key={item}>
                    <AspectRatio w="220px" ratio={4 / 3}>
                      <Flex />
                    </AspectRatio>
                  </Skeleton>
                ))}
              </Flex>
            ) : (
              resumeDataList.map(data => (
                <ResumeCard
                  key={data.id}
                  resumeData={data}
                  onCreateResume={onCreateResume}
                  inCreateFlight={inCreateFlight}
                  onDeleteResume={onDeleteResume}
                  inDeleteFlight={inDeleteFlight}
                  hasReachedLimit={hasReachedLimit}
                />
              ))
            )}*/}
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
