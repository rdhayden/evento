import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  // Next.js Image component extends <img> e.g. width and height reserves space
  // in the page to prevent layout shift when the image loads
  return (
    <Link href="/">
      {/* must configure next.config.js to allow remote images */}
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
        alt="EVENTO Logo"
        width={53}
        height={12}
      />
    </Link>
  );
}
