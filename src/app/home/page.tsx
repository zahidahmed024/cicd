// 'use client';
import axios from 'axios';
import React, {useEffect} from 'react';
import ListView from './components/ListView';

interface item {
  id: number;
  product_name: string;
}
[];
let data: item[] = [
  {
    id: 1,
    product_name: 'Product 1',
  },
  {
    id: 2,
    product_name: 'Product 2',
  },
  {
    id: 3,
    product_name: 'Product 3',
  },
  {
    id: 4,
    product_name: 'Product 4',
  },
  {
    id: 5,
    product_name: 'Product 5',
  },
  {
    id: 6,
    product_name: 'Product 6',
  },
  {
    id: 7,
    product_name: 'Product 7',
  },
  {
    id: 8,
    product_name: 'Product 8',
  },
];

async function getData() {
  const res = await axios.get('https://dummyjson.com/products', {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
  // console.log('res---->', res.data);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data');
  }
  return res.data.products;
}

export default async function Home() {
  let data = await getData();

  // useEffect(() => {
  //   console.log('data---->');
  //   return () => {};
  // }, []);

  // console.log('data---->', data);
  return (
    <div className="flex flex-row justify-center flex-wrap">
      {/* <h1 className="text-2xl font-bold">Home Page</h1> */}
      <ListView data={data} />
      {/* {data?.map((item: Item) => {
        return (
          <div
            className="w-96 h-96 m-2 bg-green-600 rounded-lg p-10"
            key={item.id}>
            <p>{item.title}</p>
          </div>
        );
      })} */}
    </div>
  );
}
