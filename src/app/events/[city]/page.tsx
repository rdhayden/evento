import H1 from '@/app/components/h1';
import { Suspense } from 'react';
import Loading from './loading';
import EventsListWrapper from '@/app/components/event-list-wrapper';
import { Metadata } from 'next';
import { z } from 'zod';

// This is the page for /events/[city], when next sees a folder with square brackets
// it treats it as a dynamic segment, the slug becomes whatever is in the url
// Next js then passes that slug to the page as a prop called params
// the params prop is an object with the key being the name of the dynamic segment
// and the value being the value in the url
type Props = {
  params: {
    city: string;
  };
};

type EventPageProps = Props & {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

// Generate metadata for the page based on the city parameter
export function generateMetadata({ params }: Props): Metadata {
  const city = params.city;
  const title =
    city === 'all'
      ? 'All Events'
      : `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
  return { title };
}

// Zod schema to validate and parse the page number from search params
// Coerce to number, ensure it's an integer and positive, and make it optional
// Then use parsedPage.data to get the parsed page number later
const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function Events({ params, searchParams }: EventPageProps) {
  const city = params.city;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error('Invalid page number');
  }

  return (
    <main className="flex flex-col items-center py-24 p-[20px] min-h-[110%]">
      <H1 className="mb-28">
        {city === 'all' && 'All Events'}
        {city !== 'all' &&
          `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </H1>
      {/* Suspense allows us to show a fallback (loading spinner) while the EventsListWrapper is loading
         However, it only runs once before EventsListWrapper loads, and not when we navigate within the EventsListWrapper
         using the Previous and Next buttons. So we add a key to Suspense that changes when the page changes,
         forcing Suspense to re-render and show the loading spinner again.
      */}
      <Suspense key={city + parsedPage.data} fallback={<Loading />}>
        <EventsListWrapper city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
