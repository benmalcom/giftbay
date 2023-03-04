/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AspectRatio, Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React, { useMemo } from 'react';
import {
  AiFillFilePdf,
  AiOutlineEdit,
  AiFillDelete,
  AiOutlineEye,
} from 'react-icons/ai';
import { VscFilePdf } from 'react-icons/vsc';
import { ResumeData, ResumeType } from 'types/resume';
import { objFromBase64 } from 'utils/functions';
import { ModalManager as ResumePreviewModalManager } from './ResumePreviewModal';
dayjs.extend(relativeTime);

type ResumePDFProps = {
  resumeData: ResumeData;
  onCreateResume(payload: Record<string, unknown>): void;
  inCreateFlight?: boolean;
  onDeleteResume(resumeId: string): void;
  inDeleteFlight?: boolean;
};

const ResumePDF: React.FC<ResumePDFProps> = ({
  resumeData,
  inCreateFlight,
  onCreateResume,
  onDeleteResume,
  inDeleteFlight,
}) => {
  const onDuplicate = () => {
    onCreateResume({
      contents: resumeData.contents,
      fileContents: resumeData.fileContents,
    });
  };

  const resume = useMemo<ResumeType>(
    () => objFromBase64(resumeData.contents),
    [resumeData.contents]
  );

  return (
    <Flex role="group" boxShadow="md" position="relative" zIndex={1}>
      <Box
        w="100%"
        h="100%"
        position="absolute"
        zIndex={2}
        bg="rgba(0, 0, 0, 0.6)"
        display="none"
        _groupHover={{ display: 'block' }}
      />
      <Flex
        display="none"
        _groupHover={{ display: 'flex' }}
        w="100%"
        h="100%"
        flexDir="column"
        position="absolute"
        align="center"
        justify="center"
        zIndex={3}
        py={5}
        rowGap={4}
      >
        <Badge variant="solid" colorScheme="green" textTransform="capitalize">
          {resume.candidate.headline}
        </Badge>
        <Flex gap={1}>
          <Button
            size="xs"
            onClick={onDuplicate}
            isLoading={inCreateFlight}
            cursor="pointer"
            title="Duplicate resume"
          >
            <AiFillFilePdf color="red" style={{ marginRight: '2px' }} />
            Duplicate
          </Button>
          {resumeData.contents ? (
            <ResumePreviewModalManager
              resume={resume}
              triggerFunc={({ trigger, ...rest }) => (
                <Button
                  as="a"
                  size="xs"
                  colorScheme="twitter"
                  isLoading={inDeleteFlight}
                  onClick={() => trigger()}
                  cursor="pointer"
                  title="View resume"
                  {...rest}
                >
                  <AiOutlineEye color="white" /> View
                </Button>
              )}
            />
          ) : null}

          <Link href={`/builder/${resumeData.id}`}>
            <Button
              as="a"
              size="xs"
              colorScheme="orange"
              cursor="pointer"
              title="Edit resume"
            >
              <AiOutlineEdit />
            </Button>
          </Link>
          <Button
            as="a"
            size="xs"
            colorScheme="red"
            isLoading={inDeleteFlight}
            onClick={() => onDeleteResume(resumeData.id)}
            cursor="pointer"
            title="Delete resume"
          >
            <AiFillDelete color="white" />
          </Button>
        </Flex>
        {resumeData.updatedAt && (
          <Flex>
            <Text color="white" fontSize="13px" fontWeight={600} mr={1}>
              Last edited:
            </Text>{' '}
            <Text color="white" fontSize="13px" fontWeight={500}>
              {dayjs(resumeData.updatedAt).format('MMM D, YYYY h:mm A')}
            </Text>
          </Flex>
        )}
      </Flex>

      <AspectRatio w="220px" ratio={4 / 3}>
        <Flex
          bg="#ffffff"
          boxShadow="sm"
          width="full"
          height="full"
          align="center"
          justify="center"
        >
          <VscFilePdf style={{ color: 'red' }} size={140} />
        </Flex>
      </AspectRatio>
    </Flex>
  );
};

export default ResumePDF;
