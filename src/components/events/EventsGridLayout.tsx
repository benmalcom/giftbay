import { Grid } from '@chakra-ui/react';
import React from 'react';
import { EventComponentProps, EventWithGifts } from 'types/event';
import AddEventCard from './AddEventCard';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';

type EventsGridLayoutProps = EventComponentProps;

const EventsGridLayout: React.FC<EventsGridLayoutProps> = ({
  events,
  loading,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  return (
    <Grid
      maxW="full"
      gridTemplateColumns={{
        base: '90%',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gridGap="8"
      justifyContent="center"
    >
      {!loading.get && (
        <AddEventCard
          loading={loading}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      )}

      {loading.get
        ? Array(4)
            .fill(0)
            .map((_, i) => <EventCardSkeleton key={i} />)
        : events?.map(event => (
            <EventCard
              key={event.id}
              event={event as EventWithGifts}
              loading={loading}
              onCreate={onCreate}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
    </Grid>
  );
};

export default EventsGridLayout;
