'use client';
import React, {useEffect} from 'react';
interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}
export default function ListView({data}: {data: Item[]}) {
  //   useEffect(() => {
  // console.log('data---->', data);
  //     return () => {};
  //   }, []);

  return (
    <>
      {data?.map(item => {
        return (
          <div
            className="w-96 h-96 m-2 bg-green-600 rounded-lg p-10"
            key={item.id}>
            <p>{item.title}</p>
            <p>{item.category}</p>
          </div>
        );
      })}
    </>
  );
}
