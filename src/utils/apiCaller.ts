import axios, {AxiosRequestConfig} from 'axios';
// import {cookies} from 'next/headers';
// import {redirect} from 'next/navigation';
import {getSCCookies} from './lib';
import {logout} from '@/app/actions';
// import {logout} from './lib';

const apiCaller = async (
  url: string,
  method: string,
  data?: any,
): Promise<any> => {
  const token = await getSCCookies(); // Assuming 'token' is the name of the cookie
  //   console.log('token', token);
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`,
  };

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response?.status === 403) {
      //   cookies().set('session', '', {expires: new Date(0)});
      await logout();
      //   redirect('/login');
      //   await logout();
      //   redirect('/login');
    }
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

export default apiCaller;
