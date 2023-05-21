import { Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MotionFlexColumn } from 'components/common/MotionContainers';

type AddEventCardProps = {
  onClick(): void;
};
const AddEventCard: React.FC<AddEventCardProps> = props => {
  return (
    <MotionFlexColumn
      bg="gray.50"
      rounded="xl"
      shadow="md"
      h="300px"
      cursor="pointer"
      position="relative"
      border="1px dashed"
      borderColor="purple.500"
      onClick={() => props.onClick()}
      alignItems="center"
      justifyContent="center"
      rowGap={3}
    >
      <Icon boxSize="3em" as={CiCirclePlus} size={50} color="purple.500" />
      <Text fontSize="md" color="subtle">
        New event
      </Text>
    </MotionFlexColumn>
  );
};

export default AddEventCard;
