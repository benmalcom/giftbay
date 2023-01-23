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
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
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
  onRemove(jobRoleId: string): void;
  jobRole: JobRoleType;
};

export const JobRole: React.FC<JobRoleProps> = ({
  onSave,
  jobRole,
  onSaveJobFunction,
  onAddJobFunctions,
  onRemoveJobFunction,
  onRemove,
}) => {
  const initRef = useRef();
  const getCtaButtons = () => (
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
                    triggerFunc={({
                      trigger,
                      ...rest
                    }: ModalTriggerFunctionProps) => (
                      <Button
                        size="xs"
                        {...rest}
                        onClick={() => {
                          trigger();
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
        triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
          <Button
            size="xs"
            display="none"
            mr="10px"
            {...rest}
            onClick={() => trigger()}
            _groupHover={{ display: 'inline-block' }}
          >
            <AiOutlineEdit />
          </Button>
        )}
      />
      <Button
        size="xs"
        display="none"
        _groupHover={{ display: 'inline-block' }}
        onClick={() => onRemove(jobRole.id)}
      >
        <AiFillDelete color="red" />
      </Button>
    </Flex>
  );

  return (
    <Box w="full">
      {jobRole.isInline ? (
        <Flex justify="space-between" align="center" mb="10px">
          <Flex>
            <Text color="#717276" fontWeight={600}>
              {jobRole.name},
            </Text>
            &nbsp;
            <Text color="#717276">
              {jobRole.company}, {jobRole.location}
            </Text>
          </Flex>
          <Text color="#342f31">{jobRole.duration}</Text>
        </Flex>
      ) : (
        <>
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
            {getCtaButtons()}
          </Flex>
        </>
      )}

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
