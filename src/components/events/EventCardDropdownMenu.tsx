import { CheckIcon } from '@chakra-ui/icons';
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
import { isEqual } from 'lodash';
import React from 'react';
import { EventCardColor } from 'types/event';
import { EVENT_CARD_COLORS } from 'utils/constants';

type ComponentProps = {
  iconButtonProps: IconButtonProps;
  onSelectColor(color: EventCardColor): void;
  currentColor: EventCardColor;
};
const EventCardDropdownMenu: React.FC<ComponentProps> = ({
  iconButtonProps,
  onSelectColor,
  currentColor,
}) => {
  return (
    <Popover placement="bottom-end" isLazy>
      <PopoverTrigger>
        <IconButton {...iconButtonProps} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent _focus={{ boxShadow: 'none' }} w="250px" shadow="xl">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold">Quick Actions</PopoverHeader>
          <PopoverBody w="full" h="fit-content" p={4}>
            <Heading as="h6" size="xs" mb={2}>
              Change card color
            </Heading>
            <Flex w="full" h="fit-content" justifyContent="space-between">
              {Object.values(EVENT_CARD_COLORS).map((color, index) => (
                <Flex
                  key={index}
                  bg={color.value}
                  border="1px solid"
                  borderColor={color.complement}
                  w="25px"
                  h="25px"
                  cursor="pointer"
                  rounded="xl"
                  align="center"
                  justify="center"
                  onClick={() =>
                    onSelectColor({
                      backgroundColor: color.value,
                      foregroundColor: color.complement,
                    })
                  }
                >
                  {color.value === currentColor.backgroundColor &&
                    color.complement === currentColor.foregroundColor && (
                      <CheckIcon color={color.complement} boxSize="0.6em" />
                    )}
                </Flex>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default EventCardDropdownMenu;
