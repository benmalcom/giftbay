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
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { FlexColumn } from 'components/common/MotionContainers';
import { EventsGridLayout } from 'components/events';
import { PrivateLayout } from 'components/layouts';
import events from 'data/events.json';
import { EventFormPayload } from 'types/event';
import { withAuthServerSideProps } from 'utils/serverSideProps';

const Events = () => {
  const onSaveEvent = (event: EventFormPayload) => {
    console.log('event ', event);
  };
  return (
    <Container py={1.5} maxW="7xl" h="full" alignItems="center">
      <FlexColumn w="full" rowGap={8} mt={10}>
        <Box>
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
          onSave={onSaveEvent}
          loading={false}
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
      pageTitle: 'Events',
    },
  };
});
