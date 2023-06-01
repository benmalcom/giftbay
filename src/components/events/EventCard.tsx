import {
  Flex,
  Text,
  Button as ChakraButton,
  Image,
  Box,
  AspectRatio,
  Badge,
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
import { CURRENCIES, EVENT_CATEGORIES } from 'utils/constants';
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
  const eventCategory = EVENT_CATEGORIES.find(
    item => item.value === event.category
  );
  return (
    <MotionFlexColumn
      bg={event.backgroundColor}
      rounded="xl"
      shadow="lg"
      h="300px"
      minW="0px"
      zIndex={2}
      whileHover={{
        y: -1,
        scale: 1.01,
      }}
      pos="relative"
      mx="auto"
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
      <FlexColumn p="3" gridGap="1" h="full" w="full">
        <Flex justify="space-between" w="full" h="65%">
          <FlexColumn rowGap={4} w="full" justify="space-between">
            <Flex w="full" justify="space-between">
              <FlexColumn rowGap={1}>
                <Badge
                  w="fit-content"
                  bg={event.foregroundColor}
                  color={event.backgroundColor}
                  boxShadow="sm"
                  textTransform="capitalize"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  columnGap={1}
                  opacity={0.8}
                >
                  {eventCategory!.label}
                </Badge>
                <Text
                  fontSize="2xl"
                  color={event.foregroundColor}
                  fontWeight={500}
                  lineHeight="110%"
                >
                  {event.name}
                </Text>
              </FlexColumn>

              <EventCardDropdownMenu
                onCloseMenu={() => setMenuOpen(false)}
                onOpenMenu={() => setMenuOpen(true)}
                event={event}
                onSave={handleEventSave}
              />
            </Flex>
            <WishlistModalManager
              onSaveWishlist={handleWishlistSave}
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
                  size="sm"
                >
                  {preferredCurrency?.symbol}250,000
                </Button>
              )}
              wishlist={wishlist}
            />
          </FlexColumn>
        </Flex>
        <Flex align="center" gridGap="4" h="35%" w="full">
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
            justifyContent="flex-end"
            alignItems="flex-end"
            h="full"
          >
            <AspectRatio w="110px" ratio={4 / 3}>
              <Image
                src={event.lastGiftImageUrl}
                alt="Gift item"
                objectFit="cover"
              />
            </AspectRatio>
          </Flex>
        </Flex>
      </FlexColumn>
    </MotionFlexColumn>
  );
};

export default EventCard;
