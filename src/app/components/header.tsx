import Link from 'next/link';
import Logo from './logo';

const routes = [
  { label: 'Home', path: '/' },
  { label: 'All Events', path: '/events/all' },
];

/*
Tailwind styles used below:

flex items-center justify-between -- sequences items, centring them vertically and spacing them out horizontally
p-4 --padding 4 (all sides)
border-b border-white/10 h-14 px-3 sm:px-9 -- bottom border with 10% opacity white, height 14, horizontal padding 3
                                              on the smallest mobile screens and 9 on small (sm) screens and up
flex gap-x-6 text-sm -- flex container with horizontal gap 6 and small text
text-white/50 hover:text-white transition -- 50% opacity white text, changing to full white on hover
                                            with a transition (default 150ms ease-in-out)
*/

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-white/10 h-14 px-3 sm:px-9">
      <Logo />
      <nav>
        <ul className="flex gap-x-6 text-sm">
          {routes.map(({ label, path }) => (
            <li
              key={path}
              className="text-white/50 hover:text-white transition"
            >
              <Link href={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
