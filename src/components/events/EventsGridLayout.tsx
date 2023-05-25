import { Grid } from '@chakra-ui/react';
import React from 'react';
import { EventFormPayload, EventType } from 'types/event';
import AddEventCard from './AddEventCard';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';

type EventsGridLayoutProps = {
  onSave(values: EventFormPayload): void;
  events: EventType[];
  loading?: boolean;
};

const EventsGridLayout: React.FC<EventsGridLayoutProps> = ({
  onSave,
  events,
  loading,
}) => {
  return (
    <Grid
      gridTemplateColumns={{
        base: '90%',
        sm: '95%',
        md: 'repeat(2, 40%)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gridGap="6"
      justifyContent="center"
    >
      <AddEventCard onSave={onSave} />

      {loading
        ? Array(4)
            .fill(0)
            .map((_, i) => <EventCardSkeleton key={i} />)
        : events?.map(event => <EventCard key={event.id} event={event} />)}
    </Grid>
  );
};

export default EventsGridLayout;
