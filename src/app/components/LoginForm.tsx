'use client';
import {setServerCookie} from '@/utils/lib';
// import {login, setCookie} from '@/utils/lib';
import axios from 'axios';
import {setCookie} from 'cookies-next';
import {cookies} from 'next/headers';
import {useRouter} from 'next/navigation';
// import {redirect} from 'next/navigation';
import {useState} from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('zahid1');
  const [password, setPassword] = useState('123456');
  const router = useRouter();
  const handleLogin = async (e: any) => {
    // 'use server';
    // console.log('e', e.target);
    // e.preventDefault();
    // const formData = {
    //   email: email,
    //   password: password,
    // };
    // console.log('formData', formData);
    try {
      const response = await axios.post('http://localhost:3001/login', {
        name: email,
        password: password,
      });
      console.log('response', response);
      if (response.status === 200) {
        // console.log(response?.data?.token);
        // let session = await setServerCookie(response?.data?.token);
        // console.log('session--->', session);
        setCookie('session', response?.data.token || '');
        router.refresh();
        // cookies().set('session', response?.data.token || '', {httpOnly: true});
        // router.push('/home');
      } else {
        // alert('login failed');
      }

      // let response = await login(formData);
      // if (response.email) {
      // }
      // redirect('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-12">
      <input
        style={{border: '1px solid black'}}
        type="text"
        name="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
        value={email || ''}
      />
      <br />
      <input
        style={{border: '1px solid black'}}
        type="text"
        name="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
        value={password || ''}
      />
      <br />
      <button onClick={handleLogin}>submit</button>
    </div>
  );
}
