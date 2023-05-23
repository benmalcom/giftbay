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
  Button,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { EventCardColor } from 'types/event';
import { EVENT_CARD_COLORS } from 'utils/constants';

type ComponentProps = {
  iconButtonProps: IconButtonProps;
  onSelectColor(color: EventCardColor): void;
  currentColor: EventCardColor;
  onOpenMenu(): void;
  onCloseMenu(): void;
};
const EventCardDropdownMenu: React.FC<ComponentProps> = ({
  iconButtonProps,
  onSelectColor,
  currentColor,
  onCloseMenu,
  onOpenMenu,
}) => {
  return (
    <Popover
      placement="bottom-end"
      isLazy
      onClose={onCloseMenu}
      onOpen={onOpenMenu}
    >
      <PopoverTrigger>
        <IconButton {...iconButtonProps} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent _focus={{ boxShadow: 'none' }} w="250px" shadow="xl">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold">Quick Actions</PopoverHeader>
          <PopoverBody w="full" h="fit-content" p={3}>
            <Stack spacing={4} mt={2}>
              <Stack spacing={2}>
                <Heading as="h6" size="xs" fontWeight={500}>
                  Wishlists
                </Heading>
                <Flex w="full" h="fit-content" justifyContent="space-between">
                  <Button colorScheme="purple" size="xs">
                    Add item to Wishlist
                  </Button>
                  <Button colorScheme="purple" size="xs" variant="outline">
                    View Wishlist
                  </Button>
                </Flex>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h6" size="xs" fontWeight={500}>
                  Card Actions
                </Heading>
                <Flex w="full" h="fit-content" columnGap={3}>
                  <Button colorScheme="purple" size="xs" variant="outline">
                    Edit this card
                  </Button>
                  <Button colorScheme="red" size="xs">
                    Delete
                  </Button>
                </Flex>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h6" size="xs" fontWeight={500}>
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
              </Stack>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default EventCardDropdownMenu;
