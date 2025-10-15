import H1 from '@/app/components/h1';

// This is the page for /events/[city], when next sees a folder with square brackets
// it treats it as a dynamic segment, the slug becomes whatever is in the url
// Next js then passes that slug to the page as a prop called params
// the params prop is an object with the key being the name of the dynamic segment
// and the value being the value in the url
export default async function Events({ params }: { params: { city: string } }) {
  const city = params.city;

  const result = await fetch(
    'https://bytegrad.com/course-assets/projects/evento/api/events?city=' + city
  );
  const events = await result.json();

  return (
    <main className="flex flex-col items-center py-24 p-[20px] min-h-[110%]">
      <H1>
        {city === 'all' && 'All Events'}
        {city !== 'all' &&
          `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </H1>
      {events.map((event: any) => (
        <section key={event.id}>{event.name}</section>
      ))}
    </main>
  );
}
