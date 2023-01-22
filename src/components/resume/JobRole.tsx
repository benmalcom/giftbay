import { Box, Text, Stack, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { JobRoleType, ModalTriggerFunctionProps } from 'types/resume';
import { ModalManager as JobRoleModalManager } from './JobRoleModal';

type JobRoleProps = {
  onSave(values: JobRoleType): void;
  jobRole: JobRoleType;
};

export const JobRole: React.FC<JobRoleProps> = ({ onSave, jobRole }) => {
  return (
    <JobRoleModalManager
      onSave={onSave}
      initialValues={jobRole}
      triggerFunc={(props: ModalTriggerFunctionProps) => (
        <Box
          onDoubleClick={() => props.trigger()}
          w="full"
          _hover={{
            border: '1px dashed gray',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
          {...props}
        >
          <Stack>
            <Flex justify="space-between">
              <Text color="#717276">
                {jobRole.company}, {jobRole.location}
              </Text>
              <Text color="#342f31">{jobRole.duration}</Text>
            </Flex>
          </Stack>
          <Heading size="sm" color="#717276">
            {jobRole.name}
          </Heading>
        </Box>
      )}
    />
  );
};

JobRole.displayName = 'JobRole';

export default JobRole;
