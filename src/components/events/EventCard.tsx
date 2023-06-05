import {
  Flex,
  Text,
  Button as ChakraButton,
  Image,
  Box,
  AspectRatio,
  Badge,
} from '@chakra-ui/react';
import { isEqual, sample } from 'lodash';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { Button } from 'components/common/Button';
import {
  FlexColumn,
  MotionFlexColumn,
} from 'components/common/MotionContainers';
import { parseGiftFormValues } from 'components/events/utils';
import { createGift, deleteGift, updateGift } from 'services/gift';
import { EventComponentProps, EventWithGifts } from 'types/event';
import { GiftFormValues, GiftType } from 'types/gift';
import { CURRENCIES, EVENT_CATEGORIES } from 'utils/constants';
import EventCardDropdownMenu from './EventCardDropdownMenu';
import { ModalManager as GiftModalManager } from './GiftListModal';

const imgFilenames = ['ear_buds.png', 'camera.png', 'gas_cooker.png'];

const getRandomImagePath = () => {
  const filename = sample(imgFilenames);
  return `/images/${filename}`;
};

const getTotalGiftsWorth = (gifts: GiftType[], currency: string) => {
  const nf = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  });
  const sum = gifts.reduce((acc, gift) => {
    acc += parseInt(String(gift.amount));
    return acc;
  }, 0);

  return nf.format(sum);
};

const getImageFromGifts = (gifts: GiftType[]) => {
  let imageUrl;
  for (let i = 0; i < gifts.length; i++) {
    if (gifts[i].imageUrl) {
      imageUrl = gifts[i].imageUrl;
      break;
    }
  }
  return imageUrl;
};

type EventCardProps = Pick<
  EventComponentProps,
  'loading' | 'onCreate' | 'onDelete' | 'onUpdate'
> & {
  event: EventWithGifts;
};
const EventCard: React.FC<EventCardProps> = ({
  event: evt,
  onUpdate,
  onCreate,
  onDelete,
  loading,
}) => {
  const [event, setEvent] = useState<EventWithGifts>(evt);
  const [inFlight, setInFlight] = useState({
    update: false,
    create: false,
  });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [gifts, setGifts] = useState<GiftType[]>(event.gifts);

  const onCreateGift = (values: Record<string, unknown>, cb?: () => void) => {
    setInFlight(state => ({ ...state, create: true }));
    const payload = parseGiftFormValues(values as GiftFormValues);
    createGift({ ...payload, eventId: event.id })
      .then(response => {
        setGifts(list => [response.data, ...list]);
        cb?.();
      })
      .catch(err => console.log('err ', err))
      .finally(() => setInFlight(state => ({ ...state, create: false })));
  };

  const onUpdateGift = (
    id: string,
    values: Record<string, unknown>,
    cb?: () => void
  ) => {
    setInFlight(state => ({ ...state, update: true }));
    const payload = parseGiftFormValues(values as GiftFormValues);
    updateGift(id, payload)
      .then(response => {
        const event = response.data;
        setGifts(list =>
          list.map(item => (item.id === event.id ? event : item))
        );
        cb?.();
      })
      .catch(err => console.log('err ', err))
      .finally(() => setInFlight(state => ({ ...state, update: false })));
  };

  const onDeleteGift = (id: string, cb?: () => void) => {
    setInFlight(state => ({ ...state, [`delete_${id}`]: true }));
    deleteGift(id)
      .then(() => {
        setGifts(list => list.filter(item => item.id !== id));
        cb?.();
      })
      .catch(err => console.log('err ', err))
      .finally(() =>
        setInFlight(state => ({ ...state, [`delete_${id}`]: false }))
      );
  };

  useEffect(() => {
    if (!isEqual(gifts, event.gifts)) {
      setEvent(event => ({ ...event, gifts }));
    }
  }, [event.gifts, gifts]);

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
                onDelete={onDelete}
                onCreate={onCreate}
                loading={loading}
              />
            </Flex>
            <GiftModalManager
              onCreateGift={onCreateGift}
              onUpdateGift={onUpdateGift}
              onDeleteGift={onDeleteGift}
              loading={inFlight}
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
                  {getTotalGiftsWorth(event.gifts, preferredCurrency!.code)}
                </Button>
              )}
              gifts={gifts}
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
            <AspectRatio w="100px" ratio={4 / 3} pos="relative" py={2}>
              <>
                <Box
                  pos="absolute"
                  left={0}
                  right={0}
                  top={0}
                  bottom={0}
                  bg="rgba(0, 0, 0, 0.3)"
                />
                <Image
                  src={getImageFromGifts(gifts) ?? getRandomImagePath()}
                  alt="Gift item"
                  objectFit="cover"
                />
              </>
            </AspectRatio>
          </Flex>
        </Flex>
      </FlexColumn>
    </MotionFlexColumn>
  );
};

export default EventCard;
