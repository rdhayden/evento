import { cn } from '@/lib/utils';

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: H1Props) {
  // cn combines clsx and twMerge
  // clsx is a utility for constructing className strings conditionally which we don't use here
  // twMerge ensures that if there is a conflict in Tailwind classes
  // the latter class takes precedence
  return (
    <h1
      className={cn('text-3xl lg:text-6xl font-bold tracking-tight', className)}
    >
      {children}
    </h1>
  );
}
