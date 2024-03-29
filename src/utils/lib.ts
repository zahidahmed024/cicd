'use server';
import {setCookie, getCookie} from 'cookies-next';
import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const {payload} = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (e) {
    console.error('Error in decrypt:', e);
    // logout();
  }
}

export async function login(formData: {email: string; password: string}) {
  // Verify credentials && get the user

  const user = {email: formData.email, name: formData.password};

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({user, expires});

  // Save the session in a cookie
  cookies().set('session', session, {expires, httpOnly: true});
  return user;
}

export async function logout() {
  // Destroy the session
  await cookies().set('session', '');
}

export async function getSession() {
  const session = await cookies().get('session');
  if (!session) return null;
  return true;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

// export async function setCookie(response: {token: string}) {
//   cookies().set('session', response?.token || '', {httpOnly: true});
// }

export async function setServerCookie(token: string) {
  // console.log('token', token);
  cookies().set('session', token, {httpOnly: true});
  // return await getSCCookies();
}

export async function getSCCookies() {
  return cookies().get('session')?.value || '';
}
