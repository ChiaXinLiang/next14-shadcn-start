import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected, /api/user)
  const path = request.nextUrl.pathname;

  // Define an array of public paths that don't require authentication
  const publicPaths = ['/', '/login', '/register'];

  // Check if the path is public
  const isPublicPath = publicPaths.some((publicPath) => path.startsWith(publicPath));

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the path is login or register and there's a token, redirect to home
  if ((path === '/login' || path === '/register') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
