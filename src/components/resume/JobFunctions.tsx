import { ListItem, UnorderedList, CloseButton } from '@chakra-ui/react';
import React from 'react';
import { EditableLabel } from 'components/form';
import { JobFunctionType } from 'types/resume';

type JobFunctionsProps = {
  onSaveJobFunction(values: JobFunctionType): void;
  onRemoveJobFunction(jobFunctionId: string, jobRoleId: string): void;
  jobFunctions: JobFunctionType[];
};

export const JobFunctions: React.FC<JobFunctionsProps> = ({
  onSaveJobFunction,
  jobFunctions,
  onRemoveJobFunction,
}) => {
  return (
    <UnorderedList ml={10}>
      {jobFunctions.map(item => (
        <ListItem
          key={item.id}
          sx={{
            '@media screen, print': {
              color: '#58595c',
              lineHeight: '160%',
              position: 'relative',
              fontSize: '11pt',
              ':last-of-type': {
                marginBottom: 0,
              },
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
