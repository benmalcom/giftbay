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
import React, { forwardRef, MutableRefObject, Ref, useRef } from 'react';
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { ModalManager as BulletedListModalManager } from 'components/resume/AddBulletedListModal';
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
  onAddJobFunctions(
    jobRoleId: string,
    values: Record<string, number | string>
  ): void;
  onRemoveJobFunction(jobFunctionId: string, jobRoleId: string): void;
  onRemove(jobRoleId: string): void;
  jobRole: JobRoleType;
  settings: ResumeSettingsType;
  isEditable?: boolean;
  onJobFunctionDragEnd(dragIndex: number, hoverIndex: number): void;
};

export const JobRole: React.FC<JobRoleProps> = ({
  onSave,
  jobRole,
  onSaveJobFunction,
  onAddJobFunctions,
  onRemoveJobFunction,
  onRemove,
  settings,
  isEditable,
  onJobFunctionDragEnd,
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
        <InLineJobTitle
          jobRole={jobRole}
          settings={settings}
          isEditable={isEditable}
          onSave={onSave}
          onRemove={onRemove}
          onAddJobFunctions={onAddJobFunctions}
        />
      ) : (
        <NonInLineJobTitle
          jobRole={jobRole}
          settings={settings}
          onSave={onSave}
          onRemove={onRemove}
          onAddJobFunctions={onAddJobFunctions}
          isEditable={isEditable}
        />
      )}

      <JobFunctions
        isEditable={isEditable}
        settings={settings}
        onSaveJobFunction={onSaveJobFunction}
        jobFunctions={jobRole.jobFunctions}
        onRemoveJobFunction={onRemoveJobFunction}
        onDragEnd={onJobFunctionDragEnd}
      />
    </Box>
  );
};

JobRole.displayName = 'JobRole';

export default JobRole;

type JobTitleProps = {
  jobRole: JobRoleType;
  settings: ResumeSettingsType;
  isEditable?: boolean;
};

const InLineJobTitle: React.FC<
  JobTitleProps & {
    onSave(values: JobRoleType): void;
    onAddJobFunctions(jobRoleId: string, values: Record<string, number>): void;
    onRemove(jobRoleId: string): void;
  }
> = ({
  jobRole,
  settings,
  onAddJobFunctions,
  onSave,
  onRemove,
  isEditable,
}) => {
  const initRef = useRef();
  return (
    <Flex
      role="group"
      _hover={{ cursor: 'pointer' }}
      sx={{
        '@media screen, print': {
          alignItems: 'center',
          justifyContent: 'space-between',
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
        {isEditable && (
          <CtaButtons
            ref={
              initRef as unknown as Ref<
                MutableRefObject<HTMLDivElement | undefined>
              >
            }
            jobRole={jobRole}
            isEditable={isEditable}
            onSave={onSave}
            onRemove={onRemove}
            onAddJobFunctions={onAddJobFunctions}
          />
        )}
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
};

const NonInLineJobTitle: React.FC<
  JobTitleProps & {
    onSave(values: JobRoleType): void;
    onAddJobFunctions(jobRoleId: string, values: Record<string, number>): void;
    onRemove(jobRoleId: string): void;
  }
> = ({
  jobRole,
  settings,
  onAddJobFunctions,
  onSave,
  onRemove,
  isEditable,
}) => {
  const initRef = useRef();
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
        {isEditable && (
          <CtaButtons
            ref={
              initRef as unknown as Ref<
                MutableRefObject<HTMLDivElement | undefined>
              >
            }
            jobRole={jobRole}
            isEditable={isEditable}
            onSave={onSave}
            onRemove={onRemove}
            onAddJobFunctions={onAddJobFunctions}
          />
        )}
      </Flex>
    </>
  );
};

const CtaButtons = forwardRef<
  MutableRefObject<HTMLDivElement | undefined>,
  Pick<
    JobRoleProps,
    'jobRole' | 'isEditable' | 'onSave' | 'onAddJobFunctions' | 'onRemove'
  >
>(({ jobRole, onSave, onRemove, isEditable, onAddJobFunctions }, initRef) => (
  <Flex
    display="none"
    _groupHover={{ display: isEditable ? 'inline-block' : undefined }}
    ml="15px"
  >
    <JobRoleModalManager
      onSave={onSave}
      initialValues={jobRole}
      triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
        <Button size="xs" mr="10px" {...rest} onClick={() => trigger()}>
          <AiOutlineEdit />
        </Button>
      )}
    />
    <JobFunctionsModalManager
      triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
        <Button
          size="xs"
          {...rest}
          onClick={() => trigger()}
          mr="10px"
          leftIcon={<AiOutlinePlus />}
        >
          Responsibilities
        </Button>
      )}
      onSave={values => onAddJobFunctions(jobRole.id, values)}
    />

    <BulletedListModalManager
      triggerFunc={({ trigger, ...rest }: ModalTriggerFunctionProps) => (
        <Button size="xs" {...rest} onClick={() => trigger()} mr="10px">
          Paste from ChatGPT
        </Button>
      )}
      onSave={values => onAddJobFunctions(jobRole.id, values)}
    />
    <Button size="xs" onClick={() => onRemove(jobRole.id)}>
      <AiFillDelete color="red" />
    </Button>
  </Flex>
));

CtaButtons.displayName = 'CtaButtons';
