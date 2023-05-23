import {
  IconButton,
  Portal,
  IconButtonProps,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import { EventCardColor } from 'types/event';
import { EVENT_CARD_COLORS } from 'utils/constants';

type ComponentProps = {
  iconButtonProps: IconButtonProps;
  onSelectColor(color: EventCardColor): void;
};
const EventCardDropdownMenu: React.FC<ComponentProps> = ({
  iconButtonProps,
  onSelectColor,
}) => {
  return (
    <Popover placement="bottom-end" isLazy>
      <PopoverTrigger>
        <IconButton {...iconButtonProps} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent _focus={{ boxShadow: 'none' }} w="250px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold">Quick Actions</PopoverHeader>
          <PopoverBody w="full" h="fit-content" p={4}>
            <Heading as="h6" size="xs" mb={2}>
              Select card color
            </Heading>
            <Flex w="full" h="fit-content" justifyContent="space-between">
              {Object.values(EVENT_CARD_COLORS).map((color, index) => (
                <Box
                  key={index}
                  bg={color.value}
                  border="1px solid"
                  borderColor={color.complement}
                  w="25px"
                  h="25px"
                  cursor="pointer"
                  rounded="xl"
                  onClick={() =>
                    onSelectColor({
                      backgroundColor: color.value,
                      foregroundColor: color.complement,
                    })
                  }
                />
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default EventCardDropdownMenu;
