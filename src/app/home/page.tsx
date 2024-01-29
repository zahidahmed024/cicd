import React from 'react';

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

export default function Home() {
  return (
    <div className="flex flex-row justify-center flex-wrap">
      {data?.map(item => {
        return (
          <div
            className="w-96 h-96 m-2 bg-green-600 rounded-lg p-10"
            key={item.id}>
            <p>{item.product_name}</p>
          </div>
        );
      })}
    </div>
  );
}
