import {deleteCookie, setCookie} from 'cookies-next';

export default async function GET() {
  deleteCookie('session');
  return new Response('Hello, Next.js!', {
    status: 200,
  });
}
//  res.status(200).json({message: 'Successfully logged out'});
// }
