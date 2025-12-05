// Next.js will display this component when a page is loading
// it applies to all child routes
// so if added to the root of the app directory it will display for all pages
// what it actually does is wrap every page in a React.Suspense component
// In this case however we are explicitly using a Suspense component in page.tsx
// so this loading component will only be used for the parts of the page
// that need to wait for async data to load

import SkeletonCard from '@/app/components/skeleton-card';

export default function Loading() {
  return (
    <div className="flex flex-wrap justify-center max-w-[1100px] mx-auto px-[20px] py-24 gap-20">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
