'use client';
// this component needs to be a client component because it uses a hook useState and client side event (submit) handling

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter(); // used later for programmatic navigation on submit

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText) return;
    router.push(`/events/${searchText}`); // navigate to the search results page
  };

  // note we set the value and onChange to make this a controlled input using useState
  // so that we can access the value on submit
  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[580px]">
      <input
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search events..."
        spellCheck={false}
      />
    </form>
  );
}
