import { ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { EditableLabel } from 'components/form';
import { JobFunctionType } from 'types/resume';

type JobFunctionsProps = {
  onSaveJobFunction(values: JobFunctionType): void;
  jobFunctions: JobFunctionType[];
};

export const JobFunctions: React.FC<JobFunctionsProps> = ({
  onSaveJobFunction,
  jobFunctions,
}) => {
  return (
    <UnorderedList mx={0}>
      {Object.values(jobFunctions).map(item => (
        <EditableLabel
          displayNode={ListItem}
          key={item.id}
          onChange={(text: string) => onSaveJobFunction({ ...item, text })}
          text={item.text}
          displayNodeProps={{ color: '#717276', lineHeight: '180%' }}
        />
      ))}
    </UnorderedList>
  );
};

JobFunctions.displayName = 'JobFunctions';

export default JobFunctions;
