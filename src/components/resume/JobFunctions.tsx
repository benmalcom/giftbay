import { ListItem, UnorderedList, CloseButton } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { EditableLabel } from 'components/form';
import { JobFunctionType, ResumeSettingsType } from 'types/resume';

type JobFunctionsProps = {
  onSaveJobFunction(values: JobFunctionType): void;
  onRemoveJobFunction(jobFunctionId: string, jobRoleId: string): void;
  jobFunctions: JobFunctionType[];
  settings: ResumeSettingsType;
  isEditable?: boolean;
  onDragEnd(dragIndex: number, hoverIndex: number): void;
};

export const JobFunctions: React.FC<JobFunctionsProps> = ({
  jobFunctions,
  onRemoveJobFunction,
  onSaveJobFunction,
  onDragEnd,
  settings,
  isEditable,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <UnorderedList ml={6} className="kendo-ui-list">
        {jobFunctions.map((item, index) => (
          <JobFunctionItem
            key={item.id}
            onRemoveJobFunction={onRemoveJobFunction}
            onSaveJobFunction={onSaveJobFunction}
            settings={settings}
            isEditable={isEditable}
            jobFunctionItem={item}
            onDragEnd={onDragEnd}
            index={index}
          />
        ))}
      </UnorderedList>
    </DndProvider>
  );
};

JobFunctions.displayName = 'JobFunctions';

export default JobFunctions;

const JobFunctionItem: React.FC<
  Omit<JobFunctionsProps, 'jobFunctions'> & {
    jobFunctionItem: JobFunctionType;
    index: number;
  }
> = ({
  onSaveJobFunction,
  onRemoveJobFunction,
  onDragEnd,
  settings,
  isEditable,
  jobFunctionItem,
  index,
}) => {
  const [isEditing, setEditing] = useState(false);
  const ref = useRef(null); // Initialize the reference

  // useDrop hook is responsible for handling whether any item gets hovered or dropped on the element
  const [, drop] = useDrop({
    // Accept will make sure only these element type can be droppable on this element
    accept: 'JobFunctionItem',
    // @ts-ignore: Type not specified
    hover(item: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = index;
      // If the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) {
        return;
      }
      // If it is dragged around other elements, then move the image and set the state with position changes
      onDragEnd(dragIndex, hoverIndex);
      /*
        Update the index for dragged item directly to avoid flickering
        when the image was half dragged into the next
      */
      item.index = hoverIndex;
    },
  });

  // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
  const [{ isDragging }, drag] = useDrag(() => ({
    // what type of item this to determine if a drop target accepts it
    type: 'JobFunctionItem',
    // data of the item to be available to the drop methods
    item: { id: jobFunctionItem.id, index },
    // method to collect additional data for drop handling like whether is currently being dragged
    collect: monitor => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  /*
    Initialize drag and drop into the element using its reference.
    Here we initialize both drag and drop on the same element (i.e., Image component)
  */
  if (isEditable) drag(drop(ref));

  return (
    <ListItem
      ref={isEditing ? undefined : ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      fontSize="11pt"
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
