import {
  Container,
  Flex,
  Text,
  Alert,
  Heading,
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
  const [inFlight, setInFlight] = useState<{
    create: boolean;
    fetch: boolean;
    [key: string]: boolean;
  }>({
    create: false,
    fetch: true,
  });
  const [resumeDataList, setResumeDataList] = useState<ResumeData[]>([]);

  const onCreateResume = () => {
    setInFlight(state => ({ ...state, create: true }));
    createResume({ user: user.id })
      .then(({ data }: AxiosResponse<ResumeData>) =>
        Router.push(`/builder/${data.id}`)
      )
      .catch(err => toast.error('Create resume error!', err.message))
      .finally(() => setInFlight(state => ({ ...state, create: false })));
  };

  const fetchResumes = useCallback(
    (abortSignal: AbortSignal) => {
      setInFlight(state => ({ ...state, fetch: true }));
      getUserResumes(user.id, abortSignal)
        .then(response => {
          // Move tagged resumes up.
          const list = response?.data.docs;
          const primaryResume = list.find((item: ResumeData) =>
            item.name?.match(/primary/i)
          );
          const secondaryResume = list.find((item: ResumeData) =>
            item.name?.match(/secondary/i)
          );
          const mainResumes = [primaryResume, secondaryResume].filter(Boolean);
          const otherResumes = list.filter(
            (item: ResumeData) =>
              item?.name !== primaryResume?.name &&
              item?.name !== secondaryResume?.name
          );
          setResumeDataList(mainResumes.concat(otherResumes));
        })
        .catch(err => {
          err?.code !== 'ERR_CANCELED' && console.log('err ', err);
        })
        .finally(() => setInFlight(state => ({ ...state, fetch: false })));
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

  const onDeleteResume = (resumeDataId: string) => {
    setInFlight(state => ({
      ...state,
      [`delete_${resumeDataId}`]: true,
    }));
    deleteResume(resumeDataId)
      .then(() => {
        setResumeDataList(currentList =>
          currentList.filter(item => item.id !== resumeDataId)
        );
        toast.success('Success!');
      })
      .catch(err => {
        toast.error('Delete error!', err.message);
      })
      .finally(() =>
        setInFlight(state => ({
          ...state,
          [`delete_${resumeDataId}`]: false,
        }))
      );
  };

  const onDuplicateResume = (resumeData: ResumeData) => {
    setInFlight(state => ({
      ...state,
      [`duplicate_${resumeData.id}`]: true,
    }));
    createResume({ user: resumeData.user, contents: resumeData.contents })
      .then(({ data }: AxiosResponse<ResumeData>) =>
        Router.push(`/builder/${data.id}`)
      )
      .catch(err => toast.error('Create resume error!', err.message))
      .finally(() =>
        setInFlight(state => ({
          ...state,
          [`duplicate_${resumeData.id}`]: false,
        }))
      );
  };

  const inDeleteFlight = (resumeDataId: string) =>
    inFlight[`delete_${resumeDataId}`];
  const inDuplicateFlight = (resumeDataId: string) =>
    inFlight[`duplicate_${resumeDataId}`];

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
                  isLoading={inFlight.create}
                  onClick={onCreateResume}
                >
                  New Resume
                </Button>
              </Flex>
            )}
            <ResumeList
              resumeDataList={resumeDataList}
              onDeleteResume={onDeleteResume}
              onDuplicateResume={onDuplicateResume}
              hasReachedLimit={hasReachedLimit}
              inGetFlight={inFlight.fetch}
              inDuplicateFlight={inDuplicateFlight}
              inDeleteFlight={inDeleteFlight}
            />
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
