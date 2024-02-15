import React from 'react';

export default function UserDetail({user}: {user?: any}) {
  return <div>UserDetail: {JSON.stringify(user)}</div>;
}
