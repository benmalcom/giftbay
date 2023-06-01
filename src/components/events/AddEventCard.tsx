import { Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MotionFlexColumn } from 'components/common/MotionContainers';
import { EventType } from 'types/event';
import { ModalManager } from './AddEventModal';

type AddEventCardProps = {
  onSave(values: Partial<EventType>): void;
};
const AddEventCard: React.FC<AddEventCardProps> = ({ onSave }) => {
  return (
    <ModalManager
      onSave={onSave}
      triggerFunc={({ trigger }) => (
        <MotionFlexColumn
          bg="gray.50"
          rounded="xl"
          shadow="sm"
          h="300px"
          minW="0px"
          cursor="pointer"
          position="relative"
          border="1.5px dashed"
          borderColor="purple.500"
          onClick={() => trigger()}
          alignItems="center"
          justifyContent="center"
          rowGap={3}
        >
          <Icon boxSize="3em" as={CiCirclePlus} size={50} color="purple.500" />
          <Text fontSize="md" color="subtle">
            New Item
          </Text>
        </MotionFlexColumn>
      )}
    />
  );
};

export default AddEventCard;
