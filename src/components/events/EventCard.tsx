import {
  Flex,
  Icon,
  Text,
  Button as ChakraButton,
  Image,
} from '@chakra-ui/react';
import { pick } from 'lodash';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { Button } from 'components/common/Button';
import {
  FlexColumn,
  MotionFlexColumn,
} from 'components/common/MotionContainers';
import { EventCardColor, EventType } from 'types/event';
import EventCardDropdownMenu from './EventCardDropdownMenu';

type EventCardProps = {
  event: EventType;
};
const EventCard: React.FC<EventCardProps> = ({ event: evt }) => {
  const [event, setEvent] = useState(evt);

  const handleColorSelect = (color: EventCardColor) => {
    setEvent(event => ({ ...event, ...color }));
  };
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
    >
      <FlexColumn p="3" gridGap="2" h="full" w="full">
        <Flex justify="space-between" w="full" h="50%">
          <FlexColumn rowGap={5}>
            <Flex columnGap={2}>
              <Text
                fontSize="xl"
                color={event.foregroundColor}
                fontWeight={600}
              >
                {event.name}
              </Text>
              <EventCardDropdownMenu
                currentColor={pick(event, [
                  'backgroundColor',
                  'foregroundColor',
                ])}
                onSelectColor={handleColorSelect}
                iconButtonProps={{
                  isRound: true,
                  'aria-label': 'project actions',
                  icon: <Icon as={AiOutlinePlus} />,
                  onClick: event => {
                    event.stopPropagation();
                  },
                  fontSize: 'lg',
                  size: 'xs',
                  variant: 'outline',
                  bg: event.foregroundColor,
                  color: event.backgroundColor,
                  opacity: '0.9',
                  border: '1px solid currentcolor',
                  _hover: { opacity: 1 },
                  _active: { opacity: 1 },
                  _disabled: { opacity: 0.8 },
                }}
              />
            </Flex>
            <Button
              variant="transparent"
              color={event.foregroundColor}
              bg="transparent"
              rounded="3xl"
              width="fit-content"
              fontWeight={400}
            >
              $250,000
            </Button>
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
