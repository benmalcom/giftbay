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
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React from 'react';
import {
  AiOutlineCopy,
  AiOutlineEdit,
  AiFillDelete,
  AiOutlineEye,
} from 'react-icons/ai';
import { ModalManager as ConfirmationModalManager } from 'components/common/ConfirmationModal';
import { ResumeData } from 'types/resume';
import { objFromBase64 } from 'utils/functions';
import { ModalManager as ResumePreviewModalManager } from './ResumePreviewModal';
dayjs.extend(relativeTime);

type ResumePDFProps = {
  resumeDataList: ResumeData[];
  onCreateResume(payload: Record<string, unknown>): void;
  inCreateFlight?: boolean;
  onDeleteResume(resumeId: string): void;
  inDeleteFlight?: boolean;
  hasReachedLimit?: boolean;
  inGetFlight?: boolean;
};

const ResumeList: React.FC<ResumePDFProps> = ({
  resumeDataList,
  inCreateFlight,
  onCreateResume,
  onDeleteResume,
  inDeleteFlight,
  hasReachedLimit,
  inGetFlight,
}) => {
  const onDuplicate = (resumeData: ResumeData) => {
    onCreateResume({
      contents: resumeData.contents,
      fileContents: resumeData.fileContents,
    });
  };
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
          {inGetFlight
            ? Array.from(new Array(4).keys()).map(item => (
                <Tr key={item} w="full">
                  <Skeleton w="full" h="full" />
                </Tr>
              ))
            : resumeDataList.map((resumeData, index) => {
                const resume = objFromBase64(resumeData.contents);
                return (
                  <Tr key={resumeData.id}>
                    <Td> {index + 1}</Td>
                    <Td>
                      {resumeData.contents ? (
                        <ResumePreviewModalManager
                          resume={resume}
                          triggerFunc={({ trigger, ...rest }) => (
                            <Button
                              variant="link"
                              as="a"
                              size="sm"
                              colorScheme="twitter"
                              isLoading={inDeleteFlight}
                              onClick={() => trigger()}
                              cursor="pointer"
                              title="View resume"
                              {...rest}
                            >
                              {resume.candidate.headline}
                            </Button>
                          )}
                        />
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
                            onClick={() => onDuplicate(resumeData)}
                            isLoading={inCreateFlight}
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
                              isLoading={inDeleteFlight}
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
                          isProcessing={inDeleteFlight}
                          closeAfterProcessing
                          proceedButtonProps={{
                            disabled: inDeleteFlight,
                            isLoading: inDeleteFlight,
                          }}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ResumeList;
