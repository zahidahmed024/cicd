import {cookies} from 'next/headers';

export async function logout() {
  cookies().set('session', '', {expires: new Date(0)});
}
