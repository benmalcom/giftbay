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
  ResumeSettingsType,
} from 'types/resume';
import { ModalManager as JobRoleModalManager } from './JobRoleModal';

type JobRoleProps = {
  onSave(values: JobRoleType): void;
  onSaveJobFunction(values: JobFunctionType): void;
  onAddJobFunctions(jobRoleId: string, values: Record<string, number>): void;
  onRemoveJobFunction(jobFunctionId: string, jobRoleId: string): void;
  onRemove(jobRoleId: string): void;
  jobRole: JobRoleType;
  settings: ResumeSettingsType;
};

export const JobRole: React.FC<JobRoleProps> = ({
  onSave,
  jobRole,
  onSaveJobFunction,
  onAddJobFunctions,
  onRemoveJobFunction,
  onRemove,
  settings,
}) => {
  return (
    <Box
      w="full"
      sx={{
        '@media screen, print': {
          width: '100%',
          marginTop: '0 !important',
        },
      }}
    >
      {jobRole.isInline ? (
        <InLineJobTitle jobRole={jobRole} settings={settings} />
      ) : (
        <NonInLineJobTitle
          jobRole={jobRole}
          settings={settings}
          onSave={onSave}
          onRemove={onRemove}
          onAddJobFunctions={onAddJobFunctions}
        />
      )}

      <JobFunctions
        settings={settings}
        onSaveJobFunction={onSaveJobFunction}
        jobFunctions={jobRole.jobFunctions}
        onRemoveJobFunction={onRemoveJobFunction}
      />
    </Box>
  );
};

JobRole.displayName = 'JobRole';

export default JobRole;

type JobTitleProps = {
  jobRole: JobRoleType;
  settings: ResumeSettingsType;
};

const InLineJobTitle: React.FC<JobTitleProps> = ({ jobRole, settings }) => (
  <Flex
    sx={{
      '@media screen, print': {
        alignItems: 'center',
        marginBottom: '10px',
      },
      '@media print': {
        fontSize: '10.5pt',
      },
    }}
  >
    <Flex>
      <Text
        sx={{
          '@media screen, print': {
            color: settings.colors.jobRoleName,
            fontWeight: 600,
          },
        }}
      >
        {jobRole.name},
      </Text>
      &nbsp;
      <Text
        sx={{
          '@media screen, print': {
            color: settings.colors.jobRoleCompanyLocation,
          },
        }}
      >
        {jobRole.company}, {jobRole.location}
      </Text>
    </Flex>
    <Text
      color="#342f31"
      sx={{
        '@media screen, print': {
          color: settings.colors.jobRoleDuration,
        },
      }}
    >
      {jobRole.duration}
    </Text>
  </Flex>
);

const NonInLineJobTitle: React.FC<
  JobTitleProps & {
    onSave(values: JobRoleType): void;
    onAddJobFunctions(jobRoleId: string, values: Record<string, number>): void;
    onRemove(jobRoleId: string): void;
  }
> = ({ jobRole, settings, onAddJobFunctions, onSave, onRemove }) => {
  const initRef = useRef();
  const getCtaButtons = () => (
    <Flex display="none" _groupHover={{ display: 'inline-block' }} ml="15px">
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
              <Button size="xs" mr="10px">
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
          <Button size="xs" mr="10px" {...rest} onClick={() => trigger()}>
            <AiOutlineEdit />
          </Button>
        )}
      />
      <Button size="xs" onClick={() => onRemove(jobRole.id)}>
        <AiFillDelete color="red" />
      </Button>
    </Flex>
  );

  return (
    <>
      <Stack>
        <Flex
          sx={{
            '@media screen, print': {
              justifyContent: 'space-between',
            },
          }}
        >
          <Text
            sx={{
              '@media screen, print': {
                color: settings.colors.jobRoleCompanyLocation,
              },
            }}
          >
            {jobRole.company}, {jobRole.location}
          </Text>
          <Text
            sx={{
              '@media screen, print': {
                color: settings.colors.jobRoleDuration,
              },
            }}
          >
            {jobRole.duration}
          </Text>
        </Flex>
      </Stack>
      <Flex
        sx={{
          '@media screen, print': {
            marginBottom: '10px',
          },
        }}
        role="group"
      >
        <Heading
          as="h6"
          size="sm"
          sx={{
            '@media screen, print': {
              color: settings.colors.jobRoleName,
            },
            '@media print': {
              fontSize: '11pt',
            },
          }}
        >
          {jobRole.name}
        </Heading>
        {getCtaButtons()}
      </Flex>
    </>
  );
};
