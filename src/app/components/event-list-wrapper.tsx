import { fetchEvents } from '@/lib/server-utils';
import EventsList from './events-list';

type EventsListWrapperProps = {
  city: string;
  page?: number;
};

// This component fetches the events for a given city
// and then passes them to the EventsList component to be rendered
// We do this to seperate the data fetching logic from EventsList component
// so that EventsList is more reusable and focused on just rendering the list of events
export default async function EventsListWrapper({
  city,
  page = 1,
}: EventsListWrapperProps) {
  const { events, numberOfEvents } = await fetchEvents(city, page);

  return (
    <EventsList
      events={events}
      city={city}
      page={page}
      numberOfEvents={numberOfEvents}
    />
  );
}
