import Link from 'next/link';
import SearchForm from './components/search-form';
import H1 from './components/h1';

export default function Home() {
  return (
    <main className="flex flex-col items-center px-3 pt-36">
      <H1>Find events around the world</H1>
      <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75">
        Browse more than{' '}
        <span className="font-bold text-accent italic underline">
          10,000 events
        </span>{' '}
        around you
      </p>

      {/*
          note when giving tailwind specific values like RGB colors or specific numbers use square brackets
          also note that the screen width below is full by default but 580px on small screens and above
          technically it would be better to use rem, tailwind uses rem because it adjusts based on the root font size
          so it provides a more responsive design
      */}
      <SearchForm />

      <section className="mt-4 flex gap-x-4 text-sm text-white/50">
        <p>Popular Categories</p>
        <div>
          {/* we could use another flex box to space these but can also use space-x to add space on the x axis */}
          <div className="space-x-2 font-semibold">
            {/* if we use <a> instead of Link, the page will do a full reload instead of client side navigation
              Next.js will also prefetch events linked to by Link components */}
            <Link href="/events/Austin">Austin</Link>
            <Link href="/events/Seattle">Seattle</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
