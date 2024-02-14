import {NextRequest, NextResponse} from 'next/server';
import {getSession} from './utils/lib'; // Ensure correct import
import {cookies} from 'next/headers';

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Protected routes (add or adjust as needed)
  const protectedRoutes = ['/home', '/dashboard'];

  // Exclude public routes (add or adjust as needed)
  const publicRoutes = ['/', '/login', '/register'];

  try {
    // 1. Check for CSRF token for non-GET requests
    // if (request.method !== 'GET' && !request.headers.get('x-csrf-token')) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }

    // 2. Check authentication for protected routes
    const session = await getSession();

    if (!publicRoutes.includes(pathname)) {
      // console.log('session', session);
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      // 3. Check user roles or permissions (optional)
      // if (!hasRequiredPermissions(session, pathname)) {
      //   return NextResponse.redirect(new URL('/unauthorized', request.url));
      // }
    } else if (publicRoutes.includes(pathname)) {
      if (session) {
        console.log('session ->', session);
        return NextResponse.redirect(new URL('/home', request.url));
      }
    }
    // 4. Set or refresh CSRF token for all requests
    // const csrfToken = await getCsrfToken();
    // response.headers.set('x-csrf-token', csrfToken);

    return NextResponse.next();
  } catch (error) {
    cookies().set('session', '', {expires: new Date(0)});

    console.error('Error in middleware:', error);
    // Handle errors appropriately (e.g., log them, redirect to error page)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
