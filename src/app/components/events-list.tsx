import { EventoEvent } from '@prisma/client';
import EventCard from './event-card';
import PaginationControls from './pagination-controls';

type EventsListProps = {
  events: EventoEvent[];
  city: string;
  page: number;
  numberOfEvents: number;
};

export default async function EventsList({
  events,
  city,
  page,
  numberOfEvents,
}: EventsListProps) {
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : '';
  const nextPath =
    page < numberOfEvents / 6 ? `/events/${city}?page=${page + 1}` : '';

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
