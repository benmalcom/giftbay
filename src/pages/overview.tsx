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
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import ResumePDF from 'components/resume/ResumePDF';
import { createResume, getUserResumes, deleteResume } from 'services/resume';
import { ResumeData } from 'types/resume';
import { User } from 'types/user';
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
      .catch(err => {
        console.log('err ', err);
      })
      .finally(() => setInCreateFlight(false));
  };

  const fetchResumes = useCallback(
    (abortSignal: AbortSignal) => {
      setInGetFlight(true);
      getUserResumes(user.id, abortSignal)
        .then(response => setResumeDataList(response?.data.results))
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
        toast.error('Delete error!');
        console.log('err ', err);
      })
      .finally(() => setInDeleteFlight(false));
  };

  if (inGetFlight)
    return (
      <Flex gridGap={8}>
        {Array.from(new Array(4).keys()).map(item => (
          <Skeleton key={item}>
            <AspectRatio w="220px" ratio={4 / 3}>
              <Flex />
            </AspectRatio>
          </Skeleton>
        ))}
      </Flex>
    );

  return (
    <Flex bg="#F7FAFC" flex={1}>
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
          Create new Resumes. Re-use old ones.
        </Alert>
        <Flex mt={10} gridGap={8}>
          {resumeDataList.length < 4 && (
            <VStack
              onClick={() => onCreateResume()}
              boxShadow="sm"
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
                    New Resume
                  </Text>
                </>
              )}
            </VStack>
          )}

          {resumeDataList.map(data => (
            <ResumePDF
              key={data.id}
              resumeData={data}
              onCreateResume={onCreateResume}
              inCreateFlight={inCreateFlight}
              onDeleteResume={onDeleteResume}
              inDeleteFlight={inDeleteFlight}
            />
          ))}
        </Flex>
      </Container>
    </Flex>
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
