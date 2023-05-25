import {
  Flex,
  Text,
  Button as ChakraButton,
  Image,
  Box,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { Button } from 'components/common/Button';
import {
  FlexColumn,
  MotionFlexColumn,
} from 'components/common/MotionContainers';
import wishlist from 'data/wishlist.json';
import { EventFormPayload, EventType } from 'types/event';
import { WishlistFormPayload } from 'types/wishlist';
import { CURRENCIES } from 'utils/constants';
import EventCardDropdownMenu from './EventCardDropdownMenu';
import { ModalManager as WishlistModalManager } from './WishlistModal';

type EventCardProps = {
  event: EventType;
};
const EventCard: React.FC<EventCardProps> = ({ event: evt }) => {
  const [event, setEvent] = useState(evt);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleEventSave = (values: Partial<EventFormPayload>) =>
    setEvent(event => ({ ...event, ...values }));

  const handleWishlistSave = (values: Partial<WishlistFormPayload>) =>
    console.log('Wishlist ', values);

  const preferredCurrency = CURRENCIES.find(
    item => item.value === event.currency
  );
  return (
    <MotionFlexColumn
      bg={event.backgroundColor}
      rounded="xl"
      shadow="lg"
      h="300px"
      zIndex={2}
      whileHover={{
        y: -1,
        scale: 1.01,
      }}
      pos="relative"
    >
      {isMenuOpen && (
        <Box
          pos="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg="rgba(0,0,0,0.5)"
          borderRadius="inherit"
        />
      )}
      <FlexColumn p="3" gridGap="2" h="full" w="full">
        <Flex justify="space-between" w="full" h="50%">
          <FlexColumn rowGap={5} w="full">
            <Flex w="full" justify="space-between">
              <Text
                fontSize="xl"
                color={event.foregroundColor}
                fontWeight={600}
              >
                {event.name}
              </Text>
              <EventCardDropdownMenu
                onCloseMenu={() => setMenuOpen(false)}
                onOpenMenu={() => setMenuOpen(true)}
                event={event}
                onSave={handleEventSave}
                onSaveWishlist={handleWishlistSave}
              />
            </Flex>
            <WishlistModalManager
              preferredCurrency={preferredCurrency!}
              triggerFunc={({ trigger }) => (
                <Button
                  onClick={() => trigger()}
                  variant="transparent"
                  color={event.foregroundColor}
                  bg="transparent"
                  rounded="3xl"
                  width="fit-content"
                  fontWeight={400}
                >
                  {preferredCurrency?.symbol}250,000
                </Button>
              )}
              wishlist={wishlist}
            />
          </FlexColumn>
        </Flex>
        <Flex align="center" gridGap="4" h="50%" w="full">
          <Flex h="full" width="40%" alignItems="flex-end">
            <Link href="/overview" passHref>
              <ChakraButton
                rightIcon={<FiExternalLink />}
                as="a"
                textDecoration="none"
                cursor="pointer"
                w="fit-content"
                color={event.foregroundColor}
                variant="link"
                fontWeight={400}
              >
                View details
              </ChakraButton>
            </Link>
          </Flex>
          <Flex
            flex={1}
            mr={-1}
            mb={-1}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Image src={event.lastGiftImageUrl} alt="Gift item" mr={0} mb={0} />
          </Flex>
        </Flex>
      </FlexColumn>
    </MotionFlexColumn>
  );
};

export default EventCard;
