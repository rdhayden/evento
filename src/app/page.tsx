import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Find events around the world</h1>
      <p>Browse more than 10,000 events around you</p>

      <form>
        <input placeholder="Search events..." spellCheck={false} />
      </form>

      <section>
        <p>Popular Categories</p>
        <div>
          <div>
            <Link href="/events/london">London</Link>
          </div>
          <div>
            <Link href="/events/milan">Milan</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
