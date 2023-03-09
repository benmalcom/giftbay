import { ListItem, UnorderedList, CloseButton } from '@chakra-ui/react';
import React, { Ref, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { EditableLabel } from 'components/form';
import { JobFunctionType, ResumeSettingsType } from 'types/resume';

type JobFunctionsProps = {
  onSaveJobFunction(values: JobFunctionType): void;
  onRemoveJobFunction(jobFunctionId: string, jobRoleId: string): void;
  jobFunctions: JobFunctionType[];
  settings: ResumeSettingsType;
  isEditable?: boolean;
  onDragEnd(sourceIndex: number, destinationIndex: number): void;
};

export const JobFunctions: React.FC<JobFunctionsProps> = ({
  jobFunctions,
  onRemoveJobFunction,
  onSaveJobFunction,
  onDragEnd,
  settings,
  isEditable,
}) => {
  const handleDragEnd = (result: DropResult) => {
    // `destination` is `undefined` if the item was dropped outside the list
    // In this case, do nothing
    if (!result.destination) {
      return;
    }

    onDragEnd(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <UnorderedList
            ml={6}
            className="kendo-ui-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {jobFunctions.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={`${item.id}-id`}
                index={index}
              >
                {(provided, snapshot) => (
                  <JobFunctionItem
                    onRemoveJobFunction={onRemoveJobFunction}
                    onSaveJobFunction={onSaveJobFunction}
                    settings={settings}
                    isEditable={isEditable}
                    jobFunctionItem={item}
                    onDragEnd={onDragEnd}
                    index={index}
                    draggableInnerRef={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandlerProps={provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </UnorderedList>
        )}
      </Droppable>
    </DragDropContext>
  );
};

JobFunctions.displayName = 'JobFunctions';

export default JobFunctions;

type JobFunctionItemProps = Omit<JobFunctionsProps, 'jobFunctions'> & {
  jobFunctionItem: JobFunctionType;
  index: number;
  dragHandlerProps?: DraggableProvidedDragHandleProps | null;
  draggableProps: DraggableProvidedDraggableProps;
  draggableInnerRef: Ref<HTMLLIElement>;
  isDragging?: boolean;
};
const JobFunctionItem: React.FC<JobFunctionItemProps> = ({
  onSaveJobFunction,
  onRemoveJobFunction,
  settings,
  isEditable,
  jobFunctionItem,
  draggableProps,
  dragHandlerProps,
  draggableInnerRef,
  isDragging,
}) => {
  const [isEditing, setEditing] = useState(false);

  return (
    <ListItem
      className="job-function-item"
      {...draggableProps}
      {...dragHandlerProps}
      /*      ref={isEditing ? undefined : draggableInnerRef}*/
      ref={draggableInnerRef}
      // style={{ opacity: isDragging ? 0 : 1 }}
      fontSize="11pt"
      opacity={isDragging ? 0.7 : 1}
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
        '::before': {
          backgroundColor: settings.colors.accent,
        },
      }}
      role="group"
    >
      <EditableLabel
        onOpenEdit={() => setEditing(true)}
        onCloseEdit={() => setEditing(false)}
        isEditable={isEditable}
        onChange={(text: string) =>
          onSaveJobFunction({ ...jobFunctionItem, text })
        }
        text={jobFunctionItem.text}
      />

      {isEditable && (
        <CloseButton
          size="sm"
          color="red"
          position="absolute"
          top="-10px"
          right="-20px"
          display="none"
          _groupHover={{ display: 'inline-block' }}
          onClick={() =>
            onRemoveJobFunction(jobFunctionItem.id, jobFunctionItem.jobRoleId)
          }
        />
      )}
    </ListItem>
  );
};
