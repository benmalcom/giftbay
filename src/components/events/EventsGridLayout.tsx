import { Grid } from '@chakra-ui/react';
import React from 'react';
import { EventFormPayload, EventType } from 'types/event';
import AddEventCard from './AddEventCard';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';

type EventsGridLayoutProps = {
  onSave(values: EventFormPayload): void;
  events: EventType[];
};

const EventsGridLayout: React.FC<EventsGridLayoutProps> = ({ onSave }) => {
  return (
    <Grid
      gridTemplateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gridGap="6"
    >
      <AddEventCard onSave={onSave} />
      <EventCardSkeleton />
      {/*      {loading
        ? Array(4)
            .fill(0)
            .map((_, i) => <ProjectCardSkeleton variant="all" key={i} />)
        : events?.map(project => (
            <EventCard key={project.id} project={project} variant="all" />
          ))}*/}
      <EventCard />
    </Grid>
  );
};

export default EventsGridLayout;
