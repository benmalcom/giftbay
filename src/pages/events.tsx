import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Container,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { FlexColumn } from 'components/common/MotionContainers';
import { EventsGridLayout } from 'components/events';
import { parseEventFormValues } from 'components/events/utils';
import { PrivateLayout } from 'components/layouts';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from 'services/event';
import { EventFormValues, EventWithGifts } from 'types/event';
import { withAuthServerSideProps } from 'utils/serverSideProps';

const Events = () => {
  const [inFlight, setInFlight] = useState({
    get: true,
    create: false,
  });
  const [events, setEvents] = useState<EventWithGifts[]>([]);

  const fetchEvents = useCallback(
    (signal: AbortSignal) => {
      getEvents(signal)
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => console.log('error ', error))
        .finally(() => setInFlight(state => ({ ...state, get: false })));
    },
    [setInFlight]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchEvents(signal);
    return () => {
      controller.abort();
    };
  }, [fetchEvents]);

  const onCreate = (values: Record<string, unknown>, cb?: () => void) => {
    setInFlight(state => ({ ...state, create: true }));
    const payload = parseEventFormValues(values as EventFormValues);
    createEvent(payload)
      .then(response => {
        setEvents(list => [response.data, ...list]);
        cb?.();
      })
      .catch(err => console.log('err ', err))
      .finally(() => setInFlight(state => ({ ...state, create: false })));
  };

  const onUpdate = (
    id: string,
    values: Record<string, unknown>,
    cb?: () => void
  ) => {
    setInFlight(state => ({ ...state, [`update_${id}`]: true }));
    const payload = parseEventFormValues(values as EventFormValues);
    updateEvent(id, payload)
      .then(response => {
        const event = response.data;
        setEvents(list =>
          list.map(item => (item.id === event.id ? event : item))
        );
        cb?.();
      })
      .catch(err => console.log('err ', err))
      .finally(() =>
        setInFlight(state => ({ ...state, [`update_${id}`]: false }))
      );
  };

  const onDelete = (id: string, cb?: () => void) => {
    setInFlight(state => ({ ...state, [`delete_${id}`]: true }));
    deleteEvent(id)
      .then(() => {
        setEvents(list => list.filter(item => item.id !== id));
        cb?.();
      })
      .catch(err => console.log('err ', err))
      .finally(() =>
        setInFlight(state => ({ ...state, [`delete_${id}`]: false }))
      );
  };

  return (
    <Container py={1.5} maxW="7xl" h="full" alignItems="center">
      <FlexColumn w="full" rowGap={8} mt={5} flexWrap="wrap">
        <Box mb={3}>
          <Link href="/" passHref>
            <Button
              leftIcon={<MdOutlineKeyboardBackspace />}
              as="a"
              textDecoration="none"
              cursor="pointer"
              w="fit-content"
              color="subtle"
              variant="link"
            >
              Go Home
            </Button>
          </Link>
        </Box>
        <Heading as="h3" size="lg" color="gray.600">
          My special moments
        </Heading>
        <Alert
          colorScheme="gray"
          variant="left-accent"
          flexDirection="column"
          alignItems="flex-start"
          w="full"
          bg="white"
          boxShadow="sm"
          mb={4}
        >
          <AlertTitle mb={1} fontSize="md">
            Welcome to your personalized event list.
          </AlertTitle>
          <AlertDescription>
            Here's a quick look at the events you've created in the past.
          </AlertDescription>
        </Alert>

        <EventsGridLayout
          events={events}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          loading={inFlight}
        />
      </FlexColumn>
    </Container>
  );
};

Events.Layout = PrivateLayout;
export default Events;

export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'My special moments',
    },
  };
});
