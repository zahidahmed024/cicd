import {NextRequest, NextResponse} from 'next/server';
import {getSession} from './utils/lib'; // Ensure correct import
// import {cookies} from 'next/headers';
import {deleteCookie, getCookie} from 'cookies-next';

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Protected routes (add or adjust as needed)
  const protectedRoutes = ['/home', '/dashboard'];

  // Exclude public routes (add or adjust as needed)
  const publicRoutes = ['/', '/login', '/register'];
  // console.log('getCookie(session)', await getCookie('session'));

  try {
    // 1. Check for CSRF token for non-GET requests
    // if (request.method !== 'GET' && !request.headers.get('x-csrf-token')) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }

    // 2. Check authentication for protected routes
    const session = await getSession();
    // console.log('session', session);
    // console.log('pathname-', pathname);

    if (!publicRoutes.includes(pathname) && !session) {
      console.log('pathname-', pathname);
      console.log('session-', session);
      // if () {
      return NextResponse.redirect(new URL('/login', request.url));
      // }
      // 3. Check user roles or permissions (optional)
      // if (!hasRequiredPermissions(session, pathname)) {
      //   return NextResponse.redirect(new URL('/unauthorized', request.url));
      // }
    } else if (publicRoutes.includes(pathname) && session) {
      // if (session) {
      console.log('session ->', session);
      return NextResponse.redirect(new URL('/home', request.url));
      // }
    } else if (
      (protectedRoutes.includes(pathname) || pathname === '/') &&
      !session
    ) {
      console.log('session --->', session);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. Set or refresh CSRF token for all requests
    // const csrfToken = await getCsrfToken();
    // response.headers.set('x-csrf-token', csrfToken);

    return NextResponse.next();
  } catch (error) {
    deleteCookie('session');
    console.error('Error in middleware:', error);
    // Handle errors appropriately (e.g., log them, redirect to error page)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|public|favicon.ico|next.svg|_next/image|.*\\.png$).*)',
  ],
  // matcher: '/((?!api|_next|static|public|favicon.ico).*)',
};
