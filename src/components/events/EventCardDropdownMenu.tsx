import { CheckIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Portal,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Flex,
  Heading,
  Button,
  Stack,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { transformEventToFormValues } from 'components/events/utils';
import { EventFormPayload, EventType } from 'types/event';
import { WishlistFormPayload } from 'types/wishlist';
import { EVENT_CARD_COLORS } from 'utils/constants';
import { ModalManager as EventModalManager } from './AddEventModal';
import { ModalManager as WishlistItemModalManager } from './AddWishlistItemModal';

type ComponentProps = {
  onSave(values: Partial<EventFormPayload>): void;
  onSaveWishlist(values: WishlistFormPayload): void;
  event: EventType;
  onOpenMenu(): void;
  onCloseMenu(): void;
};
const EventCardDropdownMenu: React.FC<ComponentProps> = ({
  event,
  onCloseMenu,
  onOpenMenu,
  onSave,
  onSaveWishlist,
}) => {
  return (
    <Popover
      placement="bottom-end"
      onClose={() => onCloseMenu()}
      onOpen={() => onOpenMenu()}
      lazyBehavior="unmount"
    >
      <PopoverTrigger>
        <IconButton
          isRound
          icon={<Icon as={AiOutlinePlus} />}
          onClick={event => event.stopPropagation()}
          fontSize="lg"
          size="xs"
          variant="outline"
          bg={event.foregroundColor}
          color={event.backgroundColor}
          opacity="0.9"
          border="1px solid currentcolor"
          _hover={{ opacity: 1 }}
          _active={{ opacity: 1 }}
          _disabled={{ opacity: 0.8 }}
          aria-label={'card-options'}
        />
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
                  <WishlistItemModalManager
                    onSave={onSaveWishlist}
                    triggerFunc={({ trigger }) => (
                      <Button
                        onClick={() => trigger()}
                        colorScheme="purple"
                        size="xs"
                      >
                        Add item to Wishlist
                      </Button>
                    )}
                  />

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
                  <EventModalManager
                    initialValues={transformEventToFormValues(event)}
                    triggerFunc={({ trigger }) => (
                      <Button
                        onClick={() => trigger()}
                        colorScheme="purple"
                        size="xs"
                        variant="outline"
                      >
                        Edit this card
                      </Button>
                    )}
                    onSave={onSave}
                  />

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
                        onSave({
                          backgroundColor: color.value,
                          foregroundColor: color.complement,
                        })
                      }
                    >
                      {color.value === event.backgroundColor &&
                        color.complement === event.foregroundColor && (
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
