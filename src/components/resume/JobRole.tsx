import {
  Box,
  Text,
  Stack,
  Flex,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import JobFunctions from 'components/resume/JobFunctions';
import { ModalManager as JobFunctionsModalManager } from 'components/resume/JobFunctionsModal';
import {
  JobFunctionType,
  JobRoleType,
  ModalTriggerFunctionProps,
} from 'types/resume';
import { ModalManager as JobRoleModalManager } from './JobRoleModal';

type JobRoleProps = {
  onSave(values: JobRoleType): void;
  onSaveJobFunction(values: JobFunctionType): void;
  onAddJobFunctions(jobRoleId: string, values: Record<string, number>): void;
  onRemoveJobFunction(jobFunctionId: string, jobRoleId: string): void;
  jobRole: JobRoleType;
};

export const JobRole: React.FC<JobRoleProps> = ({
  onSave,
  jobRole,
  onSaveJobFunction,
  onAddJobFunctions,
  onRemoveJobFunction,
}) => {
  const initRef = useRef();
  return (
    <Box w="full">
      <Stack>
        <Flex justify="space-between">
          <Text color="#717276">
            {jobRole.company}, {jobRole.location}
          </Text>
          <Text color="#342f31">{jobRole.duration}</Text>
        </Flex>
      </Stack>
      <Flex mb="10px" justify="space-between" role="group">
        <Heading as="h5" size="sm" color="#717276">
          {jobRole.name}
        </Heading>
        <Flex>
          <Popover
            closeOnBlur={false}
            placement="left"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            initialFocusRef={initRef}
          >
            {({ onClose }) => (
              <>
                <PopoverTrigger>
                  <Button
                    size="xs"
                    display="none"
                    mr="10px"
                    _groupHover={{ display: 'inline-block' }}
                  >
                    <AiOutlinePlus />
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverHeader>Add contents</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody py="10px">
                      <JobFunctionsModalManager
                        triggerFunc={(props: ModalTriggerFunctionProps) => (
                          <Button
                            size="xs"
                            {...props}
                            onClick={() => {
                              props.trigger();
                              onClose();
                            }}
                            mr="10px"
                          >
                            Job Responsibilities
                          </Button>
                        )}
                        onSave={values => onAddJobFunctions(jobRole.id, values)}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
          <JobRoleModalManager
            onSave={onSave}
            initialValues={jobRole}
            triggerFunc={(props: ModalTriggerFunctionProps) => (
              <Button
                size="xs"
                display="none"
                mr="10px"
                {...props}
                onClick={() => props.trigger()}
                _groupHover={{ display: 'inline-block' }}
              >
                <AiOutlineEdit />
              </Button>
            )}
          />
        </Flex>
      </Flex>
      <JobFunctions
        onSaveJobFunction={onSaveJobFunction}
        jobFunctions={jobRole.jobFunctions}
        onRemoveJobFunction={onRemoveJobFunction}
      />
    </Box>
  );
};

JobRole.displayName = 'JobRole';

export default JobRole;
