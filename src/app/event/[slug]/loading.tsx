// Next.js will display this component when a page is loading
// it applies to all child routes
// so if added to the root of the app directory it will display for all pages
// what it actually does is wrap every page in a React.Suspense component
// which takes a fallback prop that is this component to display while loading
// e.g. native react would look like this:
// <React.Suspense fallback={<Loading />}><MyComponent /></React.Suspense>

import Skeleton from '@/app/components/skeleton';

export default function Loading() {
  return (
    <div className="animate-pulse flex flex-col items-center gap-y-4 pt-28">
      <Skeleton className="h-4 w-[550px]" />
      <Skeleton className="h-4 w-[400px]" />
      <Skeleton className="h-4 w-[430px]" />
    </div>
  );
}
