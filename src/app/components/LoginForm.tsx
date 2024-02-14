'use client';
import {login} from '@/utils/lib';
import {useRouter} from 'next/navigation';
// import {redirect} from 'next/navigation';
import {useState} from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('zahid@gmail.com');
  const [password, setPassword] = useState('123456');
  const router = useRouter();
  const handleLogin = async (e: any) => {
    // 'use server';
    // console.log('e', e.target);
    // e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    // console.log('formData', formData);
    try {
      let response = await login(formData);
      if (response.email) {
        router.push('/home');
      }
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
