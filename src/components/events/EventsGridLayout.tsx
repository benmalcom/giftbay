import { Grid } from '@chakra-ui/react';
import React from 'react';
import { EventType } from 'types/event';
import AddEventCard from './AddEventCard';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';

type EventsGridLayoutProps = {
  events: EventType[];
  loading?: boolean;
};

const EventsGridLayout: React.FC<EventsGridLayoutProps> = () => {
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
      <AddEventCard onClick={() => console.log('')} />
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
