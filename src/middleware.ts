import { NextRequest, NextResponse } from 'next/server';

// This is a simplified version of middleware for role-based routing
// In a real application, you would validate the token and extract roles from it

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from session cookie or authorization header
  const token = request.cookies.get('token')?.value || '';
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ];
  
  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // TEMPORARY: Allow direct access to dashboard without login
  if (pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }
  
  // No token - redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Mock function to determine user role
  // In a real app, this would decode the JWT and extract the role
  const getUserRole = (token: string): 'patient' | 'doctor' | null => {
    // For testing purposes:
    // We'll use a mock function that returns a role based on the token
    // In reality, you'd decode the JWT token and extract the role claim
    
    // Here we're simulating different roles for testing
    if (token.includes('patient')) return 'patient';
    if (token.includes('doctor')) return 'doctor';
    
    // By default, let's assume the token is for a patient
    return 'patient';
  };
  
  const userRole = getUserRole(token);
  
  // Route protection logic based on roles (disabled temporarily)
  // These redirects are commented out to allow direct access for testing
  /*
  if (pathname.startsWith('/dashboard/patient') && userRole !== 'patient') {
    return NextResponse.redirect(new URL('/dashboard/doctor', request.url));
  }
  
  if (pathname.startsWith('/dashboard/doctor') && userRole !== 'doctor') {
    return NextResponse.redirect(new URL('/dashboard/patient', request.url));
  }
  */
  
  // If we get here, the user is authenticated and authorized
  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};