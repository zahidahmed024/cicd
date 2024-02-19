import axios, {AxiosRequestConfig} from 'axios';
import {deleteCookie, getCookie} from 'cookies-next';
import {cookies} from 'next/headers';

const apiCaller = async (
  url: string,
  method: string,
  data?: any,
): Promise<any> => {
  const token = await getCookie('session', {cookies});
  console.log('token-->', token);
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`,
  };

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    data,
  };

  const instance = axios.create(config);

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 403) {
        fetch('/api')
          .then(() => {
            // Redirect to login page or display relevant message
            // Here, you can check the response from `/api/logout` (if desired)
            window.location.href = '/login';
          })
          .catch(err => {
            console.error('Error triggering logout:', err);
            // Handle any potential errors during the server-side call
          });
      }
      return Promise.reject(error);
    },
  );

  try {
    const response = await instance(config);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

export default apiCaller;
