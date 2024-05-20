import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './lib/supabase/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/dashboardBorrower/:path*',
    '/dashboardLender/:path*',
    '/myNotes/:path*',
    '/noteCreation/:path*',
    '/personalInfo/:path*',
    '/requests/:path*',
    '/home/:path*',
    '/chats/:path*',
    '/myLoans/:path*',
  ],
};
