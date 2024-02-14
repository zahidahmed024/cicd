import {redirect} from 'next/navigation';
import {getSession, login, logout} from '../../utils/lib';
import LoginForm from '../components/LoginForm';

export default function page() {
  // const handleLogin = async (formData: {email: string; password: string}) => {
  //   'use server';
  //   return login(formData);
  // };
  return (
    <div className="p-12">
      {/* <LoginForm login={handleLogin} /> */}
      <LoginForm />
    </div>
  );
}
