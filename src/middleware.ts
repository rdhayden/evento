import { NextRequest, NextResponse } from 'next/server';

// middleware.ts must be in the root directory (src/) to work properly
// Redirect /events to /events/all
// The URL must be absolute so we create a new URL object with req.url as the base
// only the base domain is preserved from req.url
export function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL('/events/all', req.url));
}

// Apply this middleware only to the /events path
export const config = {
  matcher: ['/events'],
};
