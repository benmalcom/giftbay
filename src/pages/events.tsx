import { Box, Button, Container, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { FlexColumn } from 'components/common/MotionContainers';
import { EventsGridLayout } from 'components/events';
import events from 'data/events.json';
import { EventFormPayload } from 'types/event';

const Events = () => {
  const onSaveEvent = (event: EventFormPayload) => {
    console.log('event ', event);
  };
  return (
    <Container py={1.5} maxW="7xl" h="full" alignItems="center" mt="25px">
      <FlexColumn w="full" rowGap={10} mt={10}>
        <Heading as="h3" size="lg" color="gray.600">
          Quick look at your events
        </Heading>
        <Box>
          <Link href="/overview" passHref>
            <Button
              leftIcon={<MdOutlineKeyboardBackspace />}
              as="a"
              textDecoration="none"
              cursor="pointer"
              w="fit-content"
              color="subtle"
              variant="link"
            >
              Go to overview
            </Button>
          </Link>
        </Box>
        <EventsGridLayout events={events} onSave={onSaveEvent} />
      </FlexColumn>
    </Container>
  );
};

export default Events;
