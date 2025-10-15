import Link from 'next/link';

const routes = [
  { path: '/terms-conditions', label: 'Terms and Conditions' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
];

export default function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-between h-16 border-t border-white/10 px-3 sm:px-9 text-xs text-white/25">
      <small className="text-xs">
        &copy; 2050 Some Company all rights reserved.
      </small>

      <ul className="flex gap-x-3 sm:gap-x-8">
        {routes.map(({ path, label }) => (
          <li key={path}>
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
