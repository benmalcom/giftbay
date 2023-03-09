/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Button,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  Skeleton,
  Badge,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React from 'react';
import { AiOutlineCopy, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { ModalManager as ConfirmationModalManager } from 'components/common/ConfirmationModal';
import { ResumeData } from 'types/resume';
import { objFromBase64 } from 'utils/functions';
import { ModalManager as ResumePreviewModalManager } from './ResumePreviewModal';
dayjs.extend(relativeTime);

const LoadingSkeleton = () => (
  <>
    {Array.from(new Array(4).keys()).map(item => (
      <Tr key={item} w="full">
        {Array.from(new Array(4).keys()).map(item => (
          <Td key={item}>
            <Skeleton w="full" h="30px" />
          </Td>
        ))}
      </Tr>
    ))}
  </>
);

type ResumePDFProps = {
  resumeDataList: ResumeData[];
  onDeleteResume(resumeId: string): void;
  onDuplicateResume(resumeData: ResumeData): void;
  inDeleteFlight(resumeId: string): boolean;
  inDuplicateFlight(resumeId: string): boolean;
  hasReachedLimit?: boolean;
  inGetFlight?: boolean;
};

const ResumeList: React.FC<ResumePDFProps> = ({
  resumeDataList,
  onDeleteResume,
  inDeleteFlight,
  hasReachedLimit,
  inGetFlight,
  onDuplicateResume,
  inDuplicateFlight,
}) => {
  return (
    <TableContainer w="full">
      <Table size="sm" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Headline</Th>
            <Th>Last Edited</Th>
            <Th textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inGetFlight ? (
            <LoadingSkeleton />
          ) : (
            resumeDataList.map((resumeData, index) => {
              const resume = resumeData.contents
                ? objFromBase64(resumeData.contents)
                : null;
              const isDeleting = inDeleteFlight(resumeData.id);
              const isDuplicating = inDuplicateFlight(resumeData.id);
              return (
                <Tr key={resumeData.id}>
                  <Td> {index + 1}</Td>
                  <Td>
                    {resume ? (
                      <>
                        <ResumePreviewModalManager
                          resume={resume}
                          triggerFunc={({ trigger, ...rest }) => (
                            <Button
                              variant="link"
                              as="a"
                              size="sm"
                              colorScheme="twitter"
                              onClick={() => trigger()}
                              cursor="pointer"
                              title="View resume"
                              {...rest}
                            >
                              {resume.candidate.headline}
                            </Button>
                          )}
                        />
                        {resumeData.name && (
                          <Badge variant="outline" colorScheme="green" ml={2}>
                            {resumeData.name}
                          </Badge>
                        )}
                      </>
                    ) : (
                      '-'
                    )}
                  </Td>
                  <Td>
                    {dayjs(resumeData.updatedAt).format('MMM D, YYYY h:mm A')}
                  </Td>
                  <Td>
                    <Flex gap={2} justify="end">
                      {!hasReachedLimit && (
                        <Button
                          size="xs"
                          onClick={() => onDuplicateResume(resumeData)}
                          isLoading={isDuplicating}
                          cursor="pointer"
                          title="Duplicate resume"
                        >
                          <AiOutlineCopy
                            color="teal"
                            style={{ marginRight: '2px' }}
                          />
                          Duplicate
                        </Button>
                      )}

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
                      <ConfirmationModalManager
                        triggerFunc={({ trigger, ...rest }) => (
                          <Button
                            as="a"
                            size="xs"
                            colorScheme="red"
                            isLoading={isDeleting}
                            onClick={() => trigger()}
                            cursor="pointer"
                            title="Delete resume"
                            {...rest}
                          >
                            <AiFillDelete color="white" />
                          </Button>
                        )}
                        message="Are you sure you want to delete this resume?"
                        onProceed={() => onDeleteResume(resumeData.id)}
                        isProcessing={isDeleting}
                        closeAfterProcessing
                        proceedButtonProps={{
                          disabled: isDeleting,
                          isLoading: isDeleting,
                        }}
                      />
                    </Flex>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ResumeList;
