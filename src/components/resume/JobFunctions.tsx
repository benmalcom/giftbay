import { ListItem, UnorderedList, CloseButton } from '@chakra-ui/react';
import React from 'react';
import { EditableLabel } from 'components/form';
import { JobFunctionType, ResumeSettingsType } from 'types/resume';

type JobFunctionsProps = {
  onSaveJobFunction(values: JobFunctionType): void;
  onRemoveJobFunction(jobFunctionId: string, jobRoleId: string): void;
  jobFunctions: JobFunctionType[];
  settings: ResumeSettingsType;
};

export const JobFunctions: React.FC<JobFunctionsProps> = ({
  onSaveJobFunction,
  jobFunctions,
  onRemoveJobFunction,
  settings,
}) => {
  return (
    <UnorderedList ml={10}>
      {jobFunctions.map(item => (
        <ListItem
          key={item.id}
          fontSize="11.5pt"
          sx={{
            '@media screen, print': {
              color: settings.colors.common,
              lineHeight: '180%',
              position: 'relative',
              ':last-of-type': {
                marginBottom: 0,
              },
            },
            '@media print': {
              fontSize: '10.5pt',
            },
          }}
          role="group"
        >
          <EditableLabel
            onChange={(text: string) => onSaveJobFunction({ ...item, text })}
            text={item.text}
          />
          <CloseButton
            size="sm"
            color="red"
            position="absolute"
            top="-10px"
            right="-20px"
            display="none"
            _groupHover={{ display: 'inline-block' }}
            onClick={() => onRemoveJobFunction(item.id, item.jobRoleId)}
          />
        </ListItem>
      ))}
    </UnorderedList>
  );
};

JobFunctions.displayName = 'JobFunctions';

export default JobFunctions;
