'use client'; // Error components must be Client Components
// https://nextjs.org/docs/app/building-your-application/routing/error-handling
// This is the error boundary for the entire app, you can create additional error boundaries
// by adding error.tsx files to specific folders in the app directory
// Effectively wraps everything from folder downwards in an error boundary component <ErrorBoundary>

import H1 from '@/app/components/h1';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="text-center py-24">
      {/* <H1 className="mb-5">Something went wrong!</H1> */}
      {/* <H1>{error.message}</H1> */}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          reset
        }
      >
        Try again
      </button>
    </main>
  );
}
