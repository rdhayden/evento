import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type PaginationControlsProps = {
  previousPath: string;
  nextPath: string;
};

const btnStyles =
  'flex gap-2 text-sm text-white/75 px-5 py-3 bg-white/5 rounded-md opacity-75 transition hover:bg-white/10 hover-text-white hover:opacity-90';

export default function PaginationControls({
  previousPath,
  nextPath,
}: PaginationControlsProps) {
  return (
    <section className="flex justify-between w-full">
      {previousPath ? (
        <Link href={previousPath} className={btnStyles}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}
      {nextPath && (
        <Link href={nextPath} className={btnStyles}>
          <ArrowRightIcon />
          Next
        </Link>
      )}
    </section>
  );
}
