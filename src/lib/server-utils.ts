// NOTE: npm package 'server-only' is installed, this only needs to be imported
// then if you try and use any of the functions in this file on the client side
// you will get an error when navigating to that page in dev mode, and possibly a
// build error

import 'server-only';
import { EventoEvent } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import prisma from './db';
import { capitalise } from './utils';

// Prisma does not automatically cache database queries so we use unstable_cache
// to cache the result of this function based on the slug parameter
// unstable_cache is currently experimental and will change to use_cache in future releases
export const fetchEvents = unstable_cache(
  async (city: string, page: number = 1) => {
    // Note we don't type events here as Prisma infers the type from the schema
    // and when we recieve 'all' there isn't a city called 'all in the database
    // so by setting the city in the where object to undefined Prisma will return all events
    // it's effectively not setting a where clause in the database query which returns everything
    const events: EventoEvent[] = await prisma.eventoEvent.findMany({
      where: {
        city: city == 'all' ? undefined : capitalise(city),
      },
      orderBy: { date: 'asc' },
      skip: (page - 1) * 6,
      take: 6,
    });

    let numberOfEvents;
    if (city == 'all') {
      numberOfEvents = await prisma.eventoEvent.count();
    } else {
      numberOfEvents = await prisma.eventoEvent.count({
        where: {
          city: capitalise(city),
        },
      });
    }

    return { events, numberOfEvents };
  }
);

// Example using fetch instead of a local data source, fetch automatically caches requests
// export async function fetchEvents(city: string, page: number = 1) {
// const response = await fetch(
//   `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
//   {
//     next: {
//       revalidate: 300, // revalidate the data every 5 minutes/300 seconds
//     },
//   }
//   // { cache: 'no-cache' }, // a Next.js extension to fetch to ensure we always get fresh data
// );
// const events: EventoEvent[] = await response.json();
// return events;

// Prisma does not automatically cache database queries so we use unstable_cache
// to cache the result of this function based on the slug parameter
// unstable_cache is currently experimental and will change to use_cache in future releases
export const fetchEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: { slug: slug },
  });

  if (!event) {
    // The next.js notFound function returns components defined in the app/not-found.tsx file
    return notFound();
  }
  return event;
});

// Example using fetch instead of a local data source, fetch automatically caches requests
// export async function fetchEvent(slug: string) {
// const response = await fetch(
//   `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
// );
// const event: EventoEvent = await response.json();
// return event;
