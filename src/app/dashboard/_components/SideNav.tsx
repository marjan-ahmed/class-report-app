"use client"
import React from 'react';
import Image from 'next/image';
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';

interface MenuItem {
  id: number;
  name: string;
  icon: React.ComponentType;
  path: string;
}

const SideNav: React.FC = () => {
    const {user}=useKindeBrowserClient();
    const pictureSrc = user?.picture || '/default-user-picture.svg';
  const menuList: MenuItem[] = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutIcon,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Students',
      icon: GraduationCap,
      path: '/dashboard/students',
    },
    {
      id: 3,
      name: 'Attendance',
      icon: Hand,
      path: '/dashboard/attendance',
    },
    {
      id: 4,
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
    },
  ];

  return (
    <div className='border shadow-md h-screen p-5'>
      <Image 
        src={'/logo.png'}
        width={70}
        height={70}
        alt='logo' 
        className='mx-[65px]'
      />

      <hr className='my-5' />

      {menuList.map((menu) => (
      <Link key={menu.id} href={menu.path}>
    <h2 className='flex items-center gap-3 text-md p-4 text-slate-500 cursor-pointer hover:bg-primary hover:text-white rounded-lg my-2'>
      <menu.icon />
      {menu.name}
    </h2>
  </Link>
))}

      <div className='flex gap-2 items-center bottom-5 fixed p-2'>
        <Image className='rounded-full'
        src={pictureSrc}
        width={35}
        height={35}
        alt='user'/>
      
      <div>
        <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
        <h2 className='text-xs text-slate-400'>{user?.email}</h2>
      </div>
      </div>

    </div>
  );
}

export default SideNav;
