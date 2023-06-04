import {
  Flex,
  Text,
  Button as ChakraButton,
  Image,
  Box,
  AspectRatio,
  Badge,
} from '@chakra-ui/react';
import { sample } from 'lodash';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { Button } from 'components/common/Button';
import {
  FlexColumn,
  MotionFlexColumn,
} from 'components/common/MotionContainers';
import wishlist from 'data/wishlist.json';
import { EventComponentProps, EventType } from 'types/event';
import { WishlistFormPayload } from 'types/wishlist';
import { CURRENCIES, EVENT_CATEGORIES } from 'utils/constants';
import EventCardDropdownMenu from './EventCardDropdownMenu';
import { ModalManager as WishlistModalManager } from './WishlistModal';

const imgFilenames = ['ear_buds.png', 'camera.png', 'gas_cooker.png'];

const getRandomImagePath = () => {
  const filename = sample(imgFilenames);
  return `/images/${filename}`;
};

type EventCardProps = Pick<EventComponentProps, 'loading' | 'onCreate'> & {
  event: EventType;
  onUpdate(id: string, values: Record<string, unknown>, cb: () => void): void;
};
const EventCard: React.FC<EventCardProps> = ({
  event,
  onUpdate,
  onCreate,
  loading,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
      w="full"
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
                  fontSize="xs"
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
                onUpdate={onUpdate}
                onCreate={onCreate}
                loading={loading}
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
                src={getRandomImagePath()}
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
