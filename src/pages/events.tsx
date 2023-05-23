import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
} from '@chakra-ui/react';
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
      <FlexColumn w="full" rowGap={8} mt={10}>
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
        <Heading as="h3" size="lg" color="gray.600">
          My special moments
        </Heading>
        <Alert status="warning" variant="left-accent">
          <AlertIcon />
          Here's a quick look at the events you've created in the past.
        </Alert>

        <EventsGridLayout
          events={events}
          onSave={onSaveEvent}
          loading={false}
        />
      </FlexColumn>
    </Container>
  );
};

export default Events;
