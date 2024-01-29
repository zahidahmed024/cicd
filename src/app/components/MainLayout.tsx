'use client';
import React, {useState} from 'react';
import {Navbar} from '.';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

interface MenuItem {
  label: string;
  path: string;
}
type NavMenuItemProps = {
  link: string;
  label: string;
  isActive?: boolean;
};

const menus: MenuItem[] = [
  {label: 'home', path: '/home'},
  {label: 'about', path: '/about'},
  // {label: 'login', path: '/login'},
];

export default function SidebarBody({
  children,
}: {
  showSideBar?: boolean;
  children: React.ReactNode;
}) {
  const [showSideBar, setShowSideBar] = useState(true);
  const routeName = usePathname();
  // const currentRoute = router.;
  // console.log('currentRoute', routeName);
  return (
    <div className="relative flex flex-col w-full h-screen bg-blue-400 overflow-hidden">
      <Navbar onClickHamburger={() => setShowSideBar(state => !state)} />
      <div className="flex flex-row">
        <div
          className={`flex flex-col min-h-screen bg-black   ${
            showSideBar ? 'visible' : 'hidden'
          }`}>
          {menus?.map((item: MenuItem) => (
            <NavMenuItem
              key={item?.label || ''}
              label={item.label || ''}
              link={item?.path}
              isActive={routeName === item?.path}
            />
          ))}
        </div>
        <div className="w-full max-h-screen overflow-auto">{children}</div>
      </div>
    </div>
  );
}

const NavMenuItem = ({
  link = '',
  label = '',
  isActive = false,
}: NavMenuItemProps) => {
  return (
    <Link
      href={link}
      className={`m-2 border-b-2 p-2 border-blue-500 ${
        isActive ? 'bg-green-500' : 'bg-white'
      }`}>
      {label}
    </Link>
  );
};
