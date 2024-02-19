'use client';
import {logout} from '@/utils/lib';
import {deleteCookie, getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';
import React from 'react';

export default function UserDetail({user}: {user?: any}) {
  const router = useRouter();
  // console.log('', getCookie('session'));
  return (
    <div
      onClick={() => {
        alert('clicked');
        logout();
        router.refresh();
      }}>
      UserDetail: {JSON.stringify(user)}
    </div>
  );
}
