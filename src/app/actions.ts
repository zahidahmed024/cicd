'use server';

import {deleteCookie} from 'cookies-next';
import {cookies} from 'next/headers';

export async function logout() {
  deleteCookie('session');
  // cookies().set('session', '', {expires: new Date(0)});
}
