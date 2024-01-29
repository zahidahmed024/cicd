'use client';

import Image from 'next/image';

export default function Navbar({
  onClickHamburger,
}: {
  onClickHamburger?: () => void;
}) {
  return (
    <nav
      className="flex flex-row p-2 w-full h-16 sm:h-32 bg-red-100 border-0 items-center sm:flex-col shadow-sm"
      style={{position: 'sticky', top: 0}}>
      <div className="flex flex-row items-center sm:w-full sm:justify-between">
        <div className="flex flex-row">
          <button className="px-2" onClick={onClickHamburger || undefined}>
            ham
          </button>
          <Image
            className="px-2 mx-2"
            src="/next.svg"
            alt="logo"
            width={70}
            height={30}
          />
        </div>
        <NavMenuItem label={'login'} className={'hidden sm:flex self-end'} />
      </div>

      <div className="flex flex-grow justify-center sm:w-full sm:order-last">
        <input
          className="w-[90%] px-2 bg-gray-300 sm:w-full p-2 rounded-md"
          type="text"
          placeholder="search"
        />
      </div>

      <div className="flex flex-wrap justify-start px-2 sm:hidden">
        <NavMenuItem label={'login2'} />
      </div>
    </nav>
  );
}

const NavMenuItem = ({
  label = '',
  className = '',
}: {
  label: String;
  className?: String;
}) => {
  return <div className={`m-2 ${className}`}>{label}</div>;
};
